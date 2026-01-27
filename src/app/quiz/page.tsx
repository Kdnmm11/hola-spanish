'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Layers, ArrowRight } from 'lucide-react';

export default function QuizHome() {
  return (
    <div className="max-w-5xl pb-20 px-8 pt-4">
      <header className="mb-12 text-left pt-4">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
           Hola Spanish <span className="text-blue-600">Quiz Zone</span> 🇪🇸
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl">
           문법과 어휘, 그리고 실전 감각을 키우는 다양한 테스트 모드를 경험하세요.
        </p>
      </header>

      {/* 1. 학습 퀴즈 (기존) */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            학습별 퀴즈 (Learning Quiz)
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
            <Link href="/quiz/grammar" className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all duration-300">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
            <div className="p-8">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                    <BookOpen size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">문법 챕터별 퀴즈</h3>
                <p className="text-slate-500 text-sm mb-6">각 챕터에서 배운 내용을 복습하고 이해도를 점검합니다.</p>
                <div className="flex items-center text-sm font-bold text-blue-600">
                    시작하기 <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
            </Link>

            <Link href="/quiz/vocab" className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-amber-200 transition-all duration-300">
            <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
            <div className="p-8">
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 mb-4 group-hover:scale-110 transition-transform">
                    <Layers size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">단어장 암기 테스트</h3>
                <p className="text-slate-500 text-sm mb-6">주제별 필수 어휘를 플래시카드와 퀴즈로 암기합니다.</p>
                <div className="flex items-center text-sm font-bold text-amber-600">
                    시작하기 <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
            </Link>
        </div>
      </section>

      {/* 2. 종합 테스트 (신규) */}
      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            실전 종합 테스트 (Comprehensive Test)
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
            
            {/* Mode 1: Grammar Random */}
            <Link href="/quiz/comprehensive/grammar" className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-900 text-lg mb-2">랜덤 문법 20제</h3>
                <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                    전체 챕터에서 무작위로 20문제가 출제됩니다. 힌트를 통해 부족한 챕터를 확인하세요.
                </p>
                <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider group-hover:underline">Start Quiz &rarr;</span>
            </Link>

            {/* Mode 2: Conjugation */}
            <Link href="/quiz/comprehensive/conjugation" className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-900 text-lg mb-2">시제 맞추기</h3>
                <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                    빈칸에 들어갈 동사의 올바른 시제 형태를 직접 입력하는 단답형 테스트입니다.
                </p>
                <span className="text-xs font-bold text-teal-500 uppercase tracking-wider group-hover:underline">Start Practice &rarr;</span>
            </Link>

            {/* Mode 3: Error Correction */}
            <Link href="/quiz/comprehensive/correction" className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-rose-300 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-900 text-lg mb-2">틀린 곳 찾기</h3>
                <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                    문장에서 문법적으로 틀린 단어를 찾아내고 올바르게 고쳐보세요.
                </p>
                <span className="text-xs font-bold text-rose-500 uppercase tracking-wider group-hover:underline">Find Errors &rarr;</span>
            </Link>

        </div>
      </section>

    </div>
  );
}