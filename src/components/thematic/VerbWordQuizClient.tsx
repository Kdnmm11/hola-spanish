'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, ArrowRight, RefreshCw, Trophy, PenTool, Play, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { TENSE_MASTER_DATA } from '@/data/thematicData';

interface QuizItem {
    id: string;
    type: 'conjugation_to_tense'; 
    verb: string;
    meaning: string;
    tenseName: string; 
    person: string; 
    questionText: string;
    answer: string;
    tenseOptions: string[]; 
}

const PRONOUNS = ['yo', 'tú', 'él/ella/ud.', 'nosotros/as', 'vosotros/as', 'ellos/as/uds.'];
const SAMPLE_VERBS = {
    ar: 'hablar',
    er: 'comer',
    ir: 'vivir'
};

function generateQuizData(count: number = 20): QuizItem[] {
    const allTenses = TENSE_MASTER_DATA;
    const allTenseNames = Array.from(new Set(allTenses.map(t => t.name.split(' (')[0])));
    const getRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
    
    const pool: QuizItem[] = [];

    allTenses.forEach(tense => {
        const simpleTenseName = tense.name.split(' (')[0];
        
        // 1. Regular
        ['ar', 'er', 'ir'].forEach(type => {
            const verbBase = SAMPLE_VERBS[type as keyof typeof SAMPLE_VERBS];
            const forms = tense.regular[type as keyof typeof tense.regular];
            forms.forEach((form, idx) => {
                const pronoun = PRONOUNS[idx];
                let realConjugated = '';
                if (tense.isCompound) {
                     const parts = form.split(' ');
                     if(parts.length >= 2) {
                        realConjugated = `${parts[0]} ${verbBase.slice(0, -2)}${parts[1].replace('-', '')}`;
                     }
                } else {
                     realConjugated = verbBase.slice(0, -2) + form;
                }
                
                pool.push({
                    id: `reg-${tense.id}-${type}-${idx}`,
                    type: 'conjugation_to_tense',
                    verb: verbBase,
                    meaning: type === 'ar' ? '말하다' : type === 'er' ? '먹다' : '살다',
                    tenseName: simpleTenseName,
                    person: pronoun,
                    questionText: realConjugated,
                    answer: '',
                    tenseOptions: [] 
                });
            });
        });

        // 2. Irregular
        tense.irregularGroups?.forEach(group => {
            group.verbs.forEach(v => {
                const pronounKeys = ['yo', 'tu', 'el', 'nos', 'vos', 'ellos'] as const;
                pronounKeys.forEach((pkey, idx) => {
                    const formArr = v.forms[pkey];
                    let conjugated = '';
                    if (formArr[1]) conjugated = formArr[0] + formArr[1];
                    else conjugated = formArr[0];
                    if (conjugated === '-') return;
                    
                    const pronoun = PRONOUNS[idx];
                    
                    pool.push({
                        id: `irreg-${tense.id}-${v.v}-${pkey}`,
                        type: 'conjugation_to_tense',
                        verb: v.v,
                        meaning: v.mean,
                        tenseName: simpleTenseName,
                        person: pronoun,
                        questionText: conjugated,
                        answer: '',
                        tenseOptions: []
                    });
                });
            });
        });
    });

    // Fisher-Yates Shuffle for better randomization
    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    // Pick random questions
    const selected = pool.slice(0, count);

    // Generate 4 tense options for each question
    return selected.map(item => {
        const wrongTenses = new Set<string>();
        while (wrongTenses.size < 3) {
            const randomTense = getRandom(allTenseNames);
            if (randomTense !== item.tenseName) {
                wrongTenses.add(randomTense);
            }
        }
        const options = [...Array.from(wrongTenses), item.tenseName].sort(() => 0.5 - Math.random());
        return { ...item, tenseOptions: options };
    });
}

export default function VerbWordQuizClient() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [quizData, setQuizData] = useState<QuizItem[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(true);
    
    // States for inputs
    const [selectedTense, setSelectedTense] = useState<string | null>(null);
    const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
    
    // Result State
    const [resultStatus, setResultStatus] = useState<'correct' | 'partial' | 'wrong' | null>(null);
    const [quizHistory, setQuizHistory] = useState<('O' | '△' | 'X' | null)[]>([]);

    useEffect(() => {
        const data = generateQuizData(20);
        setQuizData(data);
        setQuizHistory(new Array(data.length).fill(null));
        setLoading(false);
    }, []);

    const currentQuestion = quizData[currentQuestionIndex];

    useEffect(() => {
        setSelectedTense(null);
        setSelectedPerson(null);
        setResultStatus(null);
    }, [currentQuestionIndex]);

    const handleAnswer = () => {
        if (!selectedTense || !selectedPerson || resultStatus) return;

        const isTenseCorrect = selectedTense === currentQuestion.tenseName;
        const isPersonCorrect = selectedPerson === currentQuestion.person;

        let status: 'correct' | 'partial' | 'wrong';
        if (isTenseCorrect && isPersonCorrect) status = 'correct';
        else if (isTenseCorrect || isPersonCorrect) status = 'partial';
        else status = 'wrong';

        setResultStatus(status);
        
        const newHistory = [...quizHistory];
        newHistory[currentQuestionIndex] = status === 'correct' ? 'O' : status === 'partial' ? '△' : 'X';
        setQuizHistory(newHistory);

        if (status === 'correct') setScore(prev => prev + 1);
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setShowResult(true);
        }
    };

    const restartQuiz = () => {
        window.location.reload();
    };

    if (loading) return <div className="p-10 text-center text-slate-400">Loading Quiz...</div>;

    if (!isPlaying) {
        return (
            <div className="flex flex-col lg:flex-row gap-6 max-w-6xl ml-0">
                <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm p-12 flex flex-col items-center justify-center min-h-[500px] animate-in fade-in duration-500">
                    <div className="bg-violet-50 p-8 rounded-3xl mb-8 text-violet-600 shadow-sm border border-violet-100">
                        <PenTool size={64} strokeWidth={1.5} />
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight text-center">동사 단어 퀴즈</h1>
                    <p className="text-lg text-slate-600 font-medium mb-10 text-center max-w-lg leading-relaxed">
                        동사 변화형을 보고 <span className="text-violet-600 font-bold">시제와 인칭</span>을 각각 선택하세요.<br/>
                        총 <span className="text-violet-600 font-bold">{quizData.length}문제</span>가 준비되어 있습니다.
                    </p>
                    <button 
                        onClick={() => setIsPlaying(true)}
                        className="group flex items-center gap-3 px-10 py-4 bg-slate-900 text-white text-lg font-bold rounded-2xl hover:bg-slate-800 hover:scale-105 transition-all shadow-lg hover:shadow-xl"
                    >
                        <span>퀴즈 시작하기</span>
                        <div className="bg-white/20 p-1 rounded-full group-hover:bg-white/30 transition-colors">
                            <Play size={18} fill="currentColor" />
                        </div>
                    </button>
                </div>
                <div className="hidden lg:block w-64 shrink-0">
                    <div className="sticky top-24 h-40 border-2 border-dashed border-slate-100 rounded-2xl flex items-center justify-center text-slate-200 font-bold text-xs uppercase tracking-widest">
                        Ready
                    </div>
                </div>
            </div>
        );
    }

    if (showResult) {
        return (
            <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in duration-500">
                <div className="bg-emerald-100 p-6 rounded-full mb-6 text-emerald-600">
                    <Trophy size={64} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Quiz Completed!</h2>
                <div className="text-6xl font-black text-slate-900 mb-8">
                    {score} <span className="text-2xl text-slate-400 font-medium">/ {quizData.length}</span>
                </div>
                <button onClick={restartQuiz} className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors font-bold">
                    <RefreshCw size={18} /> 다시 도전하기
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row gap-6 max-w-6xl ml-0">
            <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm p-6 flex flex-col relative overflow-hidden min-h-[450px]">
                <div className="flex justify-between items-center mb-6 pt-2 border-b border-slate-50 pb-4">
                    <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
                        Question {currentQuestionIndex + 1} 
                        <span className="text-slate-300 font-bold ml-2">/ {quizData.length}</span>
                    </h1>
                    <div className="lg:hidden text-sm font-bold text-slate-900">{score} pts</div>
                </div>

                <div className="flex-1 flex flex-col justify-center items-center text-center">
                    <div className="mb-8 w-full max-w-lg">
                        <p className="text-[13px] font-black text-blue-700 uppercase tracking-widest mb-2">이 동사의 시제와 인칭을 선택하세요</p>
                        <h2 className="text-4xl font-black text-slate-800 mb-2 tracking-tight">{currentQuestion.questionText}</h2>
                        <p className="text-slate-500 font-bold text-lg">({currentQuestion.verb} : {currentQuestion.meaning})</p>
                    </div>

                    <div className="w-full max-w-xl space-y-6">
                        <div className="flex flex-col gap-6">
                            <div className="space-y-2">
                                <p className="text-left text-[13px] font-black text-blue-700 uppercase tracking-wider ml-1">시제 (TENSE)</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {currentQuestion.tenseOptions.map(tense => (
                                        <button
                                            key={tense}
                                            onClick={() => !resultStatus && setSelectedTense(tense)}
                                            className={`px-3 py-3 rounded-2xl text-sm font-bold transition-all border-2 ${
                                                selectedTense === tense 
                                                    ? 'border-violet-500 bg-violet-50 text-violet-700' 
                                                    : 'border-slate-100 bg-white text-slate-500 hover:border-slate-300'
                                            } ${resultStatus && selectedTense !== tense ? 'opacity-40 cursor-not-allowed' : ''}
                                            ${resultStatus && currentQuestion.tenseName === tense ? 'border-emerald-500 bg-emerald-50 text-emerald-700 !opacity-100 ring-2 ring-emerald-200' : ''}
                                            ${resultStatus && selectedTense === tense && currentQuestion.tenseName !== tense ? 'border-red-500 bg-red-50 text-red-700' : ''}
                                            `}
                                        >
                                            {tense}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="text-left text-[13px] font-black text-blue-700 uppercase tracking-wider ml-1">인칭 (PERSON)</p>
                                <div className="grid grid-cols-3 gap-2">
                                    {PRONOUNS.map(person => (
                                        <button
                                            key={person}
                                            onClick={() => !resultStatus && setSelectedPerson(person)}
                                            className={`px-2 py-3 rounded-2xl text-sm font-bold transition-all border-2 ${
                                                selectedPerson === person 
                                                    ? 'border-violet-500 bg-violet-50 text-violet-700' 
                                                    : 'border-slate-100 bg-white text-slate-500 hover:border-slate-300'
                                            } ${resultStatus && selectedPerson !== person ? 'opacity-40 cursor-not-allowed' : ''}
                                            ${resultStatus && currentQuestion.person === person ? 'border-emerald-500 bg-emerald-50 text-emerald-700 !opacity-100 ring-2 ring-emerald-200' : ''}
                                            ${resultStatus && selectedPerson === person && currentQuestion.person !== person ? 'border-red-500 bg-red-50 text-red-700' : ''}
                                            `}
                                        >
                                            {person}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {!resultStatus && (
                                <button 
                                    onClick={handleAnswer}
                                    disabled={!selectedTense || !selectedPerson}
                                    className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-sm"
                                >
                                    정답 확인
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="h-20 mt-4 border-t border-slate-100 pt-4 flex justify-between items-center">
                     <div className="flex-1 text-center">
                        {resultStatus && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center">
                                <div className={`flex items-center gap-2 font-bold text-lg mb-1 ${
                                    resultStatus === 'correct' ? 'text-emerald-600' : 
                                    resultStatus === 'partial' ? 'text-amber-500' : 'text-red-500'
                                }`}>
                                    {resultStatus === 'correct' && <><CheckCircle size={20}/> 정답입니다! 🎉</>}
                                    {resultStatus === 'partial' && <><AlertTriangle size={20}/> 아깝네요! (부분 정답)</>}
                                    {resultStatus === 'wrong' && <><XCircle size={20}/> 오답입니다.</>}
                                </div>
                                {(resultStatus === 'partial' || resultStatus === 'wrong') && (
                                    <div className="text-sm text-slate-500 font-medium">
                                        정답: <span className="text-slate-900 font-bold">{currentQuestion.tenseName} - {currentQuestion.person}</span>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </div>
                    {resultStatus && (
                        <button onClick={nextQuestion} className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition-colors shadow-md animate-bounce-subtle">
                            Next <ArrowRight size={16} />
                        </button>
                    )}
                </div>
            </div>

            <div className="hidden lg:block w-64 shrink-0">
                <div className="sticky top-24 space-y-4">
                    <div className="bg-violet-50 text-violet-900 border border-violet-100 rounded-2xl p-5 shadow-sm flex flex-col items-center text-center">
                        <div className="text-[12px] font-black text-blue-700 uppercase tracking-widest mb-1">Current Score</div>
                        <div className="text-4xl font-black mb-1">{score}</div>
                        <div className="text-xs font-bold text-violet-500">Total {quizData.length} Questions</div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                        <h3 className="text-[12px] font-black text-blue-700 uppercase tracking-widest mb-3">History</h3>
                        <div className="grid grid-cols-5 gap-1.5">
                            {quizHistory.map((result, idx) => (
                                <div 
                                    key={idx} 
                                    className={`aspect-square rounded flex items-center justify-center text-[11px] font-bold transition-all ${
                                        idx === currentQuestionIndex ? 'ring-2 ring-violet-400 bg-violet-50 text-violet-600' :
                                        result === 'O' ? 'bg-emerald-100 text-emerald-600' :
                                        result === '△' ? 'bg-amber-100 text-amber-600' :
                                        result === 'X' ? 'bg-red-100 text-red-600' :
                                        'bg-slate-50 text-slate-200'
                                    }`}
                                >
                                    {idx + 1}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
