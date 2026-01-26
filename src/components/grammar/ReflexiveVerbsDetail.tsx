'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, CornerDownRight, ArrowRight, Info, AlertTriangle, User
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
    { cat: '신체 습관', list: 'ducharse (샤워), cepillarse (양치), peinarse (빗질)' },
    { cat: '상태 변화', list: 'sentarse (앉다), dormirse (잠들다), enamorarse (반하다)' },
    { cat: '감정 변화', list: 'enojarse (화나다), preocuparse (걱정하다)' }
];

const QUIZ_DATA = [
    { id: 1, q: "빈칸 채우기: Yo ( ) ( ) a las siete. (despertarse, e-ie)", options: ['me despierto', 'se despierta', 'despierto me'], answer: 0, explain: "1인칭 단수 주어(yo)에 맞는 재귀대명사 me와 어간 변화(e-ie)된 동사를 동사 앞에 씁니다." },
    { id: 2, q: "동사 원형 뒤 결합: '나는 씻을 것이다' (ir a lavarse)", options: ['Voy a me lavar.', 'Voy a lavarme.'], answer: 1, explain: "동사 원형 뒤에 재귀대명사를 붙여서 한 단어로 쓸 수 있습니다." },
    { id: 3, q: "타동사 vs 재귀동사: '그는 손을 씻는다' (자신의 손)", options: ['Lava las manos.', 'Se lava las manos.'], answer: 1, explain: "자신의 신체 부위를 씻을 때는 재귀동사(se lava)를 사용하며, 소유격 대신 정관사(las)를 씁니다." }
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
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium">
                  <li><strong>재귀대명사</strong>: me, te, se, nos, os, se가 동사 앞에 옵니다.</li>
                  <li><strong>의미 변화</strong>: 타동사(남을 ~하다) vs 재귀동사(자신을 ~하다)를 구분합니다.</li>
                  <li><strong>위치</strong>: 변형 동사 앞, 원형/분사 뒤에 위치할 수 있습니다.</li>
              </ul>
          </div>

          {/* 1. 재귀 대명사와 변화 */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 재귀 대명사와 변화 (levantarse)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">주어에 맞는 재귀 대명사를 동사 바로 앞에 위치시킵니다.</p>
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 w-1/3 text-left pl-8">주어</th>
                            <th className="px-5 py-3 w-1/3">대명사</th>
                            <th className="px-5 py-3 w-1/3">변화형</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {REFLEXIVE_CONJ.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 text-left pl-8 font-bold text-slate-400 text-sm">{row.p}</td>
                                <td className="px-5 py-4 font-bold text-blue-600">{row.pro}</td>
                                <td className="px-5 py-4 font-bold text-slate-900">{row.pro} {row.v}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 2. 주요 용법 */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 주요 용법 및 동사의 의미 변화
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">재귀 대명사 유무에 따라 동작의 대상이 남인지 자신인지가 달라집니다.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-[14px]">
                <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-xs text-slate-400 uppercase mb-2">타동사 (남을 ~하다)</h4>
                    <p className="text-slate-900 font-bold italic">lavo el coche.</p>
                    <p className="text-slate-500 text-xs mt-1">나는 차를 닦는다.</p>
                </div>
                <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-xs text-blue-500 uppercase mb-2">재귀동사 (자신을 ~하다)</h4>
                    <p className="text-slate-900 font-bold italic"><span className="text-blue-600">me</span> lavo.</p>
                    <p className="text-slate-500 text-xs mt-1">나는 (나 자신을) 씻는다.</p>
                </div>
            </div>

            <h3 className="text-[13px] font-black text-slate-400 mb-3 uppercase tracking-widest pl-2 border-l-2 border-slate-200">주요 일상 재귀동사</h3>
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="divide-y divide-slate-100">
                    {DAILY_REFLEXIVES.map((item, idx) => (
                        <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded w-fit">{item.cat}</span>
                            <span className="text-[14px] text-slate-900 font-medium">{item.list}</span>
                        </div>
                    ))}
                </div>
            </div>
          </section>

          {/* 3. 위치 규칙 */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 대명사의 위치 규칙
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">목적격 대명사와 동일한 위치 규칙을 따릅니다.</p>
            <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
                    <span className="text-xs font-bold text-slate-400 uppercase w-32">변화형 동사 앞</span>
                    <div className="text-right">
                        <span className="text-[15px] font-bold text-slate-900 italic">me levanto temprano.</span>
                    </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
                    <span className="text-xs font-bold text-slate-400 uppercase w-32">동사 원형 뒤</span>
                    <div className="text-right flex flex-col items-end">
                        <span className="text-[15px] font-bold text-slate-900 italic">voy a levantarme.</span>
                        <span className="text-xs text-slate-400 mt-0.5">(me voy a levantar 도 가능)</span>
                    </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
                    <span className="text-xs font-bold text-slate-400 uppercase w-32">현재분사 뒤</span>
                    <div className="text-right flex flex-col items-end">
                        <span className="text-[15px] font-bold text-slate-900 italic">estoy levantándome.</span>
                        <span className="text-xs text-slate-400 mt-0.5">(me estoy levantando 도 가능)</span>
                    </div>
                </div>
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