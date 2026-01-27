'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, ArrowRight, AlertTriangle, Info, Lightbulb
} from 'lucide-react';

const PRONOUN_TABLE = [
    { person: '1인칭', sg_word: 'yo', sg_mean: '나', pl_word: 'nosotros / nosotras', pl_mean: '우리들' },
    { person: '2인칭', sg_word: 'tú', sg_mean: '너', pl_word: 'vosotros / vosotras', pl_mean: '너희들' },
    { person: '3인칭', sg_word: 'él / ella', sg_mean: '그 / 그녀', pl_word: 'ellos / ellas', pl_mean: '그들 / 그녀들' },
    { person: '존칭', sg_word: 'usted', sg_mean: '당신 (존댓말)', pl_word: 'ustedes', pl_mean: '당신들' }
];

const PREPOSITIONAL_PRONOUNS = [
    { subj: 'yo', prep: 'mí', ex: 'para mí (나를 위해)' },
    { subj: 'tú', prep: 'ti', ex: 'de ti (너에 대해)' },
    { subj: 'él/ella/usted', prep: 'él/ella/usted', ex: 'sin él (그 없이)' },
    { subj: 'nosotros', prep: 'nosotros', ex: 'con nosotros (우리와 함께)' },
    { subj: 'vosotros', prep: 'vosotros', ex: 'a vosotros (너희에게)' },
    { subj: 'ellos/ellas/ustedes', prep: 'ellos/ellas/ustedes', ex: 'por ellos (그들을 위해)' }
];

const QUIZ_DATA = [
    { id: 1, q: "다음 중 '너희들 (여성만)'을 뜻하는 대명사는?", options: ['nosotros', 'vosotras', 'ellas'], answer: 1, explain: "2인칭 복수이면서 구성원이 모두 여성일 때는 'vosotras'를 씁니다." },
    { id: 2, q: "'나와 함께'의 올바른 형태는?", options: ['con yo', 'con mí', 'conmigo'], answer: 2, explain: "전치사 con과 mí가 결합하면 불규칙 형태인 'conmigo'가 됩니다." },
    { id: 3, q: "존칭 'usted'는 동사 변화에서 몇 인칭 취급을 하나요?", options: ['2인칭', '3인칭'], answer: 1, explain: "의미는 2인칭(당신)이지만, 문법적으로는 항상 3인칭(그/그녀)과 동일하게 변화합니다." },
    { id: 4, q: "남자 1명과 여자 10명이 있는 그룹을 지칭하는 대명사는?", options: ['ellas', 'ellos', 'nosotras'], answer: 1, explain: "남성이 단 한 명이라도 포함되어 있으면 문법적으로 남성 복수형인 'ellos'를 사용합니다." }
];

export default function PronounsDetail() {
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
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 6</span>
                <ChevronRight size={10} />
                <span>Basic Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              인칭대명사 (Pronombres)
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               문장의 주인공을 대신하는 대명사입니다. <br/>
               성별 구분, 존칭 사용, 그리고 전치사와 결합할 때의 특수 형태를 익혀봅시다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium">
                  <li><strong>생략</strong>: 동사 어미에 인칭 정보가 있어 주어를 자주 생략합니다.</li>
                  <li><strong>성별</strong>: 복수형(nosotros, ellos 등)은 성별을 구분하며, 혼성 그룹은 남성형을 씁니다.</li>
                  <li><strong>존칭</strong>: usted(당신)은 3인칭 동사 변화를 따릅니다.</li>
              </ul>
          </div>

          {/* 1. Subject Pronouns Table */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 주격 인칭대명사 분류
            </h2>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-left border-collapse table-fixed min-w-[500px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm">
                        <tr>
                            <th className="px-5 py-3 w-24 border-r border-slate-100 text-center whitespace-nowrap">인칭</th>
                            <th className="px-5 py-3 w-1/2 border-r border-slate-100 whitespace-nowrap">단수 (singular)</th>
                            <th className="px-5 py-3 w-1/2 whitespace-nowrap">복수 (plural)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {PRONOUN_TABLE.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors text-center sm:text-left">
                                <td className="px-5 py-4 font-black text-slate-900 bg-slate-50/30 border-r border-slate-100 text-center whitespace-nowrap">{row.person}</td>
                                <td className="px-5 py-4 border-r border-slate-100 whitespace-nowrap">
                                    <div className="flex flex-col items-start">
                                        <span className="font-bold text-slate-900 text-lg">{row.sg_word}</span>
                                        <span className="text-xs text-slate-400 mt-0.5">{row.sg_mean}</span>
                                    </div>
                                </td>
                                <td className="px-5 py-4 whitespace-nowrap">
                                    <div className="flex flex-col items-start">
                                        <span className="font-bold text-slate-900 text-lg">{row.pl_word}</span>
                                        <span className="text-xs text-slate-400 mt-0.5">{row.pl_mean}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 2. Features */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 주요 특징
            </h2>
            
            <div className="space-y-6">
                <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-800 mb-2 border-l-4 border-slate-800 pl-3 uppercase tracking-tight text-slate-400">주어의 생략</h3>
                    <p className="text-[15px] text-slate-600 mb-3 leading-relaxed">
                        스페인어는 동사 변화만으로 주어를 알 수 있어 생략이 자연스럽습니다. 주어를 쓰면 <strong>강조</strong>하거나 <strong>대조</strong>하는 의미가 됩니다.
                    </p>
                    <div className="bg-slate-50 p-4 rounded text-[15px] text-slate-900 font-medium flex flex-col gap-1">
                        <div>
                            <span className="line-through decoration-slate-400 text-slate-400 mx-1 italic font-normal">yo</span> soy coreano.
                        </div>
                        <span className="text-xs text-slate-400 font-normal mt-0.5">(나는) 한국인이다.</span>
                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-800 mb-2 border-l-4 border-slate-800 pl-3 uppercase tracking-tight text-slate-400">성별 구분 (남녀 혼성)</h3>
                    <p className="text-[15px] text-slate-600 mb-3 leading-relaxed font-medium">
                        복수형에서 남녀가 섞여 있을 경우, 문법적으로 <strong>남성 복수형</strong>을 대표형으로 사용합니다.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex justify-between items-center">
                            <div>
                                <p className="text-lg font-black text-blue-600">ellos</p>
                                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">남자들만 or 남녀 혼성</p>
                            </div>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex justify-between items-center">
                            <div>
                                <p className="text-lg font-black text-red-500">ellas</p>
                                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">오직 여자들만</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </section>

          {/* 3. Prepositional */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 전치격 인칭대명사
            </h2>
            <p className="text-[15px] text-slate-700 mb-4 font-medium leading-relaxed">
                전치사(a, de, para, por 등) 뒤에 올 때 형태가 변하는 대명사입니다. <br/>
                <span className="text-blue-600 font-bold">yo → mí</span>, <span className="text-blue-600 font-bold">tú → ti</span>만 주의하면 나머지는 주격과 같습니다.
            </p>
            
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm mb-6">
                <table className="w-full text-[15px] text-left border-collapse table-fixed min-w-[500px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm">
                        <tr>
                            <th className="px-5 py-2 w-1/4 border-r border-slate-100 whitespace-nowrap">주격</th>
                            <th className="px-5 py-2 w-1/4 border-r border-slate-100 whitespace-nowrap">전치격</th>
                            <th className="px-5 py-2 text-center whitespace-nowrap">예시</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {PREPOSITIONAL_PRONOUNS.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-2 text-slate-400 italic whitespace-nowrap">{row.subj}</td>
                                <td className={`px-5 py-2 font-bold whitespace-nowrap ${row.prep === 'mí' || row.prep === 'ti' ? 'text-blue-600' : 'text-slate-700'}`}>
                                    {row.prep}
                                </td>
                                <td className="px-5 py-2 text-center whitespace-nowrap">
                                    <div className="flex flex-col items-center">
                                        <span className="font-bold text-slate-900 text-sm">{row.ex.split('(')[0]}</span>
                                        <span className="text-[10px] text-slate-400">({row.ex.split('(')[1]}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="p-5 bg-yellow-50 border border-yellow-200 rounded-xl shadow-sm flex gap-4 items-start">
                <AlertTriangle size={20} className="text-yellow-600 shrink-0 mt-0.5"/>
                <div>
                    <h4 className="font-bold text-sm text-yellow-900 uppercase mb-1">예외: con(함께) + 대명사</h4>
                    <p className="text-[14px] text-yellow-800/80 mb-3 font-medium">con 뒤에 mí, ti가 오면 특수한 형태로 합쳐집니다.</p>
                    <div className="flex gap-6 text-sm font-bold text-slate-800">
                        <span className="bg-white px-3 py-1.5 rounded-lg border border-yellow-100 shadow-sm text-xs">con + mí = <span className="text-indigo-600 font-black text-sm">conmigo</span></span>
                        <span className="bg-white px-3 py-1.5 rounded-lg border border-yellow-100 shadow-sm text-xs">con + ti = <span className="text-indigo-600 font-black text-sm">contigo</span></span>
                    </div>
                </div>
            </div>
          </section>

          {/* 4. Honorific */}
          <section id="sec-4" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">4.</span> 당신 (usted / ustedes)
            </h2>
            <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
                <div className="flex items-center gap-2 mb-3 text-slate-800">
                    <Info size={18} className="text-indigo-400" />
                    <h4 className="font-bold text-sm uppercase tracking-tight">문법적 3인칭 취급</h4>
                </div>
                <p className="text-[15px] text-slate-600 leading-relaxed font-medium">
                    의미는 '당신(2인칭)'이지만, 문법적으로는 <span className="text-slate-900 font-bold">3인칭(그/그녀)</span>과 똑같이 동사가 변화합니다. 처음 만난 사람, 윗사람에게 사용하는 존칭입니다.
                </p>
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-[14px]">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <p className="text-[10px] text-slate-400 mb-2 font-bold uppercase tracking-widest">2인칭 (친구에게)</p>
                        <p className="font-bold text-slate-800 italic text-base">¿tú eres coreano?</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 ring-2 ring-indigo-50">
                        <p className="text-[10px] text-indigo-400 mb-2 font-bold uppercase tracking-widest">2인칭 존칭 (낯선 사람에게)</p>
                        <p className="font-bold text-slate-800 italic text-base">¿<span className="text-indigo-600 underline decoration-indigo-200 underline-offset-4">usted</span> es coreano?</p>
                    </div>
                </div>
            </div>
          </section>

          {/* 5. Quiz */}
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

      {/* Sidebar */}
      <aside className="hidden lg:block w-56 shrink-0">
        <div className="sticky top-8 border-l border-slate-100 pl-6">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">On this page</h4>
            <ul className="space-y-3 text-[13px]">
                {['인칭대명사 분류', '주요 특징', '전치격 대명사', '존칭 (usted)', '연습 문제'].map((item, i) => (
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