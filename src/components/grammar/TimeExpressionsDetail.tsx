'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, ArrowRight, Info, AlertTriangle, Clock, Lightbulb
} from 'lucide-react';

const DAYS_RELATIVE = [
    { point: '2일 전', word: 'anteayer', mean: '그제, 엊그제', color: 'slate' },
    { point: '1일 전', word: 'ayer', mean: '어제', color: 'slate' },
    { point: '현재', word: 'hoy', mean: '오늘', color: 'blue' },
    { point: '1일 후', word: 'mañana', mean: '내일', color: 'indigo' },
    { point: '2일 후', word: 'pasado mañana', mean: '모레', color: 'indigo' }
];

const UNIT_EXPRESSIONS = [
    { unit: '주 (semana)', past: 'la semana pasada', present: 'esta semana', next: 'la semana próxima' },
    { unit: '월 (mes)', past: 'el mes pasado', present: 'este mes', next: 'el mes que viene' },
    { unit: '년 (año)', past: 'el año pasado', present: 'este año', next: 'el año que viene' }
];

const PERIOD_BEGIN_END = [
    { cat: '월 (mes)', begin: 'a principios de mes', end: 'a finales de mes', begin_ko: '월초에', end_ko: '월말에' },
    { cat: '년 (año)', begin: 'a principios de año', end: 'a finales de año', begin_ko: '연초에', end_ko: '연말에' }
];

const ADVERBS = [
    { cat: '시점', word: 'ahora', mean: '지금', ex: 'ahora estudio. (지금 공부한다)' },
    { cat: '시점', word: 'antes', mean: '이전에', ex: 'antes comía mucho. (예전엔 많이 먹었다)' },
    { cat: '시점', word: 'después', mean: '나중에', ex: 'después vamos. (나중에 가자)' },
    { cat: '시점', word: 'pronto', mean: '곧, 빨리', ex: '¡hasta pronto! (곧 보자!)' },
    { cat: '빠르기', word: 'temprano', mean: '일찍', ex: 'me levanto temprano. (일찍 일어난다)' },
    { cat: '빠르기', word: 'tarde', mean: '늦게', ex: 'llegas tarde. (너 늦었어)' },
    { cat: '빠르기', word: 'rápido', mean: '빠르게', ex: 'hablas rápido. (말을 빨리 한다)' },
    { cat: '빠르기', word: 'despacio', mean: '느리게', ex: 'camina despacio. (천천히 걷는다)' }
];

const QUIZ_DATA = [
    { id: 1, q: "한국어 '모레'에 해당하는 스페인어 단어는?", options: ['ayer', 'mañana', 'pasado mañana'], answer: 2, explain: "mañana(내일)에 pasado(지난)가 붙어 '내일이 지난 날'인 모레가 됩니다." },
    { id: 2, q: "'내년'을 표현하는 방식 중 틀린 것은?", options: ['el año pasado', 'el año próximo', 'el año que viene'], answer: 0, explain: "el año pasado는 '지난해(작년)'를 의미합니다." },
    { id: 3, q: "시간상 '일찍' 일어난다고 할 때 알맞은 부사는?", options: ['rápido', 'temprano', 'pronto'], answer: 1, explain: "rápido는 속도가 빠른 것이고, 시간상 이른 것은 temprano를 씁니다." },
    { id: 4, q: "이번 달 말에 휴가를 간다고 할 때 알맞은 표현은?", options: ['a principios de mes', 'a finales de mes', 'a mediados de mes'], answer: 1, explain: "'~말에'는 a finales de... 표현을 사용합니다." }
];

export default function TimeExpressionsDetail() {
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
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 17</span>
                <ChevronRight size={10} />
                <span>Basic Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">시간 및 부사 표현</h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               동작이 일어나는 시점과 방식(빠르기)을 구체화하는 표현들을 학습합니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium text-slate-700">
                  <li><strong>날짜 기준</strong>: hoy(오늘)를 중심으로 ayer(어제), mañana(내일) 등을 사용합니다.</li>
                  <li><strong>결합 표현</strong>: pasado(지난), este(이번), próximo(다음)를 단위 명사와 결합합니다.</li>
                  <li><strong>부사 구분</strong>: 시간상 이름/늦음(temprano/tarde)과 물리적 속도(rápido/despacio)를 구분합니다.</li>
              </ul>
          </div>

          {/* 1. 날짜 기준 */}
          <section id="sec-1" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 날짜 기준 표현 (Relative Days)
            </h2>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-900 font-extrabold border-b border-slate-200 text-[15px]">
                        <tr>
                            <th className="px-5 py-3 w-1/4 text-center whitespace-nowrap">시점</th>
                            <th className="px-5 py-3 text-center whitespace-nowrap">스페인어</th>
                            <th className="px-5 py-3 text-center whitespace-nowrap">의미</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white text-[15px]">
                        {DAYS_RELATIVE.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                <td className="px-5 py-3 font-bold border-r border-slate-100 text-slate-500 whitespace-nowrap">{row.point}</td>
                                <td className="px-5 py-3 font-black text-slate-900 whitespace-nowrap text-lg">{row.word}</td>
                                <td className="px-5 py-3 text-slate-500 whitespace-nowrap">{row.mean}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 2. 단위 표현 */}
          <section id="sec-2" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 주, 월, 년 단위 표현
            </h2>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm mb-6">
                <table className="w-full text-[15px] text-center border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-900 font-extrabold border-b border-slate-200 text-[15px]">
                        <tr>
                            <th className="px-5 py-3 text-center whitespace-nowrap">단위</th>
                            <th className="px-5 py-3 text-center whitespace-nowrap">지난 (pasado)</th>
                            <th className="px-5 py-3 text-center whitespace-nowrap">이번 (este)</th>
                            <th className="px-5 py-3 text-center whitespace-nowrap">다음 (próximo)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {UNIT_EXPRESSIONS.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-3 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100 whitespace-nowrap">{row.unit}</td>
                                <td className="px-5 py-3 text-slate-600 font-medium whitespace-nowrap">{row.past}</td>
                                <td className="px-5 py-3 text-slate-900 font-bold whitespace-nowrap">{row.present}</td>
                                <td className="px-5 py-3 text-slate-600 font-medium whitespace-nowrap">{row.next}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <h3 className="text-[15px] font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> 초 / 말 표현 (Beginning & End)
            </h3>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm mb-6">
                <table className="w-full text-[15px] text-center border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-900 font-extrabold border-b border-slate-200 text-[15px]">
                        <tr>
                            <th className="px-5 py-3 w-1/4 text-center whitespace-nowrap">구분</th>
                            <th className="px-5 py-3 text-center whitespace-nowrap">~초에 (a principios de)</th>
                            <th className="px-5 py-3 text-center whitespace-nowrap">~말에 (a finales de)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {PERIOD_BEGIN_END.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-3 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100 whitespace-nowrap">{row.cat}</td>
                                <td className="px-5 py-3 whitespace-nowrap">
                                    <span className="font-bold text-slate-900 block mb-1">{row.begin}</span>
                                    <span className="text-xs text-slate-400">{row.begin_ko}</span>
                                </td>
                                <td className="px-5 py-3 whitespace-nowrap">
                                    <span className="font-bold text-slate-900 block mb-1">{row.end}</span>
                                    <span className="text-xs text-slate-400">{row.end_ko}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
                    <span className="text-slate-500 font-bold text-xs block mb-1">내후년 (2년 뒤)</span>
                    <span className="text-slate-900 font-black text-lg">dentro de dos años</span>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
                    <span className="text-slate-500 font-bold text-xs block mb-1">전전년 (2년 전)</span>
                    <span className="text-slate-900 font-black text-lg">hace dos años</span>
                </div>
            </div>
          </section>

          {/* 3. 부사 관련 */}
          <section id="sec-3" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 시점과 속도 관련 부사
            </h2>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-900 font-extrabold border-b border-slate-200 text-[15px]">
                        <tr>
                            <th className="px-5 py-3 w-20 text-center whitespace-nowrap">구분</th>
                            <th className="px-5 py-3 text-center whitespace-nowrap">스페인어</th>
                            <th className="px-5 py-3 text-center whitespace-nowrap">의미</th>
                            <th className="px-5 py-3 text-center whitespace-nowrap">예시</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {ADVERBS.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                {i % 4 === 0 && <td rowSpan={4} className="px-5 py-3 font-bold text-slate-500 bg-slate-50/30 border-r border-slate-100 align-middle text-center whitespace-nowrap">{row.cat}</td>}
                                <td className="px-5 py-3 font-bold text-slate-900 whitespace-nowrap">{row.word}</td>
                                <td className="px-5 py-3 text-slate-600 font-medium whitespace-nowrap">{row.mean}</td>
                                <td className="px-5 py-3 text-center whitespace-nowrap">
                                    <div className="flex flex-col items-center">
                                        <span className="text-slate-900 font-bold">{row.ex.split('(')[0]}</span>
                                        <span className="text-xs text-slate-400 mt-0.5">({row.ex.split('(')[1]}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 4. 주의사항 */}
          <section id="sec-4" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">4.</span> 주의사항 및 참고
            </h2>
            <div className="space-y-4">
                <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                        <Clock size={16} className="text-blue-500"/> Mañana의 이중 의미
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[14px]">
                        <div className="bg-blue-50 p-3 rounded-lg flex justify-between items-center border border-blue-100">
                            <span className="font-bold text-blue-900">부사: '내일'</span>
                            <span className="text-blue-600 text-xs">voy mañana.</span>
                        </div>
                        <div className="bg-amber-50 p-3 rounded-lg flex justify-between items-center border border-amber-100">
                            <span className="font-bold text-amber-900">명사: '아침'</span>
                            <span className="text-amber-600 text-xs">la mañana es fría.</span>
                        </div>
                    </div>
                    <p className="mt-3 text-xs text-slate-500 text-center font-medium">참고: '내일 아침'은 <span className="text-slate-900 font-bold">mañana por la mañana</span>라고 합니다.</p>
                </div>

                <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <h4 className="text-sm font-bold text-slate-800 mb-3">전치사 'hace'의 용법</h4>
                    <p className="text-[14px] text-slate-700 leading-relaxed font-medium">
                        현재를 기준으로 <strong>"~전에"</strong>라고 할 때 <span className="text-slate-900 font-black bg-slate-100 px-1 rounded">hace + 시간</span> 구조를 씁니다.
                    </p>
                    <p className="mt-2 text-sm font-bold text-slate-900">hace tres horas <span className="text-slate-400 font-normal text-xs ml-2">(3시간 전에)</span></p>
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
                            <p className="font-bold text-slate-800 text-base leading-snug whitespace-pre-wrap">{q.q}</p>
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

      <aside className="hidden lg:block w-56 shrink-0">
        <div className="sticky top-8 border-l border-slate-100 pl-6">
            <h4 className="text-[10px] font-bold text-slate-400 tracking-widest mb-4">On this page</h4>
            <ul className="space-y-3 text-[13px]">
                {['날짜 기준', '단위별 표현', '부사 목록', '주의사항', '연습 문제'].map((item, i) => (
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