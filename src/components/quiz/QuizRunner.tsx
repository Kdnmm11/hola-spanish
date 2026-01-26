'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, RefreshCcw, Home, Award } from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizRunnerProps {
  title: string;
  questions: QuizQuestion[];
  onExit?: () => void;
}

export default function QuizRunner({ title, questions, onExit }: QuizRunnerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#22c55e', '#86efac'] // Green theme
      });
    } else {
        // Wrong answer vibration or effect?
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      if (score > questions.length / 2) {
          confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 }
          });
      }
    }
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    let message = '';
    let emoji = '';
    
    if (percentage === 100) { message = '¡Perfecto! 완벽합니다!'; emoji = '🏆'; }
    else if (percentage >= 80) { message = '¡Muy bien! 아주 잘했어요!'; emoji = '🌟'; }
    else if (percentage >= 60) { message = '¡Bien! 잘했습니다!'; emoji = '👍'; }
    else { message = '¡Ánimo! 조금 더 노력해봐요!'; emoji = '💪'; }

    return (
      <div className="max-w-xl mx-auto p-6 bg-white rounded-3xl shadow-xl border border-gray-100 text-center mt-10">
        <div className="w-24 h-24 mx-auto bg-yellow-50 rounded-full flex items-center justify-center text-5xl mb-6 shadow-sm">
          {emoji}
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Quiz Completed!</h2>
        <p className="text-gray-500 mb-8">{title}</p>

        <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-green-50 p-4 rounded-2xl border border-green-100">
                <div className="text-green-600 font-bold uppercase text-xs mb-1">Score</div>
                <div className="text-3xl font-extrabold text-green-700">{score} <span className="text-lg text-green-400">/ {questions.length}</span></div>
            </div>
            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                <div className="text-blue-600 font-bold uppercase text-xs mb-1">Accuracy</div>
                <div className="text-3xl font-extrabold text-blue-700">{percentage}%</div>
            </div>
        </div>
        
        <p className="text-lg font-medium text-gray-800 mb-8">
           {message}
        </p>

        <div className="flex gap-4 justify-center">
            <Link href="/quiz" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-colors">
                <Home size={20} /> 메뉴로
            </Link>
            <button onClick={restartQuiz} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-colors shadow-lg shadow-red-200">
                <RefreshCcw size={20} /> 다시하기
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">{title}</h2>
            <div className="text-xs text-gray-500 font-medium">Question {currentIndex + 1} of {questions.length}</div>
        </div>
        <div className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-600">
            Score: {score}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-100 rounded-full mb-8 overflow-hidden">
        <motion.div 
            className="h-full bg-red-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
        />
      </div>

      {/* Question Card */}
      <AnimatePresence mode='wait'>
        <motion.div
            key={currentIndex}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="bg-white rounded-3xl p-6 md:p-10 shadow-lg border border-gray-100 mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 leading-relaxed">
                    {currentQuestion.question}
                </h3>

                <div className="space-y-3">
                    {currentQuestion.options.map((option, idx) => {
                        let stateStyles = "bg-gray-50 border-gray-200 text-gray-700 hover:border-red-300 hover:bg-red-50"; // Default
                        
                        if (isAnswered) {
                            if (idx === currentQuestion.correctAnswer) {
                                stateStyles = "bg-green-100 border-green-500 text-green-800"; // Correct Answer
                            } else if (idx === selectedOption) {
                                stateStyles = "bg-red-100 border-red-500 text-red-800"; // Wrong Selection
                            } else {
                                stateStyles = "opacity-50 grayscale bg-gray-50 border-gray-100"; // Others
                            }
                        }

                        return (
                            <button
                                key={idx}
                                onClick={() => handleOptionClick(idx)}
                                disabled={isAnswered}
                                className={`
                                    w-full text-left p-5 rounded-xl border-2 font-medium transition-all duration-200 flex items-center justify-between
                                    ${stateStyles}
                                `}
                            >
                                <span>{option}</span>
                                {isAnswered && idx === currentQuestion.correctAnswer && <CheckCircle2 size={20} className="text-green-600" />}
                                {isAnswered && idx === selectedOption && idx !== currentQuestion.correctAnswer && <XCircle size={20} className="text-red-600" />}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Explanation & Next Button Area */}
            {isAnswered && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    <div className={`p-5 rounded-2xl border-l-4 ${selectedOption === currentQuestion.correctAnswer ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
                        <div className="font-bold text-sm mb-1 flex items-center gap-2">
                           {selectedOption === currentQuestion.correctAnswer ? 
                             <span className="text-green-700">¡Correcto! 정답입니다.</span> : 
                             <span className="text-red-700">¡Incorrecto! 오답입니다.</span>
                           }
                        </div>
                        <p className="text-sm text-gray-700">
                           {currentQuestion.explanation}
                        </p>
                    </div>

                    <button 
                        onClick={handleNext}
                        className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                        {currentIndex < questions.length - 1 ? '다음 문제' : '결과 보기'} <ArrowRight size={20} />
                    </button>
                </motion.div>
            )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}