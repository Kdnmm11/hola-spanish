'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, CornerDownRight, ArrowRight, Info, AlertTriangle, MapPin
} from 'lucide-react';

const DISTANCE_SYSTEM = [
    { level: '1단계', category: 'Este', adverb: 'aquí (여기)', mean: '이 (나에게 가까움)' },
    { level: '2단계', category: 'Ese', adverb: 'ahí (거기)', mean: '그 (너에게 가까움)' },
    { level: '3단계', category: 'Aquel', adverb: 'allí (저기)', mean: '저 (둘 다에게서 먼)' }
];

const ADJECTIVE_TABLE = [
    { type: '이 (Este)', m_sg: 'este', f_sg: 'esta', m_pl: 'estos', f_pl: 'estas' },
    { type: '그 (Ese)', m_sg: 'ese', f_sg: 'esa', m_pl: 'esos', f_pl: 'esas' },
    { type: '저 (Aquel)', m_sg: 'aquel', f_sg: 'aquella', m_pl: 'aquellos', f_pl: 'aquellas' }
];

const NEUTRAL_TABLE = [
    { word: 'Esto', mean: '이것 (상황/물건)', ex: '¿Qué es esto? (이게 뭐야?)' },
    { word: 'Eso', mean: '그것 (상황/물건)', ex: 'Eso es verdad. (그것은 사실이다.)' },
    { word: 'Aquello', mean: '저것 (과거/먼 일)', ex: 'Aquello fue fantástico. (저 일은 멋졌다.)' }
];

const QUIZ_DATA = [
    { id: 1, q: "빈칸 채우기 (여기 있는 이 집): ( ) casa", options: ['Este', 'Esta', 'Esto'], answer: 1, explain: "casa는 여성 단수 명사이므로 지시형용사 여성 단수형 esta를 씁니다." },
    { id: 2, q: "다음 중 문법적으로 틀린 문장은?", options: ['Estos libros', 'Esto libro', 'Eso es bueno'], answer: 1, explain: "중성 지시대명사(Esto)는 명사를 직접 수식할 수 없습니다. 명사 수식은 este를 써야 합니다." },
    { id: 3, q: "'그것은 내 잘못이야'라고 상황을 지칭할 때 알맞은 단어는?", options: ['Ese', 'Eso'], answer: 1, explain: "특정한 명사가 아닌 막연한 상황이나 사건을 가리킬 때는 중성형 Eso를 씁니다." }
];

export default function DemonstrativesDetail() {
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
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 11</span>
                <ChevronRight size={10} />
                <span>Basic Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">지시 표현</h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               거리와 위치에 따라 대상을 지칭하는 형용사와 대명사를 학습합니다. <br/>
               중성 형태와 일반 형태의 철자 구분이 매우 중요합니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium">
                  <li><strong>3단계</strong>: Este(이), Ese(그), Aquel(저)로 거리를 구분합니다.</li>
                  <li><strong>중성형</strong>: Esto, Eso, Aquello는 상황이나 이름을 모르는 물건에 씁니다.</li>
                  <li><strong>철자 주의</strong>: 남성 복수는 estos, esos이며 중성형과 혼동하지 않아야 합니다.</li>
              </ul>
          </div>

          {/* 1. 지시어 체계 */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 지시어의 3단계 체계
            </h2>
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-left border-collapse">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 w-24">거리</th>
                            <th className="px-5 py-3 w-1/4">지시어 계열</th>
                            <th className="px-5 py-3">장소 부사</th>
                            <th className="px-5 py-3 text-right pr-8">의미</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {DISTANCE_SYSTEM.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 font-bold text-slate-400 bg-slate-50/30 border-r border-slate-100 text-sm uppercase">{row.level}</td>
                                <td className="px-5 py-4 font-bold text-slate-900">{row.category}</td>
                                <td className="px-5 py-4 text-slate-600 flex items-center gap-2"><MapPin size={14} className="text-slate-300"/>{row.adverb}</td>
                                <td className="px-5 py-4 text-right pr-8 text-slate-500 text-sm">{row.mean}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 2. 지시형용사 */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 지시형용사 (Adjetivos)
            </h2>
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm mb-6">
                <table className="w-full text-[15px] text-left border-collapse">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 w-1/4">구분</th>
                            <th className="px-5 py-3">남성 단수</th>
                            <th className="px-5 py-3">여성 단수</th>
                            <th className="px-5 py-3">남성 복수</th>
                            <th className="px-5 py-3">여성 복수</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {ADJECTIVE_TABLE.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100">{row.type}</td>
                                <td className="px-5 py-4 font-bold text-slate-900 italic">{row.m_sg}</td>
                                <td className="px-5 py-4 font-bold text-slate-900 italic">{row.f_sg}</td>
                                <td className="px-5 py-4 font-bold text-slate-900 italic">{row.m_pl}</td>
                                <td className="px-5 py-4 font-bold text-slate-900 italic">{row.f_pl}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-4">
                <AlertTriangle size={18} className="text-slate-400 shrink-0" />
                <p className="text-sm text-slate-600 leading-relaxed">
                    <strong>주의:</strong> 남성 복수형은 <span className="text-slate-900 font-bold">-os</span>로 끝납니다. (estes, eses는 잘못된 형태입니다.)
                </p>
            </div>
          </section>

          {/* 3. 중성 지시대명사 */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 중성 지시대명사 (Neutros)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4 leading-relaxed">
                특정한 명사가 아니라 <strong>추상적인 상황, 사건</strong>, 혹은 이름을 모르는 물건을 가리킬 때 사용합니다. 성·수 변화가 없으며 오직 단수형으로만 존재합니다.
            </p>
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-left border-collapse">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 w-1/4">형태</th>
                            <th className="px-5 py-3 w-1/3">의미</th>
                            <th className="px-5 py-3 text-right pr-8">예시</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {NEUTRAL_TABLE.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 font-black text-slate-900 text-lg uppercase tracking-tighter">{row.word}</td>
                                <td className="px-5 py-4 text-slate-700 font-medium">{row.mean}</td>
                                <td className="px-5 py-4 text-right pr-8">
                                    <div className="flex flex-col items-end text-sm">
                                        <span className="font-bold text-slate-900 italic">{row.ex.split('(')[0]}</span>
                                        <span className="text-xs text-slate-400 mt-0.5">{row.ex.split('(')[1]?.replace(')', '') || ''}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 4. 시간 및 규칙 */}
          <section id="sec-4" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">4.</span> 중요 규칙 및 시간 표현
            </h2>
            <div className="space-y-4">
                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                    <h4 className="text-sm font-bold text-slate-800 uppercase mb-3 flex items-center gap-2">
                        <Info size={16} className="text-slate-400" /> 시간적 거리 표현
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[14px]">
                        <div className="bg-slate-50 p-3 rounded-lg flex flex-col gap-1 border border-slate-100">
                            <span className="font-bold text-slate-900">Este (현재 근접)</span>
                            <span className="text-slate-500 italic">esta semana (이번 주)</span>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg flex flex-col gap-1 border border-slate-100">
                            <span className="font-bold text-slate-900">Ese (근접 과거/미래)</span>
                            <span className="text-slate-500 italic">ese día (그날)</span>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg flex flex-col gap-1 border border-slate-100">
                            <span className="font-bold text-slate-900">Aquel (먼 과거)</span>
                            <span className="text-slate-500 italic">aquel año (그 옛날 그해)</span>
                        </div>
                    </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-5 rounded-xl shadow-sm">
                    <div className="flex items-center gap-2 mb-2 text-yellow-900">
                        <AlertTriangle size={18} className="text-yellow-600" />
                        <h4 className="font-bold text-sm uppercase">남성형 vs 중성형 구분</h4>
                    </div>
                    <p className="text-[14px] text-yellow-800 leading-relaxed font-medium mb-3">
                        명사를 꾸밀 때는 <strong>남성형(Este/Ese)</strong>을, 막연한 상황을 지칭할 때는 <strong>중성형(Esto/Eso)</strong>을 씁니다.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm font-bold text-slate-900">
                        <p className="bg-white/50 p-2 rounded">Este libro (O)</p>
                        <p className="bg-white/50 p-2 rounded line-through text-slate-400">Esto libro (X)</p>
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
                {['거리 체계', '지시형용사', '중성 지시어', '중요 규칙', '연습 문제'].map((item, i) => (
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