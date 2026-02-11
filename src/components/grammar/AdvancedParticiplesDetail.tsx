'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, ArrowRight, Info, AlertTriangle, Layers, RotateCw, Lightbulb
} from 'lucide-react';

const GERUND_USAGE = [
    { 
        type: '동시 상황', 
        desc: '주동사의 동작과 동시에 일어나는 부대 상황을 묘사합니다. "~하면서"라고 해석합니다.',
        ex: 'Estudia escuchando música.', 
        ko: '음악을 들으면서 공부한다.' 
    },
    { 
        type: '방식과 수단', 
        desc: '동작이 이루어지는 구체적인 방법이나 수단을 나타냅니다. "~함으로써"라고 해석합니다.',
        ex: 'Se gana la vida vendiendo coches.', 
        ko: '차를 팔아서(파는 방식으로) 생계를 유지한다.' 
    },
    { 
        type: '이유와 원인', 
        desc: '동작의 근거나 원인을 제시합니다. "~해서, ~하므로"라고 해석합니다.',
        ex: 'Sabiendo que él no venía, me fui.', 
        ko: '그가 오지 않는 것을 알아서(알았기에) 그냥 가버렸다.' 
    }
];

const PERIFRASIS_GERUND = [
    { phrase: 'estar + gerundio', mean: '~하고 있는 중이다', ex: 'Estoy comiendo.' },
    { phrase: 'seguir + gerundio', mean: '계속해서 ~하다', ex: 'Sigue trabajando.' },
    { phrase: 'ir + gerundio', mean: '서서히 ~해 가다', ex: 'Voy aprendiendo.' },
    { phrase: 'venir + gerundio', mean: '(과거부터) ~해 오다', ex: 'Vengo diciendo.' }
];

const PERIFRASIS_PARTICIPLE = [
    { phrase: 'llevar + participio', mean: '~한 상태이다 (진척)', ex: 'Llevo escritas diez páginas.' },
    { phrase: 'tener + participio', mean: '~해 두다 (완료)', ex: 'Tengo hecha la tarea.' },
    { phrase: 'dar por + participio', mean: '~로 간주하다', ex: 'Doy por terminado el trabajo.' }
];

const QUIZ_DATA = [
    { id: 1, q: "동사구 완성 (성·수 일치): Ella lleva (     ) (leer) 다섯 권의 libros.", options: ['leído', 'leída', 'leídos'], answer: 2, explain: "llevar + p.p. 구문에서 과거분사는 목적어(libros - 남성 복수)에 일치시켜야 하므로 leídos가 정답입니다." },
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
    <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto px-2 sm:px-3 lg:px-4 pt-1.5 pb-8 font-sans text-slate-800 bg-white">
      
      <article className="flex-1 min-w-0">
          <header className="mb-12 border-b border-slate-200 pb-8">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 tracking-widest mb-3">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 40</span>
                <ChevronRight size={10} />
                <span>Advanced Level</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
              분사와 동명사의 심화 용법
            </h1>
            <p className="text-[16px] text-slate-600 font-medium leading-relaxed max-w-3xl">
               동사구(Perífrasis)와 독립 분사 구문을 통해 동작의 양태를 세밀하게 묘사하고 <br/>
               문장을 경제적으로 압축하는 법을 배웁니다.
            </p>
          </header>

          <div className="mb-12 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium text-slate-700">
                  <li><strong>동명사</strong>: 부사적 역할(~하면서, ~해서). 주동사 이후의 결과 용법은 금지.</li>
                  <li><strong>절대 구문</strong>: [과거분사 + 명사] 구조로 독립적인 시간/원인 절 형성.</li>
                  <li><strong>동사구 일치</strong>: 과거분사 기반 동사구는 <strong>목적어의 성·수에 일치</strong>시킵니다.</li>
              </ul>
          </div>

          {/* 1. 동명사 */}
          <section id="sec-1" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 동명사의 심화 용법 (El Gerundio)
            </h2>
            <p className="text-[15px] text-slate-600 mb-8 font-medium">동작의 방식이나 동시성을 나타내는 부사적 역할을 수행합니다.</p>
            
            <div className="space-y-4 max-w-4xl mb-10">
                {GERUND_USAGE.map((item, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-300 transition-all overflow-hidden flex flex-col sm:flex-row">
                        <div className="sm:w-1/4 bg-slate-50 p-5 flex items-center justify-center border-b sm:border-b-0 sm:border-r border-slate-100 text-center">
                            <span className="text-[15px] font-bold text-slate-700 leading-tight">{item.type}</span>
                        </div>
                        <div className="flex-1 p-6">
                            <p className="text-sm text-slate-600 mb-4 leading-relaxed font-medium">
                                {item.desc}
                            </p>
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <p className="text-[17px] text-slate-900 font-bold mb-0.5 italic">"{item.ex}"</p>
                                <p className="text-sm text-slate-500 font-medium">{item.ko}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="p-6 bg-red-50/50 border border-red-100 rounded-2xl shadow-sm max-w-4xl">
                <div className="flex items-center gap-2 mb-3 text-red-900">
                    <AlertTriangle size={20} className="text-red-500" />
                    <h4 className="font-bold text-base">중요: 결과 용법 금지</h4>
                </div>
                <p className="text-[15px] text-red-800 leading-relaxed mb-6 font-medium">
                    동명사는 주동사와 **동시**에 일어나거나 **먼저** 일어나는 일에만 씁니다. <br/>
                    주동사 이후에 일어나는 결과적 동작에는 사용할 수 없습니다.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 py-2">
                    <div className="flex flex-col items-center">
                        <p className="text-[17px] text-slate-400 font-bold italic line-through decoration-red-400">
                            "...cayó manchando el suelo"
                        </p>
                        <span className="text-[10px] font-bold text-red-400 uppercase mt-2">잘못된 표현 (X)</span>
                    </div>
                    <div className="text-red-300 rotate-90 sm:rotate-0">
                        <ArrowRight size={24} />
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-[17px] text-slate-900 font-bold italic">
                            "...cayó y manchó el suelo"
                        </p>
                        <span className="text-[10px] font-bold text-emerald-500 uppercase mt-2">올바른 표현 (O)</span>
                    </div>
                </div>
            </div>
          </section>

          {/* 2. 과거분사 절대 구문 */}
          <section id="sec-2" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 과거분사의 절대 구문 (Participio Absoluto)
            </h2>
            <p className="text-[15px] text-slate-600 mb-6 font-medium">동작이 완료된 상황을 배경으로 제시할 때 사용합니다.</p>
            <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-md max-w-4xl">
                <div className="flex flex-col items-center gap-6">
                    <div className="text-xl font-bold text-slate-900 bg-slate-50 border border-slate-100 px-8 py-3 rounded-xl shadow-sm">
                        과거분사 + <span className="text-blue-600">명사</span>(의미상 주어)
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 flex flex-col items-center gap-1.5">
                            <span className="text-[17px] font-bold text-slate-900 italic">Terminada la clase...</span>
                            <span className="text-xs text-slate-500 font-medium">수업이 끝난 후 (수업이 완료됨)</span>
                        </div>
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 flex flex-col items-center gap-1.5">
                            <span className="text-[17px] font-bold text-slate-900 italic">Dichas estas palabras...</span>
                            <span className="text-xs text-slate-500 font-medium">이 말들을 한 뒤에 (말함이 완료됨)</span>
                        </div>
                    </div>
                </div>
            </div>
          </section>

          {/* 3. 동사구 */}
          <section id="sec-3" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 분사를 활용한 주요 동사구
            </h2>
            <p className="text-[15px] text-slate-600 mb-8 font-medium">단순 시제보다 훨씬 풍부한 '양태'를 전달하는 표현들입니다.</p>
            
            <div className="space-y-12">
                {/* 동명사 기반 */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <RotateCw size={18} className="text-blue-500" />
                        <h3 className="font-bold text-base text-slate-800 tracking-tight">동명사 기반 (진행 / 지속)</h3>
                    </div>
                    <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
                        <table className="w-full text-[15px] text-center border-collapse min-w-[600px]">
                            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm">
                                <tr>
                                    <th className="px-6 py-4 w-1/3 whitespace-nowrap">동사구</th>
                                    <th className="px-6 py-4 w-1/4 whitespace-nowrap">의미</th>
                                    <th className="px-6 py-4 whitespace-nowrap">예시</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                                {PERIFRASIS_GERUND.map((row, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-blue-700 bg-blue-50/30 border-r border-slate-100 whitespace-nowrap">{row.phrase}</td>
                                        <td className="px-6 py-4 text-slate-700 font-bold whitespace-nowrap">{row.mean}</td>
                                        <td className="px-6 py-4 text-slate-900 font-bold italic whitespace-nowrap">{row.ex}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 과거분사 기반 */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <Layers size={18} className="text-emerald-500" />
                        <h3 className="font-bold text-base text-slate-800 tracking-tight">과거분사 기반 (결과 / 완료)</h3>
                    </div>
                    <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm mb-6">
                        <table className="w-full text-[15px] text-center border-collapse min-w-[600px]">
                            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm">
                                <tr>
                                    <th className="px-6 py-4 w-1/3 whitespace-nowrap">동사구</th>
                                    <th className="px-6 py-4 w-1/4 whitespace-nowrap">의미</th>
                                    <th className="px-6 py-4 whitespace-nowrap">예시</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                                {PERIFRASIS_PARTICIPLE.map((row, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-emerald-700 bg-emerald-50/30 border-r border-slate-100 whitespace-nowrap">{row.phrase}</td>
                                        <td className="px-6 py-4 text-slate-700 font-bold whitespace-nowrap">{row.mean}</td>
                                        <td className="px-6 py-4 text-slate-900 font-bold italic whitespace-nowrap">{row.ex}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl flex gap-4 text-sm items-start max-w-4xl shadow-sm">
                        <Info size={20} className="text-blue-400 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-blue-900 font-bold mb-1">성·수 일치 주의!</p>
                            <p className="text-blue-800 leading-relaxed font-medium">
                                과거분사 기반 동사구에서는 분사가 <strong>목적어의 성·수와 일치</strong>해야 합니다. <br/>
                                <span className="text-slate-900 font-bold italic mt-2 inline-block">Llevo escritas (여성 복수) diez páginas (여성 복수).</span>
                            </p>
                        </div>
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
                {['동명사의 용법', '과거분사 절대 구문', '주요 동사구', '연습 문제'].map((item, i) => (
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