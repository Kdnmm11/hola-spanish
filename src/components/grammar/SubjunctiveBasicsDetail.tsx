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

const YO_IRREGULAR_LIST = [
    { inf: 'tener', ind: 'tengo', sub: 'tenga' },
    { inf: 'hacer', ind: 'hago', sub: 'haga' },
    { inf: 'poner', ind: 'pongo', sub: 'ponga' },
    { inf: 'salir', ind: 'salgo', sub: 'salga' },
    { inf: 'venir', ind: 'vengo', sub: 'venga' },
    { inf: 'decir', ind: 'digo', sub: 'diga' },
    { inf: 'traer', ind: 'traigo', sub: 'traiga' },
    { inf: 'conocer', ind: 'conozco', sub: 'conozca' }
];

const BOOT_VERBS_TRANSPOSED = [
    { p: 'yo', pensar: { stem: 'p', ch: 'ie', end: 'nse' }, dormir: { stem: 'd', ch: 'ue', end: 'rma' }, pedir: { stem: 'p', ch: 'i', end: 'da' } },
    { p: 'tú', pensar: { stem: 'p', ch: 'ie', end: 'nses' }, dormir: { stem: 'd', ch: 'ue', end: 'rmas' }, pedir: { stem: 'p', ch: 'i', end: 'das' } },
    { p: 'él/ella', pensar: { stem: 'p', ch: 'ie', end: 'nse' }, dormir: { stem: 'd', ch: 'ue', end: 'rma' }, pedir: { stem: 'p', ch: 'i', end: 'da' } },
    { p: 'nosotros', pensar: { stem: 'p', ch: 'e', end: 'nsemos' }, dormir: { stem: 'd', ch: 'u', end: 'rmamos' }, pedir: { stem: 'p', ch: 'i', end: 'damos' } },
    { p: 'vosotros', pensar: { stem: 'p', ch: 'e', end: 'nséis' }, dormir: { stem: 'd', ch: 'u', end: 'rmáis' }, pedir: { stem: 'p', ch: 'i', end: 'dáis' } },
    { p: 'ellos', pensar: { stem: 'p', ch: 'ie', end: 'nsen' }, dormir: { stem: 'd', ch: 'ue', end: 'rman' }, pedir: { stem: 'p', ch: 'i', end: 'dan' } }
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
    { char: 'w', rest: 'ishes', kor: '소망', ex: 'quiero que vengas. (네가 오길 원해)' },
    { char: 'e', rest: 'motions', kor: '감정', ex: 'me alegro de que estés aquí. (네가 있어서 기뻐)' },
    { char: 'i', rest: 'mpersonal', kor: '비인칭', ex: 'es necesario que estudies. (네가 공부하는 게 필요해)' },
    { char: 'r', rest: 'equests', kor: '요청', ex: 'te pido que comas esto. (이걸 먹으라고 요청해)' },
    { char: 'd', rest: 'oubt', kor: '의심', ex: 'dudo que él diga la verdad. (그가 진실을 말할지 의심스러워)' },
    { char: 'o', rest: 'jalá', kor: '희망', ex: '¡ojalá tengas buen día! (부디 좋은 하루 보내길!)' }
];

const QUIZ_DATA = [
    { id: 1, q: "빈칸 채우기: es importante que tú (     ) la verdad. (saber)", options: ['sabes', 'sepas', 'sepa'], answer: 1, explain: "비인칭 구문(es importante que) 뒤에는 접속법을 쓰며, saber는 불규칙 변화(sepa, sepas...)를 합니다." },
    { id: 2, q: "직설법 vs 접속법: no creo que él (     ) hoy. (venir)", options: ['viene', 'venga'], answer: 1, explain: "no creo que(부정/의심) 뒤에는 접속법(venga)을 씁니다. creo que(확신) 뒤에는 직설법(viene)을 씁니다." },
    { id: 3, q: "불규칙 동사 ser의 접속법 1인칭 단수형은?", options: ['sere', 'sea', 'sepa'], answer: 1, explain: "ser의 접속법 형태는 sea, seas, sea... 입니다." },
    { id: 4, q: "빈칸 채우기: ella quiere que nosotros (     ) mucho. (comer)", options: ['comemos', 'comas', 'comamos'], answer: 2, explain: "주절의 'quiere'(소망)로 인해 종속절에 접속법이 오며, nosotros 인칭의 -er 동사 접속법 어미는 -amos입니다." }
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
      <span>{stem}<span className="text-red-500 font-black">{suffix}</span></span>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto px-2 sm:px-3 lg:px-4 pt-1.5 pb-8 font-sans text-slate-800 bg-white">
      
      <article className="flex-1 min-w-0">
          <header className="mb-8 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 tracking-widest mb-2">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 28</span>
                <ChevronRight size={10} />
                <span>Intermediate Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              접속법 기초 (subjuntivo)
            </h1>
            <p className="text-[16px] text-slate-600 font-medium leading-relaxed">
               사실이 아닌 화자의 주관적인 태도(소망, 의심, 감정)를 표현하는 법을 배웁니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium text-slate-700">
                  <li><strong>교차 법칙</strong>: -ar 동사는 -e 어미를, -er/-ir 동사는 -a 어미를 씁니다.</li>
                  <li><strong>weirdo</strong>: 소망, 감정, 의심 등 접속법을 유발하는 6가지 주요 상황입니다.</li>
                  <li><strong>불규칙</strong>: yo 형태가 불규칙하면 접속법도 불규칙을 따릅니다.</li>
              </ul>
          </div>

          {/* 1. 형태 */}
          <section id="sec-1" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 접속법 현재의 형태 (교차 법칙)
            </h2>
            <p className="text-[15px] text-slate-600 mb-6 font-medium">직설법 현재 yo에서 -o를 떼고 반대 성격의 어미를 붙입니다.</p>
            <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm mb-8">
                <table className="w-full text-[15px] text-center border-collapse min-w-[600px] table-fixed">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm">
                        <tr>
                            <th className="px-5 py-4 w-1/4 text-left pl-8 whitespace-nowrap">주어</th>
                            <th className="px-5 py-4 w-1/4 whitespace-nowrap">-ar (hablar)</th>
                            <th className="px-5 py-4 w-1/4 whitespace-nowrap">-er (comer)</th>
                            <th className="px-5 py-4 w-1/4 whitespace-nowrap">-ir (vivir)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {SUBJUNCTIVE_REGULAR.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-5 text-left pl-8 font-bold text-slate-400 text-base whitespace-nowrap">{row.p}</td>
                                <td className="px-5 py-5 font-medium text-slate-900 border-x border-slate-100 whitespace-nowrap text-lg">
                                    {renderVerb('habl', row.ar)}
                                </td>
                                <td className="px-5 py-5 font-medium text-slate-900 border-r border-slate-100 whitespace-nowrap text-lg">
                                    {renderVerb('com', row.er)}
                                </td>
                                <td className="px-5 py-5 font-medium text-slate-900 whitespace-nowrap text-lg">
                                    {renderVerb('viv', row.ir)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 2. 불규칙 동사 완전 정복 */}
          <section id="sec-2" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 불규칙 동사 완전 정복
            </h2>
            
            {/* 2-1. Yo 불규칙 */}
            <div className="mb-10">
                <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-black">1</span>
                    yo 형태 기반 불규칙
                </h3>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed font-medium">
                    직설법 현재 1인칭(yo)이 불규칙이면, 접속법 전체가 그 어간을 따라갑니다.
                </p>
                <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
                    <table className="w-full text-[15px] text-center border-collapse min-w-[500px]">
                        <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm">
                            <tr>
                                <th className="px-4 py-3 w-1/3 text-left pl-8">동사 원형</th>
                                <th className="px-4 py-3 w-1/3 text-slate-500">직설법 (yo)</th>
                                <th className="px-4 py-3 w-1/3 text-slate-900">접속법 (yo)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {YO_IRREGULAR_LIST.map((item, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/50">
                                    <td className="px-4 py-3 font-medium text-left pl-8 text-slate-700">{item.inf}</td>
                                    <td className="px-4 py-3 text-slate-400">{item.ind}</td>
                                    <td className="px-4 py-3 font-black text-slate-900 text-lg">
                                        {item.sub}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 2-2. 어간 변화 (구조 변경: 행/열 전치) */}
            <div className="mb-10">
                <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-black">2</span>
                    어간 변화 (boot verbs)
                </h3>
                <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
                    <table className="w-full text-[15px] text-center border-collapse min-w-[600px]">
                        <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm">
                            <tr>
                                <th className="px-4 py-3 w-1/4">인칭</th>
                                <th className="px-4 py-3 w-1/4">pensar (e→ie)</th>
                                <th className="px-4 py-3 w-1/4">dormir (o→ue)</th>
                                <th className="px-4 py-3 w-1/4">pedir (e→i)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {BOOT_VERBS_TRANSPOSED.map((row, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/50">
                                    <td className="px-4 py-3 font-bold text-slate-400 text-sm bg-slate-50/30 border-r border-slate-100">{row.p}</td>
                                    
                                    {/* Pensar (e->ie) */}
                                    <td className="px-4 py-3 text-slate-700 border-r border-slate-50">
                                        <span>
                                            {row.pensar.stem}
                                            {row.pensar.ch === 'e' 
                                                ? <span className="text-slate-900">{row.pensar.ch}</span>
                                                : <span className="text-blue-800 font-black">{row.pensar.ch}</span>
                                            }
                                            <span className="text-blue-600 font-bold">{row.pensar.end}</span>
                                        </span>
                                    </td>

                                    {/* Dormir (o->ue) */}
                                    <td className="px-4 py-3 text-slate-700 border-r border-slate-50">
                                        <span>
                                            {row.dormir.stem}
                                            <span className="text-blue-800 font-black">{row.dormir.ch}</span>
                                            <span className="text-blue-600 font-bold">{row.dormir.end}</span>
                                        </span>
                                    </td>

                                    {/* Pedir (e->i) */}
                                    <td className="px-4 py-3 text-slate-700">
                                        <span>
                                            {row.pedir.stem}
                                            <span className="text-blue-800 font-black">{row.pedir.ch}</span>
                                            <span className="text-blue-600 font-bold">{row.pedir.end}</span>
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-slate-400 mt-2 pl-2 border-l-2 border-slate-200">
                    * 어간 변화와 어미를 <span className="text-blue-600 font-bold">파란색</span>으로 강조했습니다.
                </p>
            </div>

            {/* 2-3. 완전 불규칙 */}
            <div>
                <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-black">3</span>
                    완전 불규칙 (dishes)
                </h3>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed font-medium">
                    어떤 규칙도 따르지 않는 6개 동사입니다.
                </p>
                <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
                    <table className="w-full text-[15px] text-center border-collapse min-w-[600px]">
                        <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm">
                            <tr>
                                <th className="px-4 py-3 w-1/3">동사 원형</th>
                                <th className="px-4 py-3 w-1/3 text-slate-900">접속법 (yo)</th>
                                <th className="px-4 py-3 w-1/3 text-slate-400">암기 팁</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {SUBJUNCTIVE_IRREGULAR.map((item, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/50">
                                    <td className="px-4 py-3 font-medium text-slate-600">{item.inf}</td>
                                    <td className="px-4 py-3 font-black text-slate-900 text-lg">
                                        {/* 전체가 불규칙이므로 전체 강조하되, 어미 부분 느낌을 주기 위해 빨간색 살짝 섞을 수 있음. 하지만 여기선 전체가 바뀐 형태라 그냥 둠 or 빨강? 
                                            사용자 요청: 어미는 빨강. 하지만 완전 불규칙은 어미라기보다 전체 형태임.
                                            가장 직관적인 건 전체를 진한 파랑 or 빨강으로 하는 것.
                                            요청: "어간 바뀌는건 진한 파란색". 완전 불규칙은 어간 전체가 바뀜 -> 진한 파랑으로.
                                        */}
                                        <span className="text-blue-800">{item.yo}</span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-slate-400 italic">완전 불규칙</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
          </section>

          {/* 3. 용법 (weirdo) */}
          <section id="sec-3" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 접속법의 주요 용법 (weirdo)
            </h2>
            <p className="text-[15px] text-slate-600 mb-6 font-medium leading-relaxed">주절의 동사가 아래 6가지 상황 중 하나를 나타낼 때 종속절(que 이하)에 접속법을 씁니다.</p>
            <div className="grid grid-cols-1 gap-4">
                {WEIRDO_USAGE.map((item, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-200 transition-all group">
                        <div className="flex items-baseline gap-0 min-w-[200px] mb-3 sm:mb-0">
                            <span className="text-3xl font-black text-blue-600 uppercase">{item.char}</span>
                            <span className="text-lg font-bold text-slate-700 lowercase">{item.rest}</span>
                            <span className="text-sm text-slate-400 ml-3 font-bold leading-tight bg-slate-50 px-2 py-0.5 rounded">({item.kor})</span>
                        </div>
                        <div className="flex flex-col items-end text-right">
                            <span className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{item.ex.split('(')[0]}</span>
                            <span className="text-sm text-slate-400 mt-1 font-medium">{item.ex.split('(')[1]?.replace(')', '')}</span>
                        </div>
                    </div>
                ))}
            </div>
          </section>

          {/* 4. 직설법 vs 접속법 */}
          <section id="sec-4" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">4.</span> 직설법 vs 접속법 구분
            </h2>
            <p className="text-[15px] text-slate-600 mb-6 font-medium">화자가 사실로 믿는지(확신) 아니면 주관적 태도인지(불확실)에 따라 달라집니다.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-slate-300 transition-all">
                    <h4 className="font-bold text-base text-slate-800 mb-4 flex items-center gap-2">
                        <Info size={18} className="text-slate-400"/> 확신 (indicativo)
                    </h4>
                    <div className="bg-slate-50 p-4 rounded-xl mb-3 border border-slate-100">
                        <span className="text-slate-900 font-bold text-lg italic">creo que él <span className="underline">viene</span>.</span>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">나는 그가 온다고 믿는다. (사실로 간주하여 직설법 사용)</p>
                </div>
                <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-slate-300 transition-all">
                    <h4 className="font-bold text-base text-slate-800 mb-4 flex items-center gap-2">
                        <HelpCircle size={18} className="text-slate-400"/> 의심 (subjuntivo)
                    </h4>
                    <div className="bg-slate-50 p-4 rounded-xl mb-3 border border-slate-100">
                        <span className="text-slate-900 font-bold text-lg italic">no creo que él <span className="text-slate-900 font-black underline">venga</span>.</span>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">나는 그가 올 거라고 믿지 않는다. (불확실하여 접속법 사용)</p>
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
                    <div key={q.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
                        <div className="flex items-start gap-3 mb-4">
                            <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-full mt-0.5">Q{idx + 1}</span>
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
                {['접속법 형태', '불규칙 동사', 'weirdo 용법', '직설법 비교', '연습 문제'].map((item, i) => (
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