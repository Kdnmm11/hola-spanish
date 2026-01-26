'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, CornerDownRight, ArrowRight, Info, AlertTriangle, Footprints
} from 'lucide-react';

const BOOT_VERBS = [
    { person: 'yo', e_ie: 'quiero', o_ue: 'puedo', e_i: 'pido' },
    { person: 'tú', e_ie: 'quieres', o_ue: 'puedes', e_i: 'pides' },
    { person: 'Él/Ella/Ud.', e_ie: 'quiere', o_ue: 'puede', e_i: 'pide' },
    { person: 'nosotros/as', e_ie: 'queremos', o_ue: 'podemos', e_i: 'pedimos' },
    { person: 'vosotros/as', e_ie: 'queréis', o_ue: 'podéis', e_i: 'pedís' },
    { person: 'Ellos/Ellas/Uds.', e_ie: 'quieren', o_ue: 'pueden', e_i: 'piden' }
];

const YO_ONLY_GO = [
    { origin: 'Hacer (하다)', stem: 'Hag', suffix: 'o' },
    { origin: 'Poner (놓다)', stem: 'Pong', suffix: 'o' },
    { origin: 'Salir (나가다)', stem: 'Salg', suffix: 'o' },
    { origin: 'Traer (가져오다)', stem: 'Traig', suffix: 'o' },
    { origin: 'Conocer (알다)', stem: 'Conozc', suffix: 'o' }
];

const FULL_IRREGULAR = [
    { person: 'yo', ser: 'soy', estar: 'estoy', ir: 'voy' },
    { person: 'tú', ser: 'eres', estar: 'estás', ir: 'vas' },
    { person: 'Él/Ella/Ud.', ser: 'es', estar: 'está', ir: 'va' },
    { person: 'nosotros/as', ser: 'somos', estar: 'estamos', ir: 'vamos' },
    { person: 'vosotros/as', ser: 'sois', estar: 'estáis', ir: 'vais' },
    { person: 'Ellos/Ellas/Uds.', ser: 'son', estar: 'están', ir: 'van' }
];

const QUIZ_DATA = [
    { id: 1, q: "빈칸 채우기: Yo ( ) (동사: Hacer) 내 숙제를.", options: ['hace', 'hago', 'haco'], answer: 1, explain: "Hacer 동사는 1인칭 단수(Yo)에서만 불규칙 형태인 hago를 씁니다." },
    { id: 2, q: "다음 중 Nosotros 형태가 틀린 것은?", options: ['Queremos', 'Podemos', 'Pidenos'], answer: 2, explain: "어간 변화 동사라도 Nosotros와 Vosotros는 어간 변화 없이 규칙형을 유지합니다. (Pedir -> pedimos)" },
    { id: 3, q: "'Ir(가다)' 동사의 3인칭 복수(Ellos) 형태는?", options: ['van', 'vayan', 'iramos'], answer: 0, explain: "Ir 동사는 완전히 불규칙하게 변하며, 3인칭 복수형은 van입니다." }
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
      return (
          <span>
              <span className="text-slate-900">{stem}</span>
              <span className="text-red-600">{foundSuffix}</span>
          </span>
      );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto px-6 lg:px-8 py-8 font-sans text-slate-800 bg-white">
      
      <article className="flex-1 min-w-0">
          <header className="mb-8 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
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

          {/* 1. 어간 변화 동사 */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 어간 변화 동사 (Boot Verbs)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">Nosotros와 Vosotros를 제외한 인칭에서 어간 모음이 변하는 형태입니다.</p>
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-2 py-3 text-left pl-5">주어</th>
                            <th className="px-2 py-3">e → ie (Querer)</th>
                            <th className="px-2 py-3">o → ue (Poder)</th>
                            <th className="px-2 py-3">e → i (Pedir)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {BOOT_VERBS.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className={`px-2 py-4 text-left pl-5 font-bold text-xs ${i === 3 || i === 4 ? 'text-slate-300' : 'text-slate-400'}`}>{row.person}</td>
                                <td className="px-2 py-4 font-bold text-slate-900 border-x border-slate-50">{renderStyledVerb(row.e_ie)}</td>
                                <td className="px-2 py-4 font-bold text-slate-900 border-x border-slate-50">{renderStyledVerb(row.o_ue)}</td>
                                <td className="px-2 py-4 font-bold text-slate-900 border-x border-slate-50">{renderStyledVerb(row.e_i)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 2. Yo 불규칙 */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 1인칭 단수(Yo)만 불규칙
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">다른 인칭은 모두 규칙인데, 오직 Yo 형태에서만 특이한 철자가 나타나는 그룹입니다.</p>
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-left border-collapse">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 w-1/3">동사 원형</th>
                            <th className="px-5 py-3">Yo 형태</th>
                            <th className="px-5 py-3 text-right pr-8">의미</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {YO_ONLY_GO.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 font-bold text-slate-400 bg-slate-50/30 border-r border-slate-100">{row.origin.split(' ')[0]}</td>
                                <td className="px-5 py-4 font-bold text-[15px]">
                                    <span className="text-slate-900">{row.stem}</span>
                                    <span className="text-red-600">{row.suffix}</span>
                                </td>
                                <td className="px-5 py-4 text-right pr-8 text-slate-500 text-sm italic">{row.origin.split('(')[1]?.replace(')', '')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 3. 완전 불규칙 */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 완전 불규칙 동사 (Essentials)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">패턴을 따르지 않고 완전히 독자적인 형태로 변화하는 필수 동사들입니다.</p>
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-2 py-3 text-left pl-5">주어</th>
                            <th className="px-2 py-3">Ser (이다)</th>
                            <th className="px-2 py-3">Estar (있다)</th>
                            <th className="px-2 py-3">Ir (가다)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {FULL_IRREGULAR.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                <td className="px-2 py-4 text-left pl-5 font-bold text-slate-400 text-xs">{row.person}</td>
                                <td className="px-2 py-4 font-bold text-slate-900">{row.ser}</td>
                                <td className="px-2 py-4 font-bold text-slate-900">{row.estar}</td>
                                <td className="px-2 py-4 font-bold text-slate-900">{row.ir}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 연습 문제 */}
          <section id="sec-4" className="scroll-mt-24 pt-8 border-t border-slate-200">
             <h2 className="text-[13px] font-black text-slate-400 mb-5 uppercase tracking-widest flex items-center gap-2">
                <CornerDownRight size={14} /> 연습 문제
             </h2>
             <div className="space-y-4 text-[15px]">
                {QUIZ_DATA.map((q, idx) => (
                    <div key={q.id} className="bg-slate-50 p-4 rounded-lg border border-slate-200 shadow-sm">
                        <div className="flex items-baseline gap-3 mb-3">
                            <span className="text-slate-400 font-bold">Q{idx + 1}.</span>
                            <p className="font-bold text-slate-800">{q.q}</p>
                        </div>
                        <div className="flex flex-wrap gap-2 ml-0 w-full mt-2">
                            {q.options.map((opt, optIdx) => {
                                const isSelected = quizState[q.id] === optIdx;
                                const isCorrect = q.answer === optIdx;
                                const showResult = quizState[q.id] !== undefined && quizState[q.id] !== null;
                                let buttonStyle = "bg-white border-slate-200 hover:border-slate-400 hover:shadow-md text-slate-600";
                                if (showResult) {
                                    if (isSelected) {
                                        buttonStyle = isCorrect ? "bg-green-50 border-green-500 text-green-700 font-bold" : "bg-red-50 border-red-500 text-red-700 font-bold";
                                    } else if (isCorrect) {
                                        buttonStyle = "bg-green-50 border-green-200 text-green-600 opacity-70";
                                    } else {
                                        buttonStyle = "bg-slate-50 border-slate-100 text-slate-400 opacity-50";
                                    }
                                }
                                return (
                                    <button key={optIdx} onClick={() => !showResult && handleQuiz(q.id, optIdx)} disabled={showResult}
                                        className={`px-4 py-2 rounded-lg border transition-all shadow-sm w-fit font-medium ${buttonStyle}`}
                                    >{opt}</button>
                                );
                            })}
                        </div>
                        {showExplain[q.id] && (
                            <div className="mt-5 w-full text-sm animate-in fade-in slide-in-from-top-2 duration-300">
                                {quizState[q.id] === q.answer 
                                    ? <p className="text-green-600 font-bold flex items-center gap-2 mb-2"><Check size={18}/> 정답입니다!</p>
                                    : <p className="text-red-500 font-bold flex items-center gap-2 mb-2"><X size={18}/> 오답입니다.</p>
                                }
                                <div className="bg-indigo-50/50 border border-indigo-100 p-5 rounded-xl text-slate-700 leading-relaxed shadow-sm">
                                    <strong className="text-indigo-600 block mb-1 text-[13px] uppercase tracking-tight">💡 해설</strong>
                                    {q.explain}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
             </div>
          </section>
      </article>

      <aside className="hidden lg:block w-56 shrink-0">
        <div className="sticky top-8 border-l border-slate-100 pl-6">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">On this page</h4>
            <ul className="space-y-3 text-[13px]">
                {['어간 변화 표', 'Yo 불규칙', '완전 불규칙', '연습 문제'].map((item, i) => (
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