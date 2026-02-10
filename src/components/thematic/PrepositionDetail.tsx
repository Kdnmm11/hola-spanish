'use client';

import React, { useState } from 'react';
import { PREPOSITION_DATA, CATEGORY_LIST, PrepositionItem, CategoryType } from '@/data/prepositionData';
import { MapPin, Clock, Target, Package, Zap, MoreHorizontal, ArrowRight, ChevronRight, Bookmark } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const iconMap: Record<string, any> = {
    'MapPin': MapPin,
    'Clock': Clock,
    'Target': Target,
    'Package': Package,
    'Zap': Zap,
    'MoreHorizontal': MoreHorizontal
};

export default function PrepositionDetail() {
    const [viewMode, setViewMode] = useState<'type' | 'context'>('type');
    const [activePrepositionId, setActivePrepositionId] = useState<string>(PREPOSITION_DATA[0].id);
    const [activeCategoryId, setActiveCategoryId] = useState<CategoryType>('place');

    const activePreposition = PREPOSITION_DATA.find(p => p.id === activePrepositionId) || PREPOSITION_DATA[0];
    const activeCategory = CATEGORY_LIST.find(c => c.id === activeCategoryId) || CATEGORY_LIST[0];

    // Helper to switch context
    const jumpToContext = (catId: CategoryType) => {
        setActiveCategoryId(catId);
        setViewMode('context');
    };

    const jumpToType = (prepId: string) => {
        setActivePrepositionId(prepId);
        setViewMode('type');
    };

    return (
        <div className="flex flex-col gap-8 max-w-7xl mx-auto px-4 lg:px-8 py-8 font-sans text-slate-800">
            
            {/* Header */}
            <header className="mb-4">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 tracking-widest mb-2 uppercase">
                    <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-[9px]">focus study</span>
                    <ChevronRight size={10} />
                    <span>prepositions</span>
                </div>
                <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">전치사 정복</h1>
                <p className="text-slate-500 font-medium">
                    헷갈리는 전치사, 종류별로 정리하고 상황별로 마스터하세요.
                </p>
            </header>

            {/* Main Tabs */}
            <div className="flex p-1 bg-slate-100 rounded-xl w-fit">
                <button 
                    onClick={() => setViewMode('type')}
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'type' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    전치사별 보기
                </button>
                <button 
                    onClick={() => setViewMode('context')}
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'context' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    상황별 보기
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                
                {/* Sidebar Navigation */}
                <aside className="w-full lg:w-48 flex-shrink-0">
                    <div className="sticky top-24 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 no-scrollbar">
                        {viewMode === 'type' ? (
                            PREPOSITION_DATA.map(prep => (
                                <button
                                    key={prep.id}
                                    onClick={() => setActivePrepositionId(prep.id)}
                                    className={`px-4 py-2.5 rounded-xl text-left font-bold text-sm transition-all whitespace-nowrap flex-shrink-0 flex items-center justify-between
                                        ${activePrepositionId === prep.id 
                                            ? 'bg-blue-50 text-blue-700 border border-blue-100 shadow-sm' 
                                            : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600 border border-transparent'}`}
                                >
                                    <span>{prep.name}</span>
                                    {activePrepositionId === prep.id && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 hidden lg:block" />}
                                </button>
                            ))
                        ) : (
                            CATEGORY_LIST.map(cat => {
                                const Icon = iconMap[cat.icon];
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => setActiveCategoryId(cat.id as CategoryType)}
                                        className={`px-4 py-3 rounded-xl text-left font-bold text-xs transition-all whitespace-nowrap flex-shrink-0 flex items-center gap-3
                                            ${activeCategoryId === cat.id 
                                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-sm' 
                                                : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600 border border-transparent'}`}
                                    >
                                        <Icon size={16} />
                                        <span>{cat.label.split(' / ')[0]}</span>
                                    </button>
                                );
                            })
                        )}
                    </div>
                </aside>

                {/* Content Area */}
                <main className="flex-1 min-w-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={viewMode + (viewMode === 'type' ? activePrepositionId : activeCategoryId)}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {viewMode === 'type' ? (
                                // --- TYPE VIEW ---
                                <div>
                                    <div className="mb-8 border-b border-slate-100 pb-4">
                                        <h2 className="text-5xl font-black text-slate-900 mb-2">{activePreposition.name}</h2>
                                        <p className="text-slate-500 font-medium">이 전치사의 주요 용법들을 확인하세요.</p>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4">
                                        {activePreposition.usages.map((usage, idx) => (
                                            <div key={usage.id} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-200 hover:shadow-md transition-all group">
                                                <div className="flex justify-between items-start mb-3">
                                                    <h3 className="text-lg font-bold text-slate-800">{usage.description}</h3>
                                                    <button 
                                                        onClick={() => jumpToContext(usage.category)}
                                                        className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-bold uppercase tracking-wide hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
                                                    >
                                                        {usage.categoryLabel} <ArrowRight size={10} />
                                                    </button>
                                                </div>
                                                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                                    <p className="text-lg font-bold text-slate-900 mb-1">{usage.example}</p>
                                                    <p className="text-sm text-slate-500">{usage.translation}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                // --- CONTEXT VIEW ---
                                <div>
                                    <div className="mb-8 border-b border-slate-100 pb-4">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                                                {React.createElement(iconMap[activeCategory.icon], { size: 24 })}
                                            </div>
                                            <h2 className="text-2xl font-bold text-slate-900">{activeCategory.label}</h2>
                                        </div>
                                        <p className="text-slate-500 font-medium">이 상황에서 사용할 수 있는 전치사들입니다.</p>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4">
                                        {PREPOSITION_DATA.map(prep => {
                                            const relatedUsages = prep.usages.filter(u => u.category === activeCategoryId);
                                            if (relatedUsages.length === 0) return null;

                                            return (
                                                <div key={prep.id} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-emerald-200 hover:shadow-md transition-all">
                                                    <div className="flex items-center gap-4 mb-4">
                                                        <button 
                                                            onClick={() => jumpToType(prep.id)}
                                                            className="text-2xl font-black text-blue-600 hover:underline flex items-center gap-2"
                                                        >
                                                            {prep.name}
                                                            <ArrowRight size={16} className="text-slate-300" />
                                                        </button>
                                                    </div>
                                                    <div className="space-y-3">
                                                        {relatedUsages.map(usage => (
                                                            <div key={usage.id} className="pl-4 border-l-2 border-slate-100">
                                                                <p className="text-sm font-bold text-slate-600 mb-1">{usage.description}</p>
                                                                <p className="text-base font-bold text-slate-900">{usage.example}</p>
                                                                <p className="text-xs text-slate-400">{usage.translation}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}
