'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, ArrowRight, Info, AlertTriangle, Calendar, Lightbulb
} from 'lucide-react';

const REGULAR_CONJ = [
    { p: 'yo', ar: 'é', er: 'í', ir: 'í' },
    { p: 'tú', ar: 'aste', er: 'iste', ir: 'iste' },
    { p: 'él/ella/ud.', ar: 'ó', er: 'ió', ir: 'ió' },
    { p: 'nosotros/as', ar: 'amos', er: 'imos', ir: 'imos' },
    { p: 'vosotros/as', ar: 'asteis', er: 'isteis', ir: 'isteis' },
    { p: 'ellos/ellas/uds.', ar: 'aron', er: 'ieron', ir: 'ieron' }
];

const COMMON_IRREGULARS = [
    { p: 'yo', ser_ir: 'fui', dar: 'di', ver: 'vi' },
    { p: 'tú', ser_ir: 'fuiste', dar: 'diste', ver: 'viste' },
    { p: 'él/ella', ser_ir: 'fue', dar: 'dio', ver: 'vio' },
    { p: 'nosotros', ser_ir: 'fuimos', dar: 'dimos', ver: 'vimos' },
    { p: 'vosotros', ser_ir: 'fuisteis', dar: 'disteis', ver: 'visteis' },
    { p: 'ellos', ser_ir: 'fueron', dar: 'dieron', ver: 'vieron' }
];

const STEM_GROUPS = [
    { group: 'u-stem', ex: 'tener → tuv-, estar → estuv-, poder → pud-', note: '어미: e, iste, o, imos...' },
    { group: 'i-stem', ex: 'hacer → hic- (3인칭 hizo), querer → quis-', note: '강세 부호 없음' },
    { group: 'j-stem', ex: 'decir → dij-, traer → traj-', note: '3인칭 복수 -eron (i 탈락)' }
];

const QUIZ_DATA = [
    { id: 1, q: "빈칸 채우기: ayer yo ( ) a la playa. (ir)", options: ['fui', 'fue', 'iba'], answer: 0, explain: "ir(가다)의 점과거 1인칭 단수형은 'fui'입니다. (ser와 동일)" },
    { id: 2, q: "hacer(하다)의 3인칭 단수(él) 점과거 형태는?", options: ['hació', 'hizo', 'hiciste'], answer: 1, explain: "hacer는 i-stem 불규칙이며, 3인칭 단수는 철자 변화로 인해 'hizo'가 됩니다." },
    { id: 3, q: "문장의 오류 수정: ella pedió un café.", options: ['pedi', 'pidió'], answer: 1, explain: "pedir는 3인칭에서 모음 변화(e->i)가 일어나 'pidió'가 됩니다." },
    { id: 4, q: "poder 동사의 1인칭 단수(yo) 형태는?", options: ['podé', 'pude', 'pudí'], answer: 1, explain: "poder는 u-stem 불규칙(pud-)이며, 1인칭 단수 어미 -e를 붙여 pude가 됩니다." }
];

export default function PreteriteIndefiniteDetail() {
  const [quizState, setQuizState] = useState<{ [key: number]: number | null }>({});
  const [showExplain, setShowExplain] = useState<{ [key: number]: boolean }>({});

  const handleQuiz = (qId: number, optIdx: number) => {
    setQuizState(prev => ({ ...prev, [qId]: optIdx }));
    setShowExplain(prev => ({ ...prev, [qId]: true }));
  };

  const scrollTo = (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderRegular = (suffix: string, stem: string) => (
      <span>{stem}<span className="text-indigo-600 font-bold">{suffix}</span></span>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto px-6 lg:px-8 py-8 font-sans text-slate-900 bg-white">
      
      <article className="flex-1 min-w-0">
          <header className="mb-8 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 20</span>
                <ChevronRight size={10} />
                <span>Basic Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              직설법 점과거
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               과거의 특정 시점에 완료된 동작을 나타냅니다. <br/>
               규칙 변화의 강세 부호와 다양한 불규칙 어간 패턴을 학습합니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-900">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-bold text-slate-700">
                  <li><strong>규칙</strong>: 1인칭(-é/-í)과 3인칭(-ó/-ió) 단수에 <strong>강세 부호</strong>가 필수입니다.</li>
                  <li><strong>불규칙</strong>: ser와 ir는 형태가 같으며, 어간 변화 그룹(u/i/j)은 강세가 없습니다.</li>
                  <li><strong>용법</strong>: '어제', '작년' 등 명확한 시점과 함께 쓰여 완료된 일을 표현합니다.</li>
              </ul>
          </div>

          {/* 1. 규칙 변화 */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 규칙 변화 (conjugación regular)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4 font-medium">1인칭과 3인칭 단수의 강세(tilde)에 유의하세요. -er과 -ir은 어미가 같습니다.</p>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-900 font-extrabold border-b border-slate-200 text-[15px]">
                        <tr>
                            <th className="px-5 py-3 text-left pl-8 w-1/4 whitespace-nowrap">주어</th>
                            <th className="px-5 py-3 w-1/4 bg-indigo-50 text-indigo-700 whitespace-nowrap">-ar (hablar)</th>
                            <th className="px-5 py-3 w-1/4 bg-slate-50 text-slate-700 whitespace-nowrap">-er (comer)</th>
                            <th className="px-5 py-3 w-1/4 bg-slate-50 text-slate-700 whitespace-nowrap">-ir (vivir)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {REGULAR_CONJ.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 text-left pl-8 font-bold text-slate-400 text-sm whitespace-nowrap">{row.p}</td>
                                <td className="px-5 py-4 text-slate-900 font-medium bg-indigo-50/10 border-x border-indigo-50 whitespace-nowrap">{renderRegular(row.ar, 'habl')}</td>
                                <td className="px-5 py-4 text-slate-900 font-medium border-r border-slate-50 whitespace-nowrap">{renderRegular(row.er, 'com')}</td>
                                <td className="px-5 py-4 text-slate-900 font-medium whitespace-nowrap">{renderRegular(row.ir, 'viv')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 2. 주요 불규칙 */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 주요 불규칙 (ser / ir, dar, ver)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4 font-medium">가장 자주 쓰이는 불규칙 동사들입니다. 강세 부호가 없습니다.</p>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-900 font-extrabold border-b border-slate-200 text-[15px]">
                        <tr>
                            <th className="px-2 py-3 text-left pl-5 whitespace-nowrap">주어</th>
                            <th className="px-2 py-3 bg-rose-50 text-rose-700 whitespace-nowrap">ser / ir</th>
                            <th className="px-2 py-3 whitespace-nowrap">dar</th>
                            <th className="px-2 py-3 whitespace-nowrap">ver</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {COMMON_IRREGULARS.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                <td className="px-2 py-4 text-left pl-5 font-bold text-slate-400 text-xs whitespace-nowrap">{row.p}</td>
                                <td className="px-2 py-4 font-bold text-rose-700 bg-rose-50/10 border-x border-rose-50 whitespace-nowrap">{row.ser_ir}</td>
                                <td className="px-2 py-4 font-medium text-slate-900 border-r border-slate-50 whitespace-nowrap">{row.dar}</td>
                                <td className="px-2 py-4 font-medium text-slate-900 whitespace-nowrap">{row.ver}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 3. 어간 변화 불규칙 */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 어간 변화 불규칙 (u, i, j stems)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4 font-medium">이 그룹은 규칙 어미와 다른 독자적인 어미를 사용하며, 강세를 찍지 않습니다.</p>
            <div className="space-y-4">
                {STEM_GROUPS.map((item, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm hover:border-indigo-200 transition-colors">
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="font-extrabold text-sm text-indigo-900 tracking-tight">{item.group}</h4>
                            <span className="text-xs text-indigo-500 bg-indigo-50 px-2 py-1 rounded font-bold">{item.note}</span>
                        </div>
                        <p className="text-[15px] text-slate-900 font-bold italic">{item.ex}</p>
                    </div>
                ))}
                
                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 text-[14px]">
                    <span className="font-bold text-indigo-900 block mb-2">tener (u-stem) 변화 예시:</span>
                    <div className="flex flex-wrap gap-3 font-bold text-slate-700">
                        <span>tuv<span className="text-indigo-600">e</span></span>
                        <span>tuv<span className="text-indigo-600">iste</span></span>
                        <span>tuv<span className="text-indigo-600">o</span></span>
                        <span>tuv<span className="text-indigo-600">imos</span></span>
                        <span>tuv<span className="text-indigo-600">isteis</span></span>
                        <span>tuv<span className="text-indigo-600">ieron</span></span>
                    </div>
                </div>
            </div>
          </section>

          {/* 4. 3인칭 변화 */}
          <section id="sec-4" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">4.</span> 3인칭만 변화 (slipper verbs)
            </h2>
            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                <h4 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
                    <AlertTriangle size={16} className="text-amber-500"/> 어간 모음 변화 (e→i, o→u)
                </h4>
                <ul className="space-y-4 text-[15px] text-slate-600">
                    <li>
                        <span className="font-bold text-slate-900 block mb-1">pedir (e → i)</span>
                        <div className="text-slate-900 font-medium">
                            pedí, pediste, <span className="text-amber-600 font-black">pidió</span>, pedimos, <span className="text-amber-600 font-black">pidieron</span>
                        </div>
                    </li>
                    <li>
                        <span className="font-bold text-slate-900 block mb-1">dormir (o → u)</span>
                        <div className="text-slate-900 font-medium">
                            dormí, dormiste, <span className="text-amber-600 font-black">durmió</span>, dormimos, <span className="text-amber-600 font-black">durmieron</span>
                        </div>
                    </li>
                    <li>
                        <span className="font-bold text-slate-900 block mb-1">leer (i → y)</span>
                        <div className="text-slate-900 font-medium">
                            leí, leíste, <span className="text-amber-600 font-black">leyó</span>, leímos, <span className="text-amber-600 font-black">leyeron</span>
                        </div>
                    </li>
                </ul>
            </div>
          </section>

          {/* 5. 시간 부사 */}
          <section id="sec-5" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">5.</span> 자주 쓰이는 시간 부사
            </h2>
            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                <h4 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
                    <Calendar size={16} className="text-indigo-500"/> 점과거의 힌트 단어들
                </h4>
                <ul className="space-y-3 text-[15px] font-medium">
                    <li className="flex justify-between border-b border-slate-50 pb-2">
                        <span className="text-indigo-700 font-bold">ayer</span> <span className="text-slate-500 text-sm">어제</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-50 pb-2">
                        <span className="text-indigo-700 font-bold">anoche</span> <span className="text-slate-500 text-sm">어젯밤</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-50 pb-2">
                        <span className="text-indigo-700 font-bold">el año pasado</span> <span className="text-slate-500 text-sm">작년</span>
                    </li>
                    <li className="flex justify-between">
                        <span className="text-indigo-700 font-bold">hace dos días</span> <span className="text-slate-500 text-sm">이틀 전에</span>
                    </li>
                </ul>
            </div>
          </section>

          {/* 연습 문제 */}
          <section id="sec-6" className="scroll-mt-24 pt-8 border-t border-slate-200">
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
                {['규칙 변화', '주요 불규칙', '어간 변화(u/i/j)', '3인칭 변화', '시간 부사', '연습 문제'].map((item, i) => (
                    <li key={i}>
                        <button onClick={() => scrollTo(`sec-${i+1}`)} className="text-slate-500 hover:text-slate-900 transition-colors text-left flex items-center gap-2 group font-medium">
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