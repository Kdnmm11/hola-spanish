'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, Trophy, ArrowRight, Star, Calendar, PlayCircle, Layers, GraduationCap, ChevronRight, PenTool, CheckCircle, BrainCircuit } from 'lucide-react';
import { GRAMMAR_DATA } from '@/data/grammarData';
import { getUserProgress, UserProgress } from '@/lib/progress';

export default function Home() {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  // Load progress from LocalStorage on mount
  useEffect(() => {
    const data = getUserProgress();
    setProgress(data);

    // Listen for updates (if multiple tabs or components update it)
    const handleStorageChange = () => setProgress(getUserProgress());
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // 추천 강좌 (기초 난이도 3개)
  const recommended = Array.isArray(GRAMMAR_DATA) 
    ? GRAMMAR_DATA.filter(i => i.difficulty === '기초').slice(0, 3) 
    : [];

  const recentActivity = progress?.recentActivities[0]; // Most recent

  return (
    <div className="flex flex-col xl:flex-row gap-8 pb-20 w-full font-sans">
      
      {/* 1. Main Content (Left, Fluid) */}
      <div className="flex-1 min-w-0 space-y-8">
        
        {/* Header */}
        <header>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
            Hola, Student! 👋
          </h1>
          <p className="text-slate-500">
            오늘의 학습 목표를 달성해보세요. 꾸준함이 정답입니다!
          </p>
        </header>

        {/* Section: Recent Activity (Dynamic) */}
        <section>
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <PlayCircle size={16} /> Recent Activity
          </h2>
          
          {recentActivity ? (
             <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-indigo-400 transition-all flex items-start sm:items-center gap-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 
                    ${recentActivity.type === 'Exam' ? 'bg-indigo-50 text-indigo-500' : 
                      recentActivity.type === 'Vocab' ? 'bg-amber-50 text-amber-500' : 'bg-teal-50 text-teal-500'}`}>
                   {recentActivity.type === 'Exam' ? <BrainCircuit size={28} /> : 
                    recentActivity.type === 'Vocab' ? <Layers size={28} /> : <BookOpen size={28} />}
                </div>
                <div className="flex-1">
                   <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase rounded">{recentActivity.type}</span>
                      <span className="text-xs text-slate-400">
                        {new Date(recentActivity.timestamp).toLocaleDateString()} {new Date(recentActivity.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                   </div>
                   <h3 className="text-xl font-bold text-slate-900 mb-1">
                      {recentActivity.title}
                   </h3>
                   <p className="text-sm text-slate-500">
                      Score: <span className="font-bold text-slate-800">{recentActivity.score} / {recentActivity.total}</span>
                   </p>
                </div>
                <div className="hidden sm:block text-right">
                   <div className="text-2xl font-bold text-slate-900">{Math.round((recentActivity.score / recentActivity.total) * 100)}%</div>
                   <div className="text-xs text-slate-400 font-bold uppercase">Accuracy</div>
                </div>
             </div>
          ) : (
            <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-8 text-center">
                <p className="text-slate-500 mb-4">아직 학습 기록이 없습니다. 첫 퀴즈를 풀어보세요!</p>
                <Link href="/quiz" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:underline">
                    퀴즈 풀러 가기 <ArrowRight size={16} />
                </Link>
            </div>
          )}
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
           
           {/* Profile Summary (Dynamic) */}
           <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm">
              <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-3xl mb-4 shadow-lg shadow-yellow-200/50">
                 🤠
              </div>
              <h3 className="font-bold text-lg text-slate-900">Estudiante</h3>
              <p className="text-xs text-slate-500 mb-6 font-medium">Level {progress?.level || 1}</p>
              
              <div className="grid grid-cols-2 gap-2 text-left bg-slate-50 p-3 rounded-xl border border-slate-100">
                 <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total XP</div>
                    <div className="font-bold text-slate-900 text-lg">{progress?.xp.toLocaleString() || 0}</div>
                 </div>
                 <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Streak</div>
                    <div className="font-bold text-red-500 flex items-center gap-1 text-lg">
                       <span className={`w-2 h-2 rounded-full bg-red-500 ${progress?.streak ? 'animate-pulse' : ''}`}></span> {progress?.streak || 0}
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
                 <Link href="/quiz/comprehensive/grammar" className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors group">
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg group-hover:scale-110 transition-transform">
                          <BrainCircuit size={18} />
                       </div>
                       <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">문법 퀴즈 (랜덤)</span>
                    </div>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                 </Link>
                 <Link href="/quiz/comprehensive/conjugation" className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors group">
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-teal-50 text-teal-600 rounded-lg group-hover:scale-110 transition-transform">
                          <PenTool size={18} />
                       </div>
                       <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">시제 퀴즈</span>
                    </div>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-teal-500 transition-colors" />
                 </Link>
                 <Link href="/quiz/comprehensive/correction" className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors group">
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-rose-50 text-rose-600 rounded-lg group-hover:scale-110 transition-transform">
                          <CheckCircle size={18} />
                       </div>
                       <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">오답 찾기</span>
                    </div>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-rose-500 transition-colors" />
                 </Link>
              </div>
           </div>

        </div>
      </aside>

    </div>
  );
}