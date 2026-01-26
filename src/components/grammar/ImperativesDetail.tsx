'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, CornerDownRight, ArrowRight, Info, AlertTriangle, MessageSquare
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
    { p: 'tú', ar: 'no hables', er_ir: 'no comas / no vivas' },
    { p: 'usted', ar: 'no hable', er_ir: 'no coma / no viva' },
    { p: 'nosotros', ar: 'no hablemos', er_ir: 'no comamos / no vivamos' },
    { p: 'vosotros', ar: 'no habléis', er_ir: 'no comáis / no viváis' },
    { p: 'ustedes', ar: 'no hablen', er_ir: 'no coman / no vivan' }
];

const QUIZ_DATA = [
    { id: 1, q: "'말해라 (tú)' - Decir의 긍정 명령형은?", options: ['dice', 'decid', 'di'], answer: 2, explain: "Decir의 tú 긍정 명령형은 불규칙 형태인 'di'입니다." },
    { id: 2, q: "'그것을 먹지 마라 (tú)' 작문:", options: ['No lo comes.', 'No lo comas.', 'No cómelo.'], answer: 1, explain: "부정 명령에서는 대명사가 동사 앞에 오며, tú 인칭은 접속법 형태(-as)를 씁니다." },
    { id: 3, q: "재귀동사 Sentarse(앉다)의 Nosotros 긍정 명령형('앉자')은?", options: ['sentémonos', 'sentémosnos', 'sentamos'], answer: 0, explain: "nosotros 명령형에서 재귀대명사 nos가 붙을 때, 동사 어미의 -s가 탈락합니다. (sentemos + nos -> sentémonos)" }
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

  return (
    <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto px-6 lg:px-8 py-8 font-sans text-slate-800 bg-white">
      
      <article className="flex-1 min-w-0">
          <header className="mb-8 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 24</span>
                <ChevronRight size={10} />
                <span>Intermediate Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              명령형
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
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium">
                  <li><strong>긍정 vs 부정</strong>: 형태가 서로 다르며, 부정은 항상 접속법을 씁니다.</li>
                  <li><strong>Tú 불규칙</strong>: di, haz, ve, pon 등 8가지 필수 불규칙을 암기해야 합니다.</li>
                  <li><strong>대명사 위치</strong>: 긍정은 뒤에 붙이고(cómelo), 부정은 앞에 씁니다(no lo comas).</li>
              </ul>
          </div>

          {/* 1. 긍정 명령형 */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 긍정 명령형 (Afirmativo)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">인칭에 따라 형태를 빌려오는 원천이 다릅니다.</p>
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm mb-6">
                <table className="w-full text-[15px] text-center border-collapse">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-2 py-3 text-left pl-5 w-24">인칭</th>
                            <th className="px-2 py-3 w-1/3">규칙 설명</th>
                            <th className="px-2 py-3">-ar (hablar)</th>
                            <th className="px-2 py-3">-er (comer)</th>
                            <th className="px-2 py-3">-ir (vivir)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {AFFIRMATIVE_RULES.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-2 py-4 text-left pl-5 font-bold text-slate-400 text-xs">{row.person}</td>
                                <td className="px-2 py-4 text-xs text-slate-500 font-medium bg-slate-50/30">{row.rule}</td>
                                <td className="px-2 py-4 font-bold text-slate-900 border-l border-slate-50">{row.ex_ar}</td>
                                <td className="px-2 py-4 font-bold text-slate-900 border-l border-slate-50">{row.ex_er}</td>
                                <td className="px-2 py-4 font-bold text-slate-900 border-l border-slate-50">{row.ex_ir}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <h3 className="text-[13px] font-black text-slate-400 mb-3 uppercase tracking-widest pl-2 border-l-2 border-slate-200">Tú 인칭 필수 불규칙 (8개)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                {TU_IRREGULARS.map((item, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 p-3 rounded-lg text-center hover:border-blue-300 transition-colors shadow-sm">
                        <span className="block text-slate-400 text-xs mb-1">{item.inf}</span>
                        <span className="block text-blue-600 font-black text-lg">{item.imp}</span>
                    </div>
                ))}
            </div>
          </section>

          {/* 2. 부정 명령형 */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 부정 명령형 (Negativo)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">"~하지 마라"는 모든 인칭이 <strong>접속법 현재</strong> 형태를 사용합니다.</p>
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] text-left border-collapse">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 w-24">인칭</th>
                            <th className="px-5 py-3 w-1/3">-ar (no hablar)</th>
                            <th className="px-5 py-3">-er / -ir (no comer/vivir)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {NEGATIVE_RULES.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 font-bold text-slate-400 bg-slate-50/30 border-r border-slate-100">{row.p}</td>
                                <td className="px-5 py-4 font-medium text-slate-900">{row.ar}</td>
                                <td className="px-5 py-4 font-medium text-slate-900">{row.er_ir}</td>
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
                    <h4 className="font-bold text-sm text-blue-600 mb-3 flex items-center gap-2 uppercase tracking-tight">긍정 명령: 뒤에 붙임</h4>
                    <div className="flex flex-col gap-2">
                        <div className="bg-slate-50 p-3 rounded-lg text-center">
                            <span className="text-slate-900 font-bold text-[15px]">¡Cómelo!</span>
                            <p className="text-xs text-slate-400 mt-1">그것을 먹어라</p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg text-center">
                            <span className="text-slate-900 font-bold text-[15px]">¡Dámelo!</span>
                            <p className="text-xs text-slate-400 mt-1">그것을 나에게 줘라</p>
                        </div>
                    </div>
                    <p className="text-xs text-slate-400 mt-3 flex items-center gap-1"><AlertTriangle size={12}/> 강세 부호(tilde) 주의</p>
                </div>

                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                    <h4 className="font-bold text-sm text-red-500 mb-3 flex items-center gap-2 uppercase tracking-tight">부정 명령: 앞에 둠</h4>
                    <div className="flex flex-col gap-2">
                        <div className="bg-slate-50 p-3 rounded-lg text-center">
                            <span className="text-slate-900 font-bold text-[15px]">No lo comas.</span>
                            <p className="text-xs text-slate-400 mt-1">그것을 먹지 마라</p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg text-center">
                            <span className="text-slate-900 font-bold text-[15px]">No me lo des.</span>
                            <p className="text-xs text-slate-400 mt-1">나에게 주지 마라</p>
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
            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-[14px]">
                    <div>
                        <h5 className="font-bold text-slate-800 mb-2 border-b border-slate-100 pb-1">Levantarse (tú)</h5>
                        <p className="mb-1"><span className="text-slate-400 text-xs w-10 inline-block">긍정</span> <span className="font-bold text-slate-900">Levántate</span></p>
                        <p><span className="text-slate-400 text-xs w-10 inline-block">부정</span> <span className="font-bold text-slate-900">No te levantes</span></p>
                    </div>
                    <div>
                        <h5 className="font-bold text-slate-800 mb-2 border-b border-slate-100 pb-1">Sentarse (nosotros)</h5>
                        <p className="mb-1"><span className="text-slate-400 text-xs w-10 inline-block">긍정</span> <span className="font-bold text-slate-900">Sentémonos</span> <span className="text-[10px] text-red-500 ml-1">(s 탈락)</span></p>
                        <p><span className="text-slate-400 text-xs w-10 inline-block">부정</span> <span className="font-bold text-slate-900">No nos sentemos</span></p>
                    </div>
                </div>
            </div>
          </section>

          {/* 연습 문제 */}
          <section id="sec-5" className="scroll-mt-24 pt-8 border-t border-slate-200">
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
                {['긍정 명령형', 'Tú 불규칙', '부정 명령형', '대명사 위치', '연습 문제'].map((item, i) => (
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