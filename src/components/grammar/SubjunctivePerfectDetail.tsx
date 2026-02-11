'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, ArrowRight, Info, Layers, Sparkles, Lightbulb
} from 'lucide-react';

const HAYA_TABLE = [
    { p: 'yo', haya: 'haya', pp: 'comido' },
    { p: 'tú', haya: 'hayas', pp: 'comido' },
    { p: 'él/ella/ud.', haya: 'haya', pp: 'comido' },
    { p: 'nosotros/as', haya: 'hayamos', pp: 'comido' },
    { p: 'vosotros/as', haya: 'hayáis', pp: 'comido' },
    { p: 'ellos/as/uds.', haya: 'hayan', pp: 'comido' }
];

const HUBIERA_TABLE = [
    { p: 'yo', hubiera: 'hubiera', pp: 'comido' },
    { p: 'tú', hubiera: 'hubieras', pp: 'comido' },
    { p: 'él/ella/ud.', hubiera: 'hubiera', pp: 'comido' },
    { p: 'nosotros/as', hubiera: 'hubiéramos', pp: 'comido' },
    { p: 'vosotros/as', hubiera: 'hubierais', pp: 'comido' },
    { p: 'ellos/as/uds.', hubiera: 'hubieran', pp: 'comido' }
];

const USAGE_PRESENT_PERFECT = [
    { type: '완료된 사실에 대한 감정', desc: '현재 시점에서 이미 완료된 일에 대한 주관적 태도를 표현합니다.', ex: 'Me alegro de que hayas venido.', ko: '네가 와서(이미 도착함) 기쁘다.' },
    { type: '미래 완료', desc: '미래의 특정 시점 이전에 완료될 일을 가정합니다.', ex: 'Avísame cuando hayas llegado.', ko: '도착하면(미래에 완료되면) 알려줘.' }
];

const USAGE_PAST_PERFECT = [
    { type: '시제 일치 (대과거)', desc: '과거 시점보다 더 이전에 완료된 일을 표현합니다.', ex: 'Quería que hubiera hecho la tarea.', ko: '그가 숙제를 (이미) 했었기를 바랐다.' },
    { type: '가정법 과거완료', desc: '과거 사실과 반대되는 일을 가정할 때 사용합니다 (~했더라면).', ex: 'Si hubiera tenido dinero, habría comprado un coche.', ko: '내가 돈이 있었다면(과거 사실 반대), 차를 샀을 텐데.' }
];

const COMPARISON_SUMMARY = [
    { type: '현재완료 접속법', structure: 'haya + p.p.', meaning: '했기를 / 한 것을', usage: '현재 관련 완료 / 미래 완료' },
    { type: '과거완료 접속법', structure: 'hubiera + p.p.', meaning: '했었기를 / 했더라면', usage: '대과거 / 과거 사실 반대 가정' }
];

const QUIZ_DATA = [
    { id: 1, q: "빈칸 채우기: Me alegro de que ellos (     ) (     ) ya. (volver)", options: ['hayan vuelto', 'hayas vuelto', 'hubieran vuelto'], answer: 0, explain: "주절이 현재(me alegro)이고 이미 일어난 일에 대한 감정이므로 현재완료 접속법(hayan vuelto)을 씁니다. Volver는 불규칙 분사입니다." },
    { id: 2, q: "과거 사실 반대 가정: Si (     ) (     ) dinero, habría ido. (tener)", options: ['he tenido', 'haya tenido', 'hubiera tenido'], answer: 2, explain: "과거에 일어나지 않은 일에 대한 가정('~했더라면')은 과거완료 접속법(hubiera tenido)을 씁니다." },
    { id: 3, q: "시제 일치 오류 수정: Espero que tú (     ) (     ) ayer. (venir)", options: ['hagas venido', 'hayas venido'], answer: 1, explain: "Haber의 접속법 현재형은 'hayas'입니다. 'hagas'는 hacer의 접속법입니다." },
    { id: 4, q: "Haber 접속법 과거 nosotros 형태는?", options: ['hubieramos', 'hubiéramos', 'hubieramos'], answer: 1, explain: "Nosotros 형태는 항상 강세 부호(tilde)가 포함된 hubiéramos 형태를 씁니다." }
];

export default function SubjunctivePerfectDetail() {
  const [quizState, setQuizState] = useState<{ [key: number]: number | null }>({});
  const [showExplain, setShowExplain] = useState<{ [key: number]: boolean }>({});

  const handleQuiz = (qId: number, optIdx: number) => {
    setQuizState(prev => ({ ...prev, [qId]: optIdx }));
    setShowExplain(prev => ({ ...prev, [qId]: true }));
  };

  const scrollTo = (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderHaber = (word: string) => {
      const suffixes = ['ámos', 'amos', 'áis', 'ías', 'ías', 'ían', 'ía', 'as', 'an', 'es', 'a', 'e', 'o'];
      let foundSuffix = "";
      if (word.includes('hubié')) {
          return <span className="whitespace-nowrap">hubi<span className="text-red-600 font-bold">éramos</span></span>;
      }
      for (const s of suffixes) {
          if (word.endsWith(s)) {
              foundSuffix = s;
              break;
          }
      }
      const stem = word.slice(0, word.length - foundSuffix.length);
      return (
          <span className="whitespace-nowrap">
              <span className="text-slate-900">{stem}</span>
              <span className="text-red-600 font-bold">{foundSuffix}</span>
          </span>
      );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto px-2 sm:px-3 lg:px-4 pt-1.5 pb-8 font-sans text-slate-800 bg-white">
      
      <article className="flex-1 min-w-0">
          <header className="mb-12 border-b border-slate-200 pb-8">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 tracking-widest mb-3">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 37</span>
                <ChevronRight size={10} />
                <span>Advanced Level</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
              접속법 완료 시제
            </h1>
            <p className="text-[16px] text-slate-600 font-medium leading-relaxed max-w-3xl">
               조동사 haber의 접속법 형태와 과거분사를 결합하여 이미 완료된 상황이나 과거 사실과 반대되는 가정을 표현합니다.
            </p>
          </header>

          <div className="mb-12 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium text-slate-700">
                  <li><strong>현재완료 접속법</strong>: 현재와 관련된 완료된 일이나 미래의 완료를 나타냅니다 (haya + p.p.).</li>
                  <li><strong>과거완료 접속법</strong>: 과거 시점보다 이전(대과거)이나 과거의 반대 가정을 나타냅니다 (hubiera + p.p.).</li>
                  <li><strong>불변의 원칙</strong>: 완료 시제에서 과거분사는 성·수 변화 없이 항상 <span className="text-slate-900 font-bold">-o</span>로 끝납니다.</li>
              </ul>
          </div>

          {/* 1. 현재완료 접속법 */}
          <section id="sec-1" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 현재완료 접속법 (haya + p.p.)
            </h2>
            <p className="text-[15px] text-slate-600 mb-6 font-medium">주절이 현재일 때, 이미 완료된 동작에 대한 감정이나 의심을 표현합니다.</p>
            <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm mb-8">
                <table className="w-full text-[15px] text-center border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm">
                        <tr>
                            <th className="px-6 py-4 w-1/3 whitespace-nowrap">주어</th>
                            <th className="px-6 py-4 w-1/3 whitespace-nowrap">haber (접속법 현재)</th>
                            <th className="px-6 py-4 w-1/3 whitespace-nowrap">과거분사</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {HAYA_TABLE.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 font-bold text-slate-400 text-[16px] whitespace-nowrap">{row.p}</td>
                                <td className="px-6 py-4 font-bold whitespace-nowrap">{renderHaber(row.haya)}</td>
                                <td className="px-6 py-4 text-slate-900 font-bold whitespace-nowrap">{row.pp}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="space-y-3 max-w-4xl">
                {USAGE_PRESENT_PERFECT.map((item, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:border-blue-300 transition-all flex flex-col gap-2">
                        <div className="flex items-baseline gap-2">
                            <h4 className="text-base font-bold text-slate-800 tracking-tight">{item.type}</h4>
                            <span className="text-xs text-slate-400 font-medium">({item.desc})</span>
                        </div>
                        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                            <p className="text-[16px] text-slate-900 font-bold mb-0.5 italic">"{item.ex}"</p>
                            <p className="text-xs text-slate-500 font-medium">{item.ko}</p>
                        </div>
                    </div>
                ))}
            </div>
          </section>

          {/* 2. 과거완료 접속법 */}
          <section id="sec-2" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 과거완료 접속법 (hubiera + p.p.)
            </h2>
            <p className="text-[15px] text-slate-600 mb-6 font-medium">과거의 특정 시점보다 더 이전에 완료된 일이나 과거 사실의 반대를 가정합니다.</p>
            <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm mb-8">
                <table className="w-full text-[15px] text-center border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm">
                        <tr>
                            <th className="px-6 py-4 w-1/3 whitespace-nowrap">주어</th>
                            <th className="px-6 py-4 w-1/3 whitespace-nowrap">haber (접속법 과거)</th>
                            <th className="px-6 py-4 w-1/3 whitespace-nowrap">과거분사</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {HUBIERA_TABLE.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 font-bold text-slate-400 text-[16px] whitespace-nowrap">{row.p}</td>
                                <td className="px-6 py-4 font-bold whitespace-nowrap">{renderHaber(row.hubiera)}</td>
                                <td className="px-6 py-4 text-slate-900 font-bold whitespace-nowrap">{row.pp}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="space-y-3 max-w-4xl">
                {USAGE_PAST_PERFECT.map((item, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:border-indigo-300 transition-all flex flex-col gap-2">
                        <div className="flex items-baseline gap-2">
                            <h4 className="text-base font-bold text-slate-800 tracking-tight">{item.type}</h4>
                            <span className="text-xs text-slate-400 font-medium">({item.desc})</span>
                        </div>
                        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                            <p className="text-[16px] text-slate-900 font-bold mb-0.5 italic">"{item.ex}"</p>
                            <p className="text-xs text-slate-500 font-medium">{item.ko}</p>
                        </div>
                    </div>
                ))}
            </div>
          </section>

          {/* 3. 요약 및 비교 */}
          <section id="sec-3" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 시제 요약 및 비교
            </h2>
            <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm">
                        <tr>
                            <th className="px-6 py-4 w-1/4 whitespace-nowrap">시제</th>
                            <th className="px-6 py-4 w-1/4 whitespace-nowrap">조동사 형태</th>
                            <th className="px-6 py-4 whitespace-nowrap text-center">의미 및 주요 용법</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {COMPARISON_SUMMARY.map((r, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-5 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100 whitespace-nowrap">{r.type}</td>
                                <td className="px-6 py-5 font-bold text-emerald-600 text-[17px] whitespace-nowrap">{r.structure}</td>
                                <td className="px-6 py-5 text-slate-700 whitespace-nowrap text-center">
                                    <p className="font-bold text-[16px]">{r.meaning}</p>
                                    <p className="text-xs text-slate-400 mt-1 font-medium">{r.usage}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 연습 문제 */}
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
                {['현재완료 접속법', '과거완료 접속법', '요약 및 비교', '연습 문제'].map((item, i) => (
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