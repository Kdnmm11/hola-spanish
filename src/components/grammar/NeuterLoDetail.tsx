'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, CornerDownRight, ArrowRight, Info, AlertTriangle, Box, Sparkles
} from 'lucide-react';

const LO_ADJECTIVE_CASES = [
    { type: 'lo bueno', mean: '좋은 것 / 좋은 점', note: '추상적인 가치' },
    { type: 'lo importante', mean: '중요한 것', note: '핵심적인 부분' },
    { type: 'lo difícil', mean: '어려운 점', note: '문제나 고충' },
    { type: 'lo mejor', mean: '가장 좋은 것', note: '최선의 상황' }
];

const LO_DE_SITUATIONS = [
    { structure: 'lo de juan', mean: '후안에게 일어난 일', ex: '¿qué pasó con lo de juan?' },
    { structure: 'lo de ayer', mean: '어제 있었던 일', ex: 'lo de ayer fue increíble.' },
    { structure: 'lo de viajar', mean: '여행한다는 것 (개념)', ex: 'lo de viajar solo es difícil.' }
];

const QUIZ_DATA = [
    { id: 1, q: "빈칸 채우기: ( ) malo de esta película es el final. (추상적 부분)", options: ['El', 'Lo'], answer: 1, explain: "영화의 '나쁜 부분'이라는 추상적 개념을 명사화할 때는 중성 관사 lo를 씁니다." },
    { id: 2, q: "강조 표현: ¡Mira ( ) rápido que corre! (그가 얼마나 빨리 달리는지 봐!)", options: ['lo', 'tan'], answer: 0, explain: "lo + 부사 + que 구조는 '얼마나 ~한지'라는 강조의 의미를 가집니다." },
    { id: 3, q: "중성 목적격: Él está enfermo. - Ya ( ) sé. (그 사실을 알고 있어)", options: ['el', 'lo'], answer: 1, explain: "앞서 언급된 문장 전체나 아이디어를 대명사로 받을 때는 중성 lo를 사용합니다." }
];

export default function NeuterLoDetail() {
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
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 39</span>
                <ChevronRight size={10} />
                <span>Advanced Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              명사화와 중성 대명사 lo
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               남성/여성으로 분류할 수 없는 추상적인 개념이나 앞서 말한 상황 전체를 가리킬 때 씁니다. <br/>
               문장을 세련되게 압축하고 강조하는 핵심 도구입니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium">
                  <li><strong>lo + 형용사</strong>: "~한 것/부분" (추상적 명사화).</li>
                  <li><strong>lo de + 명사</strong>: "~에 관한 일/상황" (이미 아는 정보 지칭).</li>
                  <li><strong>lo que</strong>: "~하는 것" (절 전체를 명사절로 만듦).</li>
                  <li><strong>lo + 형용사 + que</strong>: "얼마나 ~한지" (정도의 강조).</li>
              </ul>
          </div>

          {/* 1. 추상 명사화 */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">1.</span> lo + 형용사/부사 (추상 명사화)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">구체적인 사물이 아닌 성질 자체를 명사로 취급합니다.</p>
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm mb-6">
                <table className="w-full text-[15px] text-left border-collapse">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 w-1/3">형태</th>
                            <th className="px-5 py-3 w-1/3">의미</th>
                            <th className="px-5 py-3">비고</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {LO_ADJECTIVE_CASES.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                <td className="px-5 py-4 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100 italic">{row.type}</td>
                                <td className="px-5 py-4 text-slate-700 font-medium">{row.mean}</td>
                                <td className="px-5 py-4 text-slate-400 text-xs">{row.note}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex gap-3 text-sm">
                <Scale size={16} className="text-slate-400 shrink-0 mt-0.5"/>
                <div>
                    <span className="font-bold text-slate-800">el mejor</span> (가장 좋은 사람/물건) vs <span className="font-bold text-blue-600">lo mejor</span> (가장 좋은 상황/일)
                </div>
            </div>
          </section>

          {/* 2. 상황 지칭 */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">2.</span> lo de + 명사/동사원형 (상황 지칭)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">이름 붙이기 모호한 특정 사건이나 화제 전체를 가리킵니다.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {LO_DE_SITUATIONS.map((item, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:border-slate-300 transition-colors">
                        <span className="text-xs font-black text-slate-400 uppercase mb-1 block tracking-tighter">{item.structure}</span>
                        <p className="text-slate-900 font-bold italic mb-2 text-[15px]">{item.ex}</p>
                        <p className="text-xs text-slate-500">{item.mean}</p>
                    </div>
                ))}
            </div>
          </section>

          {/* 3. 강조 및 대명사 */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 강조 용법 및 중성 대명사
            </h2>
            <div className="space-y-4">
                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                    <h4 className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-tight flex items-center gap-2">
                        <Sparkles size={16} className="text-yellow-500" /> 정도의 강조 (얼마나 ~한지)
                    </h4>
                    <div className="flex flex-col gap-2">
                        <p className="text-slate-900 font-bold italic text-[15px]">no sabes <span className="text-blue-600 underline decoration-blue-200 decoration-2 underline-offset-4">lo difícil que</span> es.</p>
                        <p className="text-xs text-slate-400">그것이 얼마나 어려운지 너는 모를 거야.</p>
                    </div>
                </div>
                
                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                    <h4 className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-tight flex items-center gap-2">
                        <Box size={16} className="text-indigo-400" /> 아이디어 지칭 (Ya lo sé)
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed mb-3">
                        앞서 말한 <strong>문장 전체나 개념</strong>을 목적으로 받을 때 씁니다.
                    </p>
                    <div className="bg-slate-50 p-3 rounded-lg flex items-center gap-3">
                        <span className="text-xs font-bold text-slate-400">EX</span>
                        <span className="text-slate-900 font-bold italic text-sm">"juan no viene." - "¿quién <span className="text-indigo-600">lo</span> dijo?"</span>
                    </div>
                </div>
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
                {['추상 명사화', '상황 지칭 (lo de)', '강조 및 대명사', '연습 문제'].map((item, i) => (
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