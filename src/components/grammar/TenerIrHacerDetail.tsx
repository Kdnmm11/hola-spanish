'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, ArrowRight, Info, AlertTriangle, CloudSun, Lightbulb
} from 'lucide-react';

const TENER_CONJ = [
    { p: 'yo', f: 'tengo' }, { p: 'tú', f: 'tienes' }, { p: 'él/ella/ud.', f: 'tiene' },
    { p: 'nosotros/as', f: 'tenemos' }, { p: 'vosotros/as', f: 'tenéis' }, { p: 'ellos/as/uds.', f: 'tienen' }
];

const IR_CONJ = [
    { p: 'yo', f: 'voy' }, { p: 'tú', f: 'vas' }, { p: 'él/ella/ud.', f: 'va' },
    { p: 'nosotros/as', f: 'vamos' }, { p: 'vosotros/as', f: 'vais' }, { p: 'ellos/as/uds.', f: 'van' }
];

const HACER_CONJ = [
    { p: 'yo', f: 'hago' }, { p: 'tú', f: 'haces' }, { p: 'él/ella/ud.', f: 'hace' },
    { p: 'nosotros/as', f: 'hacemos' }, { p: 'vosotros/as', f: 'hacéis' }, { p: 'ellos/as/uds.', f: 'hacen' }
];

const QUIZ_DATA = [
    { id: 1, q: "빈칸 채우기: yo ( ) mucha sed. (내 몸이 덥다 / 목이 마르다)", options: ['tengo', 'tienes', 'hago'], answer: 0, explain: "1인칭 단수(yo)의 tener 변화형은 tengo이며, '목마르다'는 tengo sed라고 합니다." },
    { id: 2, q: "'우리는 내일 떠날 것이다' (ir a + salir) 작문:", options: ['vamos salir', 'vamos a salir'], answer: 1, explain: "근접 미래는 'ir + a + 동사원형' 구조를 반드시 지켜야 합니다." },
    { id: 3, q: "날씨 표현: 오늘 매우 춥다.", options: ['tiene mucho frío', 'hace mucho frío'], answer: 1, explain: "날씨는 3인칭 단수 hacer(hace)를 사용하여 표현합니다." },
    { id: 4, q: "'나는 20살이다'를 스페인어로 올바르게 작문한 것은?", options: ['Soy 20 años.', 'Tengo 20 años.'], answer: 1, explain: "나이는 '가지고 있는' 개념이므로 tener 동사를 사용합니다. (Tengo... años)" }
];

export default function TenerIrHacerDetail() {
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
      return <span className="text-slate-900 font-bold">{word}</span>;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto px-6 lg:px-8 py-8 font-sans text-slate-900 bg-white">
      
      <article className="flex-1 min-w-0">
          <header className="mb-8 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 18</span>
                <ChevronRight size={10} />
                <span>Basic Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              Tener, Ir, Hacer
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               활용 빈도가 가장 높은 3대 불규칙 동사입니다. <br/>
               각각 소유, 이동, 행위를 기본으로 하여 날씨, 나이, 미래 등 다양한 표현을 만듭니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-900">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-bold">
                  <li><strong>Tener</strong>: 소유, 나이, 신체 감각(배고픔, 추위 등), 의무(tener que).</li>
                  <li><strong>Ir</strong>: 장소 이동(ir a), 근접 미래(ir a + 동사원형).</li>
                  <li><strong>Hacer</strong>: 행위, 날씨 표현(hace frío 등).</li>
              </ul>
          </div>

          {/* 1. Tener */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">1.</span> tener 동사 (소유와 상태)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4 font-medium">yo 불규칙과 어간 변화(e → ie)가 동시에 일어나는 혼합형입니다.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {TENER_CONJ.map((item, i) => (
                    <div key={i} className="bg-white border border-slate-200 p-3 rounded-lg text-center shadow-sm">
                        <span className="text-xs text-slate-400 block mb-1 font-bold">{item.p}</span>
                        <span className="text-[15px] font-bold">{renderVerb(item.f)}</span>
                    </div>
                ))}
            </div>
            
            <div className="space-y-4">
                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                    <h4 className="text-sm font-extrabold text-slate-900 mb-3 uppercase tracking-tight">주요 용법 (Usos)</h4>
                    <div className="space-y-3 text-[15px]">
                        <div className="border-l-4 border-slate-200 pl-3">
                            <span className="block font-bold text-slate-900">1. 소유 (Posesión)</span>
                            <span className="text-slate-600 italic">Tengo dos hermanos. (나는 두 명의 형제가 있다)</span>
                        </div>
                        <div className="border-l-4 border-slate-200 pl-3">
                            <span className="block font-bold text-slate-900">2. 나이 (Edad)</span>
                            <span className="text-slate-600 italic">Tengo 20 años. (나는 20살이다)</span>
                        </div>
                        <div className="border-l-4 border-slate-200 pl-3">
                            <span className="block font-bold text-slate-900">3. 신체 감각 (Sensación)</span>
                            <span className="text-slate-600 italic">Tengo hambre / frío. (배고프다 / 춥다)</span>
                        </div>
                        <div className="border-l-4 border-slate-200 pl-3">
                            <span className="block font-bold text-slate-900">4. 의무 (Obligación)</span>
                            <span className="text-slate-600 italic">Tengo que estudiar. (나는 공부해야 한다)</span>
                        </div>
                    </div>
                </div>
            </div>
          </section>

          {/* 2. Ir */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">2.</span> ir 동사 (이동과 미래)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4 font-medium">원형의 흔적이 거의 남지 않는 완전 불규칙 변화를 합니다.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {IR_CONJ.map((item, i) => (
                    <div key={i} className="bg-white border border-slate-200 p-3 rounded-lg text-center shadow-sm">
                        <span className="text-xs text-slate-400 block mb-1 font-bold">{item.p}</span>
                        <span className="text-[15px] font-bold">{renderVerb(item.f)}</span>
                    </div>
                ))}
            </div>

            <div className="space-y-4">
                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                    <h4 className="text-sm font-extrabold text-slate-900 mb-3 uppercase tracking-tight">주요 용법 (Usos)</h4>
                    <div className="space-y-3 text-[15px]">
                        <div className="border-l-4 border-slate-200 pl-3">
                            <span className="block font-bold text-slate-900">1. 장소 이동 (Destino)</span>
                            <p className="text-slate-600 italic mb-1">Voy a la oficina.</p>
                            <p className="text-xs text-slate-400 font-bold">* 항상 전치사 a와 함께 씁니다.</p>
                        </div>
                        <div className="border-l-4 border-slate-200 pl-3">
                            <span className="block font-bold text-slate-900">2. 근접 미래 (Futuro Próximo)</span>
                            <p className="text-slate-600 italic mb-1">Voy a viajar a España.</p>
                            <p className="text-xs text-slate-400 font-bold">* ir a + 동사원형 (~할 것이다)</p>
                        </div>
                    </div>
                </div>
            </div>
          </section>

          {/* 3. Hacer */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">3.</span> hacer 동사 (행위와 날씨)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4 font-medium">1인칭 단수(yo)만 불규칙(-go)이고 나머지는 규칙 변화입니다.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {HACER_CONJ.map((item, i) => (
                    <div key={i} className="bg-white border border-slate-200 p-3 rounded-lg text-center shadow-sm">
                        <span className="text-xs text-slate-400 block mb-1 font-bold">{item.p}</span>
                        <span className="text-[15px] font-bold">{renderVerb(item.f)}</span>
                    </div>
                ))}
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                <h4 className="text-sm font-extrabold text-slate-900 mb-3 uppercase tracking-tight">주요 용법 (Usos)</h4>
                <div className="space-y-3 text-[15px]">
                    <div className="border-l-4 border-slate-200 pl-3">
                        <span className="block font-bold text-slate-900">1. 행위/만들기 (Acción)</span>
                        <span className="text-slate-600 italic">Hago ejercicio. (운동을 하다)</span>
                    </div>
                    <div className="border-l-4 border-slate-200 pl-3">
                        <span className="block font-bold text-slate-900">2. 날씨 표현 (Clima)</span>
                        <div className="mt-1 space-y-1">
                            <p className="text-slate-600 italic">Hace buen tiempo. (날씨가 좋다)</p>
                            <p className="text-slate-600 italic">Hace frío. (춥다)</p>
                        </div>
                        <p className="text-xs text-slate-400 font-bold mt-1">* 날씨는 항상 3인칭 단수(hace)만 사용합니다.</p>
                    </div>
                </div>
            </div>
          </section>

          {/* 4. 용법 비교 */}
          <section id="sec-4" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">4.</span> 혼동하기 쉬운 용법 비교
            </h2>
            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h4 className="text-sm font-extrabold text-slate-900 mb-2 flex items-center gap-2">
                        <Info size={16} className="text-slate-400"/> tener calor
                    </h4>
                    <p className="text-[14px] text-slate-600 leading-relaxed mb-2 font-medium">
                        주어(나)가 느끼는 <strong>주관적 신체 감각</strong>입니다. <br/>
                        (내 몸이 덥다)
                    </p>
                    <p className="text-slate-900 font-bold italic text-sm">Tengo mucho calor.</p>
                </div>
                <div>
                    <h4 className="text-sm font-extrabold text-slate-900 mb-2 flex items-center gap-2">
                        <CloudSun size={16} className="text-slate-400"/> hace calor
                    </h4>
                    <p className="text-[14px] text-slate-600 leading-relaxed mb-2 font-medium">
                        현재 외부 환경의 <strong>객관적인 날씨 상태</strong>입니다. <br/>
                        (날씨가 덥다)
                    </p>
                    <p className="text-slate-900 font-bold italic text-sm">Hoy hace mucho calor.</p>
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
                {['tener 동사', 'ir 동사', 'hacer 동사', '용법 비교', '연습 문제'].map((item, i) => (
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