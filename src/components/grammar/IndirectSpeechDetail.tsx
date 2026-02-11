'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, ArrowRight, Info, Repeat, MessageSquare, Clock, Lightbulb
} from 'lucide-react';

const TENSE_SHIFT_DATA = [
    { 
        title: '말할 때 현재 → 전달할 때 과거', 
        desc: '"오늘 ~해"라고 말한 현재 시점의 말은 전달 시 과거(선과거)가 됩니다.',
        direct: 'Tengo hambre.', direct_ko: '배고파.',
        indirect: 'Dijo que tenía hambre.', indirect_ko: '배가 고프다고 말했다.'
    },
    { 
        title: '말할 때 과거 → 전달할 때 대과거', 
        desc: '"어제 ~했어"라고 말한 과거의 일은 전달 시 한 단계 더 과거인 과거완료가 됩니다.',
        direct: 'Comí pizza.', direct_ko: '피자 먹었어.',
        indirect: 'Dijo que había comido pizza.', indirect_ko: '피자를 먹었었다고 말했다.'
    },
    { 
        title: '말할 때 미래 → 전달할 때 조건형', 
        desc: '"내일 ~할게"라는 미래의 계획은 전달 시 과거에서 바라본 미래인 조건형이 됩니다.',
        direct: 'Iré mañana.', direct_ko: '내일 갈게.',
        indirect: 'Dijo que iría al día siguiente.', indirect_ko: '다음 날 갈 것이라고 말했다.'
    }
];

const ADVERB_SHIFT = [
    { direct: 'hoy (오늘)', arrow: '→', indirect: 'ese día (그날)' },
    { direct: 'mañana (내일)', arrow: '→', indirect: 'al día siguiente (다음 날)' },
    { direct: 'ayer (어제)', arrow: '→', indirect: 'el día anterior (전날)' },
    { direct: 'ahora (지금)', arrow: '→', indirect: 'entonces (그때)' },
    { direct: 'aquí (여기)', arrow: '→', indirect: 'allí / allá (거기/저기)' },
    { direct: 'este (이것)', arrow: '→', indirect: 'ese / aquel (그것/저것)' }
];

const QUIZ_DATA = [
    { id: 1, q: "간접화법 변환: 'Estoy cansado.' (Dijo que...)", options: ['está cansado', 'estaba cansado', 'estuve cansado'], answer: 1, explain: "직접화법의 현재(estoy)는 전달 동사가 과거일 때 한 단계 과거인 선과거(estaba)로 바뀝니다." },
    { id: 2, q: "명령문 전달: '¡Estudia!' (Me dijo que...)", options: ['estudie', 'estudiara', 'estudiaba'], answer: 1, explain: "명령문은 전달 시 접속법 과거(estudiara)로 바뀝니다. (~하라고 말했다)" },
    { id: 3, q: "시간 부사 변화: 'Mañana'는 간접화법에서 무엇으로 변하나요?", options: ['ayer', 'al día siguiente', 'mañana mismo'], answer: 1, explain: "말하는 시점이 과거로 이동하므로 '내일'은 '그 다음 날(al día siguiente)'이 됩니다." },
    { id: 4, q: "의문사 없는 질문 전달: '¿Tienes hambre?' (Me preguntó...)", options: ['si tenía hambre', 'que tenía hambre', 'tenía hambre'], answer: 0, explain: "의문사 없는 Yes/No 질문은 '~인지 아닌지'를 뜻하는 접속사 si를 사용하여 전달합니다." }
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
    <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto px-2 sm:px-3 lg:px-4 pt-1.5 pb-8 font-sans text-slate-800 bg-white">
      
      <article className="flex-1 min-w-0">
          <header className="mb-12 border-b border-slate-200 pb-8">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 tracking-widest mb-3">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 39</span>
                <ChevronRight size={10} />
                <span>Advanced Level</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
              화법 전환과 시제 일치
            </h1>
            <p className="text-[16px] text-slate-600 font-medium leading-relaxed max-w-3xl">
               누군가가 한 말을 제3자에게 전달할 때 사용하는 문법입니다. <br/>
               시간의 흐름에 따라 <strong>시제를 한 단계씩 과거로</strong> 미는 규칙만 이해하면 쉽습니다!
            </p>
          </header>

          <div className="mb-12 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium text-slate-700">
                  <li><strong>시제 후퇴</strong>: 전달하는 시점이 과거이므로, 원래 했던 말보다 한 단계 과거로 바꿉니다.</li>
                  <li><strong>부사 변화</strong>: 오늘 → 그날, 내일 → 다음 날 등 상대적 시간을 절대적 시간으로 바꿉니다.</li>
                  <li><strong>전달 동사</strong>: Decir(말하다), Preguntar(묻다), Pedir(부탁하다) 등이 주로 쓰입니다.</li>
              </ul>
          </div>

          {/* 1. 시제 일치 */}
          <section id="sec-1" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 시제 후퇴 규칙 (Tense Shift)
            </h2>
            <p className="text-[15px] text-slate-600 mb-8 font-medium">전달하는 사람이 "그가 ~라고 말했다(Dijo que...)"라고 과거 시점으로 말할 때 일어나는 변화입니다.</p>
            
            <div className="space-y-4 max-w-5xl">
                {TENSE_SHIFT_DATA.map((item, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-300 transition-all overflow-hidden flex flex-col sm:flex-row">
                        {/* 왼쪽 수직 레이아웃 열 */}
                        <div className="sm:w-28 bg-blue-50/50 p-4 flex flex-col items-center justify-center border-b sm:border-b-0 sm:border-r border-slate-100 text-center gap-1">
                            <span className="text-[11px] font-bold text-blue-400 leading-tight">말할 때<br/>{item.title.split(' → ')[0].split(' ')[2]}</span>
                            <span className="text-blue-300 font-bold text-sm">↓</span>
                            <span className="text-[11px] font-bold text-blue-700 leading-tight">전달할 때<br/>{item.title.split(' → ')[1].split(' ')[2]}</span>
                        </div>
                        {/* 오른쪽 콘텐츠 열 */}
                        <div className="flex-1 p-5">
                            <p className="text-sm text-slate-600 mb-3 leading-relaxed font-medium">
                                {item.desc}
                            </p>
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-4">
                                <div className="flex items-start">
                                    <div className="w-16 flex-shrink-0 mt-1">
                                        <span className="text-[9px] font-bold text-slate-400 uppercase bg-white px-1.5 py-0.5 rounded border border-slate-100">원래</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-[15px] text-slate-400 font-bold italic line-through">"{item.direct}"</p>
                                        <span className="text-[11px] text-slate-400 font-medium">{item.direct_ko}</span>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-16 flex-shrink-0 mt-1">
                                        <span className="text-[9px] font-bold text-slate-900 uppercase bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-sm">전달</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-[16px] text-slate-900 font-bold">"{item.indirect}"</p>
                                        <span className="text-[11px] text-slate-500 font-medium">{item.indirect_ko}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          </section>

          {/* 2. 부사 변화 */}
          <section id="sec-2" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 지시어와 시간 부사의 변화
            </h2>
            <p className="text-[15px] text-slate-600 mb-6 font-medium">전달하는 사람의 위치와 시간이 바뀌었으므로 부사도 그에 맞게 교체해야 합니다.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl">
                {ADVERB_SHIFT.map((item, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:border-blue-300 transition-all flex flex-col items-center text-center group">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter mb-4 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
                            {idx < 4 ? '시간' : idx === 4 ? '장소' : '지시'}
                        </span>
                        <div className="flex flex-col items-center gap-3">
                            <span className="text-[16px] font-bold text-slate-600 line-through decoration-slate-400 italic">
                                {item.direct}
                            </span>
                            <div className="bg-slate-50 p-1.5 rounded-full">
                                <ArrowRight size={16} className="text-slate-400 rotate-90" />
                            </div>
                            <span className="text-[18px] font-bold text-slate-900">
                                {item.indirect}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
          </section>

          {/* 3. 명령문 전환 */}
          <section id="sec-3" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 명령문의 화법 전환 (Subjunctive)
            </h2>
            <p className="text-[15px] text-slate-600 mb-8 font-medium">명령이나 요청은 <span className="text-slate-900 font-bold">접속법 과거</span>로 바뀝니다.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl">
                {/* 긍정 명령 */}
                <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:border-slate-300 transition-all flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <Repeat size={18} className="text-slate-400" />
                        <h3 className="font-bold text-base text-slate-800 tracking-tight">긍정 명령 전달</h3>
                    </div>
                    <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 flex flex-col gap-4">
                        <div className="flex items-start">
                            <div className="w-16 flex-shrink-0 mt-1">
                                <span className="text-[9px] font-bold text-slate-400 uppercase bg-white px-1.5 py-0.5 rounded border border-slate-100">원래</span>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-[15px] text-slate-400 font-bold italic line-through">"Haz la tarea."</p>
                                <span className="text-[11px] text-slate-400 font-medium">(숙제 해라)</span>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="w-16 flex-shrink-0 mt-1">
                                <span className="text-[9px] font-bold text-slate-900 uppercase bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-sm">전달</span>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-[16px] text-slate-900 font-bold">"Me dijo que <span className="text-slate-900">hiciera</span> la tarea."</p>
                                <span className="text-[11px] text-slate-500 font-medium">(나에게 숙제를 하라고 말했다)</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 부정 명령 */}
                <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:border-slate-300 transition-all flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <Repeat size={18} className="text-slate-400" />
                        <h3 className="font-bold text-base text-slate-800 tracking-tight">부정 명령 전달</h3>
                    </div>
                    <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 flex flex-col gap-4">
                        <div className="flex items-start">
                            <div className="w-16 flex-shrink-0 mt-1">
                                <span className="text-[9px] font-bold text-slate-400 uppercase bg-white px-1.5 py-0.5 rounded border border-slate-100">원래</span>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-[15px] text-slate-400 font-bold italic line-through">"No salgas."</p>
                                <span className="text-[11px] text-slate-400 font-medium">(나가지 마라)</span>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="w-16 flex-shrink-0 mt-1">
                                <span className="text-[9px] font-bold text-slate-900 uppercase bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-sm">전달</span>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-[16px] text-slate-900 font-bold">"Me pidió que <span className="text-slate-900">no saliera</span>."</p>
                                <span className="text-[11px] text-slate-500 font-medium">(나에게 나가지 말라고 부탁했다)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </section>

          {/* 4. 의문문 전환 */}
          <section id="sec-4" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600">4.</span> 의문문의 화법 전환
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl">
                {/* 의문사 없는 질문 */}
                <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:border-slate-300 transition-all flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <MessageSquare size={18} className="text-slate-400" />
                        <h3 className="font-bold text-base text-slate-800 tracking-tight">의문사 없는 질문 (Yes/No)</h3>
                    </div>
                    <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex flex-col gap-4">
                        <div className="flex items-start">
                            <div className="w-16 flex-shrink-0 mt-1">
                                <span className="text-[9px] font-bold text-slate-400 uppercase bg-white px-1.5 py-0.5 rounded border border-slate-100">원래</span>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-[15px] text-slate-400 font-bold italic line-through">"¿Tienes hambre?"</p>
                                <span className="text-[11px] text-slate-400 font-medium">(배고프니?)</span>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="w-16 flex-shrink-0 mt-1">
                                <span className="text-[9px] font-bold text-slate-900 uppercase bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-sm">전달</span>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-[16px] text-slate-900 font-bold">"Me preguntó <span className="text-slate-900 font-bold">si tenía</span> hambre."</p>
                                <span className="text-[11px] text-slate-500 font-medium">(나에게 배가 고픈지 물었다)</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 의문사 있는 질문 */}
                <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:border-slate-300 transition-all flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <MessageSquare size={18} className="text-slate-400" />
                        <h3 className="font-bold text-base text-slate-800 tracking-tight">의문사 있는 질문</h3>
                    </div>
                    <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex flex-col gap-4">
                        <div className="flex items-start">
                            <div className="w-16 flex-shrink-0 mt-1">
                                <span className="text-[9px] font-bold text-slate-400 uppercase bg-white px-1.5 py-0.5 rounded border border-slate-100">원래</span>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-[15px] text-slate-400 font-bold italic line-through">"¿Dónde vives?"</p>
                                <span className="text-[11px] text-slate-400 font-medium">(어디 사니?)</span>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="w-16 flex-shrink-0 mt-1">
                                <span className="text-[9px] font-bold text-slate-900 uppercase bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-sm">전달</span>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-[16px] text-slate-900 font-bold">"Me preguntó <span className="text-slate-900 font-bold">dónde vivía</span>."</p>
                                <span className="text-[11px] text-slate-500 font-medium">(나에게 어디 사는지 물었다)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </section>

          {/* 연습 문제 */}
          <section id="sec-5" className="scroll-mt-24 pt-8 border-t border-slate-200">
             <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Lightbulb className="text-yellow-500 fill-yellow-500" size={20} />
                기초 다지기 (Práctica)
             </h2>
             <div className="space-y-4">
                {QUIZ_DATA.map((q, idx) => (
                    <div key={q.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-all">
                        <div className="flex items-start gap-3 mb-4">
                            <span className="bg-indigo-100 text-indigo-600 text-xs font-bold px-2.5 py-1 rounded-full mt-0.5">Q{idx + 1}</span>
                            <p className="font-bold text-slate-900 text-base leading-snug whitespace-pre-wrap">{q.q}</p>
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
            <h4 className="text-[10px] font-bold text-slate-400 tracking-widest mb-4">On this page</h4>
            <ul className="space-y-3 text-[13px]">
                {['시제 후퇴 규칙', '부사 변화', '명령 전환', '의문 전환', '연습 문제'].map((item, i) => (
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