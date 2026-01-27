'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, CornerDownRight, ArrowRight, Info, AlertTriangle, Layers, RotateCw, Lightbulb
} from 'lucide-react';

const GERUND_USAGE = [
    { cat: '동시 상황', desc: '~하면서 (부대 상황)', ex: 'estudia escuchando música.', ko: '음악을 들으면서 공부한다.' },
    { cat: '방식/수단', desc: '~함으로써 (방법)', ex: 'se gana la vida vendiendo coches.', ko: '차를 팔아서 생계를 유지한다.' },
    { cat: '이유/원인', desc: '~하므로, ~해서 (근거)', ex: 'sabiendo que él no venía, me fui.', ko: '그가 오지 않는 걸 알아서 가버렸다.' }
];

const PERIFRASIS_GERUND = [
    { phrase: 'estar + gerundio', mean: '~하고 있는 중이다', ex: 'estoy comiendo.' },
    { phrase: 'seguir + gerundio', mean: '계속해서 ~하다', ex: 'sigue trabajando.' },
    { phrase: 'ir + gerundio', mean: '서서히 ~해 가다', ex: 'voy aprendiendo.' },
    { phrase: 'venir + gerundio', mean: '(과거부터) ~해 오다', ex: 'vengo diciendo.' }
];

const PERIFRASIS_PARTICIPLE = [
    { phrase: 'llevar + participio', mean: '~한 상태이다 (진척)', ex: 'llevo escritas diez páginas.' },
    { phrase: 'tener + participio', mean: '~해 두다 (완료)', ex: 'tengo hecha la tarea.' },
    { phrase: 'dar por + participio', mean: '~로 간주하다', ex: 'doy por terminado el trabajo.' }
];

const QUIZ_DATA = [
    { id: 1, q: "동사구 완성 (성·수 일치): ella lleva ( ) (leer) 다섯 권의 libros.", options: ['leído', 'leída', 'leídos'], answer: 2, explain: "llevar + p.p. 구문에서 과거분사는 목적어(libros - 남성 복수)에 일치시켜야 하므로 leídos가 정답입니다." },
    { id: 2, q: "절대 구문: '수업이 끝난 후'의 올바른 표현은?", options: ['terminando la clase', 'terminada la clase'], answer: 1, explain: "과거분사 절대 구문은 [과거분사 + 명사] 구조로 '~가 완료된 후'를 나타냅니다." },
    { id: 3, q: "동명사(gerundio) 사용의 오류: '넘어져서 바닥을 더럽혔다.'", options: ['cayó manchando el suelo (x)', 'cayó y manchó el suelo (o)'], answer: 0, explain: "동명사는 주동사보다 나중에 일어나는 결과적 동작에는 쓸 수 없습니다." },
    { id: 4, q: "지속의 동사구: '계속 공부하다'를 작문하면?", options: ['seguir estudiando', 'ir estudiando', 'venir estudiando'], answer: 0, explain: "어떤 동작을 멈추지 않고 계속하는 것은 seguir + gerundio 구문을 씁니다." }
];

export default function AdvancedParticiplesDetail() {
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
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 35</span>
                <ChevronRight size={10} />
                <span>Advanced Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              분사와 동명사의 심화 용법
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               동사구(Perífrasis)와 독립 분사 구문을 통해 동작의 양태를 세밀하게 묘사하고 <br/>
               문장을 경제적으로 압축하는 법을 배웁니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium">
                  <li><strong>동명사</strong>: 부사적 역할(~하면서, ~해서). 주동사 이후의 결과 용법은 금지.</li>
                  <li><strong>절대 구문</strong>: [과거분사 + 명사] 구조로 독립적인 시간/원인 절 형성.</li>
                  <li><strong>동사구 일치</strong>: 과거분사 기반 동사구는 <strong>목적어의 성·수에 일치</strong>시킵니다.</li>
              </ul>
          </div>

          {/* 1. 동명사 */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 동명사의 심화 용법 (El Gerundio)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">동작의 방식이나 동시성을 나타내는 부사적 역할을 수행합니다.</p>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm mb-6">
                <table className="w-full text-[15px] text-left border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 w-24 whitespace-nowrap">용법</th>
                            <th className="px-5 py-3 w-1/3 whitespace-nowrap">설명</th>
                            <th className="px-5 py-3 text-right pr-8 whitespace-nowrap">예시</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {GERUND_USAGE.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                <td className="px-5 py-4 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100 whitespace-nowrap">{row.cat}</td>
                                <td className="px-5 py-4 text-slate-600 text-[13px] whitespace-nowrap">{row.desc}</td>
                                <td className="px-5 py-4 text-right pr-8 whitespace-nowrap">
                                    <div className="flex flex-col items-end">
                                        <span className="text-slate-900 font-bold">{row.ex}</span>
                                        <span className="text-xs text-slate-400 mt-0.5">{row.ko}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="p-5 bg-red-50/50 border border-red-100 rounded-xl shadow-sm text-slate-700">
                <div className="flex items-center gap-2 mb-2 text-red-900">
                    <AlertTriangle size={18} className="text-red-500" />
                    <h4 className="font-bold text-sm uppercase">주의: 결과 용법 금지</h4>
                </div>
                <p className="text-[14px] text-red-800 leading-relaxed mb-3">
                    동명사는 주동사보다 <strong>나중에 일어나는 일</strong>에는 쓸 수 없습니다.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium">
                    <p className="bg-white/60 p-2 rounded line-through text-slate-400">llegando tarde (x)</p>
                    <p className="bg-white/60 p-2 rounded text-slate-900">y llegó tarde (o)</p>
                </div>
            </div>
          </section>

          {/* 2. 과거분사 절대 구문 */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 과거분사의 절대 구문 (Participio Absoluto)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">동작이 완료된 상황을 배경으로 제시할 때 사용합니다.</p>
            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm space-y-4">
                <div className="bg-slate-50 p-4 rounded-lg text-center font-bold text-slate-900 border border-slate-100">
                    과거분사 + 명사(의미상 주어)
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1">
                        <span className="text-slate-900 font-bold text-[15px]">terminada la clase...</span>
                        <span className="text-xs text-slate-400">수업이 끝난 후 (수업이 완료됨)</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-slate-900 font-bold text-[15px]">dichas estas palabras...</span>
                        <span className="text-xs text-slate-400">이 말들을 한 뒤에 (말함이 완료됨)</span>
                    </div>
                </div>
            </div>
          </section>

          {/* 3. 동사구 */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 분사를 활용한 주요 동사구
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">단순 시제보다 훨씬 풍부한 '양태'를 전달하는 표현들입니다.</p>
            
            <div className="space-y-8">
                <div>
                    <h3 className="text-[13px] font-black text-slate-400 mb-3 uppercase tracking-widest pl-2 border-l-2 border-slate-200 flex items-center gap-2">
                        <RotateCw size={14}/> 동명사 기반 (진행/지속)
                    </h3>
                    <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                        <table className="w-full text-[15px] text-left border-collapse min-w-[600px]">
                            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                                <tr>
                                    <th className="px-5 py-3 w-1/3 whitespace-nowrap">동사구</th>
                                    <th className="px-5 py-3 w-1/4 whitespace-nowrap">의미</th>
                                    <th className="px-5 py-3 text-right pr-8 whitespace-nowrap">예시</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                                {PERIFRASIS_GERUND.map((row, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50">
                                        <td className="px-5 py-4 font-bold text-slate-900 whitespace-nowrap">{row.phrase}</td>
                                        <td className="px-5 py-4 text-slate-700 whitespace-nowrap font-medium">{row.mean}</td>
                                        <td className="px-5 py-4 text-right pr-8 text-slate-900 font-bold whitespace-nowrap">{row.ex}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div>
                    <h3 className="text-[13px] font-black text-slate-400 mb-3 uppercase tracking-widest pl-2 border-l-2 border-slate-200 flex items-center gap-2">
                        <Layers size={14}/> 과거분사 기반 (결과/완료)
                    </h3>
                    <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm mb-4">
                        <table className="w-full text-[15px] text-left border-collapse min-w-[600px]">
                            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                                <tr>
                                    <th className="px-5 py-3 w-1/3 whitespace-nowrap">동사구</th>
                                    <th className="px-5 py-3 w-1/4 whitespace-nowrap">의미</th>
                                    <th className="px-5 py-3 text-right pr-8 whitespace-nowrap">예시</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                                {PERIFRASIS_PARTICIPLE.map((row, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50">
                                        <td className="px-5 py-4 font-bold text-slate-900 whitespace-nowrap">{row.phrase}</td>
                                        <td className="px-5 py-4 text-slate-700 whitespace-nowrap font-medium">{row.mean}</td>
                                        <td className="px-5 py-4 text-right pr-8 text-slate-900 font-bold whitespace-nowrap">{row.ex}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex gap-3 text-sm items-start">
                        <Info size={18} className="text-blue-400 shrink-0 mt-0.5" />
                        <p className="text-blue-900 font-medium leading-relaxed">
                            <strong>중요:</strong> 과거분사 기반 동사구에서는 분사가 <strong>목적어의 성·수와 일치</strong>해야 합니다. <br/>
                            <span className="text-slate-900 text-xs font-bold mt-1 inline-block">llevo escritas diez páginas.</span>
                        </p>
                    </div>
                </div>
            </div>
          </section>

          {/* 연습 문제 */}
          <section id="sec-4" className="scroll-mt-24 pt-8 border-t border-slate-200">
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
                {['동명사의 용법', '과거분사 절대 구문', '동명사 동사구', '과거분사 동사구', '연습 문제'].map((item, i) => (
                    <li key={i}>
                        <button onClick={() => scrollTo(`sec-${i+1}`)} className="text-slate-500 hover:text-blue-600 transition-colors text-left flex items-center gap-2 group font-medium">
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