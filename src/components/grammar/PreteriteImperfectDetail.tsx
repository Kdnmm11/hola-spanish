'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, ArrowRight, Info, AlertTriangle, History, Brush, Lightbulb
} from 'lucide-react';

const REGULAR_CONJ = [
    { p: 'yo', ar: 'aba', er: 'ía', ir: 'ía' },
    { p: 'tú', ar: 'abas', er: 'ías', ir: 'ías' },
    { p: 'él/ella/ud.', ar: 'aba', er: 'ía', ir: 'ía' },
    { p: 'nosotros/as', ar: 'ábamos', er: 'íamos', ir: 'íamos' },
    { p: 'vosotros/as', ar: 'abais', er: 'íais', ir: 'íais' },
    { p: 'ellos/as/uds.', ar: 'aban', er: 'ían', ir: 'ían' }
];

const IRREGULAR_CONJ = [
    { p: 'yo', ser: 'era', ir: 'iba', ver: 'veía' },
    { p: 'tú', ser: 'eras', ir: 'ibas', ver: 'veías' },
    { p: 'él/ella', ser: 'era', ir: 'iba', ver: 'veía' },
    { p: 'nosotros', ser: 'éramos', ir: 'íbamos', ver: 'veíamos' },
    { p: 'vosotros', ser: 'erais', ir: 'ibais', ver: 'veíais' },
    { p: 'ellos', ser: 'eran', ir: 'iban', ver: 'veían' }
];

const USAGE_CASES = [
    { type: '과거의 습관', ex: 'jugaba al fútbol cada domingo. (축구를 하곤 했다)' },
    { type: '진행 중인 동작', ex: 'leía un libro cuando llamó. (책을 읽고 있었다)' },
    { type: '상태/배경 설명', ex: 'la casa era grande. (집이 컸다/상태)' },
    { type: '시간/날씨/나이', ex: 'eran las tres. (3시였다) / tenía 10 años. (10살이었다)' }
];

const QUIZ_DATA = [
    { id: 1, q: "빈칸 채우기: cuando (     ) niño, comía mucho chocolate. (동사: ser)", options: ['fui', 'era', 'soy'], answer: 1, explain: "과거의 지속적인 상태나 신분('어렸을 때')을 나타낼 때는 선과거 era를 씁니다." },
    { id: 2, q: "'ir(가다)' 동사의 nosotros 선과거 형태는?", options: ['fuimos', 'íbamos', 'ibamos'], answer: 1, explain: "ir의 선과거는 불규칙이며, nosotros 형태에는 강세 부호가 붙어 íbamos가 됩니다." },
    { id: 3, q: "선과거의 특징으로 틀린 것은?", options: ['1인칭과 3인칭 단수 형태가 같다.', '불규칙 동사가 매우 많다.', '-er과 -ir의 어미가 같다.'], answer: 1, explain: "선과거의 불규칙 동사는 ser, ir, ver 단 3개뿐입니다." },
    { id: 4, q: "'우리는 매주 일요일마다 축구를 하곤 했다'에 알맞은 형태는?", options: ['jugamos', 'jugábamos', 'jugué'], answer: 1, explain: "과거의 반복적인 습관(~하곤 했다)을 나타낼 때는 선과거를 사용합니다." }
];

export default function PreteriteImperfectDetail() {
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
    <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto px-6 lg:px-8 py-8 font-sans text-slate-900 bg-white">
      
      <article className="flex-1 min-w-0">
          <header className="mb-8 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 tracking-widest mb-2">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 23</span>
                <ChevronRight size={10} />
                <span>Intermediate Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              직설법 선과거
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               과거의 지속적인 상태, 습관, 혹은 어떤 사건의 배경을 설명할 때 사용합니다. <br/>
               동작의 완료보다는 <strong>지속성(Line)</strong>에 초점을 맞추는 시제입니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-900">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-bold text-slate-700">
                  <li><strong>형태</strong>: 1인칭 단수(yo)와 3인칭 단수(él/ella)의 형태가 항상 동일합니다.</li>
                  <li><strong>불규칙</strong>: ser, ir, ver 단 3개만 존재하여 규칙성이 매우 강합니다.</li>
                  <li><strong>용법</strong>: 과거의 습관(~하곤 했다), 진행 중인 배경(~하고 있었다)을 표현합니다.</li>
              </ul>
          </div>

          {/* 1. 선과거의 개념 */}
          <section id="sec-1" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 선과거의 개념과 용법
            </h2>
            <div className="grid grid-cols-1 gap-4">
                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm hover:border-amber-200 transition-colors">
                    <span className="block font-bold text-slate-900 mb-2 text-lg">1. 과거의 습관 및 반복</span>
                    <p className="text-[15px] text-slate-600 mb-3 leading-relaxed">
                        과거에 정기적으로 반복되던 <strong>습관이나 일상</strong>을 말할 때 씁니다. (~하곤 했다)
                    </p>
                    <div className="bg-slate-50 px-4 py-3 rounded-lg border border-slate-200/60 flex flex-wrap items-center gap-2">
                        <span className="font-bold text-slate-800 italic text-[15px]">Jugaba al fútbol cada domingo.</span>
                        <span className="text-slate-400 text-sm">(나는 매주 일요일마다 축구를 하곤 했다)</span>
                    </div>
                </div>
                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm hover:border-amber-200 transition-colors">
                    <span className="block font-bold text-slate-900 mb-2 text-lg">2. 진행 중인 배경 설명</span>
                    <p className="text-[15px] text-slate-600 mb-3 leading-relaxed">
                        어떤 사건이 일어났을 때 <strong>진행 중이던 배경</strong>이나 상황을 묘사합니다. (~하고 있었다)
                    </p>
                    <div className="bg-slate-50 px-4 py-3 rounded-lg border border-slate-200/60 flex flex-wrap items-center gap-2">
                        <span className="font-bold text-slate-800 italic text-[15px]">Leía un libro cuando llamó.</span>
                        <span className="text-slate-400 text-sm">(그가 전화했을 때 나는 책을 읽고 있었다)</span>
                    </div>
                </div>
                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm hover:border-amber-200 transition-colors">
                    <span className="block font-bold text-slate-900 mb-2 text-lg">3. 과거의 상태 및 묘사</span>
                    <p className="text-[15px] text-slate-600 mb-3 leading-relaxed">
                        과거 인물의 외모, 성격, 날씨, 시간 등 <strong>지속적인 상태</strong>를 설명합니다.
                    </p>
                    <div className="flex flex-col gap-2">
                        <div className="bg-slate-50 px-4 py-2.5 rounded-lg border border-slate-200/60 flex flex-wrap items-center gap-2">
                            <span className="font-bold text-slate-800 italic text-[15px]">La casa era grande.</span>
                            <span className="text-slate-400 text-sm">(집이 컸다)</span>
                        </div>
                        <div className="bg-slate-50 px-4 py-2.5 rounded-lg border border-slate-200/60 flex flex-wrap items-center gap-2">
                            <span className="font-bold text-slate-800 italic text-[15px]">Eran las 세.</span>
                            <span className="text-slate-400 text-sm">(3시였다)</span>
                        </div>
                    </div>
                </div>
            </div>
          </section>

          {/* 2. 규칙 변화 */}
          <section id="sec-2" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 규칙 변화 (conjugación regular)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4 font-medium">-ar은 -aba, -er/-ir은 -ía 계열의 어미를 사용합니다.</p>
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
                                <td className="px-5 py-4 font-bold text-slate-500 bg-slate-50/30 border-r border-slate-100 text-center whitespace-nowrap">
                                    {row.p} { (i === 0 || i === 2) && <span className="text-[10px] ml-1 font-normal">(동일)</span> }
                                </td>
                                <td className="px-5 py-4 font-medium text-slate-900 border-r border-slate-100 whitespace-nowrap text-lg">
                                    habl<span className="text-blue-600 font-black">{row.ar}</span>
                                </td>
                                <td className="px-5 py-4 font-medium text-slate-900 border-r border-slate-100 whitespace-nowrap text-lg">
                                    com<span className="text-blue-600 font-black">{row.er}</span>
                                </td>
                                <td className="px-5 py-4 font-medium text-slate-900 whitespace-nowrap text-lg">
                                    viv<span className="text-blue-600 font-black">{row.ir}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 3. 불규칙 동사 */}
          <section id="sec-3" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 불규칙 동사 (verbos irregulares)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4 font-medium">선과거 시제에는 단 3가지 불규칙 동사만 존재합니다.</p>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-900 font-extrabold border-b border-slate-200 text-[15px]">
                        <tr>
                            <th className="px-5 py-3 w-1/4 whitespace-nowrap">주어</th>
                            <th className="px-5 py-3 w-1/4 whitespace-nowrap">ser (이었다)</th>
                            <th className="px-5 py-3 w-1/4 whitespace-nowrap">ir (가곤 했다)</th>
                            <th className="px-5 py-3 w-1/4 whitespace-nowrap">ver (보곤 했다)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {IRREGULAR_CONJ.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                <td className="px-5 py-4 font-bold text-slate-500 bg-slate-50/30 border-r border-slate-100 text-center whitespace-nowrap">{row.p}</td>
                                <td className="px-5 py-4 font-black text-slate-900 border-r border-slate-100 whitespace-nowrap text-lg">{row.ser}</td>
                                <td className="px-5 py-4 font-black text-slate-900 border-r border-slate-100 whitespace-nowrap text-lg">{row.ir}</td>
                                <td className="px-5 py-4 font-black text-slate-900 whitespace-nowrap text-lg">{row.ver}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 4. 점과거 vs 선과거 */}
          <section id="sec-4" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">4.</span> 점과거와 선과거의 비교
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm flex flex-col items-center text-center">
                    <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold mb-3 shadow-md">Dot</div>
                    <h4 className="font-extrabold text-indigo-900 mb-1">점과거 (점)</h4>
                    <p className="text-[15px] text-slate-600 mb-3">완료된 특정 사건</p>
                    <div className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 font-bold text-slate-800 text-sm">
                        Ayer fui.
                    </div>
                </div>
                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm flex flex-col items-center text-center">
                    <div className="w-16 h-2 bg-amber-400 rounded-full mb-11 mt-4 opacity-60"></div>
                    <h4 className="font-extrabold text-amber-700 mb-1">선과거 (선)</h4>
                    <p className="text-[15px] text-slate-600 mb-3">지속적 배경/습관</p>
                    <div className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 font-bold text-slate-800 text-sm">
                        Antes iba.
                    </div>
                </div>
            </div>
          </section>

          {/* 5. 자주 쓰는 표현 */}
          <section id="sec-5" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">5.</span> 자주 쓰는 표현들
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    { word: 'Siempre', mean: '항상', ex: 'Siempre jugaba al fútbol.', ko: '나는 항상 축구를 하곤 했다.' },
                    { word: 'Antes', mean: '예전에', ex: 'Antes vivía en Seúl.', ko: '전에는 서울에 살았었다.' },
                    { word: 'Mientras', mean: '~하는 동안', ex: 'Mientras ella leía, yo cocinaba.', ko: '그녀가 읽는 동안, 나는 요리하고 있었다.' },
                    { word: 'Todos los días', mean: '매일', ex: 'Estudiaba todos los días.', ko: '나는 매일 공부하곤 했다.' },
                    { word: 'Cuando era niño', mean: '어렸을 때', ex: 'Cuando era niño, tenía un perro.', ko: '어렸을 때 나는 개를 한 마리 키웠다.' },
                    { word: 'A menudo', mean: '종종', ex: 'A menudo íbamos al cine.', ko: '우리는 종종 영화관에 가곤 했다.' }
                ].map((item, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 p-4 rounded-xl shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-slate-900 font-black text-lg">{item.word}</span>
                            <span className="text-slate-500 text-sm font-bold">({item.mean})</span>
                        </div>
                        <p className="text-[15px] text-slate-800 italic mb-1">{item.ex}</p>
                        <p className="text-xs text-slate-500">{item.ko}</p>
                    </div>
                ))}
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
                {['선과거 개념', '규칙 변화', '불규칙 동사', '시제 비교', '자주 쓰는 표현', '연습 문제'].map((item, i) => (
                    <li key={i}>
                        <button onClick={() => scrollTo(`sec-${i+1}`)} className="text-slate-500 hover:text-slate-900 transition-colors text-left flex items-center gap-2 group font-medium">
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