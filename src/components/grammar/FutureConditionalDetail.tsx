'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, ArrowRight, Info, AlertTriangle, Sparkles, HelpCircle, Lightbulb
} from 'lucide-react';

const IR_A_TABLE = [
    { p: 'yo', ir: 'voy', a: 'a', inf: 'comer' },
    { p: 'tú', ir: 'vas', a: 'a', inf: 'comer' },
    { p: 'él/ella/ud.', ir: 'va', a: 'a', inf: 'comer' },
    { p: 'nosotros/as', ir: 'vamos', a: 'a', inf: 'comer' },
    { p: 'vosotros/as', ir: 'vais', a: 'a', inf: 'comer' },
    { p: 'ellos/as/uds.', ir: 'van', a: 'a', inf: 'comer' }
];

const FUTURE_TABLE = [
    { p: 'yo', ar: 'é', er: 'é', ir: 'é' },
    { p: 'tú', ar: 'ás', er: 'ás', ir: 'ás' },
    { p: 'él/ella/ud.', ar: 'á', er: 'á', ir: 'á' },
    { p: 'nosotros/as', ar: 'emos', er: 'emos', ir: 'emos' },
    { p: 'vosotros/as', ar: 'éis', er: 'éis', ir: 'éis' },
    { p: 'ellos/as/uds.', ar: 'án', er: 'án', ir: 'án' }
];

const CONDITIONAL_TABLE = [
    { p: 'yo', ar: 'ía', er: 'ía', ir: 'ía' },
    { p: 'tú', ar: 'ías', er: 'ías', ir: 'ías' },
    { p: 'él/ella/ud.', ar: 'ía', er: 'ía', ir: 'ía' },
    { p: 'nosotros/as', ar: 'íamos', er: 'íamos', ir: 'íamos' },
    { p: 'vosotros/as', ar: 'íais', er: 'íais', ir: 'íais' },
    { p: 'ellos/as/uds.', ar: 'ían', er: 'ían', ir: 'ían' }
];

const IRREGULAR_STEMS = [
    { inf: 'tener', stem: 'tendr-', fut: 'tendré', cond: 'tendría' },
    { inf: 'salir', stem: 'saldr-', fut: 'saldré', cond: 'saldría' },
    { inf: 'poder', stem: 'podr-', fut: 'podré', cond: 'podría' },
    { inf: 'querer', stem: 'querr-', fut: 'querré', cond: 'querría' },
    { inf: 'hacer', stem: 'har-', fut: 'haré', cond: 'haría' },
    { inf: 'decir', stem: 'dir-', fut: 'diré', cond: 'diría' }
];

const QUIZ_DATA = [
    { id: 1, q: "가정 상황: '돈이 있다면 차를 살 텐데' (si tuviera dinero, ...)", options: ['compraré', 'compraría', 'voy a comprar'], answer: 1, explain: "가정 상황이나 '~할 텐데'를 의미할 때는 조건형(condicional)인 compraría를 씁니다." },
    { id: 2, q: "정중한 요청: '창문 좀 열어 주실 수 있나요?' (¿... abrir la ventana?)", options: ['podría', 'podré', 'va a'], answer: 0, explain: "poder 동사의 조건형(podría)은 정중하게 부탁할 때 가장 많이 쓰입니다." },
    { id: 3, q: "현재에 대한 추측: '지금 한 4시쯤 됐을 거야' (... las 네 시)", options: ['son', 'serán', 'serían'], answer: 1, explain: "현재 사실에 대한 불확실한 추측이나 짐작을 할 때는 미래 시제(serán)를 사용합니다." },
    { id: 4, q: "hacer(하다)의 미래 시제 1인칭 단수 형태는? (불규칙)", options: ['haceré', 'haré', 'haga'], answer: 1, explain: "hacer의 미래/조건형 어간은 'har-'입니다. 따라서 haré가 됩니다." }
];

export default function FutureConditionalDetail() {
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
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 23</span>
                <ChevronRight size={10} />
                <span>Intermediate Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              미래와 조건형
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               앞으로 일어날 일(미래)과 가상의 상황(조건)을 표현하는 법을 배웁니다. <br/>
               동사 원형에 어미를 바로 붙이는 독특한 구조를 가지고 있습니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium text-slate-700">
                  <li><strong>근접 미래</strong>: ir a + 원형. 이미 정해진 가까운 계획.</li>
                  <li><strong>단순 미래</strong>: 원형 + 어미(-é, -ás...). 미래의 의지나 현재에 대한 추측.</li>
                  <li><strong>조건형</strong>: 원형 + 어미(-ía, -ías...). 가정 상황이나 정중한 요청.</li>
              </ul>
          </div>

          {/* 1. 근접 미래 */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-cyan-600">1.</span> 근접 미래 (ir a + infinitivo)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">가장 일상적으로 쓰이는 미래형으로, 이미 결정된 구체적인 계획을 나타냅니다.</p>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse min-w-[500px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 text-left pl-8 whitespace-nowrap">주어</th>
                            <th className="px-5 py-3 bg-cyan-50 text-cyan-700 whitespace-nowrap">ir 변화</th>
                            <th className="px-5 py-3 whitespace-nowrap">전치사</th>
                            <th className="px-5 py-3 whitespace-nowrap">원형 (예시)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {IR_A_TABLE.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 text-left pl-8 font-bold text-slate-400 text-xs whitespace-nowrap">{row.p}</td>
                                <td className="px-5 py-4 font-bold text-cyan-700 bg-cyan-50/10 whitespace-nowrap">{row.ir}</td>
                                <td className="px-5 py-4 text-slate-400 font-bold whitespace-nowrap">{row.a}</td>
                                <td className="px-5 py-4 text-slate-900 italic font-medium whitespace-nowrap">{row.inf}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 2. 직설법 미래 */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 직설법 미래 (futuro simple)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">
                '~할 것이다' 또는 '지금 ~일 것이다(추측)'를 의미합니다. <br/>
                모든 동사 그룹(-ar, -er, -ir)이 <span className="text-blue-600 font-bold">동일한 어미</span>를 가집니다.
            </p>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse min-w-[640px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 text-left pl-8 w-1/4 whitespace-nowrap">주어</th>
                            <th className="px-5 py-3 w-1/4 whitespace-nowrap">hablar (말할 것이다)</th>
                            <th className="px-5 py-3 w-1/4 whitespace-nowrap">comer (먹을 것이다)</th>
                            <th className="px-5 py-3 w-1/4 whitespace-nowrap">vivir (살 것이다)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {FUTURE_TABLE.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 text-left pl-8 font-bold text-slate-400 text-xs whitespace-nowrap">{row.p}</td>
                                <td className="px-5 py-4 font-bold text-slate-900 whitespace-nowrap">hablar<span className="text-blue-600">{row.ar}</span></td>
                                <td className="px-5 py-4 font-bold text-slate-900 whitespace-nowrap">comer<span className="text-blue-600">{row.er}</span></td>
                                <td className="px-5 py-4 font-bold text-slate-900 whitespace-nowrap">vivir<span className="text-blue-600">{row.ir}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 3. 조건형 */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-indigo-600">3.</span> 조건형 (condicional simple)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">
                '~할 텐데(가정)', '~해 주시겠어요?(정중)', '과거엔 ~였을 것이다(추측)'를 의미합니다. <br/>
                마찬가지로 모든 그룹이 <span className="text-indigo-600 font-bold">동일한 어미</span>를 가집니다.
            </p>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse min-w-[640px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
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

          {/* 4. 공통 불규칙 어간 */}
          <section id="sec-4" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-cyan-600">4.</span> 공통 불규칙 어간 (irregular stems)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">미래와 조건형은 원형 대신 이 불규칙 어간을 사용하며, 어미는 규칙형과 같습니다.</p>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-left border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs">
                        <tr>
                            <th className="px-5 py-3 w-1/4 text-center whitespace-nowrap">원형</th>
                            <th className="px-5 py-3 text-center bg-cyan-50 text-cyan-700 whitespace-nowrap">불규칙 어간</th>
                            <th className="px-5 py-3 text-center whitespace-nowrap">미래 (yo)</th>
                            <th className="px-5 py-3 text-center whitespace-nowrap">조건형 (yo)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {IRREGULAR_STEMS.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                <td className="px-5 py-4 font-bold text-slate-500 bg-slate-50/30 border-r border-slate-100 text-center whitespace-nowrap">{row.inf}</td>
                                <td className="px-5 py-4 font-black text-cyan-700 italic tracking-tight text-center bg-cyan-50/10 whitespace-nowrap">{row.stem}</td>
                                <td className="px-5 py-4 font-bold text-slate-900 text-center whitespace-nowrap">
                                    {row.stem.slice(0, -1)}<span className="text-blue-600">é</span>
                                </td>
                                <td className="px-5 py-4 font-bold text-slate-900 text-center whitespace-nowrap">
                                    {row.stem.slice(0, -1)}<span className="text-indigo-600">ía</span>
                                </td>
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
                {['근접 미래', '직설법 미래', '조건형', '불규칙 어간', '연습 문제'].map((item, i) => (
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