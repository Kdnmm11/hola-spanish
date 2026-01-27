'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, CornerDownRight, ArrowRight, Info, AlertTriangle, Link, Layers, Lightbulb
} from 'lucide-react';

const NEUTRAL_RELATIVES = [
    { type: 'lo que', usage: '선행사 없는 "것" / 문장 전체', pos: '문두 가능', ex: 'lo que quiero es paz.' },
    { type: 'lo cual', usage: '앞 문장 전체 (계속적 용법)', pos: '문두 불가 (콤마 뒤)', ex: 'llegó tarde, lo cual es raro.' }
];

const COMPOUND_RELATIVES = [
    { gender: '남성 (m)', sg: 'el cual', pl: 'los cuales' },
    { gender: '여성 (f)', sg: 'la cual', pl: 'las cuales' }
];

const PREPOSITION_RULES = [
    { type: '단음절 (a, de, en, con)', rel: 'que / el cual / el que', ex: 'la casa en que vivo.' },
    { type: '다음절 (cerca de, para, sobre)', rel: 'el cual / el que (선호됨)', ex: 'el tema sobre el cual hablamos.' }
];

const QUIZ_DATA = [
    { id: 1, q: "빈칸 채우기: no entiendo ( ) dices. (네가 말하는 '것')", options: ['lo que', 'lo cual'], answer: 0, explain: "선행사가 없고 '네가 말하는 것'이라는 명사절을 이끌 때는 lo que를 씁니다." },
    { id: 2, q: "계속적 용법: ella aprobó, ( ) me alegra. (합격했는데, '그것이')", options: ['lo que', 'lo cual'], answer: 1, explain: "앞 문장 전체를 선행사로 받으며 콤마 뒤에 올 때는 lo cual이 더 적절합니다." },
    { id: 3, q: "성수 일치: las herramientas con ( ) trabajo. (여성 복수)", options: ['los cuales', 'las cuales'], answer: 1, explain: "선행사 herramientas가 여성 복수이므로 las cuales를 써야 합니다." },
    { id: 4, q: "전치사 결합: la chica ( ) ( ) hablo es ana. (~에 대해 말하는)", options: ['de que', 'de la cual', '둘 다 가능'], answer: 2, explain: "사람 선행사 뒤의 짧은 전치사구에서는 que와 el cual 시리즈 모두 사용 가능합니다." }
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
          <header className="mb-8 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 37</span>
                <ChevronRight size={10} />
                <span>Advanced Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              관계대명사 심화
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               기본적인 que를 넘어, 문장 전체를 받는 중성 관계사와 <br/>
               전치사와 함께 쓰여 문장을 정교하게 연결하는 복합 관계사를 학습합니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium">
                  <li><strong>lo que</strong>: 막연한 '것' 또는 문장 전체. 문장 맨 앞 가능.</li>
                  <li><strong>lo cual</strong>: 앞 문장 전체를 받음. 콤마(,) 필수. 문두 불가.</li>
                  <li><strong>el cual</strong>: 선행사의 성·수와 일치. 전치사 뒤나 중의성 해결에 사용.</li>
              </ul>
          </div>

          {/* 1. 중성 관계대명사 */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 중성 관계대명사: lo que vs lo cual
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">추상적인 상황이나 문장 전체를 선행사로 받습니다.</p>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-left border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 w-1/4 whitespace-nowrap">관계사</th>
                            <th className="px-5 py-3 w-1/3 whitespace-nowrap">특징 (위치)</th>
                            <th className="px-5 py-3 text-right pr-8 whitespace-nowrap">예시</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {NEUTRAL_RELATIVES.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                <td className="px-5 py-4 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100 whitespace-nowrap">{row.type}</td>
                                <td className="px-5 py-4 text-slate-700 font-medium text-xs whitespace-nowrap">{row.pos}</td>
                                <td className="px-5 py-4 text-right pr-8 whitespace-nowrap">
                                    <div className="flex flex-col items-end">
                                        <span className="text-slate-900 font-bold">{row.ex}</span>
                                        <span className="text-xs text-slate-400 mt-0.5">{row.type === 'lo que' ? '내가 좋아하는 것은 여행이다.' : '늦게 왔는데, 그게 이상하다.'}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 2. 복합 관계사 */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 복합 관계사: el cual / la cual 시리즈
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">선행사의 성(남/여)과 수(단/복)에 반드시 일치시켜야 합니다.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 text-slate-700">
                <div className="bg-white border border-slate-200 rounded-xl overflow-x-auto shadow-sm">
                    <table className="w-full text-center text-[14px] min-w-[200px]">
                        <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-600 text-xs">
                            <tr><th className="py-2">성별</th><th className="py-2">단수</th><th className="py-2">복수</th></tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {COMPOUND_RELATIVES.map((r, i) => (
                                <tr key={i}>
                                    <td className="py-3 font-bold text-slate-400">{r.gender}</td>
                                    <td className="py-3 font-bold text-slate-900">{r.sg}</td>
                                    <td className="py-3 font-bold text-slate-900">{r.pl}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex flex-col justify-center shadow-sm">
                    <h4 className="text-xs font-bold text-blue-500 uppercase mb-2">중의성 해결 예시</h4>
                    <p className="text-[14px] text-slate-700 leading-relaxed font-medium">
                        "hablé con la hija de juan, <strong>la cual</strong> vive aquí."
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                        la cual(여성)을 썼으므로 juan(남성)이 아니라 <strong>hija(딸)</strong>가 산다는 뜻이 명확해집니다.
                    </p>
                </div>
            </div>
          </section>

          {/* 3. 전치사 결합 */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 전치사 + 관계대명사 정리
            </h2>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-left border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 w-1/4 whitespace-nowrap">전치사 종류</th>
                            <th className="px-5 py-3 w-1/3 whitespace-nowrap">사용 가능 관계사</th>
                            <th className="px-5 py-3 text-right pr-8 whitespace-nowrap">예시</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {PREPOSITION_RULES.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                <td className="px-5 py-4 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100 whitespace-nowrap">{row.type}</td>
                                <td className="px-5 py-4 text-slate-700 font-medium whitespace-nowrap">{row.rel}</td>
                                <td className="px-5 py-4 text-right pr-8 text-slate-900 font-bold whitespace-nowrap">{row.ex}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
                {['중성 관계대명사', '복합 관계사', '전치사 결합', '연습 문제'].map((item, i) => (
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