'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, CornerDownRight, ArrowRight, Info, AlertTriangle, List
} from 'lucide-react';

const VERB_GROUPS = [
    { group: '1군 (-ar)', ex: 'cantar, hablar, estudiar' },
    { group: '2군 (-er)', ex: 'comer, beber, leer' },
    { group: '3군 (-ir)', ex: 'vivir, escribir, abrir' }
];

const QUIZ_DATA = [
    { id: 1, q: "동사 변화 채우기: Nosotros ( ) (동사: Beber)", options: ['beben', 'bebemos', 'bebéis'], answer: 1, explain: "-er 동사의 Nosotros 어미는 -emos입니다. (bebemos)" },
    { id: 2, q: "'당신들(Ustedes)' 주어에 맞는 -ar 동사 어미는?", options: ['-amos', '-áis', '-an'], answer: 2, explain: "Ustedes는 3인칭 복수 취급을 하므로 -an 어미를 사용합니다." },
    { id: 3, q: "Yo ( ) una carta. (동사: Escribir)", options: ['escribo', 'escribe', 'escriba'], answer: 0, explain: "1인칭 단수(Yo)는 모든 군에서 어미가 -o로 끝납니다." }
];

export default function VerbsPresentDetail() {
  const [quizState, setQuizState] = useState<{ [key: number]: number | null }>({});
  const [showExplain, setShowExplain] = useState<{ [key: number]: boolean }>({});

  const handleQuiz = (qId: number, optIdx: number) => {
    setQuizState(prev => ({ ...prev, [qId]: optIdx }));
    setShowExplain(prev => ({ ...prev, [qId]: true }));
  };

  const scrollTo = (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto px-6 lg:px-8 py-8 font-sans text-slate-800 bg-white">
      
      <article className="flex-1 min-w-0">
          <header className="mb-8 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 12</span>
                <ChevronRight size={10} />
                <span>Basic Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              동사 기초와 현재시제
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               스페인어 동사 활용의 기초인 3가지 그룹과 현재시제 규칙 변화를 학습합니다.
            </p>
          </header>

          {/* Key Summary */}
          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium">
                  <li><strong>3가지 그룹</strong>: 원형 어미에 따라 -ar, -er, -ir 동사로 분류됩니다.</li>
                  <li><strong>규칙 변화</strong>: 어간(뿌리)에 인칭별 규칙 어미(빨간색)를 결합합니다.</li>
                  <li><strong>Usted</strong>: 의미는 '당신'이지만 문법적으로는 항상 3인칭 변화를 따릅니다.</li>
              </ul>
          </div>

          {/* 1. 기본 개념 */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 동사의 기본 개념 (-ar, -er, -ir)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">스페인어의 모든 동사는 원형 어미에 따라 세 가지 그룹으로 나뉩니다.</p>
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-left border-collapse">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 w-1/3">그룹</th>
                            <th className="px-5 py-3 text-right pr-8">대표 동사 (원형)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {VERB_GROUPS.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100">{row.group}</td>
                                <td className="px-5 py-4 text-right pr-8 text-slate-600 italic font-medium">{row.ex}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 2. 주격 인칭대명사 */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 동사 변화의 기준 (주어)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">동사를 변화시키기 전, 기준이 되는 인칭대명사 체계를 이해해야 합니다.</p>
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-left border-collapse">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3">구분</th>
                            <th className="px-5 py-3">단수 (Singular)</th>
                            <th className="px-5 py-3">복수 (Plural)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        <tr className="hover:bg-slate-50/50">
                            <td className="px-5 py-4 font-bold text-slate-400 bg-slate-50/30 border-r border-slate-100">1인칭</td>
                            <td className="px-5 py-4 font-bold text-slate-900">yo <span className="text-slate-400 font-normal ml-1">(나)</span></td>
                            <td className="px-5 py-4 font-bold text-slate-900">nosotros/as <span className="text-slate-400 font-normal ml-1">(우리)</span></td>
                        </tr>
                        <tr className="hover:bg-slate-50/50">
                            <td className="px-5 py-4 font-bold text-slate-400 bg-slate-50/30 border-r border-slate-100">2인칭</td>
                            <td className="px-5 py-4 font-bold text-slate-900">tú <span className="text-slate-400 font-normal ml-1">(너)</span></td>
                            <td className="px-5 py-4 font-bold text-slate-900">vosotros/as <span className="text-slate-400 font-normal ml-1">(너희)</span></td>
                        </tr>
                        <tr className="hover:bg-slate-50/50">
                            <td className="px-5 py-4 font-bold text-slate-400 bg-slate-50/30 border-r border-slate-100">3인칭</td>
                            <td className="px-5 py-4 font-bold text-slate-900">él/ella/usted <span className="text-slate-400 font-normal ml-1">(그/그녀/당신)</span></td>
                            <td className="px-5 py-4 font-bold text-slate-900">ellos/as/ustedes <span className="text-slate-400 font-normal ml-1">(그들/당신들)</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </section>

          {/* 3. 규칙 변화표 */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 직설법 현재 규칙 변화
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">어간 뒤에 붙는 인칭별 꼬리(빨간색)를 결합하여 동사를 활용합니다.</p>
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-2 py-3 text-left pl-5">주어</th>
                            <th className="px-2 py-3 bg-indigo-50/30">-ar (Hablar)</th>
                            <th className="px-2 py-3 bg-emerald-50/30">-er (Comer)</th>
                            <th className="px-2 py-3 bg-pink-50/30">-ir (Vivir)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {[
                            { p: 'yo', ar: 'o', er: 'o', ir: 'o' },
                            { p: 'tú', ar: 'as', er: 'es', ir: 'es' },
                            { p: 'él/ella/usted', ar: 'a', er: 'e', ir: 'e' },
                            { p: 'nosotros/as', ar: 'amos', er: 'emos', ir: 'imos' },
                            { p: 'vosotros/as', ar: 'áis', er: 'éis', ir: 'ís' },
                            { p: 'ellos/as/ustedes', ar: 'an', er: 'en', ir: 'en' }
                        ].map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-2 py-4 text-left pl-5 font-bold text-slate-400 text-xs">{row.p}</td>
                                <td className="px-2 py-4 font-bold text-slate-900 border-x border-slate-50">habl<span className="text-red-600">{row.ar}</span></td>
                                <td className="px-2 py-4 font-bold text-slate-900 border-x border-slate-50">com<span className="text-red-600">{row.er}</span></td>
                                <td className="px-2 py-4 font-bold text-slate-900 border-x border-slate-50">viv<span className="text-red-600">{row.ir}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 4. 용법 */}
          <section id="sec-4" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">4.</span> 현재시제의 주요 용법
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">현재시제는 단순히 '지금'뿐만 아니라 습관이나 가까운 미래까지 광범위하게 쓰입니다.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    { t: '현재 상태/동작', ex: 'Estudio español. (나는 공부한다)' },
                    { t: '습관적 행위', ex: 'Como pan cada mañana. (매일 빵을 먹는다)' },
                    { t: '보편적 진리', ex: 'La Tierra gira... (지구는 태양을 돈다)' },
                    { t: '가까운 미래', ex: 'Llego mañana. (내일 도착한다)' }
                ].map((item, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                        <h4 className="text-xs font-black text-slate-400 uppercase mb-2 tracking-widest">{item.t}</h4>
                        <div className="flex flex-col gap-1">
                            <span className="text-[15px] font-bold text-slate-900 italic">{item.ex.split('(')[0]}</span>
                            <span className="text-xs text-slate-400">{item.ex.split('(')[1]?.replace(')', '')}</span>
                        </div>
                    </div>
                ))}
            </div>
          </section>

          {/* 연습 문제 */}
          <section id="sec-5" className="scroll-mt-24 pt-8 border-t border-slate-200">
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
                {['기본 개념', '주어 체계', '규칙 변화표', '주요 용법', '연습 문제'].map((item, i) => (
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