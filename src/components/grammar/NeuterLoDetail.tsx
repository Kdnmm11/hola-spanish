'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, ArrowRight, Info, Box, Sparkles, Lightbulb
} from 'lucide-react';

const LO_ADJECTIVE_DATA = [
    { 
        type: 'lo + 형용사', 
        title: '추상적 개념의 명사화', 
        desc: '구체적인 사물이 아닌 "좋은 것", "어려운 부분" 등 성질 자체를 명사로 만듭니다.',
        ex: 'Lo bueno de viajar es aprender.', 
        ko: '여행의 좋은 점(것)은 배우는 것이다.' 
    },
    { 
        type: 'lo + 부사 + que', 
        title: '정도의 강조', 
        desc: '"얼마나 ~한지"라는 뜻으로, 뒤에 오는 형용사나 부사의 정도를 강하게 나타냅니다.',
        ex: 'No sabes lo difícil que es.', 
        ko: '그것이 얼마나 어려운지 너는 모를 거야.' 
    }
];

const LO_DE_DATA = [
    { 
        type: 'lo de + 명사/동사', 
        title: '이미 알고 있는 상황 지칭', 
        desc: '화자와 청자가 이미 알고 있는 특정한 사건, 화제, 혹은 개념 전체를 가리킵니다.',
        ex: '¿Qué pasó con lo de Juan?', 
        ko: '후안에게 일어난 일(그 사건)은 어떻게 됐니?' 
    },
    { 
        type: 'lo de + 시간', 
        title: '특정 시점의 사건', 
        desc: '특정 시간에 있었던 일이나 상황을 뭉뚱그려 표현할 때 씁니다.',
        ex: 'Lo de ayer fue increíble.', 
        ko: '어제 있었던 일(상황)은 정말 믿기지 않았어.' 
    }
];

const QUIZ_DATA = [
    { id: 1, q: "빈칸 채우기: (     ) malo de esta película es el final. (나쁜 점)", options: ['El', 'Lo'], answer: 1, explain: "영화의 '나쁜 부분'이라는 추상적 개념을 명사화할 때는 중성 관사 lo를 씁니다." },
    { id: 2, q: "강조 표현: ¡Mira (     ) rápido que corre! (얼마나 빨리 달리는지 봐!)", options: ['lo', 'tan'], answer: 0, explain: "lo + 부사 + que 구조는 '얼마나 ~한지'라는 강조의 의미를 가집니다." },
    { id: 3, q: "중성 목적격: Él está enfermo. - Ya (     ) sé. (그 사실을 알고 있어)", options: ['el', 'lo'], answer: 1, explain: "앞서 언급된 문장 전체나 아이디어를 대명사로 받을 때는 중성 lo를 사용합니다." },
    { id: 4, q: "Lo que 용법: (     ) (     ) me gusta es leer. (내가 좋아하는 '것')", options: ['Lo que', 'El que'], answer: 0, explain: "선행사 없는 명사절 '~하는 것'을 만들 때는 lo que를 씁니다." }
];

export default function NeuterLoDetail() {
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
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 44</span>
                <ChevronRight size={10} />
                <span>Advanced Level</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
              명사화와 중성 대명사 lo
            </h1>
            <p className="text-[16px] text-slate-600 font-medium leading-relaxed max-w-3xl">
               남성/여성으로 분류할 수 없는 추상적인 개념이나 앞서 말한 상황 전체를 가리킬 때 씁니다. <br/>
               문장을 세련되게 압축하고 강조하는 핵심 도구입니다.
            </p>
          </header>

          <div className="mb-12 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium text-slate-700">
                  <li><strong>lo + 형용사</strong>: "~한 것/부분" (추상적 명사화).</li>
                  <li><strong>lo de + 명사</strong>: "~에 관한 일/상황" (이미 아는 정보 지칭).</li>
                  <li><strong>lo que</strong>: "~하는 것" (절 전체를 명사절로 만듦).</li>
                  <li><strong>lo + 형용사 + que</strong>: "얼마나 ~한지" (정도의 강조).</li>
              </ul>
          </div>

          {/* 1. 추상 명사화 및 강조 */}
          <section id="sec-1" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 추상 명사화 및 정도의 강조
            </h2>
            <p className="text-[15px] text-slate-600 mb-8 font-medium">단순한 관사를 넘어 형용사와 부사를 명사처럼 활용하거나 강조합니다.</p>
            
            <div className="space-y-4 max-w-4xl">
                {LO_ADJECTIVE_DATA.map((item, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-300 transition-all overflow-hidden flex flex-col sm:flex-row">
                        <div className="sm:w-1/4 bg-slate-50 p-5 flex items-center justify-center border-b sm:border-b-0 sm:border-r border-slate-100 text-center">
                            <span className="text-[15px] font-bold text-blue-700 leading-tight">{item.type}</span>
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

          {/* 2. 상황 지칭 (lo de) */}
          <section id="sec-2" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 상황 지칭: lo de + 명사/동사
            </h2>
            <p className="text-[15px] text-slate-600 mb-8 font-medium">화자와 청자가 이미 알고 있는 특정 배경이나 사건을 뭉뚱그려 표현합니다.</p>
            
            <div className="space-y-4 max-w-4xl">
                {LO_DE_DATA.map((item, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-emerald-300 transition-all overflow-hidden flex flex-col sm:flex-row">
                        <div className="sm:w-1/4 bg-slate-50 p-5 flex items-center justify-center border-b sm:border-b-0 sm:border-r border-slate-100 text-center">
                            <span className="text-[15px] font-bold text-emerald-700 leading-tight">{item.type}</span>
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

          {/* 3. 중성 목적격 대명사 */}
          <section id="sec-3" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 중성 목적격 대명사: Ya lo sé
            </h2>
            <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-md max-w-4xl">
                <div className="flex items-center gap-3 mb-6">
                    <Box size={20} className="text-blue-500" />
                    <h4 className="font-bold text-base text-slate-800 tracking-tight">아이디어 및 문장 전체를 지칭</h4>
                </div>
                <p className="text-[15px] text-slate-600 leading-relaxed font-medium mb-6">
                    앞서 언급된 특정한 명사가 아니라, 상대방이 한 <strong>말의 내용(아이디어)이나 상황 전체</strong>를 목적어로 받을 때 사용합니다.
                </p>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 space-y-4">
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-bold text-slate-400 bg-white px-2 py-1 rounded shadow-sm">상황</span>
                        <p className="text-[16px] text-slate-900 font-bold">"Juan no viene hoy." (후안 오늘 안 온대.)</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded shadow-sm">반응</span>
                        <p className="text-[16px] text-slate-900 font-bold">"¿Quién <span className="text-blue-600 underline underline-offset-4 decoration-2">lo</span> dijo?" (누가 <strong>그 사실을</strong> 말했니?)</p>
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
                {['명사화 및 강조', '상황 지칭 (lo de)', '중성 목적격 대명사', '연습 문제'].map((item, i) => (
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