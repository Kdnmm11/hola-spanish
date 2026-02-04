'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, ArrowRight, Info, AlertTriangle, Lightbulb
} from 'lucide-react';

const HAY_COMBINATIONS = [
    { type: '부정관사', ex: 'hay un cine. (영화관이 하나 있다)' },
    { type: '숫자', ex: 'hay tres sillas. (의자가 세 개 있다)' },
    { type: '수량사', ex: 'hay mucha gente. (사람이 많이 있다)' },
    { type: '무관사 명사', ex: 'hay manzanas. (사과들이 있다)' },
    { type: '의문사', ex: '¿qué hay en la caja? (상자 안에 뭐가 있니?)' }
];

const HAY_VS_ESTAR = [
    { item: '대상의 성격', hay: '모르는 것 (신정보)', estar: '알고 있는 것 (구정보)' },
    { item: '동반 관사', hay: 'un, una (부정관사)', estar: 'el, la (정관사)' },
    { item: '동반 형용사', hay: '(없음)', estar: 'mi, tu (소유), este (지시)' },
    { item: '질문의 의도', hay: '"뭐가 있니?" (존재)', estar: '"그게 어디 있니?" (위치)' }
];

const QUIZ_DATA = [
    { id: 1, q: "빈칸 채우기: en mi habitación (     ) una hermana. (내 방에 여동생 한 명이 있다)", options: ['está', 'hay'], answer: 1, explain: "새로운 인물의 존재를 처음 언급할 때는 hay를 씁니다." },
    { id: 2, q: "다음 중 문법적으로 틀린 문장은?", options: ['hay el libro.', 'el libro está aquí.'], answer: 0, explain: "hay 뒤에는 정관사(el, la)가 올 수 없습니다." },
    { id: 3, q: "'¿dónde (     ) juan?' 빈칸에 알맞은 것은?", options: ['hay', 'está'], answer: 1, explain: "특정 인물(고유명사)의 위치를 물을 때는 estar를 씁니다." },
    { id: 4, q: "방에 의자가 3개 있다고 할 때: (     ) tres sillas en la habitación.", options: ['están', 'hay'], answer: 1, explain: "숫자(수량)와 함께 존재를 나타낼 때는 hay를 사용합니다." },
    { id: 5, q: "빈칸 채우기: 시험에 합격하려면 공부를 많이 해야 한다. (     ) estudiar mucho.", options: ['hay', 'hay que', 'tengo que'], answer: 1, explain: "주어가 없는 일반적인 의무(해야 한다)를 나타낼 때는 'hay que + 동사원형'을 씁니다." }
];

export default function HaberDetail() {
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
    <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto px-6 lg:px-8 py-8 font-sans text-slate-900 bg-white">
      
      <article className="flex-1 min-w-0">
          <header className="mb-8 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 tracking-widest mb-2">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 14</span>
                <ChevronRight size={10} />
                <span>Basic Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              Haber (Hay)
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               대상의 존재 유무를 나타내는 'hay'와 의무를 나타내는 'hay que'를 배웁니다. <br/>
               또한 haber는 완료 시제를 만드는 조동사로도 쓰이는 스페인어의 핵심 동사입니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-900">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-bold text-slate-700">
                  <li><strong>비인칭성</strong>: 대상의 수와 상관없이 형태가 <span className="text-slate-900">hay</span>로 고정됩니다.</li>
                  <li><strong>신정보 원칙</strong>: 청자가 모르는 새로운 대상을 소개할 때만 사용합니다.</li>
                  <li><strong>금기</strong>: 정관사, 소유형용사, 고유명사 앞에는 절대 쓸 수 없습니다.</li>
                  <li><strong>비인칭 의무</strong>: <code>hay que + 동사원형</code> (~해야 한다)으로 일반적인 의무를 표현합니다.</li>
                  <li><strong>조동사 용법</strong>: <code>haber + 과거분사</code> 형태로 완료 시제를 만듭니다. (중급에서 학습)</li>
              </ul>
          </div>

          {/* 1. 문법 규칙 */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">1.</span> hay의 비인칭성과 문법 규칙
            </h2>
            <p className="text-[15px] text-slate-600 mb-4 font-medium">뒤에 오는 명사의 성·수와 상관없이 형태가 변하지 않습니다.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm flex flex-col items-center justify-center gap-2 text-center">
                    <span className="text-sm font-bold text-slate-500 mb-1">단수 대상</span>
                    <span className="text-lg font-bold text-emerald-700">hay un estudiante.</span>
                    <span className="text-xs text-slate-400">학생 한 명이 있다.</span>
                </div>
                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm flex flex-col items-center justify-center gap-2 text-center">
                    <span className="text-sm font-bold text-slate-500 mb-1">복수 대상</span>
                    <span className="text-lg font-bold text-emerald-700">hay diez estudiantes.</span>
                    <span className="text-xs text-slate-400">학생 열 명이 있다.</span>
                </div>
            </div>
          </section>

          {/* 2. 결합 유형 */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">2.</span> hay와 결합하는 명사구 유형
            </h2>
            <p className="text-[15px] text-slate-600 mb-4 font-medium">hay 뒤에는 '특정되지 않은' 막연한 대상을 나타내는 말이 옵니다.</p>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse min-w-[500px]">
                    <thead className="bg-slate-50 text-slate-900 font-extrabold border-b border-slate-200 text-[15px]">
                        <tr>
                            <th className="px-5 py-3 w-1/3 text-center whitespace-nowrap">유형</th>
                            <th className="px-5 py-3 text-center whitespace-nowrap">예시</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {HAY_COMBINATIONS.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                <td className="px-5 py-4 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100 text-center whitespace-nowrap">{row.type}</td>
                                <td className="px-5 py-4 text-center whitespace-nowrap">
                                    <div className="flex flex-col items-center">
                                        <span className="text-emerald-700 font-bold">{row.ex.split('(')[0]}</span>
                                        <span className="text-sm text-slate-500 font-medium mt-0.5">{row.ex.split('(')[1]?.replace(')', '')}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 3. 비교 */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">3.</span> hay vs estar (존재 vs 위치)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4 font-medium">가장 큰 차이는 '대상에 대해 이미 알고 있는가'의 여부입니다.</p>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] border-collapse text-center min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-900 font-extrabold border-b border-slate-200 text-[15px]">
                        <tr>
                            <th className="px-5 py-3 w-1/4 text-center whitespace-nowrap">비교 항목</th>
                            <th className="px-5 py-3 w-1/3 text-center text-emerald-700 bg-emerald-50/30 whitespace-nowrap">hay (존재)</th>
                            <th className="px-5 py-3 w-1/3 text-center text-amber-700 bg-amber-50/30 whitespace-nowrap">estar (위치)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {HAY_VS_ESTAR.map((r, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                <td className="px-5 py-4 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100 text-center whitespace-nowrap">{r.item}</td>
                                <td className="px-5 py-4 text-emerald-700 font-medium bg-emerald-50/10 border-r border-emerald-100 text-center whitespace-nowrap">{r.hay}</td>
                                <td className="px-5 py-4 text-amber-700 font-medium bg-amber-50/10 text-center whitespace-nowrap">{r.estar}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 4. 금기 사항 */}
          <section id="sec-4" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">4.</span> hay 사용 시 절대 금지 사항
            </h2>
            <p className="text-[15px] text-slate-600 mb-4 font-medium">특정한 대상을 지칭하는 말 앞에는 절대 hay를 쓸 수 없습니다.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { title: '정관사 불가', bad: 'hay el libro', good: 'el libro está...', cat: '정관사 앞' },
                    { title: '소유격 불가', bad: 'hay mi casa', good: 'mi casa está...', cat: '소유형용사 앞' },
                    { title: '지시어 불가', bad: 'hay esta mesa', good: 'esta mesa está...', cat: '지시형용사 앞' },
                    { title: '고유명사 불가', bad: 'hay juan', good: 'juan está...', cat: '고유명사 앞' }
                ].map((item, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm flex flex-col justify-center">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="font-extrabold text-slate-900 text-base">{item.title}</h4>
                            <span className="text-[11px] bg-slate-100 px-2.5 py-1 rounded text-slate-900 font-bold tracking-tight">{item.cat}</span>
                        </div>
                        <div className="space-y-2 w-full bg-slate-50 p-4 rounded-lg border border-slate-100">
                            <div className="flex items-center justify-between">
                                <span className="text-red-500 line-through text-sm font-bold">{item.bad}</span>
                                <X size={14} className="text-red-500 opacity-70"/>
                            </div>
                            <div className="flex items-center justify-between border-t border-slate-100 pt-2 mt-2">
                                <span className="text-emerald-700 font-black text-lg">{item.good}</span>
                                <Check size={14} className="text-green-600 opacity-70"/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          </section>

          {/* 5. 비인칭 의무 표현 */}
          <section id="sec-5" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">5.</span> 비인칭 의무 표현 (Obligation)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4 font-medium">특정 주어 없이 일반적인 의무(~해야 한다)를 나타낼 때 사용합니다.</p>
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-sm">
                <div className="flex items-center justify-center mb-6">
                    <span className="text-xl font-extrabold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-100">Hay que + 동사원형</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-slate-100 flex flex-col items-center gap-1 text-center">
                        <span className="text-lg font-bold text-slate-800">Hay que comer.</span>
                        <span className="text-sm text-slate-500">먹어야 한다. (살기 위해서)</span>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-slate-100 flex flex-col items-center gap-1 text-center">
                        <span className="text-lg font-bold text-slate-800">Hay que estudiar.</span>
                        <span className="text-sm text-slate-500">공부해야 한다. (일반적으로)</span>
                    </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-800 font-medium flex gap-2 items-start">
                    <Info size={16} className="shrink-0 mt-0.5" />
                    <p>비교: 특정 주어가 해야 한다고 할 때는 <span className="font-bold">Tener que + 동사원형</span>을 씁니다. (예: Tengo que ir - 나는 가야 한다)</p>
                </div>
            </div>
          </section>

          {/* 연습 문제 */}
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
                {['hay 규칙', '결합 유형', 'hay vs estar', '금지 사항', '비인칭 의무', '연습 문제'].map((item, i) => (
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