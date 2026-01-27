'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, CornerDownRight, ArrowRight, Info, AlertTriangle, Link2, GitCompare, Lightbulb
} from 'lucide-react';

const CONNECTORS_BY_CAT = [
    { cat: '원인 (causa)', list: 'porque (~때문에), ya que (~이므로), como (맨 앞에 올 때: ~해서), debido a (+명사)' },
    { cat: '결과 (consecuencia)', list: 'por eso (그래서), así que (그러니까), por lo tanto (그러므로), de modo que (그리하여)' },
    { cat: '대조 (oposición)', list: 'pero (하지만), sin embargo (그러나), sino (a가 아니라 b), en cambio (반면에)' },
    { cat: '첨가 (adición)', list: 'además (게다가), es más (한술 더 떠서), asimismo (마찬가지로)' }
];

const MODE_RULES = [
    { type: '직설법 (indicativo)', target: 'porque, ya que, puesto que', desc: '이미 확정된 사실이나 근거를 진술할 때' },
    { type: '접속법 (subjuntivo)', target: 'no porque, de ahí que', desc: '이유를 부정하거나 격식 있게 결과를 표현할 때' }
];

const USAGE_COMPARISON = [
    { logic: '원인', sentence: 'como no tenía dinero, no pude comprarlo.', mean: '돈이 없었기에 살 수 없었다.' },
    { logic: '결과', sentence: 'he estudiado mucho, por lo tanto he aprobado.', mean: '공부를 많이 했다, 그러므로 합격했다.' },
    { logic: '대조', sentence: 'el coche es viejo, sin embargo funciona bien.', mean: '차는 낡았으나 잘 작동한다.' },
    { logic: '첨가', sentence: 'es inteligente, además es muy simpático.', mean: '똑똑하고 게다가 매우 친절하다.' }
];

const QUIZ_DATA = [
    { id: 1, q: "빈칸 채우기: no fui a la fiesta ( ) estaba cansado.", options: ['porque', 'sin embargo'], answer: 0, explain: "피곤했다는 '이유'를 설명하므로 porque가 적절합니다." },
    { id: 2, q: "문두 강조: ( ) hace sol, vamos a la playa.", options: ['como', 'pero'], answer: 0, explain: "이유를 문장 맨 앞에서 강조하며 제시할 때는 como를 씁니다." },
    { id: 3, q: "대조의 sino: no es mi hermano, ( ) mi primo.", options: ['pero', 'sino'], answer: 1, explain: "앞에 부정어(no)가 오고 'a가 아니라 b이다'라고 대조할 때는 sino를 씁니다." },
    { id: 4, q: "결과의 연결어: '공부를 안 했다, 그래서 떨어졌다' (no estudié, ( ) suspendí)", options: ['además', 'por eso', 'pero'], answer: 1, explain: "앞 문장의 결과를 나타내는 por eso(그래서)가 가장 적절합니다." }
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
          <header className="mb-8 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 36</span>
                <ChevronRight size={10} />
                <span>Advanced Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              논리적 연결어
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               단순한 문장 나열을 넘어 인과, 대조, 첨가 등의 논리적 흐름을 만드는 법을 배웁니다. <br/>
               B2 레벨 이상의 세련된 문장 구성을 위한 핵심 도구입니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium">
                  <li><strong>분류</strong>: 인과(porque), 결과(por eso), 대조(pero), 첨가(además).</li>
                  <li><strong>위치</strong>: como는 항상 문장 맨 앞에서 이유를 강조할 때 사용합니다.</li>
                  <li><strong>sino</strong>: 부정어 뒤에서 'a가 아니라 b이다'라는 대조를 만듭니다.</li>
              </ul>
          </div>

          {/* 1. 기능적 분류 */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 연결어의 기능적 분류
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">논리적 관계에 따라 연결어의 쓰임새가 달라집니다.</p>
            <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
                <div className="divide-y divide-slate-100 min-w-[600px] bg-white">
                    {CONNECTORS_BY_CAT.map((item, idx) => (
                        <div key={idx} className="p-4 flex items-center gap-6">
                            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded w-28 shrink-0 text-center uppercase tracking-tighter whitespace-nowrap">
                                {item.cat}
                            </span>
                            <span className="text-[14px] text-slate-900 font-medium leading-relaxed whitespace-nowrap">
                                {item.list}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
          </section>

          {/* 2. 법의 선택 */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 연결어와 법(Mode)의 선택
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">일부 연결어는 뒤에 오는 문장의 사실 여부에 따라 법을 선택합니다.</p>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-left border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 w-1/4 whitespace-nowrap">구분</th>
                            <th className="px-5 py-3 w-1/3 whitespace-nowrap">해당 연결어</th>
                            <th className="px-5 py-3 whitespace-nowrap">설명</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white text-[14px]">
                        {MODE_RULES.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                <td className="px-5 py-4 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100 whitespace-nowrap">{row.type}</td>
                                <td className="px-5 py-4 font-bold text-blue-600 whitespace-nowrap">{row.target}</td>
                                <td className="px-5 py-4 text-slate-600 whitespace-nowrap font-medium">{row.desc}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 3. 활용 비교 */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 실전 문장 활용 비교
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">문맥에 따른 논리 구조의 변화를 확인하세요.</p>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-left border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 w-20 whitespace-nowrap">구조</th>
                            <th className="px-5 py-3 whitespace-nowrap">예문</th>
                            <th className="px-5 py-3 text-right pr-8 whitespace-nowrap">번역</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {USAGE_COMPARISON.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                <td className="px-5 py-4 font-bold text-slate-400 text-[10px] whitespace-nowrap text-center">{row.logic}</td>
                                <td className="px-5 py-4 font-bold text-slate-900 whitespace-nowrap">{row.sentence}</td>
                                <td className="px-5 py-4 text-right pr-8 text-slate-500 text-[13px] whitespace-nowrap font-medium">{row.mean}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
                {['기능적 분류', '법의 선택', '실전 활용', '연습 문제'].map((item, i) => (
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