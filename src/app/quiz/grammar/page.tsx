'use client';

import React from 'react';
import Link from 'next/link';
import { GRAMMAR_DATA } from '@/data/grammarData';
import { ArrowRight, Book, Sparkles } from 'lucide-react';

export default function GrammarQuizMenu() {
  return (
    <div className="max-w-4xl mx-auto pb-20">
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
           Grammar Quizzes 📚
        </h1>
        <p className="text-gray-500">
           주제별로 문법 실력을 점검해보세요.
        </p>
      </header>

      {/* Comprehensive Quiz Banner */}
      <div className="mb-10">
        <Link href="/quiz/grammar/comprehensive" className="block group relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="absolute right-0 top-0 opacity-10 transform translate-x-10 -translate-y-10">
                <Sparkles size={150} />
            </div>
            <div className="relative z-10 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                        <Sparkles className="text-yellow-300" /> 종합 능력 평가
                    </h2>
                    <p className="text-indigo-100 max-w-lg">
                        모든 문법 주제에서 무작위로 출제되는 문제를 풀어보세요. 실력을 가장 정확하게 파악할 수 있습니다.
                    </p>
                </div>
                <div className="hidden md:flex bg-white/20 p-3 rounded-full backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                    <ArrowRight size={24} />
                </div>
            </div>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {GRAMMAR_DATA.map((topic) => (
            <Link key={topic.id} href={`/quiz/grammar/${topic.id}`} className="group block p-6 bg-white border border-gray-200 rounded-xl hover:border-red-300 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-red-50 text-red-500 rounded-lg group-hover:bg-red-100 transition-colors">
                        <Book size={20} />
                    </div>
                    <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded ${
                        topic.difficulty === '기초' ? 'bg-green-100 text-green-700' : 
                        topic.difficulty === '중급' ? 'bg-yellow-100 text-yellow-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                        {topic.difficulty}
                    </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
                    {topic.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                    {topic.description}
                </p>
                <div className="flex items-center text-xs font-bold text-gray-400 group-hover:text-red-500 transition-colors">
                    문제 풀기 <ArrowRight size={14} className="ml-1" />
                </div>
            </Link>
        ))}
      </div>
    </div>
  );
}