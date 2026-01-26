'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, CornerDownRight, ArrowRight, Info, AlertTriangle
} from 'lucide-react';

const HAY_COMBINATIONS = [
    { type: '부정관사', ex: 'Hay un cine. (영화관이 하나 있다)' },
    { type: '숫자', ex: 'Hay tres sillas. (의자가 세 개 있다)' },
    { type: '수량사', ex: 'Hay mucha gente. (사람이 많이 있다)' },
    { type: '무관사 명사', ex: 'Hay manzanas. (사과들이 있다)' },
    { type: '의문사', ex: '¿Qué hay en la caja? (상자 안에 뭐가 있니?)' }
];

const HAY_VS_ESTAR = [
    { item: '대상의 성격', hay: '모르는 것 (신정보)', estar: '알고 있는 것 (구정보)' },
    { item: '동반 관사', hay: 'un, una (부정관사)', estar: 'el, la (정관사)' },
    { item: '동반 형용사', hay: '(없음)', estar: 'mi, tu (소유), este (지시)' },
    { item: '질문의 의도', hay: '"뭐가 있니?" (존재)', estar: '"그게 어디 있니?" (위치)' }
];

const QUIZ_DATA = [
    { id: 1, q: "빈칸 채우기: En 내 방 ( ) 한 명의 여동생.", options: ['está', 'hay'], answer: 1, explain: "새로운 인물의 존재를 처음 언급할 때는 hay를 씁니다." },
    { id: 2, q: "다음 중 문법적으로 틀린 문장은?", options: ['Hay el libro.', 'El libro está aquí.'], answer: 0, explain: "hay 뒤에는 정관사(el, la)가 올 수 없습니다." },
    { id: 3, q: "'¿Dónde ( ) Juan?' 빈칸에 알맞은 것은?", options: ['hay', 'está'], answer: 1, explain: "특정 인물(고유명사)의 위치를 물을 때는 estar를 씁니다." }
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
    <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto px-6 lg:px-8 py-8 font-sans text-slate-800 bg-white">
      
      <article className="flex-1 min-w-0">
          <header className="mb-8 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 17</span>
                <ChevronRight size={10} />
                <span>Basic Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              Haber (Hay)
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               대상의 존재 유무를 나타내는 'hay'의 용법을 배웁니다. <br/>
               위치를 나타내는 'estar'와 어떻게 다른지 구분하는 것이 핵심입니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium">
                  <li><strong>비인칭성</strong>: 대상의 수와 상관없이 형태가 <strong>hay</strong>로 고정됩니다.</li>
                  <li><strong>신정보 원칙</strong>: 청자가 모르는 새로운 대상을 소개할 때만 사용합니다.</li>
                  <li><strong>금기</strong>: 정관사, 소유형용사, 고유명사 앞에는 절대 쓸 수 없습니다.</li>
              </ul>
          </div>

          {/* 1. 문법 규칙 */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">1.</span> hay의 비인칭성과 문법 규칙
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">뒤에 오는 명사의 성·수와 상관없이 형태가 변하지 않습니다.</p>
            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-sm font-bold text-slate-400 uppercase">단수 대상</span>
                    <span className="text-[15px] font-bold text-slate-900 italic">Hay un estudiante.</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-400 uppercase">복수 대상</span>
                    <span className="text-[15px] font-bold text-slate-900 italic">Hay diez estudiantes.</span>
                </div>
            </div>
          </section>

          {/* 2. 결합 유형 */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">2.</span> hay와 결합하는 명사구 유형
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">hay 뒤에는 '특정되지 않은' 막연한 대상을 나타내는 말이 옵니다.</p>
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-left border-collapse">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 w-1/3">유형</th>
                            <th className="px-5 py-3 text-right pr-8">예시</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {HAY_COMBINATIONS.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                <td className="px-5 py-4 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100">{row.type}</td>
                                <td className="px-5 py-4 text-right pr-8">
                                    <div className="flex flex-col items-end">
                                        <span className="text-slate-900 font-bold italic">{row.ex.split('(')[0]}</span>
                                        <span className="text-xs text-slate-400 mt-0.5">{row.ex.split('(')[1]?.replace(')', '')}</span>
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
            <p className="text-[15px] text-slate-600 mb-4">가장 큰 차이는 '대상에 대해 이미 알고 있는가'의 여부입니다.</p>
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] border-collapse text-left">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 w-1/4">비교 항목</th>
                            <th className="px-5 py-3 w-1/3 text-slate-800">hay (존재)</th>
                            <th className="px-5 py-3 text-slate-800">estar (위치)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {HAY_VS_ESTAR.map((r, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                <td className="px-5 py-4 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100">{r.item}</td>
                                <td className="px-5 py-4 text-slate-700">{r.hay}</td>
                                <td className="px-5 py-4 text-slate-700">{r.estar}</td>
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
            <p className="text-[15px] text-slate-600 mb-4">특정한 대상을 지칭하는 말 앞에는 절대 hay를 쓸 수 없습니다.</p>
            <div className="space-y-3">
                {[
                    { bad: 'hay el libro', good: 'el libro está...', cat: '정관사 앞' },
                    { bad: 'hay mi madre', good: 'mi madre está...', cat: '소유형용사 앞' },
                    { bad: 'hay esta casa', good: 'esta casa está...', cat: '지시형용사 앞' },
                    { bad: 'hay Juan', good: 'Juan está...', cat: '고유명사 앞' }
                ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                        <span className="text-xs font-bold text-slate-400 uppercase w-24">{item.cat}</span>
                        <div className="flex items-center gap-3">
                            <span className="text-slate-400 line-through italic text-sm">{item.bad}</span>
                            <ArrowRight size={14} className="text-slate-300" />
                            <span className="text-slate-900 font-bold italic text-sm">{item.good}</span>
                        </div>
                        <X size={16} className="text-red-400 ml-2" />
                    </div>
                ))}
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
                {['hay 규칙', '결합 유형', 'hay vs estar', '금지 사항', '연습 문제'].map((item, i) => (
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