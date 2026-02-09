'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, ArrowRight, RefreshCw, Trophy, BookOpen, MessageCircle, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TENSE_MASTER_DATA } from '@/data/thematicData';
import { VERB_DICTIONARY } from '@/data/verb_dictionary';

interface QuizItem {
    id: string;
    type: number;
    verb: string;
    tense: string;
    sentence: string;
    answer: string;
    hint: string;
    options: string[];
    translation: string;
}

export default function VerbQuizClient({ quizData }: { quizData: QuizItem[] }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [quizHistory, setQuizHistory] = useState<boolean[]>([]);
    const [showHint, setShowHint] = useState(false);
    const [revealedWordIndices, setRevealedWordIndices] = useState<Set<number>>(new Set());
    const [userAnswers, setUserAnswers] = useState<string[]>([]); // Store user answers for review

    const currentQuestion = quizData[currentQuestionIndex];

    // Reset state on new question
    useEffect(() => {
        setSelectedOption(null);
        setIsCorrect(null);
        setShowHint(false);
        setRevealedWordIndices(new Set());
    }, [currentQuestionIndex]);

    const handleAnswer = (answer: string) => {
        if (isCorrect !== null) return; 

        const correct = answer.trim().toLowerCase() === currentQuestion.answer.toLowerCase();
        setIsCorrect(correct);
        setSelectedOption(answer);
        
        // Save answer for review
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = answer;
        setUserAnswers(newAnswers);
        
        if (correct) {
            setScore(prev => prev + 1);
            setQuizHistory(prev => [...prev, true]);
        } else {
            setQuizHistory(prev => [...prev, false]);
        }
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

    const toggleWordReveal = (idx: number) => {
        setRevealedWordIndices(prev => {
            const next = new Set(prev);
            if (next.has(idx)) next.delete(idx);
            else next.add(idx);
            return next;
        });
    };

    const renderQuestionContent = () => {
        const displaySentence = currentQuestion.sentence.replace(/\s*\([^)]+\)\s*$/, '');
        const parts = displaySentence.split(/(\*.*?\*|___)/g);
        
        // Find verb meaning
        let meaning = VERB_DICTIONARY[currentQuestion.verb] || '';
        
        if (!meaning) {
            for (const tense of TENSE_MASTER_DATA) {
                if (tense.irregularGroups) {
                    for (const group of tense.irregularGroups) {
                        const found = group.verbs.find(v => v.v === currentQuestion.verb);
                        if (found) { meaning = found.mean; break; }
                    }
                }
                if (meaning) break;
                if (tense.simpleIrregulars) {
                    const found = tense.simpleIrregulars.find(v => v.v === currentQuestion.verb);
                    if (found) { meaning = found.mean; break; }
                }
            }
        }

        // Logic to mask translation based on meaning
        let searchKey = '';
        if (meaning) {
             if (meaning.endsWith('하다')) searchKey = meaning.slice(0, -2);
             else if (meaning.length >= 2) searchKey = meaning.slice(0, 1);
             else searchKey = meaning;
        }

        const hasBrackets = currentQuestion.translation.includes('[') && currentQuestion.translation.includes(']');
        
        let transParts: string[] = [];
        let isSmartMasking = false;

        if (hasBrackets) {
             transParts = currentQuestion.translation.split(/(\[.*?\])/g);
             isSmartMasking = true;
        } else if (searchKey) {
             const words = currentQuestion.translation.split(' ');
             const markedTranslation = words.map(word => {
                 if (word.includes(searchKey)) return `[${word}]`;
                 return word;
             }).join(' ');
             
             if (markedTranslation.includes('[')) {
                 transParts = markedTranslation.split(/(\[.*?\])/g);
                 isSmartMasking = true;
             }
        } 
        
        if (!isSmartMasking) {
             transParts = [currentQuestion.translation];
        }

        return (
            <div className="mb-8">
                <h2 className="text-3xl font-medium text-slate-800 leading-relaxed mb-6">
                    {parts.map((part, idx) => {
                        if (part.startsWith('*') && part.endsWith('*')) {
                            return <span key={idx} className="text-blue-600 font-bold border-b-4 border-blue-100 px-1 mx-1">{part.slice(1, -1)}</span>;
                        } else if (part === '___') {
                            return (
                                <button 
                                    key={idx} 
                                    onClick={() => setShowHint(true)}
                                    className={`inline-block w-24 border-b-4 mx-2 h-8 align-middle rounded-sm transition-all ${
                                        showHint ? 'border-blue-400 bg-blue-50 animate-none' : 'border-slate-200 bg-slate-50 animate-pulse'
                                    }`}
                                >
                                    {showHint && <span className="text-xs font-bold text-blue-600 uppercase">Hint</span>}
                                </button>
                            );
                        }
                        return <span key={idx}>{part}</span>;
                    })}
                </h2>
                
                <div className="min-h-[50px] overflow-hidden">
                    <AnimatePresence mode="wait">
                        {!showHint ? (
                            <motion.button 
                                key="hint-button"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                onClick={() => setShowHint(true)}
                                className="flex items-center gap-2 px-5 py-3 bg-slate-100 text-slate-500 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all font-bold text-sm shadow-sm"
                            >
                                <BookOpen size={16} />
                                <span>해석 및 동사 힌트 보기</span>
                            </motion.button>
                        ) : (
                            <motion.div 
                                key="hint-content"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="bg-blue-50/50 border border-blue-100 p-5 rounded-2xl flex flex-col gap-3 relative"
                            >
                                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                                    <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">Verb</span>
                                    <span className="text-blue-700 text-base">동사 원형: {currentQuestion.verb}</span>
                                </div>
                                
                                <div className="text-lg text-slate-700 font-medium leading-relaxed animate-in fade-in slide-in-from-top-1 duration-500 mt-2">
                                    {isSmartMasking ? (
                                        transParts.map((part, idx) => {
                                            if (part.startsWith('[') && part.endsWith(']')) {
                                                const word = part.slice(1, -1);
                                                const isRevealed = revealedWordIndices.has(idx);
                                                return (
                                                    <button 
                                                        key={idx}
                                                        onClick={() => toggleWordReveal(idx)}
                                                        className={`mx-1 px-2 py-0.5 rounded-lg transition-all font-bold border-b-2 active:scale-95 inline-block align-middle ${
                                                            isRevealed 
                                                                ? 'bg-blue-100 text-blue-700 border-blue-200' 
                                                                : 'bg-slate-300 text-transparent border-slate-300 hover:bg-slate-400 select-none min-w-[40px]'
                                                        }`}
                                                    >
                                                        {word}
                                                    </button>
                                                );
                                            }
                                            return <span key={idx}>{part}</span>;
                                        })
                                    ) : (
                                        <span className="text-slate-700">{currentQuestion.translation}</span>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        );
    };

    if (!isPlaying) {
        return (
            <div className="flex flex-col lg:flex-row gap-6 max-w-6xl ml-0">
                <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm p-12 flex flex-col items-center justify-center min-h-[500px] animate-in fade-in duration-500">
                    <div className="bg-emerald-50 p-8 rounded-3xl mb-8 text-emerald-600 shadow-sm border border-emerald-100">
                        <MessageCircle size={64} strokeWidth={1.5} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">준비되셨나요?</h2>
                    <p className="text-slate-500 font-medium mb-10 text-center max-w-lg leading-relaxed">
                        총 <span className="text-emerald-600 font-bold">{quizData.length}문제</span>가 준비되어 있습니다.<br/>
                        시제와 문맥을 파악하여 정답을 맞춰보세요.
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
            <div className="flex flex-col items-center justify-center py-12 animate-in fade-in zoom-in duration-500 max-w-4xl mx-auto">
                <div className="bg-yellow-100 p-6 rounded-full mb-6 text-yellow-600">
                    <Trophy size={64} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Quiz Completed!</h2>
                <p className="text-slate-500 mb-8">당신의 최종 점수는?</p>
                <div className="text-6xl font-black text-slate-900 mb-12">
                    {score} <span className="text-2xl text-slate-400 font-medium">/ {quizData.length}</span>
                </div>
                
                <div className="w-full space-y-6 mb-12">
                    <h3 className="text-xl font-bold text-slate-800 border-b pb-2">오답 노트 (Review)</h3>
                    {quizData.map((item, idx) => {
                        const userAnswer = userAnswers[idx];
                        const isCorrect = userAnswer === item.answer;
                        return (
                            <div key={item.id} className={`p-5 rounded-xl border-2 ${isCorrect ? 'border-slate-100 bg-slate-50/50' : 'border-red-100 bg-red-50/30'}`}>
                                <div className="flex items-start gap-3 mb-3">
                                    <div className={`mt-1 ${isCorrect ? 'text-emerald-500' : 'text-red-500'}`}>
                                        {isCorrect ? <CheckCircle size={20} /> : <XCircle size={20} />}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-slate-800 text-lg mb-1">{item.sentence}</p>
                                        <p className="text-sm text-slate-500">{item.translation.replace(/\[/g, '').replace(/\]/g, '')}</p>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-8 mb-3">
                                    <div className="text-sm">
                                        <span className="font-bold text-slate-400 block mb-1">내 답안</span>
                                        <span className={`font-bold ${isCorrect ? 'text-emerald-600' : 'text-red-500 line-through'}`}>
                                            {userAnswer || '(미응답)'}
                                        </span>
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-bold text-slate-400 block mb-1">정답</span>
                                        <span className="font-bold text-emerald-600">{item.answer}</span>
                                    </div>
                                </div>

                                {!isCorrect && item.hint && (
                                    <div className="pl-8 mt-2 pt-2 border-t border-red-100 text-xs text-slate-600">
                                        <span className="font-bold text-red-500 mr-2">Why?</span>
                                        {item.hint}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <button onClick={restartQuiz} className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors font-bold sticky bottom-8 shadow-xl">
                    <RefreshCw size={18} /> 다시 도전하기
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row gap-6 max-w-6xl ml-0">
            <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm p-6 flex flex-col relative min-h-[450px]">
                <div className="flex justify-between items-center mb-6 pt-2 border-b border-slate-50 pb-4">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-2">
                            Question {currentQuestionIndex + 1} 
                            <span className="text-slate-300 font-bold ml-2">/ {quizData.length}</span>
                        </h1>
                        <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${
                                currentQuestion.type === 1 ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 
                                currentQuestion.type === 2 ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                            }`}>
                                {currentQuestion.type === 1 ? '시제 맞추기' : currentQuestion.type === 2 ? '단답형' : '객관식'}
                            </span>
                            <span className="text-xs font-bold text-slate-500">{currentQuestion.verb}</span>
                        </div>
                    </div>
                    <div className="lg:hidden text-sm font-bold text-slate-900">
                        {score} pts
                    </div>
                </div>

                <div className="flex-1 flex flex-col justify-center">
                    {renderQuestionContent()}

                    <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {currentQuestion.options.map((option, idx) => {
                                let btnClass = "p-3 rounded-xl border-2 text-left font-medium transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 text-sm";
                                
                                if (isCorrect !== null) {
                                    if (option === currentQuestion.answer) btnClass = "p-3 rounded-xl border-2 border-emerald-500 bg-emerald-50 text-emerald-700 font-bold text-sm";
                                    else if (selectedOption === option) btnClass = "p-3 rounded-xl border-2 border-red-500 bg-red-50 text-red-700 opacity-60 text-sm";
                                    else btnClass = "p-3 rounded-xl border border-slate-100 text-slate-400 opacity-50 cursor-not-allowed text-sm";
                                } else if (selectedOption === option) {
                                    btnClass = "p-3 rounded-xl border-2 border-blue-500 bg-blue-50 text-blue-700 font-bold text-sm";
                                }

                                return (
                                    <button 
                                        key={idx} 
                                        onClick={() => handleAnswer(option)}
                                        disabled={isCorrect !== null}
                                        className={btnClass}
                                    >
                                        {option}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Feedback & Next Button */}
                <div className="mt-8 border-t border-slate-100 pt-6 flex flex-col gap-4">
                    <div className="w-full">
                        {isCorrect !== null && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="w-full"
                            >
                                <div className={`flex items-center gap-2 font-bold text-sm mb-3 ${isCorrect ? 'text-emerald-600' : 'text-red-500'}`}>
                                    {isCorrect ? <CheckCircle size={18} /> : <XCircle size={18} />}
                                    <span>{isCorrect ? '정답입니다!' : `오답입니다. 정답: "${currentQuestion.answer}"`}</span>
                                </div>
                                
                                {currentQuestion.hint && (
                                    <div className={`relative overflow-hidden rounded-xl border p-4 text-sm leading-relaxed shadow-sm ${
                                        isCorrect 
                                            ? 'bg-emerald-50/50 border-emerald-100 text-emerald-900' 
                                            : 'bg-red-50/50 border-red-100 text-slate-700'
                                    }`}>
                                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${isCorrect ? 'bg-emerald-400' : 'bg-red-400'}`} />
                                        <div className="flex gap-3 pl-2">
                                            <div className="shrink-0 mt-0.5">
                                                <BookOpen size={16} className={isCorrect ? 'text-emerald-500' : 'text-red-400'} />
                                            </div>
                                            <div className="flex-1">
                                                <span className={`block text-xs font-bold uppercase tracking-wider mb-1 ${isCorrect ? 'text-emerald-500' : 'text-red-400'}`}>
                                                    Explanation
                                                </span>
                                                {currentQuestion.hint}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </div>
                    {isCorrect !== null && (
                        <button onClick={nextQuestion} className="self-end flex items-center gap-2 px-5 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition-colors shadow-sm animate-bounce-subtle text-sm">
                            다음 <ArrowRight size={14} />
                        </button>
                    )}
                </div>
            </div>

            {/* Right: Score Panel (Sticky) */}
            <div className="hidden lg:block w-64 shrink-0">
                <div className="sticky top-24 space-y-4">
                    <div className="bg-blue-50 text-blue-900 border border-blue-100 rounded-2xl p-5 shadow-sm flex flex-col items-center text-center">
                        <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Current Score</div>
                        <div className="text-4xl font-black mb-1">{score}</div>
                        <div className="text-xs font-medium text-blue-400">Total {quizData.length} Questions</div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">History</h3>
                        <div className="grid grid-cols-5 gap-1.5">
                            {Array.from({ length: quizData.length }).map((_, idx) => {
                                const isPlayed = idx < currentQuestionIndex;
                                return (
                                    <div 
                                        key={idx} 
                                        className={`aspect-square rounded flex items-center justify-center text-[10px] font-bold transition-all ${
                                            idx === currentQuestionIndex ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-400' :
                                            isPlayed ? (quizHistory[idx] ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600') :
                                            'bg-slate-50 text-slate-200'
                                        }`}
                                    >
                                        {idx + 1}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}