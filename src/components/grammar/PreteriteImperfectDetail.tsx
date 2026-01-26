'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, CornerDownRight, ArrowRight, Info, AlertTriangle, History, Brush
} from 'lucide-react';

const REGULAR_CONJ = [
    { p: 'yo', ar: 'aba', er_ir: 'ía' },
    { p: 'tú', ar: 'abas', er_ir: 'ías' },
    { p: 'él/ella/ud.', ar: 'aba', er_ir: 'ía' },
    { p: 'nosotros/as', ar: 'ábamos', er_ir: 'íamos' },
    { p: 'vosotros/as', ar: 'abais', er_ir: 'íais' },
    { p: 'ellos/as/uds.', ar: 'aban', er_ir: 'ían' }
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
    { id: 1, q: "빈칸 채우기: Cuando ( ) niño, comía mucho chocolate. (동사: ser)", options: ['fui', 'era', 'soy'], answer: 1, explain: "과거의 지속적인 상태나 신분('어렸을 때')을 나타낼 때는 선과거 era를 씁니다." },
    { id: 2, q: "'Ir(가다)' 동사의 nosotros 선과거 형태는?", options: ['fuimos', 'íbamos', 'ibamos'], answer: 1, explain: "ir의 선과거는 불규칙이며, nosotros 형태에는 강세 부호가 붙어 íbamos가 됩니다." },
    { id: 3, q: "선과거의 특징으로 틀린 것은?", options: ['1인칭과 3인칭 단수 형태가 같다.', '불규칙 동사가 매우 많다.', '-er과 -ir의 어미가 같다.'], answer: 1, explain: "선과거의 불규칙 동사는 ser, ir, ver 단 3개뿐입니다." }
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
    <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto px-6 lg:px-8 py-8 font-sans text-slate-800 bg-white">
      
      <article className="flex-1 min-w-0">
          <header className="mb-8 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 21</span>
                <ChevronRight size={10} />
                <span>Basic Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              직설법 선과거
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               과거의 지속적인 상태, 습관, 혹은 어떤 사건의 배경을 설명할 때 사용합니다. <br/>
               동작의 완료보다는 <strong>지속성(Line)</strong>에 초점을 맞추는 시제입니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium">
                  <li><strong>형태</strong>: 1인칭 단수(yo)와 3인칭 단수(él/ella)의 형태가 항상 동일합니다.</li>
                  <li><strong>불규칙</strong>: ser, ir, ver 단 3개만 존재하여 규칙성이 매우 강합니다.</li>
                  <li><strong>용법</strong>: 과거의 습관(~하곤 했다), 진행 중인 배경(~하고 있었다)을 표현합니다.</li>
              </ul>
          </div>

          {/* 1. 규칙 변화 */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 규칙 변화 (Conjugación Regular)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">-ar은 -aba, -er/-ir은 -ía 계열의 어미를 사용합니다.</p>
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 text-left pl-8 w-1/3">주어</th>
                            <th className="px-5 py-3 w-1/3">-ar (hablar)</th>
                            <th className="px-5 py-3 w-1/3">-er / -ir (comer)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {REGULAR_CONJ.map((row, i) => (
                            <tr key={i} className={`hover:bg-slate-50/50 transition-colors ${i === 0 || i === 2 ? 'bg-slate-50/30' : ''}`}>
                                <td className="px-5 py-4 text-left pl-8 font-bold text-slate-400 text-sm">
                                    {row.p} { (i === 0 || i === 2) && <span className="text-[10px] ml-1 font-normal">(동일)</span> }
                                </td>
                                <td className="px-5 py-4 font-bold text-slate-900 border-x border-slate-50">
                                    habl<span className="text-red-600">{row.ar}</span>
                                </td>
                                <td className="px-5 py-4 font-bold text-slate-900 border-x border-slate-50">
                                    com<span className="text-red-600">{row.er_ir}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 2. 불규칙 동사 */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 불규칙 동사 (Verbos Irregulares)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">선과거 시제에는 아래의 딱 3가지 불규칙 동사만 존재합니다.</p>
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-2 py-3 text-left pl-5">주어</th>
                            <th className="px-2 py-3">ser (이었다)</th>
                            <th className="px-2 py-3">ir (가곤 했다)</th>
                            <th className="px-2 py-3">ver (보곤 했다)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {IRREGULAR_CONJ.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                <td className="px-2 py-4 text-left pl-5 font-bold text-slate-400 text-xs">{row.person || row.p}</td>
                                <td className="px-2 py-4 font-bold text-slate-900">{row.ser}</td>
                                <td className="px-2 py-4 font-bold text-slate-900">{row.ir}</td>
                                <td className="px-2 py-4 font-bold text-slate-900">v<span className="text-red-600">eía</span>{row.ver.slice(3)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 3. 주요 용법 */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 선과거의 주요 용법
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">과거의 단절된 사건이 아닌, 지속되거나 반복되던 상황을 묘사합니다.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {USAGE_CASES.map((item, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                        <h4 className="text-xs font-black text-slate-400 uppercase mb-2 tracking-widest">{item.type}</h4>
                        <div className="flex flex-col gap-1">
                            <span className="text-[15px] font-bold text-slate-900 italic">{item.ex.split('(')[0]}</span>
                            <span className="text-xs text-slate-400">{item.ex.split('(')[1]?.replace(')', '')}</span>
                        </div>
                    </div>
                ))}
            </div>
          </section>

          {/* 4. 점과거 vs 선과거 */}
          <section id="sec-4" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">4.</span> 점과거와 선과거의 비교
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">동작을 점(Dot)으로 보느냐, 선(Line)으로 보느냐의 차이입니다.</p>
            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 text-center">
                    <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-3 text-xs">Dot</div>
                    <h4 className="font-bold text-slate-800 mb-1">점과거 (Ayer fui)</h4>
                    <p className="text-xs text-slate-500">완료된 특정 사건</p>
                </div>
                <ArrowRight className="text-slate-200 hidden md:block" />
                <div className="flex-1 text-center">
                    <div className="w-24 h-2 bg-slate-200 rounded-full mx-auto mb-8 relative">
                        <div className="absolute inset-0 bg-slate-900 rounded-full animate-pulse"></div>
                    </div>
                    <h4 className="font-bold text-slate-800 mb-1">선과거 (Antes iba)</h4>
                    <p className="text-xs text-slate-500">지속적 배경/습관</p>
                </div>
            </div>
          </section>

          {/* 5. 자주 쓰이는 표현 */}
          <section id="sec-5" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">5.</span> 선과거와 자주 쓰이는 표현
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">반복이나 지속을 나타내는 부사구와 찰떡궁합입니다.</p>
            <div className="flex flex-wrap gap-2">
                {['antes', 'siempre', 'mientras', 'cada día', 'a menudo', 'cuando era niño'].map((word, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-sm font-medium text-slate-700">
                        {word}
                    </span>
                ))}
            </div>
          </section>

          {/* 연습 문제 */}
          <section id="sec-6" className="scroll-mt-24 pt-8 border-t border-slate-200">
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
                {['규칙 변화', '불규칙 동사', '선과거 용법', '점과거 비교', '자주 쓰는 표현', '연습 문제'].map((item, i) => (
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