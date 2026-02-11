'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, ArrowRight, Info, AlertTriangle, GitBranch, History, CloudSun, Lightbulb
} from 'lucide-react';

const SUMMARY_TABLE = [
    { type: '1유형 (실현 가능)', if: '직설법 현재', result: '현재 / 미래 / 명령', use: '실제 가능성' },
    { type: '2유형 (현재 가상)', if: '접속법 과거', result: '조건형', use: '현재 반대 / 희박' },
    { type: '3유형 (과거 후회)', if: '접속법 과거완료', result: '조건형 완료', use: '과거 반대 / 불가능' }
];

// --- Tense Label Component ---
const TenseLabel = ({ text, tense, color }: { text: string; tense: string; color: string }) => (
    <span className="relative inline-block mx-2 group">
        <span className={`border-b-2 pb-1 font-bold text-slate-900 text-xl ${color}`}>{text}</span>
        <span className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-[11px] font-bold uppercase whitespace-nowrap tracking-tight ${color.replace('border-', 'text-')}`}>
            {tense}
        </span>
    </span>
);

const TYPE_1_DATA = [
    { 
        type: '현실적 가능성', 
        desc: '충분히 일어날 수 있는 미래의 일이나 일반적인 습관을 말합니다. "만약 ~하면, ~할 것이다"라는 뜻입니다.',
        parts: [
            { text: 'Si', tense: '조건', color: 'border-black' },
            { text: 'tengo', tense: '직설법 현재', color: 'border-blue-400' },
            { text: 'tiempo,', tense: '', color: '' },
            { text: 'te ayudaré.', tense: '직설법 미래', color: 'border-emerald-400' }
        ],
        ko: '시간이 나면 (실제로 날 가능성 있음), 너를 도와줄게.' 
    }
];

const TYPE_2_DATA = [
    { 
        type: '현재 사실의 반대', 
        desc: '지금 현재 일어나지 않은 일을 상상합니다. 현재와 거리를 두기 위해 한 단계 과거 시제인 "접속법 과거"를 사용합니다.',
        parts: [
            { text: 'Si', tense: '조건', color: 'border-black' },
            { text: 'fuera', tense: '접속법 과거', color: 'border-blue-400' },
            { text: 'rico,', tense: '', color: '' },
            { text: 'compraría', tense: '조건형', color: 'border-emerald-400' },
            { text: 'una mansión.', tense: '', color: '' }
        ],
        ko: '내가 (지금) 부자라면 (실제론 아님), 대저택을 살 텐데.' 
    }
];

const TYPE_3_DATA = [
    { 
        type: '과거 사실의 반대', 
        desc: '이미 종료된 과거의 사건을 뒤집어 생각합니다. "했었더라면 ~했을 텐데"라는 후회나 비판의 뉘앙스입니다.',
        parts: [
            { text: 'Si', tense: '조건', color: 'border-black' },
            { text: 'hubiera estudiado', tense: '접속법 과거완료', color: 'border-blue-400' },
            { text: 'más,', tense: '', color: '' },
            { text: 'habría aprobado', tense: '조건형 완료', color: 'border-emerald-400' },
            { text: 'el examen.', tense: '', color: '' }
        ],
        ko: '공부를 더 했었더라면 (실제론 안 함), 시험에 합격했을 텐데.' 
    }
];

const QUIZ_DATA = [
    { id: 1, q: "1유형 완성: Si (     ) buen tiempo mañana, iré a la playa. (hacer)", options: ['hace', 'hará', 'haga'], answer: 0, explain: "1유형 조건절(si 뒤)에는 직설법 현재(hace)를 씁니다. 미래 시제는 쓸 수 없습니다." },
    { id: 2, q: "2유형 완성: Si yo (     ) rico, viajaría mucho. (ser)", options: ['soy', 'fui', 'fuera'], answer: 2, explain: "현재 사실에 반대되는 가정은 2유형이며, si절에는 접속법 과거(fuera)를 씁니다." },
    { id: 3, q: "3유형 완성: Si (     ) estudiado, habría aprobado. (haber)", options: ['hubiera', 'haya', 'habría'], answer: 0, explain: "과거 사실에 대한 후회는 3유형이며, si절에는 접속법 과거완료(hubiera)를 씁니다." },
    { id: 4, q: "가정법 시제 조합: Si tuviera dinero, (     ) un coche. (comprar)", options: ['compro', 'compraría', 'comprará'], answer: 1, explain: "si절이 접속법 과거(tuviera)이면 귀결절은 조건형(compraría)이 오는 것이 2유형 공식입니다." }
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
    <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto px-2 sm:px-3 lg:px-4 pt-1.5 pb-8 font-sans text-slate-800 bg-white">
      
      <article className="flex-1 min-w-0">
          <header className="mb-12 border-b border-slate-200 pb-8">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 tracking-widest mb-3">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 38</span>
                <ChevronRight size={10} />
                <span>Advanced Level</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
              Si 조건문과 가정법
            </h1>
            <p className="text-[16px] text-slate-600 font-medium leading-relaxed max-w-3xl">
               실현 가능성에 따라 3가지 유형으로 나뉩니다. <br/>
               각 유형별 <strong>조건절(si)</strong>과 <strong>귀결절</strong>의 시제 조합 공식이 핵심입니다.
            </p>
          </header>

          <div className="mb-12 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium text-slate-700">
                  <li><strong>1유형 (현실)</strong>: si + 직설법 현재 → 직설법 현재/미래/명령.</li>
                  <li><strong>2유형 (가상)</strong>: si + 접속법 과거 → 조건형.</li>
                  <li><strong>3유형 (후회)</strong>: si + 접속법 과거완료 → 조건형 완료.</li>
              </ul>
          </div>

          {/* 1. 제1유형 */}
          <section id="sec-1" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 제1유형: 실현 가능한 조건
            </h2>
            <p className="text-[15px] text-slate-600 mb-6 font-medium">현재나 미래에 충분히 일어날 수 있는 현실적인 상황을 가정합니다.</p>
            
            <div className="space-y-4 max-w-4xl mb-8">
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 mb-2">
                    <div className="flex items-center gap-2 text-blue-700 font-bold text-sm uppercase tracking-wider">
                        <CloudSun size={18}/> 공식: Si + 직설법 현재, [현재/미래/명령]
                    </div>
                </div>
                {TYPE_1_DATA.map((item, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-300 transition-all overflow-hidden flex flex-col sm:flex-row">
                        <div className="sm:w-1/4 bg-blue-50/50 p-5 flex items-center justify-center border-b sm:border-b-0 sm:border-r border-slate-100 text-center">
                            <span className="text-[15px] font-bold text-blue-700 leading-tight">{item.type}</span>
                        </div>
                        <div className="flex-1 p-6">
                            <p className="text-sm text-slate-600 mb-6 leading-relaxed font-medium">
                                {item.desc}
                            </p>
                            <div className="bg-slate-50 p-8 rounded-xl border border-slate-100 flex flex-col items-center">
                                <div className="flex flex-wrap justify-center items-baseline gap-y-10 mb-6 px-4">
                                    {item.parts.map((p, i) => (
                                        p.tense ? (
                                            <TenseLabel key={i} text={p.text} tense={p.tense} color={p.color} />
                                        ) : (
                                            <span key={i} className="text-lg font-bold text-slate-900 mx-1">{p.text}</span>
                                        )
                                    ))}
                                </div>
                                <p className="text-sm text-slate-500 font-medium mt-4">{item.ko}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="p-5 bg-amber-50 border border-amber-100 rounded-2xl flex gap-4 text-sm items-start max-w-4xl">
                <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5"/>
                <div>
                    <p className="text-amber-900 font-bold mb-1 italic">Si 뒤에는 절대 미래 시제를 쓰지 않습니다!</p>
                    <p className="text-amber-700 leading-relaxed font-medium">
                        <span className="line-through text-slate-400 mr-2">Si tendré tiempo (X)</span>
                        <span className="text-slate-900 font-bold">Si tengo tiempo (O)</span>
                    </p>
                </div>
            </div>
          </section>

          {/* 2. 제2유형 */}
          <section id="sec-2" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 제2유형: 현재의 가상/희박한 조건
            </h2>
            <p className="text-[15px] text-slate-600 mb-6 font-medium">현재 사실과 반대되거나 실현 가능성이 매우 낮은 상상을 할 때 씁니다.</p>
            
            <div className="space-y-4 max-w-4xl">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-2">
                    <div className="flex items-center gap-2 text-slate-700 font-bold text-sm uppercase tracking-wider">
                        <GitBranch size={18} className="text-blue-500"/> 공식: Si + <span className="text-blue-600">접속법 과거</span>, [<span className="text-emerald-600">조건형</span>]
                    </div>
                </div>
                {TYPE_2_DATA.map((item, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-300 transition-all overflow-hidden flex flex-col sm:flex-row">
                        <div className="sm:w-1/4 bg-slate-50 p-5 flex items-center justify-center border-b sm:border-b-0 sm:border-r border-slate-100 text-center">
                            <span className="text-[15px] font-bold text-slate-700 leading-tight">{item.type}</span>
                        </div>
                        <div className="flex-1 p-6">
                            <p className="text-sm text-slate-600 mb-6 leading-relaxed font-medium">
                                {item.desc}
                            </p>
                            <div className="bg-slate-50 p-8 rounded-xl border border-slate-100 flex flex-col items-center">
                                <div className="flex flex-wrap justify-center items-baseline gap-y-10 mb-6 px-4">
                                    {item.parts.map((p, i) => (
                                        p.tense ? (
                                            <TenseLabel key={i} text={p.text} tense={p.tense} color={p.color} />
                                        ) : (
                                            <span key={i} className="text-xl font-bold text-slate-900 mx-1">{p.text}</span>
                                        )
                                    ))}
                                </div>
                                <p className="text-sm text-slate-500 font-medium mt-4 text-center">{item.ko}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          </section>

          {/* 3. 제3유형 */}
          <section id="sec-3" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 제3유형: 과거의 불가능한 조건
            </h2>
            <p className="text-[15px] text-slate-600 mb-6 font-medium">이미 지나간 과거 사실에 반대되는 가정을 하며, 주로 후회나 비판을 나타냅니다.</p>
            
            <div className="space-y-4 max-w-4xl">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-2">
                    <div className="flex items-center gap-2 text-slate-700 font-bold text-sm uppercase tracking-wider">
                        <History size={18} className="text-emerald-500"/> 공식: Si + <span className="text-blue-600">접속법 과거완료</span>, [<span className="text-emerald-600">조건형 완료</span>]
                    </div>
                </div>
                {TYPE_3_DATA.map((item, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-300 transition-all overflow-hidden flex flex-col sm:flex-row">
                        <div className="sm:w-1/4 bg-slate-50 p-5 flex items-center justify-center border-b sm:border-b-0 sm:border-r border-slate-100 text-center">
                            <span className="text-[15px] font-bold text-slate-700 leading-tight">{item.type}</span>
                        </div>
                        <div className="flex-1 p-6">
                            <p className="text-sm text-slate-600 mb-6 leading-relaxed font-medium">
                                {item.desc}
                            </p>
                            <div className="bg-slate-50 p-8 rounded-xl border border-slate-100 flex flex-col items-center">
                                <div className="flex flex-wrap justify-center items-baseline gap-y-10 mb-6 px-4">
                                    {item.parts.map((p, i) => (
                                        p.tense ? (
                                            <TenseLabel key={i} text={p.text} tense={p.tense} color={p.color} />
                                        ) : (
                                            <span key={i} className="text-xl font-bold text-slate-900 mx-1">{p.text}</span>
                                        )
                                    ))}
                                </div>
                                <p className="text-sm text-slate-500 font-medium mt-4 text-center">{item.ko}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          </section>

          {/* 4. 요약표 */}
          <section id="sec-4" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600">4.</span> 시제 조합 요약표
            </h2>
            <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm">
                        <tr>
                            <th className="px-6 py-4 w-1/4 whitespace-nowrap">유형</th>
                            <th className="px-6 py-4 w-1/3 text-blue-700 whitespace-nowrap">Si 조건절</th>
                            <th className="px-6 py-4 w-1/3 text-emerald-700 whitespace-nowrap">귀결절 (주절)</th>
                            <th className="px-6 py-4 whitespace-nowrap text-center">용도</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {SUMMARY_TABLE.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-5 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100 whitespace-nowrap">{row.type}</td>
                                <td className="px-6 py-5 text-slate-700 font-bold whitespace-nowrap">{row.if}</td>
                                <td className="px-6 py-5 text-slate-700 font-bold whitespace-nowrap">{row.result}</td>
                                <td className="px-6 py-5 text-center text-[13px] text-slate-500 font-bold whitespace-nowrap italic">{row.use}</td>
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
                            <p className="font-bold text-slate-900 text-base leading-snug whitespace-pre-wrap">{q.q}</p>
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
            <h4 className="text-[10px] font-bold text-slate-400 tracking-widest mb-4">On this page</h4>
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