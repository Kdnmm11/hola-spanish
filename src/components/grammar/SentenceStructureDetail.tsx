'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, ArrowRight, Info, AlertTriangle, Lightbulb
} from 'lucide-react';

const STRUCTURE_DATA = [
    { part: '주어 (s)', trait: '인칭대명사나 명사. 자주 생략됨', ex: { s: 'Juan', v: 'estudia', o: null, kr: '후안은 공부한다.' } },
    { part: '동사 (v)', trait: '주어에 맞춰 변화함 (문장의 중심)', ex: { s: 'Ana', v: 'come', o: null, kr: '아나는 먹는다.' } },
    { part: '목적어 (o)', trait: '직접/간접 목적어 존재', ex: { s: 'Juan', v: 'estudia', o: 'español', kr: '후안은 스페인어를 공부한다.' } }
];

const SUBJECT_USAGE = [
    { cond: '강조', reason: "다른 사람이 아닌 '나'임을 강조할 때", ex: 'Yo lo sé. (다른 아닌 내가 안다.)' },
    { cond: '대조', reason: '두 사람의 행동을 비교할 때', ex: 'Yo leo, tú escribes. (난 읽고, 넌 쓴다.)' },
    { cond: '명확성', reason: '3인칭(그, 그녀, 당신) 중 누구인지 알릴 때', ex: 'Ella es coreana. (그녀는 한국인이다.)' }
];

const ORDER_DATA = [
    { type: '평서문', rule: '주어 + 동사 + 목적어 (일반적)', ex: { s: 'Ana', v: 'come', o: 'una manzana', kr: '아나는 사과를 먹는다.' } },
    { type: '의문문', rule: '동사 + 주어 (도치 발생)', ex: { v: '¿Come', s: 'Ana', o: 'una manzana?', kr: '아나는 사과를 먹니?' } },
    { type: '강조문', rule: '강조 대상이 문두로 이동', ex: { o: 'Una manzana', v: 'come', s: 'Ana', kr: '사과를 아나는 먹는다.' } }
];

const QUIZ_DATA = [
    { id: 1, q: "다음 중 주어가 생략된 문장은 무엇인가요?", options: ['Ella vive en Madrid.', 'Vivo en Madrid.'], answer: 1, explain: "'vivo' 형태만으로도 주어가 'yo'임을 알 수 있어 생략되었습니다." },
    { id: 2, q: "'¿Vives tú aquí?' 문장에서 주어는 무엇인가요?", options: ['vives', 'tú', 'aquí'], answer: 1, explain: "동사 뒤에 위치한 'tú'가 이 문장의 주어입니다." },
    { id: 3, q: "Juan이 노래하는지 묻는 올바른 의문문은?", options: ['¿Juan canta?', '¿Canta Juan?'], answer: 1, explain: "스페인어 의문문에서는 일반적으로 동사+주어 순서로 도치가 일어납니다." },
    { id: 4, q: "다음 문장에서 목적어는? 'Ana come pan.'", options: ['Ana', 'come', 'pan'], answer: 2, explain: "'pan'(빵)이 동사 'come'(먹다)의 대상이 되는 목적어입니다." }
];

// --- SVO Label Component ---
const SVOLabel = ({ text, type }: { text: string; type: 'S' | 'V' | 'O' }) => {
    const colors = {
        S: 'border-blue-400 text-blue-500',
        V: 'border-red-400 text-red-500',
        O: 'border-green-400 text-green-500'
    };
    return (
        <span className="relative inline-block mx-1">
            <span className={`border-b-2 pb-0.5 font-bold text-slate-800 ${colors[type].split(' ')[0]}`}>{text}</span>
            <span className={`absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-black ${colors[type].split(' ')[1]}`}>{type}</span>
        </span>
    );
};

export default function SentenceStructureDetail() {
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
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 2</span>
                <ChevronRight size={10} />
                <span>Basic Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              문장의 기본 구조와 어순
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               스페인어 문장은 기본 어순이 존재하지만, 동사 형태가 주어 정보를 담고 있어 <br/>
               생략과 어순 변화가 매우 자유로운 것이 특징입니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] text-slate-700 list-disc list-inside leading-relaxed font-medium">
                  <li>기본 구조는 <strong>주어 + 동사 (+ 목적어)</strong>입니다.</li>
                  <li>동사만 봐도 주어를 알 수 있어 <strong>주어 생략</strong>이 매우 흔합니다.</li>
                  <li>부정문은 동사 앞에 <strong>no</strong>를 붙이면 됩니다.</li>
              </ul>
          </div>

          {/* 1. 문장의 기본 구조 */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 문장의 기본 구조
            </h2>
            <p className="text-[15px] text-slate-700 mb-6 font-medium">문장의 핵심은 동사입니다. 동사 하나만으로도 완전한 문장이 성립할 수 있습니다.</p>
            
            <div className="space-y-8">
                <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                    <table className="w-full text-[15px] text-left border-collapse min-w-[500px]">
                        <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs tracking-wide">
                            <tr>
                                <th className="px-5 py-3 w-28 text-center border-r border-slate-100 whitespace-nowrap">성분</th>
                                <th className="px-5 py-3 w-1/3 border-r border-slate-100 whitespace-nowrap">특징</th>
                                <th className="px-5 py-3 text-center whitespace-nowrap">예시</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white text-[14px]">
                            {STRUCTURE_DATA.map((row, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-5 py-4 font-black text-slate-900 bg-slate-50/30 border-r border-slate-100 text-center whitespace-nowrap">{row.part}</td>
                                    <td className="px-5 py-4 text-slate-600 border-r border-slate-100 font-medium whitespace-nowrap">{row.trait}</td>
                                    <td className="px-5 py-6 text-center whitespace-nowrap">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="text-lg">
                                                {row.ex.s && <SVOLabel text={row.ex.s} type="S" />}
                                                {row.ex.v && <SVOLabel text={row.ex.v} type="V" />}
                                                {row.ex.o && <SVOLabel text={row.ex.o} type="O" />}
                                            </div>
                                            <span className="text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">{row.ex.kr}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-7 shadow-sm">
                    <h3 className="text-base font-bold text-slate-800 mb-6 border-l-4 border-blue-200 pl-3">기본 구조 예시 (S + V + O)</h3>
                    <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="text-2xl mb-4 flex items-baseline gap-2">
                            <SVOLabel text="Yo" type="S" />
                            <SVOLabel text="estudio" type="V" />
                            <SVOLabel text="español" type="O" />
                        </div>
                        <span className="text-slate-500 text-sm font-medium">나는 스페인어를 공부한다</span>
                    </div>
                </div>
            </div>
          </section>

          {/* 2. 주어와 생략 */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 주어와 생략 (el sujeto)
            </h2>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 mb-8 shadow-sm">
                <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2 font-black tracking-tight text-slate-400">
                    <Info size={16} /> 주어를 생략하는 이유
                </h3>
                <p className="text-[15px] text-slate-600 leading-relaxed font-medium mb-4">
                    스페인어 동사 어미는 주어 정보를 담고 있습니다. 굳이 주어를 쓰지 않는 것이 더 자연스럽습니다.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[14px]">
                    <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-lg">Como</span> 
                        <span className="text-slate-800 font-bold text-base bg-indigo-50 px-3 py-1.5 rounded">
                            <span className="text-red-600">내</span>가 먹는다
                        </span>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-lg">Comes</span>
                        <span className="text-slate-800 font-bold text-base bg-indigo-50 px-3 py-1.5 rounded">
                            <span className="text-red-600">네</span>가 먹는다
                        </span>
                    </div>
                </div>
            </div>

            <h3 className="text-[13px] font-black text-slate-400 mb-3 tracking-widest pl-2 border-l-2 border-slate-200">
                주어를 반드시 써야 하는 경우
            </h3>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] border-collapse min-w-[500px]">
                    <thead className="bg-slate-50 text-slate-600 text-[11px] font-bold border-b border-slate-200">
                        <tr>
                            <th className="px-5 py-3 text-center w-24 whitespace-nowrap">조건</th>
                            <th className="px-5 py-3 text-left w-1/3 whitespace-nowrap">이유</th>
                            <th className="px-5 py-3 text-right pr-8 whitespace-nowrap">예시</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white text-[14px]">
                        {SUBJECT_USAGE.map((r, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100 text-center whitespace-nowrap">{r.cond}</td>
                                <td className="px-5 py-4 text-slate-600 font-medium whitespace-nowrap">{r.reason}</td>
                                <td className="px-5 py-4 text-right pr-8 whitespace-nowrap">
                                    <div className="flex flex-col items-end">
                                        <span className="text-slate-900 font-bold">{r.ex.split('(')[0]}</span>
                                        <span className="text-xs text-slate-400 mt-0.5">{r.ex.split('(')[1]?.replace(')', '') || ''}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 3. 어순과 강조 */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
             <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 어순과 강조 (orden y énfasis)
            </h2>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm mb-6">
                <table className="w-full text-[15px] border-collapse text-left min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-[11px] tracking-wide">
                        <tr>
                            <th className="px-5 py-3 w-24 text-center border-r border-slate-100 whitespace-nowrap">유형</th>
                            <th className="px-5 py-3 w-1/3 border-r border-slate-100 whitespace-nowrap">규칙</th>
                            <th className="px-5 py-3 text-center whitespace-nowrap">예시 (s v o)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white text-[14px]">
                        {ORDER_DATA.map((r, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 font-black text-slate-900 bg-slate-50/30 border-r border-slate-100 text-center whitespace-nowrap">{r.type}</td>
                                <td className="px-5 py-4 text-slate-600 border-r border-slate-100 font-medium leading-snug whitespace-nowrap">{r.rule}</td>
                                <td className="px-5 py-8 text-center whitespace-nowrap">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="text-lg flex flex-wrap gap-y-4 gap-x-2 justify-center">
                                            {r.type === '평서문' && <><SVOLabel text={r.ex.s} type="S" /><SVOLabel text={r.ex.v} type="V" /><SVOLabel text={r.ex.o} type="O" /></>}
                                            {r.type === '의문문' && <><SVOLabel text={r.ex.v} type="V" /><SVOLabel text={r.ex.s} type="S" /><SVOLabel text={r.ex.o} type="O" /></>}
                                            {r.type === '강조문' && <><SVOLabel text={r.ex.o} type="O" /><SVOLabel text={r.ex.v} type="V" /><SVOLabel text={r.ex.s} type="S" /></>}
                                        </div>
                                        <span className="text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">{r.ex.kr}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg flex gap-4 text-[14px] text-blue-900 shadow-sm items-start">
                <AlertTriangle size={18} className="text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                    <p className="font-bold mb-1 font-black text-xs tracking-tight text-blue-400">문장 부호 주의사항</p>
                    <p className="opacity-90 leading-relaxed font-medium">
                        의문문과 감탄문은 문장 앞뒤에 쌍으로 부호(¿ ?, ¡ !)를 붙입니다. <br/>
                        예: <strong>¿</strong>Qué hora es<strong>?</strong> (몇 시인가요?) / <strong>¡</strong>Qué bien<strong>!</strong> (정말 좋네요!)
                    </p>
                </div>
            </div>
          </section>

          {/* 4. Quiz */}
          <section id="sec-4" className="scroll-mt-24 pt-8 border-t border-slate-200">
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

      {/* Sidebar */}
      <aside className="hidden lg:block w-56 shrink-0">
        <div className="sticky top-8 border-l border-slate-100 pl-6">
            <h4 className="text-[10px] font-bold text-slate-400 tracking-widest mb-4">On this page</h4>
            <ul className="space-y-3 text-[13px]">
                {['기본 구조', '주어와 생략', '어순과 강조', '연습 문제'].map((item, i) => (
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