'use client';

import React, { useState, useEffect } from 'react';
import { GRAMMAR_QUIZ_POOL, GrammarQuizItem } from '../../../../data/testData';
import { BrainCircuit, RefreshCw, Check, Home, X, Play } from 'lucide-react';
import Link from 'next/link';
import { saveQuizResult } from '@/lib/progress';

export default function GrammarQuizPage() {
    const [questions, setQuestions] = useState<GrammarQuizItem[]>([]);
    const [isStarted, setIsStarted] = useState(false); // Start Screen State
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
    
    // Feedback States
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [wrongCount, setWrongCount] = useState(0);

    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        // Load random questions on mount (or when start is clicked)
        const shuffled = [...GRAMMAR_QUIZ_POOL].sort(() => 0.5 - Math.random());
        setQuestions(shuffled.slice(0, 20));
    }, []);

    const startQuiz = () => {
        // Reset and start
        const shuffled = [...GRAMMAR_QUIZ_POOL].sort(() => 0.5 - Math.random());
        setQuestions(shuffled.slice(0, 20));
        setIsStarted(true);
    };

    const handleAnswer = (optionIndex: number) => {
        if (isAnswered) return; // Prevent double click

        setSelectedOption(optionIndex);
        setIsAnswered(true);

        const isCorrect = optionIndex === questions[currentIndex].answer;
        if (isCorrect) {
            setCorrectCount(prev => prev + 1);
        } else {
            setWrongCount(prev => prev + 1);
        }

        // Save answer
        const nextAnswers = [...userAnswers];
        nextAnswers[currentIndex] = optionIndex;
        setUserAnswers(nextAnswers);

        // Auto advance after short delay
        setTimeout(() => {
            if (currentIndex < questions.length - 1) {
                setCurrentIndex(prev => prev + 1);
                setSelectedOption(null);
                setIsAnswered(false);
            } else {
                setIsFinished(true);
            }
        }, 1000); 
    };

    // Save Progress
    useEffect(() => {
        if (isFinished && questions.length > 0) {
            saveQuizResult(
                'Grammar', // Type
                '랜덤 문법 퀴즈', // Title
                correctCount, // Score
                questions.length // Total
            );
        }
    }, [isFinished, correctCount, questions.length]);

    // --- 1. Start Screen ---
    if (!isStarted) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-6">
                <div className="max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-8 text-indigo-600 shadow-lg shadow-indigo-50">
                        <BrainCircuit size={40} />
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 mb-4">랜덤 문법 퀴즈</h1>
                    <p className="text-slate-500 mb-10 leading-relaxed">
                        전체 문법 챕터에서 무작위로 <strong className="text-indigo-600">20문제</strong>가 출제됩니다.<br/>
                        다양한 문법 지식을 테스트하고 부족한 부분을 확인해보세요.
                    </p>
                    
                    <button 
                        onClick={startQuiz}
                        className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-2"
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

    if (questions.length === 0) return <div className="p-10 text-center">Loading Quiz...</div>;

    // --- 2. Result Screen ---
    if (isFinished) {
        const results = questions.map((q, idx) => {
            const isCorrect = userAnswers[idx] === q.answer;
            return { ...q, userAnswer: userAnswers[idx], isCorrect };
        });

        return (
            <div className="max-w-4xl mx-auto py-12 px-6">
                <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
                    <div className="bg-indigo-600 p-10 text-center text-white">
                        <BrainCircuit size={48} className="mx-auto mb-4 opacity-50" />
                        <h2 className="text-3xl font-extrabold mb-2">Result Report</h2>
                        <div className="text-6xl font-black">{correctCount} <span className="text-2xl opacity-60">/ 20</span></div>
                    </div>
                    <div className="p-8 bg-slate-50 space-y-6">
                        {results.map((item, idx) => (
                            <div key={idx} className={`p-6 rounded-2xl border-2 ${item.isCorrect ? 'bg-white border-slate-200' : 'bg-red-50 border-red-100'}`}>
                                <div className="flex gap-3 mb-4">
                                    <span className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold text-sm ${item.isCorrect ? 'bg-indigo-100 text-indigo-700' : 'bg-red-200 text-red-700'}`}>Q{idx+1}</span>
                                    <h4 className="font-bold text-slate-900 text-lg">{item.q}</h4>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                    <div className={`p-3 rounded-xl border text-sm ${item.isCorrect ? 'bg-indigo-50 border-indigo-200 text-indigo-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                                        <span className="text-[10px] font-bold opacity-60 block mb-1">나의 선택</span>
                                        {item.userAnswer !== null && item.userAnswer !== undefined ? item.options[item.userAnswer] : '(미선택)'}
                                    </div>
                                    {!item.isCorrect && (
                                        <div className="p-3 rounded-xl border bg-green-50 border-green-200 text-green-800 text-sm">
                                            <span className="text-[10px] font-bold text-green-600 block mb-1">정답</span>
                                            {item.options[item.answer]}
                                        </div>
                                    )}
                                </div>
                                <div className="text-sm text-slate-600 bg-white p-4 rounded-xl border border-slate-100">{item.explain}</div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center gap-4 p-8 border-t bg-white">
                        <button onClick={() => window.location.reload()} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors flex items-center gap-2"><RefreshCw size={18}/> 다시 풀기</button>
                        <Link href="/quiz" className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 flex items-center gap-2"><Home size={18}/> 메뉴로</Link>
                    </div>
                </div>
            </div>
        );
    }

    // --- 3. Quiz Screen ---
    return (
        <div className="min-h-screen bg-white">
            <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/quiz" className="p-2 -ml-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-colors"><Home size={20} /></Link>
                        <span className="text-sm font-black text-slate-700">{currentIndex + 1} <span className="text-slate-300">/ 20</span></span>
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
                    <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${(currentIndex / 20) * 100}%` }}></div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto py-12 px-6">
                <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 md:p-12 mt-4">
                    <h3 className="text-2xl font-bold text-slate-900 mb-10 leading-relaxed text-center break-keep">
                        {questions[currentIndex].q}
                    </h3>
                    <div className="space-y-4">
                        {questions[currentIndex].options.map((opt, idx) => {
                            let btnStyle = "bg-slate-50/50 border-slate-100 text-slate-800 hover:border-indigo-300 hover:bg-indigo-50";
                            if (isAnswered) {
                                if (idx === selectedOption) {
                                    if (idx === questions[currentIndex].answer) {
                                        btnStyle = "bg-green-100 border-green-400 text-green-800 ring-2 ring-green-200"; // 맞음
                                    } else {
                                        btnStyle = "bg-red-100 border-red-400 text-red-800 ring-2 ring-red-200"; // 틀림
                                    }
                                } else {
                                    btnStyle = "opacity-40 grayscale"; // 나머지 흐리게
                                }
                            }

                            return (
                                <button 
                                    key={idx} 
                                    onClick={() => handleAnswer(idx)} 
                                    disabled={isAnswered}
                                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all font-bold flex items-center group active:scale-[0.98] ${btnStyle}`}
                                >
                                    <span className={`w-8 h-8 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 text-xs mr-4 transition-colors ${!isAnswered && 'group-hover:border-indigo-300 group-hover:text-indigo-600'}`}>
                                        {idx + 1}
                                    </span>
                                    {opt}
                                    {isAnswered && idx === selectedOption && (
                                        <div className="ml-auto">
                                            {idx === questions[currentIndex].answer ? <Check size={20} className="text-green-600"/> : <X size={20} className="text-red-600"/>}
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
}