'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, ArrowRight, Info, Link, Layers, Lightbulb, Split
} from 'lucide-react';

const NEUTRAL_DATA = [
    {
        type: 'lo que',
        title: '선행사 포함 (~하는 것)',
        desc: '명사 선행사 없이 "~하는 것"이라는 뜻의 명사절을 만듭니다. 주어나 목적어로 쓰이며 문장 맨 앞에도 올 수 있습니다.',
        ex: 'Lo que quiero es viajar.',
        ko: '내가 원하는 것은 여행하는 것이다. (문두 사용 가능)'
    },
    {
        type: 'lo cual',
        title: '앞 문장 상황 전체 수식',
        desc: '앞 문장 전체의 "상황"이나 "사실"을 가리킵니다. 반드시 콤마(,) 뒤에 쓰며, 문장 맨 앞에는 절대 올 수 없습니다.',
        ex: 'Él llegó tarde, lo cual me molestó.',
        ko: '그는 늦게 왔는데, 그것(늦게 온 상황)이 나를 짜증나게 했다.'
    }
];

const COMPOUND_DATA = [
    { gender: '남성', sg: 'el cual', pl: 'los cuales' },
    { gender: '여성', sg: 'la cual', pl: 'las cuales' }
];

const COMPOUND_EX = [
    {
        type: '특정 명사 수식',
        desc: '문장 전체가 아닌 "특정한 단어(선행사)"를 가리킵니다. 선행사의 성·수에 맞춰 형태를 정확히 일치시켜야 합니다.',
        ex: 'Hablé con la hija de Juan, la cual vive aquí.',
        ko: '후안의 딸과 이야기했는데, 그녀(딸)가 여기 산다.'
    }
];
const PREP_REL_DATA = [
    { 
        type: '짧은 전치사 (단음절)', 
        desc: 'a, de, en, con과 같은 짧은 전치사 뒤에서는 que를 가장 많이 씁니다.',
        ex: 'La casa en que vivo es pequena.', 
        ko: '내가 사는 집은 작다. (en la que / en la cual 가능)' 
    },
    { 
        type: '긴 전치사 (다음절)', 
        desc: 'cerca de, para, sobre 등 긴 전치사 뒤에서는 el cual / el que 시리즈를 선호합니다.',
        ex: 'El tema sobre el cual hablamos.', 
        ko: '우리가 이야기한 주제.' 
    }
];

const QUIZ_DATA = [
    { id: 1, q: "빈칸 채우기: No entiendo (     ) dices. (네가 말하는 '것')", options: ['lo que', 'lo cual'], answer: 0, explain: "선행사가 없고 '~하는 것'이라는 뜻일 때는 lo que를 씁니다." },
    { id: 2, q: "계속적 용법: Ella aprobó, (     ) me alegra. (합격했는데, '그게')", options: ['lo que', 'lo cual'], answer: 1, explain: "앞 문장 전체를 가리키며 콤마 뒤에 올 때는 lo cual이 적절합니다." },
    { id: 3, q: "성·수 일치: Las herramientas con (     ) trabajo. (여성 복수)", options: ['los cuales', 'las cuales'], answer: 1, explain: "선행사 herramientas가 여성 복수이므로 las cuales를 써야 합니다." },
    { id: 4, q: "전치사 결합: La chica (     ) (     ) hablo es Ana. (~에 대해)", options: ['de que', 'de la cual', '둘 다 가능'], answer: 2, explain: "짧은 전치사 뒤에서는 que와 el cual 시리즈 모두 사용 가능합니다." }
];

export default function RelativePronounsAdvancedDetail() {
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
          <header className="mb-12 border-b border-slate-200 pb-8">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 tracking-widest mb-3">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 42</span>
                <ChevronRight size={10} />
                <span>Advanced Level</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
              관계대명사 심화
            </h1>
            <p className="text-[16px] text-slate-600 font-medium leading-relaxed max-w-3xl">
               기본적인 que를 넘어, 문장 전체를 받는 <strong>중성 관계사</strong>와 <br/>
               성·수 일치를 통해 의미를 명확히 하는 <strong>복합 관계사</strong>를 학습합니다.
            </p>
          </header>

          <div className="mb-12 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium text-slate-700">
                  <li><strong>lo que</strong>: 선행사 없이 "~하는 것". 문장 맨 앞 가능.</li>
                  <li><strong>lo cual</strong>: 앞 문장 전체 수식. 반드시 콤마(,) 뒤에 사용.</li>
                  <li><strong>el cual</strong>: 선행사의 성·수에 일치. 전치사 뒤나 중의성 해결에 사용.</li>
              </ul>
          </div>

          {/* 1. 중성 관계대명사 대조 */}
          <section id="sec-1" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 중성 관계사: lo que vs lo cual
            </h2>
            <p className="text-[15px] text-slate-600 mb-8 font-medium">추상적인 상황이나 문장 전체를 선행사로 받을 때의 차이점입니다.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
                {NEUTRAL_DATA.map((item, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-300 transition-all flex flex-col">
                        <div className="bg-slate-50 p-4 border-b border-slate-100 text-center">
                            <span className="text-lg font-bold text-blue-700">{item.type}</span>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <h4 className="font-bold text-slate-800 mb-3 text-[15px]">• {item.title}</h4>
                            <p className="text-sm text-slate-500 mb-6 leading-relaxed font-medium flex-1">
                                {item.desc}
                            </p>
                            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 mt-auto">
                                <p className="text-[16px] text-slate-900 font-bold mb-1">"{item.ex}"</p>
                                <p className="text-xs text-slate-500 font-medium">{item.ko}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          </section>

          {/* 2. 복합 관계사 */}
          <section id="sec-2" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 복합 관계사: el cual / la cual 시리즈
            </h2>
            <p className="text-[15px] text-slate-600 mb-6 font-medium">선행사의 성(남/여)과 수(단/복)에 반드시 일치시켜 문장의 의미를 명확히 합니다.</p>
            
            <div className="space-y-6 max-w-4xl">
                <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
                    <table className="w-full text-[15px] text-center border-collapse">
                        <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm">
                            <tr>
                                <th className="px-6 py-4">성별</th>
                                <th className="px-6 py-4">단수</th>
                                <th className="px-6 py-4">복수</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {COMPOUND_DATA.map((row, i) => (
                                <tr key={i}>
                                    <td className="px-6 py-4 font-bold text-slate-400 bg-slate-50/30 border-r border-slate-100">{row.gender}</td>
                                    <td className="px-6 py-4 font-bold text-slate-900">{row.sg}</td>
                                    <td className="px-6 py-4 font-bold text-slate-900">{row.pl}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="space-y-4 max-w-4xl">
                    {COMPOUND_EX.map((item, idx) => (
                        <div key={idx} className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-300 transition-all overflow-hidden flex flex-col sm:flex-row">
                            <div className="sm:w-1/4 bg-blue-50/50 p-5 flex items-center justify-center border-b sm:border-b-0 sm:border-r border-slate-100 text-center">
                                <span className="text-[15px] font-bold text-blue-700 leading-tight">{item.type}</span>
                            </div>
                            <div className="flex-1 p-6">
                                <p className="text-sm text-slate-600 mb-4 leading-relaxed font-medium">
                                    {item.desc}
                                </p>
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <p className="text-[16px] text-slate-900 font-bold">"Hablé con la hija de Juan, <span className="text-blue-600">la cual</span> vive aquí."</p>
                                    <p className="text-xs text-slate-500 mt-2 font-medium">
                                        la cual(여성)을 썼으므로 Juan(남성)이 아니라 <strong>딸(hija)</strong>이 산다는 뜻이 됩니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </section>

          {/* 3. 전치사 결합 대조 */}
          <section id="sec-3" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 전치사와 관계대명사의 결합
            </h2>
            <p className="text-[15px] text-slate-600 mb-8 font-medium">전치사의 길이에 따라 선호되는 관계사가 다릅니다.</p>
            
            <div className="space-y-4 max-w-5xl">
                {PREP_REL_DATA.map((item, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-emerald-300 transition-all overflow-hidden flex flex-col sm:flex-row">
                        <div className="sm:w-1/4 bg-slate-50 p-5 flex items-center justify-center border-b sm:border-b-0 sm:border-r border-slate-100 text-center">
                            <span className="text-[15px] font-bold text-slate-700 leading-tight">{item.type}</span>
                        </div>
                        <div className="flex-1 p-6">
                            <p className="text-sm text-slate-600 mb-4 leading-relaxed font-medium">
                                {item.desc}
                            </p>
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <p className="text-[16px] text-slate-900 font-bold mb-0.5">"{item.ex}"</p>
                                <p className="text-sm text-slate-500 font-medium">{item.ko}</p>
                            </div>
                        </div>
                    </div>
                ))}
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
                {['중성 관계사 대조', '복합 관계사', '전치사 결합 대조', '연습 문제'].map((item, i) => (
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