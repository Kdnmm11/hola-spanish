'use client';

import React from 'react';
import Link from 'next/link';
import { GRAMMAR_DATA } from '@/data/grammarData';
import { ChevronRight } from 'lucide-react';

export default function GrammarList() {
  const parts = [
    {
      title: 'Part 1: 기초 다지기 (The Basics)',
      color: 'bg-emerald-500',
      ids: ['pronunciation', 'sentence-structure', 'interrogatives', 'nouns-and-gender', 'articles', 'pronouns', 'adjectives', 'numbers', 'quantifiers', 'possessives', 'demonstratives']
    },
    {
      title: 'Part 2: 동사 정복하기 (Verbs)',
      color: 'bg-blue-500',
      ids: ['verbs-present', 'verbs-irregular', 'time-expressions', 'prepositions-adverbs', 'ser-estar', 'haber', 'tener-ir-hacer']
    },
    {
      title: 'Part 3: 중급 도약하기 (Intermediate)',
      color: 'bg-indigo-500',
      ids: ['object-pronouns', 'preterite-indefinite', 'preterite-imperfect', 'perfect-tenses', 'future-conditional', 'imperatives', 'subjunctive-basics', 'clause-connections', 'por-para', 'passive-se', 'reflexive-verbs', 'gustar-like-verbs']
    },
    {
      title: 'Part 4: 고급 완성하기 (Advanced)',
      color: 'bg-purple-500',
      ids: ['subjunctive-imperfect', 'subjunctive-perfect', 'si-clauses', 'indirect-speech', 'advanced-participles']
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 font-sans text-slate-900">
      <header className="mb-16 border-b border-slate-100 pb-10">
        <h1 className="text-4xl font-black mb-4 tracking-tight">
          문법 학습 로드맵
        </h1>
        <p className="text-slate-500 text-lg leading-relaxed">
          스페인어 기초부터 고급 문법까지 한눈에 확인하고 학습하세요. <br/>
          각 챕터를 클릭하면 상세 설명과 연습 문제를 확인하실 수 있습니다.
        </p>
      </header>

      <div className="space-y-20">
        {parts.map((part, pIdx) => {
          const partData = GRAMMAR_DATA.filter(item => part.ids.includes(item.id));
          return (
            <section key={pIdx}>
              <div className="flex items-center gap-4 mb-8">
                <div className={`px-3 py-1 rounded text-white font-bold text-xs ${part.color}`}>
                  Part {pIdx + 1}
                </div>
                <h2 className="text-2xl font-bold text-slate-800">{part.title.split(': ')[1]}</h2>
              </div>

              <div className="space-y-10">
                {partData.map((chapter) => (
                  <div key={chapter.id} className="group relative">
                    <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-4">
                      <Link href={`/grammar/${chapter.id}`} className="hover:underline">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                          {chapter.title}
                          <ChevronRight size={18} className="text-slate-300" />
                        </h3>
                      </Link>
                      <p className="text-slate-500 text-sm font-medium">{chapter.description}</p>
                    </div>

                    <div className="ml-4 md:ml-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                      {chapter.sections.map((section, sIdx) => (
                        <div key={sIdx} className="flex gap-3">
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-200 shrink-0" />
                          <div className="flex flex-col">
                            <span className="text-[15px] font-bold text-slate-700 leading-tight mb-1">
                              {section.title}
                            </span>
                            <span className="text-[13px] text-slate-400 leading-normal">
                              {section.desc}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}