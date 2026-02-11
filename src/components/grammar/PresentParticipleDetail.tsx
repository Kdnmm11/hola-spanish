'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, AlertTriangle, Info, Lightbulb, PlayCircle, Repeat, FastForward, User
} from 'lucide-react';

const QUIZ_DATA = [
    { id: 1, q: "comer(먹다)의 현재분사 형태는?", options: ['comando', 'comiendo', 'comido'], answer: 1, explain: "-er 동사는 어미를 -iendo로 바꿉니다." },
    { id: 2, q: "다음 중 현재진행형 문장은?", options: ['Como pan.', 'Estoy comiendo pan.', 'Voy a comer pan.'], answer: 1, explain: "현재진행형은 'estar + 현재분사' 형태를 취합니다." },
    { id: 3, q: "leer(읽다)의 현재분사 형태는?", options: ['leiendo', 'leyendo', 'leendo'], answer: 1, explain: "모음 사이에 끼인 i는 y로 변하여 leyendo가 됩니다." },
    { id: 4, q: "dormir(자다)의 현재분사 형태는?", options: ['dormiendo', 'durmiendo', 'durmendo'], answer: 1, explain: "어간 모음 o가 u로 변하는 불규칙 동사입니다 (durmiendo)." }
];

export default function PresentParticipleDetail() {
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
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 24</span>
                <ChevronRight size={10} />
                <span>Intermediate Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              현재분사와 진행형
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               영어의 <strong>-ing</strong>에 해당하며, 동작이 <strong>진행 중</strong>임을 나타낼 때 주로 사용합니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-900">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium text-slate-700">
                  <li><strong>형태</strong>: -ar 동사는 <strong>-ando</strong>, -er/-ir 동사는 <strong>-iendo</strong>.</li>
                  <li><strong>진행형</strong>: <strong>estar + 현재분사</strong> (~하고 있다).</li>
                  <li><strong>불규칙</strong>: 모음 끼임(leer → leyendo) 및 어간 변화(pedir → pidiendo) 주의.</li>
              </ul>
          </div>

          {/* 1. 현재분사 만들기 */}
          <section id="sec-1" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 현재분사 만들기 (gerundio)
            </h2>
            <p className="text-[15px] text-slate-600 mb-6 font-medium">동사 원형의 어미를 바꾸어 만듭니다.</p>
            
            <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm mb-6">
                <table className="w-full text-[15px] border-collapse min-w-[500px] table-fixed">
                    <thead className="bg-slate-50 text-slate-900 font-extrabold border-b border-slate-200">
                        <tr>
                            <th className="px-5 py-4 w-1/3 text-center">동사군</th>
                            <th className="px-5 py-4 w-1/3 text-center">어미 변화</th>
                            <th className="px-5 py-4 w-1/3 text-center">예시</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        <tr className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-5 py-6 font-bold text-slate-900 text-center">-ar 동사</td>
                            <td className="px-5 py-6 font-bold text-slate-500 text-center text-lg">
                                -ar → <span className="text-red-500 font-black">-ando</span>
                            </td>
                            <td className="px-5 py-6 text-center text-lg">
                                hablar → <span className="font-bold text-slate-900">habl<span className="text-red-500">ando</span></span>
                            </td>
                        </tr>
                        <tr className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-5 py-6 font-bold text-slate-900 text-center">-er / -ir 동사</td>
                            <td className="px-5 py-6 font-bold text-slate-500 text-center text-lg">
                                -er/-ir → <span className="text-red-500 font-black">-iendo</span>
                            </td>
                            <td className="px-5 py-6 text-center text-lg">
                                comer → <span className="font-bold text-slate-900">com<span className="text-red-500">iendo</span></span><br/>
                                vivir → <span className="font-bold text-slate-900">viv<span className="text-red-500">iendo</span></span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </section>

          {/* 2. 불규칙 형태 */}
          <section id="sec-2" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 주의해야 할 불규칙 (irregulares)
            </h2>
            <p className="text-[15px] text-slate-600 mb-6 font-medium">현재분사 불규칙은 크게 <strong>y 변형</strong>과 <strong>어간 변화</strong> 두 가지 패턴으로 나뉩니다.</p>

            {/* y 변형 테이블 */}
            <div className="mb-8">
                <h3 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    y 변형 (모음 끼임: i → y)
                </h3>
                <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                    <table className="w-full text-[15px] text-center border-collapse min-w-[500px]">
                        <thead className="bg-slate-50 text-slate-900 font-extrabold border-b border-slate-200">
                            <tr>
                                <th className="px-5 py-3 w-1/3">동사 원형</th>
                                <th className="px-5 py-3 w-1/3">현재분사</th>
                                <th className="px-5 py-3 w-1/3">설명</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            <tr className="hover:bg-slate-50/50">
                                <td className="px-5 py-3 text-slate-600 font-medium">leer (읽다)</td>
                                <td className="px-5 py-3 font-bold text-slate-900">le<span className="text-red-500 font-black">y</span>endo</td>
                                <td className="px-5 py-3 text-sm text-slate-500">i가 두 모음 사이에 낌</td>
                            </tr>
                            <tr className="hover:bg-slate-50/50">
                                <td className="px-5 py-3 text-slate-600 font-medium">oír (듣다)</td>
                                <td className="px-5 py-3 font-bold text-slate-900">o<span className="text-red-500 font-black">y</span>endo</td>
                                <td className="px-5 py-3 text-sm text-slate-500">i → y 철자 변화</td>
                            </tr>
                            <tr className="hover:bg-slate-50/50">
                                <td className="px-5 py-3 text-slate-600 font-medium">creer (믿다)</td>
                                <td className="px-5 py-3 font-bold text-slate-900">cre<span className="text-red-500 font-black">y</span>endo</td>
                                <td className="px-5 py-3 text-sm text-slate-500">발음 편의상 변화</td>
                            </tr>
                            <tr className="hover:bg-slate-50/50">
                                <td className="px-5 py-3 text-slate-600 font-medium">ir (가다)</td>
                                <td className="px-5 py-3 font-bold text-slate-900"><span className="text-red-500 font-black">y</span>endo</td>
                                <td className="px-5 py-3 text-sm text-slate-500">어두의 i가 y로 변함</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 어간 변화 테이블 */}
            <div>
                <h3 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                    어간 변화 (e → i, o → u)
                </h3>
                <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                    <table className="w-full text-[15px] text-center border-collapse min-w-[500px]">
                        <thead className="bg-slate-50 text-slate-900 font-extrabold border-b border-slate-200">
                            <tr>
                                <th className="px-5 py-3 w-1/3">동사 원형</th>
                                <th className="px-5 py-3 w-1/3">현재분사</th>
                                <th className="px-5 py-3 w-1/3">변화 유형</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            <tr className="hover:bg-slate-50/50">
                                <td className="px-5 py-3 text-slate-600 font-medium">p<span className="text-indigo-600 font-bold">e</span>dir (요청하다)</td>
                                <td className="px-5 py-3 font-bold text-slate-900">p<span className="text-red-500 font-black">i</span>diendo</td>
                                <td className="px-5 py-3 text-sm text-slate-500 font-bold bg-indigo-50/50 text-indigo-600">e → i</td>
                            </tr>
                            <tr className="hover:bg-slate-50/50">
                                <td className="px-5 py-3 text-slate-600 font-medium">d<span className="text-indigo-600 font-bold">e</span>cir (말하다)</td>
                                <td className="px-5 py-3 font-bold text-slate-900">d<span className="text-red-500 font-black">i</span>ciendo</td>
                                <td className="px-5 py-3 text-sm text-slate-500 font-bold bg-indigo-50/50 text-indigo-600">e → i</td>
                            </tr>
                            <tr className="hover:bg-slate-50/50">
                                <td className="px-5 py-3 text-slate-600 font-medium">d<span className="text-indigo-600 font-bold">o</span>rmir (자다)</td>
                                <td className="px-5 py-3 font-bold text-slate-900">d<span className="text-red-500 font-black">u</span>rmiendo</td>
                                <td className="px-5 py-3 text-sm text-slate-500 font-bold bg-indigo-50/50 text-indigo-600">o → u</td>
                            </tr>
                            <tr className="hover:bg-slate-50/50">
                                <td className="px-5 py-3 text-slate-600 font-medium">m<span className="text-indigo-600 font-bold">o</span>rir (죽다)</td>
                                <td className="px-5 py-3 font-bold text-slate-900">m<span className="text-red-500 font-black">u</span>riendo</td>
                                <td className="px-5 py-3 text-sm text-slate-500 font-bold bg-indigo-50/50 text-indigo-600">o → u</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
          </section>

          {/* 3. 다양한 활용형 */}
          <section id="sec-3" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 다양한 활용 (usos)
            </h2>
            
            <div className="grid grid-cols-1 gap-5">
                {/* 카드 1: 현재진행형 */}
                <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:border-blue-300 transition-all group">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <PlayCircle size={24} />
                        </div>
                        <div>
                            <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-2 py-0.5 rounded mb-1 block w-fit">progreso</span>
                            <h4 className="text-lg font-bold text-slate-900">진행형 (estar + 현재분사)</h4>
                        </div>
                    </div>
                    <p className="text-[15px] text-slate-600 mb-4 leading-relaxed font-medium">
                        "지금 막 ~하고 있다"는 진행 의미를 가장 명확하게 강조하는 용법입니다.
                    </p>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <p className="text-lg font-bold text-slate-900 italic">Estoy <span className="text-blue-600">estudiando</span> español.</p>
                        <p className="text-sm text-slate-500 font-medium">나는 스페인어를 공부하고 있다.</p>
                    </div>
                </div>

                {/* 카드 2: 동시 동작 */}
                <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:border-emerald-300 transition-all group">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                            <User size={24} />
                        </div>
                        <div>
                            <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-2 py-0.5 rounded mb-1 block w-fit">adverbio</span>
                            <h4 className="text-lg font-bold text-slate-900">동시 동작 (~하면서)</h4>
                        </div>
                    </div>
                    <p className="text-[15px] text-slate-600 mb-4 leading-relaxed font-medium">
                        주어가 메인 동사의 행동을 하면서 동시에 하는 부수적인 행동을 나타냅니다.
                    </p>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <p className="text-lg font-bold text-slate-900 italic">Ella habla <span className="text-emerald-600">sonriendo</span>.</p>
                        <p className="text-sm text-slate-500 font-medium">그녀는 웃으면서 말한다.</p>
                    </div>
                </div>

                {/* 카드 3: 지속 */}
                <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:border-amber-300 transition-all group">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                            <Repeat size={24} />
                        </div>
                        <div>
                            <span className="bg-amber-100 text-amber-700 text-[10px] font-black px-2 py-0.5 rounded mb-1 block w-fit">continuidad</span>
                            <h4 className="text-lg font-bold text-slate-900">계속/반복 (seguir + 현재분사)</h4>
                        </div>
                    </div>
                    <p className="text-[15px] text-slate-600 mb-4 leading-relaxed font-medium">
                        어떤 상태나 동작이 중단되지 않고 "여전히/계속해서 ~하다"라는 의미를 가집니다.
                    </p>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <p className="text-lg font-bold text-slate-900 italic">Sigo <span className="text-amber-600">trabajando</span> aquí.</p>
                        <p className="text-sm text-slate-500 font-medium">나는 여전히 여기서 일하고 있다.</p>
                    </div>
                </div>

                {/* 카드 4: 점진 */}
                <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:border-purple-300 transition-all group">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                            <FastForward size={24} />
                        </div>
                        <div>
                            <span className="bg-purple-100 text-purple-700 text-[10px] font-black px-2 py-0.5 rounded mb-1 block w-fit">gradual</span>
                            <h4 className="text-lg font-bold text-slate-900">점진적 변화 (ir + 현재분사)</h4>
                        </div>
                    </div>
                    <p className="text-[15px] text-slate-600 mb-4 leading-relaxed font-medium">
                        시간이 흐름에 따라 "점점 ~해가다/변해가다"라는 뉘앙스를 풍깁니다.
                    </p>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <p className="text-lg font-bold text-slate-900 italic">Vamos <span className="text-purple-600">aprendiendo</span> más.</p>
                        <p className="text-sm text-slate-500 font-medium">우리는 점점 더 많이 배워가고 있다.</p>
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
                {['현재분사 만들기', '불규칙 형태', '다양한 활용형', '연습 문제'].map((item, i) => (
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