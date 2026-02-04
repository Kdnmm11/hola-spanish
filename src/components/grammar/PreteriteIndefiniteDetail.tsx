'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, ArrowRight, Info, AlertTriangle, Calendar, Lightbulb
} from 'lucide-react';

const REGULAR_CONJ = [
    { p: 'yo', ar: 'é', er: 'í', ir: 'í' },
    { p: 'tú', ar: 'aste', er: 'iste', ir: 'iste' },
    { p: 'él/ella/ud.', ar: 'ó', er: 'ió', ir: 'ió' },
    { p: 'nosotros/as', ar: 'amos', er: 'imos', ir: 'imos' },
    { p: 'vosotros/as', ar: 'asteis', er: 'isteis', ir: 'isteis' },
    { p: 'ellos/ellas/uds.', ar: 'aron', er: 'ieron', ir: 'ieron' }
];

const COMMON_IRREGULARS = [
    { p: 'yo', ser_ir: 'fui', dar: 'di', ver: 'vi' },
    { p: 'tú', ser_ir: 'fuiste', dar: 'diste', ver: 'viste' },
    { p: 'él/ella', ser_ir: 'fue', dar: 'dio', ver: 'vio' },
    { p: 'nosotros', ser_ir: 'fuimos', dar: 'dimos', ver: 'vimos' },
    { p: 'vosotros', ser_ir: 'fuisteis', dar: 'disteis', ver: 'visteis' },
    { p: 'ellos', ser_ir: 'fueron', dar: 'dieron', ver: 'vieron' }
];

const STEM_GROUPS = [
    { group: 'U형 불규칙', ex: 'tener → tuv-, estar → estuv-, poder → pud-', note: '어미: e, iste, o, imos...' },
    { group: 'I형 불규칙', ex: 'hacer → hic- (3인칭 hizo), querer → quis-', note: '강세 부호 없음' },
    { group: 'J형 불규칙', ex: 'decir → dij-, traer → traj-', note: '3인칭 복수 -eron (i 탈락)' }
];

const QUIZ_DATA = [
    { id: 1, q: "빈칸 채우기: ayer yo (     ) a la playa. (ir)", options: ['fui', 'fue', 'iba'], answer: 0, explain: "ir(가다)의 점과거 1인칭 단수형은 'fui'입니다. (ser와 동일)" },
    { id: 2, q: "hacer(하다)의 3인칭 단수(él) 점과거 형태는?", options: ['hació', 'hizo', 'hiciste'], answer: 1, explain: "hacer는 i-stem 불규칙이며, 3인칭 단수는 철자 변화로 인해 'hizo'가 됩니다." },
    { id: 3, q: "문장의 오류 수정: ella pedió un café.", options: ['pedi', 'pidió'], answer: 1, explain: "pedir는 3인칭에서 모음 변화(e->i)가 일어나 'pidió'가 됩니다." },
    { id: 4, q: "poder 동사의 1인칭 단수(yo) 형태는?", options: ['podé', 'pude', 'pudí'], answer: 1, explain: "poder는 u-stem 불규칙(pud-)이며, 1인칭 단수 어미 -e를 붙여 pude가 됩니다." }
];

export default function PreteriteIndefiniteDetail() {
  const [quizState, setQuizState] = useState<{ [key: number]: number | null }>({});
  const [showExplain, setShowExplain] = useState<{ [key: number]: boolean }>({});

  const handleQuiz = (qId: number, optIdx: number) => {
    setQuizState(prev => ({ ...prev, [qId]: optIdx }));
    setShowExplain(prev => ({ ...prev, [qId]: true }));
  };

  const scrollTo = (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderRegular = (suffix: string, stem: string) => (
      <span>{stem}<span className="text-indigo-600 font-bold">{suffix}</span></span>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto px-6 lg:px-8 py-8 font-sans text-slate-900 bg-white">
      
      <article className="flex-1 min-w-0">
          <header className="mb-8 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 tracking-widest mb-2">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 22</span>
                <ChevronRight size={10} />
                <span>Intermediate Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              직설법 점과거
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               과거의 특정 시점에 완료된 동작을 나타냅니다. <br/>
               규칙 변화의 강세 부호와 다양한 불규칙 어간 패턴을 학습합니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-900">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-bold text-slate-700">
                  <li><strong>완료된 과거</strong>: 과거의 특정 시점에 시작해서 끝난 동작을 표현합니다. (점, Dot)</li>
                  <li><strong>규칙 강세</strong>: 1인칭(-é/-í)과 3인칭(-ó/-ió) 단수에 반드시 강세가 붙습니다.</li>
                  <li><strong>불규칙</strong>: ser/ir는 형태가 같으며, 어간 변화 동사들은 강세를 찍지 않습니다.</li>
              </ul>
          </div>

          {/* 1. 점과거의 개념 */}
          <section id="sec-1" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 점과거의 개념과 용법
            </h2>
            <div className="grid grid-cols-1 gap-4">
                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm hover:border-blue-200 transition-colors">
                    <span className="block font-bold text-slate-900 mb-2 text-lg">1. 완료된 동작</span>
                    <p className="text-[15px] text-slate-600 mb-3 leading-relaxed">
                        과거의 특정 시점에 일어나서 <strong>완전히 끝난 일</strong>을 말할 때 씁니다. (가장 기본 용법)
                    </p>
                    <div className="bg-slate-50 px-4 py-3 rounded-lg border border-slate-200/60 flex flex-wrap items-center gap-2">
                        <span className="font-bold text-slate-800 italic text-[15px]">Ayer compré un libro.</span>
                        <span className="text-slate-400 text-sm">(어제 책 한 권을 샀다)</span>
                    </div>
                </div>
                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm hover:border-blue-200 transition-colors">
                    <span className="block font-bold text-slate-900 mb-2 text-lg">2. 연속된 사건</span>
                    <p className="text-[15px] text-slate-600 mb-3 leading-relaxed">
                        과거에 순차적으로 일어난 사건들의 <strong>스토리 흐름</strong>을 나열할 때 씁니다.
                    </p>
                    <div className="bg-slate-50 px-4 py-3 rounded-lg border border-slate-200/60 flex flex-wrap items-center gap-2">
                        <span className="font-bold text-slate-800 italic text-[15px]">Llegué, vi, vencí.</span>
                        <span className="text-slate-400 text-sm">(왔노라, 보았노라, 이겼노라)</span>
                    </div>
                </div>
                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm hover:border-blue-200 transition-colors">
                    <span className="block font-bold text-slate-900 mb-2 text-lg">3. 기간이 명시된 일</span>
                    <p className="text-[15px] text-slate-600 mb-3 leading-relaxed">
                        동작이 지속되었더라도 <strong>시작과 끝이 명확</strong>하면 점과거를 사용합니다.
                    </p>
                    <div className="bg-slate-50 px-4 py-3 rounded-lg border border-slate-200/60 flex flex-wrap items-center gap-2">
                        <span className="font-bold text-slate-800 italic text-[15px]">Viví allí tres años.</span>
                        <span className="text-slate-400 text-sm">(거기서 3년 동안 살았다 - 지금은 안 삶)</span>
                    </div>
                </div>
            </div>
          </section>

          {/* 2. 규칙 변화 */}
          <section id="sec-2" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 규칙 변화 (conjugación regular)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4 font-medium">1인칭과 3인칭 단수의 강세(tilde)에 유의하세요. -er과 -ir은 어미가 같습니다.</p>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-900 font-extrabold border-b border-slate-200 text-[15px]">
                        <tr>
                            <th className="px-5 py-3 w-1/4 whitespace-nowrap">주어</th>
                            <th className="px-5 py-3 w-1/4 whitespace-nowrap">-ar (hablar)</th>
                            <th className="px-5 py-3 w-1/4 whitespace-nowrap">-er (comer)</th>
                            <th className="px-5 py-3 w-1/4 whitespace-nowrap">-ir (vivir)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {REGULAR_CONJ.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 font-bold text-slate-500 bg-slate-50/30 border-r border-slate-100 text-center whitespace-nowrap">{row.p}</td>
                                <td className="px-5 py-4 text-slate-900 font-medium border-r border-slate-100 whitespace-nowrap">{renderRegular(row.ar, 'habl')}</td>
                                <td className="px-5 py-4 text-slate-900 font-medium border-r border-slate-100 whitespace-nowrap">{renderRegular(row.er, 'com')}</td>
                                <td className="px-5 py-4 text-slate-900 font-medium whitespace-nowrap">{renderRegular(row.ir, 'viv')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 3. 주요 불규칙 */}
          <section id="sec-3" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 주요 불규칙 (ser / ir, dar, ver)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4 font-medium">가장 자주 쓰이는 불규칙 동사들입니다. 강세 부호가 없습니다.</p>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-900 font-extrabold border-b border-slate-200 text-[15px]">
                        <tr>
                            <th className="px-5 py-3 w-1/4 whitespace-nowrap">주어</th>
                            <th className="px-5 py-3 w-1/4 whitespace-nowrap">ser / ir</th>
                            <th className="px-5 py-3 w-1/4 whitespace-nowrap">dar</th>
                            <th className="px-5 py-3 w-1/4 whitespace-nowrap">ver</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {COMMON_IRREGULARS.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                <td className="px-5 py-4 font-bold text-slate-500 bg-slate-50/30 border-r border-slate-100 text-center whitespace-nowrap">{row.p}</td>
                                <td className="px-5 py-4 font-black text-slate-900 border-r border-slate-100 whitespace-nowrap">{row.ser_ir}</td>
                                <td className="px-5 py-4 font-medium text-slate-900 border-r border-slate-100 whitespace-nowrap">{row.dar}</td>
                                <td className="px-5 py-4 font-medium text-slate-900 whitespace-nowrap">{row.ver}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 4. 어간 변화 불규칙 */}
          <section id="sec-4" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">4.</span> 어간 변화 불규칙 (u, i, j형)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4 font-medium">이 그룹들은 공통된 불규칙 어미를 사용하며, 강세 부호를 찍지 않는 것이 특징입니다.</p>
            
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm mb-6">
                <table className="w-full text-[15px] text-center border-collapse min-w-[700px]">
                    <thead className="bg-slate-50 text-slate-900 font-extrabold border-b border-slate-200 text-[15px]">
                        <tr>
                            <th className="px-4 py-3 w-16 whitespace-nowrap bg-slate-100">주어</th>
                            <th className="px-4 py-3 whitespace-nowrap">u형 어간 (tener)</th>
                            <th className="px-4 py-3 whitespace-nowrap">i형 어간 (hacer)</th>
                            <th className="px-4 py-3 whitespace-nowrap">j형 어간 (decir)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {[
                            { p: 'yo', u: 'tuve', i: 'hice', j: 'dije' },
                            { p: 'tú', u: 'tuviste', i: 'hiciste', j: 'dijiste' },
                            { p: 'él/ella', u: 'tuvo', i: 'hizo', j: 'dijo' },
                            { p: 'nosotros', u: 'tuvimos', i: 'hicimos', j: 'dijimos' },
                            { p: 'vosotros', u: 'tuvisteis', i: 'hicisteis', j: 'dijisteis' },
                            { p: 'ellos', u: 'tuvieron', i: 'hicieron', j: 'dijeron' }
                        ].map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-4 py-3 font-bold text-slate-500 bg-slate-50/30 border-r border-slate-100">{row.p}</td>
                                <td className="px-4 py-3 text-slate-900 font-medium border-r border-slate-100 italic">{row.u}</td>
                                <td className="px-4 py-3 text-slate-900 font-medium border-r border-slate-100 italic">{row.i}</td>
                                <td className="px-4 py-3 text-slate-900 font-medium italic">{row.j}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-start gap-3">
                <Info size={18} className="text-blue-500 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-600 leading-relaxed">
                    <strong>주의사항:</strong> i형의 3인칭 단수는 <span className="text-rose-600 font-bold">hizo</span>(c→z)로 변하며, j형의 3인칭 복수는 i가 탈락한 <span className="text-emerald-600 font-bold">-eron</span> 형태를 가집니다.
                </p>
            </div>
          </section>

          {/* 5. 3인칭 변화 */}
          <section id="sec-5" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">5.</span> 3인칭만 변화 (slipper verbs)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4 font-medium">3인칭 단수와 복수에서만 어간 모음이 변합니다.</p>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-900 font-extrabold border-b border-slate-200 text-[15px]">
                        <tr>
                            <th className="px-5 py-3 whitespace-nowrap">동사</th>
                            <th className="px-5 py-3 whitespace-nowrap">1인칭 (yo)</th>
                            <th className="px-5 py-3 whitespace-nowrap">2인칭 (tú)</th>
                            <th className="px-5 py-3 whitespace-nowrap">3인칭 단수 (él)</th>
                            <th className="px-5 py-3 whitespace-nowrap">1인칭 복수</th>
                            <th className="px-5 py-3 whitespace-nowrap">3인칭 복수 (ellos)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        <tr>
                            <td className="px-5 py-4 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100">pedir (e→i)</td>
                            <td className="px-5 py-4 text-slate-500 border-r border-slate-100">pedí</td>
                            <td className="px-5 py-4 text-slate-500 border-r border-slate-100">pediste</td>
                            <td className="px-5 py-4 font-black text-slate-900 border-r border-slate-100">pidió</td>
                            <td className="px-5 py-4 text-slate-500 border-r border-slate-100">pedimos</td>
                            <td className="px-5 py-4 font-black text-slate-900">pidieron</td>
                        </tr>
                        <tr>
                            <td className="px-5 py-4 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100">dormir (o→u)</td>
                            <td className="px-5 py-4 text-slate-500 border-r border-slate-100">dormí</td>
                            <td className="px-5 py-4 text-slate-500 border-r border-slate-100">dormiste</td>
                            <td className="px-5 py-4 font-black text-slate-900 border-r border-slate-100">durmió</td>
                            <td className="px-5 py-4 text-slate-500 border-r border-slate-100">dormimos</td>
                            <td className="px-5 py-4 font-black text-slate-900">durmieron</td>
                        </tr>
                        <tr>
                            <td className="px-5 py-4 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100">leer (i→y)</td>
                            <td className="px-5 py-4 text-slate-500 border-r border-slate-100">leí</td>
                            <td className="px-5 py-4 text-slate-500 border-r border-slate-100">leíste</td>
                            <td className="px-5 py-4 font-black text-slate-900 border-r border-slate-100">leyó</td>
                            <td className="px-5 py-4 text-slate-500 border-r border-slate-100">leímos</td>
                            <td className="px-5 py-4 font-black text-slate-900">leyeron</td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </section>

          {/* 6. 시간 부사 */}
          <section id="sec-6" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">6.</span> 자주 쓰이는 시간 부사
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm text-center">
                    <span className="text-indigo-600 font-black text-lg block mb-1">ayer</span>
                    <span className="text-slate-500 text-sm font-medium">어제</span>
                </div>
                <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm text-center">
                    <span className="text-indigo-600 font-black text-lg block mb-1">anoche</span>
                    <span className="text-slate-500 text-sm font-medium">어젯밤</span>
                </div>
                <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm text-center">
                    <span className="text-indigo-600 font-black text-lg block mb-1">el año pasado</span>
                    <span className="text-slate-500 text-sm font-medium">작년</span>
                </div>
                <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm text-center">
                    <span className="text-indigo-600 font-black text-lg block mb-1">hace dos días</span>
                    <span className="text-slate-500 text-sm font-medium">이틀 전에</span>
                </div>
            </div>
          </section>

          {/* 연습 문제 */}
          <section id="sec-6" className="scroll-mt-24 pt-8 border-t border-slate-200">
             <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Lightbulb className="text-yellow-500 fill-yellow-500" size={20} />
                기초 다지기 (Práctica)
             </h2>
             <div className="space-y-4">
                {QUIZ_DATA.map((q, idx) => (
                    <div key={q.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-all">
                        <div className="flex items-start gap-3 mb-4">
                            <span className="bg-indigo-100 text-indigo-600 text-xs font-bold px-2.5 py-1 rounded-full mt-0.5">Q{idx + 1}</span>
                            <p className="font-bold text-slate-900 text-base leading-snug whitespace-pre-wrap">{q.q.replace(/^[a-z]/, (c) => c.toUpperCase())}</p>
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
                                        {opt.replace(/^[a-z]/, (c) => c.toUpperCase())}
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
                {['점과거 개념', '규칙 변화', '주요 불규칙', '어간 불규칙', '3인칭 변화', '시간 부사', '연습 문제'].map((item, i) => (
                    <li key={i}>
                        <button onClick={() => scrollTo(`sec-${i}`)} className="text-slate-500 hover:text-slate-900 transition-colors text-left flex items-center gap-2 group font-medium">
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