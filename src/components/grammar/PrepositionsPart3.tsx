'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, ArrowRight, Info, AlertTriangle, Lightbulb, List, ArrowDownRight
} from 'lucide-react';

const SPACE_TIME_PREPS = [
    { p: 'hacia', m: '~쪽으로 (방향/경향)', ex: 'Camino hacia el mar (바다 쪽으로 걷는다)' },
    { p: 'hasta', m: '~까지 (시간/장소의 끝)', ex: 'Hasta mañana (내일까지)' },
    { p: 'desde', m: '~부터 (시간/장소의 시작)', ex: 'Desde Madrid (마드리드부터)' },
    { p: 'entre', m: '~사이에 (둘/셋 중)', ex: 'Entre tú y yo (너와 나 사이에)' },
    { p: 'ante', m: '~앞에 (직면하여)', ex: 'Ante el juez (판사 앞에서)' },
    { p: 'tras', m: '~뒤에, ~후에', ex: 'Tras la puerta (문 뒤에)' }
];

const ABSTRACT_PREPS = [
    { p: 'sin', m: '~없이 (부재)', ex: 'Café sin azúcar (설탕 없는 커피)' },
    { p: 'sobre', m: '~위에, ~에 대해 (주제)', ex: 'Libro sobre arte (예술에 관한 책)' },
    { p: 'bajo', m: '~아래에 (지배/위치)', ex: 'Bajo cero (영하)' },
    { p: 'contra', m: '~에 반대하여 (대립)', ex: 'Todos contra uno (한 명에 맞서 모두가)' },
    { p: 'según', m: '~에 따르면 (인용)', ex: 'Según las noticias (뉴스에 따르면)' }
];

const IDIOMS = [
    { prep: 'abstract', idiom: 'sin embargo', mean: '하지만 / 그럼에도 불구하고', ex: 'Tengo sueño; sin embargo, estudio.', tr: '졸립다. 하지만 공부한다.' },
    { prep: 'abstract', idiom: 'sobre todo', mean: '무엇보다도 / 특히', ex: 'Me gusta leer, sobre todo novelas.', tr: '독서를 좋아한다. 특히 소설을.' },
    { prep: 'space', idiom: 'desde luego', mean: '당연하지 / 물론이지', ex: '- ¿Vienes? - ¡Desde luego!', tr: '- 너 오니? - 당연하지!' },
    { prep: 'space', idiom: 'hasta luego', mean: '나중에 봐 (작별 인사)', ex: '¡Adiós! Hasta luego.', tr: '안녕! 나중에 봐.' }
];

const QUIZ_DATA = [
    { id: 1, q: "반의어 고르기: 'con leche' (우유 넣은) <-> (     ) leche", options: ['sin', 'sobre', 'bajo'], answer: 0, explain: "con(함께/있는)의 반대말은 sin(없이/없는)입니다." },
    { id: 2, q: "빈칸 채우기 (끝): (     ) la vista. (또 봐요 / 볼 때까지)", options: ['desde', 'hasta', 'hacia'], answer: 1, explain: "작별 인사에서 '만날 때까지'라는 의미로 hasta를 씁니다." },
    { id: 3, q: "빈칸 채우기 (주제): hablamos (     ) política.", options: ['sobre', 'bajo', 'sin'], answer: 0, explain: "주제(~에 대하여)를 나타낼 때는 sobre를 씁니다." },
    { id: 4, q: "빈칸 채우기 (사이): estamos (     ) amigos.", options: ['entre', 'ante', 'tras'], answer: 0, explain: "여러 명 '사이에' 있다(우리끼리다)는 의미로 entre를 씁니다." }
];

export default function PrepositionsPart3() {
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
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 tracking-widest mb-2">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 33</span>
                <ChevronRight size={10} />
                <span>Intermediate Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              전치사 IV (그 외)
            </h1>
            <p className="text-[16px] text-slate-600 font-medium leading-relaxed">
               시공간(hacia, hasta...) 및 추상적 관계(sin, sobre...) 전치사를 총정리합니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium text-slate-700">
                  <li><strong>시공간</strong>: hacia(방향), hasta(끝), desde(시작), entre(사이).</li>
                  <li><strong>상태/관계</strong>: sin(부재), sobre(위/주제), bajo(아래), contra(대립).</li>
              </ul>
          </div>

          {/* 1. 시공간 전치사 */}
          <section id="sec-1" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 시공간 및 이동 (espacio y tiempo)
            </h2>
            <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm">
                        <tr>
                            <th className="px-5 py-4 w-1/4">전치사</th>
                            <th className="px-5 py-4 w-1/4">의미</th>
                            <th className="px-5 py-4 w-1/2">예시</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {SPACE_TIME_PREPS.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                <td className="px-5 py-4 font-black text-indigo-600 text-lg">{row.p}</td>
                                <td className="px-5 py-4 text-slate-700 font-bold">{row.m}</td>
                                <td className="px-5 py-4 text-center text-slate-600">{row.ex}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 2. 추상적 전치사 */}
          <section id="sec-2" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 상태 및 관계 (abstracto)
            </h2>
            <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm">
                        <tr>
                            <th className="px-5 py-4 w-1/4">전치사</th>
                            <th className="px-5 py-4 w-1/4">의미</th>
                            <th className="px-5 py-4 w-1/2">예시</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {ABSTRACT_PREPS.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                <td className="px-5 py-4 font-black text-cyan-600 text-lg">{row.p}</td>
                                <td className="px-5 py-4 text-slate-700 font-bold">{row.m}</td>
                                <td className="px-5 py-4 text-center text-slate-600">{row.ex}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 3. 필수 관용구 */}
          <section id="sec-3" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 필수 관용구 (expresiones)
            </h2>
            <p className="text-[15px] text-slate-600 mb-6 font-medium">문장에서 관용적으로 자주 쓰이는 표현들입니다.</p>
            
            <div className="space-y-10">
                {/* 시공간 계열 표 */}
                <div>
                    <h4 className="text-sm font-black text-blue-500 mb-3 tracking-widest uppercase pl-2 border-l-4 border-blue-200">시공간 계열</h4>
                    <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
                        <table className="w-full text-sm text-center border-collapse min-w-[600px]">
                            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                                <tr>
                                    <th className="px-5 py-3 w-1/4">관용구</th>
                                    <th className="px-5 py-3 w-1/4">의미</th>
                                    <th className="px-5 py-3 w-1/2">예문</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                                {IDIOMS.filter(i => i.prep === 'space').map((row, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-colors text-center">
                                        <td className="px-5 py-4 font-black text-blue-600 text-base">{row.idiom}</td>
                                        <td className="px-5 py-4 font-bold text-slate-600">{row.mean}</td>
                                        <td className="px-5 py-4">
                                            <div className="flex flex-col items-center">
                                                <span className="text-slate-900 font-bold italic">{row.ex}</span>
                                                <span className="text-xs text-slate-400 mt-1">{row.tr}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 상태/관계 계열 표 */}
                <div>
                    <h4 className="text-sm font-black text-indigo-500 mb-3 tracking-widest uppercase pl-2 border-l-4 border-indigo-200">상태 및 관계 계열</h4>
                    <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
                        <table className="w-full text-sm text-center border-collapse min-w-[600px]">
                            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                                <tr>
                                    <th className="px-5 py-3 w-1/4">관용구</th>
                                    <th className="px-5 py-3 w-1/4">의미</th>
                                    <th className="px-5 py-3 w-1/2">예문</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                                {IDIOMS.filter(i => i.prep === 'abstract').map((row, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-colors text-center">
                                        <td className="px-5 py-4 font-black text-indigo-600 text-base">{row.idiom}</td>
                                        <td className="px-5 py-4 font-bold text-slate-600">{row.mean}</td>
                                        <td className="px-5 py-4">
                                            <div className="flex flex-col items-center">
                                                <span className="text-slate-900 font-bold italic">{row.ex}</span>
                                                <span className="text-xs text-slate-400 mt-1">{row.tr}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
          </section>

          {/* 연습 문제 */}
          <section id="sec-3" className="scroll-mt-24 pt-8 border-t border-slate-200">
             <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Lightbulb className="text-yellow-500 fill-yellow-500" size={20} />
                기초 다지기 (práctica)
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
                {['시공간 및 이동', '상태 및 관계', '연습 문제'].map((item, i) => (
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