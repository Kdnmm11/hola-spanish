'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, ArrowRight, AlertTriangle, Info, Lightbulb
} from 'lucide-react';

const ARTICLE_TABLE = [
    { type: '정관사', gender: '남성', sg: 'el', pl: 'los', mean: "영어의 'the' (특정)" },
    { type: '정관사', gender: '여성', sg: 'la', pl: 'las', mean: "" },
    { type: '부정관사', gender: '남성', sg: 'un', pl: 'unos', mean: "영어의 'a/an' (막연)" },
    { type: '부정관사', gender: '여성', sg: 'una', pl: 'unas', mean: "복수형은 '약간의'" }
];

const COMPARISON_DATA = [
    { cond: '대상의 인지', def: "너와 내가 아는 '그것'", indef: "막연한 '어떤 것' 하나" },
    { cond: '존재 표현', def: 'estar + 정관사 (위치)', indef: 'hay + 부정관사 (존재)' },
    { cond: '신체/소유', def: '항상 정관사 사용', indef: '거의 사용하지 않음' },
    { cond: '직업 수식', def: '특정 인물 지칭 시', indef: '형용사가 수식할 때' }
];

const QUIZ_DATA = [
    { id: 1, q: "차 열쇠를 찾을 때 (특정): ¿dónde está ( ) llave?", options: ['la', 'una'], answer: 0, explain: "화자와 청자가 모두 알고 있는 특정한 대상을 물을 때는 정관사 la를 씁니다." },
    { id: 2, q: "hay 동사 뒤에 올 수 없는 형태는?", options: ['un libro', 'el libro'], answer: 1, explain: "hay는 막연한 존재를 처음 밝힐 때 쓰므로 정관사(el)와 함께 쓸 수 없습니다." },
    { id: 3, q: "'a + el'의 올바른 축약형은?", options: ['ael', 'al'], answer: 1, explain: "전치사 a와 남성 정관사 el이 만나면 항상 al로 축약됩니다." },
    { id: 4, q: "부정관사 복수형 'unos / unas'의 주된 의미는?", options: ['그것들', '약간의 / 대략', '모든'], answer: 1, explain: "부정관사의 복수형은 '약간의' 또는 숫자 앞에서 '대략'이라는 의미를 가집니다." }
];

export default function ArticlesDetail() {
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
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 5</span>
                <ChevronRight size={10} />
                <span>Basic Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              관사 (Artículos)
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               명사의 성과 수에 따라 형태가 결정되며, 대상의 특정 여부에 따라 정관사와 부정관사로 나뉩니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium">
                  <li><strong>정관사(el/la)</strong>: 특정한 대상, 이미 언급된 것, 유일한 것에 사용합니다.</li>
                  <li><strong>부정관사(un/una)</strong>: 막연한 하나, 처음 언급하는 것에 사용합니다.</li>
                  <li><strong>축약</strong>: a + el = <strong>al</strong> / de + el = <strong>del</strong> (남성 단수만 해당)</li>
              </ul>
          </div>

          {/* 1. 관사의 체계 */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 관사의 체계 및 분류
            </h2>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm w-full">
                <table className="w-full text-[15px] text-left border-collapse min-w-[500px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm">
                        <tr>
                            <th className="px-5 py-3 w-32 border-r border-slate-100 whitespace-nowrap text-center">구분</th>
                            <th className="px-5 py-3 w-24 whitespace-nowrap">성별</th>
                            <th className="px-5 py-3 w-20 text-center whitespace-nowrap">단수</th>
                            <th className="px-5 py-3 w-20 text-center border-r border-slate-100 whitespace-nowrap">복수</th>
                            <th className="px-5 py-3 text-right pr-8 whitespace-nowrap">의미 / 특징</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {ARTICLE_TABLE.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                {i % 2 === 0 && (
                                    <td rowSpan={2} className="px-5 py-4 font-black text-slate-900 bg-slate-50/30 border-r border-slate-100 align-middle text-center tracking-tight text-xs whitespace-nowrap">
                                        {row.type}
                                    </td>
                                )}
                                <td className="px-5 py-4 text-slate-600 font-medium whitespace-nowrap">{row.gender}</td>
                                <td className="px-5 py-4 font-bold text-blue-600 text-center whitespace-nowrap">{row.sg}</td>
                                <td className="px-5 py-4 font-bold text-blue-600 text-center border-r border-slate-100 whitespace-nowrap">{row.pl}</td>
                                <td className="px-5 py-4 text-right pr-8 text-slate-500 text-[13px] whitespace-nowrap font-medium">{row.mean}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 2. 상세 정리 */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 관사별 상세 용법
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
                {/* Definite */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-800 tracking-widest pl-3 border-l-4 border-blue-400">정관사 (definidos)</h3>
                    <div className="space-y-4">
                        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                            <p className="text-sm font-bold text-slate-800 mb-2">이미 언급된 대상</p>
                            <p className="text-[15px] text-slate-900 font-bold">el libro es bueno.</p>
                            <p className="text-xs text-slate-400 mt-1">그 책은 좋다.</p>
                        </div>
                        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                            <p className="text-sm font-bold text-slate-800 mb-2">신체 부위 (소유형용사 대신)</p>
                            <p className="text-[15px] text-slate-900 font-bold">me duele la espalda.</p>
                            <p className="text-xs text-slate-400 mt-1">등이 아프다.</p>
                        </div>
                    </div>
                </div>

                {/* Indefinite */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-800 tracking-widest pl-3 border-l-4 border-indigo-400">부정관사 (indefinidos)</h3>
                    <div className="space-y-4">
                        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                            <p className="text-sm font-bold text-slate-800 mb-2">처음 등장하는 정보</p>
                            <p className="text-[15px] text-slate-900 font-bold">veo una casa.</p>
                            <p className="text-xs text-slate-400 mt-1">집이 한 채 보인다.</p>
                        </div>
                        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                            <p className="text-sm font-bold text-slate-800 mb-2">수량/대략 강조</p>
                            <p className="text-[15px] text-slate-900 font-bold">unos 20 euros.</p>
                            <p className="text-xs text-slate-400 mt-1">대략 20유로.</p>
                        </div>
                    </div>
                </div>
            </div>
          </section>

          {/* 3. 비교 */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 주요 차이점 비교
            </h2>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] border-collapse text-left min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm">
                        <tr>
                            <th className="px-5 py-3 w-1/4 border-r border-slate-100 whitespace-nowrap">상황</th>
                            <th className="px-5 py-3 w-1/3 border-r border-slate-100 font-bold text-blue-700 whitespace-nowrap">정관사 (el/la)</th>
                            <th className="px-5 py-3 font-bold text-indigo-700 whitespace-nowrap">부정관사 (un/una)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {COMPARISON_DATA.map((r, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100 whitespace-nowrap">{r.cond}</td>
                                <td className="px-5 py-4 text-slate-700 border-r border-slate-100 font-medium whitespace-nowrap">{r.def}</td>
                                <td className="px-5 py-4 text-slate-700 font-medium whitespace-nowrap">{r.indef}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 4. 예외 */}
          <section id="sec-4" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">4.</span> 예외 및 주의사항
            </h2>
            <div className="space-y-4">
                <div className="p-5 bg-yellow-50 border border-yellow-200 rounded-xl shadow-sm text-yellow-900">
                    <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                        <AlertTriangle size={16}/> 여성 명사 앞의 'el'
                    </h4>
                    <p className="text-[14px] leading-relaxed font-medium">
                        강세 있는 <strong>a- / ha-</strong>로 시작하는 여성 단수 명사는 발음상 <strong>el</strong>을 씁니다. <br/>
                        <span className="inline-block mt-2 bg-white px-3 py-1 rounded-lg border border-yellow-100 font-bold text-slate-900">
                            <span className="text-blue-600">el</span> agua, <span className="text-blue-600">el</span> hambre
                        </span>
                    </p>
                </div>
                
                <div className="p-6 bg-slate-50 border border-slate-100 rounded-xl shadow-sm text-slate-700">
                    <h4 className="font-bold text-sm mb-4 flex items-center gap-2">
                        <Info size={16} className="text-slate-400" /> 관사의 축약 및 생략
                    </h4>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] items-baseline gap-4 text-[15px]">
                            <span className="font-bold text-slate-400 text-xs tracking-wider">축약 규칙</span>
                            <div className="flex gap-8 font-medium">
                                <p>a + el = <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">al</span></p>
                                <p>de + el = <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">del</span></p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] items-baseline gap-4 text-[15px]">
                            <span className="font-bold text-slate-400 text-xs tracking-wider">생략 원칙</span>
                            <p className="font-medium whitespace-nowrap">
                                직업(soy médico), 국적, 언어 등에는 관사를 쓰지 않는 것이 원칙입니다.
                            </p>
                        </div>
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

      <aside className="hidden lg:block w-56 shrink-0">
        <div className="sticky top-8 border-l border-slate-100 pl-6">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">On this page</h4>
            <ul className="space-y-3 text-[13px]">
                {['관사의 체계', '상세 용법', '주요 차이점', '주의사항', '연습 문제'].map((item, i) => (
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