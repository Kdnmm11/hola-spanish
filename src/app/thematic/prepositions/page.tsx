'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, MapPin, ChevronRight } from 'lucide-react';

export default function PrepositionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
      <header className="mb-12 text-center">
        <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 tracking-widest mb-2 uppercase">
            <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-[9px]">focus study</span>
            <ChevronRight size={10} />
            <span>prepositions</span>
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">전치사 정복</h1>
        <p className="text-lg text-slate-600 font-medium">
            헷갈리는 전치사, 어떻게 공부하시겠습니까?
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Card 1: Type View */}
        <Link 
          href="/thematic/prepositions/type"
          className="group flex flex-col items-center text-center p-10 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300"
        >
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <BookOpen size={40} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">전치사 종류별 보기</h2>
          <p className="text-slate-500 leading-relaxed font-medium">
            a, de, en...<br/>
            각 전치사의 다양한 용법을<br/>한눈에 정리합니다.
          </p>
        </Link>

        {/* Card 2: Context View */}
        <Link 
          href="/thematic/prepositions/context"
          className="group flex flex-col items-center text-center p-10 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-xl hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300"
        >
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <MapPin size={40} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">상황별 보기</h2>
          <p className="text-slate-500 leading-relaxed font-medium">
            장소, 시간, 원인...<br/>
            상황에 맞는 적절한 전치사를<br/>찾아보세요.
          </p>
        </Link>
      </div>
    </div>
  );
}