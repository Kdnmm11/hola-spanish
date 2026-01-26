'use client';

import React, { useState, useEffect } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, ArrowRight, Info, AlertTriangle, Lightbulb, RefreshCw, Send
} from 'lucide-react';

const NUMBERS_0_15 = [
    { num: 0, word: 'cero' }, { num: 1, word: 'uno' }, { num: 2, word: 'dos' },
    { num: 3, word: 'tres' }, { num: 4, word: 'cuatro' }, { num: 5, word: 'cinco' },
    { num: 6, word: 'seis' }, { num: 7, word: 'siete' }, { num: 8, word: 'ocho' },
    { num: 9, word: 'nueve' }, { num: 10, word: 'diez' }, { num: 11, word: 'once' },
    { num: 12, word: 'doce' }, { num: 13, word: 'trece' }, { num: 14, word: 'catorce' },
    { num: 15, word: 'quince' }
];

const TENS = [
    { num: 20, word: 'veinte' }, { num: 30, word: 'treinta' }, { num: 40, word: 'cuarenta' },
    { num: 50, word: 'cincuenta' }, { num: 60, word: 'sesenta' }, { num: 70, word: 'setenta' },
    { num: 80, word: 'ochenta' }, { num: 90, word: 'noventa' }
];

const HUNDREDS = [
    { num: 100, word: 'cien / ciento' }, { num: 200, word: 'doscientos' }, { num: 300, word: 'trescientos' },
    { num: 400, word: 'cuatrocientos' }, { num: 500, word: 'quinientos' }, { num: 600, word: 'seiscientos' },
    { num: 700, word: 'setecientos' }, { num: 800, word: 'ochocientos' }, { num: 900, word: 'novecientos' }
];

const ORDINALS = [
    { rank: '1st', word: 'primero', ex: 'el primer día (첫째 날)' },
    { rank: '2nd', word: 'segundo', ex: 'la segunda vez (두 번째)' },
    { rank: '3rd', word: 'tercero', ex: 'el tercer año (3학년)' },
    { rank: '4th', word: 'cuarto', ex: 'la cuarta parte (4분의 1)' }
];

// --- Utility: Number to Spanish Converter (0~999) ---
const numberToSpanish = (n: number): string => {
    if (n < 0 || n > 999) return '';
    const ones = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    const teens = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
    const tens = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
    const hundreds = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

    if (n === 0) return 'cero';
    if (n === 100) return 'cien';
    let str = '';
    if (n >= 100) {
        str += hundreds[Math.floor(n / 100)] + ' ';
        n %= 100;
        if (n === 0) return str.trim();
    }
    if (n < 10) str += ones[n];
    else if (n < 20) str += teens[n - 10];
    else if (n < 30) str += (n === 20 ? 'veinte' : 'veinti' + ones[n % 10]);
    else {
        str += tens[Math.floor(n / 10)];
        if (n % 10 !== 0) str += ' y ' + ones[n % 10];
    }
    return str.trim();
};

export default function NumbersDetail() {
  const [quizList, setQuizList] = useState<any[]>([]);
  const [userInputs, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [results, setResults] = useState<{ [key: number]: 'correct' | 'wrong' | null }>({});

  useEffect(() => { generateQuiz(); }, []);

  const generateQuiz = () => {
      const q1 = Math.floor(Math.random() * 9) + 1;
      const q2 = Math.floor(Math.random() * 90) + 10;
      const q3 = Math.floor(Math.random() * 900) + 100;
      setQuizList([{ id: 1, num: q1, q: `숫자 ${q1}을 스페인어로 쓰세요.` }, { id: 2, num: q2, q: `숫자 ${q2}를 스페인어로 쓰세요.` }, { id: 3, num: q3, q: `숫자 ${q3}을 스페인어로 쓰세요.` }]);
      setUserAnswers({}); setResults({});
  };

  const checkAnswer = (id: number, targetNum: number) => {
      const input = (userInputs[id] || '').trim().toLowerCase();
      const correct = numberToSpanish(targetNum).toLowerCase();
      setResults(prev => ({ ...prev, [id]: input === correct ? 'correct' : 'wrong' }));
  };

  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

  return (
    <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto px-6 lg:px-8 py-8 font-sans text-slate-800 bg-white">
      
      <article className="flex-1 min-w-0">
          <header className="mb-8 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 8</span>
                <ChevronRight size={10} />
                <span>Basic Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              숫자 (Números)
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               0부터 100, 그리고 그 이상까지. 스페인어 숫자의 구간별 규칙과 예외를 완벽하게 정리합니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium">
                  <li><strong>0~15</strong>: 불규칙이 많으므로 반드시 암기해야 합니다.</li>
                  <li><strong>16~29</strong>: 두 단어를 하나로 합쳐 씁니다 (dieciséis, veintidós 등).</li>
                  <li><strong>31~99</strong>: 'y'를 사용하여 십 단위와 일 단위를 연결합니다.</li>
                  <li><strong>100+</strong>: cien(100)과 ciento(101~)를 구분하고, 성별 일치를 주의합니다.</li>
              </ul>
          </div>

          {/* 1. Basic (0-15) */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 기수 (Cardinal)
            </h2>
            
            <h3 className="text-sm font-bold text-slate-800 mb-4 pl-3 border-l-4 border-blue-200 uppercase tracking-tight">
                0 ~ 15: 기본 숫자 (필수 암기)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                {NUMBERS_0_15.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border border-slate-200 rounded-[20px] hover:bg-slate-50 transition-colors shadow-sm">
                        <span className="text-xl font-black text-blue-600 w-8 text-center">{item.num}</span>
                        <span className="font-black text-slate-900 text-lg">{item.word}</span>
                    </div>
                ))}
            </div>

            {/* 16-29 */}
            <div className="mb-10">
                <h3 className="text-sm font-bold text-slate-800 mb-4 pl-3 border-l-4 border-indigo-200 uppercase tracking-tight">
                    16 ~ 29: 한 단어 결합 규칙
                </h3>
                <div className="bg-slate-50 border border-slate-200 rounded-[20px] p-6 shadow-sm">
                    <p className="text-[14px] text-slate-600 mb-5 leading-relaxed font-medium">
                        십 단위와 일 단위가 <strong>하나의 단어</strong>로 합쳐집니다. <br/>
                        이 과정에서 발음상 <strong>강세 부호(Tilde)</strong>가 추가되는 경우(16, 22, 23, 26)를 주의하세요.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-4 rounded-2xl border border-slate-100">
                            <span className="font-black text-slate-900 block mb-2 text-lg">16 ~ 19</span>
                            <div className="text-sm text-slate-600 space-y-1 font-medium">
                                <p className="flex justify-between"><span className="font-bold text-blue-600">16</span> dieciséis</p>
                                <p className="flex justify-between"><span className="font-bold text-blue-600">17</span> diecisiete</p>
                                <p className="flex justify-between"><span className="font-bold text-blue-600">18</span> dieciocho</p>
                                <p className="flex justify-between"><span className="font-bold text-blue-600">19</span> diecinueve</p>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-2xl border border-slate-100">
                            <span className="font-black text-slate-900 block mb-2 text-lg">20 ~ 29</span>
                            <div className="text-sm text-slate-600 space-y-1 font-medium">
                                <p className="flex justify-between"><span className="font-bold text-blue-600">20</span> veinte</p>
                                <p className="flex justify-between"><span className="font-bold text-blue-600">21</span> veintiuno</p>
                                <p className="flex justify-between"><span className="font-bold text-blue-600">22</span> veintidós</p>
                                <p className="flex justify-between"><span className="font-bold text-blue-600">23</span> veintitrés</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 30-99 */}
            <div className="mb-10">
                <h3 className="text-sm font-bold text-slate-800 mb-4 pl-3 border-l-4 border-green-200 uppercase tracking-tight">
                    30 ~ 99: 'y' 분리 결합
                </h3>
                <div className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-sm">
                    <p className="text-[14px] text-slate-600 mb-5 leading-relaxed font-medium">
                        31부터는 <span className="bg-slate-100 px-2 py-0.5 rounded font-bold text-slate-800">십 단위 + y + 일 단위</span> 형식으로 띄어 씁니다.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                        {TENS.slice(1).map((t, i) => (
                            <div key={i} className="text-center p-2 bg-slate-50 rounded-lg">
                                <span className="block font-black text-blue-600 text-lg">{t.num}</span>
                                <span className="text-sm font-extrabold text-slate-900">{t.word}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-4 text-[14px] justify-center">
                        <div className="flex items-center gap-3 border border-slate-200 px-5 py-3 rounded-full bg-slate-50 shadow-sm">
                            <span className="font-black text-blue-600 text-xl">31</span>
                            <span className="font-bold text-slate-900">treinta <span className="text-red-500 font-black italic mx-1">y</span> uno</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 100+ */}
            <div className="mb-10">
                <h3 className="text-sm font-bold text-slate-800 mb-4 pl-3 border-l-4 border-yellow-200 uppercase tracking-tight">
                    100 이상 큰 수 (cien, mil, millón)
                </h3>
                <div className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-sm">
                    <p className="text-[14px] text-slate-600 mb-6 leading-relaxed font-medium">
                        백 단위(100~900)는 <strong>한 단어</strong>로 합쳐 씁니다. <br/>
                        단, 30~99와 달리 백 단위와 십/일 단위 사이에는 <span className="text-red-500 font-bold underline decoration-red-200">y를 쓰지 않습니다</span>.
                    </p>
                    
                    {/* Grid for Hundreds */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                        {HUNDREDS.map((h, i) => (
                            <div key={i} className="text-center p-2 bg-slate-50 rounded-lg">
                                <span className="block font-black text-blue-600 text-lg">{h.num}</span>
                                <span className="text-sm font-extrabold text-slate-900">{h.word}</span>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-6 pt-4 border-t border-slate-100">
                        {/* 1. cien vs ciento */}
                        <div className="flex flex-col gap-2">
                            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2"><ChevronRight size={14} className="text-indigo-400"/> cien vs ciento</h4>
                            <div className="pl-6 space-y-2 text-[14px]">
                                <p className="text-slate-600"><strong className="text-slate-800">100</strong>: <span className="text-blue-600 font-bold">cien</span> (정확히 100만 나타낼 때)</p>
                                <p className="text-slate-600"><strong className="text-slate-800">101~</strong>: <span className="text-blue-600 font-bold">ciento</span> (뒤에 숫자가 붙을 때)</p>
                                <div className="text-xs font-medium bg-red-50 text-red-700 p-2 rounded-lg inline-block">
                                    ⚠️ <span className="font-bold">주의:</span> cento y uno (X) → <span className="font-bold">ciento uno</span> (O) (중간에 y를 넣지 않습니다!)
                                </div>
                            </div>
                        </div>

                        {/* 2. 성 일치 */}
                        <div className="flex flex-col gap-2 pt-4 border-t border-slate-50">
                            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2"><ChevronRight size={14} className="text-indigo-400"/> 성 일치 (200 ~ 900)</h4>
                            <div className="pl-6 space-y-2 text-[14px]">
                                <p className="text-slate-600">남성 명사 앞: <span className="text-blue-600 font-bold">...cientos</span> (doscientos chicos)</p>
                                <p className="text-slate-600">여성 명사 앞: <span className="text-red-500 font-bold">...cientas</span> (doscientas chicas)</p>
                            </div>
                        </div>

                        {/* 3. mil */}
                        <div className="flex flex-col gap-2 pt-4 border-t border-slate-50">
                            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2"><ChevronRight size={14} className="text-indigo-400"/> 1.000 (mil)</h4>
                            <div className="pl-6 space-y-1 text-[14px]">
                                <p className="text-slate-600">항상 단수형으로 씁니다.</p>
                                <p className="text-xs text-slate-400 italic">(dos mil, diez mil...)</p>
                            </div>
                        </div>

                        {/* 4. millón */}
                        <div className="flex flex-col gap-2 pt-4 border-t border-slate-50">
                            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2"><ChevronRight size={14} className="text-indigo-400"/> 1.000.000 (un millón)</h4>
                            <div className="pl-6 space-y-1 text-[14px]">
                                <p className="text-slate-600">명사 취급을 하며, 복수형(<span className="font-bold">millones</span>)이 존재합니다.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </section>

          {/* 2. 서수 */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 서수 (Números Ordinales)
            </h2>
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm mb-6">
                <table className="w-full text-base border-collapse text-left">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm uppercase">
                        <tr>
                            <th className="px-5 py-3 w-1/4">순서</th>
                            <th className="px-5 py-3 w-1/3">철자</th>
                            <th className="px-5 py-3 text-right pr-8">예시</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white text-[15px]">
                        {ORDINALS.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 font-bold text-slate-400 bg-slate-50/30 border-r border-slate-100">{row.rank}</td>
                                <td className="px-5 py-4 font-bold text-slate-900">{row.word}</td>
                                <td className="px-5 py-4 text-right pr-8">
                                    <div className="flex flex-col items-end font-medium">
                                        <span className="text-slate-900">{row.ex.split('(')[0]}</span>
                                        <span className="text-xs text-slate-400 mt-0.5">{row.ex.split('(')[1]?.replace(')', '') || ''}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* Practice Section */}
          <section id="sec-3" className="scroll-mt-24 pt-8 border-t border-slate-200 pb-20">
             <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <Lightbulb className="text-yellow-500 fill-yellow-500" size={20} />
                        기초 다지기 (Práctica)
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">숫자를 보고 스페인어 철자를 정확하게 입력해보세요.</p>
                </div>
                <button onClick={generateQuiz} className="flex items-center gap-2 text-xs font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full hover:bg-indigo-100 transition-all shadow-sm">
                    <RefreshCw size={14} /> 문제 새로고침
                </button>
             </div>
             
             <div className="space-y-4">
                {quizList.map((q, idx) => (
                    <div key={q.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-all">
                        <div className="flex items-start gap-3 mb-4">
                            <span className="bg-indigo-100 text-indigo-600 text-xs font-bold px-2.5 py-1 rounded-full mt-0.5">Q{idx + 1}</span>
                            <p className="font-bold text-slate-800 text-base leading-snug">{q.q}</p>
                        </div>

                        <div className="flex gap-2 max-w-md ml-0 sm:ml-9">
                            <input 
                                type="text"
                                placeholder="정답 입력..."
                                value={userInputs[q.id] || ''}
                                onChange={(e) => setUserAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                                disabled={results[q.id] === 'correct'}
                                className={`flex-1 px-4 py-2 text-sm rounded-full border transition-all outline-none font-medium ${
                                    results[q.id] === 'correct' ? 'bg-green-50 border-green-500 text-green-700' :
                                    results[q.id] === 'wrong' ? 'bg-red-50 border-red-400 text-red-700' :
                                    'bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 text-slate-800'
                                }`}
                                onKeyDown={(e) => e.key === 'Enter' && checkAnswer(q.id, q.num)}
                            />
                            <button 
                                onClick={() => checkAnswer(q.id, q.num)}
                                disabled={results[q.id] === 'correct' || !userInputs[q.id]}
                                className={`px-6 py-2 rounded-full font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                                    results[q.id] === 'correct' ? 'bg-green-500 text-white shadow-sm' :
                                    'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 disabled:opacity-30 shadow-sm'
                                }`}
                            >
                                {results[q.id] === 'correct' ? <Check size={14} /> : <Send size={14} />}
                                {results[q.id] === 'correct' ? '완료' : '확인'}
                            </button>
                        </div>

                        {results[q.id] && (
                            <div className="mt-5 w-full text-sm animate-in fade-in slide-in-from-top-2 duration-300 bg-slate-50 rounded-xl p-4 border border-slate-100 sm:ml-9">
                                {results[q.id] === 'correct' 
                                    ? <p className="text-green-600 font-bold flex items-center gap-2 mb-2"><Check size={16}/> 정답입니다!</p>
                                    : <p className="text-red-500 font-bold flex items-center gap-2 mb-2"><X size={16}/> 오답입니다. 정답은 <strong>{numberToSpanish(q.num)}</strong> 입니다.</p>
                                }
                                <p className="text-slate-600 leading-relaxed pl-6 border-l-2 border-slate-200">
                                    스페인어 숫자의 철자와 결합 규칙(y 사용 여부 등)을 다시 한번 확인해 보세요.
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
                {['기수 (0~15)', '16~29 규칙', '30~99 규칙', '100 이상', '서수 (Ordinales)', '실전 연습'].map((item, i) => (
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