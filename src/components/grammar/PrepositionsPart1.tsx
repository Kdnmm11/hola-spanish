'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, ArrowRight, Info, AlertTriangle, User, Lightbulb
} from 'lucide-react';

const PREP_A_USAGE = [
    { type: '이동의 방향', desc: '도착점을 향한 이동 (~로)', ex: 'Voy a Madrid.', ko: '마드리드로 간다.' },
    { type: '시간 (시각)', desc: '정확한 시각 (~시에)', ex: 'La clase es a las 9.', ko: '수업은 9시에 시작한다.' },
    { type: '개인적 a', desc: '특정 사람 목적어 앞 (해석 X)', ex: 'Llamo a mi madre.', ko: '나는 어머니께 전화한다.' },
    { type: '간접 목적어', desc: '~에게 (수혜자)', ex: 'Le doy el regalo a Juan.', ko: '후안에게 선물을 준다.' },
    { type: '방식/수단', desc: '~으로, ~식으로', ex: 'Está hecho a mano.', ko: '그것은 수제로(손으로) 만들어졌다.' },
    { type: '주기/빈도', desc: '~당, ~마다', ex: 'Dos veces al día.', ko: '하루에 두 번.' }
];

const PREP_DE_USAGE = [
    { type: '소유/소속', desc: '~의 (possession)', ex: 'El libro de María.', ko: '마리아의 책.' },
    { type: '출처/기원', desc: '~출신, ~로부터', ex: 'Vengo de la oficina.', ko: '나는 사무실에서 오는 길이다.' },
    { type: '재료', desc: '~로 만든', ex: 'Un reloj de oro.', ko: '금시계 (금으로 된 시계).' },
    { type: '원인', desc: '~로 인해, ~ 때문에', ex: 'Murió de hambre.', ko: '그는 배고픔(기아)으로 사망했다.' },
    { type: '특징/묘사', desc: '~를 가진, ~한', ex: 'La chica de ojos azules.', ko: '푸른 눈을 가진 소녀.' },
    { type: '내용물/단위', desc: '~이 담긴, ~의 분량', ex: 'Un vaso de agua.', ko: '물 한 잔.' },
    { type: '시간대', desc: '오전/오후/밤 (시각 뒤)', ex: 'Son las 두 시 de la tarde.', ko: '오후 2시이다.' }
];

const IDIOMS = [
    { prep: 'a', idiom: 'a pie', mean: '걸어서', ex: 'Voy a la escuela a pie.', tr: '나는 걸어서 학교에 간다.' },
    { prep: 'a', idiom: 'a veces', mean: '가끔', ex: 'A veces como pizza.', tr: '가끔 나는 피자를 먹는다.' },
    { prep: 'a', idiom: 'a menudo', mean: '종종', ex: 'Le veo a menudo.', tr: '나는 그를 종종 본다.' },
    { prep: 'a', idiom: 'a la plancha', mean: '그릴에 구운', ex: 'Pollo a la plancha.', tr: '그릴에 구운 닭고기.' },
    { prep: 'de', idiom: 'de nada', mean: '천만에요', ex: '¡Gracias! - ¡De nada!', tr: '고마워! - 천만에!' },
    { prep: 'de', idiom: 'de pie', mean: '서서', ex: 'Estoy de pie todo el día.', tr: '나는 하루 종일 서 있다.' },
    { prep: 'de', idiom: 'de nuevo', mean: '다시', ex: 'Empiezo de nuevo.', tr: '나는 다시 시작한다.' },
    { prep: 'de', idiom: 'de veras', mean: '정말로', ex: '¿De veras te gusta?', tr: '너 그거 정말로 좋아하니?' }
];

const QUIZ_DATA = [
    { id: 1, q: "빈칸 채우기 (개인적 a): Busco (     ) mi hermano.", options: ['a', 'de', 'en'], answer: 0, explain: "특정한 사람(mi hermano)을 찾을 때는 목적어 앞에 전치사 a를 써야 합니다." },
    { id: 2, q: "빈칸 채우기 (출처): Vengo (     ) la oficina.", options: ['a', 'de', 'con'], answer: 1, explain: "어디'로부터' 온다는 출처를 나타낼 때는 de를 씁니다." },
    { id: 3, q: "간접 목적어: 나는 후안에게 선물을 준다. (Le doy el regalo (     ) Juan.)", options: ['a', 'de', 'para'], answer: 0, explain: "~에게(간접 목적어)를 나타낼 때 전치사 a를 사용합니다." },
    { id: 4, q: "특징 묘사: 안경을 쓴 소녀 (La chica (     ) gafas.)", options: ['a', 'de', 'con'], answer: 1, explain: "사람의 특징이나 외양을 묘사할 때 전치사 de를 사용합니다." }
];

export default function PrepositionsPart1() {
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
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 31</span>
                <ChevronRight size={10} />
                <span>Intermediate Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              전치사 II (a, de)
            </h1>
            <p className="text-[16px] text-slate-600 font-medium leading-relaxed">
               방향·목적(a) vs 소유·출처(de)의 핵심 용법 및 관용구를 학습합니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium text-slate-700">
                  <li><strong>a</strong>: 어디로 가는지(→), 누구를 만나는지(사람).</li>
                  <li><strong>de</strong>: 어디서 왔는지(←), 누구의 것인지, 무엇으로 만들었는지.</li>
              </ul>
          </div>

          {/* 1. a */}
          <section id="sec-1" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 전치사 a (방향/목적)
            </h2>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm">
                        <tr>
                            <th className="px-5 py-3 w-24 whitespace-nowrap">용법</th>
                            <th className="px-5 py-3 w-[40%] whitespace-nowrap">설명</th>
                            <th className="px-5 py-3 whitespace-nowrap">예시</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {PREP_A_USAGE.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 font-bold text-blue-600 bg-blue-50/30 border-r border-slate-100 whitespace-nowrap text-center">{row.type}</td>
                                <td className="px-5 py-4 text-slate-600 font-medium whitespace-nowrap text-center">{row.desc}</td>
                                <td className="px-5 py-4 whitespace-nowrap text-center">
                                    <div className="flex flex-col items-center">
                                        <span className="text-slate-900 font-bold text-base">{row.ex}</span>
                                        <span className="text-xs text-slate-400 mt-0.5">{row.ko}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 2. de */}
          <section id="sec-2" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 전치사 de (소유/출처)
            </h2>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm">
                        <tr>
                            <th className="px-5 py-3 w-24 whitespace-nowrap">용법</th>
                            <th className="px-5 py-3 w-[40%] whitespace-nowrap">설명</th>
                            <th className="px-5 py-3 whitespace-nowrap">예시</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {PREP_DE_USAGE.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 font-bold text-indigo-600 bg-indigo-50/30 border-r border-slate-100 whitespace-nowrap text-center">{row.type}</td>
                                <td className="px-5 py-4 text-slate-600 font-medium whitespace-nowrap text-center">{row.desc}</td>
                                <td className="px-5 py-4 whitespace-nowrap text-center">
                                    <div className="flex flex-col items-center">
                                        <span className="text-slate-900 font-bold text-base">{row.ex}</span>
                                        <span className="text-xs text-slate-400 mt-0.5">{row.ko}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 3. 필수 관용구 */}
          <section id="sec-3" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 필수 관용구 (expresiones)
            </h2>
            <p className="text-[15px] text-slate-600 mb-6 font-medium">하나의 단어처럼 굳어져 사용되는 주요 표현들입니다.</p>
            
            <div className="space-y-10">
                {/* a 계열 표 */}
                <div>
                    <h4 className="text-sm font-black text-blue-500 mb-3 tracking-widest uppercase pl-2 border-l-4 border-blue-200">a 계열</h4>
                    <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
                        <table className="w-full text-sm text-left border-collapse min-w-[600px]">
                            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                                <tr>
                                    <th className="px-5 py-3 w-1/4">관용구</th>
                                    <th className="px-5 py-3 w-1/4">의미</th>
                                    <th className="px-5 py-3 w-1/2">예문</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                                {IDIOMS.filter(i => i.prep === 'a').map((row, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-5 py-4 font-black text-blue-600 text-base">{row.idiom}</td>
                                        <td className="px-5 py-4 font-bold text-slate-600">{row.mean}</td>
                                        <td className="px-5 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-slate-900 font-bold italic">{row.ex}</span>
                                                <span className="text-xs text-slate-400 mt-1">{row.tr}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* de 계열 표 */}
                <div>
                    <h4 className="text-sm font-black text-indigo-500 mb-3 tracking-widest uppercase pl-2 border-l-4 border-indigo-200">de 계열</h4>
                                    <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
                                        <table className="w-full text-sm text-center border-collapse min-w-[600px]">
                                            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                                                <tr>
                                                    <th className="px-5 py-3 w-1/4">관용구</th>
                                                    <th className="px-5 py-3 w-1/4">의미</th>
                                                    <th className="px-5 py-3 w-1/2">예문</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 bg-white">
                                                {IDIOMS.filter(i => i.prep === 'de').map((row, i) => (
                                                    <tr key={i} className="hover:bg-slate-50/50 transition-colors text-center">
                                                        <td className="px-5 py-4 font-black text-indigo-600 text-base">{row.idiom}</td>
                                                        <td className="px-5 py-4 font-bold text-slate-600">{row.mean}</td>
                                                        <td className="px-5 py-4">
                                                            <div className="flex flex-col items-center">
                                                                <span className="text-slate-900 font-bold italic">{row.ex}</span>
                                                                <span className="text-xs text-slate-400 mt-1">{row.tr}</span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>                </div>
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
                {['a (방향/목적)', 'de (소유/출처)', '필수 관용구', '연습 문제'].map((item, i) => (
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