'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { GRAMMAR_DATA } from '@/data/grammarData';
import { ChevronRight, ChevronDown, List } from 'lucide-react';

export default function GrammarList() {
  // 레벨 정의 및 메타데이터
  const levels = [
    { key: 'Level 1', title: '입문 (Starter)', subtitle: '스페인어와 친해지기', color: 'bg-emerald-500', text: 'text-emerald-600', border: 'hover:border-emerald-200' },
    { key: 'Level 2', title: '초급 (Beginner)', subtitle: '회화의 날개 달기', color: 'bg-blue-500', text: 'text-blue-600', border: 'hover:border-blue-200' },
    { key: 'Level 3', title: '중급 (Intermediate)', subtitle: '시공간의 확장', color: 'bg-orange-500', text: 'text-orange-600', border: 'hover:border-orange-200' },
    { key: 'Level 4', title: '고급 (Advanced)', subtitle: '뉘앙스와 논리', color: 'bg-rose-500', text: 'text-rose-600', border: 'hover:border-rose-200' },
  ];

  // Accordion State: Default all collapsed
  const [openLevels, setOpenLevels] = useState<string[]>([]);

  const toggleLevel = (key: string) => {
    setOpenLevels(prev => 
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Helper to handle Level click: scroll AND toggle
  const handleLevelClick = (key: string, sectionId: string) => {
      scrollToId(sectionId);
      toggleLevel(key);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-0 pb-12 font-sans text-slate-900">
      
      {/* Header - Moved up by removing pt and reducing mb */}
      <header className="mb-12 border-b border-slate-100 pb-8">
        <h1 className="text-4xl font-black mb-3 tracking-tight">
          문법 학습 로드맵
        </h1>
        <p className="text-slate-500 text-lg leading-relaxed whitespace-nowrap overflow-hidden text-ellipsis">
          기초부터 고급까지, 단계별로 완성하는 스페인어 문법. 각 챕터를 클릭하여 상세 학습 내용과 퀴즈를 확인하세요.
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-12 relative">
        
        {/* 1. Main Content (Left) */}
        <div className="flex-1 min-w-0 space-y-24">
          {levels.map((level) => {
            const levelData = GRAMMAR_DATA.filter(item => item.difficulty === level.key);
            if (levelData.length === 0) return null;
            const sectionId = level.key.replace(' ', '-').toLowerCase();

            return (
              <section key={level.key} id={sectionId}>
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-8">
                  <div className={`px-3 py-1 rounded-full text-white font-black text-xs shadow-sm w-fit ${level.color}`}>
                    {level.key}
                  </div>
                  <div className="flex flex-col md:flex-row md:items-baseline gap-2">
                    <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{level.title}</h2>
                    <span className="text-sm font-medium text-slate-400 hidden md:inline-block">|</span>
                    <span className="text-sm font-medium text-slate-500">{level.subtitle}</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {levelData.map((chapter) => (
                    <Link key={chapter.id} href={`/grammar/${chapter.id}`} id={`card-${chapter.id}`} className="group h-full">
                      <div className={`bg-white rounded-2xl p-6 border border-slate-100 shadow-sm transition-all h-full flex flex-col hover:shadow-md ${level.border}`}>
                        <div className="flex justify-between items-start mb-3">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-50 ${level.text}`}>
                              {chapter.theme}
                          </span>
                          <ChevronRight size={18} className="text-slate-300 group-hover:translate-x-1 transition-transform group-hover:text-slate-400" />
                        </div>
                        
                        <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-slate-700 transition-colors">
                          {chapter.title}
                        </h3>
                        
                        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                            {chapter.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* 2. Right Index (Sticky Sidebar) */}
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-6 max-h-[calc(100vh-80px)] overflow-y-auto no-scrollbar pb-10">
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 shadow-sm">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2 px-2">
                <List size={14} className="text-slate-300" /> Grammar Index
              </h3>
              
              <nav className="space-y-2">
                {levels.map((level) => {
                   const sectionId = level.key.replace(' ', '-').toLowerCase();
                   const levelChapters = GRAMMAR_DATA.filter(item => item.difficulty === level.key);
                   const isOpen = openLevels.includes(level.key);
                   
                   return (
                    <div key={level.key} className="transition-all duration-300">
                      <button 
                        onClick={() => handleLevelClick(level.key, sectionId)}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-between group 
                            ${isOpen ? 'bg-white shadow-sm ring-1 ring-slate-100 text-slate-900' : 'text-slate-500 hover:bg-white hover:text-slate-800'}`}
                      >
                        <div className="flex items-center gap-3">
                            <span className={`w-2 h-2 rounded-full ${level.color}`}></span>
                            <span>{level.title.split(' (')[0]}</span>
                        </div>
                        {isOpen ? <ChevronDown size={14} className="text-slate-400"/> : <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-400"/>}
                      </button>
                      
                      {isOpen && (
                          <ul className="space-y-0.5 mt-1 ml-3 pl-3 border-l-2 border-slate-100 animate-in slide-in-from-top-1 fade-in duration-200">
                            {levelChapters.map((ch) => (
                              <li key={ch.id}>
                                <button 
                                  onClick={() => scrollToId(`card-${ch.id}`)}
                                  className="w-full text-left px-3 py-1.5 text-[12px] font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-100/50 rounded-lg transition-colors line-clamp-1"
                                >
                                  <span className="font-bold mr-1 opacity-70">{ch.title.split(':')[0]}</span> 
                                  {ch.title.split(':')[1]}
                                </button>
                              </li>
                            ))}
                          </ul>
                      )}
                    </div>
                   );
                })}
              </nav>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}