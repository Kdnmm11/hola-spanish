'use client';

import React from 'react';
import Link from 'next/link';
import { vocabData } from '@/data/vocabulary';
import { ArrowRight, Layers, Sparkles, Tag } from 'lucide-react';

const themes = Array.from(new Set(vocabData.map(v => v.category)));

export default function VocabQuizMenu() {
  return (
    <div className="max-w-4xl mx-auto pb-20">
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
           Vocabulary Quizzes 🧠
        </h1>
        <p className="text-gray-500">
           테마별 단어를 암기하고 퀴즈로 확인하세요.
        </p>
      </header>

      {/* Random Quiz Banner */}
      <div className="mb-10">
        <Link href="/quiz/vocab/random" className="block group relative overflow-hidden rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 p-8 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="absolute right-0 top-0 opacity-10 transform translate-x-10 -translate-y-10">
                <Sparkles size={150} />
            </div>
            <div className="relative z-10 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                        <Sparkles className="text-yellow-100" /> 랜덤 단어 챌린지
                    </h2>
                    <p className="text-yellow-50 max-w-lg">
                        전체 단어장에서 무작위로 출제됩니다. 다양한 주제의 단어를 폭넓게 학습하세요.
                    </p>
                </div>
                <div className="hidden md:flex bg-white/20 p-3 rounded-full backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                    <ArrowRight size={24} />
                </div>
            </div>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {themes.map((theme) => {
            const count = vocabData.filter(v => v.category === theme).length;
            return (
                <Link key={theme} href={`/quiz/vocab/${theme}`} className="group block p-6 bg-white border border-gray-200 rounded-xl hover:border-yellow-400 hover:shadow-md transition-all text-center">
                    <div className="w-12 h-12 mx-auto bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-yellow-100 transition-colors">
                        <Tag size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-yellow-600 transition-colors">
                        {theme}
                    </h3>
                    <p className="text-xs text-gray-400 font-medium">
                        {count} words
                    </p>
                </Link>
            )
        })}
      </div>
    </div>
  );
}