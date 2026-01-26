'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, CornerDownRight, ArrowRight, Info, AlertTriangle, Layers
} from 'lucide-react';

const PARTICIPLE_RULES = [
    { type: '-ar 동사', rule: '어미 제거 + ado', ex: 'hablar → hablado' },
    { type: '-er / -ir 동사', rule: '어미 제거 + ido', ex: 'comer → comido / vivir → vivido' }
];

const IRREGULAR_PARTICIPLES = [
    { inf: 'abrir', pp: 'abierto', mean: '연' },
    { inf: 'decir', pp: 'dicho', mean: '말한' },
    { inf: 'escribir', pp: 'escrito', mean: '쓴' },
    { inf: 'hacer', pp: 'hecho', mean: '한/만든' },
    { inf: 'poner', pp: 'puesto', mean: '놓은' },
    { inf: 'ver', pp: 'visto', mean: '본' },
    { inf: 'volver', pp: 'vuelto', mean: '돌아온' },
    { inf: 'morir', pp: 'muerto', mean: '죽은' }
];

const HABER_PRESENT = [
    { p: 'yo', form: 'he' }, { p: 'tú', form: 'has' }, { p: 'él/ella', form: 'ha' },
    { p: 'nosotros', form: 'hemos' }, { p: 'vosotros', form: 'habéis' }, { p: 'ellos', form: 'han' }
];

const HABER_IMPERFECT = [
    { p: 'yo', form: 'había' }, { p: 'tú', form: 'habías' }, { p: 'él/ella', form: 'había' },
    { p: 'nosotros', form: 'habíamos' }, { p: 'vosotros', form: 'habíais' }, { p: 'ellos', form: 'habían' }
];

const QUIZ_DATA = [
    { id: 1, q: "빈칸 채우기: Hoy ( ) ( ) la tarea. (yo, hacer)", options: ['he hacido', 'he hecho', 'hago'], answer: 1, explain: "Hacer의 과거분사는 불규칙인 'hecho'이며, 1인칭 단수 현재완료는 'he + hecho'입니다." },
    { id: 2, q: "과거분사의 성·수 일치 여부: Ellas han ( ) las manzanas. (comer)", options: ['comidas', 'comido'], answer: 1, explain: "완료 시제(haber + p.p.)에서 과거분사는 주어의 성·수에 따라 변하지 않고 항상 남성 단수형(-o)을 유지합니다." },
    { id: 3, q: "과거완료 작문: La película ya ( ) (empezar).", options: ['había empezado', 'he empezado'], answer: 0, explain: "이미 일어난 대과거를 표현할 때는 'había(선과거) + p.p.' 형태인 과거완료를 씁니다." }
];

export default function PerfectTensesDetail() {
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
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 22</span>
                <ChevronRight size={10} />
                <span>Basic Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              완료형 시제
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               조동사 haber와 과거분사를 결합하여 현재와 연결된 과거(현재완료) 또는 더 먼 과거(과거완료)를 표현합니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium">
                  <li><strong>공식</strong>: Haber (변화) + 과거분사 (고정).</li>
                  <li><strong>과거분사</strong>: -ar은 -ado, -er/-ir은 -ido로 끝나며 불규칙 형태 암기가 필수입니다.</li>
                  <li><strong>불변의 법칙</strong>: 완료 시제에서 과거분사는 성·수 변화를 하지 않습니다.</li>
              </ul>
          </div>

          {/* 1. 과거분사 */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 과거분사 (Participio) 만드는 법
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">규칙 동사는 어미만 바꾸면 되지만, 불규칙 동사는 반드시 외워야 합니다.</p>
            
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
                        {PARTICIPLE_RULES.map((row, i) => (
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

            <h3 className="text-[13px] font-black text-slate-400 mb-3 uppercase tracking-widest pl-2 border-l-2 border-slate-200">필수 불규칙 과거분사</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[14px]">
                {IRREGULAR_PARTICIPLES.map((item, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-center hover:border-slate-300 transition-colors">
                        <span className="block text-slate-500 text-xs mb-1">{item.inf}</span>
                        <span className="block text-slate-900 font-bold">{item.pp}</span>
                    </div>
                ))}
            </div>
          </section>

          {/* 2. 현재완료 */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 현재완료 (Haber 현재 + P.P)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">현재와 연결된 과거("~했다") 혹은 경험("~한 적 있다")을 나타냅니다.</p>
            <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="flex-1 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 font-bold text-xs text-slate-500 uppercase">Haber 현재 변화</div>
                    <div className="grid grid-cols-2 p-4 gap-y-2 text-[15px] font-bold text-slate-900">
                        {HABER_PRESENT.map((h, i) => (
                            <div key={i} className="flex justify-between border-b border-slate-50 last:border-0 pb-1">
                                <span className="text-slate-400 font-normal text-xs">{h.p}</span>
                                <span>{h.form}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex-1 space-y-3">
                    <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                        <h4 className="text-sm font-bold text-slate-800 mb-1">용법 1: 완료</h4>
                        <p className="text-xs text-slate-500 mb-2">오늘/이번 주 내에 일어난 일</p>
                        <div className="flex flex-col gap-1">
                            <span className="text-[15px] font-bold text-slate-900 italic">Hoy he comido mucho.</span>
                            <span className="text-xs text-slate-400">오늘 나는 많이 먹었다.</span>
                        </div>
                    </div>
                    <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                        <h4 className="text-sm font-bold text-slate-800 mb-1">용법 2: 경험</h4>
                        <p className="text-xs text-slate-500 mb-2">~한 적이 있다</p>
                        <div className="flex flex-col gap-1">
                            <span className="text-[15px] font-bold text-slate-900 italic">¿Has estado en España?</span>
                            <span className="text-xs text-slate-400">스페인에 가본 적 있니?</span>
                        </div>
                    </div>
                </div>
            </div>
          </section>

          {/* 3. 과거완료 */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 과거완료 (Haber 선과거 + P.P)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">과거의 어떤 시점보다 더 이전에 이미 끝난 일(대과거)을 나타냅니다.</p>
            <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="flex-1 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 font-bold text-xs text-slate-500 uppercase">Haber 선과거 변화</div>
                    <div className="grid grid-cols-2 p-4 gap-y-2 text-[15px] font-bold text-slate-900">
                        {HABER_IMPERFECT.map((h, i) => (
                            <div key={i} className="flex justify-between border-b border-slate-50 last:border-0 pb-1">
                                <span className="text-slate-400 font-normal text-xs">{h.p}</span>
                                <span>{h.form}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex-1 p-5 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3">
                        <Layers size={18} className="text-slate-400" />
                        <h4 className="font-bold text-sm text-slate-800">과거의 과거 (대과거)</h4>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[15px] font-bold text-slate-900 italic leading-relaxed">
                            Cuando llegué, Juan <span className="text-blue-600">había salido</span>.
                        </span>
                        <span className="text-xs text-slate-400 mt-1">내가 도착했을 때(과거), 후안은 이미 나갔었다(대과거).</span>
                    </div>
                </div>
            </div>
          </section>

          {/* 4. 주의사항 */}
          <section id="sec-4" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">4.</span> 주의사항: 분사의 불변성
            </h2>
            <div className="p-5 bg-yellow-50 border border-yellow-200 rounded-xl shadow-sm flex items-start gap-3">
                <AlertTriangle size={20} className="text-yellow-600 shrink-0 mt-0.5" />
                <div>
                    <h4 className="font-bold text-sm text-yellow-900 uppercase mb-1">성·수 일치 금지</h4>
                    <p className="text-[14px] text-yellow-800 mb-2 font-medium">
                        완료 시제에서 과거분사는 주어가 여성이든 복수이든 상관없이 항상 <span className="font-black text-slate-900">-o</span> 형태로 고정됩니다.
                    </p>
                    <div className="flex gap-4 text-sm font-bold bg-white/50 p-2 rounded">
                        <span className="text-slate-900">Ellas han comido. (O)</span>
                        <span className="text-slate-400 line-through decoration-red-400">Ellas han comidas. (X)</span>
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
                {['과거분사 만들기', '현재완료', '과거완료', '주의사항', '연습 문제'].map((item, i) => (
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