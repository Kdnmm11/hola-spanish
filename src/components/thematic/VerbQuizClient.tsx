'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, ArrowRight, RefreshCw, Trophy, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [userInput, setUserInput] = useState('');
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [quizHistory, setQuizHistory] = useState<boolean[]>([]);
    const [showHint, setShowHint] = useState(false);
    const [revealedWordIndices, setRevealedWordIndices] = useState<Set<number>>(new Set());

    const currentQuestion = quizData[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / quizData.length) * 100;

    // Reset state on new question
    useEffect(() => {
        setSelectedOption(null);
        setUserInput('');
        setIsCorrect(null);
        setShowHint(false);
        setRevealedWordIndices(new Set());
    }, [currentQuestionIndex]);

    const handleAnswer = (answer: string) => {
        if (isCorrect !== null) return; // Prevent multiple submissions

        const correct = answer.trim().toLowerCase() === currentQuestion.answer.toLowerCase();
        setIsCorrect(correct);
        setSelectedOption(answer);
        
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

    // Render Question Content based on Type
    const renderQuestionContent = () => {
        // Remove the hint part "(verb)" from the sentence for display
        const displaySentence = currentQuestion.sentence.replace(/\s*\([^)]+\)\s*$/, '');
        const parts = displaySentence.split(/(\*.*?\*|___)/g);
        
        // Parse translation to handle hidden words like [모습이었어요]
        const transParts = currentQuestion.translation.split(/(\[.*?\])/g);

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
                
                {/* Hint Section */}
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
                                
                                <div className="text-lg text-slate-700 font-medium leading-relaxed animate-in fade-in slide-in-from-top-1 duration-500">
                                    {transParts.map((part, idx) => {
                                        if (part.startsWith('[') && part.endsWith(']')) {
                                            const word = part.slice(1, -1);
                                            const isRevealed = revealedWordIndices.has(idx);
                                            return (
                                                <button 
                                                    key={idx}
                                                    onClick={() => toggleWordReveal(idx)}
                                                    className={`mx-1 px-3 py-0.5 rounded-lg transition-all font-bold border-b-2 active:scale-95 ${
                                                        isRevealed 
                                                            ? 'bg-blue-100 text-blue-700 border-blue-200' 
                                                            : 'bg-slate-200 text-slate-400 border-slate-300 hover:bg-slate-300'
                                                    }`}
                                                >
                                                    {isRevealed ? word : '빈칸'}
                                                </button>
                                            );
                                        }
                                        return <span key={idx}>{part}</span>;
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        );
    };

    if (showResult) {
        return (
            <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in duration-500">
                <div className="bg-yellow-100 p-6 rounded-full mb-6 text-yellow-600">
                    <Trophy size={64} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Quiz Completed!</h2>
                <p className="text-slate-500 mb-8">당신의 최종 점수는?</p>
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
            {/* Left: Quiz Area */}
            <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm p-6 flex flex-col relative overflow-hidden min-h-[450px]">
                {/* Header */}
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
                    {/* Score for mobile */}
                    <div className="lg:hidden text-sm font-bold text-slate-900">
                        {score} pts
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-center">
                    {renderQuestionContent()}

                    {/* Inputs/Options */}
                    <div className="space-y-3">
                        {/* Type 1 & 3: Options */}
                        {(currentQuestion.type === 1 || currentQuestion.type === 3) && (
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
                        )}

                        {/* Type 2: Text Input */}
                        {currentQuestion.type === 2 && (
                            <div className="flex flex-col gap-4">
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        value={userInput}
                                        onChange={(e) => setUserInput(e.target.value)}
                                        placeholder="정답을 입력하세요..."
                                        disabled={isCorrect !== null}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !isCorrect && userInput.trim()) {
                                                handleAnswer(userInput);
                                            }
                                        }}
                                        className={`w-full p-3 text-base border-2 rounded-xl focus:outline-none transition-colors ${
                                            isCorrect === null ? 'border-slate-200 focus:border-blue-500' :
                                            isCorrect ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-red-500 bg-red-50 text-red-700'
                                        }`}
                                    />
                                    {isCorrect !== null && (
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                            {isCorrect ? <CheckCircle className="text-emerald-500" size={20} /> : <XCircle className="text-red-500" size={20} />}
                                        </div>
                                    )}
                                </div>
                                {isCorrect === null && (
                                    <button 
                                        onClick={() => handleAnswer(userInput)}
                                        disabled={!userInput.trim()}
                                        className="w-full p-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                    >
                                        제출하기
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Feedback & Next Button */}
                <div className="h-16 mt-4 border-t border-slate-100 pt-4 flex justify-between items-center">
                    <div className="flex-1">
                        {isCorrect !== null && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex items-center gap-2 font-bold text-sm ${isCorrect ? 'text-emerald-600' : 'text-red-500'}`}
                            >
                                {isCorrect ? '정답입니다! 🎉' : `오답입니다. 정답: "${currentQuestion.answer}"`}
                            </motion.div>
                        )}
                    </div>
                    {isCorrect !== null && (
                        <button onClick={nextQuestion} className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition-colors shadow-sm animate-bounce-subtle text-sm">
                            다음 <ArrowRight size={14} />
                        </button>
                    )}
                </div>
            </div>

            {/* Right: Score Panel (Sticky) */}
            <div className="hidden lg:block w-64 shrink-0">
                <div className="sticky top-24 space-y-4">
                    {/* Score Card */}
                    <div className="bg-blue-50 text-blue-900 border border-blue-100 rounded-2xl p-5 shadow-sm flex flex-col items-center text-center">
                        <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Current Score</div>
                        <div className="text-4xl font-black mb-1">{score}</div>
                        <div className="text-xs font-medium text-blue-400">Total {quizData.length} Questions</div>
                    </div>

                    {/* History Grid */}
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
                                            isPlayed ? 'bg-slate-100 text-slate-400' :
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
