'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, ArrowRight, Info, AlertTriangle, Lightbulb
} from 'lucide-react';

// --- Helper for highlighting endings ---
const ColorEnd = ({ word, type }: { word: string, type: 'm' | 'f' }) => {
    const color = type === 'm' ? 'text-blue-600' : 'text-red-600';
    
    if (word.endsWith('os')) return <span>{word.slice(0, -2)}<span className={color}>os</span></span>;
    if (word.endsWith('as')) return <span>{word.slice(0, -2)}<span className={color}>as</span></span>;
    if (word.endsWith('o')) return <span>{word.slice(0, -1)}<span className={color}>o</span></span>;
    if (word.endsWith('a')) return <span>{word.slice(0, -1)}<span className={color}>a</span></span>;
    
    return <span>{word}</span>;
};

const QUANTIFIERS_TABLE = [
    { base: 'mucho (많은)', m_sg: 'mucho', f_sg: 'mucha', m_pl: 'muchos', f_pl: 'muchas' },
    { base: 'poco (적은)', m_sg: 'poco', f_sg: 'poca', m_pl: 'pocos', f_pl: 'pocas' },
    { base: 'todo (모든)', m_sg: 'todo', f_sg: 'toda', m_pl: 'todos', f_pl: 'todas' },
    { base: 'tanto (그렇게)', m_sg: 'tanto', f_sg: 'tanta', m_pl: 'tantos', f_pl: 'tantas' },
    { base: 'demasiado (너무)', m_sg: 'demasiado', f_sg: 'demasiada', m_pl: 'demasiados', f_pl: 'demasiadas' }
];

const QUIZ_DATA = [
    { id: 1, q: "'매일 아침' (mañanas, 여성 복수)을 올바르게 작문하세요.", options: ['Todo el mañanas', 'Todas las mañanas'], answer: 1, explain: "mañanas는 여성 복수이므로 Todas las와 성·수 일치를 시켜야 합니다." },
    { id: 2, q: "다음 중 문법적으로 틀린 문장은?", options: ['Mis hermanas estudian mucho.', 'Mis hermanas estudian muchas.'], answer: 1, explain: "동사를 수식하는 부사적 용법일 때는 성·수 변화 없이 'mucho'로 고정됩니다." },
    { id: 3, q: "'너무 많은 음식' (comida, 여성 단수)을 작문하세요.", options: ['Demasiado comida', 'Demasiada comida'], answer: 1, explain: "명사를 수식하는 형용사적 용법이므로 성 일치가 필요합니다." },
    { id: 4, q: "'Poco'가 부사로 쓰일 때의 형태는?", options: ['Poco', 'Poca', 'Pocos'], answer: 0, explain: "부사로 쓰일 때는 항상 남성 단수형인 'poco' 형태를 유지합니다." }
];

export default function QuantifiersDetail() {
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
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 9</span>
                <ChevronRight size={10} />
                <span>Basic Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              수량 한정사 (Cuantificadores)
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               막연한 양이나 정도를 나타냅니다. 명사를 수식하는 형용사적 용법과 <br/>
               동사를 수식하는 부사적 용법의 구분이 핵심입니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium">
                  <li><strong>형용사 용법</strong>: 명사의 성·수에 맞춰 변화 (mucho, mucha, muchos, muchas).</li>
                  <li><strong>부사 용법</strong>: 동사 수식 시 <strong>mucho</strong> 단수 남성형으로 고정.</li>
                  <li><strong>Todo의 특수성</strong>: 'todo + 정관사 + 명사'의 고유한 어순을 가집니다.</li>
              </ul>
          </div>

          {/* 1. 변화표 */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 주요 수량 한정사 및 변화표
            </h2>
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-base border-collapse text-left table-fixed">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase tracking-wider">
                        <tr>
                            <th className="px-5 py-3 w-1/4 border-r border-slate-100">한정사</th>
                            <th className="px-5 py-3 text-center border-r border-slate-100">남성 단수</th>
                            <th className="px-5 py-3 text-center border-r border-slate-100">여성 단수</th>
                            <th className="px-5 py-3 text-center border-r border-slate-100">남성 복수</th>
                            <th className="px-5 py-3 text-center">여성 복수</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white text-[15px]">
                        {QUANTIFIERS_TABLE.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100">{row.base}</td>
                                <td className="px-5 py-4 text-slate-900 text-center border-r border-slate-100 font-medium">
                                    <ColorEnd word={row.m_sg} type="m" />
                                </td>
                                <td className="px-5 py-4 text-slate-900 text-center border-r border-slate-100 font-medium">
                                    <ColorEnd word={row.f_sg} type="f" />
                                </td>
                                <td className="px-5 py-4 text-slate-900 text-center border-r border-slate-100 font-medium">
                                    <ColorEnd word={row.m_pl} type="m" />
                                </td>
                                <td className="px-5 py-4 text-slate-900 text-center font-medium">
                                    <ColorEnd word={row.f_pl} type="f" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 2. 용법 구분 */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 형용사 vs 부사 용법
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8 text-[15px]">
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-800 mb-3 border-l-4 border-slate-800 pl-3 uppercase tracking-tight text-slate-400">형용사 용법 (명사 수식)</h3>
                    <p className="text-[14px] text-slate-600 mb-4">명사의 성과 수에 맞춰 형태를 변화시킵니다.</p>
                    <div className="space-y-3">
                        <div className="bg-slate-50 p-3 rounded-lg flex flex-col gap-1">
                            <span className="font-bold text-slate-900 italic">muchos libros</span>
                            <span className="text-slate-400 text-xs font-normal">많은 책들</span>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg flex flex-col gap-1">
                            <span className="font-bold text-slate-900 italic">mucha gente</span>
                            <span className="text-slate-400 text-xs font-normal">많은 사람들</span>
                        </div>
                    </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-800 mb-3 border-l-4 border-slate-800 pl-3 uppercase tracking-tight text-slate-400">부사 용법 (동사 수식)</h3>
                    <p className="text-[14px] text-slate-600 mb-4">어떤 주어라도 <strong>남성 단수형</strong>으로 고정됩니다.</p>
                    <div className="space-y-3">
                        <div className="bg-slate-50 p-3 rounded-lg flex flex-col gap-1">
                            <span className="font-bold text-slate-900 italic">él trabaja mucho.</span>
                            <span className="text-slate-400 text-xs font-normal">그는 일을 많이 한다.</span>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg flex flex-col gap-1">
                            <span className="font-bold text-slate-900 italic">son poco inteligentes.</span>
                            <span className="text-slate-400 text-xs font-normal">그들은 별로 똑똑하지 않다.</span>
                        </div>
                    </div>
                </div>
            </div>
          </section>

          {/* 3. Todo 특수 용법 */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 'todo'의 특수 용법
            </h2>
            <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm mb-6 text-[15px]">
                <p className="text-slate-600 mb-5 leading-relaxed font-medium">
                    'todo'가 '모든'이라는 의미로 명사를 수식할 때는 보통 뒤에 <strong>정관사</strong>를 동반합니다.
                </p>
                <div className="bg-indigo-50 p-4 rounded-xl text-center font-bold text-indigo-900 mb-6 border border-indigo-100 shadow-sm">
                    todo + <span className="text-indigo-600 bg-white px-2 py-0.5 rounded border border-indigo-200 mx-1">정관사</span> + 명사
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-bold text-slate-900">
                    <div className="text-center bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center gap-2">
                        <span className="text-lg italic">todo el mundo</span>
                        <span className="text-slate-400 text-xs font-normal not-italic bg-white px-2 py-0.5 rounded border border-slate-200">전 세계 / 모든 사람</span>
                    </div>
                    <div className="text-center bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center gap-2">
                        <span className="text-lg italic">toda la noche</span>
                        <span className="text-slate-400 text-xs font-normal not-italic bg-white px-2 py-0.5 rounded border border-slate-200">밤새도록</span>
                    </div>
                    <div className="text-center bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center gap-2">
                        <span className="text-lg italic">todos los días</span>
                        <span className="text-slate-400 text-xs font-normal not-italic bg-white px-2 py-0.5 rounded border border-slate-200">매일 (모든 날들)</span>
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
             <div className="space-y-4 text-[15px]">
                {QUIZ_DATA.map((q, idx) => (
                    <div key={q.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-all">
                        <div className="flex items-start gap-3 mb-4">
                            <span className="bg-indigo-100 text-indigo-600 text-xs font-bold px-2.5 py-1 rounded-full mt-0.5">Q{idx + 1}</span>
                            <p className="font-bold text-slate-800 text-base leading-snug">{q.q}</p>
                        </div>
                        <div className="flex flex-wrap gap-2.5 ml-0 w-full mt-2">
                            {q.options.map((opt, optIdx) => {
                                const isSelected = quizState[q.id] === optIdx;
                                const isCorrect = q.answer === optIdx;
                                const showResult = quizState[q.id] !== undefined && quizState[q.id] !== null;

                                let buttonStyle = "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300";
                                if (showResult) {
                                    if (isSelected) {
                                        buttonStyle = isCorrect 
                                            ? "bg-green-500 border-green-500 text-white font-bold shadow-md ring-2 ring-green-200 ring-offset-1" 
                                            : "bg-red-500 border-red-500 text-white font-bold shadow-md";
                                    } else if (isCorrect) {
                                        buttonStyle = "bg-green-50 border-green-200 text-green-700 font-bold";
                                    } else {
                                        buttonStyle = "bg-slate-50 border-slate-100 text-slate-300 opacity-50";
                                    }
                                }

                                return (
                                    <button 
                                        key={optIdx}
                                        onClick={() => !showResult && handleQuiz(q.id, optIdx)}
                                        disabled={showResult}
                                        className={`px-4 py-1.5 text-sm rounded-full border transition-all duration-200 font-medium ${buttonStyle}`}
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
                                <p className="text-slate-600 leading-relaxed pl-6 border-l-2 border-slate-200">
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
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">On this page</h4>
            <ul className="space-y-3 text-[14px]">
                {['변화표', '용법 구분', 'todo 용법', '연습 문제'].map((item, i) => (
                    <li key={i}>
                        <button onClick={() => scrollTo(`sec-${i+1}`)} className="text-slate-500 hover:text-slate-800 transition-colors text-left flex items-center gap-2 group font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-slate-600 transition-colors shadow-sm"></div>
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