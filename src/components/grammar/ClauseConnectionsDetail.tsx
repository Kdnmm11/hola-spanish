'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, CornerDownRight, ArrowRight, Info, AlertTriangle, Link, Clock, Lock, Lightbulb
} from 'lucide-react';

const RELATIVE_PRONOUNS = [
    { type: 'que', usage: '가장 일반적 (사람/사물 공통)', ex: 'el libro que leo es bueno. (내가 읽는 책은 좋다)' },
    { type: 'quien(es)', usage: '사람만 선행사로 받음', ex: 'los amigos quienes viven en seúl. (서울에 사는 친구들)' },
    { type: 'el que / la que', usage: '전치사와 함께 사용됨', ex: 'la casa en la que vivo. (내가 사는 집)' },
    { type: 'cuyo/a', usage: '소유(~의)를 나타냄', ex: 'el autor cuyo libro es famoso. (책이 유명한 작가)' }
];

const ADJECTIVE_CLAUSE_MODE = [
    { mode: '직설법 (실재/특정)', target: '이미 존재하거나 알고 있는 대상', ex: 'busco el libro que tiene fotos. (사진이 있는 [그] 책을 찾는다)' },
    { mode: '접속법 (비실재/불특정)', target: '존재 여부를 모르거나 찾는 대상', ex: 'busco un libro que tenga fotos. (사진이 있는 [아무] 책이나 찾는다)' }
];

const ESCAPA_CONJUNCTIONS = [
    { con: 'para que', mean: '~하기 위해' },
    { con: 'antes de que', mean: '~하기 전에' },
    { con: 'sin que', mean: '~하지 않고' },
    { con: 'a menos que', mean: '~하지 않는 한' },
    { con: 'con tal de que', mean: '~라는 조건으로' }
];

const QUIZ_DATA = [
    { id: 1, q: "알맞은 관계대명사를 넣으세요: el niño ( ) madre es profesora.", options: ['que', 'quien', 'cuyo'], answer: 2, explain: "뒤에 오는 명사(madre)와의 소유 관계를 나타낼 때는 cuyo를 씁니다." },
    { id: 2, q: "문맥에 맞는 동사 형태는? necesito un secretario que ( ) inglés. (hablar)", options: ['habla', 'hable'], answer: 1, explain: "아직 찾지 못한 불특정한 대상을 수식하므로 접속법(hable)을 사용합니다." },
    { id: 3, q: "목적의 접속사 뒤의 형태는? te doy el regalo para que ( ) feliz. (estar)", options: ['estás', 'estés'], answer: 1, explain: "para que(~하기 위해)는 항상 접속법을 동반하는 접속사입니다." },
    { id: 4, q: "'cuando vengas'와 'cuando vienes'의 차이는?", options: ['미래의 일 vs 습관/사실', '습관/사실 vs 미래의 일'], answer: 0, explain: "접속법(vengas)은 아직 일어나지 않은 미래를, 직설법(vienes)은 반복되는 습관이나 사실을 의미합니다." }
];

export default function ClauseConnectionsDetail() {
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
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 26</span>
                <ChevronRight size={10} />
                <span>Intermediate Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              절의 연결과 관계사
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               단순한 문장들을 연결하여 복합적인 의미를 전달하는 법을 배웁니다. <br/>
               관계대명사와 접속사를 통해 명사, 형용사, 부사 역할을 하는 절을 만드는 것이 핵심입니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium">
                  <li><strong>관계대명사</strong>: 선행사를 받아 뒤의 문장과 연결 (que, quien, cuyo).</li>
                  <li><strong>명사절</strong>: 접속사 que를 사용하며 주절의 성격에 따라 직설/접속법 결정.</li>
                  <li><strong>형용사절</strong>: 선행사가 특정되면 직설법, 불특정/비실재하면 접속법.</li>
                  <li><strong>부사절</strong>: ESCAPA 접속사는 항상 접속법, 시간 접속사는 시점에 따라 결정.</li>
              </ul>
          </div>

          {/* 1. 관계대명사 */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-teal-600">1.</span> 관계대명사 (Pronombres Relativos)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">선행사를 받아 절을 연결하며, 격과 성·수에 따라 형태가 결정됩니다.</p>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[14px] text-left border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs">
                        <tr>
                            <th className="px-5 py-3 w-1/4 whitespace-nowrap">종류</th>
                            <th className="px-5 py-3 w-[35%] whitespace-nowrap">용법</th>
                            <th className="px-5 py-3 text-right pr-8 whitespace-nowrap">예시 및 번역</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {RELATIVE_PRONOUNS.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 font-bold text-teal-700 bg-teal-50/30 border-r border-slate-100 whitespace-nowrap">{row.type}</td>
                                <td className="px-5 py-4 text-slate-700 font-medium whitespace-nowrap">{row.usage}</td>
                                <td className="px-5 py-4 text-right pr-8 whitespace-nowrap">
                                    <div className="flex flex-col items-end">
                                        <span className="text-slate-900 font-bold">{row.ex.split('(')[0]}</span>
                                        <span className="text-xs text-slate-400 mt-0.5">{row.ex.split('(')[1]?.replace(')', '')}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 2. 명사절 */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-teal-600">2.</span> 명사절과 접속사 (Noun Clauses)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">절 전체가 명사처럼 주어나 목적어 역할을 하며, 주로 접속사 que를 사용합니다.</p>
            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-4">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400">구조</span>
                        <span className="text-[15px] font-bold text-slate-900 bg-slate-50 px-2 py-1 rounded">주절 동사 + que + 종속절</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                        <div className="bg-blue-50 p-3 rounded-lg flex flex-col gap-1 border border-blue-100">
                            <span className="text-blue-900 font-bold text-sm">creo que él tiene razón.</span>
                            <span className="text-xs text-blue-600">옳다고 믿는다 (직설법)</span>
                        </div>
                        <div className="bg-teal-50 p-3 rounded-lg flex flex-col gap-1 border border-teal-100">
                            <span className="text-teal-900 font-bold text-sm">quiero que tú vengas.</span>
                            <span className="text-xs text-teal-600">오기를 원한다 (접속법)</span>
                        </div>
                    </div>
                </div>
            </div>
          </section>

          {/* 3. 형용사절 */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-teal-600">3.</span> 형용사절과 법의 선택
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">선행사를 수식할 때, 그 대상이 실재하는지에 따라 법이 달라집니다.</p>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[14px] text-left border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs">
                        <tr>
                            <th className="px-4 py-3 w-1/4 whitespace-nowrap">구분</th>
                            <th className="px-4 py-3 w-[38%] whitespace-nowrap">선행사 성격</th>
                            <th className="px-4 py-3 text-right pr-6 whitespace-nowrap">예시 및 번역</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {ADJECTIVE_CLAUSE_MODE.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className={`px-4 py-4 font-bold bg-slate-50/30 border-r border-slate-100 whitespace-nowrap
                                    ${row.mode.includes('직설법') ? 'text-blue-700' : 'text-teal-700'}`}>
                                    {row.mode}
                                </td>
                                <td className="px-4 py-4 text-slate-700 font-medium whitespace-nowrap">{row.target}</td>
                                <td className="px-4 py-4 text-right pr-6 whitespace-nowrap">
                                    <div className="flex flex-col items-end">
                                        <span className="text-slate-900 font-bold">{row.ex.split('(')[0]}</span>
                                        <span className="text-xs text-slate-400 mt-0.5">{row.ex.split('(')[1]?.replace(')', '')}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 4. 부사절 */}
          <section id="sec-4" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-teal-600">4.</span> 부사절과 접속사
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">조건, 시간, 목적을 나타내며 특정 접속사는 항상 접속법을 동반합니다.</p>
            
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                    <Lock size={18} className="text-slate-400" />
                    <h3 className="font-bold text-sm text-slate-800 uppercase tracking-tight">항상 접속법 사용 (ESCAPA)</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {ESCAPA_CONJUNCTIONS.map((item, idx) => (
                        <div key={idx} className="bg-teal-50 border border-teal-100 p-3 rounded-lg text-center shadow-sm">
                            <span className="block text-teal-900 font-bold text-sm mb-1">{item.con}</span>
                            <span className="block text-teal-600 text-[10px] font-bold">{item.mean}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                    <Clock size={18} className="text-slate-400" />
                    <h3 className="font-bold text-sm text-slate-800 uppercase tracking-tight">상황에 따른 변화 (시간 접속사)</h3>
                </div>
                <div className="space-y-4">
                    <div className="flex flex-col gap-1 pl-4 border-l-2 border-teal-200">
                        <span className="text-xs font-bold text-teal-600 uppercase">미래 / 아직 안 일어남 → 접속법</span>
                        <p className="text-slate-900 font-bold">te llamo cuando llegue a casa.</p>
                        <p className="text-xs text-slate-400">집에 도착하면(미래) 전화할게.</p>
                    </div>
                    <div className="flex flex-col gap-1 pl-4 border-l-2 border-slate-200">
                        <span className="text-xs font-bold text-slate-500 uppercase">습관 / 과거 (팩트) → 직설법</span>
                        <p className="text-slate-900 font-bold">siempre llamo cuando llego.</p>
                        <p className="text-slate-400 text-xs">집에 도착할 때마다(습관) 전화한다.</p>
                    </div>
                </div>
                <p className="mt-4 text-[13px] text-slate-500 font-medium text-center">
                    관련 접속사: cuando, en cuanto, tan pronto como
                </p>
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
                {['관계대명사', '명사절 (que)', '형용사절 (선행사)', '부사절 (접속사)', '연습 문제'].map((item, i) => (
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