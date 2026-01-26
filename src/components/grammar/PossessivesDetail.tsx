'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, CornerDownRight, ArrowRight, Info, AlertTriangle, User
} from 'lucide-react';

const PRE_POSSESSIVE = [
    { owner: '나 (Yo)', sg: 'mi', pl: 'mis', mean: '나의' },
    { owner: '너 (Tú)', sg: 'tu', pl: 'tus', mean: '너의' },
    { owner: '그/그녀/당신', sg: 'su', pl: 'sus', mean: '그/그녀/당신의' },
    { owner: '우리 (Nosotros)', sg: 'nuestro/a', pl: 'nuestros/as', mean: '우리의' },
    { owner: '너희 (Vosotros)', sg: 'vuestro/a', pl: 'vuestros/as', mean: '너희의' },
    { owner: '그들/당신들', sg: 'su', pl: 'sus', mean: '그들/당신들의' }
];

const POST_POSSESSIVE = [
    { owner: '나', m: 'mío / míos', f: 'mía / mías', mean: '나의' },
    { owner: '너', m: 'tuyo / tuyos', f: 'tuya / tuyas', mean: '너의' },
    { owner: '그/그녀/당신', m: 'suyo / suyos', f: 'suya / suyas', mean: '그/그녀/당신의' },
    { owner: '우리', m: 'nuestro / nuestros', f: 'nuestra / nuestras', mean: '우리의' },
    { owner: '너희', m: 'vuestro / vuestros', f: 'vuestra / vuestras', mean: '너희의' },
    { owner: '그들/당신들', m: 'suyo / suyos', f: 'suya / suyas', mean: '그들/당신들의' }
];

const QUIZ_DATA = [
    { id: 1, q: "빈칸 채우기 (나의 부모님): ( ) padres", options: ['Mi', 'Mis', 'Mío'], answer: 1, explain: "소유 대상(padres)이 복수이므로 전치형 복수 mis를 씁니다." },
    { id: 2, q: "후치형 사용 (그는 나의 친구이다): Él es un amigo ( ).", options: ['mi', 'mío', 'el mío'], answer: 1, explain: "명사 뒤에서 소유를 나타내거나 '내 친구 중 한 명'을 뜻할 때는 후치형 mío를 씁니다." },
    { id: 3, q: "'너의 것 (남성 단수)'을 뜻하는 소유대명사는?", options: ['El tu', 'El tuyo'], answer: 1, explain: "소유대명사는 [정관사 + 후치형 소유형용사] 구조인 'el tuyo'가 정답입니다." }
];

export default function PossessivesDetail() {
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
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 10</span>
                <ChevronRight size={10} />
                <span>Basic Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">소유 표현</h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               명사의 소유를 나타내는 형용사와 대명사를 학습합니다. <br/>
               일치는 '소유자'가 아닌 <strong>'소유물(명사)'</strong>의 성과 수에 맞추는 것이 핵심입니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium">
                  <li><strong>전치형</strong>: 명사 앞 (mi, tu, su...). 가장 일반적인 형태.</li>
                  <li><strong>후치형</strong>: 명사 뒤 (mío, tuyo...). 강조하거나 보어로 사용.</li>
                  <li><strong>소유대명사</strong>: 정관사 + 후치형 (el mío...). "~의 것"을 의미.</li>
              </ul>
          </div>

          {/* 1. 전치형 */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 소유형용사 - 전치형
            </h2>
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm mb-6">
                <table className="w-full text-[15px] text-left border-collapse">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 w-1/4">소유자</th>
                            <th className="px-5 py-3">단수 수식</th>
                            <th className="px-5 py-3">복수 수식</th>
                            <th className="px-5 py-3 text-right pr-8">의미</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {PRE_POSSESSIVE.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100">{row.owner}</td>
                                <td className="px-5 py-4 font-bold text-slate-900 italic">{row.sg}</td>
                                <td className="px-5 py-4 font-bold text-slate-900 italic">{row.pl}</td>
                                <td className="px-5 py-4 text-right pr-8 text-slate-500 text-sm">{row.mean}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-white border border-slate-200 rounded-lg flex flex-col gap-1">
                    <span className="font-bold text-slate-900 italic text-[15px]">mi libro / mis libros</span>
                    <span className="text-slate-400 text-xs font-normal">나의 책 / 나의 책들</span>
                </div>
                <div className="p-4 bg-white border border-slate-200 rounded-lg flex flex-col gap-1">
                    <span className="font-bold text-slate-900 italic text-[15px]">nuestra hija</span>
                    <span className="text-slate-400 text-xs font-normal">우리의 딸 (여성 단수 일치)</span>
                </div>
            </div>
          </section>

          {/* 2. 후치형 */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 소유형용사 - 후치형
            </h2>
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm mb-6">
                <table className="w-full text-[15px] text-left border-collapse">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 w-1/4">소유자</th>
                            <th className="px-5 py-3">남성 (단/복)</th>
                            <th className="px-5 py-3">여성 (단/복)</th>
                            <th className="px-5 py-3 text-right pr-8">의미</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {POST_POSSESSIVE.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100">{row.owner}</td>
                                <td className="px-5 py-4 font-bold text-slate-900">{row.m}</td>
                                <td className="px-5 py-4 font-bold text-slate-900">{row.f}</td>
                                <td className="px-5 py-4 text-right pr-8 text-slate-500 text-sm">{row.mean}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg flex flex-col gap-1">
                    <span className="font-bold text-slate-900 text-sm">용법 1: 강조</span>
                    <span className="text-slate-900 font-bold italic">¡Dios mío!</span>
                    <span className="text-slate-400 text-xs">오 마이 갓!</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg flex flex-col gap-1">
                    <span className="font-bold text-slate-900 text-sm">용법 2: 일부 지칭</span>
                    <span className="text-slate-900 font-bold italic">Un amigo mío.</span>
                    <span className="text-slate-400 text-xs">내 친구 중 한 명.</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg flex flex-col gap-1">
                    <span className="font-bold text-slate-900 text-sm">용법 3: 보어</span>
                    <span className="text-slate-900 font-bold italic">Este libro es tuyo.</span>
                    <span className="text-slate-400 text-xs">이 책은 너의 것이다.</span>
                </div>
            </div>
          </section>

          {/* 3. 소유대명사 */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 소유대명사 (Pronombres)
            </h2>
            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm space-y-4">
                <div className="bg-slate-50 p-4 rounded-lg text-center font-bold text-slate-900 border border-slate-100">
                    정관사 + 후치형 소유형용사
                </div>
                <div>
                    <p className="text-[15px] text-slate-900 font-bold italic">Mi coche es rojo y el tuyo es azul.</p>
                    <p className="text-xs text-slate-400 mt-1">나의 차는 빨간색이고, 너의 것은 파란색이다.</p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-start gap-3">
                    <Info size={16} className="text-slate-400 shrink-0 mt-0.5"/>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        <strong>ser 동사 뒤</strong>에서 소유주만 밝힐 때는 정관사를 주로 생략합니다. <br/>
                        <span className="text-slate-900 font-bold italic">¿Es este libro tuyo?</span> (이 책 네 거니?)
                    </p>
                </div>
            </div>
          </section>

          {/* 4. 중의성 해결 */}
          <section id="sec-4" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">4.</span> 중의성 해결 (Su / Suyo)
            </h2>
            
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <div className="mb-6 pb-6 border-b border-slate-100">
                    <h3 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                        <AlertTriangle size={16} className="text-slate-400"/> 문제점: 모호한 의미
                    </h3>
                    <div className="bg-slate-50 p-4 rounded-lg flex items-center gap-3">
                        <span className="text-lg font-bold text-slate-900 italic">su libro</span>
                        <ArrowRight size={16} className="text-slate-300" />
                        <span className="text-sm text-slate-500">그의? 그녀의? 당신의? 그들의? (알 수 없음)</span>
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                        <Check size={16} className="text-slate-400"/> 해결책: [정관사 + 명사 + de + 인칭대명사]
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                            <span className="text-[15px] font-bold text-slate-900 italic">el libro de él</span>
                            <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded">그의 책</span>
                        </div>
                        <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                            <span className="text-[15px] font-bold text-slate-900 italic">el libro de ella</span>
                            <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded">그녀의 책</span>
                        </div>
                        <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                            <span className="text-[15px] font-bold text-slate-900 italic">el libro de usted</span>
                            <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded">당신의 책</span>
                        </div>
                        <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                            <span className="text-[15px] font-bold text-slate-900 italic">el libro de ellos</span>
                            <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded">그들의 책</span>
                        </div>
                    </div>
                </div>
            </div>
          </section>

          {/* 5. 규칙 및 금칙 */}
          <section id="sec-5" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">5.</span> 중요 규칙 및 금칙 사항
            </h2>
            <div className="space-y-4">
                <div className="p-5 bg-yellow-50 border border-yellow-200 rounded-xl shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle size={18} className="text-slate-400" />
                        <h4 className="font-bold text-sm text-slate-800 uppercase">관사 중복 금지</h4>
                    </div>
                    <p className="text-[14px] text-slate-700 leading-relaxed font-medium">
                        소유형용사 전치형(mi, tu 등)은 정관사와 함께 쓸 수 없습니다. <br/>
                        <span className="line-through text-slate-400">el mi libro</span> <span className="mx-2 text-slate-300">→</span> <span className="text-slate-900 font-bold">mi libro</span>
                    </p>
                </div>
                <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <User size={18} className="text-slate-400" />
                        <h4 className="font-bold text-sm text-slate-800 uppercase">신체 부위 소유 표현</h4>
                    </div>
                    <p className="text-[14px] text-slate-700 leading-relaxed font-medium">
                        자신의 신체 부위를 말할 때는 소유격 대신 <strong>정관사</strong>를 사용하는 것이 원칙입니다. <br/>
                        <span className="text-slate-900 font-bold italic">Me lavo la cara.</span> (나는 내 얼굴을 씻는다.)
                    </p>
                </div>
            </div>
          </section>

          {/* 연습 문제 */}
          <section id="sec-6" className="scroll-mt-24 pt-8 border-t border-slate-200">
             <h2 className="text-[13px] font-black text-slate-400 mb-5 uppercase tracking-widest flex items-center gap-2">
                <CornerDownRight size={14} /> 연습 문제
             </h2>
             <div className="space-y-4">
                {QUIZ_DATA.map((q, idx) => (
                    <div key={q.id} className="bg-slate-50 p-4 rounded-lg border border-slate-200 shadow-sm text-[15px]">
                        <div className="flex items-baseline gap-3 mb-3">
                            <span className="text-slate-400 font-bold text-sm">Q{idx + 1}.</span>
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
            <ul className="space-y-3 text-[14px]">
                {['전치형 형용사', '후치형 형용사', '소유대명사', '중의성 해결', '중요 규칙', '연습 문제'].map((item, i) => (
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