'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Layers, GraduationCap, ArrowRight, BrainCircuit } from 'lucide-react';

export default function QuizHome() {
  return (
    <div className="max-w-5xl mx-auto pb-20">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
           Let's Test Your Spanish! 🇪🇸
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
           퀴즈를 통해 배운 내용을 복습하고 실력을 점검해보세요.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        
        {/* 1. Grammar Quiz Card */}
        <Link href="/quiz/grammar" className="group relative bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-xl hover:border-red-200 transition-all duration-300">
           <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-orange-500"></div>
           <div className="p-8">
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                 <BookOpen size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                 문법 퀴즈
              </h2>
              <p className="text-gray-500 mb-6">
                 학습한 문법 규칙을 주제별로 테스트하거나, 종합 문제를 풀어보세요.
              </p>
              <div className="flex items-center text-sm font-bold text-red-600">
                 시작하기 <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
           </div>
        </Link>

        {/* 2. Vocabulary Quiz Card */}
        <Link href="/quiz/vocab" className="group relative bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-xl hover:border-yellow-200 transition-all duration-300">
           <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 to-orange-400"></div>
           <div className="p-8">
              <div className="w-16 h-16 bg-yellow-50 rounded-2xl flex items-center justify-center text-yellow-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                 <Layers size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                 단어장 퀴즈
              </h2>
              <p className="text-gray-500 mb-6">
                 테마별 단어를 암기하고, 랜덤 퀴즈로 어휘력을 확장하세요.
              </p>
              <div className="flex items-center text-sm font-bold text-yellow-600">
                 시작하기 <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
           </div>
        </Link>

      </div>
      
      {/* Daily Challenge Banner */}
      <div className="mt-12 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
         <div className="flex items-center gap-6">
            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
               <BrainCircuit size={32} className="text-teal-300" />
            </div>
            <div>
               <h3 className="text-xl font-bold mb-1">오늘의 도전 과제</h3>
               <p className="text-gray-300 text-sm">랜덤 문법 문제 10개를 연속으로 맞춰보세요!</p>
            </div>
         </div>
         <Link href="/quiz/grammar/comprehensive" className="px-6 py-3 bg-white text-gray-900 rounded-xl font-bold hover:bg-gray-100 transition-colors whitespace-nowrap">
            도전하기
         </Link>
      </div>

    </div>
  );
}