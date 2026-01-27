'use client';

import React, { useState } from 'react';
import { 
  Volume2, Check, X, AlertTriangle, BookOpen, ChevronRight, Bookmark, ArrowRight, Lightbulb
} from 'lucide-react';

// --- Data Constants ---
const VOWELS = [
  { char: 'a', sound: '아', ex: 'casa (집)' },
  { char: 'e', sound: '에', ex: 'mesa (책상)' },
  { char: 'i', sound: '이', ex: 'vino (와인)' },
  { char: 'o', sound: '오', ex: 'loco (미친)' },
  { char: 'u', sound: '우', ex: 'uno (하나)' }
];

const RULE_C = [
    { cond: 'a, o, u 앞에서', sound: '[k] 까, 꼬, 꾸', ex: 'casa, cosa, cultura' },
    { cond: 'e, i 앞에서', sound: '[θ] 쎄, 씨 (스페인) / [s] (중남미)', ex: 'cero, cine' }
];

const RULE_G = [
    { cond: 'a, o, u 앞에서', sound: '[g] 가, 고, 구', ex: 'gato, goma, gusto' },
    { cond: 'e, i 앞에서', sound: '[x] 헤, 히 (거친 소리)', ex: 'gente, girar' }
];

const RULE_GU_QU = [
    { combo: 'gue, gui', u_sound: 'x (묵음)', result: '[ge] 게, [gi] 기', ex: 'guerra, guitarra' },
    { combo: 'güe, güi', u_sound: 'o (발음)', result: '[gwe] 구에, [gwi] 구이', ex: 'pingüino, bilingüe' },
    { combo: 'que, qui', u_sound: 'x (묵음)', result: '[ke] 께, [ki] 끼', ex: 'queso, quiero' }
];

const ACCENT_RULES = [
    { id: 1, cond: '모음(a,e,i,o,u)이나 n, s로 끝남', pos: '뒤에서 두 번째 음절', ex: <span>ca<b className="text-red-600">mi</b>sa, <b className="text-red-600">ha</b>blan, <b className="text-red-600">lu</b>nes</span> },
    { id: 2, cond: '그 외 자음으로 끝남', pos: '마지막 음절', ex: <span>doc<b className="text-red-600">tor</b>, pa<b className="text-red-600">pel</b>, ma<b className="text-red-600">drid</b></span> },
    { id: 3, cond: '강세 부호(tilde)가 있는 경우', pos: '부호가 있는 위치', ex: <span>pa<b className="text-red-600">pá</b>, ja<b className="text-red-600">món</b>, <b className="text-red-600">mú</b>sica</span> }
];

const QUIZ_DATA = [
    { id: 1, q: "'gente'의 g 발음은?", options: ['[g] 게', '[x] 헤'], answer: 1, explain: "e, i 앞의 g는 목을 긁는 거친 [x] 소리(ㅎ)가 납니다." },
    { id: 2, q: "'guerra'에서 u는 발음하나요?", options: ['예', '아니오'], answer: 1, explain: "gue, gui, que, qui 조합에서 u는 발음하지 않는 묵음입니다. [게라]" },
    { id: 3, q: "다음 중 강세 위치가 '마지막' 음절인 단어는?", options: ['casa', 'lunes', 'papel'], answer: 2, explain: "'papel'은 자음 l로 끝나므로 마지막 음절(pel)에 강세가 옵니다. 나머지는 모음/s로 끝나 뒤에서 두 번째입니다." },
    { id: 4, q: "다음 중 'que'의 올바른 발음은?", options: ['꾸에', '께', '쿠에'], answer: 1, explain: "que에서 u는 묵음이며, e는 '에' 소리가 나므로 [ke] '께'로 발음합니다." }
];

export default function PronunciationDetail() {
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
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 1</span>
                <ChevronRight size={10} />
                <span>Basic Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              발음과 철자, 그리고 강세
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               스페인어는 철자와 발음의 대응 관계가 분명한 언어입니다. 기본 규칙을 이해하시면 처음 보는 단어도 소리로 읽을 수 있습니다.
            </p>
          </header>

          {/* Key Summary */}
          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] text-slate-700 list-disc list-inside leading-relaxed font-medium">
                  <li><strong>모음</strong>: 5개(a,e,i,o,u)는 항상 일정하게 발음됩니다.</li>
                  <li><strong>자음</strong>: c, g는 뒤에 오는 모음에 따라 소리가 변합니다. h는 묵음입니다.</li>
                  <li><strong>강세</strong>: 모음/n/s로 끝나면 뒤에서 2번째, 그 외 자음은 마지막 음절에 강세가 옵니다.</li>
              </ul>
          </div>

          {/* 1. Vowels */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 모음 (Vocales)
            </h2>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm w-full">
                <table className="w-full text-lg text-left border-collapse table-fixed min-w-[500px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm uppercase tracking-wide">
                        <tr>
                            <th className="px-4 py-4 w-1/3 text-center border-r border-slate-100 whitespace-nowrap">모음</th>
                            <th className="px-4 py-4 w-1/3 text-center border-r border-slate-100 whitespace-nowrap">발음</th>
                            <th className="px-4 py-4 w-1/3 text-center whitespace-nowrap">예시</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {VOWELS.map((v, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-4 py-4 font-black text-2xl text-blue-700 text-center border-r border-slate-100 whitespace-nowrap">{v.char}</td>
                                <td className="px-4 py-4 font-bold text-slate-800 text-center border-r border-slate-100 whitespace-nowrap">{v.sound}</td>
                                <td className="px-4 py-4 text-center whitespace-nowrap">
                                    <div className="flex flex-col items-center">
                                        <span className="font-bold text-slate-900">{v.ex.split('(')[0]}</span>
                                        <span className="text-xs text-slate-400">({v.ex.split('(')[1]}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 2. Consonants */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 자음 변이 규칙
            </h2>

            {/* Rule C */}
            <div className="mb-8">
                <h3 className="text-[13px] font-black text-slate-400 mb-3 uppercase tracking-widest pl-2 border-l-2 border-slate-200">
                    c 발음 규칙
                </h3>
                <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                    <table className="w-full text-[15px] border-collapse min-w-[500px]">
                        <thead className="bg-slate-50 text-slate-600 text-[11px] font-bold border-b border-slate-200">
                            <tr>
                                <th className="px-5 py-2 text-left w-1/3 whitespace-nowrap">조건</th>
                                <th className="px-5 py-2 text-left w-1/3 text-slate-800 whitespace-nowrap">발음</th>
                                <th className="px-5 py-2 text-right pr-8 whitespace-nowrap">예시</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {RULE_C.map((r, i) => (
                                <tr key={i} className="hover:bg-slate-50/50">
                                    <td className="px-5 py-4 text-slate-600 font-medium bg-slate-50/30 whitespace-nowrap">{r.cond}</td>
                                    <td className="px-5 py-4 font-bold text-slate-800 whitespace-nowrap">{r.sound}</td>
                                    <td className="px-5 py-4 text-right pr-8 whitespace-nowrap">
                                        <span className="text-slate-900 font-medium">{r.ex}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Rule G */}
            <div className="mb-8">
                <h3 className="text-[13px] font-black text-slate-400 mb-3 uppercase tracking-widest pl-2 border-l-2 border-slate-200">
                    g 발음 규칙
                </h3>
                <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                    <table className="w-full text-[15px] border-collapse min-w-[500px]">
                        <thead className="bg-slate-50 text-slate-600 text-[11px] font-bold border-b border-slate-200">
                            <tr>
                                <th className="px-5 py-2 text-left w-1/3 whitespace-nowrap">조건</th>
                                <th className="px-5 py-2 text-left w-1/3 text-slate-800 whitespace-nowrap">발음</th>
                                <th className="px-5 py-2 text-right pr-8 whitespace-nowrap">예시</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {RULE_G.map((r, i) => (
                                <tr key={i} className="hover:bg-slate-50/50">
                                    <td className="px-5 py-4 text-slate-600 font-medium bg-slate-50/30 whitespace-nowrap">{r.cond}</td>
                                    <td className="px-5 py-4 font-bold text-slate-800 whitespace-nowrap">{r.sound}</td>
                                    <td className="px-5 py-4 text-right pr-8 whitespace-nowrap">
                                        <span className="text-slate-900 font-medium">{r.ex}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Rule GU/QU */}
            <div className="mb-8">
                <h3 className="text-[13px] font-black text-slate-400 mb-3 uppercase tracking-widest pl-2 border-l-2 border-slate-200">
                    gu / qu 규칙 (u 발음 여부)
                </h3>
                <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                    <table className="w-full text-[15px] border-collapse min-w-[500px]">
                        <thead className="bg-slate-50 text-slate-600 text-[11px] font-bold border-b border-slate-200">
                            <tr>
                                <th className="px-5 py-2 text-left w-24 whitespace-nowrap">조합</th>
                                <th className="px-5 py-2 text-left w-24 text-slate-800 whitespace-nowrap">U 발음</th>
                                <th className="px-5 py-2 text-left whitespace-nowrap">결과</th>
                                <th className="px-5 py-2 text-right pr-8 whitespace-nowrap">예시</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {RULE_GU_QU.map((r, i) => (
                                <tr key={i} className="hover:bg-slate-50/50">
                                    <td className="px-5 py-4 font-black text-slate-900 bg-slate-50/30 border-r border-slate-100 w-20 text-center align-top whitespace-nowrap">{r.combo}</td>
                                    <td className="px-5 py-4 text-slate-500 font-medium align-top whitespace-nowrap">{r.u_sound}</td>
                                    <td className="px-5 py-4 font-bold text-slate-800 align-top whitespace-nowrap">{r.result}</td>
                                    <td className="px-5 py-4 text-right pr-8 text-slate-900 font-medium align-top whitespace-nowrap">{r.ex}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
          </section>

          {/* 3. Accents */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
             <h2 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 강세 규칙 (Acentos)
            </h2>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-left border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 w-16 text-center whitespace-nowrap">규칙</th>
                            <th className="px-5 py-3 whitespace-nowrap">조건</th>
                            <th className="px-5 py-3 text-slate-800 whitespace-nowrap">강세 위치</th>
                            <th className="px-5 py-3 text-right pr-8 whitespace-nowrap">예시</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {ACCENT_RULES.map((rule, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 text-center font-bold text-slate-400 bg-slate-50/30 border-r border-slate-100 whitespace-nowrap">#{rule.id}</td>
                                <td className="px-5 py-4 text-slate-700 font-medium whitespace-nowrap">{rule.cond}</td>
                                <td className="px-5 py-4 font-bold text-indigo-700 whitespace-nowrap">{rule.pos}</td>
                                <td className="px-5 py-4 text-right pr-8 text-slate-900 font-medium whitespace-nowrap">{rule.ex}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
                            <p className="font-bold text-slate-800 text-base leading-snug">{q.q}</p>
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
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">On this page</h4>
            <ul className="space-y-3 text-[13px]">
                {['모음', '자음 규칙', '강세 규칙', '연습 문제'].map((item, i) => (
                    <li key={i}>
                        <button onClick={() => scrollTo(`sec-${i+1}`)} className="text-slate-500 hover:text-blue-600 transition-colors text-left flex items-center gap-2 group">
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