'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, CornerDownRight, ArrowRight, Info, AlertTriangle, Link, Settings
} from 'lucide-react';

const PREPOSITIONS = [
    { word: 'a', mean: '~로, ~에', ex: 'Voy a casa. (집에 간다)', note: '사람 목적어일 때 필수 사용' },
    { word: 'de', mean: '~의, ~로부터', ex: 'Es de Juan. (후안의 것이다)', note: '소유, 출처, 재료' },
    { word: 'en', mean: '~안에, ~위에', ex: 'Está en la mesa. (탁자에 있다)', note: '공간, 교통수단' },
    { word: 'con', mean: '~와 함께', ex: 'Café con leche. (우유 든 커피)', note: '동반, 도구' },
    { word: 'sin', mean: '~없이', ex: 'sin azúcar. (설탕 없이)', note: 'con의 반대' },
    { word: 'para', mean: '~를 위해', ex: 'Es para ti. (너를 위한 거야)', note: '목적, 용도' },
    { word: 'por', mean: '~때문에', ex: 'por la mañana. (아침에)', note: '원인, 수단, 시간' }
];

const MENTE_RULES = [
    { type: '-o 끝남', rule: '여성형(-a) + mente', ex: 'rápido → rápidamente' },
    { type: '그 외 (-e, 자음)', rule: '원형 + mente', ex: 'fácil → fácilmente' }
];

const DEGREE_ADVERBS = [
    { word: 'muy', mean: '매우', usage: '형용사/부사 앞', ex: 'muy bueno (매우 좋은)' },
    { word: 'mucho', mean: '많이', usage: '동사 뒤, 명사 앞', ex: 'Trabaja mucho. (일 많이 함)' },
    { word: 'bastante', mean: '꽤, 상당히', usage: '정도 강조', ex: 'bastante bien (꽤 잘)' },
    { word: 'demasiado', mean: '너무, 지나치게', usage: '과한 정도', ex: 'demasiado caro (너무 비싼)' }
];

const QUIZ_DATA = [
    { id: 1, q: "빈칸에 알맞은 축약형은? Voy ( ) parque. (a + el)", options: ['al', 'a el', 'del'], answer: 0, explain: "전치사 a와 정관사 el이 만나면 al로 축약됩니다." },
    { id: 2, q: "'분명한(claro)'을 부사 '분명하게'로 바꾸면?", options: ['claromente', 'claramente'], answer: 1, explain: "-o로 끝나는 형용사는 여성형(-a)으로 바꾼 뒤 -mente를 붙입니다." },
    { id: 3, q: "문장의 오류를 고치세요: Yo amo mi madre.", options: ['amo a mi madre', 'amo de mi madre'], answer: 0, explain: "사랑하는 대상(목적어)이 사람일 경우 '개인적 a'를 반드시 써야 합니다." }
];

export default function PrepositionsAdverbsDetail() {
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
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 15</span>
                <ChevronRight size={10} />
                <span>Basic Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">전치사와 부사 기초</h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               문장의 뼈대를 이루는 전치사와 의미를 풍성하게 만드는 부사를 학습합니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium">
                  <li><strong>전치사</strong>: a, de, en, con 등 명사 간의 관계를 연결합니다.</li>
                  <li><strong>부사 만들기</strong>: 형용사 여성형 뒤에 <span className="text-slate-900 font-bold">-mente</span>를 붙입니다.</li>
                  <li><strong>개인적 a</strong>: 목적어가 사람일 때 전치사 a를 사용하는 독특한 규칙입니다.</li>
              </ul>
          </div>

          {/* 1. 기초 전치사 */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 기초 핵심 전치사
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">가장 빈번하게 사용되는 필수 전치사 목록입니다.</p>
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm mb-6">
                <table className="w-full text-[15px] text-left border-collapse">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 w-16">단어</th>
                            <th className="px-5 py-3 w-1/4">의미</th>
                            <th className="px-5 py-3">예시</th>
                            <th className="px-5 py-3 text-right pr-8">비고</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {PREPOSITIONS.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                <td className="px-5 py-2 font-bold text-slate-900">{row.word}</td>
                                <td className="px-5 py-2 text-slate-700 font-medium">{row.mean}</td>
                                <td className="px-5 py-2">
                                    <div className="flex flex-col">
                                        <span className="text-slate-900 italic font-bold">{row.ex.split('(')[0]}</span>
                                        <span className="text-xs text-slate-400 mt-0.5">{row.ex.split('(')[1]?.replace(')', '')}</span>
                                    </div>
                                </td>
                                <td className="px-5 py-2 text-right pr-8 text-xs text-slate-500">{row.note}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="p-5 bg-yellow-50 border border-yellow-200 rounded-xl shadow-sm flex items-start gap-3">
                <Link size={18} className="text-yellow-600 shrink-0 mt-0.5"/>
                <div>
                    <h4 className="font-bold text-sm text-yellow-900 uppercase mb-1">전치사 축약 (Contracciones)</h4>
                    <p className="text-[14px] text-yellow-800 mb-2">남성 단수 정관사 <span className="font-black">el</span>과 만날 때만 축약됩니다.</p>
                    <div className="flex gap-6 text-sm font-bold text-slate-900">
                        <span className="bg-white/60 px-2 py-1 rounded border border-yellow-200">a + el = <span className="font-black">al</span></span>
                        <span className="bg-white/60 px-2 py-1 rounded border border-yellow-200">de + el = <span className="font-black">del</span></span>
                    </div>
                </div>
            </div>
          </section>

          {/* 2. 부사 만들기 */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 형용사를 부사로 만들기 (-mente)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">영어의 '-ly'처럼 형용사에 꼬리를 붙여 부사를 만듭니다.</p>
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm mb-6">
                <table className="w-full text-[15px] text-left border-collapse">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 w-1/3">유형</th>
                            <th className="px-5 py-3 w-1/3">규칙</th>
                            <th className="px-5 py-3 text-right pr-8">예시</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {MENTE_RULES.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                <td className="px-5 py-4 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100">{row.type}</td>
                                <td className="px-5 py-4 text-slate-700 font-medium">{row.rule}</td>
                                <td className="px-5 py-4 text-right pr-8">
                                    <span className="text-slate-900 font-bold italic">{row.ex}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex flex-col gap-3 text-[14px]">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex items-center gap-3">
                    <AlertTriangle size={16} className="text-slate-400" />
                    <span>강세 부호(tilde)가 있다면 부사가 되어도 유지합니다. <span className="text-slate-400 text-xs ml-1">(fácil → fácilmente)</span></span>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex items-center gap-3">
                    <Settings size={16} className="text-slate-400" />
                    <span>연달아 나열할 때는 마지막 단어에만 -mente를 붙입니다. <span className="text-slate-400 text-xs ml-1">(limpia y ordenadamente)</span></span>
                </div>
            </div>
          </section>

          {/* 3. 정도 부사 */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 정도 부사 (muy vs mucho)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">가장 많이 혼동하는 muy와 mucho의 차이를 익혀둡시다.</p>
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-left border-collapse">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 w-24">단어</th>
                            <th className="px-5 py-3 w-20">의미</th>
                            <th className="px-5 py-3">용법</th>
                            <th className="px-5 py-3 text-right pr-8">예시</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {DEGREE_ADVERBS.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                <td className="px-5 py-2 font-bold text-slate-900">{row.word}</td>
                                <td className="px-5 py-2 text-slate-700">{row.mean}</td>
                                <td className="px-5 py-2 text-xs text-slate-500 bg-slate-50/50">{row.usage}</td>
                                <td className="px-5 py-2 text-right pr-8">
                                    <div className="flex flex-col items-end">
                                        <span className="text-slate-900 italic font-bold">{row.ex.split('(')[0]}</span>
                                        <span className="text-xs text-slate-400 mt-0.5">{row.ex.split('(')[1]?.replace(')', '')}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 4. 개인적 a */}
          <section id="sec-4" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">4.</span> 특수 용법: 개인적 a
            </h2>
            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                <div className="flex items-start gap-3 mb-4">
                    <Info size={18} className="text-slate-400 shrink-0 mt-0.5"/>
                    <p className="text-[15px] text-slate-600 leading-relaxed">
                        직접 목적어가 <strong>특정한 사람</strong>이나 반려동물일 경우, 명사 앞에 전치사 <strong>a</strong>를 반드시 써야 합니다.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-lg">
                        <span className="text-xs font-bold text-slate-400 uppercase block mb-1">사람일 때 (O)</span>
                        <p className="text-slate-900 font-bold italic">Veo <span className="text-slate-900 underline decoration-slate-300 underline-offset-4">a</span> María.</p>
                        <p className="text-xs text-slate-400 mt-1">나는 마리아를 본다.</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                        <span className="text-xs font-bold text-slate-400 uppercase block mb-1">사물일 때 (X)</span>
                        <p className="text-slate-900 font-bold italic">Veo la mesa.</p>
                        <p className="text-xs text-slate-400 mt-1">나는 탁자를 본다.</p>
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
                {['기초 전치사', '부사 만들기', '정도 부사', '개인적 a', '연습 문제'].map((item, i) => (
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