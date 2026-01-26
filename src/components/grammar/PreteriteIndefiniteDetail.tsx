'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, CornerDownRight, ArrowRight, Info, AlertTriangle, Calendar
} from 'lucide-react';

const REGULAR_CONJ = [
    { p: 'yo', ar: 'é', er_ir: 'í' },
    { p: 'tú', ar: 'aste', er_ir: 'iste' },
    { p: 'él/ella/ud.', ar: 'ó', er_ir: 'ió' },
    { p: 'nosotros/as', ar: 'amos', er_ir: 'imos' },
    { p: 'vosotros/as', ar: 'asteis', er_ir: 'isteis' },
    { p: 'ellos/ellas/uds.', ar: 'aron', er_ir: 'ieron' }
];

const COMMON_IRREGULARS = [
    { p: 'yo', ser_ir: 'fui', dar: 'di', ver: 'vi' },
    { p: 'tú', ser_ir: 'fuiste', dar: 'diste', ver: 'viste' },
    { p: 'él/ella', ser_ir: 'fue', dar: 'dio', ver: 'vio' },
    { p: 'nosotros', ser_ir: 'fuimos', dar: 'dimos', vimos: 'vimos' },
    { p: 'vosotros', ser_ir: 'fuisteis', dar: 'disteis', ver: 'visteis' },
    { p: 'ellos', ser_ir: 'fueron', dar: 'dieron', ver: 'vieron' }
];

const STEM_GROUPS = [
    { group: 'U-stem', ex: 'tener → tuv-, estar → estuv-, poder → pud-', note: '어미: e, iste, o, imos...' },
    { group: 'I-stem', ex: 'hacer → hic- (3인칭 hizo), querer → quis-', note: '강세 부호 없음' },
    { group: 'J-stem', ex: 'decir → dij-, traer → traj-', note: '3인칭 복수 -eron (i 탈락)' }
];

const QUIZ_DATA = [
    { id: 1, q: "빈칸 채우기: Ayer yo ( ) a la playa. (ir)", options: ['fui', 'fue', 'iba'], answer: 0, explain: "ir(가다)의 점과거 1인칭 단수형은 'fui'입니다. (ser와 동일)" },
    { id: 2, q: "Hacer(하다)의 3인칭 단수(Él) 점과거 형태는?", options: ['hació', 'hizo', 'hiciste'], answer: 1, explain: "Hacer는 I-stem 불규칙이며, 3인칭 단수는 철자 변화로 인해 'hizo'가 됩니다." },
    { id: 3, q: "문장의 오류 수정: Ella pedió un café.", options: ['pedi', 'pidió'], answer: 1, explain: "Pedir는 3인칭에서 모음 변화(e->i)가 일어나 'pidió'가 됩니다." }
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
      <span>{stem}<span className="text-red-600 font-bold">{suffix}</span></span>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto px-6 lg:px-8 py-8 font-sans text-slate-800 bg-white">
      
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

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium">
                  <li><strong>규칙</strong>: 1인칭(-é/-í)과 3인칭(-ó/-ió) 단수에 <strong>강세 부호</strong>가 필수입니다.</li>
                  <li><strong>불규칙</strong>: Ser와 Ir는 형태가 같으며, 어간 변화 그룹(U/I/J)은 강세가 없습니다.</li>
                  <li><strong>용법</strong>: '어제', '작년' 등 명확한 시점과 함께 쓰여 완료된 일을 표현합니다.</li>
              </ul>
          </div>

          {/* 1. 규칙 변화 */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 규칙 변화 (Conjugación Regular)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">1인칭과 3인칭 단수의 강세(Tilde)에 유의하세요. -er과 -ir은 어미가 같습니다.</p>
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 text-left pl-8 w-1/3">주어</th>
                            <th className="px-5 py-3 w-1/3">-ar (hablar)</th>
                            <th className="px-5 py-3 w-1/3">-er / -ir (comer)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {REGULAR_CONJ.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 text-left pl-8 font-bold text-slate-400 text-sm">{row.p}</td>
                                <td className="px-5 py-4 text-slate-900 font-medium">{renderRegular(row.ar, 'habl')}</td>
                                <td className="px-5 py-4 text-slate-900 font-medium">{renderRegular(row.er_ir, 'com')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 2. 주요 불규칙 */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 주요 불규칙 (Ser / Ir, Dar, Ver)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">가장 자주 쓰이는 불규칙 동사들입니다. 강세 부호가 없습니다.</p>
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-2 py-3 text-left pl-5">주어</th>
                            <th className="px-2 py-3">Ser / Ir</th>
                            <th className="px-2 py-3">Dar</th>
                            <th className="px-2 py-3">Ver</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {COMMON_IRREGULARS.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                <td className="px-2 py-4 text-left pl-5 font-bold text-slate-400 text-xs">{row.p}</td>
                                <td className="px-2 py-4 font-bold text-slate-900">{row.ser_ir}</td>
                                <td className="px-2 py-4 font-bold text-slate-900">{row.dar}</td>
                                <td className="px-2 py-4 font-bold text-slate-900">{row.ver}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 3. 어간 변화 불규칙 */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 어간 변화 불규칙 (U, I, J Stems)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">이 그룹은 규칙 어미와 다른 독자적인 어미를 사용하며, 강세를 찍지 않습니다.</p>
            <div className="space-y-4">
                {STEM_GROUPS.map((item, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="font-black text-sm text-slate-800 uppercase tracking-tight">{item.group}</h4>
                            <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded">{item.note}</span>
                        </div>
                        <p className="text-[15px] text-slate-900 font-medium italic">{item.ex}</p>
                    </div>
                ))}
                
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-[14px]">
                    <span className="font-bold text-slate-800 block mb-2">Tener (U-stem) 변화 예시:</span>
                    <div className="flex flex-wrap gap-3 font-medium italic text-slate-900">
                        <span>tuv<span className="text-red-600">e</span></span>
                        <span>tuv<span className="text-red-600">iste</span></span>
                        <span>tuv<span className="text-red-600">o</span></span>
                        <span>tuv<span className="text-red-600">imos</span></span>
                        <span>tuv<span className="text-red-600">isteis</span></span>
                        <span>tuv<span className="text-red-600">ieron</span></span>
                    </div>
                </div>
            </div>
          </section>

          {/* 4. 기타 변화 */}
          <section id="sec-4" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">4.</span> 3인칭 변화 및 시간 부사
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                    <h4 className="font-bold text-sm text-slate-800 mb-3 flex items-center gap-2">
                        <AlertTriangle size={16} className="text-slate-400"/> 3인칭만 변화 (Slipper Verbs)
                    </h4>
                    <ul className="space-y-2 text-[14px] text-slate-600">
                        <li>
                            <span className="font-bold text-slate-900 block mb-1">Pedir (e → i)</span>
                            pedí, pediste, <span className="text-red-600 font-bold">pidió</span>, pedimos, <span className="text-red-600 font-bold">pidieron</span>
                        </li>
                        <li>
                            <span className="font-bold text-slate-900 block mb-1">Dormir (o → u)</span>
                            dormí, dormiste, <span className="text-red-600 font-bold">durmió</span>, dormimos, <span className="text-red-600 font-bold">durmieron</span>
                        </li>
                        <li>
                            <span className="font-bold text-slate-900 block mb-1">Leer (i → y)</span>
                            leí, leíste, <span className="text-red-600 font-bold">leyó</span>, leímos, <span className="text-red-600 font-bold">leyeron</span>
                        </li>
                    </ul>
                </div>
                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                    <h4 className="font-bold text-sm text-slate-800 mb-3 flex items-center gap-2">
                        <Calendar size={16} className="text-slate-400"/> 자주 쓰이는 시간 부사
                    </h4>
                    <ul className="space-y-2 text-[14px] font-medium">
                        <li className="flex justify-between border-b border-slate-50 pb-1">
                            <span className="text-slate-900 italic">ayer</span> <span className="text-slate-400 text-xs">어제</span>
                        </li>
                        <li className="flex justify-between border-b border-slate-50 pb-1">
                            <span className="text-slate-900 italic">anoche</span> <span className="text-slate-400 text-xs">어젯밤</span>
                        </li>
                        <li className="flex justify-between border-b border-slate-50 pb-1">
                            <span className="text-slate-900 italic">el año pasado</span> <span className="text-slate-400 text-xs">작년</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="text-slate-900 italic">hace dos días</span> <span className="text-slate-400 text-xs">이틀 전에</span>
                        </li>
                    </ul>
                </div>
            </div>
          </section>

          {/* 연습 문제 */}
          <section id="sec-5" className="scroll-mt-24 pt-8 border-t border-slate-200">
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
                {['규칙 변화', '주요 불규칙', '어간 변화(U/I/J)', '3인칭 변화', '연습 문제'].map((item, i) => (
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