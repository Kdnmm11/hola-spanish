'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, ArrowRight, Info, AlertTriangle, Scale, Lightbulb
} from 'lucide-react';

const AUNQUE_DATA = [
    { 
        mode: '직설법 (Indicativo)', 
        title: '확정된 사실 전달',
        desc: '화자가 이미 알고 있거나 실제로 일어나고 있는 확실한 정보를 바탕으로 양보할 때 씁니다.',
        ex: 'Aunque llueve, voy a salir.', 
        ko: '비가 오고 있지만 (실제로 오고 있음), 나는 나갈 것이다.' 
    },
    { 
        mode: '접속법 (Subjuntivo)', 
        title: '가설 / 미래 가정 / 무관심',
        desc: '아직 일어나지 않은 미래의 가정이거나, 사실이라 하더라도 화자가 개의치 않을 때 씁니다.',
        ex: 'Aunque llueva mañana, voy a salir.', 
        ko: '내일 비가 올지라도 (올지 안 올지 모르지만), 나는 나갈 것이다.' 
    }
];

const OTHER_CONNECTORS = [
    { con: 'a pesar de que', rule: '직설/접속 모두 가능', mean: '~에도 불구하고', ex: 'A pesar de que era tarde, él vino.' },
    { con: 'a pesar de', rule: '명사 / 동사원형 결합', mean: '~에도 불구하고 (구)', ex: 'A pesar de la lluvia, salimos.' },
    { con: 'por más que', rule: '주로 접속법과 결합', mean: '아무리 ~해도', ex: 'Por más que estudies, no lo entenderás.' },
    { con: 'aun cuando', rule: '강한 양보 (접속법)', mean: '심지어 ~할 때조차', ex: 'Aun cuando me lo pidas, 안 할 거야.' }
];

const QUIZ_DATA = [
    { id: 1, q: "현재 사실 전달: Aunque 지금(ahora) (     ) (llover), no tengo paraguas.", options: ['llueve', 'llueva'], answer: 0, explain: "지금 비가 오고 있다는 '현재 사실'을 전달하므로 직설법(llueve)을 씁니다." },
    { id: 2, q: "미래 가정: Aunque mañana (     ) (llover), iré a verte.", options: ['llueve', 'llueva'], answer: 1, explain: "내일 비가 올지 안 올지 모르는 '미래의 가정'에는 반드시 접속법(llueva)을 씁니다." },
    { id: 3, q: "아무리 ~해도: Por más que (     ) (gritar), nadie te oye.", options: ['gritas', 'grites'], answer: 1, explain: "Por más que(~아무리 해도)는 양보의 의미를 강조하며 주로 접속법(grites)을 동반합니다." },
    { id: 4, q: "명사 결합 양보: (     ) la lluvia, fuimos al parque.", options: ['Aunque', 'A pesar de'], answer: 1, explain: "절이 아닌 'la lluvia(비)'라는 명사와 결합할 때는 a pesar de(~에도 불구하고)를 씁니다." }
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
    <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto px-2 sm:px-3 lg:px-4 pt-1.5 pb-8 font-sans text-slate-800 bg-white">
      
      <article className="flex-1 min-w-0">
          <header className="mb-12 border-b border-slate-200 pb-8">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 tracking-widest mb-3">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 43</span>
                <ChevronRight size={10} />
                <span>Advanced Level</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
              양보절 심화
            </h1>
            <p className="text-[16px] text-slate-600 font-medium leading-relaxed max-w-3xl">
               "비록 ~일지라도"라는 의미를 전달하는 양보절은 동사의 법(직설법/접속법)에 따라 <br/>
               화자가 그 정보를 사실로 보는지 가설로 보는지 결정됩니다.
            </p>
          </header>

          <div className="mb-12 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium text-slate-700">
                  <li><strong>직설법 사용</strong>: 화자가 이미 알고 있는 확실한 사실을 언급할 때.</li>
                  <li><strong>접속법 사용</strong>: 불확실한 미래, 가상의 상황, 또는 사실이어도 상관없다는 태도일 때.</li>
                  <li><strong>a pesar de</strong>: 뒤에 명사가 오면 'de'만, 절이 오면 'de que'를 사용합니다.</li>
              </ul>
          </div>

          {/* 1. Aunque 비교 */}
          <section id="sec-1" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600">1.</span> aunque + 직설법 vs 접속법
            </h2>
            <p className="text-[15px] text-slate-600 mb-8 font-medium">선택하는 법에 따라 문장의 실현 여부와 화자의 심리 상태가 달라집니다.</p>
            
            <div className="space-y-4 max-w-4xl">
                {AUNQUE_DATA.map((item, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-300 transition-all overflow-hidden flex flex-col sm:flex-row">
                        <div className="sm:w-1/4 bg-slate-50 p-5 flex items-center justify-center border-b sm:border-b-0 sm:border-r border-slate-100 text-center">
                            <span className="text-[15px] font-bold text-slate-700 leading-tight">{item.mode}</span>
                        </div>
                        <div className="flex-1 p-6">
                            <h4 className="font-bold text-slate-800 mb-3 text-[15px]">• {item.title}</h4>
                            <p className="text-sm text-slate-600 mb-4 leading-relaxed font-medium">
                                {item.desc}
                            </p>
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <p className="text-[17px] text-slate-900 font-bold mb-0.5">"{item.ex}"</p>
                                <p className="text-sm text-slate-500 font-medium">{item.ko}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          </section>

          {/* 2. 기타 접속사 */}
          <section id="sec-2" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 기타 양보 접속사
            </h2>
            <p className="text-[15px] text-slate-600 mb-6 font-medium">의미의 강도와 격식의 정도에 따라 다양한 표현을 선택할 수 있습니다.</p>
            <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm">
                        <tr>
                            <th className="px-6 py-4 w-1/4 whitespace-nowrap">접속사</th>
                            <th className="px-6 py-4 w-1/4 whitespace-nowrap">결합 규칙</th>
                            <th className="px-6 py-4 whitespace-nowrap">의미 및 예시</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {OTHER_CONNECTORS.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-5 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100 whitespace-nowrap">{row.con}</td>
                                <td className="px-6 py-5 text-blue-600 font-bold text-xs whitespace-nowrap">{row.rule}</td>
                                <td className="px-6 py-5">
                                    <div className="flex flex-col items-center">
                                        <p className="font-bold text-slate-900 text-[16px] mb-1">"{row.ex}"</p>
                                        <p className="text-xs text-slate-400 font-medium">{row.mean}</p>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 3. 가이드 */}
          <section id="sec-3" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 상황별 법(Mode) 선택 가이드
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm border-l-4 border-l-slate-400">
                    <div className="flex items-center gap-2 mb-4">
                        <Scale size={18} className="text-slate-400" />
                        <h4 className="font-bold text-base text-slate-800">직설법 선택 (이미 아는 사실)</h4>
                    </div>
                    <ul className="space-y-4">
                        <li className="flex flex-col gap-1">
                            <span className="text-sm font-bold text-slate-700 bg-slate-50 px-2 py-0.5 rounded w-fit">과거의 팩트</span>
                            <p className="text-[15px] text-slate-900 font-bold italic">"Aunque ayer llovía, salimos."</p>
                        </li>
                        <li className="flex flex-col gap-1">
                            <span className="text-sm font-bold text-slate-700 bg-slate-50 px-2 py-0.5 rounded w-fit">현재의 확실한 상태</span>
                            <p className="text-[15px] text-slate-900 font-bold italic">"Aunque no tengo dinero, soy feliz."</p>
                        </li>
                    </ul>
                </div>
                <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm border-l-4 border-l-blue-400">
                    <div className="flex items-center gap-2 mb-4">
                        <Scale size={18} className="text-blue-500" />
                        <h4 className="font-bold text-base text-slate-800">접속법 선택 (가상 / 무관심)</h4>
                    </div>
                    <ul className="space-y-4">
                        <li className="flex flex-col gap-1">
                            <span className="text-sm font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded w-fit">미래에 대한 가정</span>
                            <p className="text-[15px] text-slate-900 font-bold italic">"Aunque mañana haga frío, iré."</p>
                        </li>
                        <li className="flex flex-col gap-1">
                            <span className="text-sm font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded w-fit">사실에 대한 무관심</span>
                            <p className="text-[15px] text-slate-900 font-bold italic">"Aunque seas rico, no me importa."</p>
                        </li>
                    </ul>
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
                {['aunque 비교', '기타 접속사', '상황별 가이드', '연습 문제'].map((item, i) => (
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