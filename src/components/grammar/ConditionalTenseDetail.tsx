'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, ArrowRight, Info, AlertTriangle, Sparkles, HelpCircle, Lightbulb
} from 'lucide-react';

const CONDITIONAL_TABLE = [
    { p: 'yo', ar: 'ía', er: 'ía', ir: 'ía' },
    { p: 'tú', ar: 'ías', er: 'ías', ir: 'ías' },
    { p: 'él/ella/ud.', ar: 'ía', er: 'ía', ir: 'ía' },
    { p: 'nosotros/as', ar: 'íamos', er: 'íamos', ir: 'íamos' },
    { p: 'vosotros/as', ar: 'íais', er: 'íais', ir: 'íais' },
    { p: 'ellos/as/uds.', ar: 'ían', er: 'ían', ir: 'ían' }
];

const IRREGULAR_STEMS = [
    { inf: 'tener', stem: 'tendr-', cond: 'tendría' },
    { inf: 'salir', stem: 'saldr-', cond: 'saldría' },
    { inf: 'poder', stem: 'podr-', cond: 'podría' },
    { inf: 'querer', stem: 'querr-', cond: 'querría' },
    { inf: 'hacer', stem: 'har-', cond: 'haría' },
    { inf: 'decir', stem: 'dir-', cond: 'diría' }
];

const QUIZ_DATA = [
    { id: 1, q: "가정 상황: '돈이 있다면 차를 살 텐데' (si tuviera dinero, ...)", options: ['compraré', 'compraría', 'voy a comprar'], answer: 1, explain: "가정 상황이나 '~할 텐데'를 의미할 때는 조건형(condicional)인 compraría를 씁니다." },
    { id: 2, q: "정중한 요청: '창문 좀 열어 주실 수 있나요?' (¿... abrir la ventana?)", options: ['podría', 'podré', 'va a'], answer: 0, explain: "poder 동사의 조건형(podría)은 정중하게 부탁할 때 가장 많이 쓰입니다." },
    { id: 3, q: "tener(가지다)의 조건형 1인칭 단수 형태는? (불규칙)", options: ['tenería', 'tendría', 'tenga'], answer: 1, explain: "tener의 미래/조건형 어간은 'tendr-'입니다. 따라서 tendría가 됩니다." },
    { id: 4, q: "조언하기: '너는 더 공부하는 게 좋겠어' (tú ... estudiar más)", options: ['deberás', 'debes', 'deberías'], answer: 2, explain: "상대방에게 부드럽게 조언할 때는 조건형(deberías)을 사용합니다." }
];

export default function ConditionalTenseDetail() {
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
          <header className="mb-8 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 tracking-widest mb-2">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 27</span>
                <ChevronRight size={10} />
                <span>Intermediate Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              조건법 (condicional)
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               '~할 텐데', '~라면 좋겠다'와 같은 <strong>가정</strong>이나, '혹시 ~해 주실 수 있나요?' 같은 <strong>정중한 요청</strong>을 나타냅니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium text-slate-700">
                  <li><strong>형태</strong>: 원형 + 어미(-ía, -ías, -ía...). (모든 인칭 공통 어미)</li>
                  <li><strong>용법</strong>: 가정(si 가정문), 정중한 요청(podría...), 과거에서의 미래.</li>
                  <li><strong>불규칙</strong>: 미래형과 동일한 불규칙 어간을 사용합니다.</li>
              </ul>
          </div>

          {/* 1. 조건형 형태 */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-indigo-600">1.</span> 조건형 형태 (formas)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">
                모든 동사 그룹(-ar, -er, -ir)이 <span className="text-indigo-600 font-bold">동일한 어미(-ía 계열)</span>를 가집니다.
            </p>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse min-w-[640px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs">
                        <tr>
                            <th className="px-5 py-3 text-left pl-8 w-1/4 whitespace-nowrap">주어</th>
                            <th className="px-5 py-3 w-1/4 whitespace-nowrap">hablar (말할 텐데)</th>
                            <th className="px-5 py-3 w-1/4 whitespace-nowrap">comer (먹을 텐데)</th>
                            <th className="px-5 py-3 w-1/4 whitespace-nowrap">vivir (살 텐데)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {CONDITIONAL_TABLE.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 text-left pl-8 font-bold text-slate-400 text-xs whitespace-nowrap">{row.p}</td>
                                <td className="px-5 py-4 font-bold text-slate-900 whitespace-nowrap">hablar<span className="text-indigo-600">{row.ar}</span></td>
                                <td className="px-5 py-4 font-bold text-slate-900 whitespace-nowrap">comer<span className="text-indigo-600">{row.er}</span></td>
                                <td className="px-5 py-4 font-bold text-slate-900 whitespace-nowrap">vivir<span className="text-indigo-600">{row.ir}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 2. 불규칙 어간 */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-cyan-600">2.</span> 불규칙 어간 (irregular stems)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">미래형과 완전히 동일한 불규칙 어간을 사용합니다.</p>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-left border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs">
                        <tr>
                            <th className="px-5 py-3 w-1/3 text-center whitespace-nowrap">원형</th>
                            <th className="px-5 py-3 text-center bg-cyan-50 text-cyan-700 whitespace-nowrap">불규칙 어간</th>
                            <th className="px-5 py-3 text-center whitespace-nowrap">조건형 (yo)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {IRREGULAR_STEMS.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                <td className="px-5 py-4 font-bold text-slate-500 bg-slate-50/30 border-r border-slate-100 text-center whitespace-nowrap">{row.inf}</td>
                                <td className="px-5 py-4 font-black text-cyan-700 italic tracking-tight text-center bg-cyan-50/10 whitespace-nowrap">{row.stem}</td>
                                <td className="px-5 py-4 font-bold text-slate-900 text-center whitespace-nowrap">
                                    {row.stem.slice(0, -1)}<span className="text-indigo-600">ía</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 3. 다양한 활용 (usos) */}
          <section id="sec-3" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 다양한 활용 (usos)
            </h2>
            
            <div className="grid grid-cols-1 gap-5">
                {/* 카드 1: 정중한 요청 */}
                <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:border-emerald-300 transition-all group">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                            <Sparkles size={24} />
                        </div>
                        <div>
                            <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-2 py-0.5 rounded mb-1 block w-fit">cortesía</span>
                            <h4 className="text-lg font-bold text-slate-900">정중한 요청 및 제안</h4>
                        </div>
                    </div>
                    <p className="text-[15px] text-slate-600 mb-4 leading-relaxed font-medium">
                        질문이나 부탁을 할 때 직설법보다 훨씬 부드럽고 예의 바른 느낌을 줍니다.
                    </p>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <p className="text-[15px] font-bold text-slate-900 italic">¿<span className="text-emerald-600">Podrías</span> ayudarme?</p>
                        <p className="text-xs text-slate-500 font-medium">저를 좀 도와주실 수 있나요?</p>
                    </div>
                </div>

                {/* 카드 2: 가상의 상황 */}
                <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:border-purple-300 transition-all group">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                            <Lightbulb size={24} />
                        </div>
                        <div>
                            <span className="bg-purple-100 text-purple-700 text-[10px] font-black px-2 py-0.5 rounded mb-1 block w-fit">hipótesis</span>
                            <h4 className="text-lg font-bold text-slate-900">가상의 상황 (~할 텐데)</h4>
                        </div>
                    </div>
                    <p className="text-[15px] text-slate-600 mb-4 leading-relaxed font-medium">
                        현실과 반대되는 상황을 가정하거나 상상할 때 사용합니다. (주로 Si 절과 함께 쓰임)
                    </p>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <p className="text-[15px] font-bold text-slate-900 italic">Yo no lo <span className="text-purple-600">comería</span>.</p>
                        <p className="text-xs text-slate-500 font-medium">(나라면) 그거 안 먹을 텐데.</p>
                    </div>
                </div>

                {/* 카드 3: 조언과 충고 */}
                <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:border-amber-300 transition-all group">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                            <Info size={24} />
                        </div>
                        <div>
                            <span className="bg-amber-100 text-amber-700 text-[10px] font-black px-2 py-0.5 rounded mb-1 block w-fit">consejo</span>
                            <h4 className="text-lg font-bold text-slate-900">조언과 충고</h4>
                        </div>
                    </div>
                    <p className="text-[15px] text-slate-600 mb-4 leading-relaxed font-medium">
                        상대방에게 부드럽게 조언할 때 씁니다. "너 ~하는 게 좋겠어."
                    </p>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <p className="text-[15px] font-bold text-slate-900 italic"><span className="text-amber-600">Deberías</span> estudiar más.</p>
                        <p className="text-xs text-slate-500 font-medium">너 공부를 더 하는 게 좋겠어.</p>
                    </div>
                </div>

                {/* 카드 4: 과거의 미래 */}
                <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:border-blue-300 transition-all group">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <ArrowRight size={24} />
                        </div>
                        <div>
                            <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-2 py-0.5 rounded mb-1 block w-fit">futuro pasado</span>
                            <h4 className="text-lg font-bold text-slate-900">과거 시점에서의 미래</h4>
                        </div>
                    </div>
                    <p className="text-[15px] text-slate-600 mb-4 leading-relaxed font-medium">
                        과거에 "미래에 ~할 것이다"라고 말했거나 생각했던 것을 전달할 때 씁니다. (간접화법)
                    </p>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <p className="text-[15px] font-bold text-slate-900 italic">Dijo que <span className="text-blue-600">vendría</span>.</p>
                        <p className="text-xs text-slate-500 font-medium">그는 올 거라고 말했었다.</p>
                    </div>
                </div>
            </div>
          </section>

          {/* 연습 문제 */}
          <section id="sec-4" className="scroll-mt-24 pt-8 border-t border-slate-200">
             <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Lightbulb className="text-yellow-500 fill-yellow-500" size={20} />
                기초 다지기 (práctica)
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
                {['조건형 형태', '불규칙 어간', '다양한 활용', '연습 문제'].map((item, i) => (
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