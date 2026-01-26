'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, CornerDownRight, ArrowRight, Info, AlertTriangle, Scale
} from 'lucide-react';

const CONJUGATION_TABLE = [
    { person: 'Yo', ser: 'soy', estar: 'estoy' },
    { person: 'Tú', ser: 'eres', estar: 'estás' },
    { person: 'Él/Ella/Ud.', ser: 'es', estar: 'está' },
    { person: 'Nosotros/as', ser: 'somos', estar: 'estamos' },
    { person: 'Vosotros/as', ser: 'sois', estar: 'estáis' },
    { person: 'Ellos/Ellas/Uds.', ser: 'son', estar: 'están' }
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
    { id: 1, q: "빈칸 채우기: Yo ( ) muy alegre porque hoy ( ) mi cumpleaños.", options: ['estoy / es', 'soy / está'], answer: 0, explain: "기분(alegre)은 일시적 상태이므로 estoy, 생일(날짜)은 정의이므로 es를 씁니다." },
    { id: 2, q: "형용사 의미 변화: Esta manzana está verde.", options: ['이 사과는 초록색이다', '이 사과는 덜 익었다'], answer: 1, explain: "estar + verde는 과일이 아직 익지 않은 상태를 의미합니다." },
    { id: 3, q: "위치 표현: Madrid ( ) en España.", options: ['es', 'está'], answer: 1, explain: "도시나 건물의 물리적 위치를 말할 때는 항상 estar를 씁니다." }
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
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 16</span>
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
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 text-left pl-8 w-1/3">주어</th>
                            <th className="px-5 py-3 w-1/3">Ser (본질)</th>
                            <th className="px-5 py-3 w-1/3">Estar (상태)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {CONJUGATION_TABLE.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 text-left pl-8 font-bold text-slate-400 text-sm">{row.person}</td>
                                <td className="px-5 py-4 font-bold text-slate-900 border-x border-slate-50">{row.ser}</td>
                                <td className="px-5 py-4 font-bold text-slate-900 border-x border-slate-50">{row.estar}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 2. Ser 용법 */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">2.</span> Ser의 심화 용법 (Permanence)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">대상의 정의나 본질적 속성을 규정할 때 사용합니다.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[14px]">
                <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-slate-800 mb-2 uppercase text-xs tracking-tight">정체성과 출신</h4>
                    <p className="text-slate-900 font-bold italic mb-1">Soy coreano.</p>
                    <p className="text-slate-400 text-xs">나는 한국인이다.</p>
                </div>
                <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-slate-800 mb-2 uppercase text-xs tracking-tight">사물의 특징/재료</h4>
                    <p className="text-slate-900 font-bold italic mb-1">El reloj es de oro.</p>
                    <p className="text-slate-400 text-xs">시계는 금으로 되어 있다.</p>
                </div>
                <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-slate-800 mb-2 uppercase text-xs tracking-tight">시간/가격</h4>
                    <p className="text-slate-900 font-bold italic mb-1">Son 20 euros.</p>
                    <p className="text-slate-400 text-xs">20유로입니다.</p>
                </div>
                <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-slate-800 mb-2 uppercase text-xs tracking-tight">사건의 개최 장소</h4>
                    <p className="text-slate-900 font-bold italic mb-1">La fiesta es aquí.</p>
                    <p className="text-slate-400 text-xs">파티는 여기서 열린다.</p>
                </div>
            </div>
          </section>

          {/* 3. Estar 용법 */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">3.</span> Estar의 심화 용법 (Condition)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">대상의 가변적인 상태나 구체적인 위치를 나타냅니다.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[14px]">
                <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-slate-800 mb-2 uppercase text-xs tracking-tight">물리적 위치</h4>
                    <p className="text-slate-900 font-bold italic mb-1">Madrid está en España.</p>
                    <p className="text-slate-400 text-xs">마드리드는 스페인에 있다.</p>
                </div>
                <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-slate-800 mb-2 uppercase text-xs tracking-tight">일시적 상태/기분</h4>
                    <p className="text-slate-900 font-bold italic mb-1">Estoy muy feliz.</p>
                    <p className="text-slate-400 text-xs">나는 매우 행복하다.</p>
                </div>
                <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-slate-800 mb-2 uppercase text-xs tracking-tight">현재 진행형</h4>
                    <p className="text-slate-900 font-bold italic mb-1">Estamos estudiando.</p>
                    <p className="text-slate-400 text-xs">우리는 공부하고 있다.</p>
                </div>
                <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-slate-800 mb-2 uppercase text-xs tracking-tight">결과적 상태</h4>
                    <p className="text-slate-900 font-bold italic mb-1">La ventana está abierta.</p>
                    <p className="text-slate-400 text-xs">창문이 열려 있다.</p>
                </div>
            </div>
          </section>

          {/* 4. 형용사 의미 변화 */}
          <section id="sec-4" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">4.</span> 형용사에 따른 의미 변화
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">결합하는 동사에 따라 형용사의 의미가 완전히 달라지는 사례입니다.</p>
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-left border-collapse">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 w-1/4">형용사</th>
                            <th className="px-5 py-3 w-1/3">Ser + 형용사</th>
                            <th className="px-5 py-3">Estar + 형용사</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {ADJECTIVE_CHANGE.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100">{row.adj}</td>
                                <td className="px-5 py-4 text-slate-700">{row.ser}</td>
                                <td className="px-5 py-4 text-slate-700">{row.estar}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 연습 문제 */}
          <section id="sec-5" className="scroll-mt-24 pt-8 border-t border-slate-200">
             <h2 className="text-[13px] font-black text-slate-400 mb-5 uppercase tracking-widest flex items-center gap-2">
                <CornerDownRight size={14} /> 연습 문제
             </h2>
             <div className="space-y-4 text-[15px]">
                {QUIZ_DATA.map((q, idx) => (
                    <div key={q.id} className="bg-slate-50 p-4 rounded-lg border border-slate-200 shadow-sm">
                        <div className="flex items-baseline gap-3 mb-3">
                            <span className="text-slate-400 font-bold">Q{idx + 1}.</span>
                            <p className="font-bold text-slate-800">{q.q}</p>
                        </div>
                        <div className="flex flex-wrap gap-2 ml-0 w-full mt-2">
                            {q.options.map((opt, optIdx) => {
                                const isSelected = quizState[q.id] === optIdx;
                                const isCorrect = q.answer === optIdx;
                                const showResult = quizState[q.id] !== undefined && quizState[q.id] !== null;
                                let buttonStyle = "bg-white border-slate-200 hover:border-slate-400 hover:shadow-md text-slate-600";
                                if (showResult) {
                                    if (isSelected) {
                                        buttonStyle = isCorrect ? "bg-green-50 border-green-500 text-green-700 font-bold" : "bg-red-50 border-red-500 text-red-700 font-bold";
                                    } else if (isCorrect) {
                                        buttonStyle = "bg-green-50 border-green-200 text-green-600 opacity-70";
                                    } else {
                                        buttonStyle = "bg-slate-50 border-slate-100 text-slate-400 opacity-50";
                                    }
                                }
                                return (
                                    <button key={optIdx} onClick={() => !showResult && handleQuiz(q.id, optIdx)} disabled={showResult}
                                        className={`px-4 py-2 rounded-lg border transition-all shadow-sm w-fit font-medium ${buttonStyle}`}
                                    >{opt}</button>
                                );
                            })}
                        </div>
                        {showExplain[q.id] && (
                            <div className="mt-5 w-full text-sm animate-in fade-in slide-in-from-top-2 duration-300">
                                {quizState[q.id] === q.answer 
                                    ? <p className="text-green-600 font-bold flex items-center gap-2 mb-2"><Check size={18}/> 정답입니다!</p>
                                    : <p className="text-red-500 font-bold flex items-center gap-2 mb-2"><X size={18}/> 오답입니다.</p>
                                }
                                <div className="bg-indigo-50/50 border border-indigo-100 p-5 rounded-xl text-slate-700 leading-relaxed shadow-sm">
                                    <strong className="text-indigo-600 block mb-1 text-[13px] uppercase tracking-tight">💡 해설</strong>
                                    {q.explain}
                                </div>
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
                {['현재 변화형', 'Ser 용법', 'Estar 용법', '형용사 의미 변화', '연습 문제'].map((item, i) => (
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