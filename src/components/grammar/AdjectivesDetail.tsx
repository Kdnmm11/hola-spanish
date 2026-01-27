'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, ArrowRight, AlertTriangle, Lightbulb
} from 'lucide-react';

// --- Helper for highlighting endings ---
const ColorEnd = ({ word, type }: { word: string, type: 'm' | 'f' | 'pl' }) => {
    const color = type === 'm' ? 'text-blue-600' : type === 'f' ? 'text-red-600' : 'text-indigo-500';
    
    if (word.endsWith('os')) return <span>{word.slice(0, -2)}<span className={color}>os</span></span>;
    if (word.endsWith('as')) return <span>{word.slice(0, -2)}<span className={color}>as</span></span>;
    if (word.endsWith('es')) return <span>{word.slice(0, -2)}<span className={color}>es</span></span>;
    if (word.endsWith('o')) return <span>{word.slice(0, -1)}<span className={color}>o</span></span>;
    if (word.endsWith('a')) return <span>{word.slice(0, -1)}<span className={color}>a</span></span>;
    if (word.endsWith('e')) return <span>{word.slice(0, -1)}<span className={color}>e</span></span>;
    
    return <span>{word}</span>;
};

const AGREEMENT_RULES = [
    { type: '-o 어미', m_sg: 'blanco', f_sg: 'blanca', m_pl: 'blancos', f_pl: 'blancas' },
    { type: '-e 어미', m_sg: 'grande', f_sg: 'grande', m_pl: 'grandes', f_pl: 'grandes' },
    { type: '자음 어미', m_sg: 'azul', f_sg: 'azul', m_pl: 'azules', f_pl: 'azules' },
    { type: '국적 (특수)', m_sg: 'español', f_sg: 'española', m_pl: 'españoles', f_pl: 'españolas' }
];

const POSITION_MEANING = [
    { adj: 'pobre', pre: '불쌍한 (연민)', post: '가난한 (경제적)' },
    { adj: 'viejo', pre: '오래된 (관계)', post: '늙은 (나이)' },
    { adj: 'cierto', pre: '어떤 (막연함)', post: '확실한 (확증)' },
    { adj: 'mismo', pre: '같은 (same)', post: '바로 그 (self)' }
];

const SHORTENING_RULES = [
    { adj: 'bueno / malo', rule: 'buen / mal', ex: 'un buen día (좋은 날)' },
    { adj: 'primero / tercero', rule: 'primer / tercer', ex: 'el primer piso (1층)' },
    { adj: 'grande', rule: 'gran', ex: 'un gran hombre (위대한 사람)' },
    { adj: 'santo', rule: 'san', ex: 'san pablo (성 바오로)' }
];

const QUIZ_DATA = [
    { id: 1, q: "las casas ( ) - 흰 집들", options: ['blanco', 'blanca', 'blancos', 'blancas'], answer: 3, explain: "casas는 여성 복수이므로 형용사도 여성 복수형 blancas를 씁니다." },
    { id: 2, q: "'좋은 날' (bueno + día, 전치 수식)", options: ['un día bueno', 'un buen día'], answer: 1, explain: "bueno는 남성 단수 명사(día) 앞에서 buen으로 단축됩니다." },
    { id: 3, q: "'나의 오랜 친구' (오래 알고 지낸)", options: ['mi viejo amigo', 'mi amigo viejo'], answer: 0, explain: "오래된 관계를 뜻할 때는 명사 앞에 위치합니다. (명사 뒤는 '늙은 친구')" },
    { id: 4, q: "국적 형용사 'español'의 여성 단수형은?", options: ['español', 'española', 'españolas'], answer: 1, explain: "자음으로 끝나는 국적 형용사는 여성형에서 -a를 추가합니다." }
];

export default function AdjectivesDetail() {
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
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 7</span>
                <ChevronRight size={10} />
                <span>Basic Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              형용사 (Adjetivos)
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               스페인어 형용사는 명사의 그림자처럼 성과 수를 따라가며, <br/>
               놓이는 위치에 따라 의미가 달라지기도 하는 다채로운 품사입니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium">
                  <li><strong>성·수 일치</strong>: 명사가 바뀌면 형용사도 반드시 바뀝니다.</li>
                  <li><strong>위치</strong>: 명사 뒤(후치)가 기본이지만, 주관적 의미는 앞(전치)에 옵니다.</li>
                  <li><strong>단축</strong>: bueno, grande 등은 명사 앞에서 꼬리가 잘립니다.</li>
              </ul>
          </div>

          {/* 1. Agreement */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 성·수 일치 규칙
            </h2>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm mb-6">
                <table className="w-full text-base border-collapse text-left min-w-[600px] table-fixed">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm uppercase">
                        <tr>
                            <th className="px-5 py-3 w-1/4 border-r border-slate-100 whitespace-nowrap">유형</th>
                            <th className="px-5 py-3 w-1/4 border-r border-slate-100 text-center whitespace-nowrap">남성 단수</th>
                            <th className="px-5 py-3 w-1/4 border-r border-slate-100 text-center whitespace-nowrap">여성 단수</th>
                            <th className="px-5 py-3 text-center whitespace-nowrap">복수형</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white text-[15px]">
                        {AGREEMENT_RULES.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100 whitespace-nowrap">{row.type}</td>
                                <td className="px-5 py-4 text-center font-medium border-r border-slate-100 whitespace-nowrap"><ColorEnd word={row.m_sg} type="m" /></td>
                                <td className="px-5 py-4 text-center font-medium border-r border-slate-100 whitespace-nowrap"><ColorEnd word={row.f_sg} type="f" /></td>
                                <td className="px-5 py-4 text-center text-sm font-medium whitespace-nowrap">
                                    <div className="flex justify-center gap-3">
                                        <ColorEnd word={row.m_pl} type="m" />
                                        <span className="text-slate-300">/</span>
                                        <ColorEnd word={row.f_pl} type="f" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl shadow-sm flex gap-4 items-start text-slate-700">
                <AlertTriangle size={20} className="text-slate-400 shrink-0 mt-0.5" />
                <div>
                    <h4 className="font-bold text-sm text-slate-800 mb-1 tracking-tight">남녀 혼성 그룹 수식</h4>
                    <p className="text-[14px] leading-relaxed font-medium">
                        남녀 명사가 섞여 있을 때는 문법적으로 <strong>남성 복수형</strong> 형용사를 사용합니다.
                    </p>
                    <p className="mt-2 text-[15px] font-bold text-slate-900">el chico y la chica guap<span className="text-blue-600">os</span>.</p>
                </div>
            </div>
          </section>

          {/* 2. Position */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 형용사의 위치와 의미
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8 text-[15px]">
                <div className="border border-slate-200 rounded-xl p-5 shadow-sm text-slate-700">
                    <h3 className="text-xs font-black text-slate-400 mb-3 border-l-4 border-slate-200 pl-3 uppercase tracking-widest">후치 (명사 뒤)</h3>
                    <p className="text-[14px] mb-3 font-medium">객관적 사실, 색상, 국적</p>
                    <div className="bg-slate-50 p-3 rounded flex flex-col gap-1">
                        <span className="font-bold text-slate-900">una mesa redonda</span>
                        <span className="text-slate-400 text-xs font-normal">둥근 탁자</span>
                    </div>
                </div>
                <div className="border border-slate-200 rounded-xl p-5 shadow-sm text-slate-700">
                    <h3 className="text-xs font-black text-slate-400 mb-3 border-l-4 border-slate-200 pl-3 uppercase tracking-widest">전치 (명사 앞)</h3>
                    <p className="text-[14px] mb-3 font-medium">주관적 평가, 강조, 고유 속성</p>
                    <div className="bg-slate-50 p-3 rounded flex flex-col gap-1">
                        <span className="font-bold text-slate-900">un gran hombre</span>
                        <span className="text-slate-400 text-xs font-normal">위대한 사람</span>
                    </div>
                </div>
            </div>

            <h3 className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-tight pl-2 border-l-2 border-slate-200">
                위치에 따른 의미 변화
            </h3>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-left border-collapse min-w-[500px] table-fixed">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm uppercase">
                        <tr>
                            <th className="px-5 py-3 w-[20%] border-r border-slate-100 text-center whitespace-nowrap">형용사</th>
                            <th className="px-5 py-3 w-[40%] border-r border-slate-100 text-center text-slate-800 whitespace-nowrap">명사 앞 (주관)</th>
                            <th className="px-5 py-3 w-[40%] text-center text-slate-600 whitespace-nowrap">명사 뒤 (객관)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white font-medium">
                        {POSITION_MEANING.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100 text-center whitespace-nowrap">{row.adj}</td>
                                <td className="px-5 py-4 text-slate-900 border-r border-slate-100 text-center whitespace-nowrap">{row.pre}</td>
                                <td className="px-5 py-4 text-slate-900 text-center whitespace-nowrap">{row.post}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 3. Shortening */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
             <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 형용사의 단축 (apócope)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4 leading-relaxed font-medium">
                남성 단수 명사 앞에서 어미가 탈락하는 특수 형용사들입니다.
            </p>
            
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-left border-collapse min-w-[500px] table-fixed">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm uppercase">
                        <tr>
                            <th className="px-5 py-3 w-1/4 border-r border-slate-100 whitespace-nowrap">원래 형태</th>
                            <th className="px-5 py-3 w-1/4 border-r border-slate-100 text-center whitespace-nowrap">단축 형태</th>
                            <th className="px-5 py-3 text-right pr-8 whitespace-nowrap">예시</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white font-medium">
                        {SHORTENING_RULES.map((item, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 font-bold text-slate-400 bg-slate-50/30 border-r border-slate-100 whitespace-nowrap">{item.adj}</td>
                                <td className="px-5 py-4 font-black text-slate-900 text-lg tracking-tight border-r border-slate-100 text-center whitespace-nowrap">{item.rule}</td>
                                <td className="px-5 py-4 text-right pr-8 whitespace-nowrap">
                                    <div className="flex flex-col items-end">
                                        <span className="text-slate-900 font-bold">{item.ex.split('(')[0]}</span>
                                        <span className="text-xs text-slate-400 mt-0.5">{item.ex.split('(')[1]?.replace(')', '') || ''}</span>
                                    </div>
                                </td>
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
             <div className="space-y-4 text-[15px]">
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
                {['성·수 일치', '위치와 의미', '형용사 단축', '연습 문제'].map((item, i) => (
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