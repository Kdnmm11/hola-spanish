'use client';

import React, { useState, useEffect } from 'react';
import { ERROR_CORRECTION_DATA, ErrorCorrectionItem } from '../../../../data/testData';
import { CheckCircle, RefreshCw, ArrowRight, Home, AlertCircle, Check, X, Play } from 'lucide-react';
import Link from 'next/link';
import { saveQuizResult } from '@/lib/progress';

export default function ErrorCorrectionPage() {
    const [isStarted, setIsStarted] = useState(false); // Start Screen State
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userSelectedIndices, setUserSelectedIndices] = useState<(number | null)[]>([]);
    
    // Feedback States
    const [currentSelection, setCurrentSelection] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [wrongCount, setWrongCount] = useState(0);

    const [isFinished, setIsFinished] = useState(false);

    const totalQuestions = ERROR_CORRECTION_DATA.length;
    const question = ERROR_CORRECTION_DATA[currentIndex];

    const startQuiz = () => {
        setIsStarted(true);
    };

    const handleWordClick = (idx: number) => {
        if (isAnswered) return;

        setCurrentSelection(idx);
        setIsAnswered(true);

        const isCorrect = idx === question.wrongIndex;
        if (isCorrect) {
            setCorrectCount(prev => prev + 1);
        } else {
            setWrongCount(prev => prev + 1);
        }

        const nextIndices = [...userSelectedIndices, idx];
        setUserSelectedIndices(nextIndices);

        // Auto advance
        setTimeout(() => {
            if (currentIndex < totalQuestions - 1) {
                setCurrentIndex(prev => prev + 1);
                setCurrentSelection(null);
                setIsAnswered(false);
            } else {
                setIsFinished(true);
            }
        }, 1000);
    };

    // Save Progress
    useEffect(() => {
        if (isFinished && totalQuestions > 0) {
            saveQuizResult(
                'Exam', // Type (Correction is also an exam type)
                '틀린 곳 찾기 테스트', // Title
                correctCount, // Score
                totalQuestions // Total
            );
        }
    }, [isFinished, correctCount, totalQuestions]);

    // --- 1. Start Screen ---
    if (!isStarted) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-6">
                <div className="max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-rose-100 rounded-3xl flex items-center justify-center mx-auto mb-8 text-rose-600 shadow-lg shadow-rose-50">
                        <CheckCircle size={40} />
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 mb-4">틀린 곳 찾기 테스트</h1>
                    <p className="text-slate-500 mb-10 leading-relaxed">
                        주어진 문장에서 문법적으로 틀린 부분을 찾아내세요.<br/>
                        정확한 눈과 문법 지식이 필요한 실전 훈련입니다.
                    </p>
                    
                    <button 
                        onClick={startQuiz}
                        className="w-full py-4 bg-rose-600 text-white rounded-2xl font-bold text-lg hover:bg-rose-700 transition-all shadow-xl shadow-rose-200 flex items-center justify-center gap-2"
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

    // --- 2. Result Screen ---
    if (isFinished) {
        // Result Screen logic same as before
        const results = ERROR_CORRECTION_DATA.map((q, idx) => {
            const isCorrect = userSelectedIndices[idx] === q.wrongIndex;
            return { ...q, userIdx: userSelectedIndices[idx], isCorrect };
        });

        return (
            <div className="max-w-4xl mx-auto py-12 px-6">
                 <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
                    <div className="bg-rose-600 p-10 text-center text-white">
                        <CheckCircle size={48} className="mx-auto mb-4 opacity-50" />
                        <h2 className="text-3xl font-extrabold mb-2">Result Report</h2>
                        <div className="text-6xl font-black">{correctCount} <span className="text-2xl opacity-60">/ {totalQuestions}</span></div>
                    </div>
                    <div className="p-8 bg-slate-50 space-y-6">
                        {results.map((item, idx) => (
                            <div key={idx} className={`p-6 rounded-2xl border-2 ${item.isCorrect ? 'bg-white border-slate-200' : 'bg-red-50 border-red-100'}`}>
                                <div className="flex items-center gap-2 mb-4 text-xs font-bold px-2 py-1 rounded w-fit bg-slate-100 text-slate-400">Q{idx + 1}</div>
                                <div className="flex flex-wrap gap-2 mb-4 text-xl p-5 bg-slate-50 rounded-2xl border border-slate-100 font-bold">
                                    {item.sentence.map((word, wIdx) => (
                                        <span key={wIdx} className={wIdx === item.wrongIndex ? "relative text-rose-500 line-through decoration-rose-400 mx-1" : "text-slate-700 mx-1"}>
                                            {word}
                                            {wIdx === item.wrongIndex && (
                                                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] bg-green-600 text-white px-2 py-0.5 rounded shadow-sm whitespace-nowrap font-black">{item.correct}</span>
                                            )}
                                        </span>
                                    ))}
                                </div>
                                <div className="text-sm text-slate-600 bg-white p-4 rounded-xl border border-slate-100 leading-relaxed"><span className="font-bold text-rose-500 mr-2">Explain:</span>{item.explain}</div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center gap-4 p-8 border-t bg-white">
                        <button onClick={() => window.location.reload()} className="px-6 py-3 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition-colors flex items-center gap-2"><RefreshCw size={18} /> 다시 하기</button>
                        <Link href="/quiz" className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 flex items-center gap-2"><Home size={18} /> 메뉴로</Link>
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
                    <div className="h-full bg-rose-500 transition-all duration-300" style={{ width: `${(currentIndex / totalQuestions) * 100}%` }}></div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto py-12 px-6 text-center">
                <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 md:p-12 mt-4 relative overflow-hidden">
                    <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-700 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest border border-rose-100 mb-10 uppercase">
                        <AlertCircle size={14} /> Find the Error
                    </div>

                    <div className="flex flex-wrap justify-center gap-x-1.5 gap-y-3 mb-16 px-1">
                        {question.sentence.map((word, idx) => {
                            let style = "bg-transparent border-transparent text-slate-700 hover:bg-slate-50"; // default
                            
                            if (isAnswered) {
                                if (idx === currentSelection) {
                                    if (idx === question.wrongIndex) {
                                        style = "bg-green-100 text-green-700 border-green-200 scale-110 shadow-lg"; // 맞음
                                    } else {
                                        style = "bg-red-100 text-red-700 border-red-200 scale-110 shadow-lg"; // 틀림
                                    }
                                } else {
                                    style = "opacity-40 grayscale";
                                }
                            }

                            return (
                                <span 
                                    key={idx} 
                                    onClick={() => handleWordClick(idx)} 
                                    className={`text-xl md:text-3xl font-bold cursor-pointer px-3 py-2 rounded-xl transition-all duration-200 border-2 ${style}`}
                                >
                                    {word}
                                </span>
                            );
                        })}
                    </div>
                    
                    <div className="h-10 text-slate-400 font-bold text-sm">
                        {isAnswered ? (
                            currentSelection === question.wrongIndex ? 
                            <span className="text-green-500 flex items-center justify-center gap-2"><CheckCircle size={18}/> 정답입니다!</span> : 
                            <span className="text-red-500 flex items-center justify-center gap-2"><X size={18}/> 오답입니다!</span>
                        ) : "단어를 클릭하세요"}
                    </div>

                </div>
            </main>
        </div>
    );
}