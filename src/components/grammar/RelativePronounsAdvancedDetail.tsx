'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, CornerDownRight, ArrowRight, Info, AlertTriangle, Link, Layers
} from 'lucide-react';

const NEUTRAL_RELATIVES = [
    { type: 'Lo que', usage: '선행사 없는 "것" / 문장 전체', pos: '문두 가능', ex: 'lo que quiero es paz.' },
    { type: 'Lo cual', usage: '앞 문장 전체 (계속적 용법)', pos: '문두 불가 (콤마 뒤)', ex: 'llegó tarde, lo cual es raro.' }
];

const COMPOUND_RELATIVES = [
    { gender: '남성 (M)', sg: 'el cual', pl: 'los cuales' },
    { gender: '여성 (F)', sg: 'la cual', pl: 'las cuales' }
];

const PREPOSITION_RULES = [
    { type: '단음절 (a, de, en, con)', rel: 'que / el cual / el que', ex: 'la casa en que vivo.' },
    { type: '다음절 (cerca de, para, sobre)', rel: 'el cual / el que (선호됨)', ex: 'el tema sobre el cual hablamos.' }
];

const QUIZ_DATA = [
    { id: 1, q: "빈칸 채우기: No entiendo ( ) dices. (내가 말하는 '것')", options: ['lo que', 'lo cual'], answer: 0, explain: "선행사가 없고 '네가 말하는 것'이라는 명사절을 이끌 때는 lo que를 씁니다." },
    { id: 2, q: "계속적 용법: Ella aprobó, ( ) me alegra. (합격했는데, '그것이')", options: ['lo que', 'lo cual'], answer: 1, explain: "앞 문장 전체(Ella aprobó)를 선행사로 받으며 콤마 뒤에 올 때는 lo cual이 더 적절합니다. (lo que도 가능하나 lo cual이 더 격식적)" },
    { id: 3, q: "성수 일치: Las herramientas con ( ) trabajo. (여성 복수)", options: ['los cuales', 'las cuales'], answer: 1, explain: "선행사 herramientas가 여성 복수이므로 las cuales를 써야 합니다." }
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
                  <li><strong>Lo que</strong>: 막연한 '것' 또는 문장 전체. 문장 맨 앞 가능.</li>
                  <li><strong>Lo cual</strong>: 앞 문장 전체를 받음. 콤마(,) 필수. 문두 불가.</li>
                  <li><strong>El cual</strong>: 선행사의 성·수와 일치. 전치사 뒤나 중의성 해결에 사용.</li>
              </ul>
          </div>

          {/* 1. 중성 관계대명사 */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 중성 관계대명사: lo que vs lo cual
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">추상적인 상황이나 문장 전체를 선행사로 받습니다.</p>
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-left border-collapse">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 w-1/4">관계사</th>
                            <th className="px-5 py-3 w-1/3">특징 (위치)</th>
                            <th className="px-5 py-3 text-right pr-8">예시</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {NEUTRAL_RELATIVES.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                <td className="px-5 py-4 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100">{row.type}</td>
                                <td className="px-5 py-4 text-slate-700 font-medium text-xs">{row.pos}</td>
                                <td className="px-5 py-4 text-right pr-8">
                                    <div className="flex flex-col items-end">
                                        <span className="text-slate-900 font-bold italic">{row.ex}</span>
                                        <span className="text-xs text-slate-400 mt-0.5">{row.type === 'Lo que' ? '내가 좋아하는 것은 여행이다.' : '늦게 왔는데, 그게 이상하다.'}</span>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <table className="w-full text-center text-[14px]">
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
                        "Hablé con la hija de Juan, <strong>la cual</strong> vive aquí."
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                        la cual(여성)을 썼으므로 Juan(남성)이 아니라 <strong>hija(딸)</strong>가 산다는 뜻이 명확해집니다.
                    </p>
                </div>
            </div>
          </section>

          {/* 3. 전치사 결합 */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 전치사 + 관계대명사 정리
            </h2>
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-left border-collapse">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 w-1/4">전치사 종류</th>
                            <th className="px-5 py-3 w-1/3">사용 가능 관계사</th>
                            <th className="px-5 py-3 text-right pr-8">예시</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {PREPOSITION_RULES.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                <td className="px-5 py-4 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100">{row.type}</td>
                                <td className="px-5 py-4 text-slate-700 font-medium">{row.rel}</td>
                                <td className="px-5 py-4 text-right pr-8 text-slate-900 font-bold italic">{row.ex}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 연습 문제 */}
          <section id="sec-4" className="scroll-mt-24 pt-8 border-t border-slate-200">
             <h2 className="text-[13px] font-black text-slate-400 mb-5 uppercase tracking-widest flex items-center gap-2">
                <CornerDownRight size={14} /> 연습 문제
             </h2>
             <div className="space-y-4 text-[15px]">
                {QUIZ_DATA.map((q, idx) => (
                    <div key={q.id} className="bg-slate-50 p-4 rounded-lg border border-slate-200 shadow-sm">
                        <div className="flex items-baseline gap-3 mb-3">
                            <span className="text-slate-400 font-bold">Q{idx + 1}.</span>
                            <p className="font-bold text-slate-800">{q.q}</p>
                        </div>
                        <div className="flex flex-wrap gap-2 ml-0 w-full mt-2">
                            {q.options.map((opt, optIdx) => {
                                const isSelected = quizState[q.id] === optIdx;
                                const isCorrect = q.answer === optIdx;
                                const showResult = quizState[q.id] !== undefined && quizState[q.id] !== null;
                                let buttonStyle = "bg-white border-slate-200 hover:border-slate-400 hover:shadow-md text-slate-600";
                                if (showResult) {
                                    if (isSelected) {
                                        buttonStyle = isCorrect ? "bg-green-50 border-green-500 text-green-700 font-bold" : "bg-red-50 border-red-500 text-red-700 font-bold";
                                    } else if (isCorrect) {
                                        buttonStyle = "bg-green-50 border-green-200 text-green-600 opacity-70";
                                    } else {
                                        buttonStyle = "bg-slate-50 border-slate-100 text-slate-400 opacity-50";
                                    }
                                }
                                return (
                                    <button key={optIdx} onClick={() => !showResult && handleQuiz(q.id, optIdx)} disabled={showResult}
                                        className={`px-4 py-2 rounded-lg border transition-all shadow-sm w-fit font-medium ${buttonStyle}`}
                                    >{opt}</button>
                                );
                            })}
                        </div>
                        {showExplain[q.id] && (
                            <div className="mt-5 w-full text-sm animate-in fade-in slide-in-from-top-2 duration-300">
                                {quizState[q.id] === q.answer 
                                    ? <p className="text-green-600 font-bold flex items-center gap-2 mb-2"><Check size={18}/> 정답입니다!</p>
                                    : <p className="text-red-500 font-bold flex items-center gap-2 mb-2"><X size={18}/> 오답입니다.</p>
                                }
                                <div className="bg-indigo-50/50 border border-indigo-100 p-5 rounded-xl text-slate-700 leading-relaxed shadow-sm">
                                    <strong className="text-indigo-600 block mb-1 text-[13px] uppercase tracking-tight">💡 해설</strong>
                                    {q.explain}
                                </div>
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