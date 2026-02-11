'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, ArrowRight, Info, AlertTriangle, Footprints, Lightbulb
} from 'lucide-react';

const BOOT_VERBS = [
    { person: 'yo', e_ie: 'quiero', o_ue: 'puedo', e_i: 'pido' },
    { person: 'tú', e_ie: 'quieres', o_ue: 'puedes', e_i: 'pides' },
    { person: 'él/ella/ud.', e_ie: 'quiere', o_ue: 'puede', e_i: 'pide' },
    { person: 'nosotros/as', e_ie: 'queremos', o_ue: 'podemos', e_i: 'pedimos' },
    { person: 'vosotros/as', e_ie: 'queréis', o_ue: 'podéis', e_i: 'pedís' },
    { person: 'ellos/ellas/uds.', e_ie: 'quieren', o_ue: 'pueden', e_i: 'piden' }
];

const YO_ONLY_GO = [
    { origin: 'hacer (하다)', stem: 'hag', suffix: 'o' },
    { origin: 'poner (놓다)', stem: 'pong', suffix: 'o' },
    { origin: 'salir (나가다)', stem: 'salg', suffix: 'o' },
    { origin: 'traer (가져오다)', stem: 'traig', suffix: 'o' },
    { origin: 'conocer (알다)', stem: 'conozc', suffix: 'o' }
];

const FULL_IRREGULAR = [
    { person: 'yo', ser: 'soy', estar: 'estoy', ir: 'voy' },
    { person: 'tú', ser: 'eres', estar: 'estás', ir: 'vas' },
    { person: 'él/ella/ud.', ser: 'es', estar: 'está', ir: 'va' },
    { person: 'nosotros/as', ser: 'somos', estar: 'estamos', ir: 'vamos' },
    { person: 'vosotros/as', ser: 'sois', estar: 'estáis', ir: 'vais' },
    { person: 'ellos/ellas/uds.', ser: 'son', estar: 'están', ir: 'van' }
];

const QUIZ_DATA = [
    { id: 1, q: "빈칸 채우기: yo (     ) (동사: hacer) 내 숙제를.", options: ['hace', 'hago', 'haco'], answer: 1, explain: "hacer 동사는 1인칭 단수(yo)에서만 불규칙 형태인 hago를 씁니다." },
    { id: 2, q: "다음 중 nosotros 형태가 틀린 것은?", options: ['queremos', 'podemos', 'pidenos'], answer: 2, explain: "어간 변화 동사라도 nosotros와 vosotros는 어간 변화 없이 규칙형을 유지합니다. (pedir -> pedimos)" },
    { id: 3, q: "'ir(가다)' 동사의 3인칭 복수(ellos) 형태는?", options: ['van', 'vayan', 'iramos'], answer: 0, explain: "ir 동사는 완전히 불규칙하게 변하며, 3인칭 복수형은 van입니다." },
    { id: 4, q: "poder 동사의 1인칭 단수(yo) 형태는?", options: ['podo', 'puedo', 'podemos'], answer: 1, explain: "poder 동사는 o → ue 어간 변화 동사로 1인칭 단수는 puedo입니다." }
];

export default function VerbsIrregularDetail() {
  const [quizState, setQuizState] = useState<{ [key: number]: number | null }>({});
  const [showExplain, setShowExplain] = useState<{ [key: number]: boolean }>({});

  const handleQuiz = (qId: number, optIdx: number) => {
    setQuizState(prev => ({ ...prev, [qId]: optIdx }));
    setShowExplain(prev => ({ ...prev, [qId]: true }));
  };

  const scrollTo = (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderStyledVerb = (word: string) => {
      const suffixes = ['íamos', 'íais', 'amos', 'emos', 'imos', 'áis', 'éis', 'ís', 'as', 'es', 'an', 'en', 'o', 'a', 'e'];
      let foundSuffix = "";
      for (const s of suffixes) {
          if (word.endsWith(s)) {
              foundSuffix = s;
              break;
          }
      }
      const stem = word.slice(0, word.length - foundSuffix.length);
      // nosotros, vosotros는 어간 변화가 없으므로 스타일 분기
      const isRegular = ['queremos', 'queréis', 'podemos', 'podéis', 'pedimos', 'pedís'].includes(word);
      
      return (
          <span>
              <span className={isRegular ? "text-slate-900" : "text-blue-600 font-black"}>{stem}</span>
              <span className="text-slate-400">{foundSuffix}</span>
          </span>
      );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto px-2 sm:px-3 lg:px-4 pt-1.5 pb-8 font-sans text-slate-800 bg-white">
      
      <article className="flex-1 min-w-0">
          <header className="mb-8 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 tracking-widest mb-2">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 13</span>
                <ChevronRight size={10} />
                <span>Basic Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              현재시제의 불규칙 변화
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               일정한 패턴(어간 변화, 특정 인칭 불규칙)을 그룹별로 익히면 수많은 불규칙 동사를 효율적으로 정복할 수 있습니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium">
                  <li><strong>어간 변화</strong>: nosotros/vosotros를 제외하고 모음이 변합니다(e→ie, o→ue).</li>
                  <li><strong>yo 불규칙</strong>: 1인칭 단수만 독특한 형태(-go, -zco 등)를 가집니다.</li>
                  <li><strong>완전 불규칙</strong>: ser, estar, ir 등은 패턴 없이 외워야 합니다.</li>
              </ul>
          </div>

          {/* 1. 어간 변화 동사 */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 어간 변화 동사 (Boot Verbs)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">nosotros와 vosotros를 제외한 인칭에서 어간 모음이 변하는 형태입니다.</p>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-900 font-extrabold border-b border-slate-200 text-[15px]">
                        <tr>
                            <th className="px-2 py-3 text-center whitespace-nowrap">주어</th>
                            <th className="px-2 py-3 whitespace-nowrap">e → ie (querer)</th>
                            <th className="px-2 py-3 whitespace-nowrap">o → ue (poder)</th>
                            <th className="px-2 py-3 whitespace-nowrap">e → i (pedir)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {BOOT_VERBS.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-2 py-4 text-center font-bold text-slate-500 text-sm whitespace-nowrap">{row.person}</td>
                                <td className="px-2 py-4 font-bold text-slate-900 border-x border-slate-50 whitespace-nowrap">{renderStyledVerb(row.e_ie)}</td>
                                <td className="px-2 py-4 font-bold text-slate-900 border-x border-slate-50 whitespace-nowrap">{renderStyledVerb(row.o_ue)}</td>
                                <td className="px-2 py-4 font-bold text-slate-900 border-x border-slate-50 whitespace-nowrap">{renderStyledVerb(row.e_i)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 2. yo 불규칙 */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 1인칭 단수(yo)만 불규칙
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">다른 인칭은 모두 규칙인데, 오직 yo 형태에서만 특이한 철자가 나타나는 그룹입니다.</p>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse min-w-[500px]">
                    <thead className="bg-slate-50 text-slate-900 font-extrabold border-b border-slate-200 text-[15px]">
                        <tr>
                            <th className="px-5 py-3 w-1/3 text-center whitespace-nowrap">동사 원형</th>
                            <th className="px-5 py-3 bg-blue-50/30 text-center whitespace-nowrap">yo 형태</th>
                            <th className="px-5 py-3 text-center whitespace-nowrap">의미</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {YO_ONLY_GO.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 font-bold text-slate-400 bg-slate-50/30 border-r border-slate-100 text-center whitespace-nowrap">{row.origin.split(' ')[0]}</td>
                                <td className="px-5 py-4 font-bold text-[15px] text-center whitespace-nowrap">
                                    <span className="text-slate-900">{row.stem}</span>
                                    <span className="text-blue-600">{row.suffix}</span>
                                </td>
                                <td className="px-5 py-4 text-center text-slate-500 text-sm whitespace-nowrap">{row.origin.split('(')[1]?.replace(')', '')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 3. 완전 불규칙 */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 완전 불규칙 동사 (Essentials)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">패턴을 따르지 않고 완전히 독자적인 형태로 변화하는 필수 동사들입니다.</p>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-900 font-extrabold border-b border-slate-200 text-[15px]">
                        <tr>
                            <th className="px-2 py-3 text-center whitespace-nowrap">주어</th>
                            <th className="px-2 py-3 text-indigo-700 bg-indigo-50/30 whitespace-nowrap">ser (이다)</th>
                            <th className="px-2 py-3 text-emerald-700 bg-emerald-50/30 whitespace-nowrap">estar (있다)</th>
                            <th className="px-2 py-3 text-rose-700 bg-rose-50/30 whitespace-nowrap">ir (가다)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {FULL_IRREGULAR.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                <td className="px-2 py-4 text-center font-bold text-slate-500 text-sm whitespace-nowrap">{row.person}</td>
                                <td className="px-2 py-4 font-bold text-slate-900 whitespace-nowrap">{row.ser}</td>
                                <td className="px-2 py-4 font-bold text-slate-900 whitespace-nowrap">{row.estar}</td>
                                <td className="px-2 py-4 font-bold text-slate-900 whitespace-nowrap">{row.ir}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 연습 문제 */}
          <section id="sec-4" className="scroll-mt-24 pt-8 border-t border-slate-200">
             <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Lightbulb className="text-yellow-500 fill-yellow-500" size={20} />
                기초 다지기 (Práctica)
             </h2>
             <div className="space-y-4">
                {QUIZ_DATA.map((q, idx) => (
                    <div key={q.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-all">
                        <div className="flex items-start gap-3 mb-4">
                            <span className="bg-indigo-100 text-indigo-600 text-xs font-bold px-2.5 py-1 rounded-full mt-0.5">Q{idx + 1}</span>
                            <p className="font-bold text-slate-800 text-base leading-snug whitespace-pre-wrap">{q.q}</p>
                        </div>
                        <div className="flex flex-wrap gap-2.5 ml-0 w-full">
                            {q.options.map((opt, optIdx) => {
                                const isSelected = quizState[q.id] === optIdx;
                                const isCorrect = q.answer === optIdx;
                                const showResult = quizState[q.id] !== undefined && quizState[q.id] !== null;

                                let buttonStyle = "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300";
                                if (showResult) {
                                    if (isSelected) {
                                        buttonStyle = isCorrect 
                                            ? "bg-green-500 border-green-500 text-white font-bold shadow-md ring-2 ring-green-200 ring-offset-1" 
                                            : "bg-red-500 border-red-500 text-white font-bold shadow-md";
                                    } else if (isCorrect) {
                                        buttonStyle = "bg-green-50 border-green-200 text-green-700 font-bold";
                                    } else {
                                        buttonStyle = "bg-slate-50 border-slate-100 text-slate-300 opacity-50";
                                    }
                                }

                                return (
                                    <button 
                                        key={optIdx}
                                        onClick={() => !showResult && handleQuiz(q.id, optIdx)}
                                        disabled={showResult}
                                        className={`px-4 py-1.5 text-sm rounded-full border transition-all duration-200 font-medium ${buttonStyle}`}
                                    >
                                        {opt}
                                    </button>
                                );
                            })}
                        </div>
                        {showExplain[q.id] && (
                            <div className="mt-5 w-full text-sm animate-in fade-in slide-in-from-top-2 duration-300 bg-slate-50 rounded-xl p-4 border border-slate-100">
                                {quizState[q.id] === q.answer 
                                    ? <p className="text-green-600 font-bold flex items-center gap-2 mb-2"><Check size={16}/> 정답입니다!</p>
                                    : <p className="text-red-500 font-bold flex items-center gap-2 mb-2"><X size={16}/> 오답입니다.</p>
                                }
                                <p className="text-slate-600 leading-relaxed pl-6 border-l-2 border-slate-200">
                                    {q.explain}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
             </div>
          </section>
      </article>

      <aside className="hidden lg:block w-56 shrink-0">
        <div className="sticky top-8 border-l border-slate-100 pl-6">
            <h4 className="text-[10px] font-bold text-slate-400 tracking-widest mb-4">On this page</h4>
            <ul className="space-y-3 text-[13px]">
                {['어간 변화 표', 'yo 불규칙', '완전 불규칙', '연습 문제'].map((item, i) => (
                    <li key={i}>
                        <button onClick={() => scrollTo(`sec-${i+1}`)} className="text-slate-500 hover:text-slate-800 transition-colors text-left flex items-center gap-2 group font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-blue-600 transition-colors shadow-sm"></div>
                            {item}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
      </aside>
    </div>
  );
}