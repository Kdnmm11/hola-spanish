'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, CornerDownRight, ArrowRight, Info, AlertTriangle, Heart
} from 'lucide-react';

const GUSTAR_STRUCTURE = [
    { part: '(a + 명사/대명사)', role: '누구에게 (강조/명시)', ex: 'a mí / a Juan' },
    { part: '간접 목적격 대명사', role: '누구에게 (필수)', ex: 'me / le' },
    { part: '동사 (gusta/an)', role: '즐거움을 주다', ex: 'gusta' },
    { part: '주어 (대상)', role: '좋아하는 것', ex: 'el libro' }
];

const GUSTAR_LIKE_VERBS = [
    { verb: 'encantar', mean: '매우 좋아하다' },
    { verb: 'interesar', mean: '관심이 있다' },
    { verb: 'parecer', mean: '~처럼 보이다' },
    { verb: 'doler', mean: '(신체가) 아프다' },
    { verb: 'quedar', mean: '(옷 등이) 맞다' },
    { verb: 'importar', mean: '중요하다' }
];

const QUIZ_DATA = [
    { id: 1, q: "빈칸 채우기: A mí ( ) ( ) las flores.", options: ['me gusta', 'me gustan', 'le gustan'], answer: 1, explain: "좋아하는 대상(주어)이 'las flores(복수)'이므로 동사는 gustan, '나에게'이므로 대명사는 me를 씁니다." },
    { id: 2, q: "필수 요소: A Juan le gusta cantar. 에서 생략 가능한 것은?", options: ['A Juan', 'le', 'gusta'], answer: 0, explain: "간접 목적격 대명사(le)는 필수이며, 'A Juan'은 대상을 명확히 하거나 강조할 때만 씁니다." },
    { id: 3, q: "'머리가 아프다' 작문: ( ) duele la cabeza.", options: ['Me', 'Yo'], answer: 0, explain: "역구조 동사 doler는 '나에게(Me) 통증을 준다'는 구조로 쓰입니다." }
];

export default function GustarLikeVerbsDetail() {
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
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 30</span>
                <ChevronRight size={10} />
                <span>Intermediate Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              역구조 동사 (Gustar류)
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               "나는 ~을 좋아한다"가 아니라 "~가 나에게 즐거움을 준다"라는 구조를 가집니다. <br/>
               주어와 목적어의 역할이 뒤바뀐 듯한 이 구조를 이해하는 것이 핵심입니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium">
                  <li><strong>주어</strong>: 좋아하는 사람(X) → 좋아하는 대상(O).</li>
                  <li><strong>수 일치</strong>: 뒤에 오는 대상(단수/복수)에 따라 gusta/gustan 결정.</li>
                  <li><strong>필수</strong>: 간접 목적격 대명사(me, te, le...)는 생략 불가.</li>
              </ul>
          </div>

          {/* 1. 문장 구조 */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 문장 구조와 원리
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">순서가 우리말과 다르므로 구조를 분석하며 익혀야 합니다.</p>
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm mb-6">
                <table className="w-full text-[15px] text-left border-collapse">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 w-1/4">요소</th>
                            <th className="px-5 py-3 w-1/3">역할</th>
                            <th className="px-5 py-3 text-right pr-8">예시</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {GUSTAR_STRUCTURE.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100">{row.part}</td>
                                <td className="px-5 py-4 text-slate-700 font-medium">{row.role}</td>
                                <td className="px-5 py-4 text-right pr-8 text-slate-900 font-bold italic">{row.ex}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col items-center">
                <div className="flex items-center gap-4 text-lg font-bold text-slate-900 mb-2">
                    <span>Me</span>
                    <ArrowRight className="text-blue-500" />
                    <span>gustan</span>
                    <ArrowRight className="text-blue-500" />
                    <span>los libros</span>
                </div>
                <p className="text-xs text-slate-500">책들이(주어) → 나에게(목적어) → 즐거움을 준다(동사)</p>
            </div>
          </section>

          {/* 2. 대명사 필수 */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 간접 목적격 대명사의 필수 사용
            </h2>
            <div className="p-5 bg-yellow-50 border border-yellow-200 rounded-xl shadow-sm flex gap-4 items-start">
                <AlertTriangle size={20} className="text-yellow-600 shrink-0 mt-0.5" />
                <div>
                    <h4 className="font-bold text-sm text-yellow-900 uppercase mb-1">대명사 생략 불가</h4>
                    <p className="text-[14px] text-yellow-800 leading-relaxed font-medium mb-3">
                        대상을 명확히 하기 위해 'A Juan'을 쓰더라도, 문법적으로 <strong>le</strong>를 반드시 함께 써야 합니다.
                    </p>
                    <div className="flex flex-col gap-2 text-sm">
                        <span className="line-through text-slate-400">A Juan gusta cantar. (X)</span>
                        <span className="text-slate-900 font-bold">A Juan <span className="text-blue-600">le</span> gusta cantar. (O)</span>
                    </div>
                </div>
            </div>
          </section>

          {/* 3. 주요 동사 */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 주요 역구조 동사 목록
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">gustar와 동일한 문법 구조를 가지는 동사들입니다.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {GUSTAR_LIKE_VERBS.map((item, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 p-4 rounded-lg text-center hover:border-slate-300 transition-colors shadow-sm">
                        <span className="block text-slate-900 font-bold text-lg mb-1">{item.verb}</span>
                        <span className="block text-slate-500 text-xs">{item.mean}</span>
                    </div>
                ))}
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
                {['문장 구조', '대명사 필수', '주요 동사', '연습 문제'].map((item, i) => (
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