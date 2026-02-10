'use client';

import React, { useState } from 'react';
import { PREPOSITION_DATA } from '@/data/prepositionData';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PrepositionTypeDetail() {
    const [activePrepositionId, setActivePrepositionId] = useState<string>(PREPOSITION_DATA[0].id);
    const activePreposition = PREPOSITION_DATA.find(p => p.id === activePrepositionId) || PREPOSITION_DATA[0];

    return (
        <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto px-6 lg:px-8 py-8 font-sans text-slate-800 bg-white">
            
            {/* Main Content Area (Center) */}
            <article className="flex-1 min-w-0">
                <header className="mb-8 border-b border-slate-200 pb-6">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 tracking-widest mb-2 uppercase">
                        <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-[9px]">focus study</span>
                        <ChevronRight size={10} />
                        <span>prepositions</span>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">
                        전치사 종류별 보기
                    </h1>
                    <p className="text-[16px] text-slate-600 font-medium leading-relaxed max-w-3xl">
                        다양한 전치사의 용법을 예문과 함께 학습하세요.
                    </p>
                </header>

                <motion.div
                    key={activePrepositionId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="flex items-center gap-3 mb-8 pl-2">
                        <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight">{activePreposition.name}</h2>
                    </div>

                    <div className="flex flex-col gap-4">
                        {activePreposition.usages.map((usage) => (
                            <div key={usage.id} className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group flex flex-col gap-1">
                                {/* Top: Category Header */}
                                <div className="px-1 mb-1">
                                    <Link 
                                        href={`/thematic/prepositions/context?cat=${usage.category}`}
                                        className="text-sm font-black text-emerald-600 uppercase tracking-tight hover:text-emerald-700 transition-colors"
                                    >
                                        {usage.categoryLabel}
                                    </Link>
                                </div>

                                {/* Middle: Description */}
                                <div className="flex items-center gap-2 px-1 mb-3 pb-2 border-b border-slate-50">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                    <h3 className="text-base font-bold text-slate-800 leading-snug">{usage.description}</h3>
                                </div>
                                
                                {/* Bottom: Example */}
                                <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 group-hover:bg-blue-50/30 transition-colors h-full flex flex-col justify-center">
                                    <p className="text-base font-bold text-slate-900 mb-1 leading-snug break-words whitespace-normal">
                                        "{usage.example.split(/(\*[^*]+\*)/g).map((part, i) => 
                                            part.startsWith('*') && part.endsWith('*') ? 
                                            <span key={i} className="text-red-600 font-black">{part.slice(1, -1)}</span> : part
                                        )}"
                                    </p>
                                    <p className="text-sm text-slate-500 font-medium break-words">{usage.translation}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </article>

            {/* Sidebar Navigation (Right) */}
            <aside className="hidden lg:block w-56 shrink-0">
                <div className="sticky top-24 border-l border-slate-100 pl-6">
                    <h4 className="text-[10px] font-black text-slate-400 tracking-widest mb-4 uppercase">prepositions</h4>
                    <div className="relative">
                        <nav className="flex flex-col gap-1.5 max-h-[80vh] overflow-y-auto no-scrollbar pl-1 pr-2 pb-8">
                            {PREPOSITION_DATA.map(prep => (
                                <button
                                    key={prep.id}
                                    onClick={() => setActivePrepositionId(prep.id)}
                                    className={`group flex items-center gap-3 text-left transition-all py-1
                                        ${activePrepositionId === prep.id 
                                            ? 'text-blue-600 font-bold' 
                                            : 'text-slate-400 hover:text-blue-500 font-medium'}`}
                                >
                                    <div className={`w-1.5 h-1.5 rounded-full transition-all shadow-sm shrink-0
                                        ${activePrepositionId === prep.id 
                                            ? 'bg-blue-600 scale-125' 
                                            : 'bg-slate-200 group-hover:bg-blue-300'}`} 
                                    />
                                    <span className="text-[13px]">{prep.name}</span>
                                </button>
                            ))}
                        </nav>
                        {/* Fade overlay */}
                        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none flex justify-center items-end pb-2">
                            <ChevronRight size={16} className="text-slate-300 rotate-90 animate-bounce" />
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
}