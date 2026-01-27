'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, CornerDownRight, ArrowRight, Info, AlertTriangle, User, Lightbulb, RefreshCw
} from 'lucide-react';

const REFLEXIVE_CONJ = [
    { p: 'yo', pro: 'me', v: 'levanto' },
    { p: 'tú', pro: 'te', v: 'levantas' },
    { p: 'él/ella/ud.', pro: 'se', v: 'levanta' },
    { p: 'nosotros/as', pro: 'nos', v: 'levantamos' },
    { p: 'vosotros/as', pro: 'os', v: 'levantáis' },
    { p: 'ellos/as/uds.', pro: 'se', v: 'levantan' }
];

const DAILY_REFLEXIVES = [
    { cat: '신체 습관', list: 'ducharse (샤워), cepillarse (양치), peinarse (빗질)', color: 'blue' },
    { cat: '상태 변화', list: 'sentarse (앉다), dormirse (잠들다), enamorarse (반하다)', color: 'indigo' },
    { cat: '감정 변화', list: 'enojarse (화나다), preocuparse (걱정하다)', color: 'rose' }
];

const QUIZ_DATA = [
    { id: 1, q: "빈칸 채우기: yo ( ) ( ) a las siete. (despertarse, e-ie)", options: ['me despierto', 'se despierta', 'despierto me'], answer: 0, explain: "1인칭 단수 주어(yo)에 맞는 재귀대명사 me와 어간 변화(e-ie)된 동사를 동사 앞에 씁니다." },
    { id: 2, q: "동사 원형 뒤 결합: '나는 씻을 것이다' (ir a lavarse)", options: ['voy a me lavar.', 'voy a lavarme.'], answer: 1, explain: "동사 원형 뒤에 재귀대명사를 붙여서 한 단어로 쓸 수 있습니다." },
    { id: 3, q: "타동사 vs 재귀동사: '그는 손을 씻는다' (자신의 손)", options: ['lava las manos.', 'se lava las manos.'], answer: 1, explain: "자신의 신체 부위를 씻을 때는 재귀동사(se lava)를 사용하며, 소유격 대신 정관사(las)를 씁니다." },
    { id: 4, q: "재귀대명사 일치: nosotros ( ) acostamos tarde.", options: ['nos', 'os', 'se'], answer: 0, explain: "nosotros 주어에 맞는 재귀대명사는 nos입니다." }
];

export default function ReflexiveVerbsDetail() {
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
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 29</span>
                <ChevronRight size={10} />
                <span>Intermediate Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              재귀동사
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               동작이 주어 자신에게 되돌아오는 동사입니다. <br/>
               일상 습관, 감정 변화 등을 표현할 때 필수적입니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium text-slate-700">
                  <li><strong>재귀대명사</strong>: me, te, se, nos, os, se가 동사 앞에 옵니다.</li>
                  <li><strong>의미 변화</strong>: 타동사(남을 ~하다) vs 재귀동사(자신을 ~하다)를 구분합니다.</li>
                  <li><strong>위치</strong>: 변형 동사 앞, 원형/분사 뒤에 위치할 수 있습니다.</li>
              </ul>
          </div>

          {/* 1. 재귀 대명사와 변화 */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 재귀 대명사와 변화 (levantarse)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">주어에 맞는 재귀 대명사를 동사 바로 앞에 위치시킵니다.</p>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse min-w-[500px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs">
                        <tr>
                            <th className="px-5 py-3 w-1/3 text-center whitespace-nowrap">주어</th>
                            <th className="px-5 py-3 w-1/3 text-center bg-blue-50/50 text-blue-700 whitespace-nowrap">대명사</th>
                            <th className="px-5 py-3 w-1/3 text-center whitespace-nowrap">변화형</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {REFLEXIVE_CONJ.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 text-center font-bold text-slate-400 text-sm whitespace-nowrap">{row.p}</td>
                                <td className="px-5 py-4 font-bold text-blue-600 text-center bg-blue-50/30 border-x border-slate-100 whitespace-nowrap">{row.pro}</td>
                                <td className="px-5 py-4 font-bold text-slate-900 text-center whitespace-nowrap">
                                    <span className="text-blue-600">{row.pro}</span> {row.v}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 2. 주요 용법 */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 주요 용법 및 동사의 의미 변화
            </h2>
            <p className="text-[15px] text-slate-600 mb-6">재귀 대명사 유무에 따라 동작의 대상이 남인지 자신인지가 달라집니다.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-[14px]">
                <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-sm text-center relative overflow-hidden group hover:border-slate-300 transition-colors">
                    <div className="absolute top-0 left-0 w-1 h-full bg-slate-300"></div>
                    <h4 className="font-bold text-xs text-slate-500 mb-3 tracking-widest uppercase flex items-center justify-center gap-2">
                        <ArrowRight size={14}/> 타동사 (남을 ~하다)
                    </h4>
                    <p className="text-slate-900 font-bold text-lg mb-1">lavo el coche.</p>
                    <p className="text-slate-500 text-xs font-medium">나는 차를 닦는다.</p>
                </div>
                <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-xl shadow-sm text-center relative overflow-hidden group hover:border-indigo-200 transition-colors">
                    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-400"></div>
                    <h4 className="font-bold text-xs text-indigo-500 mb-3 tracking-widest uppercase flex items-center justify-center gap-2">
                        <RefreshCw size={14}/> 재귀동사 (자신을 ~하다)
                    </h4>
                    <p className="text-slate-900 font-bold text-lg mb-1"><span className="text-indigo-600">me</span> lavo.</p>
                    <p className="text-indigo-400 text-xs font-medium">나는 (나 자신을) 씻는다.</p>
                </div>
            </div>

            <h3 className="text-[13px] font-black text-slate-400 mb-4 tracking-widest flex items-center gap-2">
                <Bookmark size={14} className="text-slate-300"/> 주요 일상 재귀동사
            </h3>
            <div className="grid grid-cols-1 gap-3">
                {DAILY_REFLEXIVES.map((item, idx) => (
                    <div key={idx} className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 justify-start transition-all
                        ${item.color === 'blue' ? 'bg-blue-50 border-blue-100 text-blue-900' : 
                          item.color === 'indigo' ? 'bg-indigo-50 border-indigo-100 text-indigo-900' : 
                          'bg-rose-50 border-rose-100 text-rose-900'}`}>
                        <span className={`text-[11px] font-bold px-2 py-1 rounded w-fit uppercase tracking-wider
                            ${item.color === 'blue' ? 'bg-blue-100 text-blue-600' : 
                              item.color === 'indigo' ? 'bg-indigo-100 text-indigo-600' : 
                              'bg-rose-100 text-rose-600'}`}>
                            {item.cat}
                        </span>
                        <span className="text-[14px] font-medium">{item.list}</span>
                    </div>
                ))}
            </div>
          </section>

          {/* 3. 위치 규칙 */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 대명사의 위치 규칙
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">목적격 대명사와 동일한 위치 규칙을 따릅니다.</p>
            <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-blue-200 transition-colors group">
                    <span className="text-xs font-bold text-slate-400 w-32 text-center group-hover:text-blue-500 transition-colors">변화형 동사 앞</span>
                    <div className="text-center w-full">
                        <span className="text-[15px] font-bold text-slate-900">me levanto temprano.</span>
                    </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-blue-200 transition-colors group">
                    <span className="text-xs font-bold text-slate-400 w-32 text-center group-hover:text-blue-500 transition-colors">동사 원형 뒤</span>
                    <div className="text-center w-full flex flex-col items-center">
                        <span className="text-[15px] font-bold text-slate-900">voy a levantarme.</span>
                        <span className="text-xs text-slate-400 mt-0.5">(me voy a levantar 도 가능)</span>
                    </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-blue-200 transition-colors group">
                    <span className="text-xs font-bold text-slate-400 w-32 text-center group-hover:text-blue-500 transition-colors">현재분사 뒤</span>
                    <div className="text-center w-full flex flex-col items-center">
                        <span className="text-[15px] font-bold text-slate-900">estoy levantándome.</span>
                        <span className="text-xs text-slate-400 mt-0.5">(me estoy levantando 도 가능)</span>
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
                {['재귀 대명사 표', '주요 용법', '대명사 위치', '연습 문제'].map((item, i) => (
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