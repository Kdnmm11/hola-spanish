'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, CornerDownRight, ArrowRight, Info, AlertTriangle, Layers, Zap
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

const COMPARISON_SUMMARY = [
    { type: '현재완료 접속법', structure: 'haya + p.p.', meaning: '했기를 / 한 것을', usage: '현재 관련 완료 / 미래 완료' },
    { type: '과거완료 접속법', structure: 'hubiera + p.p.', meaning: '했었기를 / 했더라면', usage: '대과거 / 과거 사실 반대 가정' }
];

const QUIZ_DATA = [
    { id: 1, q: "빈칸 채우기: Me alegro de que ellos ( ) ( ) ya. (volver)", options: ['hayan vuelto', 'hayas vuelto', 'hubieran vuelto'], answer: 0, explain: "주절이 현재(me alegro)이고 이미 일어난 일에 대한 감정이므로 현재완료 접속법(hayan vuelto)을 씁니다. volver는 불규칙 분사입니다." },
    { id: 2, q: "과거 사실 반대 가정: Si ( ) ( ) dinero, habría ido. (tener)", options: ['he tenido', 'haya tenido', 'hubiera tenido'], answer: 2, explain: "과거에 일어나지 않은 일에 대한 가정('~했더라면')은 과거완료 접속법(hubiera tenido)을 씁니다." },
    { id: 3, q: "시제 일치 오류 수정: Espero que tú ( ) ( ) ayer. (venir)", options: ['hagas venido', 'hayas venido'], answer: 1, explain: "haber의 접속법 현재형은 'hayas'입니다. 'hagas'는 hacer의 접속법입니다." }
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
      // 특수 처리: haya, hubiéramos 등
      if (word.includes('hubié')) {
          return <span>hubi<span className="text-red-600 font-bold">éramos</span></span>;
      }
      for (const s of suffixes) {
          if (word.endsWith(s)) {
              foundSuffix = s;
              break;
          }
      }
      const stem = word.slice(0, word.length - foundSuffix.length);
      return (
          <span>
              <span className="text-slate-900">{stem}</span>
              <span className="text-red-600 font-bold">{foundSuffix}</span>
          </span>
      );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto px-6 lg:px-8 py-8 font-sans text-slate-800 bg-white">
      
      <article className="flex-1 min-w-0">
          <header className="mb-8 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 32</span>
                <ChevronRight size={10} />
                <span>Advanced Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              접속법 완료 시제
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               조동사 haber의 접속법 형태와 과거분사를 결합하여 이미 완료된 상황이나 과거 사실과 반대되는 가정을 표현합니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium">
                  <li><strong>현재완료 접속법</strong>: 현재와 관련된 완료된 일이나 미래의 완료를 나타냅니다 (haya + p.p.).</li>
                  <li><strong>과거완료 접속법</strong>: 과거 시점보다 이전(대과거)이나 과거의 반대 가정을 나타냅니다 (hubiera + p.p.).</li>
                  <li><strong>불변의 원칙</strong>: 완료 시제에서 과거분사는 성·수 변화 없이 항상 <span className="text-slate-900 font-bold">-o</span>로 끝납니다.</li>
              </ul>
          </div>

          {/* 1. 현재완료 접속법 */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 현재완료 접속법 (haya + p.p.)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">주절이 현재일 때, 이미 완료된 동작에 대한 감정이나 의심을 표현합니다.</p>
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm mb-6">
                <table className="w-full text-[15px] text-center border-collapse">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 text-left pl-8 w-1/3">주어</th>
                            <th className="px-5 py-3 w-1/3">haber (접속법 현재)</th>
                            <th className="px-5 py-3 w-1/3">과거분사</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {HAYA_TABLE.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 text-left pl-8 font-bold text-slate-400 text-sm">{row.p}</td>
                                <td className="px-5 py-4 font-bold">{renderHaber(row.haya)}</td>
                                <td className="px-5 py-4 text-slate-900 font-medium italic">{row.pp}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                <h4 className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-tight text-slate-400">주요 용법 및 예시</h4>
                <div className="space-y-4 text-[14px]">
                    <div className="flex flex-col gap-1">
                        <span className="text-slate-900 font-bold italic">me alegro de que hayas venido.</span>
                        <span className="text-slate-400 text-xs">네가 와서(이미 도착함) 기쁘다.</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-slate-900 font-bold italic">avísame cuando hayas llegado.</span>
                        <span className="text-slate-400 text-xs">도착하면(미래에 완료되면) 알려줘.</span>
                    </div>
                </div>
            </div>
          </section>

          {/* 2. 과거완료 접속법 */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 과거완료 접속법 (hubiera + p.p.)
            </h2>
            <p className="text-[15px] text-slate-600 mb-4">과거의 특정 시점보다 더 이전에 완료된 일이나 과거 사실의 반대를 가정합니다.</p>
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm mb-6">
                <table className="w-full text-[15px] text-center border-collapse">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 text-left pl-8 w-1/3">주어</th>
                            <th className="px-5 py-3 w-1/3">haber (접속법 과거)</th>
                            <th className="px-5 py-3 w-1/3">과거분사</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {HUBIERA_TABLE.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 text-left pl-8 font-bold text-slate-400 text-sm">{row.p}</td>
                                <td className="px-5 py-4 font-bold">{renderHaber(row.hubiera)}</td>
                                <td className="px-5 py-4 text-slate-900 font-medium italic">{row.pp}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                <h4 className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-tight text-slate-400">주요 용법 및 예시</h4>
                <div className="space-y-4 text-[14px]">
                    <div className="flex flex-col gap-1 pl-4 border-l-2 border-slate-200">
                        <span className="text-xs font-bold text-slate-400 uppercase">시제 일치 (대과거)</span>
                        <p className="text-slate-900 font-bold italic">quería que 그가 hubiera hecho la tarea.</p>
                        <p className="text-xs text-slate-400">그가 숙제를 (이미) 했었기를 바랐다.</p>
                    </div>
                    <div className="flex flex-col gap-1 pl-4 border-l-2 border-blue-200">
                        <span className="text-xs font-bold text-blue-600 uppercase">가정법 과거완료</span>
                        <p className="text-slate-900 font-bold italic">si hubiera tenido dinero, habría comprado un coche.</p>
                        <p className="text-xs text-slate-400">내가 돈이 있었다면(과거 사실 반대), 차를 샀을 텐데.</p>
                    </div>
                </div>
            </div>
          </section>

          {/* 3. 요약 및 비교 */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 시제 요약 및 비교
            </h2>
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-[15px] border-collapse text-left">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 w-1/4">시제</th>
                            <th className="px-5 py-3 w-1/4">조동사 형태</th>
                            <th className="px-5 py-3">의미 및 주요 용법</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white text-[14px]">
                        {COMPARISON_SUMMARY.map((r, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                <td className="px-5 py-4 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100">{r.type}</td>
                                <td className="px-5 py-4 font-black text-blue-600 italic">{r.structure}</td>
                                <td className="px-5 py-4 text-slate-700">
                                    <p className="font-bold">{r.meaning}</p>
                                    <p className="text-xs text-slate-400 mt-0.5">{r.usage}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 연습 문제 */}
          <section id="sec-4" className="scroll-mt-24 pt-8 border-t border-slate-200">
             <h2 className="text-[13px] font-black text-slate-400 mb-5 uppercase tracking-widest flex items-center gap-2">
                <CornerDownRight size={14} /> 연습 문제
             </h2>
             <div className="space-y-4 text-[15px]">
                {QUIZ_DATA.map((q, idx) => (
                    <div key={q.id} className="bg-slate-50 p-4 rounded-lg border border-slate-200 shadow-sm text-[15px]">
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