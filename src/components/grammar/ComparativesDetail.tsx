'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, CornerDownRight, ArrowRight, AlertTriangle, TrendingUp
} from 'lucide-react';

const COMPARISON_TABLE = [
    { type: '우등 비교', struct: 'más + 형/부 + que', ex: 'Soy más alto que Juan. (나는 후안보다 더 키가 크다)' },
    { type: '열등 비교', struct: 'menos + 형/부 + que', ex: 'Es menos caro que aquel. (이것은 저것보다 덜 비싸다)' },
    { type: '동등 비교', struct: 'tan + 형/부 + como', ex: 'Es tan inteligente como tú. (그는 너만큼 똑똑하다)' }
];

const IRREGULAR_COMPARATIVES = [
    { adj: 'bueno (좋은)', comp: 'mejor (더 좋은)', sup: 'el mejor (가장 좋은)' },
    { adj: 'malo (나쁜)', comp: 'peor (더 나쁜)', sup: 'el peor (가장 나쁜)' },
    { adj: 'grande (큰)', comp: 'mayor (더 큰)', sup: 'el mayor (가장 큰)' },
    { adj: 'pequeño (작은)', comp: 'menor (더 작은)', sup: 'el menor (가장 작은)' }
];

const ABSOLUTE_SUPERLATIVE_RULES = [
    { rule: '-co → -quísimo', ex: 'rico → riquísimo' },
    { rule: '-go → -guísimo', ex: 'largo → larguísimo' },
    { rule: '-z → -císimo', ex: 'feliz → felicísimo' }
];

const QUIZ_DATA = [
    { id: 1, q: "'나는 너보다 돈이 더 많다' 빈칸 채우기: Tengo (     ) dinero (     ) tú.", options: ['más / que', 'más / como'], answer: 0, explain: "'더 ~한'은 'más ... que' 구조를 사용합니다." },
    { id: 2, q: "'이것이 저것보다 낫다': Este es (     ) que aquel.", options: ['más bueno', 'mejor'], answer: 1, explain: "'Bueno'의 비교급은 불규칙 형태인 'Mejor'를 사용해야 합니다." },
    { id: 3, q: "'매우 행복한' (Feliz의 절대 최상급)", options: ['Felizísimo', 'Felicísimo'], answer: 1, explain: "-z로 끝나는 형용사는 c로 변한 뒤 -ísimo가 붙습니다." }
];

export default function ComparativesDetail() {
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
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 tracking-widest mb-2">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 8</span>
                <ChevronRight size={10} />
                <span>Basic Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              비교급과 최상급
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               대상의 우열이나 동등함을 표현하는 방법을 배웁니다. 규칙적인 패턴과 불규칙 형태를 익히는 것이 중요합니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] text-slate-700 list-disc list-inside leading-relaxed font-medium">
                  <li><strong>비교급</strong>: más(더), menos(덜), tan(동등)을 사용합니다.</li>
                  <li><strong>불규칙</strong>: bueno(mejor), malo(peor) 등은 특수 형태를 가집니다.</li>
                  <li><strong>최상급</strong>: 정관사+más (상대), -ísimo (절대) 두 가지 방식이 있습니다.</li>
              </ul>
          </div>

          {/* 1. Comparatives */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 비교급 구조
            </h2>
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm mb-8">
                <table className="w-full text-base text-left border-collapse">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm">
                        <tr>
                            <th className="px-5 py-3 w-1/4">비교 유형</th>
                            <th className="px-5 py-3 w-1/3 text-slate-800">구조</th>
                            <th className="px-5 py-3 text-right pr-8">예시</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white text-[15px]">
                        {COMPARISON_TABLE.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100">{row.type}</td>
                                <td className="px-5 py-4 text-slate-700 font-medium">{row.struct}</td>
                                <td className="px-5 py-4 text-right pr-8">
                                    <div className="flex flex-col items-end">
                                        <span className="text-slate-900 font-bold italic">{row.ex.split('(')[0]}</span>
                                        <span className="text-xs text-slate-400 mt-0.5">{row.ex.split('(')[1]?.replace(')', '') || ''}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 font-bold text-slate-800 text-sm flex items-center gap-2 tracking-tight">
                    <AlertTriangle size={16} className="text-slate-400"/> 불규칙 비교급
                </div>
                <table className="w-full text-[15px] border-collapse">
                    <thead className="bg-slate-50 text-slate-600 font-bold text-xs border-b border-slate-200">
                        <tr>
                            <th className="px-5 py-3 text-left">원급</th>
                            <th className="px-5 py-3 text-left text-slate-800">비교급</th>
                            <th className="px-5 py-3 text-left">최상급</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {IRREGULAR_COMPARATIVES.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-3 text-slate-500 italic text-sm">{row.adj}</td>
                                <td className="px-5 py-3 font-bold text-slate-900">{row.comp}</td>
                                <td className="px-5 py-3 text-slate-500 text-sm italic">{row.sup}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 2. Superlatives */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 최상급 (Superlativos)
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8 text-[15px]">
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2 font-black tracking-tight text-slate-400">상대 최상급</h3>
                    <p className="text-[14px] text-slate-600 mb-4">특정 집단 내에서 최고를 나타냅니다.</p>
                    <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-800 font-medium mb-3">
                        정관사 + 명사 + más + 형용사 + de
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="font-bold text-slate-900 italic">El chico más alto de la clase.</span>
                        <span className="text-slate-400 text-xs font-normal">반에서 가장 큰 소년</span>
                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2 font-black tracking-tight text-slate-400">절대 최상급</h3>
                    <p className="text-[14px] text-slate-600 mb-4">범위 없이 "매우 ~하다"를 강조합니다.</p>
                    <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-800 font-medium mb-3">
                        형용사 어미 + ísimo
                    </div>
                    <div className="space-y-2 text-[14px]">
                        {ABSOLUTE_SUPERLATIVE_RULES.map((rule, idx) => (
                            <div key={idx} className="flex justify-between items-center bg-white border border-slate-100 px-3 py-2 rounded-lg">
                                <span className="text-slate-500 text-xs font-bold">{rule.rule}</span>
                                <span className="font-bold text-slate-900 italic text-sm">{rule.ex}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          </section>

          {/* 3. Quiz */}
          <section id="sec-3" className="scroll-mt-24 pt-8 border-t border-slate-200">
             <h2 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2 tracking-tight text-slate-400">
                <CornerDownRight size={20} /> 연습 문제
             </h2>
             <div className="space-y-4">
                {QUIZ_DATA.map((q, idx) => (
                    <div key={q.id} className="bg-slate-50 p-4 rounded-lg border border-slate-200 shadow-sm text-[15px]">
                        <div className="flex items-baseline gap-3 mb-3">
                            <span className="text-slate-400 font-bold text-sm">Q{idx + 1}.</span>
                            <p className="font-bold text-slate-800 whitespace-pre-wrap">{q.q}</p>
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
                                <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl text-slate-700 leading-relaxed shadow-sm">
                                    <strong className="text-slate-800 block mb-1 text-[13px] tracking-tight">💡 해설</strong>
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
            <h4 className="text-sm font-bold text-slate-400 tracking-widest mb-4">On this page</h4>
            <ul className="space-y-3 text-[14px]">
                {['비교급 구조', '최상급', '연습 문제'].map((item, i) => (
                    <li key={i}>
                        <button onClick={() => scrollTo(`sec-${i+1}`)} className="text-slate-500 hover:text-slate-800 transition-colors text-left flex items-center gap-2 group font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-slate-600 transition-colors shadow-sm"></div>
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