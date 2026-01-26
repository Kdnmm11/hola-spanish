'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Trophy, ArrowRight, Star, Calendar, PlayCircle, Layers, GraduationCap, ChevronRight } from 'lucide-react';
import { GRAMMAR_DATA } from '@/data/grammarData';

export default function Home() {
  // 추천 강좌 (기초 난이도 3개)
  const recommended = Array.isArray(GRAMMAR_DATA) 
    ? GRAMMAR_DATA.filter(i => i.difficulty === '기초').slice(0, 3) 
    : [];

  return (
    <div className="flex flex-col lg:flex-row gap-12 pb-20 max-w-6xl mx-auto font-sans">
      
      {/* 1. Main Content (Left, 70%) */}
      <div className="flex-1 min-w-0 space-y-12">
        
        {/* Header */}
        <header>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
            Hola, Student! 👋
          </h1>
          <p className="text-slate-500">
            오늘의 학습 목표를 달성해보세요. 꾸준함이 정답입니다!
          </p>
        </header>

        {/* Section: Recent Activity */}
        <section>
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <PlayCircle size={16} /> Continue Learning
          </h2>
          
          <Link href="/grammar/ser-estar" className="block group">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-red-400 transition-all cursor-pointer flex items-start sm:items-center gap-6">
               <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center shrink-0 group-hover:bg-red-100 transition-colors">
                  <BookOpen size={28} />
               </div>
               <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                     <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase rounded">기초</span>
                     <span className="text-xs text-slate-400">2h ago</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-red-600 transition-colors">
                     Chapter 16: Ser vs Estar
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-1">
                     스페인어의 영원한 난제, 본질(Ser)과 상태(Estar)의 완벽한 구분
                  </p>
               </div>
               <div className="hidden sm:block text-right">
                  <div className="text-2xl font-bold text-slate-900">45%</div>
                  <div className="text-xs text-slate-400 font-bold uppercase">Completed</div>
               </div>
            </div>
          </Link>
        </section>

        {/* Section: Recommended */}
        <section>
           <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Star size={16} /> Recommended for you
            </h2>
            <Link href="/grammar" className="text-xs font-bold text-red-600 hover:underline">
              View All
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {recommended.map((item, idx) => (
              <Link key={item.id} href={`/grammar/${item.id}`} className="block group">
                <div className="p-5 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-sm transition-all h-full flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                     <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                     </span>
                     <ArrowRight size={16} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-1 group-hover:text-blue-700 transition-colors">{item.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{item.description}</p>
                </div>
              </Link>
            ))}
            
            {/* Vocab Card */}
            <Link href="/vocabulary" className="block group">
               <div className="p-5 rounded-xl border border-dashed border-slate-300 bg-slate-50 hover:bg-white hover:border-slate-400 transition-all h-full flex flex-col items-center justify-center text-center">
                  <Layers size={24} className="text-slate-400 mb-2 group-hover:text-slate-600 transition-colors" />
                  <h4 className="font-bold text-slate-600 text-sm group-hover:text-slate-800 transition-colors">단어장 학습하기</h4>
                  <p className="text-xs text-slate-400">테마별 필수 단어 암기</p>
               </div>
            </Link>
          </div>
        </section>

      </div>

      {/* 2. Right Sidebar (Right, 30%) - Sticky */}
      <aside className="hidden lg:block w-80 shrink-0">
        <div className="sticky top-8 space-y-6">
           
           {/* Profile Summary */}
           <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm">
              <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-3xl mb-4 shadow-lg shadow-yellow-200/50">
                 🤠
              </div>
              <h3 className="font-bold text-lg text-slate-900">Estudiante</h3>
              <p className="text-xs text-slate-500 mb-6 font-medium">Level 1 · Beginner</p>
              
              <div className="grid grid-cols-2 gap-2 text-left bg-slate-50 p-3 rounded-xl border border-slate-100">
                 <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total XP</div>
                    <div className="font-bold text-slate-900 text-lg">1,250</div>
                 </div>
                 <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Streak</div>
                    <div className="font-bold text-red-500 flex items-center gap-1 text-lg">
                       <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> 3
                    </div>
                 </div>
              </div>
           </div>

           {/* Quick Actions List */}
           <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-slate-100 font-bold text-xs text-slate-400 uppercase tracking-wider">
                 Quick Shortcuts
              </div>
              <div className="divide-y divide-slate-100">
                 <Link href="/quiz?type=grammar" className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors group">
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-teal-50 text-teal-600 rounded-lg group-hover:scale-110 transition-transform">
                          <GraduationCap size={18} />
                       </div>
                       <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">문법 퀴즈</span>
                    </div>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-teal-500 transition-colors" />
                 </Link>
                 <Link href="/vocabulary" className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors group">
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg group-hover:scale-110 transition-transform">
                          <Layers size={18} />
                       </div>
                       <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">단어 복습</span>
                    </div>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-yellow-500 transition-colors" />
                 </Link>
              </div>
           </div>

        </div>
      </aside>

    </div>
  );
}