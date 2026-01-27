'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, CornerDownRight, ArrowRight, Info, AlertTriangle, Heart, HelpCircle, Lightbulb
} from 'lucide-react';

const SUBJUNCTIVE_REGULAR = [
    { p: 'yo', ar: 'e', er: 'a', ir: 'a' },
    { p: 'tú', ar: 'es', er: 'as', ir: 'as' },
    { p: 'él/ella/ud.', ar: 'e', er: 'a', ir: 'a' },
    { p: 'nosotros/as', ar: 'emos', er: 'amos', ir: 'amos' },
    { p: 'vosotros/as', ar: 'éis', er: 'áis', ir: 'áis' },
    { p: 'ellos/as/uds.', ar: 'en', er: 'an', ir: 'an' }
];

const SUBJUNCTIVE_IRREGULAR = [
    { inf: 'ser (이다)', yo: 'sea' },
    { inf: 'ir (가다)', yo: 'vaya' },
    { inf: 'saber (알다)', yo: 'sepa' },
    { inf: 'dar (주다)', yo: 'dé' },
    { inf: 'estar (있다)', yo: 'esté' },
    { inf: 'haber (있다)', yo: 'haya' }
];

const WEIRDO_USAGE = [
    { char: 'W', rest: 'ishes', kor: '소망', ex: 'quiero que vengas. (네가 오길 원해)' },
    { char: 'E', rest: 'motions', kor: '감정', ex: 'me alegro de que estés aquí. (네가 있어서 기뻐)' },
    { char: 'I', rest: 'mpersonal', kor: '비인칭', ex: 'es necesario que estudies. (네가 공부하는 게 필요해)' },
    { char: 'R', rest: 'equests', kor: '요청', ex: 'te pido que comas esto. (이걸 먹으라고 요청해)' },
    { char: 'D', rest: 'oubt', kor: '의심', ex: 'dudo que él diga la verdad. (그가 진실을 말할지 의심스러워)' },
    { char: 'O', rest: 'jalá', kor: '희망', ex: '¡ojalá tengas buen día! (부디 좋은 하루 보내길!)' }
];

const QUIZ_DATA = [
    { id: 1, q: "빈칸 채우기: es importante que tú ( ) la verdad. (saber)", options: ['sabes', 'sepas', 'sepa'], answer: 1, explain: "비인칭 구문(es importante que) 뒤에는 접속법을 쓰며, saber는 불규칙 변화(sepa, sepas...)를 합니다." },
    { id: 2, q: "직설법 vs 접속법: no creo que él ( ) hoy. (venir)", options: ['viene', 'venga'], answer: 1, explain: "no creo que(부정/의심) 뒤에는 접속법(venga)을 씁니다. creo que(확신) 뒤에는 직설법(viene)을 씁니다." },
    { id: 3, q: "불규칙 동사 ser의 접속법 1인칭 단수형은?", options: ['sere', 'sea', 'sepa'], answer: 1, explain: "ser의 접속법 형태는 sea, seas, sea... 입니다." },
    { id: 4, q: "빈칸 채우기: ella quiere que nosotros ( ) mucho. (comer)", options: ['comemos', 'comas', 'comamos'], answer: 2, explain: "주절의 'quiere'(소망)로 인해 종속절에 접속법이 오며, nosotros 인칭의 -er 동사 접속법 어미는 -amos입니다." }
];

export default function SubjunctiveBasicsDetail() {
  const [quizState, setQuizState] = useState<{ [key: number]: number | null }>({});
  const [showExplain, setShowExplain] = useState<{ [key: number]: boolean }>({});

  const handleQuiz = (qId: number, optIdx: number) => {
    setQuizState(prev => ({ ...prev, [qId]: optIdx }));
    setShowExplain(prev => ({ ...prev, [qId]: true }));
  };

  const scrollTo = (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderVerb = (stem: string, suffix: string) => (
      <span>{stem}<span className="text-violet-600 font-bold">{suffix}</span></span>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto px-6 lg:px-8 py-8 font-sans text-slate-800 bg-white">
      
      <article className="flex-1 min-w-0">
          <header className="mb-8 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 25</span>
                <ChevronRight size={10} />
                <span>Intermediate Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              접속법 기초
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               사실이 아닌 화자의 주관적인 태도(소망, 의심, 감정)를 표현하는 법을 배웁니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium">
                  <li><strong>교차 법칙</strong>: -ar 동사는 -e 어미를, -er/-ir 동사는 -a 어미를 씁니다.</li>
                  <li><strong>WEIRDO</strong>: 소망, 감정, 의심 등 접속법을 유발하는 6가지 주요 상황입니다.</li>
                  <li><strong>불규칙</strong>: yo 형태가 불규칙하면 접속법도 불규칙을 따릅니다.</li>
              </ul>
          </div>

          {/* 1. 형태 */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-violet-600">1.</span> 접속법 현재의 형태 (교차 법칙)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4 font-medium">직설법 현재 yo에서 -o를 떼고 반대 성격의 어미를 붙입니다.</p>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm mb-6">
                <table className="w-full text-[15px] text-center border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 text-left pl-8 w-1/4 whitespace-nowrap">주어</th>
                            <th className="px-5 py-3 w-1/4 bg-violet-50 text-violet-700 whitespace-nowrap">-ar (hablar)</th>
                            <th className="px-5 py-3 w-1/4 bg-purple-50 text-purple-700 whitespace-nowrap">-er (comer)</th>
                            <th className="px-5 py-3 w-1/4 bg-purple-50 text-purple-700 whitespace-nowrap">-ir (vivir)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {SUBJUNCTIVE_REGULAR.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 text-left pl-8 font-bold text-slate-400 text-sm whitespace-nowrap">{row.p}</td>
                                <td className="px-5 py-4 font-bold text-slate-900 border-x border-violet-50 bg-violet-50/10 whitespace-nowrap">
                                    {renderVerb('habl', row.ar)}
                                </td>
                                <td className="px-5 py-4 font-bold text-slate-900 border-r border-purple-50 bg-purple-50/10 whitespace-nowrap">
                                    {renderVerb('com', row.er)}
                                </td>
                                <td className="px-5 py-4 font-bold text-slate-900 bg-purple-50/10 whitespace-nowrap">
                                    {renderVerb('viv', row.ir)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <h3 className="text-[13px] font-black text-slate-400 mb-3 tracking-widest pl-2 border-l-2 border-slate-200">yo 형태 기반 불규칙</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-violet-50 rounded-lg border border-violet-100 text-sm text-center">
                    <span className="font-bold text-violet-900 block mb-1">tener (tengo)</span>
                    <span className="text-violet-600">tenga, tengas, tenga...</span>
                </div>
                <div className="p-3 bg-violet-50 rounded-lg border border-violet-100 text-sm text-center">
                    <span className="font-bold text-violet-900 block mb-1">hacer (hago)</span>
                    <span className="text-violet-600">haga, hagas, haga...</span>
                </div>
            </div>
          </section>

          {/* 2. 완전 불규칙 */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-violet-600">2.</span> 완전 불규칙 (The 6 Essentials)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4 font-medium">어미 교차 법칙을 따르지 않는 6개 동사입니다.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {SUBJUNCTIVE_IRREGULAR.map((item, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 p-3 rounded-lg text-center hover:border-violet-300 transition-colors shadow-sm">
                        <span className="block text-slate-400 text-xs mb-1 font-medium">{item.inf}</span>
                        <span className="block text-violet-700 font-bold text-lg">{item.yo}</span>
                    </div>
                ))}
            </div>
          </section>

          {/* 3. 용법 (WEIRDO) */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-violet-600">3.</span> 접속법의 주요 용법 (WEIRDO)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4 font-medium">주절의 동사가 소망, 감정 등을 나타낼 때 종속절에 접속법을 씁니다.</p>
            <div className="space-y-3">
                {WEIRDO_USAGE.map((item, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-violet-200 transition-colors">
                        <div className="flex items-center gap-0 min-w-[150px] mb-2 sm:mb-0">
                            <span className="text-lg font-bold text-violet-600 leading-tight">{item.char}</span>
                            <span className="text-sm font-bold text-slate-700 leading-tight">{item.rest}</span>
                            <span className="text-sm text-slate-400 ml-1.5 font-normal leading-tight">({item.kor})</span>
                        </div>
                        <div className="flex flex-col items-end text-right">
                            <span className="text-[15px] font-bold text-slate-900">{item.ex.split('(')[0]}</span>
                            <span className="text-xs text-slate-400 mt-0.5">{item.ex.split('(')[1]?.replace(')', '')}</span>
                        </div>
                    </div>
                ))}
            </div>
          </section>

          {/* 4. 직설법 vs 접속법 */}
          <section id="sec-4" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-violet-600">4.</span> 직설법 vs 접속법 구분
            </h2>
            <p className="text-[15px] text-slate-600 mb-4 font-medium">확신(직설법)과 불확실/부정(접속법)의 차이를 이해해야 합니다.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <h4 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                        <Info size={16} className="text-blue-500"/> 확신 (creo que...)
                    </h4>
                    <div className="bg-blue-50 p-3 rounded mb-2 border border-blue-100">
                        <span className="text-blue-900 font-bold">creo que él viene.</span>
                    </div>
                    <p className="text-xs text-slate-500">나는 그가 온다고 믿는다. (사실로 간주)</p>
                </div>
                <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <h4 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                        <HelpCircle size={16} className="text-violet-500"/> 불확실 (no creo que...)
                    </h4>
                    <div className="bg-violet-50 p-3 rounded mb-2 border border-violet-100">
                        <span className="text-violet-900 font-bold">no creo que él venga.</span>
                    </div>
                    <p className="text-xs text-slate-500">나는 그가 올 거라고 믿지 않는다. (의심)</p>
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
                {['접속법 형태', '완전 불규칙', 'WEIRDO 용법', '직설법 비교', '연습 문제'].map((item, i) => (
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