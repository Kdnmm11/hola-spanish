'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, CornerDownRight, ArrowRight, Info, AlertTriangle, Repeat, MessageSquare
} from 'lucide-react';

const TENSE_SHIFT = [
    { direct: '현재', indirect: '선과거', ex_d: 'tengo hambre', ex_i: 'dijo que tenía hambre' },
    { direct: '점과거 / 현재완료', indirect: '과거완료', ex_d: 'fui / he ido', ex_i: 'dijo que había ido' },
    { direct: '미래', indirect: '조건형', ex_d: 'iré mañana', ex_i: 'dijo que iría al día siguiente' },
    { direct: '명령형', indirect: '접속법 과거', ex_d: '¡come!', ex_i: 'me dijo que comiera' }
];

const ADVERB_SHIFT = [
    { cat: '시간', direct: 'hoy', arrow: '→', indirect: 'ese día' },
    { cat: '시간', direct: 'mañana', arrow: '→', indirect: 'al día siguiente' },
    { cat: '시간', direct: 'ayer', arrow: '→', indirect: 'el día anterior' },
    { cat: '시간', direct: 'ahora', arrow: '→', indirect: 'entonces' },
    { cat: '장소', direct: 'aquí', arrow: '→', indirect: 'allí / allá' },
    { cat: '지시', direct: 'este', arrow: '→', indirect: 'ese / aquel' }
];

const QUIZ_DATA = [
    { id: 1, q: "간접화법 변환: 'Estoy cansado.' (Dijo que...)", options: ['está cansado', 'estaba cansado', 'estuve cansado'], answer: 1, explain: "직접화법의 현재(estoy)는 전달 동사가 과거일 때 선과거(estaba)로 바뀝니다." },
    { id: 2, q: "명령문 전달: '¡Estudia!' (Me dijo que...)", options: ['estudie', 'estudiara', 'estudiaba'], answer: 1, explain: "명령문은 전달 시 접속법 과거(estudiara)로 바뀝니다. (~하라고 말했다)" },
    { id: 3, q: "시간 부사 변화: 'Mañana'는 간접화법에서 무엇으로 변하나요?", options: ['ayer', 'al día siguiente', 'mañana mismo'], answer: 1, explain: "화자의 시점이 과거로 이동하므로 '내일'은 '그 다음 날(al día siguiente)'이 됩니다." }
];

export default function IndirectSpeechDetail() {
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
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 34</span>
                <ChevronRight size={10} />
                <span>Advanced Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              화법 전환과 시제 일치
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               누군가의 말을 전달할 때 시점의 변화에 따라 시제와 부사가 어떻게 바뀌는지 학습합니다. <br/>
               '시제 후퇴' 규칙을 이해하는 것이 핵심입니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium">
                  <li><strong>시제 후퇴</strong>: 전달 동사가 과거면 종속절 시제는 한 단계 더 과거로 갑니다.</li>
                  <li><strong>부사 변화</strong>: 오늘→그날, 내일→다음 날 등 화자의 시점에 맞춰 바뀝니다.</li>
                  <li><strong>명령문</strong>: 명령이나 요청은 접속법 과거로 전환됩니다.</li>
              </ul>
          </div>

          {/* 1. 시제 일치 */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 시제 일치 규칙 (Sequence of Tenses)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">전달 동사가 과거일 때 일어나는 시제 변화입니다.</p>
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-left border-collapse">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 w-1/4">직접화법</th>
                            <th className="px-5 py-3 w-1/4">간접화법</th>
                            <th className="px-5 py-3 text-right pr-8">예시 (Dijo que...)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {TENSE_SHIFT.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100">{row.direct}</td>
                                <td className="px-5 py-4 font-bold text-blue-600">{row.indirect}</td>
                                <td className="px-5 py-4 text-right pr-8">
                                    <div className="flex flex-col items-end">
                                        <span className="text-slate-400 text-xs line-through mb-1">"{row.ex_d}"</span>
                                        <span className="text-slate-900 font-bold italic">{row.ex_i}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 2. 부사 변화 */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 지시어와 시간 부사의 변화
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">시점과 장소가 달라지므로 부사도 그에 맞게 변경해야 합니다.</p>
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                    <div className="p-5 space-y-3">
                        {ADVERB_SHIFT.slice(0, 3).map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between">
                                <span className="font-bold text-slate-900 italic w-20">{item.direct}</span>
                                <ArrowRight size={14} className="text-slate-300" />
                                <span className="font-bold text-blue-600 italic text-right w-32">{item.indirect}</span>
                            </div>
                        ))}
                    </div>
                    <div className="p-5 space-y-3">
                        {ADVERB_SHIFT.slice(3).map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between">
                                <span className="font-bold text-slate-900 italic w-20">{item.direct}</span>
                                <ArrowRight size={14} className="text-slate-300" />
                                <span className="font-bold text-blue-600 italic text-right w-32">{item.indirect}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          </section>

          {/* 3. 명령문 전환 */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 명령문의 화법 전환 (Subjunctive)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">명령이나 요청은 <span className="text-slate-900 font-bold">접속법 과거</span>로 바뀝니다.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-sm">
                    <h4 className="font-bold text-sm text-slate-800 mb-3 uppercase tracking-tight">긍정 명령</h4>
                    <div className="space-y-2">
                        <p className="text-slate-400 text-xs italic">"haz la tarea."</p>
                        <div className="flex items-center gap-2">
                            <ArrowRight size={14} className="text-slate-300"/>
                            <p className="text-slate-900 font-bold italic">me dijo que <span className="text-blue-600">hiciera</span> la tarea.</p>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">나에게 숙제를 하라고 말했다.</p>
                    </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-sm">
                    <h4 className="font-bold text-sm text-slate-800 mb-3 uppercase tracking-tight">부정 명령</h4>
                    <div className="space-y-2">
                        <p className="text-slate-400 text-xs italic">"no salgas."</p>
                        <div className="flex items-center gap-2">
                            <ArrowRight size={14} className="text-slate-300"/>
                            <p className="text-slate-900 font-bold italic">me pidió que <span className="text-blue-600">no saliera</span>.</p>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">나에게 나가지 말라고 부탁했다.</p>
                    </div>
                </div>
            </div>
          </section>

          {/* 4. 의문문 전환 */}
          <section id="sec-4" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">4.</span> 의문문의 화법 전환
            </h2>
            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm space-y-4">
                <div className="flex flex-col gap-2 border-b border-slate-100 pb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase">의문사 없는 경우 (Yes/No)</span>
                    <p className="text-slate-900 font-medium">접속사 <span className="text-slate-900 font-bold bg-yellow-100 px-1 rounded">si</span> (~인지 아닌지)를 사용합니다.</p>
                    <div className="flex items-center gap-2 text-sm italic mt-1">
                        <span className="text-slate-400">"¿tienes dinero?"</span>
                        <ArrowRight size={12} className="text-slate-300"/>
                        <span className="text-slate-900 font-bold">me preguntó <span className="text-blue-600">si tenía</span> dinero.</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold text-slate-400 uppercase">의문사 있는 경우</span>
                    <p className="text-slate-900 font-medium">의문사를 그대로 쓰되 <span className="text-slate-900 font-bold">강세 부호</span>는 유지합니다.</p>
                    <div className="flex items-center gap-2 text-sm italic mt-1">
                        <span className="text-slate-400">"¿dónde vives?"</span>
                        <ArrowRight size={12} className="text-slate-300"/>
                        <span className="text-slate-900 font-bold">me preguntó <span className="text-blue-600">dónde vivía</span>.</span>
                    </div>
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
                    <div key={q.id} className="bg-slate-50 p-4 rounded-lg border border-slate-200 shadow-sm text-[15px]">
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
                {['시제 일치 규칙', '부사 변화', '명령문 전환', '의문문 전환', '연습 문제'].map((item, i) => (
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