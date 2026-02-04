'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, ArrowRight, Info, AlertTriangle, Lightbulb
} from 'lucide-react';

const MASCULINE_RULES = [
    { ending: '-o', desc: '가장 일반적인 남성 명사', ex: 'Libro, Gato, Perro, Tiempo' },
    { ending: '-or', desc: '직업, 행위자 등', ex: 'Amor, Color, Doctor, Profesor' },
    { ending: '-aje', desc: '프랑스어 등 외래어 유래', ex: 'Viaje, Garaje, Masaje, Paisaje' },
    { ending: '-ma', desc: '그리스어 유래 (추상 명사)', ex: 'Problema, Sistema, Idioma, Clima' }
];

const FEMININE_RULES = [
    { ending: '-a', desc: '가장 일반적인 여성 명사', ex: 'Casa, Mesa, Silla, Ventana' },
    { ending: '-ción / -sión', desc: '추상 명사, 상태', ex: 'Canción, Lección, Pasión, Televisión' },
    { ending: '-dad / -tad', desc: '추상적 성질', ex: 'Ciudad, Verdad, Libertad, Amistad' },
    { ending: '-umbre', desc: '집합적 개념', ex: 'Costumbre, Legumbre, Cumbre' }
];

const NUMBER_RULES = [
    { cond: '모음 (a, e, i, o, u) 끝', rule: '+ s', ex: 'Casa → Casas, Libro → Libros' },
    { cond: '자음 (l, n, r, d...) 끝', rule: '+ es', ex: 'Papel → Papeles, Flor → Flores' },
    { cond: '-z 끝', rule: 'z → c + es', ex: 'Luz → Luces, Pez → Peces' }
];

const QUIZ_DATA = [
    { id: 1, q: "'El problema'는 남성인가요 여성인가요?", options: ['남성', '여성'], answer: 0, explain: "-ma로 끝나는 그리스어 어원 단어(problema, sistema 등)는 남성 명사입니다." },
    { id: 2, q: "'물'을 뜻하는 agua의 정관사 단수형은?", options: ['La agua', 'El agua'], answer: 1, explain: "강세 있는 a-로 시작하는 여성 단수 명사 앞에는 발음 편의상 el을 씁니다." },
    { id: 3, q: "'Canción'의 복수형으로 올바른 것은?", options: ['Canciónes', 'Canciones'], answer: 1, explain: "복수형이 되면서 강세 규칙(n/s로 끝남)에 따라 마지막 음절에 자연 강세가 오므로 틸데( ´ )가 사라집니다." },
    { id: 4, q: "다음 중 여성 명사가 아닌 것은?", options: ['Ciudad', 'Costumbre', 'Viaje'], answer: 2, explain: "'-aje'로 끝나는 명사(viaje, garaje)는 남성 명사입니다. '-dad', '-umbre'는 여성 명사입니다." }
];

export default function NounsAndGenderDetail() {
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
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 4</span>
                <ChevronRight size={10} />
                <span>Basic Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              명사의 성과 수
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               스페인어의 모든 명사는 남성(Masculino) 또는 여성(Femenino) 중 하나의 성을 가집니다. <br/>
               성별과 수(단수/복수)에 따른 변화 규칙을 마스터해봅시다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium">
                  <li><strong>성</strong>: -o(남), -a(여)가 기본이나 -ma(남), -dad(여) 등 어미 규칙이 다양합니다.</li>
                  <li><strong>수</strong>: 모음 끝 +s, 자음 끝 +es가 기본입니다. (z는 c로 변환)</li>
                  <li><strong>일치</strong>: 관사와 형용사는 반드시 명사의 성·수에 맞춰야 합니다.</li>
              </ul>
          </div>

          {/* 1. Gender */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 명사의 성 (Género)
            </h2>

            {/* Masculine Table */}
            <div className="mb-8">
                <h3 className="text-sm font-bold text-blue-700 mb-3 border-l-4 border-blue-200 pl-3 tracking-tight">남성 명사 규칙 (masculino)</h3>
                <div className="overflow-x-auto border border-blue-100 rounded-lg shadow-sm">
                    <table className="w-full text-base border-collapse text-left min-w-[500px]">
                        <thead className="bg-blue-50/50 text-blue-600 text-xs font-bold border-b border-blue-100 tracking-wide">
                            <tr>
                                <th className="px-5 py-4 w-24 border-r border-blue-50 whitespace-nowrap">어미</th>
                                <th className="px-5 py-4 w-1/3 border-r border-blue-50 whitespace-nowrap">특징</th>
                                <th className="px-5 py-4 text-center whitespace-nowrap">예시</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-blue-50 bg-white">
                            {MASCULINE_RULES.map((r, i) => (
                                <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                                    <td className="px-5 py-4 font-bold text-blue-700 bg-slate-50/30 border-r border-blue-50 whitespace-nowrap">{r.ending}</td>
                                    <td className="px-5 py-4 text-slate-600 border-r border-blue-50 font-medium whitespace-nowrap">{r.desc}</td>
                                    <td className="px-5 py-4 text-center text-slate-900 font-medium whitespace-nowrap">{r.ex}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Feminine Table */}
            <div className="mb-10">
                <h3 className="text-sm font-bold text-red-700 mb-3 border-l-4 border-red-200 pl-3 tracking-tight">여성 명사 규칙 (femenino)</h3>
                <div className="overflow-x-auto border border-red-100 rounded-lg shadow-sm">
                    <table className="w-full text-base border-collapse text-left min-w-[500px]">
                        <thead className="bg-red-50/50 text-red-600 text-xs font-bold border-b border-red-100 tracking-wide">
                            <tr>
                                <th className="px-5 py-4 w-32 border-r border-red-50 whitespace-nowrap">어미</th>
                                <th className="px-5 py-4 w-1/3 border-r border-red-50 whitespace-nowrap">특징</th>
                                <th className="px-5 py-4 text-center whitespace-nowrap">예시</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-red-50 bg-white">
                            {FEMININE_RULES.map((r, i) => (
                                <tr key={i} className="hover:bg-red-50/30 transition-colors">
                                    <td className="px-5 py-4 font-bold text-red-700 bg-slate-50/30 border-r border-red-50 whitespace-nowrap">{r.ending}</td>
                                    <td className="px-5 py-4 text-slate-600 border-r border-red-50 font-medium whitespace-nowrap">{r.desc}</td>
                                    <td className="px-5 py-4 text-center text-slate-900 font-medium whitespace-nowrap">{r.ex}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Exceptions Grid */}
            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm text-center">
                    <h4 className="text-sm font-bold text-slate-400 tracking-tight mb-4 flex items-center justify-center gap-2">⚠️ 어미와 반대되는 성 (예외)</h4>
                    <div className="text-base space-y-3">
                        <p className="flex flex-col border-b border-slate-50 pb-2">
                            <span className="text-blue-600 font-bold text-xs mb-1">남성 (끝이 -a)</span> 
                            <span className="text-slate-900 font-bold">El día, El mapa, El planeta</span>
                        </p>
                        <p className="flex flex-col pt-1">
                            <span className="text-red-600 font-bold text-xs mb-1">여성 (끝이 -o)</span> 
                            <span className="text-slate-900 font-bold">La mano, La foto, La moto</span>
                        </p>
                    </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm text-center">
                    <h4 className="text-sm font-bold text-slate-400 tracking-tight mb-4 flex items-center justify-center gap-2">🔄 의미에 따라 성이 변함</h4>
                    <div className="space-y-3 text-base text-slate-900 font-medium flex flex-col justify-center h-full pb-6">
                        <p><strong>El capital</strong> (자본) <span className="text-slate-300 mx-2">/</span> <strong>La capital</strong> (수도)</p>
                        <p><strong>El policía</strong> (경찰관) <span className="text-slate-300 mx-2">/</span> <strong>La policía</strong> (경찰 조직)</p>
                    </div>
                </div>
            </div>
          </section>

          {/* 2. Number */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 명사의 수 (Número)
            </h2>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm mb-6">
                <table className="w-full text-base border-collapse text-left min-w-[500px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs tracking-wide">
                        <tr>
                            <th className="px-5 py-4 w-1/3 text-center border-r border-slate-100 whitespace-nowrap">조건</th>
                            <th className="px-5 py-4 w-36 text-center border-r border-slate-100 whitespace-nowrap">규칙</th>
                            <th className="px-5 py-4 text-center whitespace-nowrap">예시</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {NUMBER_RULES.map((r, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-6 text-center font-bold text-slate-700 bg-slate-50/30 border-r border-slate-100 whitespace-nowrap">{r.cond}</td>
                                <td className="px-5 py-6 text-center font-black text-xl text-indigo-600 border-r border-slate-100 whitespace-nowrap">{r.rule}</td>
                                <td className="px-5 py-6 text-center font-medium text-slate-900 whitespace-nowrap">{r.ex}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 3. Concordance */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
             <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 성·수 일치 (Concordancia)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-base font-bold">
                <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col items-center justify-center gap-3 text-center">
                    <span className="text-slate-900 text-xl"><span className="text-blue-600">El</span> libro nuev<span className="text-blue-600">o</span></span>
                    <span className="text-[10px] text-slate-400 font-sans tracking-widest border-t border-slate-100 pt-2 w-full">남성 단수 일치</span>
                </div>
                <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col items-center justify-center gap-3 text-center">
                    <span className="text-slate-900 text-xl"><span className="text-red-600">Las</span> casas blanc<span className="text-red-600">as</span></span>
                    <span className="text-[10px] text-slate-400 font-sans tracking-widest border-t border-slate-100 pt-2 w-full">여성 복수 일치</span>
                </div>
            </div>
            <div className="p-5 bg-yellow-50 border border-yellow-200 rounded-xl shadow-sm flex gap-4">
                <AlertTriangle className="text-yellow-600 shrink-0" size={20} />
                <div>
                    <h4 className="font-bold text-sm text-yellow-900 mb-1 tracking-tight">El agua 예외 규칙</h4>
                    <p className="text-[15px] text-yellow-800/90 leading-relaxed font-medium">
                        강세 있는 <strong>a-</strong> 또는 <strong>ha-</strong>로 시작하는 여성 단수 명사 앞에는 발음 편의상 <strong>el</strong>을 씁니다. (복수는 정상적으로 las)<br/>
                        <span className="inline-block mt-2 bg-yellow-100/50 px-3 py-1.5 rounded text-yellow-900 font-bold">
                            El agua <span className="text-yellow-500 mx-2">→</span> Las aguas
                        </span>
                    </p>
                </div>
            </div>
          </section>

          {/* Quiz */}
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

      <aside className="hidden lg:block w-56 shrink-0">
        <div className="sticky top-8 border-l border-slate-100 pl-6">
            <h4 className="text-[10px] font-bold text-slate-400 tracking-widest mb-4">On this page</h4>
            <ul className="space-y-3 text-[13px]">
                {['명사의 성', '명사의 수', '성·수 일치', '연습 문제'].map((item, i) => (
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