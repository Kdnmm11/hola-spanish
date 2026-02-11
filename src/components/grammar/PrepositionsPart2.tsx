'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, ArrowRight, Info, AlertTriangle, MapPin, User, Settings, Clock, Lightbulb
} from 'lucide-react';

const PREP_EN_USAGE = [
    { type: '장소 (위치)', desc: '~에, ~안에, ~위에 (in/on)', ex: 'Estoy en casa.', ko: '나는 집에 있다.' },
    { type: '교통수단', desc: '~을 타고 (관사 X)', ex: 'Voy en tren.', ko: '기차를 타고 간다.' },
    { type: '시간', desc: '월, 계절, 연도', ex: 'En verano.', ko: '여름에.' }
];

const PREP_CON_USAGE = [
    { type: '동반', desc: '~와 함께 (with)', ex: 'Voy con ella.', ko: '그녀와 함께 간다.' },
    { type: '도구', desc: '~을 가지고, ~로', ex: 'Escribo con lápiz.', ko: '연필로 쓴다.' },
    { type: '태도/양태', desc: '~하게 (부사적 용법)', ex: 'Come con hambre.', ko: '배고프게(허겁지겁) 먹는다.' }
];

const IDIOMS = [
    { prep: 'en', idiom: 'en serio', mean: '진짜로/진지하게', ex: '¿Lo dices en serio?', tr: '진심으로 하는 말이니?' },
    { prep: 'en', idiom: 'en broma', mean: '농담으로', ex: 'Lo dije en broma.', tr: '농담으로 한 말이야.' },
    { prep: 'en', idiom: 'en casa', mean: '집에', ex: 'Estoy en casa.', tr: '나 집에 있어.' },
    { prep: 'en', idiom: 'en punto', mean: '정각에', ex: 'Llego a las dos en punto.', tr: '나는 2시 정각에 도착한다.' },
    { prep: 'con', idiom: 'con permiso', mean: '실례합니다', ex: 'Con permiso, ¿puedo pasar?', tr: '실례합니다, 지나가도 될까요?' },
    { prep: 'con', idiom: 'con cuidado', mean: '조심해서', ex: 'Conduce con cuidado.', tr: '조심해서 운전해.' },
    { prep: 'con', idiom: 'con gusto', mean: '기꺼이', ex: 'Lo haré con gusto.', tr: '기꺼이 해드릴게요.' },
    { prep: 'con', idiom: 'con razón', mean: '어쩐지/당연히', ex: 'Con razón estás cansado.', tr: '어쩐지 네가 피곤해 보이더라.' }
];

const QUIZ_DATA = [
    { id: 1, q: "빈칸 채우기 (교통수단): Voy (     ) autobús.", options: ['a', 'de', 'en'], answer: 2, explain: "교통수단을 나타낼 때는 전치사 'en'을 씁니다. (관사 없이 사용)" },
    { id: 2, q: "빈칸 채우기 (동반): Quiero ir (     ) ti.", options: ['con', 'a', 'de'], answer: 0, explain: "'너와 함께'는 'con + ti'가 결합된 'contigo'를 써야 하지만, 여기서는 의미상 con을 묻는 문제입니다. (실제로는 contigo)" },
    { id: 3, q: "빈칸 채우기 (장소): El libro está (     ) la mesa.", options: ['en', 'a', 'de'], answer: 0, explain: "위치(~위에)를 나타낼 때는 'en'을 씁니다." },
    { id: 4, q: "올바른 표현 고르기: (나와 함께)", options: ['con yo', 'conmigo', 'con mí'], answer: 1, explain: "con + mí는 불규칙 형태인 'conmigo'로 바뀝니다." }
];

export default function PrepositionsPart2() {
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
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 32</span>
                <ChevronRight size={10} />
                <span>Intermediate Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              전치사 III (en, con)
            </h1>
            <p className="text-[16px] text-slate-600 font-medium leading-relaxed">
               위치·수단(en) vs 동반·도구(con)의 핵심 용법 및 관용구를 학습합니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium text-slate-700">
                  <li><strong>en</strong>: in(안), on(위)의 의미를 모두 포함하며, 교통수단 앞에도 쓰입니다.</li>
                  <li><strong>con</strong>: with(함께)의 의미이며, 인칭대명사와 결합 시 특수 형태(conmigo, contigo)가 됩니다.</li>
              </ul>
          </div>

          {/* 1. en */}
          <section id="sec-1" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 전치사 en (위치/수단)
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
                        {PREP_EN_USAGE.map((row, i) => (
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

          {/* 2. con */}
          <section id="sec-2" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 전치사 con (동반/도구)
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
                        {PREP_CON_USAGE.map((row, i) => (
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

            <div className="mt-6 p-5 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-4">
                <AlertTriangle className="text-amber-500 shrink-0 mt-1"/>
                <div>
                    <h5 className="font-bold text-amber-900 text-base mb-2">인칭대명사 결합 특수형</h5>
                    <p className="text-sm text-amber-800 leading-relaxed">
                        con + mí = <span className="font-black text-lg mx-1">conmigo</span> (나와 함께) <br/>
                        con + ti = <span className="font-black text-lg mx-1">contigo</span> (너와 함께)
                    </p>
                </div>
            </div>
          </section>

          {/* 3. 필수 관용구 */}
          <section id="sec-3" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 필수 관용구 (expresiones)
            </h2>
            <p className="text-[15px] text-slate-600 mb-6 font-medium">하나의 단어처럼 굳어져 사용되는 주요 표현들입니다.</p>
            
            <div className="space-y-10">
                {/* en 계열 표 */}
                <div>
                    <h4 className="text-sm font-black text-blue-500 mb-3 tracking-widest uppercase pl-2 border-l-4 border-blue-200">en 계열</h4>
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
                                                {IDIOMS.filter(i => i.prep === 'en').map((row, i) => (
                                                    <tr key={i} className="hover:bg-slate-50/50 transition-colors text-center">
                                                        <td className="px-5 py-4 font-black text-blue-600 text-base">{row.idiom}</td>
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

                {/* con 계열 표 */}
                <div>
                    <h4 className="text-sm font-black text-indigo-500 mb-3 tracking-widest uppercase pl-2 border-l-4 border-indigo-200">con 계열</h4>
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
                                                {IDIOMS.filter(i => i.prep === 'con').map((row, i) => (
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
                {['en (위치/수단)', 'con (동반/도구)', '필수 관용구', '연습 문제'].map((item, i) => (
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