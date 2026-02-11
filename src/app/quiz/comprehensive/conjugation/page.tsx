'use client';

import React, { useState, useEffect } from 'react';
import { ConjugationQuizItem } from '../../../../data/testData';
import { PenTool, ArrowRight, RefreshCw, Check, X, Home, Info, Loader2, Play } from 'lucide-react';
import Link from 'next/link';
import { saveQuizResult } from '@/lib/progress';

export default function ConjugationQuizPage() {
    const [quizData, setQuizData] = useState<ConjugationQuizItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<string[]>([]);
    const [currentInput, setCurrentInput] = useState('');
    const [isFinished, setIsFinished] = useState(false);
    
    // New States for immediate feedback
    const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
    const [correctCount, setCorrectCount] = useState(0);
    const [wrongCount, setWrongCount] = useState(0);

    // Fetch data
    const fetchQuizData = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/quiz/conjugation.json');
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            const shuffled = [...data];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            setQuizData(shuffled.slice(0, 20));
            resetState();
        } catch (error) {
            console.error(error);
            alert('퀴즈 데이터를 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const startQuiz = () => {
        fetchQuizData();
        setIsStarted(true);
    };

    const resetState = () => {
        setCurrentIndex(0);
        setUserAnswers([]);
        setCurrentInput('');
        setStatus('idle');
        setCorrectCount(0);
        setWrongCount(0);
        setIsFinished(false);
    };

    const resetQuiz = () => {
        fetchQuizData(); // Re-fetch new random questions
    };

    const totalQuestions = quizData.length;
    const question = quizData[currentIndex];

    // Save Progress when finished
    useEffect(() => {
        if (isFinished && totalQuestions > 0) {
            saveQuizResult(
                'Exam', // Type
                '시제 맞추기 퀴즈', // Title
                correctCount, // Score
                totalQuestions // Total
            );
        }
    }, [isFinished, correctCount, totalQuestions]);

    // 확인 및 다음 단계 처리
    const handleSubmitOrNext = (e?: React.FormEvent) => {
        e?.preventDefault();

        // 1. 아직 제출 안 함 -> 채점 진행
        if (status === 'idle') {
            const isCorrect = currentInput.trim().toLowerCase() === question.answer.toLowerCase();
            
            if (isCorrect) {
                setStatus('correct');
                setCorrectCount(prev => prev + 1);
            } else {
                setStatus('wrong');
                setWrongCount(prev => prev + 1);
            }
            return;
        }

        // 2. 이미 제출함(결과 확인 중) -> 다음 문제로 이동
        const nextAnswers = [...userAnswers, currentInput.trim()];
        setUserAnswers(nextAnswers);

        if (currentIndex < totalQuestions - 1) {
            setCurrentIndex(prev => prev + 1);
            setCurrentInput('');
            setStatus('idle');
        } else {
            setIsFinished(true);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSubmitOrNext();
    };

    // --- 1. Start Screen ---
    if (!isStarted) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-6">
                <div className="max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-teal-100 rounded-3xl flex items-center justify-center mx-auto mb-8 text-teal-600 shadow-lg shadow-teal-50">
                        <PenTool size={40} />
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 mb-4">시제 맞추기 테스트</h1>
                    <p className="text-slate-500 mb-10 leading-relaxed">
                        전체 데이터베이스에서 무작위로 추출된 <strong className="text-teal-600">20문제</strong>가 출제됩니다.<br/>
                        동사의 올바른 변화형을 입력하여 실력을 점검하세요.
                    </p>
                    
                    <button 
                        onClick={startQuiz}
                        className="w-full py-4 bg-teal-600 text-white rounded-2xl font-bold text-lg hover:bg-teal-700 transition-all shadow-xl shadow-teal-200 flex items-center justify-center gap-2"
                    >
                        <Play size={20} fill="currentColor" /> 테스트 시작하기
                    </button>
                    
                    <Link href="/quiz" className="block mt-6 text-slate-400 text-sm hover:text-slate-600 font-medium">
                        뒤로 가기
                    </Link>
                </div>
            </div>
        );
    }

    // --- 2. Loading Screen ---
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white text-slate-400">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 size={48} className="animate-spin text-teal-500" />
                    <p className="font-bold text-lg">문제를 불러오는 중...</p>
                </div>
            </div>
        );
    }

    // --- 3. Result Screen ---
    if (isFinished) {
        const results = quizData.map((q, idx) => {
            const isCorrect = userAnswers[idx]?.toLowerCase() === q.answer.toLowerCase();
            return { ...q, userAnswer: userAnswers[idx], isCorrect };
        });

        return (
            <div className="max-w-4xl mx-auto py-12 px-6">
                <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
                    <div className="bg-teal-600 p-8 text-center text-white">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <PenTool size={32} className="text-white" />
                        </div>
                        <h2 className="text-3xl font-extrabold mb-2">Result Report</h2>
                        <div className="text-5xl font-black">{correctCount} <span className="text-2xl opacity-60">/ {totalQuestions}</span></div>
                    </div>
                    <div className="p-8 bg-slate-50 space-y-4">
                        {results.map((item, idx) => (
                            <div key={item.id} className={`p-4 rounded-xl border ${item.isCorrect ? 'bg-white border-slate-200' : 'bg-red-50 border-red-100'} flex flex-col md:flex-row md:items-center justify-between gap-4`}>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1 text-xs font-bold text-slate-400">
                                        Q{idx + 1}. <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded">{item.verb}</span>
                                    </div>
                                    <p className="text-slate-800 font-medium text-lg mb-2">
                                        {item.sentence.split('______').map((part, i, arr) => (
                                            <React.Fragment key={i}>
                                                {part}
                                                {i < arr.length - 1 && (
                                                    <span className={`font-bold px-1 underline underline-offset-4 decoration-2 ${item.isCorrect ? 'text-teal-600 decoration-teal-400' : 'text-red-600 decoration-red-400'}`}>
                                                        {item.userAnswer || '(빈칸)'}
                                                    </span>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </p>
                                    {item.translation && (
                                        <p className="text-sm text-slate-500 mb-1">{item.translation}</p>
                                    )}
                                    {item.explanation && (
                                        <p className="text-xs text-slate-400 bg-slate-100 inline-block px-2 py-1 rounded border border-slate-200">
                                            💡 {item.explanation}
                                        </p>
                                    )}
                                </div>
                                {!item.isCorrect && (
                                    <div className="shrink-0 bg-white px-3 py-2 rounded-lg border border-red-100 shadow-sm text-sm">
                                        <div className="text-xs text-slate-400 font-bold mb-0.5">정답</div>
                                        <div className="text-teal-600 font-bold">{item.answer}</div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center gap-4 p-8 border-t border-slate-200 bg-white">
                        <button onClick={resetQuiz} className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-colors"><RefreshCw size={18} /> 새로운 문제 풀기</button>
                        <Link href="/quiz" className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors"><Home size={18} /> 메뉴로</Link>
                    </div>
                </div>
            </div>
        );
    }

    if (!question) return null;

    // --- 4. Quiz Screen ---
    return (
        <div className="min-h-screen bg-white">
            {/* STICKY HEADER */}
            <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/quiz" className="p-2 -ml-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-colors">
                            <Home size={20} />
                        </Link>
                        <span className="text-sm font-black text-slate-700">{currentIndex + 1} <span className="text-slate-300">/ {totalQuestions}</span></span>
                    </div>

                    {/* LIVE SCOREBOARD */}
                    <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
                        <div className="flex items-center gap-1.5">
                            <Check size={16} className="text-green-500" />
                            <span className="text-sm font-black text-slate-700">{correctCount}</span>
                        </div>
                        <div className="w-px h-3 bg-slate-300"></div>
                        <div className="flex items-center gap-1.5">
                            <X size={16} className="text-red-500" />
                            <span className="text-sm font-black text-slate-700">{wrongCount}</span>
                        </div>
                    </div>
                </div>
                {/* Progress Bar */}
                <div className="h-1 bg-slate-50 w-full">
                    <div className="h-full bg-teal-500 transition-all duration-300" style={{ width: `${(currentIndex / totalQuestions) * 100}%` }}></div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto py-12 px-6">
                <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 md:p-12 relative overflow-hidden mt-4">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-1.5 rounded-full text-xs font-black tracking-wide border border-teal-100 mb-6">
                            <Info size={14} /> <span className="font-extrabold">{question.verb}</span>
                        </div>
                        
                        <div className="text-xl md:text-2xl font-bold text-slate-800 leading-snug break-keep flex flex-wrap justify-center items-center gap-2">
                            <span>{question.sentence.split('______')[0]}</span>
                            <span className={`inline-block px-2 border-b-4 min-w-[80px] text-center italic transition-colors
                                ${status === 'idle' ? 'border-teal-500 text-teal-600' : 
                                  status === 'correct' ? 'border-green-500 text-green-600 bg-green-50' : 'border-red-500 text-red-600 bg-red-50'}`}>
                                {currentInput || '_____'}
                            </span>
                            <span>{question.sentence.split('______')[1]}</span>
                        </div>
                    </div>

                    <div className="max-w-sm mx-auto mt-12">
                        <input 
                            type="text" 
                            value={currentInput}
                            onChange={(e) => setCurrentInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={status !== 'idle'}
                            placeholder={status === 'idle' ? "정답 입력" : (status === 'correct' ? "정답입니다!" : "오답입니다 (정답 비공개)")}
                            autoFocus
                            className={`w-full text-center text-lg p-5 rounded-2xl border-2 outline-none transition-all font-black
                                ${status === 'idle' 
                                    ? 'border-slate-100 focus:border-teal-500 focus:ring-8 focus:ring-teal-500/5 text-slate-900 bg-slate-50/50' 
                                    : status === 'correct' 
                                        ? 'border-green-200 bg-green-50 text-green-700' 
                                        : 'border-red-200 bg-red-50 text-red-700'}`}
                        />
                        
                        <button 
                            onClick={handleSubmitOrNext}
                            className={`w-full mt-6 py-5 rounded-2xl font-black text-base transition-all flex items-center justify-center gap-2 shadow-xl active:scale-[0.98]
                                ${status === 'idle' 
                                    ? 'bg-slate-900 text-white hover:bg-black shadow-slate-200' 
                                    : status === 'correct'
                                        ? 'bg-green-500 text-white hover:bg-green-600 shadow-green-200'
                                        : 'bg-red-500 text-white hover:bg-red-600 shadow-red-200'}`}
                        >
                            {status === 'idle' ? '확인 (Check)' : (currentIndex < totalQuestions - 1 ? '다음 문제' : '결과 보기')} 
                            <ArrowRight size={20} />
                        </button>

                        {status !== 'idle' && (
                            <div className="mt-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {question.translation && (
                                    <p className="text-slate-600 font-medium text-lg mb-3">
                                        {question.translation}
                                    </p>
                                )}
                                {question.explanation && (
                                    <div className={`p-4 rounded-2xl text-sm font-medium border text-left
                                        ${status === 'correct' ? 'bg-green-50 text-green-800 border-green-100' : 'bg-red-50 text-red-800 border-red-100'}`}>
                                        <div className="flex items-start gap-2">
                                            <span className="text-lg">💡</span>
                                            <span>{question.explanation}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
