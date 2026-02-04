'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, ArrowRight, Info, GitCommit, Sparkles, Lightbulb
} from 'lucide-react';

const CONJUGATION_RA = [
    { p: 'yo', end: '-ra', hab: 'hablara', com: 'comiera', viv: 'viviera' },
    { p: 'tú', end: '-ras', hab: 'hablaras', com: 'comieras', viv: 'vivieras' },
    { p: 'él/ella/ud.', end: '-ra', hab: 'hablara', com: 'comiera', viv: 'viviera' },
    { p: 'nosotros', end: '-ramos', hab: 'habláramos', com: 'comiéramos', viv: 'viviéramos' },
    { p: 'vosotros', end: '-rais', hab: 'hablarais', com: 'comierais', viv: 'vivierais' },
    { p: 'ellos/ellas/uds.', end: '-ran', hab: 'hablaran', com: 'comieran', viv: 'vivieran' }
];

const IRREGULAR_STEMS = [
    { inf: 'ser / ir', pret: 'fueron', stem: 'fue-', yo: 'fuera' },
    { inf: 'tener', pret: 'tuvieron', stem: 'tuvie-', yo: 'tuviera' },
    { inf: 'hacer', pret: 'hicieron', stem: 'hicie-', yo: 'hiciera' },
    { inf: 'decir', pret: 'dijeron', stem: 'dije-', yo: 'dijera' },
    { inf: 'poder', pret: 'pudieron', stem: 'pudie-', yo: 'pudiera' },
    { inf: 'saber', pret: 'supieron', stem: 'supie-', yo: 'supiera' }
];

const USAGE_CASES = [
    { type: '시제 일치', desc: '주절이 과거(점과거/선과거)일 때 종속절의 시제를 일치시킵니다.', ex: 'Quería que estudiaras más.', ko: '네가 공부를 더 하기를 원했었다.' },
    { type: 'Si 가정문', desc: '현재 사실과 반대되는 가상의 상황을 가정할 때 사용합니다.', ex: 'Si tuviera dinero, viajaría por todo el mundo.', ko: '돈이 있다면 전 세계를 여행할 텐데.' },
    { type: '정중한 표현', desc: '의견이나 요청을 아주 공손하게 표현할 때 사용합니다.', ex: 'Quisiera un café, por favor.', ko: '커피 한 잔 주시면 좋겠습니다.' },
    { type: 'Como si', desc: '마치 ~인 것처럼 (사실이 아닌 가정을 묘사할 때)', ex: 'Habla como si fuera rico.', ko: '그는 마치 부자인 것처럼 말한다.' }
];

const QUIZ_DATA = [
    { id: 1, q: "빈칸 채우기: Estar의 접속법 과거 Yo 형태 (Estuvieron → ?)", options: ['estara', 'estuviera', 'estuviese'], answer: 1, explain: "점과거 3인칭 복수 estuvieron에서 -ron을 빼고 -ra를 붙이면 estuviera가 됩니다." },
    { id: 2, q: "가정문 완성: Si yo (     ) tú, no lo haría. (Ser)", options: ['sea', 'fui', 'fuera'], answer: 2, explain: "현재 사실과 반대되는 가정(내가 너라면)에는 접속법 과거(fuera)를 씁니다." },
    { id: 3, q: "시제 일치: Me alegró que tú (     ) ayer. (Venir)", options: ['vengas', 'vinieras'], answer: 1, explain: "주절이 과거(alegró)이므로 종속절도 접속법 과거(vinieras)로 일치시켜야 합니다." },
    { id: 4, q: "불규칙 어간: Decir의 접속법 과거 3인칭 복수형은?", options: ['decieran', 'dijeran', 'dijeron'], answer: 1, explain: "Decir의 점과거 3인칭 복수 dijeron에서 ron을 뺀 어간 dije-에 ran을 붙인 dijeran이 정답입니다." }
];

export default function SubjunctiveImperfectDetail() {
  const [quizState, setQuizState] = useState<{ [key: number]: number | null }>({});
  const [showExplain, setShowExplain] = useState<{ [key: number]: boolean }>({});

  const handleQuiz = (qId: number, optIdx: number) => {
    setQuizState(prev => ({ ...prev, [qId]: optIdx }));
    setShowExplain(prev => ({ ...prev, [qId]: true }));
  };

  const scrollTo = (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderVerb = (word: string) => {
      const suffixes = ['áramos', 'iéramos', 'arais', 'ierais', 'ara', 'iera', 'aras', 'ieras', 'aran', 'ieran'];
      let foundSuffix = "";
      for (const s of suffixes) {
          if (word.endsWith(s)) {
              foundSuffix = s;
              break;
          }
      }
      const stem = word.slice(0, word.length - foundSuffix.length);
      return (
          <span className="whitespace-nowrap">
              <span className="text-slate-900">{stem}</span>
              <span className="text-red-600 font-bold">{foundSuffix}</span>
          </span>
      );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto px-6 lg:px-8 py-8 font-sans text-slate-800 bg-white">
      
      <article className="flex-1 min-w-0">
          <header className="mb-12 border-b border-slate-200 pb-8">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 tracking-widest mb-3">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 36</span>
                <ChevronRight size={10} />
                <span>Advanced Level</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
              접속법 과거
            </h1>
            <p className="text-[16px] text-slate-600 font-medium leading-relaxed max-w-3xl">
               과거 시점에서의 소망이나 의심, 그리고 '만약 ~라면'과 같은 가상의 상황을 표현하는 고급 시제입니다.
            </p>
          </header>

          <div className="mb-12 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium text-slate-700">
                  <li><strong>어간 추출</strong>: 직설법 점과거 3인칭 복수(ellos)에서 <span className="text-red-500 font-bold">-ron</span>을 떼어냅니다.</li>
                  <li><strong>형태</strong>: 모든 동사가 공통 어미(-ra, -ras...)를 사용합니다.</li>
                  <li><strong>용법</strong>: 과거 시제 일치와 Si 가정문(현재 반대)에서 필수적입니다.</li>
              </ul>
          </div>

          {/* 1. 형태 */}
          <section id="sec-1" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 접속법 과거의 형태 (Formation)
            </h2>
            <p className="text-[16px] text-slate-600 mb-6 font-medium">점과거 3인칭 복수형이 기준이며, 어미는 모든 동사군이 동일합니다.</p>
            
            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm mb-8 flex flex-col items-center">
                <div className="flex items-center gap-4 text-[16px]">
                    <div className="flex flex-col items-center">
                        <span className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-tighter">점과거 3인칭 복수</span>
                        <span className="font-bold text-slate-900 text-lg">habla<span className="text-slate-400 line-through decoration-red-500">ron</span></span>
                    </div>
                    <ArrowRight size={18} className="text-blue-500" />
                    <div className="flex flex-col items-center">
                        <span className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-tighter">접속법 과거 어간</span>
                        <span className="font-bold text-blue-600 text-lg">habla-</span>
                    </div>
                    <ArrowRight size={18} className="text-blue-500" />
                    <div className="flex flex-col items-center">
                        <span className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-tighter">어미 결합</span>
                        <span className="font-bold text-slate-900 text-lg">habla<span className="text-red-600">ra</span></span>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm">
                        <tr>
                            <th className="px-6 py-4 whitespace-nowrap">주어</th>
                            <th className="px-6 py-4 whitespace-nowrap">어미 (-ra형)</th>
                            <th className="px-6 py-4 whitespace-nowrap">hablar (말하다)</th>
                            <th className="px-6 py-4 whitespace-nowrap">comer (먹다)</th>
                            <th className="px-6 py-4 whitespace-nowrap">vivir (살다)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {CONJUGATION_RA.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 font-bold text-slate-400 text-[16px] whitespace-nowrap">{row.p}</td>
                                <td className="px-6 py-4 font-bold text-red-600 text-lg whitespace-nowrap">{row.end}</td>
                                <td className="px-6 py-4 font-medium text-[16px] whitespace-nowrap">{renderVerb(row.hab)}</td>
                                <td className="px-6 py-4 font-medium text-[16px] whitespace-nowrap">{renderVerb(row.com)}</td>
                                <td className="px-6 py-4 font-medium text-[16px] whitespace-nowrap">{renderVerb(row.viv)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="mt-4 text-sm text-slate-500 flex items-center justify-center gap-1.5 italic font-medium">
                <Info size={14} className="text-blue-400"/> nosotros 형태는 항상 어미 앞 모음에 강세 부호(tilde)가 붙습니다. (habláramos)
            </p>
          </section>

          {/* 2. 불규칙 어간 */}
          <section id="sec-2" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 불규칙 동사의 어간 추출
            </h2>
            <p className="text-[16px] text-slate-600 mb-6 font-medium">점과거가 불규칙하면 접속법 과거도 그 불규칙 어간을 그대로 가져옵니다.</p>
            <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm">
                        <tr>
                            <th className="px-6 py-4 w-1/4 whitespace-nowrap">원형</th>
                            <th className="px-6 py-4 w-1/4 whitespace-nowrap">점과거 (3인칭 복수)</th>
                            <th className="px-6 py-4 w-1/4 whitespace-nowrap">접속법 어간</th>
                            <th className="px-6 py-4 whitespace-nowrap">Yo 변화형</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {IRREGULAR_STEMS.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors text-[16px]">
                                <td className="px-6 py-5 font-bold text-slate-400 bg-slate-50/30 border-r border-slate-100 whitespace-nowrap">{row.inf}</td>
                                <td className="px-6 py-5 font-medium text-slate-600 whitespace-nowrap">{row.pret}</td>
                                <td className="px-6 py-5 font-bold text-slate-900 whitespace-nowrap">{row.stem}</td>
                                <td className="px-6 py-5 font-bold text-blue-600 whitespace-nowrap">{row.yo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 3. 용법 */}
          <section id="sec-3" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 주요 용법 및 시제 일치
            </h2>
            <p className="text-[15px] text-slate-600 mb-6 font-medium">주절이 과거이거나, 비현실적인 가정을 할 때 사용합니다.</p>
            <div className="space-y-3 max-w-4xl">
                {USAGE_CASES.map((item, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:border-violet-300 transition-all flex flex-col gap-2">
                        <div className="flex items-baseline gap-2">
                            <h4 className="text-base font-bold text-slate-800 tracking-tight flex items-center gap-2">
                                {idx === 1 ? <Sparkles size={14} className="text-purple-400"/> : <Check size={14} className="text-blue-400"/>}
                                {item.type}
                            </h4>
                            <span className="text-xs text-slate-400 font-medium">({item.desc})</span>
                        </div>
                        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                            <p className="text-[16px] text-slate-900 font-bold mb-0.5 italic">"{item.ex}"</p>
                            <p className="text-xs text-slate-500 font-medium">{item.ko}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-8 p-5 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm max-w-4xl">
                <div className="flex items-center gap-2 mb-3">
                    <GitCommit size={18} className="text-blue-500"/>
                    <h4 className="font-bold text-sm text-slate-800 tracking-widest uppercase">Si 가정문 공식</h4>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 text-center shadow-inner">
                    <span className="text-slate-900 font-bold text-lg">Si + <span className="text-blue-600 underline underline-offset-4">접속법 과거</span>, <span className="text-emerald-600 underline underline-offset-4">조건형</span></span>
                    <p className="text-xs text-slate-400 mt-2 font-medium">만약 ~라면 (현재 사실 반대), ~할 텐데 (가정)</p>
                </div>
            </div>
          </section>

          {/* 연습 문제 */}
          <section id="sec-4" className="scroll-mt-24 pt-8 border-t border-slate-200">
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
                {['형태 및 규칙', '불규칙 어간', '주요 용법', '연습 문제'].map((item, i) => (
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