'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, ArrowRight, AlertTriangle, Info, Lightbulb
} from 'lucide-react';

const INTERROGATIVES_DETAIL = [
    { word: '¿qué?', eng: 'what', mean: '무엇', change: 'x', ex: '¿qué quieres?' },
    { word: '¿quién?', eng: 'who', mean: '누구', change: '수 (quiénes)', ex: '¿quiénes son?' },
    { word: '¿cuál?', eng: 'which', mean: '어느 것', change: '수 (cuáles)', ex: '¿cuáles son?' },
    { word: '¿cuánto?', eng: 'how much', mean: '얼마', change: '성·수', ex: '¿cuántos años?' },
    { word: '¿cómo?', eng: 'how', mean: '어떻게', change: 'x', ex: '¿cómo estás?' },
    { word: '¿dónde?', eng: 'where', mean: '어디', change: 'x', ex: '¿dónde vives?' },
    { word: '¿cuándo?', eng: 'when', mean: '언제', change: 'x', ex: '¿cuándo vas?' },
    { word: '¿por qué?', eng: 'why', mean: '왜', change: 'x', ex: '¿por qué lloras?' }
];

const PREPOSITION_RULES = [
    { combo: 'a quién', mean: '누구에게', ex: '¿a quién llamas?' },
    { combo: 'con quién', mean: '누구와', ex: '¿con quién vives?' },
    { combo: 'de dónde', mean: '어디 출신', ex: '¿de dónde eres?' },
    { combo: 'a dónde', mean: '어디로', ex: '¿a dónde vas?' },
    { combo: 'para qué', mean: '무엇을 위해', ex: '¿para qué sirve?' }
];

const QUIZ_DATA = [
    { id: 1, q: "'너는 형제가 몇 명 있니?'의 빈칸은? ¿( ) hermanos tienes?", options: ['quanto', 'cuántos', 'cuántas'], answer: 1, explain: "hermanos는 남성 복수이므로 성·수 일치에 따라 cuántos를 씁니다." },
    { id: 2, q: "다음 중 문법적으로 틀린 문장은?", options: ['¿donde vives tú?', '¿de dónde eres?', '¡qué calor!'], answer: 0, explain: "의문사로 쓰일 때는 반드시 틸데( ´ )가 필요합니다. ¿dónde...?" },
    { id: 3, q: "질문 '¿por qué...?'에 대한 답변의 시작으로 옳은 것은?", options: ['por qué...', 'porque...'], answer: 1, explain: "답변용 '왜냐하면'은 붙여쓰고 틸데가 없는 porque를 씁니다." },
    { id: 4, q: "다음 중 사람을 물을 때 쓰는 의문사는?", options: ['¿qué?', '¿quién?', '¿dónde?'], answer: 1, explain: "'quién'(누구)은 사람을 지칭하는 의문사입니다." }
];

export default function InterrogativesDetail() {
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
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 3</span>
                <ChevronRight size={10} />
                <span>Basic Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              의문문과 감탄문
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               스페인어 의문문은 문장 부호와 강세 부호를 통해 평서문과 엄격히 구분되는 독립적인 체계를 가지고 있습니다.
            </p>
          </header>

          {/* 1. 기본 구조 */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 의문문의 기본 형태
            </h2>
            <div className="space-y-4">
                <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-800 mb-2 border-l-4 border-blue-200 pl-2">1.1 일반 의문문 (yes/no)</h3>
                    <p className="text-[14px] text-slate-600 mb-3 font-medium">어조를 올려 질문하며, 주어와 동사의 도치가 자유롭습니다.</p>
                    <div className="bg-slate-50 p-3 rounded text-[14px] font-bold text-slate-900 flex flex-col gap-1">
                        <p>평서문: tú eres coreano.</p>
                        <p>의문문: ¿eres coreano?</p>
                    </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-800 mb-2 border-l-4 border-indigo-200 pl-2">1.2 의문사가 있는 의문문</h3>
                    <div className="bg-slate-50 p-3 rounded text-[14px] font-bold text-slate-900">
                        ¿qué estudias? <span className="text-slate-400 font-normal not-italic ml-2">(너는 무엇을 공부하니?)</span>
                    </div>
                </div>
            </div>
          </section>

          {/* 2. 의문사 상세 분류 */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 의문사 상세 분류
            </h2>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-left border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase tracking-wide">
                        <tr>
                            <th className="px-5 py-3 w-28 whitespace-nowrap">의문사</th>
                            <th className="px-5 py-3 w-24 text-slate-500 whitespace-nowrap">English</th>
                            <th className="px-5 py-3 w-20 whitespace-nowrap">의미</th>
                            <th className="px-5 py-3 w-28 whitespace-nowrap">성·수 변화</th>
                            <th className="px-5 py-3 text-right pr-8 whitespace-nowrap">예시</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white text-[14px]">
                        {INTERROGATIVES_DETAIL.map((item, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 font-black text-slate-900 bg-slate-50/30 border-r border-slate-100 whitespace-nowrap">{item.word}</td>
                                <td className="px-5 py-4 text-slate-400 font-medium whitespace-nowrap">{item.eng}</td>
                                <td className="px-5 py-4 text-slate-700 font-medium whitespace-nowrap">{item.mean}</td>
                                <td className="px-5 py-4 text-slate-400 text-xs whitespace-nowrap">{item.change}</td>
                                <td className="px-5 py-4 text-right pr-8 text-slate-900 font-bold whitespace-nowrap">{item.ex}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 3. 전치사 + 의문사 */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 전치사 + 의문사 결합
            </h2>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] border-collapse text-left min-w-[500px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-2.5 w-1/3 whitespace-nowrap">조합</th>
                            <th className="px-5 py-2.5 w-1/4 whitespace-nowrap">의미</th>
                            <th className="px-5 py-2.5 text-right pr-8 whitespace-nowrap">예시</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white text-[14px]">
                        {PREPOSITION_RULES.map((r, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100 whitespace-nowrap">{r.combo}</td>
                                <td className="px-5 py-4 text-slate-600 font-medium whitespace-nowrap">{r.mean}</td>
                                <td className="px-5 py-4 text-right pr-8 text-slate-900 font-bold whitespace-nowrap">{r.ex}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 4. 감탄문 */}
          <section id="sec-4" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">4.</span> 감탄문 (exclamativos)
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
                    <h4 className="font-bold text-slate-800 text-base mb-4 font-black tracking-tight text-indigo-600">
                        ¡qué + 명/형/부!
                    </h4>
                    <div className="space-y-4">
                        <div>
                            <p className="text-lg text-slate-900 font-bold">¡qué suerte!</p>
                            <p className="text-slate-400 text-sm mt-0.5">정말 운이 좋구나!</p>
                        </div>
                        <div>
                            <p className="text-lg text-slate-900 font-bold">¡qué guapa es!</p>
                            <p className="text-slate-400 text-sm mt-0.5">그녀는 정말 예쁘다!</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
                    <h4 className="font-bold text-slate-800 text-base mb-4 font-black tracking-tight text-indigo-600">
                        ¡cómo! / ¡cuánto!
                    </h4>
                    <div className="space-y-4">
                        <div>
                            <p className="text-lg text-slate-900 font-bold">¡cómo corre!</p>
                            <p className="text-slate-400 text-sm mt-0.5">어쩜 저렇게 잘 뛰니!</p>
                        </div>
                        <div>
                            <p className="text-lg text-slate-900 font-bold">¡cuánto tiempo!</p>
                            <p className="text-slate-400 text-sm mt-0.5">정말 오랜만이야!</p>
                        </div>
                    </div>
                </div>
            </div>
          </section>

          {/* 5. 예외 및 주의사항 */}
          <section id="sec-5" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">5.</span> 예외 및 주의사항
            </h2>
            <div className="space-y-4">
                <div className="p-5 bg-amber-50 border border-amber-100 rounded-xl shadow-sm">
                    <div className="flex items-center gap-2 mb-2 text-amber-900">
                        <AlertTriangle size={18} className="text-amber-600" />
                        <h4 className="font-bold text-sm uppercase tracking-tight">강세 부호(tilde)의 유무</h4>
                    </div>
                    <p className="text-[14px] text-amber-900/80 leading-relaxed font-medium mb-3">의문사로 쓰일 때는 반드시 틸데를 찍어야 합니다. 없으면 접속사나 관계사가 됩니다.</p>
                    <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm font-bold text-slate-900 bg-white/50 p-3 rounded-lg border border-amber-200/50">
                        <p>qué (무엇) / que (~하는 것)</p>
                        <p>dónde (어디) / donde (~하는 곳)</p>
                    </div>
                </div>
                <div className="p-5 bg-blue-50 border border-blue-100 rounded-xl shadow-sm">
                    <div className="flex items-center gap-2 mb-2 text-blue-900">
                        <Info size={18} className="text-blue-600" />
                        <h4 className="font-bold text-sm tracking-tight text-blue-800">por qué vs porque</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-[14px] text-slate-900">
                        <div>
                            <p className="font-bold text-lg text-blue-800">¿por qué?</p>
                            <p className="text-slate-500 text-xs mt-0.5 font-medium">왜? - 질문 (띄어쓰기 + 틸데)</p>
                        </div>
                        <div>
                            <p className="font-bold text-lg text-blue-800">porque</p>
                            <p className="text-slate-500 text-xs mt-0.5 font-medium">왜냐하면 - 답변 (붙여쓰기)</p>
                        </div>
                    </div>
                </div>
            </div>
          </section>

          {/* 4. Quiz */}
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
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">On this page</h4>
            <ul className="space-y-3 text-[13px]">
                {['기본 형태', '의문사 분류', '전치사 결합', '감탄문', '주의사항', '연습 문제'].map((item, i) => (
                    <li key={i}>
                        <button onClick={() => scrollTo(`sec-${i+1}`)} className="text-slate-500 hover:text-blue-600 transition-colors text-left flex items-center gap-2 group font-medium">
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