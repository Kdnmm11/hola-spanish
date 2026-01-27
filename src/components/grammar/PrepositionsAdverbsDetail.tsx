'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, ArrowRight, Info, AlertTriangle, Link, Settings, Lightbulb
} from 'lucide-react';

const PREPOSITIONS = [
    { word: 'a', mean: '~로, ~에', ex: 'voy a casa. (집에 간다)', note: '사람 목적어일 때 필수 사용' },
    { word: 'de', mean: '~의, ~로부터', ex: 'es de Juan. (후안의 것이다)', note: '소유, 출처, 재료' },
    { word: 'en', mean: '~안에, ~위에', ex: 'está en la mesa. (탁자에 있다)', note: '공간, 교통수단' },
    { word: 'con', mean: '~와 함께', ex: 'café con leche. (우유 든 커피)', note: '동반, 도구' },
    { word: 'sin', mean: '~없이', ex: 'sin azúcar. (설탕 없이)', note: 'con의 반대' },
    { word: 'para', mean: '~를 위해', ex: 'es para ti. (너를 위한 거야)', note: '목적, 용도' },
    { word: 'por', mean: '~때문에', ex: 'por la mañana. (아침에)', note: '원인, 수단, 시간' }
];

const MENTE_RULES = [
    { type: '-o 끝남', rule: '여성형(-a) + mente', ex: 'rápido → rápidamente' },
    { type: '그 외 (-e, 자음)', rule: '원형 + mente', ex: 'fácil → fácilmente' }
];

const DEGREE_ADVERBS = [
    { word: 'muy', mean: '매우', usage: '형용사/부사 앞', ex: 'muy bueno (매우 좋은)' },
    { word: 'mucho', mean: '많이', usage: '동사 뒤, 명사 앞', ex: 'trabaja mucho. (일 많이 함)' },
    { word: 'bastante', mean: '꽤, 상당히', usage: '정도 강조', ex: 'bastante bien (꽤 잘)' },
    { word: 'demasiado', mean: '너무, 지나치게', usage: '과한 정도', ex: 'demasiado caro (너무 비싼)' }
];

const QUIZ_DATA = [
    { id: 1, q: "빈칸에 알맞은 축약형은? voy ( ) parque. (a + el)", options: ['al', 'a el', 'del'], answer: 0, explain: "전치사 a와 정관사 el이 만나면 al로 축약됩니다." },
    { id: 2, q: "'분명한(claro)'을 부사 '분명하게'로 바꾸면?", options: ['claromente', 'claramente'], answer: 1, explain: "-o로 끝나는 형용사는 여성형(-a)으로 바꾼 뒤 -mente를 붙입니다." },
    { id: 3, q: "문장의 오류를 고치세요: yo amo mi madre.", options: ['amo a mi madre', 'amo de mi madre'], answer: 0, explain: "사랑하는 대상(목적어)이 사람일 경우 '개인적 a'를 반드시 써야 합니다." },
    { id: 4, q: "다음 중 '매우 예쁘다'를 뜻하는 올바른 표현은?", options: ['muy guapa', 'mucho guapa'], answer: 0, explain: "형용사나 부사를 수식하여 '매우'라고 할 때는 muy를 사용합니다." }
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
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium text-slate-700">
                  <li><strong>전치사</strong>: a, de, en, con 등 명사 간의 관계를 연결합니다.</li>
                  <li><strong>부사 만들기</strong>: 형용사 여성형 뒤에 <span className="text-slate-900 font-bold">-mente</span>를 붙입니다.</li>
                  <li><strong>개인적 a</strong>: 목적어가 사람일 때 전치사 a를 사용하는 독특한 규칙입니다.</li>
              </ul>
          </div>

          {/* 1. 기초 전치사 */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 기초 핵심 전치사
            </h2>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm mb-6">
                <table className="w-full text-[15px] text-left border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-900 font-extrabold border-b border-slate-200 text-[15px]">
                        <tr>
                            <th className="px-5 py-3 w-16 text-center whitespace-nowrap">단어</th>
                            <th className="px-5 py-3 w-1/4 whitespace-nowrap">의미</th>
                            <th className="px-5 py-3 text-center whitespace-nowrap">예시</th>
                            <th className="px-5 py-3 text-right pr-8 whitespace-nowrap">비고</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {PREPOSITIONS.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                <td className="px-5 py-2 font-black text-indigo-600 bg-indigo-50/20 text-center border-r border-slate-100 whitespace-nowrap">{row.word}</td>
                                <td className="px-5 py-2 text-slate-700 font-medium whitespace-nowrap">{row.mean}</td>
                                <td className="px-5 py-2 text-center whitespace-nowrap">
                                    <div className="flex flex-col items-center">
                                        <span className="text-slate-900 font-bold">{row.ex.split('(')[0]}</span>
                                        <span className="text-xs text-slate-400 mt-0.5">{row.ex.split('(')[1]?.replace(')', '')}</span>
                                    </div>
                                </td>
                                <td className="px-5 py-2 text-right pr-8 text-xs text-slate-500 whitespace-nowrap">{row.note}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="p-5 bg-indigo-50 border border-indigo-100 rounded-xl shadow-sm flex items-start gap-3">
                <Link size={18} className="text-indigo-400 shrink-0 mt-0.5"/>
                <div>
                    <h4 className="font-bold text-sm text-indigo-900 mb-1">전치사 축약 (contracciones)</h4>
                    <p className="text-[14px] text-indigo-800 mb-2">남성 단수 정관사 <span className="font-black">el</span>과 만날 때만 축약됩니다.</p>
                    <div className="flex gap-6 text-sm font-bold text-slate-900">
                        <span className="bg-white px-2 py-1 rounded border border-indigo-100 shadow-sm text-indigo-700">a + el = <span className="font-black text-indigo-900">al</span></span>
                        <span className="bg-white px-2 py-1 rounded border border-indigo-100 shadow-sm text-indigo-700">de + el = <span className="font-black text-indigo-900">del</span></span>
                    </div>
                </div>
            </div>
          </section>

          {/* 2. 부사 만들기 */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 형용사를 부사로 만들기 (-mente)
            </h2>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm mb-6">
                <table className="w-full text-[15px] text-left border-collapse min-w-[500px]">
                    <thead className="bg-slate-50 text-slate-900 font-extrabold border-b border-slate-200 text-[15px]">
                        <tr>
                            <th className="px-5 py-3 w-1/3 whitespace-nowrap">유형</th>
                            <th className="px-5 py-3 w-1/3 whitespace-nowrap">규칙</th>
                            <th className="px-5 py-3 text-right pr-8 whitespace-nowrap">예시</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {MENTE_RULES.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                <td className="px-5 py-4 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100 whitespace-nowrap">{row.type}</td>
                                <td className="px-5 py-4 text-slate-700 font-medium whitespace-nowrap">{row.rule}</td>
                                <td className="px-5 py-4 text-right pr-8 whitespace-nowrap">
                                    <span className="text-slate-900 font-bold">{row.ex}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex flex-col gap-3 text-[14px]">
                <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3 shadow-sm hover:border-blue-300 transition-colors">
                    <AlertTriangle size={16} className="text-amber-500" />
                    <span>강세 부호(tilde)가 있다면 부사가 되어도 유지합니다. <span className="text-slate-400 text-xs ml-1">(fácil → fácilmente)</span></span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3 shadow-sm hover:border-blue-300 transition-colors">
                    <Settings size={16} className="text-slate-400" />
                    <span>연달아 나열할 때는 마지막 단어에만 -mente를 붙입니다. <span className="text-slate-400 text-xs ml-1">(limpia y ordenadamente)</span></span>
                </div>
            </div>
          </section>

          {/* 3. 정도 부사 */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 정도 부사 (muy vs mucho)
            </h2>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-left border-collapse min-w-[500px]">
                    <thead className="bg-slate-50 text-slate-900 font-extrabold border-b border-slate-200 text-[15px]">
                        <tr>
                            <th className="px-5 py-3 w-24 whitespace-nowrap">단어</th>
                            <th className="px-5 py-3 w-20 whitespace-nowrap">의미</th>
                            <th className="px-5 py-3 whitespace-nowrap">용법</th>
                            <th className="px-5 py-3 text-right pr-8 whitespace-nowrap">예시</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {DEGREE_ADVERBS.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                <td className="px-5 py-2 font-black text-blue-600 whitespace-nowrap">{row.word}</td>
                                <td className="px-5 py-2 text-slate-700 whitespace-nowrap">{row.mean}</td>
                                <td className="px-5 py-2 whitespace-nowrap"><span className="text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded font-bold">{row.usage}</span></td>
                                <td className="px-5 py-2 text-right pr-8 whitespace-nowrap">
                                    <div className="flex flex-col items-end">
                                        <span className="text-slate-900 font-bold">{row.ex.split('(')[0]}</span>
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
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">4.</span> 특수 용법: 개인적 a
            </h2>
            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                <div className="flex items-start gap-3 mb-4">
                    <Info size={18} className="text-blue-500 shrink-0 mt-0.5"/>
                    <p className="text-[15px] text-slate-600 leading-relaxed">
                        직접 목적어가 <strong>특정한 사람</strong>이나 반려동물일 경우, 명사 앞에 전치사 <strong>a</strong>를 반드시 써야 합니다.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                        <span className="text-xs font-bold text-green-700 uppercase block mb-1">사람일 때 (O)</span>
                        <p className="text-green-900 font-bold">veo <span className="underline decoration-green-400 underline-offset-4">a</span> maría.</p>
                        <p className="text-xs text-green-600 mt-1">나는 마리아를 본다.</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <span className="text-xs font-bold text-slate-400 uppercase block mb-1">사물일 때 (X)</span>
                        <p className="text-slate-900 font-bold">veo la mesa.</p>
                        <p className="text-xs text-slate-400 mt-1">나는 탁자를 본다.</p>
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
                            <p className="font-bold text-slate-800 text-base leading-snug">{q.q}</p>
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