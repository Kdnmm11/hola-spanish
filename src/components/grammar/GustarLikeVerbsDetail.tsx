'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, CornerDownRight, ArrowRight, Info, AlertTriangle, Heart, Lightbulb
} from 'lucide-react';

const GUSTAR_STRUCTURE = [
    { part: '(a + 명사/대명사)', role: '누구에게 (강조/명시)', ex: 'a mí / a juan' },
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
    { id: 1, q: "빈칸 채우기: a mí (     ) (     ) las flores.", options: ['me gusta', 'me gustan', 'le gustan'], answer: 1, explain: "좋아하는 대상(주어)이 'las flores(복수)'이므로 동사는 gustan, '나에게'이므로 대명사는 me를 씁니다." },
    { id: 2, q: "필수 요소: a juan le gusta cantar. 에서 생략 가능한 것은?", options: ['a juan', 'le', 'gusta'], answer: 0, explain: "간접 목적격 대명사(le)는 필수이며, 'a juan'은 대상을 명확히 하거나 강조할 때만 씁니다." },
    { id: 3, q: "'머리가 아프다' 작문: (     ) duele la cabeza.", options: ['me', 'yo'], answer: 0, explain: "역구조 동사 doler는 '나에게(me) 통증을 준다'는 구조로 쓰입니다." },
    { id: 4, q: "동사 형태 결정: a nosotros nos (     ) viajar.", options: ['interesa', 'interesan'], answer: 0, explain: "viajar(여행하기)는 동사원형 주어이므로 단수 취급하여 interesa를 씁니다." }
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
    <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto px-2 sm:px-3 lg:px-4 pt-1.5 pb-8 font-sans text-slate-800 bg-white">
      
      <article className="flex-1 min-w-0">
          <header className="mb-8 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 tracking-widest mb-2">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 21</span>
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
          <section id="sec-1" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 문장 구조와 원리
            </h2>
            <p className="text-[15px] text-slate-600 mb-4 font-medium">순서가 우리말과 다르므로 구조를 분석하며 익혀야 합니다.</p>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm mb-6">
                <table className="w-full text-[15px] text-center border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-900 font-extrabold border-b border-slate-200 text-[15px]">
                        <tr>
                            <th className="px-5 py-3 w-1/4 border-r border-slate-200 bg-slate-100">구분</th>
                            <th className="px-5 py-3 w-1/4">간접 목적어</th>
                            <th className="px-5 py-3 w-1/4">동사</th>
                            <th className="px-5 py-3 w-1/4">주어</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        <tr>
                            <td className="px-5 py-4 font-bold text-slate-700 bg-slate-50/50 border-r border-slate-100">형태</td>
                            <td className="px-5 py-4 text-slate-600">me / te / le ...</td>
                            <td className="px-5 py-4 text-slate-600">gusta / gustan</td>
                            <td className="px-5 py-4 text-slate-600">명사 (단수/복수)</td>
                        </tr>
                        <tr>
                            <td className="px-5 py-4 font-bold text-slate-700 bg-slate-50/50 border-r border-slate-100">역할</td>
                            <td className="px-5 py-4 text-slate-600 font-medium">누구에게 (필수)</td>
                            <td className="px-5 py-4 text-slate-600 font-medium">즐거움을 준다</td>
                            <td className="px-5 py-4 text-slate-600 font-medium">좋아하는 대상</td>
                        </tr>
                        <tr className="bg-slate-50/30">
                            <td className="px-5 py-4 font-bold text-slate-900 border-r border-slate-100">예시</td>
                            <td className="px-5 py-4 font-black text-slate-900 text-lg">Me</td>
                            <td className="px-5 py-4 font-black text-slate-900 text-lg">gusta</td>
                            <td className="px-5 py-4 font-black text-slate-900 text-lg">el libro</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl shadow-sm flex flex-col items-center">
                <div className="flex flex-wrap items-center justify-center gap-4 text-lg font-bold text-slate-900 mb-3">
                    <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm text-center">
                        <span className="block text-slate-900 text-xl mb-1">Me</span>
                        <span className="text-xs text-slate-400 font-normal">나에게 (목적어)</span>
                    </div>
                    <ArrowRight className="text-slate-300" />
                    <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm text-center">
                        <span className="block text-slate-900 text-xl mb-1">gustan</span>
                        <span className="text-xs text-slate-400 font-normal">즐거움을 준다 (동사)</span>
                    </div>
                    <ArrowRight className="text-slate-300" />
                    <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm text-center">
                        <span className="block text-slate-900 text-xl mb-1">los libros</span>
                        <span className="text-xs text-slate-400 font-normal">책들이 (주어)</span>
                    </div>
                </div>
                <p className="text-sm text-slate-500 font-medium bg-white px-3 py-1 rounded-full border border-slate-100">
                    "책들이 나에게 즐거움을 준다" (나는 책을 좋아한다)
                </p>
            </div>
          </section>

          {/* 2. 대명사 필수 */}
          <section id="sec-2" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 간접 목적격 대명사의 필수 사용
            </h2>
            <div className="p-6 bg-amber-50 border border-amber-100 rounded-xl shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle size={20} className="text-amber-500" />
                    <h4 className="font-extrabold text-amber-900 text-[16px]">대명사 생략 불가</h4>
                </div>
                <p className="text-[15px] text-amber-800 leading-relaxed font-medium mb-5">
                    대상을 명확히 하기 위해 'a Juan'을 쓰더라도, 문법적으로 <strong>le</strong>를 반드시 함께 써야 합니다.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-amber-100 flex flex-col items-center gap-1 opacity-60">
                        <span className="text-xs font-bold text-slate-400 tracking-wider">Incorrecto (X)</span>
                        <span className="text-slate-500 line-through font-medium">A Juan gusta cantar.</span>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-amber-200 ring-2 ring-amber-100 flex flex-col items-center gap-1 shadow-sm">
                        <span className="text-xs font-bold text-emerald-600 tracking-wider">Correcto (O)</span>
                        <span className="text-slate-900 font-bold">A Juan <span className="text-rose-600">le</span> gusta cantar.</span>
                    </div>
                </div>
            </div>
          </section>

          {/* 3. 주요 동사 */}
          <section id="sec-3" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 주요 역구조 동사 목록
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                    { v: 'encantar', m: '매우 좋아하다', ex: 'Me encanta el fútbol.', tr: '나는 축구를 매우 좋아한다.' },
                    { v: 'interesar', m: '관심이 있다', ex: 'Me interesa el arte.', tr: '나는 예술에 관심이 있다.' },
                    { v: 'parecer', m: '~처럼 보이다', ex: 'Me parece bien.', tr: '좋아 보인다 / 괜찮은 것 같다.' },
                    { v: 'doler', m: '(신체가) 아프다', ex: 'Me duele la cabeza.', tr: '나는 머리가 아프다.' },
                    { v: 'quedar', m: '(옷 등이) 맞다', ex: 'Te queda bien.', tr: '너에게 잘 어울린다.' },
                    { v: 'importar', m: '중요하다 / 상관하다', ex: 'No me importa.', tr: '나는 상관없다.' }
                ].map((item, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 p-5 rounded-xl hover:border-blue-300 hover:shadow-md transition-all group">
                        <div className="flex justify-between items-baseline mb-3">
                            <span className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{item.v}</span>
                            <span className="text-xs text-slate-400 font-bold">{item.m}</span>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <p className="text-slate-900 font-bold text-[15px] italic mb-1">{item.ex}</p>
                            <p className="text-xs text-slate-500">{item.tr}</p>
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
                            <p className="font-bold text-slate-900 text-base leading-snug whitespace-pre-wrap">{q.q.replace(/^[a-z]/, (c) => c.toUpperCase())}</p>
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
                                        {opt.replace(/^[a-z]/, (c) => c.toUpperCase())}
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