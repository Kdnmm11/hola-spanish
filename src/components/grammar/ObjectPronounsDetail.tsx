'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, CornerDownRight, ArrowRight, Info, AlertTriangle, Layers, Shuffle
} from 'lucide-react';

const PRONOUN_TABLE = [
    { p: '1인칭', sg: 'me', pl: 'nos', do: '나/우리를', io: '나/우리에게' },
    { p: '2인칭', sg: 'te', pl: 'os', do: '너/너희를', io: '너/너희에게' },
    { p: '3인칭', sg: 'lo / la', pl: 'los / las', do: '그/그녀/당신(들)을', io: 'le (se) / les (se)' }
];

const PLACEMENT_RULES = [
    { cond: '변형된 동사 앞', ex: 'lo veo. (그것을 본다)', note: '띄어 씀' },
    { cond: '동사 원형/현재분사 뒤', ex: 'quiero verlo. (그것을 보고 싶다)', note: '붙여 씀' },
    { cond: '긍정 명령문 뒤', ex: '¡dámelo! (그것을 나에게 줘)', note: '붙여 씀' }
];

const QUIZ_DATA = [
    { id: 1, q: "'Yo compro las flores'를 대명사로 바꾸면?", options: ['Yo las compro.', 'Yo compro las.', 'Yo les compro.'], answer: 0, explain: "las flores(여성 복수)는 직접 목적격 las로 받으며, 변형된 동사 앞에 위치합니다." },
    { id: 2, q: "'그에게 그것을 준다' (le + lo + doy)의 올바른 형태는?", options: ['Le lo doy.', 'Se lo doy.', 'Lo le doy.'], answer: 1, explain: "3인칭 간접(le)과 직접(lo)이 만나면 le가 se로 변합니다 (La-la rule)." },
    { id: 3, q: "동사 원형 뒤에 결합: 'Quiero decir (그것을 너에게)'", options: ['Quiero te lo decir.', 'Quiero decirtelo.'], answer: 1, explain: "동사 원형 뒤에 붙일 때는 [동사+간접+직접] 순서로 붙여 씁니다." }
];

export default function ObjectPronounsDetail() {
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
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 19</span>
                <ChevronRight size={10} />
                <span>Basic Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              목적격 대명사와 중복 구조
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               직접 목적어(~을/를)와 간접 목적어(~에게)의 형태 및 위치 규칙, <br/>
               그리고 두 대명사가 함께 쓰일 때의 순서와 변화를 학습합니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium">
                  <li><strong>형태</strong>: me, te, nos, os는 직/간접 형태가 같습니다. 3인칭만 lo/la vs le로 구분됩니다.</li>
                  <li><strong>위치</strong>: 동사 앞(분리) 또는 원형/명령 뒤(결합)에 옵니다.</li>
                  <li><strong>순서</strong>: 간접(~에게) + 직접(~을) 순서입니다. (ID 규칙)</li>
                  <li><strong>Se 변신</strong>: le/les 뒤에 lo/la가 오면 se로 바뀝니다.</li>
              </ul>
          </div>

          {/* 1. 형태 표 */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 목적격 대명사의 형태
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">3인칭을 제외하고는 직접/간접 목적격의 형태가 동일합니다.</p>
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-left border-collapse">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 w-20">인칭</th>
                            <th className="px-5 py-3 text-center">직접 (Direct)</th>
                            <th className="px-5 py-3 text-center">간접 (Indirect)</th>
                            <th className="px-5 py-3 text-right pr-8">의미</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {PRONOUN_TABLE.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 font-bold text-slate-400 bg-slate-50/30 border-r border-slate-100 text-sm">{row.p}</td>
                                <td className="px-5 py-4 font-bold text-slate-900 text-center border-r border-slate-50">{row.sg} / {row.pl}</td>
                                <td className="px-5 py-4 font-bold text-slate-900 text-center">{row.sg === 'lo / la' ? row.io : `${row.sg} / ${row.pl}`}</td>
                                <td className="px-5 py-4 text-right pr-8 text-xs text-slate-500">
                                    {row.do} <br/> {row.io === 'le (se) / les (se)' ? '그에게 / 그들에게' : row.io}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 2. 위치 규칙 */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 대명사의 위치 규칙
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">동사의 형태에 따라 대명사를 앞에 띄어 쓰거나 뒤에 붙여 씁니다.</p>
            <div className="space-y-3">
                {PLACEMENT_RULES.map((item, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3 mb-2 sm:mb-0">
                            <span className="text-xs font-black text-slate-400 uppercase w-24 shrink-0">{item.cond}</span>
                            <div className="flex flex-col">
                                <span className="text-[15px] font-bold text-slate-900 italic">{item.ex.split('(')[0]}</span>
                                <span className="text-xs text-slate-400">{item.ex.split('(')[1]?.replace(')', '')}</span>
                            </div>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded ${item.note === '띄어 씀' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                            {item.note}
                        </span>
                    </div>
                ))}
            </div>
          </section>

          {/* 3. 중복 사용 및 변화 */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 중복 사용 시 순서와 변화
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">두 대명사가 만날 때의 순서와 'se'로의 형태 변화를 익힙니다.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                    <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                        <Layers size={16} className="text-slate-400"/> ID 규칙 (순서)
                    </h4>
                    <p className="text-[14px] text-slate-600 mb-3 font-medium">항상 <strong>[간접 + 직접]</strong> 순서입니다.</p>
                    <div className="bg-slate-50 p-3 rounded-lg text-center font-bold text-slate-900 italic">
                        me lo da. <span className="text-slate-400 text-xs font-normal not-italic ml-2">(나에게 그것을 준다)</span>
                    </div>
                </div>

                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                    <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                        <Shuffle size={16} className="text-slate-400"/> La-la Rule (변화)
                    </h4>
                    <p className="text-[14px] text-slate-600 mb-3 font-medium">le/les 뒤에 lo/la/los/las가 오면 <strong>se</strong>로 바뀝니다.</p>
                    <div className="flex items-center justify-center gap-3 bg-slate-50 p-3 rounded-lg text-sm font-bold">
                        <span className="text-slate-400 line-through decoration-red-400">le lo</span>
                        <ArrowRight size={14} className="text-slate-300" />
                        <span className="text-slate-900 italic">se lo</span>
                    </div>
                </div>
            </div>
          </section>

          {/* 4. 중복 목적어 */}
          <section id="sec-4" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">4.</span> 중복 목적어 구조
            </h2>
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <Info size={18} className="text-slate-400" />
                    <h4 className="font-bold text-sm text-slate-800 uppercase">강조와 명확성</h4>
                </div>
                <p className="text-[14px] text-slate-700 leading-relaxed font-medium mb-3">
                    명사 목적어가 있어도 대명사를 한 번 더 써주는 것이 자연스럽습니다. 특히 간접 목적어는 필수입니다.
                </p>
                <div className="bg-white p-3 rounded border border-slate-200 text-sm">
                    <span className="text-slate-900 font-bold italic">Le</span> doy el regalo <span className="text-slate-900 font-bold italic">a Juan</span>. 
                    <span className="text-slate-400 text-xs ml-2 block mt-1">(Le와 a Juan이 같은 대상을 가리킴)</span>
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
                {['대명사 형태', '위치 규칙', '순서와 변화', '중복 목적어', '연습 문제'].map((item, i) => (
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