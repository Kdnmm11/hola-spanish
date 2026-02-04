'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, ArrowRight, Info, AlertTriangle, Link2, GitCompare, Lightbulb
} from 'lucide-react';

const MODE_RULES = [
    { type: '직설법 (indicativo)', target: 'porque, ya que, puesto que', desc: '이미 확정된 사실이나 근거를 진술할 때' },
    { type: '접속법 (subjuntivo)', target: 'no porque, de ahí que', desc: '이유를 부정하거나 격식 있게 결과를 표현할 때' }
];

const CAUSE_CONNECTORS = [
    { word: 'porque', mean: '~때문에', ex: 'No fui porque estaba enfermo.', ko: '아팠기 때문에 가지 않았다.' },
    { word: 'ya que', mean: '~이므로 / ~인 이상', ex: 'Ya que estás aquí, ayúdame.', ko: '네가 여기 있는 이상, 나를 도와줘.' },
    { word: 'como', mean: '~해서 (문두 전용)', ex: 'Como hace sol, vamos fuera.', ko: '날씨가 좋아서, 밖으로 나가자.' },
    { word: 'debido a', mean: '~로 인하여 (+명사)', ex: 'Debido al tráfico, llegué tarde.', ko: '교통 체증으로 인해 늦게 도착했다.' }
];

const RESULT_CONNECTORS = [
    { word: 'por eso', mean: '그래서', ex: 'Estudié mucho, por eso aprobé.', ko: '공부를 많이 했다, 그래서 합격했다.' },
    { word: 'así que', mean: '그러니까 / 그래서', ex: 'Tengo hambre, así que voy a comer.', ko: '배가 고프다, 그러니까 먹으러 갈 것이다.' },
    { word: 'por lo tanto', mean: '그러므로 (격식)', ex: 'Es caro, por lo tanto no lo compro.', ko: '그것은 비싸다, 그러므로 사지 않는다.' },
    { word: 'de modo que', mean: '그리하여 / 결과적으로', ex: 'Llovió, de modo que nos quedamos.', ko: '비가 왔다, 그리하여 우리는 머물렀다.' }
];

const CONTRAST_CONNECTORS = [
    { word: 'pero', mean: '하지만', ex: 'Es viejo pero funciona bien.', ko: '낡았지만 잘 작동한다.' },
    { word: 'sin embargo', mean: '그러나 (격식)', ex: 'Hace frío; sin embargo, saldré.', ko: '날씨가 춥다. 그러나 나는 나갈 것이다.' },
    { word: 'sino', mean: 'a가 아니라 b', ex: 'No es azul sino verde.', ko: '파란색이 아니라 초록색이다.' },
    { word: 'en cambio', mean: '반면에', ex: 'Él lee; en cambio, ella escribe.', ko: '그는 읽는다. 반면에 그녀는 쓴다.' }
];

const ADDITION_CONNECTORS = [
    { word: 'además', mean: '게다가', ex: 'Es listo, además es rico.', ko: '그는 똑똑하다, 게다가 부자이다.' },
    { word: 'es más', mean: '한술 더 떠서', ex: 'Me gusta, es más, lo amo.', ko: '그것을 좋아한다, 아니 사랑한다.' },
    { word: 'asimismo', mean: '마찬가지로', ex: 'Come bien, asimismo duerme 잘.', ko: '잘 먹는다, 마찬가지로 잘 잔다.' },
    { word: '정리하자면', mean: '결론적으로', ex: 'En resumen, es un buen plan.', ko: '요약하자면, 좋은 계획이다.' }
];

const QUIZ_DATA = [
    { id: 1, q: "빈칸 채우기: No fui a la fiesta (     ) estaba cansado.", options: ['porque', 'sin embargo'], answer: 0, explain: "피곤했다는 '이유'를 설명하므로 porque가 적절합니다." },
    { id: 2, q: "문두 강조: (     ) hace sol, vamos a la playa.", options: ['Como', 'Pero'], answer: 0, explain: "이유를 문장 맨 앞에서 강조하며 제시할 때는 Como를 씁니다." },
    { id: 3, q: "대조의 Sino: No es mi hermano, (     ) mi primo.", options: ['pero', 'sino'], answer: 1, explain: "앞에 부정어(no)가 오고 'a가 아니라 b이다'라고 대조할 때는 sino를 씁니다." },
    { id: 4, q: "결과의 연결어: '공부를 안 했다, 그래서 떨어졌다' (No estudié, (     ) suspendí)", options: ['además', 'por eso', 'pero'], answer: 1, explain: "앞 문장의 결과를 나타내는 por eso(그래서)가 가장 적절합니다." }
];

export default function LogicalConnectorsDetail() {
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
          <header className="mb-12 border-b border-slate-200 pb-8">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 tracking-widest mb-3">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 41</span>
                <ChevronRight size={10} />
                <span>Advanced Level</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
              논리적 연결어
            </h1>
            <p className="text-[16px] text-slate-600 font-medium leading-relaxed max-w-3xl">
               단순한 문장 나열을 넘어 인과, 대조, 첨가 등의 논리적 흐름을 만드는 법을 배웁니다. <br/>
               세련된 문장 구성을 위해 필수적인 '문장의 관절' 역할을 합니다.
            </p>
          </header>

          <div className="mb-12 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium text-slate-700">
                  <li><strong>인과/결과</strong>: 왜 일어났는지(porque), 그래서 어떻게 됐는지(por eso) 연결.</li>
                  <li><strong>대조</strong>: 앞 내용과 반대(pero)되거나 수정(sino)할 때 사용.</li>
                  <li><strong>첨가</strong>: 정보에 정보를 더할 때(además) 사용.</li>
                  <li><strong>법의 선택</strong>: 사실 관계에 따라 직설법과 접속법을 구분하여 씁니다.</li>
              </ul>
          </div>

          {/* 1. 법의 선택 (기존 2번) */}
          <section id="sec-1" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 연결어와 법(Mode)의 선택
            </h2>
            <p className="text-[15px] text-slate-600 mb-6 font-medium">일부 연결어는 뒤에 오는 문장의 사실 여부나 뉘앙스에 따라 법을 선택합니다.</p>
            <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm">
                        <tr>
                            <th className="px-6 py-4 w-1/4 whitespace-nowrap">구분</th>
                            <th className="px-6 py-4 w-1/3 whitespace-nowrap">해당 연결어</th>
                            <th className="px-6 py-4 whitespace-nowrap">설명</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {MODE_RULES.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-5 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100 whitespace-nowrap">{row.type}</td>
                                <td className="px-6 py-5 font-bold text-blue-600 whitespace-nowrap">{row.target}</td>
                                <td className="px-6 py-5 text-slate-600 font-medium">{row.desc}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 2. 원인 (Causa) */}
          <section id="sec-2" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 원인과 근거 (Causa)
            </h2>
            <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm">
                        <tr>
                            <th className="px-6 py-4 w-1/4">연결어</th>
                            <th className="px-6 py-4 w-1/4">의미</th>
                            <th className="px-6 py-4">예문 및 해석</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {CAUSE_CONNECTORS.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-5 font-bold text-blue-700 whitespace-nowrap">{row.word}</td>
                                <td className="px-6 py-5 text-slate-900 font-bold whitespace-nowrap">{row.mean}</td>
                                <td className="px-6 py-5">
                                    <div className="flex flex-col items-center">
                                        <span className="text-slate-900 font-bold italic">"{row.ex}"</span>
                                        <span className="text-xs text-slate-400 mt-1">{row.ko}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 3. 결과 (Consecuencia) */}
          <section id="sec-3" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 결과와 결론 (Consecuencia)
            </h2>
            <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm">
                        <tr>
                            <th className="px-6 py-4 w-1/4">연결어</th>
                            <th className="px-6 py-4 w-1/4">의미</th>
                            <th className="px-6 py-4">예문 및 해석</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {RESULT_CONNECTORS.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-5 font-bold text-emerald-700 whitespace-nowrap">{row.word}</td>
                                <td className="px-6 py-5 text-slate-900 font-bold whitespace-nowrap">{row.mean}</td>
                                <td className="px-6 py-5">
                                    <div className="flex flex-col items-center">
                                        <span className="text-slate-900 font-bold italic">"{row.ex}"</span>
                                        <span className="text-xs text-slate-400 mt-1">{row.ko}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 4. 대조 (Oposición) */}
          <section id="sec-4" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600">4.</span> 대조와 반전 (Oposición)
            </h2>
            <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm">
                        <tr>
                            <th className="px-6 py-4 w-1/4">연결어</th>
                            <th className="px-6 py-4 w-1/4">의미</th>
                            <th className="px-6 py-4">예문 및 해석</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {CONTRAST_CONNECTORS.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-5 font-bold text-rose-700 whitespace-nowrap">{row.word}</td>
                                <td className="px-6 py-5 text-slate-900 font-bold whitespace-nowrap">{row.mean}</td>
                                <td className="px-6 py-5">
                                    <div className="flex flex-col items-center">
                                        <span className="text-slate-900 font-bold italic">"{row.ex}"</span>
                                        <span className="text-xs text-slate-400 mt-1">{row.ko}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 5. 첨가 (Adición) */}
          <section id="sec-5" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600">5.</span> 정보의 첨가 (Adición)
            </h2>
            <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm">
                        <tr>
                            <th className="px-6 py-4 w-1/4">연결어</th>
                            <th className="px-6 py-4 w-1/4">의미</th>
                            <th className="px-6 py-4">예문 및 해석</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {ADDITION_CONNECTORS.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-5 font-bold text-indigo-700 whitespace-nowrap">{row.word}</td>
                                <td className="px-6 py-5 text-slate-900 font-bold whitespace-nowrap">{row.mean}</td>
                                <td className="px-6 py-5">
                                    <div className="flex flex-col items-center">
                                        <span className="text-slate-900 font-bold italic">"{row.ex}"</span>
                                        <span className="text-xs text-slate-400 mt-1">{row.ko}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
                {['법의 선택', '원인', '결과', '대조', '첨가', '연습 문제'].map((item, i) => (
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