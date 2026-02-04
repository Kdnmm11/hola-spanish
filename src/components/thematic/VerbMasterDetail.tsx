'use client';

import React, { useState } from 'react';
import { ChevronRight, Zap } from 'lucide-react';
import { TENSE_MASTER_DATA } from '@/data/thematicData';

const PRONOUNS = ['yo', 'tú', 'él/ella/ud.', 'nosotros/as', 'vosotros/as', 'ellos/as/uds.'];

export default function VerbMasterDetail() {
  const [activeTense, setActiveTense] = useState(TENSE_MASTER_DATA[0]);

  const scrollTo = (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderForm = (form: string[], isLong: boolean) => {
      if (form[0] === '-') return <span className="text-slate-300 font-bold">-</span>;
      const fontSize = isLong ? 'text-[15px]' : 'text-[17px]';
      
      if (!form[1]) return <span className={`text-slate-900 font-bold ${fontSize}`}>{form[0]}</span>;
      return (
          <div className={`${fontSize} flex items-center justify-center`}>
            <span className="text-violet-600 font-bold">{form[0]}</span>
            <span className="text-slate-900 font-bold">{form[1]}</span>
          </div>
      );
  };

  const renderRegular = (val: string, base: string) => {
      const isLong = base.length >= 8;
      const fontSize = isLong ? 'text-[15px]' : 'text-[17px]';

      if (activeTense.isCompound) {
          const parts = val.split(' ');
          return (
              <div className={`${fontSize} flex items-center justify-center`}>
                <span className="text-violet-600 font-bold">{parts[0]}</span>
                <span className="text-slate-900 font-bold ml-1.5">{base}{parts[1].replace('-', '')}</span>
              </div>
          );
      }
      return (
          <div className={`${fontSize} flex items-center justify-center`}>
            <span className="text-slate-900 font-bold">{base}</span>
            <span className="text-red-500 font-bold">{val}</span>
          </div>
      );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto px-6 lg:px-8 py-8 font-sans text-slate-800 bg-white">
      
      <article className="flex-1 min-w-0">
          <header className="mb-6 border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 tracking-widest mb-2 uppercase">
                <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-[9px]">focus study</span>
                <ChevronRight size={10} />
                <span>verb master</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">
              스페인어 시제별 동사 변화
            </h1>
            <p className="text-[16px] text-slate-600 font-medium leading-relaxed max-w-3xl">
               원하시는 시제를 선택하여 용법부터 세부 변화까지 한눈에 확인하세요.
            </p>
          </header>

          {/* 상단 시제 선택 탭 (Favorited Style - Single Line Centered) */}
          <div className="flex justify-center mb-12">
            <div className="flex flex-nowrap overflow-x-auto no-scrollbar gap-1 p-1 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
                {TENSE_MASTER_DATA.map((tense) => (
                    <button
                        key={tense.id}
                        onClick={() => setActiveTense(tense)}
                        className={`px-5 py-2 rounded-xl text-[11px] font-bold transition-all whitespace-nowrap flex-shrink-0
                            ${activeTense.id === tense.id 
                                ? 'bg-white text-blue-600 shadow-md ring-1 ring-slate-200 scale-105' 
                                : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'}`}
                    >
                        {tense.name.split(' (')[0]}
                    </button>
                ))}
            </div>
          </div>

          <div key={activeTense.id} className="animate-in fade-in slide-in-from-bottom-2 duration-400">
            {/* 시제 제목 */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900">{activeTense.name}</h2>
            </div>

            {/* 1. 용법 및 예문 */}
            <div id="sec-1" className="mb-16 scroll-mt-24">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="text-blue-600 font-bold">1.</span> 용법 및 예문
                </h3>
                <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
                    <table className="w-full text-[17px] text-center border-collapse">
                        <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-[14px]">
                            <tr>
                                <th className="px-6 py-4 w-2/5 border-r border-slate-100 whitespace-nowrap">상황</th>
                                <th className="px-6 py-4">예문 및 해석</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {activeTense.usage.map((row, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-3 font-bold text-slate-700 bg-slate-50/30 border-r border-slate-100 whitespace-nowrap text-sm">{row.situ}</td>
                                    <td className="px-6 py-3">
                                        <div className="flex flex-col items-center">
                                            <span className="text-slate-900 font-bold italic">"{row.ex}"</span>
                                            <span className="text-[13px] text-slate-400 mt-1.5 font-medium">{row.ko}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 2. 규칙 변화 */}
            <div id="sec-2" className="mb-16 scroll-mt-24">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="text-blue-600 font-bold">2.</span> 규칙 변화 (conjugation)
                </h3>
                <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
                    <table className="w-full text-[17px] text-center border-collapse">
                        <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-[14px]">
                            <tr>
                                <th className="px-6 py-4 w-1/4 border-r border-slate-100">주어</th>
                                <th className="px-6 py-4 w-1/4 text-blue-600 font-bold">hablar (-ar)</th>
                                <th className="px-6 py-4 w-1/4 text-emerald-600 font-bold">comer (-er)</th>
                                <th className="px-6 py-4 w-1/4 text-slate-900 font-bold">vivir (-ir)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {PRONOUNS.map((pronoun, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-3 font-bold text-slate-400 bg-slate-50/30 border-r border-slate-100 whitespace-nowrap">{pronoun}</td>
                                    <td className="px-6 py-3 font-bold text-slate-900 whitespace-nowrap">
                                        {renderRegular(activeTense.regular.ar[i], 'habl')}
                                    </td>
                                    <td className="px-6 py-3 font-bold text-slate-900 whitespace-nowrap">
                                        {renderRegular(activeTense.regular.er[i], 'com')}
                                    </td>
                                    <td className="px-6 py-3 font-bold text-slate-900 whitespace-nowrap">
                                        {renderRegular(activeTense.regular.ir[i], 'viv')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 3. 주요 불규칙 */}
            {(activeTense.irregularGroups || activeTense.simpleIrregulars) && (
                <div id="sec-3" className="scroll-mt-24">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <span className="text-blue-600 font-bold">3.</span> 주요 불규칙
                    </h3>
                    
                    {/* 현재완료 전용 요약 표 (Participio) */}
                    {activeTense.simpleIrregulars ? (
                        <div className="border border-slate-200 rounded-xl shadow-sm overflow-hidden max-w-2xl mx-auto">
                            <table className="w-full text-center border-collapse">
                                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-[13px]">
                                    <tr>
                                        <th className="py-3 border-r border-slate-100">동사 (원형)</th>
                                        <th className="py-3 border-r border-slate-100">뜻</th>
                                        <th className="py-3">과거분사 (p.p.)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {activeTense.simpleIrregulars.map((row, i) => {
                                        const isLong = row.v.length >= 8;
                                        return (
                                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                                <td className={`py-4 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100 ${isLong ? 'text-[15px]' : 'text-[16px]'}`}>{row.v}</td>
                                                <td className="py-4 text-slate-500 text-[14px] border-r border-slate-100 font-medium">{row.mean}</td>
                                                <td className={`py-4 font-bold text-violet-600 ${isLong ? 'text-[15px]' : 'text-[17px]'}`}>{row.pp}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="space-y-12">
                            {activeTense.irregularGroups?.map((group, idx) => (
                                <div key={idx} id={`irreg-${idx}`} className="scroll-mt-24">
                                    <h4 className="text-[14px] font-bold text-slate-500 mb-3 tracking-wide pl-3 border-l-4 border-amber-400 flex items-center gap-2">
                                        <Zap size={14} className="text-amber-500 fill-amber-500" /> {group.cat}
                                    </h4>
                                    <div className="border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                                        <table className="w-full text-center border-collapse table-fixed">
                                            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-[11px]">
                                                <tr>
                                                    <th className="w-[12%] py-3 border-r border-slate-100">동사</th>
                                                    <th className="w-[12%] py-3 border-r border-slate-100">뜻</th>
                                                    <th className="w-[12.6%] py-3">yo</th>
                                                    <th className="w-[12.6%] py-3">tú</th>
                                                    <th className="w-[12.6%] py-3">él/ella</th>
                                                    <th className="w-[12.6%] py-3">nos.</th>
                                                    <th className="w-[12.6%] py-3">vos.</th>
                                                    <th className="w-[12.6%] py-3">ellos/as</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 bg-white">
                                                {group.verbs.map((v, vi) => {
                                                    const isLong = v.v.length >= 8;
                                                    return (
                                                        <tr key={vi} className="hover:bg-slate-50/50 transition-colors">
                                                            <td className={`py-4 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100 px-1 break-all ${isLong ? 'text-[14px]' : 'text-[15px]'}`}>{v.v}</td>
                                                            <td className="py-4 text-slate-500 text-[11px] border-r border-slate-100 font-medium px-1 leading-tight">{v.mean}</td>
                                                            <td className="py-4 px-0.5">{renderForm(v.forms.yo, isLong)}</td>
                                                            <td className="py-4 px-0.5">{renderForm(v.forms.tu, isLong)}</td>
                                                            <td className="py-4 px-0.5">{renderForm(v.forms.el, isLong)}</td>
                                                            <td className="py-4 px-0.5">{renderForm(v.forms.nos, isLong)}</td>
                                                            <td className="py-4 px-0.5">{renderForm(v.forms.vos, isLong)}</td>
                                                            <td className="py-4 px-0.5">{renderForm(v.forms.ellos, isLong)}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
          </div>
      </article>

      {/* Sidebar 목차 */}
      <aside className="hidden lg:block w-56 shrink-0">
        <div className="sticky top-8 border-l border-slate-100 pl-6">
            <h4 className="text-[10px] font-bold text-slate-400 tracking-widest mb-4 uppercase">contents</h4>
            <ul className="space-y-3 text-[13px]">
                {[
                    { id: 'sec-1', label: '용법 및 예문' },
                    { id: 'sec-2', label: '규칙 변화' },
                    { id: 'sec-3', label: '주요 불규칙' }
                ].map((item) => (
                    <React.Fragment key={item.id}>
                        <li>
                            <button onClick={() => scrollTo(item.id)} className="text-slate-500 hover:text-blue-600 transition-colors text-left flex items-center gap-2 group font-medium">
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-blue-600 transition-colors shadow-sm"></div>
                                {item.label}
                            </button>
                        </li>
                        {item.id === 'sec-3' && activeTense.irregularGroups?.map((group, gIdx) => (
                            <li key={gIdx} className="pl-4">
                                <button onClick={() => scrollTo(`irreg-${gIdx}`)} className="text-slate-400 hover:text-amber-600 transition-colors text-left flex items-center gap-2 group text-[11px] font-medium">
                                    <div className="w-1 h-1 rounded-full bg-slate-200 group-hover:bg-amber-400 transition-colors"></div>
                                    {group.cat}
                                </button>
                            </li>
                        ))}
                    </React.Fragment>
                ))}
            </ul>
        </div>
      </aside>
    </div>
  );
}