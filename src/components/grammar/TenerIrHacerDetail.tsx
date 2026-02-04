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
    { id: 1, q: "빈칸 채우기: yo (     ) mucha sed. (내 몸이 덥다 / 목이 마르다)", options: ['tengo', 'tienes', 'hago'], answer: 0, explain: "1인칭 단수(yo)의 tener 변화형은 tengo이며, '목마르다'는 tengo sed라고 합니다." },
    { id: 2, q: "'우리는 내일 떠날 것이다' (ir a + salir) 작문:", options: ['vamos salir', 'vamos a salir'], answer: 1, explain: "근접 미래는 'ir + a + 동사원형' 구조를 반드시 지켜야 합니다." },
    { id: 3, q: "날씨 표현: 오늘 매우 춥다.", options: ['tiene mucho frío', 'hace mucho frío'], answer: 1, explain: "날씨는 3인칭 단수 hacer(hace)를 사용하여 표현합니다." },
    { id: 4, q: "'나는 20살이다'를 스페인어로 올바르게 작문한 것은?", options: ['soy 20 años.', 'tengo 20 años.'], answer: 1, explain: "나이는 '가지고 있는' 개념이므로 tener 동사를 사용합니다. (tengo... años)" }
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

  const renderVerb = (word: string, colorClass: string) => {
      return <span className={`font-bold ${colorClass}`}>{word}</span>;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto px-6 lg:px-8 py-8 font-sans text-slate-900 bg-white">
      
      <article className="flex-1 min-w-0">
          <header className="mb-8 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 tracking-widest mb-2">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 15</span>
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
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-bold text-slate-700">
                  <li><strong>Tener</strong>: 소유, 나이, 신체 감각(배고픔, 추위 등), 의무(tener que).</li>
                  <li><strong>Ir</strong>: 장소 이동(ir a), 근접 미래(ir a + 동사원형).</li>
                  <li><strong>Hacer</strong>: 행위, 날씨 표현(hace frío 등).</li>
              </ul>
          </div>

          {/* 1. Tener */}
          <section id="sec-1" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">1.</span> tener 동사 (소유와 상태)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4 font-medium">yo 불규칙과 어간 변화(e → ie)가 동시에 일어나는 혼합형입니다.</p>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm mb-5">
                <table className="w-full text-[15px] text-center border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-900 font-extrabold border-b border-slate-200 text-[15px]">
                        <tr>
                            <th className="px-5 py-2 w-1/4 text-center whitespace-nowrap">주어</th>
                            <th className="px-5 py-2 w-1/4 text-center whitespace-nowrap">활용형</th>
                            <th className="px-5 py-2 text-center whitespace-nowrap">활용 예시</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {[
                            { p: 'yo', f: 'tengo', ex: 'Tengo un perro.', tr: '나는 개가 한 마리 있다.' },
                            { p: 'tú', f: 'tienes', ex: '¿Tienes hambre?', tr: '너 배고프니?' },
                            { p: 'él/ella/ud.', f: 'tiene', ex: 'Ella tiene 20 años.', tr: '그녀는 20살이다.' },
                            { p: 'nosotros/as', f: 'tenemos', ex: 'Tenemos que ir.', tr: '우리는 가야 한다.' },
                            { p: 'vosotros/as', f: 'tenéis', ex: '¿Tenéis sed?', tr: '너희들 목마르니?' },
                            { p: 'ellos/as/uds.', f: 'tienen', ex: 'Tienen mucho dinero.', tr: '그들은 돈이 많다.' }
                        ].map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                <td className="px-5 py-2.5 font-bold text-slate-500 bg-slate-50/30 border-r border-slate-100 text-center whitespace-nowrap text-[15px]">{row.p}</td>
                                <td className="px-5 py-2.5 font-black text-blue-700 text-center whitespace-nowrap text-lg">{row.f}</td>
                                <td className="px-5 py-2.5 text-center whitespace-nowrap">
                                    <div className="flex flex-col items-center">
                                        <span className="text-slate-900 font-bold">{row.ex}</span>
                                        <span className="text-xs text-slate-500 mt-0.5">{row.tr}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                <h4 className="text-[15px] font-extrabold text-slate-900 mb-3 tracking-tight flex items-center gap-2">
                    <Info size={16} className="text-blue-500"/> 주요 용법 상세 (Usos)
                </h4>
                <div className="flex flex-col gap-3">
                    <div className="border border-slate-100 p-4 rounded-lg hover:border-blue-200 transition-colors">
                        <span className="block font-bold text-slate-900 mb-1.5 text-[16px]">1. 소유 (Posesión)</span>
                        <p className="text-slate-600 text-sm mb-2">물건을 소유하거나 가족 관계 등을 나타낼 때 기본적으로 쓰입니다.</p>
                        <div className="bg-slate-50 px-3 py-2 rounded-lg border border-slate-200/60 flex flex-wrap items-center gap-2">
                            <span className="font-bold text-slate-800 italic text-[15px]">Tengo dos hermanos.</span>
                            <span className="text-slate-400 text-xs">(나는 형제가 둘 있다)</span>
                        </div>
                    </div>
                    <div className="border border-slate-100 p-4 rounded-lg hover:border-blue-200 transition-colors">
                        <span className="block font-bold text-slate-900 mb-1.5 text-[16px]">2. 나이 (Edad)</span>
                        <p className="text-slate-600 text-sm mb-2">스페인어에서는 '이다(ser)'가 아니라 '나이를 가지고 있다'고 표현합니다.</p>
                        <div className="bg-slate-50 px-3 py-2 rounded-lg border border-slate-200/60 flex flex-wrap items-center gap-2">
                            <span className="font-bold text-slate-800 italic text-[15px]">¿Cuántos años tienes?</span>
                            <span className="text-slate-400 text-xs">(너는 몇 살이니?)</span>
                        </div>
                    </div>
                    <div className="border border-slate-100 p-4 rounded-lg hover:border-blue-200 transition-colors">
                        <span className="block font-bold text-slate-900 mb-1.5 text-[16px]">3. 신체 감각 (Sensación)</span>
                        <p className="text-slate-600 text-sm mb-2">배고픔, 추위 등 생리적 감각을 명사로 표현합니다.</p>
                        <div className="flex flex-col gap-1.5">
                            <div className="bg-slate-50 px-3 py-2 rounded-lg border border-slate-200/60 flex flex-wrap items-center gap-2">
                                <span className="font-bold text-slate-800 italic text-[15px]">Tengo hambre.</span>
                                <span className="text-slate-400 text-xs">(배고프다)</span>
                            </div>
                            <div className="bg-slate-50 px-3 py-2 rounded-lg border border-slate-200/60 flex flex-wrap items-center gap-2">
                                <span className="font-bold text-slate-800 italic text-[15px]">Tengo frío.</span>
                                <span className="text-slate-400 text-xs">(춥다)</span>
                            </div>
                        </div>
                    </div>
                    <div className="border border-slate-100 p-4 rounded-lg hover:border-blue-200 transition-colors">
                        <span className="block font-bold text-slate-900 mb-1.5 text-[16px]">4. 의무 (Obligación)</span>
                        <p className="text-slate-600 text-sm mb-2">'tener que + 동사원형' 패턴으로 의무를 나타냅니다.</p>
                        <div className="bg-slate-50 px-3 py-2 rounded-lg border border-slate-200/60 flex flex-wrap items-center gap-2">
                            <span className="font-bold text-slate-800 italic text-[15px]">Tengo que estudiar.</span>
                            <span className="text-slate-400 text-xs">(나는 공부해야 한다)</span>
                        </div>
                    </div>
                </div>
            </div>
          </section>

          {/* 2. Ir */}
          <section id="sec-2" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">2.</span> ir 동사 (이동과 미래)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4 font-medium">원형의 흔적이 거의 남지 않는 완전 불규칙 변화를 합니다.</p>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm mb-5">
                <table className="w-full text-[15px] text-center border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-900 font-extrabold border-b border-slate-200 text-[15px]">
                        <tr>
                            <th className="px-5 py-2 w-1/4 text-center whitespace-nowrap">주어</th>
                            <th className="px-5 py-2 w-1/4 text-center whitespace-nowrap">활용형</th>
                            <th className="px-5 py-2 text-center whitespace-nowrap">활용 예시</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {[
                            { p: 'yo', f: 'voy', ex: 'Voy al cine.', tr: '나는 영화관에 간다.' },
                            { p: 'tú', f: 'vas', ex: '¿Vas a casa?', tr: '너 집에 가니?' },
                            { p: 'él/ella/ud.', f: 'va', ex: 'Él va al trabajo.', tr: '그는 직장에 간다.' },
                            { p: 'nosotros/as', f: 'vamos', ex: 'Vamos a comer.', tr: '우리 먹으러 가자.' },
                            { p: 'vosotros/as', f: 'vais', ex: '¿Vais a la playa?', tr: '너희들 해변에 가니?' },
                            { p: 'ellos/as/uds.', f: 'van', ex: 'Van a viajar.', tr: '그들은 여행할 것이다.' }
                        ].map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                <td className="px-5 py-2.5 font-bold text-slate-500 bg-slate-50/30 border-r border-slate-100 text-center whitespace-nowrap text-[15px]">{row.p}</td>
                                <td className="px-5 py-2.5 font-black text-indigo-700 text-center whitespace-nowrap text-lg">{row.f}</td>
                                <td className="px-5 py-2.5 text-center whitespace-nowrap">
                                    <div className="flex flex-col items-center">
                                        <span className="text-slate-900 font-bold">{row.ex}</span>
                                        <span className="text-xs text-slate-500 mt-0.5">{row.tr}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                <h4 className="text-[15px] font-extrabold text-slate-900 mb-3 tracking-tight flex items-center gap-2">
                    <Info size={16} className="text-indigo-500"/> 주요 용법 상세 (Usos)
                </h4>
                <div className="grid grid-cols-1 gap-3">
                    <div className="border border-slate-100 p-4 rounded-lg hover:border-indigo-200 transition-colors">
                        <span className="block font-bold text-slate-900 mb-1.5 text-[16px]">1. 장소 이동 (Destino)</span>
                        <p className="text-slate-600 text-sm mb-2 leading-relaxed">목적지를 향해 '가다'라는 의미로, 전치사 <strong>a</strong>와 함께 세트로 쓰입니다.</p>
                        <div className="bg-slate-50 px-3 py-2 rounded-lg border border-slate-200/60 flex flex-wrap items-center gap-2">
                            <span className="font-bold text-slate-800 italic text-[15px]">Voy a la escuela.</span>
                            <span className="text-slate-400 text-xs">(나는 학교에 간다)</span>
                        </div>
                    </div>
                    <div className="border border-slate-100 p-4 rounded-lg hover:border-indigo-200 transition-colors">
                        <span className="block font-bold text-slate-900 mb-1.5 text-[16px]">2. 근접 미래 (Futuro Próximo)</span>
                        <p className="text-slate-600 text-sm mb-2 leading-relaxed">'ir a + 동사원형' 형태로 곧 일어날 일이나 계획을 표현합니다.</p>
                        <div className="bg-slate-50 px-3 py-2 rounded-lg border border-slate-200/60 flex flex-wrap items-center gap-2">
                            <span className="font-bold text-slate-800 italic text-[15px]">Voy a comer pizza.</span>
                            <span className="text-slate-400 text-xs">(나는 피자를 먹을 것이다)</span>
                        </div>
                    </div>
                </div>
            </div>
          </section>

          {/* 3. Hacer */}
          <section id="sec-3" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">3.</span> hacer 동사 (행위와 날씨)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4 font-medium">1인칭 단수(yo)만 불규칙(-go)이고 나머지는 규칙 변화입니다.</p>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm mb-5">
                <table className="w-full text-[15px] text-center border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-900 font-extrabold border-b border-slate-200 text-[15px]">
                        <tr>
                            <th className="px-5 py-2 w-1/4 text-center whitespace-nowrap">주어</th>
                            <th className="px-5 py-2 w-1/4 text-center whitespace-nowrap">활용형</th>
                            <th className="px-5 py-2 text-center whitespace-nowrap">활용 예시</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {[
                            { p: 'yo', f: 'hago', ex: 'Hago la tarea.', tr: '나는 숙제를 한다.' },
                            { p: 'tú', f: 'haces', ex: '¿Qué haces?', tr: '너 뭐 하니?' },
                            { p: 'él/ella/ud.', f: 'hace', ex: 'Hace mucho frío.', tr: '날씨가 매우 춥다.' },
                            { p: 'nosotros/as', f: 'hacemos', ex: 'Hacemos ejercicio.', tr: '우리는 운동을 한다.' },
                            { p: 'vosotros/as', f: 'hacéis', ex: 'Hacéis la cama.', tr: '너희는 침대 정리를 한다.' },
                            { p: 'ellos/as/uds.', f: 'hacen', ex: 'Hacen un pastel.', tr: '그들은 케이크를 만든다.' }
                        ].map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                <td className="px-5 py-2.5 font-bold text-slate-500 bg-slate-50/30 border-r border-slate-100 text-center whitespace-nowrap text-[15px]">{row.p}</td>
                                <td className="px-5 py-2.5 font-black text-rose-700 text-center whitespace-nowrap text-lg">{row.f}</td>
                                <td className="px-5 py-2.5 text-center whitespace-nowrap">
                                    <div className="flex flex-col items-center">
                                        <span className="text-slate-900 font-bold">{row.ex}</span>
                                        <span className="text-xs text-slate-500 mt-0.5">{row.tr}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                <h4 className="text-[15px] font-extrabold text-slate-900 mb-3 tracking-tight flex items-center gap-2">
                    <Info size={16} className="text-rose-500"/> 주요 용법 상세 (Usos)
                </h4>
                <div className="grid grid-cols-1 gap-3">
                    <div className="border border-slate-100 p-4 rounded-lg hover:border-rose-200 transition-colors">
                        <span className="block font-bold text-slate-900 mb-1.5 text-[16px]">1. 행위/만들기 (Acción)</span>
                        <p className="text-slate-600 text-sm mb-2 leading-relaxed">'하다(do)' 또는 '만들다(make)'의 의미로 광범위하게 쓰입니다.</p>
                        <div className="bg-slate-50 px-3 py-2 rounded-lg border border-slate-200/60 flex flex-wrap items-center gap-2">
                            <span className="font-bold text-slate-800 italic text-[15px]">Hago los deberes.</span>
                            <span className="text-slate-400 text-xs">(숙제를 한다)</span>
                        </div>
                    </div>
                    <div className="border border-slate-100 p-4 rounded-lg hover:border-rose-200 transition-colors">
                        <span className="block font-bold text-slate-900 mb-1.5 text-[16px]">2. 날씨 표현 (Clima)</span>
                        <p className="text-slate-600 text-sm mb-2 leading-relaxed">날씨를 '만드는' 주체는 자연이므로 항상 3인칭 단수(hace)를 씁니다.</p>
                        <div className="flex flex-col gap-1.5">
                            <div className="bg-slate-50 px-3 py-2 rounded-lg border border-slate-200/60 flex flex-wrap items-center gap-2">
                                <span className="font-bold text-slate-800 italic text-[15px]">Hace sol.</span>
                                <span className="text-slate-400 text-xs">(해가 쨍쨍하다)</span>
                            </div>
                            <div className="bg-slate-50 px-3 py-2 rounded-lg border border-slate-200/60 flex flex-wrap items-center gap-2">
                                <span className="font-bold text-slate-800 italic text-[15px]">Hace viento.</span>
                                <span className="text-slate-400 text-xs">(바람이 분다)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </section>

          {/* 4. 용법 비교 */}
          <section id="sec-4" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">4.</span> 혼동하기 쉬운 용법 비교
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm hover:border-blue-200 transition-colors">
                    <h4 className="text-lg font-extrabold text-blue-900 mb-3 flex items-center gap-2">
                        <Info size={20} className="text-blue-500"/> tener calor
                    </h4>
                    <p className="text-[15px] text-slate-600 leading-relaxed mb-4">
                        주어(나)가 느끼는 <strong>주관적인 신체 감각</strong>을 표현합니다. <br/>
                        <span className="text-sm text-slate-400 font-normal">(내 몸이 덥다)</span>
                    </p>
                    <div className="bg-slate-50 px-4 py-3 rounded-lg border border-slate-200/60">
                        <p className="text-slate-900 font-bold text-lg italic">Tengo mucho calor.</p>
                    </div>
                </div>
                <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm hover:border-rose-200 transition-colors">
                    <h4 className="text-lg font-extrabold text-rose-900 mb-3 flex items-center gap-2">
                        <CloudSun size={20} className="text-rose-500"/> hace calor
                    </h4>
                    <p className="text-[15px] text-slate-600 leading-relaxed mb-4">
                        현재 외부 환경의 <strong>객관적인 날씨 상태</strong>를 표현합니다. <br/>
                        <span className="text-sm text-slate-400 font-normal">(날씨가 덥다)</span>
                    </p>
                    <div className="bg-slate-50 px-4 py-3 rounded-lg border border-slate-200/60">
                        <p className="text-slate-900 font-bold text-lg italic">Hoy hace mucho calor.</p>
                    </div>
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