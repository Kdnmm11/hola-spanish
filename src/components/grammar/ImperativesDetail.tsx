'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, ArrowRight, Info, AlertTriangle, MessageSquare, Lightbulb
} from 'lucide-react';

const AFFIRMATIVE_RULES = [
    { person: 'tú (너)', rule: '직설법 현재 3인칭 단수', ex_ar: 'habla', ex_er: 'come', ex_ir: 'vive' },
    { person: 'usted (당신)', rule: '접속법 현재 (-ar→e, -er/ir→a)', ex_ar: 'hable', ex_er: 'coma', ex_ir: 'viva' },
    { person: 'nosotros (우리)', rule: '접속법 현재 ("~하자")', ex_ar: 'hablemos', ex_er: 'comamos', ex_ir: 'vivamos' },
    { person: 'vosotros (너희)', rule: '원형 -r 제거 + d', ex_ar: 'hablad', ex_er: 'comed', ex_ir: 'vivid' },
    { person: 'ustedes (당신들)', rule: 'usted 형태 + n', ex_ar: 'hablen', ex_er: 'coman', ex_ir: 'vivan' }
];

const TU_IRREGULARS = [
    { inf: 'decir', imp: 'di' }, { inf: 'hacer', imp: 'haz' },
    { inf: 'ir', imp: 've' }, { inf: 'poner', imp: 'pon' },
    { inf: 'salir', imp: 'sal' }, { inf: 'ser', imp: 'sé' },
    { inf: 'tener', imp: 'ten' }, { inf: 'venir', imp: 'ven' }
];

const NEGATIVE_RULES = [
    { p: 'tú', ar: 'no hables', er: 'no comas', ir: 'no vivas' },
    { p: 'usted', ar: 'no hable', er: 'no coma', ir: 'no viva' },
    { p: 'nosotros', ar: 'no hablemos', er: 'no comamos', ir: 'no vivamos' },
    { p: 'vosotros', ar: 'no habléis', er: 'no comáis', ir: 'no viváis' },
    { p: 'ustedes', ar: 'no hablen', er: 'no coman', ir: 'no vivan' }
];

const QUIZ_DATA = [
    { id: 1, q: "'말해라 (tú)' - decir의 긍정 명령형은?", options: ['dice', 'decid', 'di'], answer: 2, explain: "decir의 tú 긍정 명령형은 불규칙 형태인 'di'입니다." },
    { id: 2, q: "'그것을 먹지 마라 (tú)' 작문:", options: ['no lo comes.', 'no lo comas.', 'no cómelo.'], answer: 1, explain: "부정 명령에서는 대명사가 동사 앞에 오며, tú 인칭은 접속법 형태(-as)를 씁니다." },
    { id: 3, q: "재귀동사 sentarse(앉다)의 nosotros 긍정 명령형('앉자')은?", options: ['sentémonos', 'sentémosnos', 'sentamos'], answer: 0, explain: "nosotros 명령형에서 재귀대명사 nos가 붙을 때, 동사 어미의 -s가 탈락합니다. (sentemos + nos -> sentémonos)" },
    { id: 4, q: "hacer(하다)의 tú 부정 명령형은?", options: ['no haz', 'no hagas', 'no haces'], answer: 1, explain: "hacer의 접속법 현재 형태는 haga이므로, 부정 명령은 'no hagas'가 됩니다." }
];

export default function ImperativesDetail() {
  const [quizState, setQuizState] = useState<{ [key: number]: number | null }>({});
  const [showExplain, setShowExplain] = useState<{ [key: number]: boolean }>({});

  const handleQuiz = (qId: number, optIdx: number) => {
    setQuizState(prev => ({ ...prev, [qId]: optIdx }));
    setShowExplain(prev => ({ ...prev, [qId]: true }));
  };

  const scrollTo = (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const highlightSuffix = (text: string, suffixLength: number) => {
      const base = text.slice(0, -suffixLength);
      const suffix = text.slice(-suffixLength);
      return <span>{base}<span className="text-red-500 font-bold">{suffix}</span></span>;
  };

  // Helper to determine suffix length based on person and verb type (approximate)
  const getSuffixLen = (person: string, type: 'ar' | 'er' | 'ir') => {
      if (person === 'tú') return 2; // es, as
      if (person === 'usted') return 1; // e, a
      if (person === 'nosotros') return 4; // emos, amos
      if (person === 'vosotros') return 3; // éis, áis
      if (person === 'ustedes') return 2; // en, an
      return 1;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto px-6 lg:px-8 py-8 font-sans text-slate-800 bg-white">
      
      <article className="flex-1 min-w-0">
          <header className="mb-8 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 tracking-widest mb-2">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 29</span>
                <ChevronRight size={10} />
                <span>Intermediate Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              명령형 (imperativo)
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               상대방에게 요청, 제안, 명령을 할 때 사용합니다. <br/>
               긍정/부정에 따라 형태와 대명사 위치가 달라지므로 주의 깊게 학습해야 합니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium text-slate-700">
                  <li><strong>긍정 vs 부정</strong>: 형태가 서로 다르며, 부정은 항상 접속법을 씁니다.</li>
                  <li><strong>tú 불규칙</strong>: di, haz, ve, pon 등 8가지 필수 불규칙을 암기해야 합니다.</li>
                  <li><strong>대명사 위치</strong>: 긍정은 뒤에 붙이고(cómelo), 부정은 앞에 씁니다(no lo comas).</li>
              </ul>
          </div>

          {/* 1. 긍정 명령형 */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 긍정 명령형 (afirmativo)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4 font-medium">인칭에 따라 동사의 어미를 바꾸어 표현합니다.</p>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm mb-6">
                <table className="w-full text-[15px] text-center border-collapse min-w-[600px] table-fixed">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm">
                        <tr>
                            <th className="px-4 py-3 w-1/4">인칭</th>
                            <th className="px-4 py-3 w-1/4">-ar (hablar)</th>
                            <th className="px-4 py-3 w-1/4">-er (comer)</th>
                            <th className="px-4 py-3 w-1/4">-ir (vivir)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white text-base">
                        <tr className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-4 py-4 font-bold text-slate-400 bg-slate-50/30">tú</td>
                            <td className="px-4 py-4">habl<span className="text-red-500 font-bold">a</span></td>
                            <td className="px-4 py-4">com<span className="text-red-500 font-bold">e</span></td>
                            <td className="px-4 py-4">viv<span className="text-red-500 font-bold">e</span></td>
                        </tr>
                        <tr className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-4 py-4 font-bold text-slate-400 bg-slate-50/30">usted</td>
                            <td className="px-4 py-4">habl<span className="text-red-500 font-bold">e</span></td>
                            <td className="px-4 py-4">com<span className="text-red-500 font-bold">a</span></td>
                            <td className="px-4 py-4">viv<span className="text-red-500 font-bold">a</span></td>
                        </tr>
                        <tr className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-4 py-4 font-bold text-slate-400 bg-slate-50/30">nosotros</td>
                            <td className="px-4 py-4">habl<span className="text-red-500 font-bold">emos</span></td>
                            <td className="px-4 py-4">com<span className="text-red-500 font-bold">amos</span></td>
                            <td className="px-4 py-4">viv<span className="text-red-500 font-bold">amos</span></td>
                        </tr>
                        <tr className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-4 py-4 font-bold text-slate-400 bg-slate-50/30">vosotros</td>
                            <td className="px-4 py-4">habl<span className="text-red-500 font-bold">ad</span></td>
                            <td className="px-4 py-4">com<span className="text-red-500 font-bold">ed</span></td>
                            <td className="px-4 py-4">viv<span className="text-red-500 font-bold">id</span></td>
                        </tr>
                        <tr className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-4 py-4 font-bold text-slate-400 bg-slate-50/30">ustedes</td>
                            <td className="px-4 py-4">habl<span className="text-red-500 font-bold">en</span></td>
                            <td className="px-4 py-4">com<span className="text-red-500 font-bold">an</span></td>
                            <td className="px-4 py-4">viv<span className="text-red-500 font-bold">an</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3 className="text-sm font-black text-slate-500 mb-3 tracking-widest pl-2 border-l-2 border-slate-200">tú 인칭 필수 불규칙 (8개)</h3>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse min-w-[500px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm">
                        <tr>
                            <th className="px-4 py-3 w-1/4">동사 원형</th>
                            <th className="px-4 py-3 w-1/4">명령형 (tú)</th>
                            <th className="px-4 py-3 w-1/4">동사 원형</th>
                            <th className="px-4 py-3 w-1/4">명령형 (tú)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white text-sm">
                        {Array.from({ length: Math.ceil(TU_IRREGULARS.length / 2) }).map((_, idx) => {
                            const item1 = TU_IRREGULARS[idx * 2];
                            const item2 = TU_IRREGULARS[idx * 2 + 1];
                            return (
                                <tr key={idx} className="hover:bg-slate-50/50">
                                    <td className="px-4 py-3 text-slate-500">{item1.inf}</td>
                                    <td className="px-4 py-3 font-black text-slate-900 text-lg border-r border-slate-50">{item1.imp}</td>
                                    <td className="px-4 py-3 text-slate-500">{item2?.inf}</td>
                                    <td className="px-4 py-3 font-black text-slate-900 text-lg">{item2?.imp}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 2. 부정 명령형 */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-red-500">2.</span> 부정 명령형 (negativo)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">"~하지 마라"는 모든 인칭이 <strong>접속법 현재</strong> 형태를 사용합니다.</p>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-left border-collapse min-w-[500px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm">
                        <tr>
                            <th className="px-5 py-3 w-[15%] whitespace-nowrap">인칭</th>
                            <th className="px-5 py-3 w-[28%] text-center whitespace-nowrap">-ar (hablar)</th>
                            <th className="px-5 py-3 w-[28%] text-center whitespace-nowrap">-er (comer)</th>
                            <th className="px-5 py-3 w-[28%] text-center whitespace-nowrap">-ir (vivir)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white text-sm">
                        {NEGATIVE_RULES.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 font-bold text-slate-400 bg-slate-50/30 border-r border-slate-100 whitespace-nowrap">{row.p}</td>
                                <td className="px-5 py-4 font-bold text-slate-900 text-center whitespace-nowrap text-base border-r border-slate-50">
                                    {highlightSuffix(row.ar, getSuffixLen(row.p, 'ar'))}
                                </td>
                                <td className="px-5 py-4 font-bold text-slate-900 text-center whitespace-nowrap text-base border-r border-slate-50">
                                    {highlightSuffix(row.er, getSuffixLen(row.p, 'er'))}
                                </td>
                                <td className="px-5 py-4 font-bold text-slate-900 text-center whitespace-nowrap text-base">
                                    {highlightSuffix(row.ir, getSuffixLen(row.p, 'ir'))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 3. 대명사 위치 */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 목적격 대명사의 위치
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">긍정/부정에 따라 대명사(me, te, lo...)의 위치가 완전히 달라집니다.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                    <h4 className="font-bold text-sm text-blue-600 mb-3 flex items-center gap-2 tracking-tight">긍정 명령: 뒤에 붙임</h4>
                    <div className="flex flex-col gap-2">
                        <div className="bg-blue-50 p-3 rounded-lg text-center border border-blue-100">
                            <span className="text-blue-900 font-bold text-lg">¡cóme<span className="text-slate-900 font-black">lo</span>!</span>
                            <p className="text-xs text-blue-400 mt-1">그것을 먹어라</p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg text-center border border-blue-100">
                            <span className="text-blue-900 font-bold text-lg">¡dáme<span className="text-slate-900 font-black">lo</span>!</span>
                            <p className="text-xs text-blue-400 mt-1">그것을 나에게 줘라</p>
                        </div>
                    </div>
                    <p className="text-xs text-slate-400 mt-3 flex items-center gap-1"><AlertTriangle size={12}/> 강세 부호(tilde) 주의</p>
                </div>

                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                    <h4 className="font-bold text-sm text-red-500 mb-3 flex items-center gap-2 tracking-tight">부정 명령: 앞에 둠</h4>
                    <div className="flex flex-col gap-2">
                        <div className="bg-red-50 p-3 rounded-lg text-center border border-red-100">
                            <span className="text-red-900 font-bold text-lg">no <span className="text-red-500 font-black">lo</span> comas.</span>
                            <p className="text-xs text-red-400 mt-1">그것을 먹지 마라</p>
                        </div>
                        <div className="bg-red-50 p-3 rounded-lg text-center border border-red-100">
                            <span className="text-red-900 font-bold text-lg">no <span className="text-red-500 font-black">me lo</span> des.</span>
                            <p className="text-xs text-red-400 mt-1">나에게 주지 마라</p>
                        </div>
                    </div>
                </div>
            </div>
          </section>

          {/* 4. 재귀동사 */}
          <section id="sec-4" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">4.</span> 재귀동사의 명령형
            </h2>
            
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm">
                        <tr>
                            <th className="px-4 py-3 w-1/4">동사 (인칭)</th>
                            <th className="px-4 py-3 w-1/3 text-blue-600">긍정 명령 (붙임)</th>
                            <th className="px-4 py-3 w-1/3 text-red-500">부정 명령 (앞에)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white text-base">
                        <tr className="hover:bg-slate-50/50">
                            <td className="px-4 py-4 font-bold text-slate-500 bg-slate-50/30 border-r border-slate-100">levantarse (tú)</td>
                            <td className="px-4 py-4 font-bold text-slate-900">levánta<span className="text-slate-900 font-black">te</span></td>
                            <td className="px-4 py-4 font-bold text-slate-900">no <span className="text-red-500 font-black">te</span> levantes</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50">
                            <td className="px-4 py-4 font-bold text-slate-500 bg-slate-50/30 border-r border-slate-100">sentarse (nosotros)</td>
                            <td className="px-4 py-4 font-bold text-slate-900">
                                sentémo<span className="text-slate-900 font-black">nos</span> 
                                <span className="block text-[10px] font-medium text-slate-400 mt-1">(s 탈락)</span>
                            </td>
                            <td className="px-4 py-4 font-bold text-slate-900">no <span className="text-red-500 font-black">nos</span> sentemos</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50">
                            <td className="px-4 py-4 font-bold text-slate-500 bg-slate-50/30 border-r border-slate-100">irse (vosotros)</td>
                            <td className="px-4 py-4 font-bold text-slate-900">
                                i<span className="text-slate-900 font-black">os</span>
                                <span className="block text-[10px] font-medium text-slate-400 mt-1">(d 탈락)</span>
                            </td>
                            <td className="px-4 py-4 font-bold text-slate-900">no <span className="text-red-500 font-black">os</span> vayáis</td>
                        </tr>
                    </tbody>
                </table>
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
                {['긍정 명령형', 'tú 불규칙', '부정 명령형', '대명사 위치', '재귀동사', '연습 문제'].map((item, i) => (
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