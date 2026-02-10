'use client';

import React, { useState, useEffect } from 'react';
import { PREPOSITION_DATA, CATEGORY_LIST, CategoryType } from '@/data/prepositionData';
import { MapPin, Clock, Target, Package, Zap, MoreHorizontal, ArrowRight, ChevronRight, Home, Shuffle, Hourglass, Flag, HelpCircle, Users, MessageCircle, Activity } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

const iconMap: Record<string, any> = {
    'MapPin': MapPin,
    'Clock': Clock,
    'Target': Target,
    'Package': Package,
    'Zap': Zap,
    'MoreHorizontal': MoreHorizontal,
    'ArrowRight': ArrowRight,
    'Home': Home,
    'Shuffle': Shuffle,
    'Hourglass': Hourglass,
    'Flag': Flag,
    'HelpCircle': HelpCircle,
    'Users': Users,
    'MessageCircle': MessageCircle,
    'Activity': Activity
};

export default function PrepositionContextDetail() {
    const searchParams = useSearchParams();
    const initialCat = searchParams.get('cat') as CategoryType;
    const [activeCategoryId, setActiveCategoryId] = useState<CategoryType>(initialCat || 'loc_position');

    const activeCategory = CATEGORY_LIST.find(c => c.id === activeCategoryId) || CATEGORY_LIST[0];

    useEffect(() => {
        if (initialCat) {
            setActiveCategoryId(initialCat);
        }
    }, [initialCat]);

    return (
        <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto px-6 lg:px-8 py-8 font-sans text-slate-800 bg-white">
            
            {/* Main Content Area (Center) */}
            <article className="flex-1 min-w-0">
                <header className="mb-8 border-b border-slate-200 pb-6">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 tracking-widest mb-2 uppercase">
                        <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-[9px]">focus study</span>
                        <ChevronRight size={10} />
                        <span>contexts</span>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">
                        상황별 전치사 정리
                    </h1>
                    <p className="text-[16px] text-slate-600 font-medium leading-relaxed max-w-3xl">
                        <span className="text-emerald-600 font-bold">{activeCategory.label}</span> 상황에서 자주 쓰이는 전치사와 표현들을 한눈에 확인하세요.
                    </p>
                </header>

                <motion.div
                    key={activeCategoryId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="mb-8">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">{activeCategory.label}</h2>
                    </div>

                    <div className="flex flex-col gap-10">
                        {PREPOSITION_DATA.map(prep => {
                            const relatedUsages = prep.usages.filter(u => u.category === activeCategoryId);
                            if (relatedUsages.length === 0) return null;

                            return (
                                <div key={prep.id}>
                                    <div className="flex items-center gap-3 mb-4 pl-2">
                                        <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                                        <h3 className="text-2xl font-black text-slate-800">{prep.name}</h3>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 gap-4">
                                        {relatedUsages.map(usage => (
                                            <div key={usage.id} className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group flex flex-col gap-3">
                                                {/* Top: Description */}
                                                <div className="flex items-center gap-2.5 pb-1 px-1">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                                    <p className="text-base font-bold text-slate-800 leading-snug">{usage.description}</p>
                                                </div>
                                                
                                                {/* Bottom: Example */}
                                                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 group-hover:bg-emerald-50/30 transition-colors h-full flex flex-col justify-center">
                                                    <p className="text-lg font-bold text-slate-900 mb-1 tracking-tight break-words whitespace-normal leading-snug">
                                                        "{usage.example.split(/(\*[^*]+\*)/g).map((part, i) => 
                                                            part.startsWith('*') && part.endsWith('*') ? 
                                                            <span key={i} className="text-red-600 font-black">{part.slice(1, -1)}</span> : part
                                                        )}"
                                                    </p>
                                                    <p className="text-xs text-slate-500 font-medium break-words">{usage.translation}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            </article>

            {/* Sidebar Navigation (Right) */}
            <aside className="hidden lg:block w-56 shrink-0">
                <div className="sticky top-24 border-l border-slate-100 pl-6">
                    <h4 className="text-[10px] font-black text-slate-400 tracking-widest mb-4 uppercase">contexts</h4>
                    <div className="relative">
                        <nav className="flex flex-col gap-1.5 max-h-[80vh] overflow-y-auto no-scrollbar pl-1 pr-2 pb-8">
                            {CATEGORY_LIST.map(cat => {
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => setActiveCategoryId(cat.id as CategoryType)}
                                        className={`group flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all
                                            ${activeCategoryId === cat.id 
                                                ? 'bg-emerald-600 text-white font-bold shadow-sm' 
                                                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 font-medium'}`}
                                    >
                                        <span className="text-xs truncate">{cat.label}</span>
                                        {activeCategoryId === cat.id && <ChevronRight size={12} className="text-white/70" />}
                                    </button>
                                );
                            })}
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