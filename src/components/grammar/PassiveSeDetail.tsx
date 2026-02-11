'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, CornerDownRight, ArrowRight, Info, AlertTriangle, Users, BookOpen, Lightbulb
} from 'lucide-react';

const SER_PASSIVE_EXAMPLES = [
    { 
        sentence: 'La carta fue escrita por Juan.', 
        breakdown: { subject: 'La carta', ser: 'fue', pp: 'escrita', agent: 'por Juan' },
        anal: 'La carta (여성 단수) → escrita (성·수 일치)' 
    },
    { 
        sentence: 'Los libros son leídos por los niños.', 
        breakdown: { subject: 'Los libros', ser: 'son', pp: 'leídos', agent: 'por los niños' },
        anal: 'Los libros (남성 복수) → leídos (성·수 일치)' 
    }
];

const SE_PASSIVE_EXAMPLES = [
    { ex: 'Se vende esta casa.', mean: '이 집을 팝니다 (집이 팔림 - 단수)' },
    { ex: 'Se venden estas casas.', mean: '이 집들을 팝니다 (집들이 팔림 - 복수)' },
    { ex: 'Se habla español aquí.', mean: '여기선 스페인어가 통용됩니다' }
];

const IMPERSONAL_EXAMPLES = [
    { ex: 'Se vive bien aquí.', mean: '여기선 (사람들이) 잘 산다.' },
    { ex: 'Se entra por esta puerta.', mean: '이 문으로 들어간다.' },
    { ex: 'En Corea se come mucho kimchi.', mean: '한국에선 김치를 많이 먹는다.' }
];

const SE_COMPARISON = [
    { item: '동사의 수', pasiva: '주어(대상)에 따라 단수/복수', imp: '항상 3인칭 단수' },
    { item: '대상의 특징', pasiva: '사물 목적어가 주어 역할', imp: '주어가 불명확 / 일반인' },
    { item: '동사 종류', pasiva: '타동사 (목적어 있음)', imp: '주로 자동사' }
];

const QUIZ_DATA = [
    { id: 1, q: "수동태 변환: Juan lee el libro. (ser + p.p)", options: ['El libro es leído por Juan.', 'El libro es leída por Juan.'], answer: 0, explain: "Libro는 남성 단수이므로 과거분사도 남성 단수형 leído를 써야 합니다." },
    { id: 2, q: "Se pasiva: (     ) muchas frutas. (vender)", options: ['Se vende', 'Se venden'], answer: 1, explain: "Frutas(과일들)가 복수 주어이므로 동사도 복수형 venden을 써야 합니다." },
    { id: 3, q: "무인칭 Se: 이 건물에서는 담배를 피울 수 없다. (no poder fumar)", options: ['No se pueden fumar.', 'No se puede fumar.'], answer: 1, explain: "무인칭 표현에서는 동사를 항상 3인칭 단수(puede)로 고정합니다." },
    { id: 4, q: "성/수 일치: Las cartas (     ) escritas por Ana.", options: ['Fueron', 'Fue'], answer: 0, explain: "주어(las cartas)가 복수이므로 ser 동사도 복수형(fueron)을 써야 합니다." }
];

// --- Passive Label Component ---
const PassiveLabel = ({ text, type }: { text: string; type: 'S' | 'V' | 'PP' | 'Ag' }) => {
    const configs = {
        S: { color: 'border-blue-400 text-blue-600', label: 'S' },
        V: { color: 'border-red-400 text-red-600', label: 'Ser' },
        PP: { color: 'border-indigo-400 text-indigo-600', label: 'P.P' },
        Ag: { color: 'border-emerald-400 text-emerald-600', label: 'por 행위자' }
    };
    const config = configs[type];
    
    return (
        <span className="relative inline-block mx-1.5 group">
            <span className={`border-b-2 pb-0.5 font-black text-slate-900 text-xl transition-colors ${config.color.split(' ')[0]}`}>
                {text}
            </span>
            <span className={`absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-black tracking-tighter whitespace-nowrap uppercase ${config.color.split(' ')[1]}`}>
                {config.label}
            </span>
        </span>
    );
};

export default function PassiveSeDetail() {
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
    <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto px-2 sm:px-3 lg:px-4 pt-1.5 pb-8 font-sans text-slate-800 bg-white">
      
      <article className="flex-1 min-w-0">
          <header className="mb-8 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 tracking-widest mb-2">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 34</span>
                <ChevronRight size={10} />
                <span>Intermediate Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              수동태와 무인칭 Se
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               동작의 주체보다 대상이나 행위 자체를 강조하는 수동태와, <br/>
               일반적인 사실을 말하는 무인칭 표현을 학습합니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium">
                  <li><strong>ser 수동태</strong>: 격식체. 분사의 성·수 일치가 필수입니다.</li>
                  <li><strong>se 수동태</strong>: 일상체. 주어(대상)의 수에 동사를 맞춥니다.</li>
                  <li><strong>무인칭 se</strong>: 일반적 사실. 동사는 항상 3인칭 단수입니다.</li>
              </ul>
          </div>

          {/* 1. 수동태 (ser / se) */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 수동태 (Voz pasiva)
            </h2>
            
            <div className="space-y-10">
                <div>
                    <h3 className="text-sm font-bold text-slate-800 mb-4 tracking-tight pl-2 border-l-4 border-blue-200">
                        1.1 Ser + 과거분사 (격식)
                    </h3>
                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                        <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 text-sm font-bold text-slate-600 text-center">구조: Ser + P.P + por 행위자</div>
                        <div className="p-10 space-y-12">
                            {SER_PASSIVE_EXAMPLES.map((item, idx) => (
                                <div key={idx} className="flex flex-col items-center border-b border-slate-100 pb-10 last:border-0 last:pb-0">
                                    {/* SVO-style Breakdown */}
                                    <div className="flex flex-wrap justify-center items-baseline gap-y-10 mb-8 px-4">
                                        <PassiveLabel text={item.breakdown.subject} type="S" />
                                        <PassiveLabel text={item.breakdown.ser} type="V" />
                                        <PassiveLabel text={item.breakdown.pp} type="PP" />
                                        <PassiveLabel text={item.breakdown.agent} type="Ag" />
                                    </div>

                                    <span className="text-sm text-slate-400 flex items-center gap-1.5 font-medium italic mt-4">
                                        <Info size={14} className="text-slate-300"/> {item.anal}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-bold text-slate-800 mb-4 tracking-tight pl-2 border-l-4 border-blue-200">
                        1.2 수동의 Se (일상)
                    </h3>
                    <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
                        <table className="w-full text-[15px] text-center border-collapse min-w-[500px]">
                            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm">
                                <tr>
                                    <th className="px-5 py-4 w-1/2 whitespace-nowrap">예문</th>
                                    <th className="px-5 py-4 whitespace-nowrap">의미</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                                {SE_PASSIVE_EXAMPLES.map((row, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-5 py-4 font-bold text-slate-900 whitespace-nowrap">{row.ex}</td>
                                        <td className="px-5 py-4 text-slate-600 font-medium whitespace-nowrap">{row.mean}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
          </section>

          {/* 2. 무인칭 se */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 무인칭 Se (Se impersonal)
            </h2>
            <p className="text-[15px] text-slate-600 mb-6 font-medium">"사람들은 ~한다"라는 일반적 사실을 말하며, 동사는 항상 단수입니다.</p>
            <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse min-w-[500px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm">
                        <tr>
                            <th className="px-5 py-4 w-1/2 whitespace-nowrap">예문</th>
                            <th className="px-5 py-4 whitespace-nowrap">의미</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {IMPERSONAL_EXAMPLES.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 font-bold text-slate-900 whitespace-nowrap">{row.ex}</td>
                                <td className="px-5 py-4 text-slate-600 font-medium whitespace-nowrap">{row.mean}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 3. 구분법 */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 수동의 Se vs 무인칭 Se 구분
            </h2>
            <p className="text-[15px] text-slate-600 mb-6 font-medium">형태는 비슷하지만 동사의 수 일치 여부로 구분합니다.</p>
            <div className="overflow-hidden border border-slate-200 rounded-xl shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm">
                        <tr>
                            <th className="px-5 py-4 w-1/4 whitespace-nowrap">구분</th>
                            <th className="px-5 py-4 w-1/3 text-blue-600 whitespace-nowrap">수동의 Se</th>
                            <th className="px-5 py-4 text-slate-600 whitespace-nowrap">무인칭 Se</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {SE_COMPARISON.map((r, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100 whitespace-nowrap">{r.item}</td>
                                <td className="px-5 py-4 text-slate-700 whitespace-nowrap">{r.pasiva}</td>
                                <td className="px-5 py-4 text-slate-700 font-bold whitespace-nowrap">{r.imp}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 4. 시제 변화 */}
          <section id="sec-4" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">4.</span> 수동태의 시제 변화 예시
            </h2>
            <p className="text-[15px] text-slate-600 mb-6 font-medium">Ser 동사만 시제에 맞춰 변화시키면 됩니다.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm hover:border-blue-200 transition-colors flex flex-col items-center text-center">
                    <span className="text-xs font-black text-blue-500 mb-2 tracking-widest uppercase">현재</span>
                    <p className="text-[16px] text-slate-900 font-bold">La puerta es abierta.</p>
                    <p className="text-xs text-slate-400 mt-1 font-medium">문이 열린다.</p>
                </div>
                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm hover:border-blue-200 transition-colors flex flex-col items-center text-center">
                    <span className="text-xs font-black text-blue-500 mb-2 tracking-widest uppercase">점과거</span>
                    <p className="text-[16px] text-slate-900 font-bold">La puerta fue abierta.</p>
                    <p className="text-xs text-slate-400 mt-1 font-medium">문이 열렸다.</p>
                </div>
                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm hover:border-blue-200 transition-colors flex flex-col items-center text-center">
                    <span className="text-xs font-black text-blue-500 mb-2 tracking-widest uppercase">현재완료</span>
                    <p className="text-[16px] text-slate-900 font-bold">La puerta ha sido abierta.</p>
                    <p className="text-xs text-slate-400 mt-1 font-medium">문이 열려 왔다.</p>
                </div>
                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm hover:border-blue-200 transition-colors flex flex-col items-center text-center">
                    <span className="text-xs font-black text-blue-500 mb-2 tracking-widest uppercase">미래</span>
                    <p className="text-[16px] text-slate-900 font-bold">La puerta será abierta.</p>
                    <p className="text-xs text-slate-400 mt-1 font-medium">문이 열릴 것이다.</p>
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
                {['수동태 (ser/se)', '무인칭 se', '구분법', '시제 변화', '연습 문제'].map((item, i) => (
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