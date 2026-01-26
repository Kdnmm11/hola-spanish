'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, CornerDownRight, ArrowRight, Info, AlertTriangle, GitBranch, History, CloudSun
} from 'lucide-react';

const SUMMARY_TABLE = [
    { type: '1유형 (실현 가능)', if: '직설법 현재', result: '현재 / 미래 / 명령', use: '실제 가능성' },
    { type: '2유형 (현재 가상)', if: '접속법 과거', result: '조건형', use: '현재 반대/희박' },
    { type: '3유형 (과거 후회)', if: '접속법 과거완료', result: '조건형 완료', use: '과거 반대/불가능' }
];

const QUIZ_DATA = [
    { id: 1, q: "1유형 완성: si ( ) buen tiempo mañana, iré a la playa. (hacer)", options: ['hace', 'hará', 'haga'], answer: 0, explain: "1유형 조건절(si 뒤)에는 직설법 현재(hace)를 씁니다. 미래 시제(hará)는 쓸 수 없습니다." },
    { id: 2, q: "2유형 완성: si yo ( ) rico, viajaría mucho. (ser)", options: ['soy', 'fui', 'fuera'], answer: 2, explain: "현재 사실에 반대되는 가정(내가 부자라면)은 2유형이며, si절에는 접속법 과거(fuera)를 씁니다." },
    { id: 3, q: "3유형 완성: si ( ) estudiado, habría aprobado. (haber)", options: ['hubiera', 'haya', 'habría'], answer: 0, explain: "과거 사실에 대한 후회(공부했더라면)는 3유형이며, si절에는 접속법 과거완료(hubiera)를 씁니다." }
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
              Si 조건문과 가정법
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               실현 가능성에 따라 3가지 유형으로 나뉩니다. <br/>
               각 유형별 <strong>조건절(Si)</strong>과 <strong>귀결절</strong>의 시제 조합 공식이 핵심입니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium">
                  <li><strong>1유형 (현실)</strong>: Si + 직설법 현재 → 직설법 현재/미래/명령.</li>
                  <li><strong>2유형 (가상)</strong>: Si + 접속법 과거 → 조건형.</li>
                  <li><strong>3유형 (후회)</strong>: Si + 접속법 과거완료 → 조건형 완료.</li>
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
                    <span className="font-bold text-slate-900 text-sm">Si + 직설법 현재, (현재 / 미래 / 명령)</span>
                </div>
                <div className="space-y-3 text-[14px]">
                    <div className="flex flex-col gap-1">
                        <span className="text-slate-900 font-bold italic">si tengo tiempo, voy al cine.</span>
                        <span className="text-xs text-slate-400">시간이 있으면(현재), 영화관에 간다.</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-slate-900 font-bold italic">si hace sol, iré al parque.</span>
                        <span className="text-xs text-slate-400">해가 나면(현재), 공원에 갈 것이다(미래).</span>
                    </div>
                </div>
            </div>
            
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex gap-3 text-sm items-start">
                <AlertTriangle size={16} className="text-slate-400 shrink-0 mt-0.5"/>
                <p className="text-slate-600 leading-relaxed font-medium">
                    <strong>주의:</strong> Si 뒤에는 절대 미래 시제(futuro)를 쓰지 않습니다. <br/>
                    <span className="line-through text-slate-400 mr-2">Si tendré tiempo</span>
                    <span className="text-slate-900 font-bold">Si tengo tiempo (O)</span>
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
                    <span className="font-bold text-slate-900 text-sm">Si + <span className="text-blue-600">접속법 과거</span>, <span className="text-green-600">조건형</span></span>
                </div>
                <div className="space-y-3 text-[14px]">
                    <div className="flex flex-col gap-1">
                        <span className="text-slate-900 font-bold italic">si <span className="text-blue-600">tuviera</span> dinero, <span className="text-green-600">compraría</span> un coche.</span>
                        <span className="text-xs text-slate-400">돈이 있다면(실제론 없음), 차를 살 텐데.</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-slate-900 font-bold italic">si yo <span className="text-blue-600">fuera</span> tú, no lo <span className="text-green-600">haría</span>.</span>
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
                    <span className="font-bold text-slate-900 text-sm">Si + <span className="text-blue-600">접속법 과거완료</span>, <span className="text-green-600">조건형 완료</span></span>
                </div>
                <div className="space-y-3 text-[14px]">
                    <div className="flex flex-col gap-1">
                        <span className="text-slate-900 font-bold italic">si <span className="text-blue-600">hubiera estudiado</span>, <span className="text-green-600">habría aprobado</span>.</span>
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
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-left border-collapse">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 w-1/4">유형</th>
                            <th className="px-5 py-3 w-1/3 text-blue-700">Si 조건절</th>
                            <th className="px-5 py-3 w-1/3 text-green-700">귀결절 (주절)</th>
                            <th className="px-5 py-3 text-right pr-8">용도</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {SUMMARY_TABLE.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                <td className="px-5 py-4 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100">{row.type}</td>
                                <td className="px-5 py-4 text-slate-700 font-medium">{row.if}</td>
                                <td className="px-5 py-4 text-slate-700 font-medium">{row.result}</td>
                                <td className="px-5 py-4 text-right pr-8 text-xs text-slate-500 font-bold">{row.use}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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