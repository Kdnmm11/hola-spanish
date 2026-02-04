'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, ArrowRight, Info, AlertTriangle, Scale, Lightbulb
} from 'lucide-react';

const CONJUGATION_TABLE = [
    { person: 'yo', ser: 'soy', estar: 'estoy' },
    { person: 'tú', ser: 'eres', estar: 'estás' },
    { person: 'él/ella/ud.', ser: 'es', estar: 'está' },
    { person: 'nosotros/as', ser: 'somos', estar: 'estamos' },
    { person: 'vosotros/as', ser: 'sois', estar: 'estáis' },
    { person: 'ellos/ellas/uds.', ser: 'son', estar: 'están' }
];

const ADJECTIVE_CHANGE = [
    { adj: 'rico', ser: '(사람이) 부유하다', estar: '(음식이) 맛있다' },
    { adj: 'bueno', ser: '(사람이) 선하다 / 질이 좋다', estar: '(사람이) 건강하다 / 맛있다' },
    { adj: 'malo', ser: '(사람이) 나쁘다 / 질이 낮다', estar: '(사람이) 아프다 / 상했다' },
    { adj: 'listo', ser: '(사람이) 똑똑하다', estar: '준비되었다' },
    { adj: 'verde', ser: '초록색이다 (본래 색)', estar: '(과일 등이) 덜 익었다' },
    { adj: 'cansado', ser: '피곤하게 만드는 성격이다', estar: '지금 피곤하다' }
];

const QUIZ_DATA = [
    { id: 1, q: "빈칸 채우기: Yo (     ) muy alegre porque hoy (     ) mi cumpleaños.", options: ['estoy / es', 'soy / está'], answer: 0, explain: "기분(alegre)은 일시적 상태이므로 estoy, 생일(날짜)은 정의이므로 es를 씁니다." },
    { id: 2, q: "형용사 의미 변화: Esta manzana está verde.", options: ['이 사과는 초록색이다', '이 사과는 덜 익었다'], answer: 1, explain: "Estar + verde는 과일이 아직 익지 않은 상태를 의미합니다." },
    { id: 3, q: "위치 표현: Madrid (     ) en España.", options: ['es', 'está'], answer: 1, explain: "도시나 건물의 물리적 위치를 말할 때는 항상 estar를 씁니다." },
    { id: 4, q: "본래의 지적 능력을 나타낼 때 알맞은 문장은?", options: ['soy listo.', 'estoy listo.'], answer: 0, explain: "똑똑하다(지능)는 본질적 속성이므로 ser를 사용합니다. estar listo는 '준비됐다'는 뜻입니다." }
];

export default function SerEstarDetail() {
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
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 12</span>
                <ChevronRight size={10} />
                <span>Basic Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              Ser와 Estar
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               한국어로는 둘 다 '이다/있다'로 해석되지만, 대상의 <strong>본질(Ser)</strong>과 <strong>상태(Estar)</strong>를 철저히 구분해야 합니다.
            </p>
          </header>

          {/* Key Summary */}
          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium">
                  <li><strong>Ser</strong>: 정체성, 국적, 직업, 시간, 재료 등 <strong>변하지 않는 본질</strong>.</li>
                  <li><strong>Estar</strong>: 위치, 감정, 건강, 진행형 등 <strong>변할 수 있는 상태</strong>.</li>
                  <li><strong>의미 변화</strong>: 형용사에 따라 두 동사의 의미가 달라지기도 합니다 (rico, listo 등).</li>
              </ul>
          </div>

          {/* 1. 변화형 */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 직설법 현재 변화형
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">두 동사 모두 불규칙하게 변하므로 철자를 정확히 익혀야 합니다.</p>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse min-w-[500px]">
                    <thead className="bg-slate-50 text-slate-900 font-extrabold border-b border-slate-200 text-[15px]">
                        <tr>
                            <th className="px-5 py-3 text-left pl-8 w-1/3 whitespace-nowrap">주어</th>
                            <th className="px-5 py-3 w-1/3 bg-blue-50 text-blue-700 whitespace-nowrap">Ser (본질)</th>
                            <th className="px-5 py-3 w-1/3 bg-amber-50 text-amber-700 whitespace-nowrap">Estar (상태)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {CONJUGATION_TABLE.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 text-left pl-8 font-bold text-slate-400 text-sm whitespace-nowrap">{row.person}</td>
                                <td className="px-5 py-4 font-bold text-blue-700 bg-blue-50/30 border-x border-blue-100 whitespace-nowrap">{row.ser}</td>
                                <td className="px-5 py-4 font-bold text-amber-700 bg-amber-50/30 border-x border-amber-100 whitespace-nowrap">{row.estar}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 2. Ser 용법 */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">2.</span> Ser의 심화 용법 (Permanence)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">대상의 정의나 본질적 속성을 규정할 때 사용합니다.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[15px]">
                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm border-l-4 border-l-blue-400">
                    <h4 className="font-black text-slate-800 mb-2 text-base tracking-tight">정체성과 출신</h4>
                    <p className="text-blue-700 font-medium text-lg mb-1">Soy coreano.</p>
                    <p className="text-slate-400 text-xs font-medium">나는 한국인이다.</p>
                </div>
                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm border-l-4 border-l-blue-400">
                    <h4 className="font-black text-slate-800 mb-2 text-base tracking-tight">사물의 특징/재료</h4>
                    <p className="text-blue-700 font-medium text-lg mb-1">El reloj es de oro.</p>
                    <p className="text-slate-400 text-xs font-medium">시계는 금으로 되어 있다.</p>
                </div>
                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm border-l-4 border-l-blue-400">
                    <h4 className="font-black text-slate-800 mb-2 text-base tracking-tight">시간/가격</h4>
                    <p className="text-blue-700 font-medium text-lg mb-1">Son 20 euros.</p>
                    <p className="text-slate-400 text-xs font-medium">20유로입니다.</p>
                </div>
                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm border-l-4 border-l-blue-400">
                    <h4 className="font-black text-slate-800 mb-2 text-base tracking-tight">사건의 개최 장소</h4>
                    <p className="text-blue-700 font-medium text-lg mb-1">La fiesta es aquí.</p>
                    <p className="text-slate-400 text-xs font-medium">파티는 여기서 열린다.</p>
                </div>
            </div>
          </section>

          {/* 3. Estar 용법 */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-amber-600">3.</span> Estar의 심화 용법 (Condition)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">대상의 가변적인 상태나 구체적인 위치를 나타냅니다.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[15px]">
                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm border-l-4 border-l-amber-400">
                    <h4 className="font-black text-slate-800 mb-2 text-base tracking-tight text-amber-700">물리적 위치</h4>
                    <p className="text-slate-900 font-medium text-lg mb-1">Madrid está en España.</p>
                    <p className="text-slate-400 text-xs font-medium">마드리드는 스페인에 있다.</p>
                </div>
                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm border-l-4 border-l-amber-400">
                    <h4 className="font-black text-slate-800 mb-2 text-base tracking-tight text-amber-700">일시적 상태/기분</h4>
                    <p className="text-slate-900 font-medium text-lg mb-1">Estoy muy feliz.</p>
                    <p className="text-slate-400 text-xs font-medium">나는 매우 행복하다.</p>
                </div>
                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm border-l-4 border-l-amber-400">
                    <h4 className="font-black text-slate-800 mb-2 text-base tracking-tight text-amber-700">현재 진행형</h4>
                    <p className="text-slate-900 font-medium text-lg mb-1">Estamos estudiando.</p>
                    <p className="text-slate-400 text-xs font-medium">우리는 공부하고 있다.</p>
                </div>
                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm border-l-4 border-l-amber-400">
                    <h4 className="font-black text-slate-800 mb-2 text-base tracking-tight text-amber-700">결과적 상태</h4>
                    <p className="text-slate-900 font-medium text-lg mb-1">La ventana está abierta.</p>
                    <p className="text-slate-400 text-xs font-medium">창문이 열려 있다.</p>
                </div>
            </div>
          </section>

          {/* 4. 형용사 의미 변화 */}
          <section id="sec-4" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">4.</span> 형용사에 따른 의미 변화
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">결합하는 동사에 따라 형용사의 의미가 완전히 달라지는 사례입니다.</p>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-base border-collapse table-fixed min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-900 font-extrabold border-b border-slate-200 text-sm">
                        <tr>
                            <th className="px-5 py-4 w-1/4 border-r border-slate-100 text-center whitespace-nowrap">형용사</th>
                            <th className="px-5 py-4 w-1/3 border-r border-slate-100 text-center text-blue-700 whitespace-nowrap">Ser + 형용사</th>
                            <th className="px-5 py-4 text-center text-blue-700 whitespace-nowrap">Estar + 형용사</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {ADJECTIVE_CHANGE.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-5 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100 text-center whitespace-nowrap">{row.adj}</td>
                                <td className="px-5 py-5 text-slate-700 border-r border-slate-100 text-center font-medium">{row.ser}</td>
                                <td className="px-5 py-5 text-slate-700 text-center font-medium">{row.estar}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 연습 문제 */}
          <section id="sec-5" className="scroll-mt-24 pt-8 border-t border-slate-200 pb-20">
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
                        <div className="flex flex-wrap gap-2.5 ml-0 w-full mt-2">
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
                {['현재 변화형', 'Ser 용법', 'Estar 용법', '의미 변화 표', '연습 문제'].map((item, i) => (
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
