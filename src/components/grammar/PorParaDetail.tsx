'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, CornerDownRight, ArrowRight, Info, AlertTriangle, Scale, Zap, Lightbulb
} from 'lucide-react';

const PARA_USAGE = [
    { cat: '목적', desc: '~하기 위하여 (동사원형 결합)', ex: 'Estudio para aprender español.', ko: '스페인어를 배우기 위해 공부한다.' },
    { cat: '수혜자', desc: '~를 위하여 (대상 지칭)', ex: 'Este regalo es para ti.', ko: '이 선물은 너를 위한 것이다.' },
    { cat: '목적지', desc: '~를 향하여 (이동 방향)', ex: 'Salgo para Madrid.', ko: '마드리드를 향해 출발한다.' },
    { cat: '마감 기한', desc: '~까지 (완료 시점)', ex: 'La tarea es para mañana.', ko: '숙제는 내일까지다.' },
    { cat: '의견', desc: '~가 보기에는 (판단 기준)', ex: 'Para mí, es difícil.', ko: '내가 보기에는 어렵다.' }
];

const POR_USAGE = [
    { cat: '원인/이유', desc: '~ 때문에 (동기)', ex: 'Lo hago por amor.', ko: '사랑 때문에 그것을 한다.' },
    { cat: '경로', desc: '~를 통하여 (통과 지점)', ex: 'Paso por el parque.', ko: '공원을 지나간다.' },
    { cat: '기간', desc: '~ 동안 (시간의 길이)', ex: 'Estudio por dos horas.', ko: '두 시간 동안 공부한다.' },
    { cat: '교환/가격', desc: '~ 대신에 / ~의 가격으로', ex: 'Te doy cinco euros por el libro.', ko: '그 책의 대가로 5유로를 준다.' },
    { cat: '수단', desc: '~로 / ~를 통해서 (통신/교통)', ex: 'Hablo por teléfono.', ko: '전화로 이야기한다.' }
];

const IDIOMS = [
    { prep: 'por', idiom: 'por favor', mean: '부탁합니다', ex: 'Un café, por favor.', tr: '커피 한 잔 부탁해요.' },
    { prep: 'por', idiom: 'por ejemplo', mean: '예를 들어', ex: 'Me gustan las frutas, por ejemplo, la manzana.', tr: '나는 과일을 좋아해, 예를 들어 사과.' },
    { prep: 'por', idiom: 'por fin', mean: '마침내', ex: '¡Por fin has llegado!', tr: '마침내 도착했구나!' },
    { prep: 'por', idiom: 'por ciento', mean: '퍼센트 (%)', ex: 'El cien por ciento de los alumnos.', tr: '학생의 100%.' },
    { prep: 'para', idiom: 'para siempre', mean: '영원히', ex: 'Te amaré para siempre.', tr: '너를 영원히 사랑할 거야.' },
    { prep: 'para', idiom: 'para qué', mean: '무엇을 위해', ex: '¿Para qué sirve esto?', tr: '이건 뭐에 쓰는 거야?' },
    { prep: 'para', idiom: 'para variar', mean: '웬일로/변화를 위해', ex: 'Vamos al cine para variar.', tr: '기분 전환 겸 영화 보러 가자.' }
];

const COMPARISON_SUMMARY = [
    { item: '장소', por: '경로 (통과, 근처)', para: '목적지 (도착점)' },
    { item: '시간', por: '기간 (길이)', para: '마감 (기한)' },
    { item: '인과', por: '원인 (동기)', para: '목적 (의도)' },
    { item: '관계', por: '교환 (대신하여)', para: '수혜 (위하여)' }
];

const QUIZ_DATA = [
    { id: 1, q: "빈칸 채우기 (목적): estudio mucho (     ) ser médico.", options: ['por', 'para'], answer: 1, explain: "의사가 되려는 '목적'을 나타낼 때는 para를 사용합니다." },
    { id: 2, q: "빈칸 채우기 (이유): gracias (     ) tu ayuda.", options: ['por', 'para'], answer: 0, explain: "도움에 대한 '이유/동기'를 나타낼 때는 por를 사용합니다." },
    { id: 3, q: "틀린 문장 고치기 (세비야가 목적지일 때): el tren va (     ) sevilla.", options: ['por', 'para'], answer: 1, explain: "세비야를 거쳐가는 것이 아니라 '목적지'라면 para를 써야 합니다." },
    { id: 4, q: "빈칸 채우기 (수단): te llamo (     ) teléfono esta tarde.", options: ['por', 'para'], answer: 0, explain: "전화나 인터넷 같은 통신 수단을 나타낼 때는 por를 사용합니다." }
];

export default function PorParaDetail() {
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
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 tracking-widest mb-2">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 30</span>
                <ChevronRight size={10} />
                <span>Intermediate Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              전치사 I (por, para)
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               원인·경로(Por) vs 목적·결과(Para)의 4대 핵심 대조를 학습합니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium text-slate-700">
                  <li><strong>para</strong>: 화살표의 끝(목적지, 수혜자, 마감, 용도)을 향합니다.</li>
                  <li><strong>por</strong>: 화살표의 시작이나 통로(이유, 수단, 경로, 기간)를 나타냅니다.</li>
                  <li><strong>관용구</strong>: por favor, por ejemplo 등 굳어진 표현을 익히는 것도 중요합니다.</li>
              </ul>
          </div>

          {/* 1. para */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-orange-500">1.</span> 전치사 para의 용법 (목표와 마감)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4 font-medium">동작이 지향하는 최종 지점이나 목적을 나타낼 때 사용합니다.</p>
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
                        {PARA_USAGE.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 font-bold text-orange-600 bg-orange-50/30 border-r border-slate-100 whitespace-nowrap">{row.cat}</td>
                                <td className="px-5 py-4 text-slate-600 font-medium whitespace-nowrap">{row.desc}</td>
                                <td className="px-5 py-4 whitespace-nowrap">
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

          {/* 2. por */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 전치사 por의 용법 (원인과 경로)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4 font-medium">동작이 일어나는 동기, 수단, 혹은 통과하는 경로를 나타낼 때 사용합니다.</p>
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
                        {POR_USAGE.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 font-bold text-blue-600 bg-blue-50/30 border-r border-slate-100 whitespace-nowrap">{row.cat}</td>
                                <td className="px-5 py-4 text-slate-600 font-medium whitespace-nowrap">{row.desc}</td>
                                <td className="px-5 py-4 whitespace-nowrap">
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

          {/* 3. 대조 요약 */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 핵심 대조 요약
            </h2>
            <p className="text-[15px] text-slate-600 mb-4 font-medium">상황에 따른 두 전치사의 개념 차이를 한눈에 비교합니다.</p>
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] border-collapse text-center">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm">
                        <tr>
                            <th className="px-5 py-3 w-1/4">비교 항목</th>
                            <th className="px-5 py-3 text-blue-600">por (시작/과정)</th>
                            <th className="px-5 py-3 text-orange-500">para (결과/목표)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {COMPARISON_SUMMARY.map((r, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100">{r.item}</td>
                                <td className="px-5 py-4 text-slate-700 text-center font-bold text-base">{r.por}</td>
                                <td className="px-5 py-4 text-slate-700 text-center font-bold text-base">{r.para}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 4. 관용구 */}
          <section id="sec-4" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">4.</span> 필수 관용구 (expresiones)
            </h2>
            <p className="text-[15px] text-slate-600 mb-6 font-medium">하나의 단어처럼 굳어져 사용되는 주요 표현들입니다.</p>
            
            <div className="space-y-10">
                {/* por 계열 표 */}
                <div>
                    <h4 className="text-sm font-black text-blue-500 mb-3 tracking-widest uppercase pl-2 border-l-4 border-blue-200">por 계열</h4>
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
                                {IDIOMS.filter(i => i.prep === 'por').map((row, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
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
                    </div>
                </div>

                {/* para 계열 표 */}
                <div>
                    <h4 className="text-sm font-black text-orange-500 mb-3 tracking-widest uppercase pl-2 border-l-4 border-orange-200">para 계열</h4>
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
                                {IDIOMS.filter(i => i.prep === 'para').map((row, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-5 py-4 font-black text-orange-500 text-base">{row.idiom}</td>
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
                    </div>
                </div>
            </div>
          </section>

          {/* 연습 문제 */}
          <section id="sec-5" className="scroll-mt-24 pt-8 border-t border-slate-200">
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

                                let buttonStyle = "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300";
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
                {['para 용법', 'por 용법', '핵심 대조 요약', '필수 관용구', '연습 문제'].map((item, i) => (
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