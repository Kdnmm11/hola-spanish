'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, CornerDownRight, ArrowRight, Info, AlertTriangle, Scale, GitCompare
} from 'lucide-react';

const AUNQUE_COMPARISON = [
    { mode: '직설법 (Indicativo)', nuance: '확정된 사실 / 정보 전달', ex: 'aunque llueve, voy a salir.', mean: '비가 오고 있지만 (실제로 옴), 나갈 것이다.' },
    { mode: '접속법 (Subjuntivo)', nuance: '가설 / 양보 / 무관심', ex: 'aunque llueva, voy a salir.', mean: '비가 올지라도 (올지 안 올지 모르지만), 나갈 것이다.' }
];

const OTHER_CONNECTORS = [
    { con: 'a pesar de que', rule: '직설/접속 모두 가능', desc: '~에도 불구하고', ex: 'a pesar de que es tarde...' },
    { con: 'a pesar de', rule: '명사 / 동사원형 결합', desc: '~에도 불구하고 (구)', ex: 'a pesar de la lluvia...' },
    { con: 'por más que', rule: '주로 접속법과 결합', desc: '아무리 ~해도', ex: 'por más que estudies...' },
    { con: 'aun cuando', rule: '강한 양보 (접속법)', desc: '심지어 ~할 때조차', ex: 'aun cuando me lo pidas...' }
];

const QUIZ_DATA = [
    { id: 1, q: "현재 사실 전달: Aunque 지금(ahora) ( ) (llover), no tengo paraguas.", options: ['llueve', 'llueva'], answer: 0, explain: "지금 비가 오고 있다는 '현재 사실'을 전달하므로 직설법(llueve)을 씁니다." },
    { id: 2, q: "미래 가정: Aunque mañana ( ) (llover), iré a verte.", options: ['llueve', 'llueva'], answer: 1, explain: "내일 비가 올지 안 올지 모르는 '미래의 가정'에는 반드시 접속법(llueva)을 씁니다." },
    { id: 3, q: "아무리 ~해도: Por más que ( ) (gritar), nadie te oye.", options: ['gritas', 'grites'], answer: 1, explain: "por más que(~아무리 해도)는 양보의 의미를 강조하며 주로 접속법(grites)을 동반합니다." }
];

export default function ConcessiveClausesDetail() {
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
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 38</span>
                <ChevronRight size={10} />
                <span>Advanced Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              양보절 심화
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               "비록 ~일지라도"라는 의미를 전달하는 양보절은 동사의 법(직설법/접속법)에 따라 <br/>
               화자가 그 정보를 사실로 보는지 가설로 보는지 결정됩니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium">
                  <li><strong>직설법 사용</strong>: 화자가 이미 알고 있는 확실한 사실을 언급할 때.</li>
                  <li><strong>접속법 사용</strong>: 불확실한 미래, 가상의 상황, 또는 사실이어도 상관없다는 태도일 때.</li>
                  <li><strong>A pesar de</strong>: 뒤에 명사가 오면 'de'만, 절이 오면 'de que'를 사용합니다.</li>
              </ul>
          </div>

          {/* 1. Aunque 비교 */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">1.</span> Aunque + 직설법 vs 접속법
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">선택하는 법에 따라 문장의 실현 여부와 화자의 심리 상태가 달라집니다.</p>
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-left border-collapse">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 w-1/4">사용 법</th>
                            <th className="px-5 py-3 w-1/3">뉘앙스</th>
                            <th className="px-5 py-3 text-right pr-8">예시 및 번역</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {AUNQUE_COMPARISON.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                <td className={`px-5 py-4 font-bold bg-slate-50/30 border-r border-slate-100 ${i === 0 ? 'text-slate-900' : 'text-blue-600'}`}>{row.mode}</td>
                                <td className="px-5 py-4 text-slate-600 text-xs font-medium">{row.nuance}</td>
                                <td className="px-5 py-4 text-right pr-8">
                                    <div className="flex flex-col items-end">
                                        <span className="text-slate-900 font-bold italic">{row.ex}</span>
                                        <span className="text-xs text-slate-400 mt-0.5">{row.mean}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 2. 기타 접속사 */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 기타 양보 접속사
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">의미의 강도와 격식의 정도에 따라 다양한 표현을 선택할 수 있습니다.</p>
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-left border-collapse">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 w-1/4">접속사</th>
                            <th className="px-5 py-3 w-1/4">결합 규칙</th>
                            <th className="px-5 py-3 text-right pr-8">설명 및 예시</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {OTHER_CONNECTORS.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                <td className="px-5 py-4 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100">{row.con}</td>
                                <td className="px-5 py-4 text-slate-500 text-xs font-medium">{row.rule}</td>
                                <td className="px-5 py-4 text-right pr-8">
                                    <div className="flex flex-col items-end">
                                        <span className="text-slate-900 font-bold italic">{row.ex}</span>
                                        <span className="text-xs text-slate-400 mt-0.5">{row.desc}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 3. 상황별 가이드 */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 상황별 법(Mode) 선택 가이드
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                    <h4 className="text-xs font-black text-slate-400 uppercase mb-3 tracking-widest flex items-center gap-2">
                        <Scale size={14} className="text-slate-400"/> 직설법 선택 (사실)
                    </h4>
                    <ul className="space-y-3">
                        <li className="flex flex-col">
                            <span className="text-sm font-bold text-slate-800">이미 일어난 과거 사실</span>
                            <span className="text-xs text-slate-400 italic">aunque ayer llovía, salimos.</span>
                        </li>
                        <li className="flex flex-col">
                            <span className="text-sm font-bold text-slate-800">현재의 확실한 상태</span>
                            <span className="text-xs text-slate-400 italic">aunque no tengo dinero, soy feliz.</span>
                        </li>
                    </ul>
                </div>
                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                    <h4 className="text-xs font-black text-blue-400 uppercase mb-3 tracking-widest flex items-center gap-2">
                        <Scale size={14} className="text-blue-400"/> 접속법 선택 (가상/무관심)
                    </h4>
                    <ul className="space-y-3">
                        <li className="flex flex-col">
                            <span className="text-sm font-bold text-slate-800">미래에 대한 가정</span>
                            <span className="text-xs text-slate-400 italic">aunque mañana haga frío, iré.</span>
                        </li>
                        <li className="flex flex-col">
                            <span className="text-sm font-bold text-slate-800">사실에 대한 무관심 (비아냥)</span>
                            <span className="text-xs text-slate-400 italic">aunque seas rico, no me importa.</span>
                        </li>
                    </ul>
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
                {['Aunque 비교', '기타 접속사', '상황별 가이드', '연습 문제'].map((item, i) => (
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