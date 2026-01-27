'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, CornerDownRight, ArrowRight, Info, AlertTriangle, GitBranch, History, CloudSun, Lightbulb
} from 'lucide-react';

const SUMMARY_TABLE = [
    { type: '1유형 (실현 가능)', if: '직설법 현재', result: '현재 / 미래 / 명령', use: '실제 가능성' },
    { type: '2유형 (현재 가상)', if: '접속법 과거', result: '조건형', use: '현재 반대/희박' },
    { type: '3유형 (과거 후회)', if: '접속법 과거완료', result: '조건형 완료', use: '과거 반대/불가능' }
];

const QUIZ_DATA = [
    { id: 1, q: "1유형 완성: si ( ) buen tiempo mañana, iré a la playa. (hacer)", options: ['hace', 'hará', 'haga'], answer: 0, explain: "1유형 조건절(si 뒤)에는 직설법 현재(hace)를 씁니다. 미래 시제(hará)는 쓸 수 없습니다." },
    { id: 2, q: "2유형 완성: si yo ( ) rico, viajaría mucho. (ser)", options: ['soy', 'fui', 'fuera'], answer: 2, explain: "현재 사실에 반대되는 가정(내가 부자라면)은 2유형이며, si절에는 접속법 과거(fuera)를 씁니다." },
    { id: 3, q: "3유형 완성: si ( ) estudiado, habría aprobado. (haber)", options: ['hubiera', 'haya', 'habría'], answer: 0, explain: "과거 사실에 대한 후회(공부했더라면)는 3유형이며, si절에는 접속법 과거완료(hubiera)를 씁니다." },
    { id: 4, q: "가정법 시제 조합: si tuviera dinero, ( ) un coche. (comprar)", options: ['compro', 'compraría', 'comprará'], answer: 1, explain: "si절이 접속법 과거(tuviera)이면 귀결절은 조건형(compraría)이 오는 것이 2유형 공식입니다." }
];

export default function SiClausesDetail() {
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
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 33</span>
                <ChevronRight size={10} />
                <span>Advanced Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              si 조건문과 가정법
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               실현 가능성에 따라 3가지 유형으로 나뉩니다. <br/>
               각 유형별 <strong>조건절(si)</strong>과 <strong>귀결절</strong>의 시제 조합 공식이 핵심입니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium">
                  <li><strong>1유형 (현실)</strong>: si + 직설법 현재 → 직설법 현재/미래/명령.</li>
                  <li><strong>2유형 (가상)</strong>: si + 접속법 과거 → 조건형.</li>
                  <li><strong>3유형 (후회)</strong>: si + 접속법 과거완료 → 조건형 완료.</li>
              </ul>
          </div>

          {/* 1. 제1유형 */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 제1유형: 실현 가능한 조건
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">현재나 미래에 충분히 일어날 수 있는 현실적인 상황을 가정합니다.</p>
            
            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm mb-6">
                <div className="flex items-center gap-2 mb-4 bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <CloudSun size={20} className="text-blue-500" />
                    <span className="font-bold text-slate-900 text-sm">si + 직설법 현재, (현재 / 미래 / 명령)</span>
                </div>
                <div className="space-y-3 text-[14px]">
                    <div className="flex flex-col gap-1">
                        <span className="text-slate-900 font-bold">si tengo tiempo, voy al cine.</span>
                        <span className="text-xs text-slate-400">시간이 있으면(현재), 영화관에 간다.</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-slate-900 font-bold">si hace sol, iré al parque.</span>
                        <span className="text-xs text-slate-400">해가 나면(현재), 공원에 갈 것이다(미래).</span>
                    </div>
                </div>
            </div>
            
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex gap-3 text-sm items-start">
                <AlertTriangle size={16} className="text-slate-400 shrink-0 mt-0.5"/>
                <p className="text-slate-600 leading-relaxed font-medium">
                    <strong>주의:</strong> si 뒤에는 절대 미래 시제(futuro)를 쓰지 않습니다. <br/>
                    <span className="line-through text-slate-400 mr-2">si tendré tiempo</span>
                    <span className="text-slate-900 font-bold">si tengo tiempo (o)</span>
                </p>
            </div>
          </section>

          {/* 2. 제2유형 */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 제2유형: 현재의 가상/희박한 조건
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">현재 사실과 반대되거나 실현 가능성이 매우 낮은 상상을 할 때 씁니다.</p>
            
            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm mb-6">
                <div className="flex items-center gap-2 mb-4 bg-purple-50 p-3 rounded-lg border border-purple-100">
                    <GitBranch size={20} className="text-purple-500" />
                    <span className="font-bold text-slate-900 text-sm">si + <span className="text-blue-600">접속법 과거</span>, <span className="text-green-600">조건형</span></span>
                </div>
                <div className="space-y-3 text-[14px]">
                    <div className="flex flex-col gap-1">
                        <span className="text-slate-900 font-bold">si tuviera dinero, compraría un coche.</span>
                        <span className="text-xs text-slate-400">돈이 있다면(실제론 없음), 차를 살 텐데.</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-slate-900 font-bold">si yo fuera tú, no lo haría.</span>
                        <span className="text-xs text-slate-400">내가 너라면(불가능), 그렇게 안 할 텐데.</span>
                    </div>
                </div>
            </div>
          </section>

          {/* 3. 제3유형 */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 제3유형: 과거의 불가능한 조건
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">이미 지나간 과거 사실에 반대되는 가정을 하며, 주로 후회나 비판을 나타냅니다.</p>
            
            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm mb-6">
                <div className="flex items-center gap-2 mb-4 bg-orange-50 p-3 rounded-lg border border-orange-100">
                    <History size={20} className="text-orange-500" />
                    <span className="font-bold text-slate-900 text-sm">si + <span className="text-blue-600">접속법 과거완료</span>, <span className="text-green-600">조건형 완료</span></span>
                </div>
                <div className="space-y-3 text-[14px]">
                    <div className="flex flex-col gap-1">
                        <span className="text-slate-900 font-bold">si hubiera estudiado, habría aprobado.</span>
                        <span className="text-xs text-slate-400">공부를 했더라면(안 함), 합격했을 텐데(불합격).</span>
                    </div>
                </div>
            </div>
          </section>

          {/* 4. 요약표 */}
          <section id="sec-4" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">4.</span> 시제 조합 요약표
            </h2>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-left border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 w-1/4 whitespace-nowrap">유형</th>
                            <th className="px-5 py-3 w-1/3 text-blue-700 whitespace-nowrap">si 조건절</th>
                            <th className="px-5 py-3 w-1/3 text-green-700 whitespace-nowrap">귀결절 (주절)</th>
                            <th className="px-5 py-3 text-right pr-8 whitespace-nowrap">용도</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {SUMMARY_TABLE.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                <td className="px-5 py-4 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100 whitespace-nowrap">{row.type}</td>
                                <td className="px-5 py-4 text-slate-700 font-medium whitespace-nowrap">{row.if}</td>
                                <td className="px-5 py-4 text-slate-700 font-medium whitespace-nowrap">{row.result}</td>
                                <td className="px-5 py-4 text-right pr-8 text-xs text-slate-500 font-bold whitespace-nowrap">{row.use}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 연습 문제 */}
          <section id="sec-5" className="scroll-mt-24 pt-8 border-t border-slate-200">
             <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Lightbulb className="text-yellow-500 fill-yellow-500" size={20} />
                기초 다지기 (Práctica)
             </h2>
             <div className="space-y-4">
                {QUIZ_DATA.map((q, idx) => (
                    <div key={q.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-all">
                        <div className="flex items-start gap-3 mb-4">
                            <span className="bg-indigo-100 text-indigo-600 text-xs font-bold px-2.5 py-1 rounded-full mt-0.5">Q{idx + 1}</span>
                            <p className="font-bold text-slate-900 text-base leading-snug">{q.q}</p>
                        </div>
                        <div className="flex flex-wrap gap-2.5 ml-0 w-full">
                            {q.options.map((opt, optIdx) => {
                                const isSelected = quizState[q.id] === optIdx;
                                const isCorrect = q.answer === optIdx;
                                const showResult = quizState[q.id] !== undefined && quizState[q.id] !== null;

                                let buttonStyle = "bg-slate-50 border-slate-200 text-slate-900 hover:bg-slate-100 hover:border-slate-300";
                                if (showResult) {
                                    if (isSelected) {
                                        buttonStyle = isCorrect 
                                            ? "bg-green-500 border-green-500 text-white font-bold shadow-md ring-2 ring-green-200 ring-offset-1" 
                                            : "bg-red-500 border-red-500 text-white font-bold shadow-md";
                                    } else if (isCorrect) {
                                        buttonStyle = "bg-green-50 border-green-200 text-green-700 font-bold";
                                    } else {
                                        buttonStyle = "bg-slate-50 border-slate-100 text-slate-400 opacity-50";
                                    }
                                }

                                return (
                                    <button 
                                        key={optIdx}
                                        onClick={() => !showResult && handleQuiz(q.id, optIdx)}
                                        disabled={showResult}
                                        className={`px-4 py-1.5 text-sm rounded-full border transition-all duration-200 font-bold ${buttonStyle}`}
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
                                <p className="text-slate-900 font-medium leading-relaxed pl-6 border-l-2 border-slate-200">
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
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">On this page</h4>
            <ul className="space-y-3 text-[13px]">
                {['1유형 (현실)', '2유형 (가상)', '3유형 (후회)', '요약표', '연습 문제'].map((item, i) => (
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