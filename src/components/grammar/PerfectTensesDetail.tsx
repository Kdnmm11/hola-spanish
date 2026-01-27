'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, ArrowRight, Info, AlertTriangle, Layers, Lightbulb
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
    { id: 1, q: "빈칸 채우기: hoy ( ) ( ) la tarea. (yo, hacer)", options: ['he hacido', 'he hecho', 'hago'], answer: 1, explain: "hacer의 과거분사는 불규칙인 'hecho'이며, 1인칭 단수 현재완료는 'he + hecho'입니다." },
    { id: 2, q: "과거분사의 성·수 일치 여부: ellas han ( ) las manzanas. (comer)", options: ['comidas', 'comido'], answer: 1, explain: "완료 시제(haber + p.p.)에서 과거분사는 주어의 성·수에 따라 변하지 않고 항상 남성 단수형(-o)을 유지합니다." },
    { id: 3, q: "과거완료 작문: la película ya ( ) (empezar).", options: ['había empezado', 'he empezado'], answer: 0, explain: "이미 일어난 대과거를 표현할 때는 'había(선과거) + p.p.' 형태인 과거완료를 씁니다." },
    { id: 4, q: "ver(보다)의 과거분사 형태는?", options: ['vido', 'visto', 'veído'], answer: 1, explain: "ver는 불규칙 과거분사로 'visto'를 사용합니다." }
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

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-900">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium text-slate-700">
                  <li><strong>공식</strong>: haber (변화) + 과거분사 (고정).</li>
                  <li><strong>과거분사</strong>: -ar은 -ado, -er/-ir은 -ido로 끝나며 불규칙 형태 암기가 필수입니다.</li>
                  <li><strong>불변의 법칙</strong>: 완료 시제에서 과거분사는 성·수 변화를 하지 않습니다.</li>
              </ul>
          </div>

          {/* 1. 과거분사 */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 과거분사 (participio) 만드는 법
            </h2>
            <p className="text-[15px] text-slate-600 mb-4 font-medium">규칙 동사는 어미만 바꾸면 되지만, 불규칙 동사는 반드시 외워야 합니다.</p>
            
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm mb-6">
                <table className="w-full text-[15px] text-left border-collapse min-w-[500px]">
                    <thead className="bg-slate-50 text-slate-900 font-extrabold border-b border-slate-200 text-[15px]">
                        <tr>
                            <th className="px-5 py-3 w-1/3 pl-8 whitespace-nowrap">유형</th>
                            <th className="px-5 py-3 w-1/3 whitespace-nowrap">규칙</th>
                            <th className="px-5 py-3 text-right pr-8 whitespace-nowrap">예시</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {PARTICIPLE_RULES.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 font-bold text-slate-900 pl-8 whitespace-nowrap">{row.type}</td>
                                <td className="px-5 py-4 text-slate-900 font-medium whitespace-nowrap">{row.rule}</td>
                                <td className="px-5 py-4 text-right pr-8 whitespace-nowrap">
                                    <span className="text-slate-900 font-bold">{row.ex}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <h3 className="text-[13px] font-black text-slate-400 mb-3 uppercase tracking-widest pl-2 border-l-2 border-slate-200">필수 불규칙 과거분사</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[14px]">
                {IRREGULAR_PARTICIPLES.map((item, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-center hover:border-emerald-300 transition-colors group">
                        <span className="block text-slate-500 text-xs mb-1 group-hover:text-emerald-500">{item.inf}</span>
                        <span className="block text-slate-900 font-bold">{item.pp}</span>
                    </div>
                ))}
            </div>
          </section>

          {/* 2. 현재완료 */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 현재완료 (haber 현재 + p.p)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4 font-medium">현재와 연결된 과거("~했다") 혹은 경험("~한 적 있다")을 나타냅니다.</p>
            
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm bg-white mb-6">
                <table className="w-full text-[15px] text-center border-collapse min-w-[640px] table-fixed">
                    <thead className="bg-slate-50 text-slate-900 font-extrabold border-b border-slate-200">
                        <tr>
                            <th className="px-2 py-3 bg-slate-100/50 text-slate-500 w-[14%] whitespace-nowrap">인칭</th>
                            <th className="px-2 py-3 w-[14%] whitespace-nowrap">yo</th>
                            <th className="px-2 py-3 w-[14%] whitespace-nowrap">tú</th>
                            <th className="px-2 py-3 w-[14%] whitespace-nowrap">él/ella</th>
                            <th className="px-2 py-3 w-[14%] whitespace-nowrap">nosotros</th>
                            <th className="px-2 py-3 w-[14%] whitespace-nowrap">vosotros</th>
                            <th className="px-2 py-3 w-[14%] whitespace-nowrap">ellos</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        <tr>
                            <td className="px-2 py-4 font-bold text-emerald-700 bg-emerald-50/30 border-r border-slate-100 whitespace-nowrap">haber</td>
                            {HABER_PRESENT.map((h, i) => (
                                <td key={i} className="px-2 py-4 text-slate-900 font-medium border-r border-slate-50 last:border-0 whitespace-nowrap">{h.form}</td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <h4 className="text-sm font-bold text-slate-800 mb-1">용법 1: 완료</h4>
                    <p className="text-xs text-slate-500 mb-3">오늘/이번 주 내에 일어난 일</p>
                    <div className="flex flex-col gap-1">
                        <span className="text-[15px] font-bold text-slate-900 italic">hoy he comido mucho.</span>
                        <span className="text-xs text-slate-400">오늘 나는 많이 먹었다.</span>
                    </div>
                </div>
                <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <h4 className="text-sm font-bold text-slate-800 mb-1">용법 2: 경험</h4>
                    <p className="text-xs text-slate-500 mb-3">~한 적이 있다</p>
                    <div className="flex flex-col gap-1">
                        <span className="text-[15px] font-bold text-slate-900 italic">¿has estado en españa?</span>
                        <span className="text-xs text-slate-400">스페인에 가본 적 있니?</span>
                    </div>
                </div>
            </div>
          </section>

          {/* 3. 과거완료 */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 과거완료 (haber 선과거 + p.p)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4 font-medium">과거의 어떤 시점보다 더 이전에 이미 끝난 일(대과거)을 나타냅니다.</p>

            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm bg-white mb-6">
                <table className="w-full text-[15px] text-center border-collapse min-w-[640px] table-fixed">
                    <thead className="bg-slate-50 text-slate-900 font-extrabold border-b border-slate-200">
                        <tr>
                            <th className="px-2 py-3 bg-slate-100/50 text-slate-500 w-[14%] whitespace-nowrap">인칭</th>
                            <th className="px-2 py-3 w-[14%] whitespace-nowrap">yo</th>
                            <th className="px-2 py-3 w-[14%] whitespace-nowrap">tú</th>
                            <th className="px-2 py-3 w-[14%] whitespace-nowrap">él/ella</th>
                            <th className="px-2 py-3 w-[14%] whitespace-nowrap">nosotros</th>
                            <th className="px-2 py-3 w-[14%] whitespace-nowrap">vosotros</th>
                            <th className="px-2 py-3 w-[14%] whitespace-nowrap">ellos</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        <tr>
                            <td className="px-2 py-4 font-bold text-emerald-700 bg-emerald-50/30 border-r border-slate-100 whitespace-nowrap">haber</td>
                            {HABER_IMPERFECT.map((h, i) => (
                                <td key={i} className="px-2 py-4 text-slate-900 font-medium border-r border-slate-50 last:border-0 whitespace-nowrap">{h.form}</td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                    <Layers size={18} className="text-emerald-500" />
                    <h4 className="font-bold text-sm text-slate-800">과거의 과거 (대과거)</h4>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-[15px] font-bold text-slate-900 italic leading-relaxed">
                        cuando llegué, juan <span className="text-emerald-600">había salido</span>.
                    </span>
                    <span className="text-xs text-slate-400 mt-1">내가 도착했을 때(과거), 후안은 이미 나갔었다(대과거).</span>
                </div>
            </div>
          </section>

          {/* 4. 주의사항 */}
          <section id="sec-4" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">4.</span> 주의사항: 분사의 불변성
            </h2>
            <div className="p-5 bg-amber-50 border border-amber-200 rounded-xl shadow-sm flex items-start gap-3">
                <AlertTriangle size={20} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                    <h4 className="font-bold text-sm text-amber-900 uppercase mb-1">성·수 일치 금지</h4>
                    <p className="text-[14px] text-amber-800 mb-2 font-medium">
                        완료 시제에서 과거분사는 주어가 여성이든 복수이든 상관없이 항상 <span className="font-black text-slate-900">-o</span> 형태로 고정됩니다.
                    </p>
                    <div className="flex gap-4 text-sm font-bold bg-white/50 p-2 rounded">
                        <span className="text-slate-900">ellas han comido. (o)</span>
                        <span className="text-slate-400 line-through decoration-red-400">ellas han comidas. (x)</span>
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
                            <p className="font-bold text-slate-900 text-base leading-snug">{q.q}</p>
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