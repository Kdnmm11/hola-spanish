'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, AlertTriangle, Info, Lightbulb, Layers, ShieldCheck, Brush, Search
} from 'lucide-react';

const QUIZ_DATA = [
    { id: 1, q: "escribir(쓰다)의 과거분사 형태는?", options: ['escribido', 'escrito', 'escripto'], answer: 1, explain: "escribir는 불규칙 과거분사로 'escrito'를 씁니다." },
    { id: 2, q: "과거분사의 기본 용법이 아닌 것은?", options: ['완료 시제 만들기 (haber + p.p.)', '진행 시제 만들기 (estar + p.p.)', '형용사처럼 명사 수식'], answer: 1, explain: "진행 시제는 'estar + 현재분사'를 사용합니다. 과거분사는 '상태'를 나타낼 때 estar와 쓰입니다." },
    { id: 3, q: "hacer(하다)의 과거분사 형태는?", options: ['hacido', 'hecho', 'hazo'], answer: 1, explain: "hacer는 불규칙으로 'hecho'가 됩니다." },
    { id: 4, q: "la puerta está (     ). (abrir)", options: ['abierto', 'abierta', 'abriendo'], answer: 1, explain: "주어 la puerta(여성 단수)의 상태를 설명하는 형용사적 용법이므로 성·수를 일치시켜 abierta가 됩니다." }
];

const IRREGULAR_LIST = [
    { inf: 'abrir', pp: 'abierto', mean: '열다 → 열린' },
    { inf: 'cubrir', pp: 'cubierto', mean: '덮다 → 덮인' },
    { inf: 'decir', pp: 'dicho', mean: '말하다 → 말해진' },
    { inf: 'escribir', pp: 'escrito', mean: '쓰다 → 쓰여진' },
    { inf: 'hacer', pp: 'hecho', mean: '하다 → 된/만들어진' },
    { inf: 'morir', pp: 'muerto', mean: '죽다 → 죽은' },
    { inf: 'poner', pp: 'puesto', mean: '놓다 → 놓인' },
    { inf: 'romper', pp: 'roto', mean: '깨다 → 깨진' },
    { inf: 'ver', pp: 'visto', mean: '보다 → 보여진/본' },
    { inf: 'volver', pp: 'vuelto', mean: '돌아오다 → 돌아온' }
];

export default function PastParticipleDetail() {
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
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 25</span>
                <ChevronRight size={10} />
                <span>Intermediate Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              과거분사 (participio)
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               동작의 <strong>완료</strong>나 <strong>상태</strong>를 나타냅니다. 완료 시제를 만들거나 형용사처럼 쓰입니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-900">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium text-slate-700">
                  <li><strong>형태</strong>: -ar 동사는 <strong>-ado</strong>, -er/-ir 동사는 <strong>-ido</strong>.</li>
                  <li><strong>불규칙</strong>: abierto, hecho, dicho, visto 등 불규칙 형태 암기 필수.</li>
                  <li><strong>용법 1</strong>: haber + p.p. (완료 시제 / 불변).</li>
                  <li><strong>용법 2</strong>: estar + p.p. (상태 묘사 / 성·수 일치).</li>
              </ul>
          </div>

          {/* 1. 과거분사 만들기 */}
          <section id="sec-1" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 과거분사 만들기 (participio)
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
                                -ar → <span className="text-red-500 font-black">-ado</span>
                            </td>
                            <td className="px-5 py-6 text-center text-lg">
                                hablar → <span className="font-bold text-slate-900">habl<span className="text-red-500">ado</span></span>
                            </td>
                        </tr>
                        <tr className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-5 py-6 font-bold text-slate-900 text-center">-er / -ir 동사</td>
                            <td className="px-5 py-6 font-bold text-slate-500 text-center text-lg">
                                -er/-ir → <span className="text-red-500 font-black">-ido</span>
                            </td>
                            <td className="px-5 py-6 text-center text-lg">
                                comer → <span className="font-bold text-slate-900">com<span className="text-red-500">ido</span></span><br/>
                                vivir → <span className="font-bold text-slate-900">viv<span className="text-red-500">ido</span></span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </section>

          {/* 2. 필수 불규칙 */}
          <section id="sec-2" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 주의해야 할 불규칙 (irregulares)
            </h2>
            <p className="text-[15px] text-slate-600 mb-6 font-medium leading-relaxed">
                규칙을 따르지 않는 필수 동사들입니다. 반드시 암기해야 합니다.
            </p>

            <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse min-w-[500px]">
                    <thead className="bg-slate-50 text-slate-900 font-extrabold border-b border-slate-200">
                        <tr>
                            <th className="px-5 py-4 w-1/3">동사 원형</th>
                            <th className="px-5 py-4 w-1/3">과거분사</th>
                            <th className="px-5 py-4 w-1/3">뜻</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {IRREGULAR_LIST.map((item, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 text-slate-600 font-medium">{item.inf}</td>
                                <td className="px-5 py-4 font-black text-slate-900 text-lg">{item.pp}</td>
                                <td className="px-5 py-4 text-sm text-slate-500">{item.mean}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 3. 다양한 활용형 */}
          <section id="sec-3" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 다양한 활용 (usos)
            </h2>
            
            <div className="grid grid-cols-1 gap-5">
                {/* 카드 1: 완료 시제 */}
                <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:border-blue-300 transition-all group">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <Layers size={24} />
                        </div>
                        <div>
                            <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-2 py-0.5 rounded mb-1 block w-fit">perfecto</span>
                            <h4 className="text-lg font-bold text-slate-900">완료 시제 (haber + p.p.)</h4>
                        </div>
                    </div>
                    <p className="text-[15px] text-slate-600 mb-4 leading-relaxed font-medium">
                        "~했다"라는 동작의 완료를 나타냅니다. 완료 시제에서 과거분사는 <strong>절대 성·수 변화를 하지 않고 -o로 고정</strong>됩니다.
                    </p>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <p className="text-lg font-bold text-slate-900 italic">Ellas han <span className="text-blue-600">comido</span>.</p>
                        <p className="text-sm text-slate-500 font-medium">그녀들은 밥을 먹었다. (comidas 아님)</p>
                    </div>
                </div>

                {/* 카드 2: 상태 묘사 */}
                <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:border-emerald-300 transition-all group">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                            <ShieldCheck size={24} />
                        </div>
                        <div>
                            <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-2 py-0.5 rounded mb-1 block w-fit">estado</span>
                            <h4 className="text-lg font-bold text-slate-900">상태 묘사 (estar + p.p.)</h4>
                        </div>
                    </div>
                    <p className="text-[15px] text-slate-600 mb-4 leading-relaxed font-medium">
                        어떤 동작의 결과로 남은 "상태(~해져 있다)"를 나타냅니다. 이때 과거분사는 <strong>주어와 성·수 일치</strong>를 합니다.
                    </p>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <p className="text-lg font-bold text-slate-900 italic">La puerta está <span className="text-emerald-600">abierta</span>.</p>
                        <p className="text-sm text-slate-500 font-medium">문이 열려 있다. (여성 단수 일치)</p>
                    </div>
                </div>

                {/* 카드 3: 수동태 */}
                <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:border-amber-300 transition-all group">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                            <Brush size={24} />
                        </div>
                        <div>
                            <span className="bg-amber-100 text-amber-700 text-[10px] font-black px-2 py-0.5 rounded mb-1 block w-fit">pasiva</span>
                            <h4 className="text-lg font-bold text-slate-900">수동태 (ser + p.p.)</h4>
                        </div>
                    </div>
                    <p className="text-[15px] text-slate-600 mb-4 leading-relaxed font-medium">
                        행위의 대상이 주어가 되어 "~에 의해 ~되다"라고 해석됩니다. 주어와 <strong>성·수 일치</strong>를 합니다.
                    </p>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <p className="text-lg font-bold text-slate-900 italic">El libro fue <span className="text-amber-600">escrito</span> por mí.</p>
                        <p className="text-sm text-slate-500 font-medium">그 책은 나에 의해 쓰여졌다.</p>
                    </div>
                </div>

                {/* 카드 4: 형용사적 수식 */}
                <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:border-purple-300 transition-all group">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                            <Search size={24} />
                        </div>
                        <div>
                            <span className="bg-purple-100 text-purple-700 text-[10px] font-black px-2 py-0.5 rounded mb-1 block w-fit">adjetivo</span>
                            <h4 className="text-lg font-bold text-slate-900">형용사적 수식</h4>
                        </div>
                    </div>
                    <p className="text-[15px] text-slate-600 mb-4 leading-relaxed font-medium">
                        명사 뒤에서 그 명사의 상태를 직접 꾸며줍니다. 형용사와 동일하게 <strong>성·수 일치</strong>를 합니다.
                    </p>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <p className="text-lg font-bold text-slate-900 italic">un hombre <span className="text-purple-600">cansado</span>.</p>
                        <p className="text-sm text-slate-500 font-medium">피곤한 남자.</p>
                    </div>
                </div>
            </div>
          </section>

          {/* 연습 문제 */}
          <section id="sec-4" className="scroll-mt-24 pt-8 border-t border-slate-200">
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
                {['과거분사 만들기', '필수 불규칙', '다양한 활용형', '연습 문제'].map((item, i) => (
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