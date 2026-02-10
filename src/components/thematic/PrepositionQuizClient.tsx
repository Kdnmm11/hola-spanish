'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, ArrowRight, RefreshCw, Trophy, BookOpen, MessageCircle, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizItem {
    id: string;
    sentence: string;
    translation: string;
    answer: string;
    options: string[];
    type: string;
    explanation: string;
}

export default function PrepositionQuizClient({ quizData }: { quizData: QuizItem[] }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [quizHistory, setQuizHistory] = useState<boolean[]>([]);
    const [showHint, setShowHint] = useState(false);
    const [revealedTranslation, setRevealedTranslation] = useState(false);

    const currentQuestion = quizData[currentQuestionIndex];

    useEffect(() => {
        setSelectedOption(null);
        setIsCorrect(null);
        setShowHint(false);
        setRevealedTranslation(false);
    }, [currentQuestionIndex]);

    const handleAnswer = (option: string) => {
        if (isCorrect !== null) return;

        const correct = option.toLowerCase() === currentQuestion.answer.toLowerCase();
        setIsCorrect(correct);
        setSelectedOption(option);
        
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

    // Render Translation with hidden parts (*...*)
    const renderTranslation = () => {
        // Split by *...* markers
        const parts = currentQuestion.translation.split(/(\*[^*]+\*)/g);
        
        return (
            <div className="text-lg text-slate-700 font-medium leading-relaxed">
                {parts.map((part, idx) => {
                    if (part.startsWith('*') && part.endsWith('*')) {
                        const content = part.slice(1, -1);
                        return (
                            <span 
                                key={idx}
                                onClick={() => setRevealedTranslation(true)}
                                className={`mx-1 px-2 py-0.5 rounded-lg font-bold border-b-2 cursor-pointer transition-all ${
                                    revealedTranslation 
                                        ? 'bg-blue-100 text-blue-700 border-blue-200' 
                                        : 'bg-slate-200 text-transparent border-slate-300 hover:bg-slate-300 select-none'
                                }`}
                            >
                                {content}
                            </span>
                        );
                    }
                    return <span key={idx}>{part}</span>;
                })}
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
                        문맥에 맞는 정확한 전치사를 찾아보세요.
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

    const scrollToReview = (idx: number) => {
        const element = document.getElementById(`review-item-${idx}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    if (showResult) {
        return (
            <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto px-4 py-8 animate-in fade-in zoom-in duration-500">
                {/* Left: Review Content */}
                <div className="flex-1 min-w-0">
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-8 flex items-center justify-between shadow-sm">
                        <div className="flex flex-col">
                            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Quiz Finished</h2>
                            <p className="text-lg font-bold text-slate-800">학습 결과 리포트</p>
                        </div>
                        <div className="flex items-center gap-3 pr-2">
                            <div className="flex flex-col items-end">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-black text-blue-600">{score}</span>
                                    <span className="text-slate-300 font-bold">/</span>
                                    <span className="text-xl font-bold text-slate-400">{quizData.length}</span>
                                </div>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Questions Correct</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <BookOpen size={20} className="text-slate-400" />
                            <h3 className="text-lg font-bold text-slate-800">오답 노트 (Review)</h3>
                        </div>
                        
                        {quizData.map((item, idx) => (
                            <div 
                                id={`review-item-${idx}`}
                                key={item.id} 
                                className={`p-5 rounded-2xl border-2 transition-colors ${
                                    quizHistory[idx] 
                                        ? 'border-emerald-100 bg-white' 
                                        : 'border-red-100 bg-white'
                                }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`mt-1 shrink-0 ${quizHistory[idx] ? 'text-emerald-500' : 'text-red-500'}`}>
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 font-bold text-sm border border-slate-100">
                                            {idx + 1}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <p className="font-bold text-slate-800 text-lg leading-snug">
                                                {item.sentence.split('___').map((part, i) => (
                                                    <span key={i}>
                                                        {part}
                                                        {i === 0 && (
                                                            <span className={`mx-1 px-2 rounded text-${quizHistory[idx] ? 'emerald' : 'red'}-600 bg-${quizHistory[idx] ? 'emerald' : 'red'}-50 border border-${quizHistory[idx] ? 'emerald' : 'red'}-100`}>
                                                                {item.answer}
                                                            </span>
                                                        )}
                                                    </span>
                                                ))}
                                            </p>
                                            {quizHistory[idx] ? <CheckCircle size={20} className="text-emerald-400 shrink-0" /> : <XCircle size={20} className="text-red-400 shrink-0" />}
                                        </div>
                                        <p className="text-sm text-slate-500 mb-4">{item.translation.replace(/\*/g, '')}</p>
                                        
                                        <div className="bg-slate-50 rounded-xl p-3 text-sm text-slate-600 border border-slate-100">
                                            <div className="flex gap-2">
                                                <span className="font-bold text-blue-600 shrink-0">해설:</span>
                                                <span>{item.explanation}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button onClick={restartQuiz} className="w-full mt-8 flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        <RefreshCw size={18} /> 다시 도전하기
                    </button>
                </div>

                {/* Right: Sticky Navigation */}
                <aside className="hidden lg:block w-64 shrink-0">
                    <div className="sticky top-24 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center justify-between">
                            <span>Index</span>
                            <span className="text-xs normal-case bg-slate-100 px-2 py-0.5 rounded text-slate-500">{quizData.length} Qs</span>
                        </h3>
                        <div className="grid grid-cols-5 gap-2">
                            {quizHistory.map((isCorrect, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => scrollToReview(idx)}
                                    className={`aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-all hover:scale-110 hover:shadow-md ${
                                        isCorrect 
                                            ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' 
                                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                                    }`}
                                >
                                    {idx + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>
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
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border bg-indigo-50 text-indigo-600 border-indigo-100">
                                {currentQuestion.type}
                            </span>
                        </div>
                    </div>
                    <div className="lg:hidden text-sm font-bold text-slate-900">{score} pts</div>
                </div>

                <div className="flex-1 flex flex-col justify-center">
                    <div className="mb-8">
                        <h2 className="text-3xl font-medium text-slate-800 leading-relaxed mb-6">
                            {currentQuestion.sentence.split('(').map((part, i) => (
                                i === 0 ? part : (
                                    <span key={i} className="inline-block border-b-4 border-slate-200 px-2 min-w-[60px] text-center text-transparent bg-slate-50 rounded mx-1">?</span>
                                    + part.split(')')[1]
                                )
                            ))}
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
                                        <span>해석 보기</span>
                                    </motion.button>
                                ) : (
                                    <motion.div 
                                        key="hint-content"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        className="bg-blue-50/50 border border-blue-100 p-5 rounded-2xl"
                                    >
                                        {renderTranslation()}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {currentQuestion.options.map((option, idx) => {
                            let btnClass = "p-4 rounded-xl border-2 text-center font-bold transition-all duration-200 text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600";
                            
                            if (isCorrect !== null) {
                                if (option === currentQuestion.answer) btnClass = "p-4 rounded-xl border-2 border-emerald-500 bg-emerald-50 text-emerald-700 font-bold";
                                else if (selectedOption === option) btnClass = "p-4 rounded-xl border-2 border-red-500 bg-red-50 text-red-700 opacity-60";
                                else btnClass = "p-4 rounded-xl border border-slate-100 text-slate-300 opacity-40 cursor-not-allowed";
                            } else if (selectedOption === option) {
                                btnClass = "p-4 rounded-xl border-2 border-blue-500 bg-blue-50 text-blue-700 font-bold";
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
                                            {currentQuestion.explanation}
                                        </div>
                                    </div>
                                </div>
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

            <div className="hidden lg:block w-64 shrink-0">
                <div className="sticky top-24 space-y-4">
                    <div className="bg-indigo-50 text-indigo-900 border border-indigo-100 rounded-2xl p-5 shadow-sm flex flex-col items-center text-center">
                        <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Current Score</div>
                        <div className="text-4xl font-black mb-1">{score}</div>
                        <div className="text-xs font-medium text-indigo-400">Total {quizData.length} Questions</div>
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
                                            idx === currentQuestionIndex ? 'bg-indigo-100 text-indigo-600 ring-2 ring-indigo-400' :
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
