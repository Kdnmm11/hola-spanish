'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, ArrowRight, Info, AlertTriangle, MapPin, User, Settings, Clock, Lightbulb, List, ArrowDownRight
} from 'lucide-react';

const OTHER_PREPS = [
    { p: 'sin', m: '~없이 (without)', ex: 'café sin azúcar (설탕 없는 커피)' },
    { p: 'sobre', m: '~위에, ~에 대해 (on/about)', ex: 'libro sobre arte (예술에 관한 책)' },
    { p: 'entre', m: '~사이에 (between)', ex: 'entre tú y yo (너와 나 사이에)' },
    { p: 'hasta', m: '~까지 (until)', ex: 'hasta mañana (내일까지)' },
    { p: 'desde', m: '~부터 (from/since)', ex: 'desde ayer (어제부터)' },
    { p: 'hacia', m: '~쪽으로 (towards)', ex: 'hacia el parque (공원 쪽으로)' },
    { p: 'ante', m: '~앞에 (직면하여)', ex: 'ante el juez (판사 앞에서)' },
    { p: 'bajo', m: '~아래에 (under)', ex: 'bajo la mesa (탁자 아래에)' },
    { p: 'contra', m: '~에 반대하여 (against)', ex: 'contra la pared (벽에 기대어/부딪혀)' },
    { p: 'según', m: '~에 따르면 (according to)', ex: 'según la ley (법에 따르면)' }
];

const QUIZ_DATA = [
    { id: 1, q: "빈칸 채우기 (개인적 a): veo (     ) mi amigo.", options: ['a', 'en', 'de'], answer: 0, explain: "특정한 '사람'을 목적어로 취할 때는 전치사 a(개인적 a)가 필수입니다." },
    { id: 2, q: "빈칸 채우기 (재료): la mesa es (     ) madera.", options: ['en', 'con', 'de'], answer: 1, explain: "재료나 소유를 나타낼 때는 전치사 de를 사용합니다." },
    { id: 3, q: "빈칸 채우기 (교통수단): voy al trabajo (     ) metro.", options: ['por', 'a', 'en'], answer: 2, explain: "교통수단을 타고 이동할 때는 전치사 en을 씁니다. (a caballo 등 예외 제외)" },
    { id: 4, q: "반의어 고르기: 'con leche' (우유를 넣은) <-> (     ) leche", options: ['sin', 'sobre', 'bajo'], answer: 0, explain: "con(with)의 반대말은 sin(without)입니다." }
];

export default function PrepositionsAdvancedDetail() {
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
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 31</span>
                <ChevronRight size={10} />
                <span>intermediate level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              주요 전치사 심화 (a, de, en, con)
            </h1>
            <p className="text-[16px] text-slate-600 font-medium leading-relaxed">
               스페인어 문장을 연결하는 핵심 4대 전치사의 다양한 의미와, 그 외 필수 전치사들을 정리합니다.
            </p>
          </header>

          <div className="mb-10 bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm text-slate-700">
              <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                  <Bookmark size={20} className="text-blue-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium text-blue-800">
                  <li><strong>a</strong>: 방향(→), 시각, 개인적 a (사람 목적어).</li>
                  <li><strong>de</strong>: 소유, 출처(←), 재료, 내용물.</li>
                  <li><strong>en</strong>: 장소(in/on), 교통수단, 시간(월/계절).</li>
                  <li><strong>con</strong>: 동반(with), 도구, 태도.</li>
              </ul>
          </div>

          {/* 1. a */}
          <section id="sec-1" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 전치사 a (방향과 목적)
            </h2>
            <p className="text-[15px] text-slate-600 mb-6 font-medium">가장 기본적으로 '이동의 방향(to)'을 나타내며, 시간과 사람 앞에서도 쓰입니다.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                    <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2"><ArrowRight size={18} className="text-blue-500"/> 이동의 방향</h4>
                    <p className="text-sm text-slate-500 mb-3">~에, ~로 (도착점 지향)</p>
                    <div className="bg-slate-50 p-3 rounded border-l-4 border-blue-400">
                        <p className="text-slate-900 font-bold italic">voy a la escuela.</p>
                        <p className="text-xs text-slate-400">학교에 간다.</p>
                    </div>
                </div>
                <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                    <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2"><Clock size={18} className="text-blue-500"/> 시각 표현</h4>
                    <p className="text-sm text-slate-500 mb-3">~시에 (정확한 시각)</p>
                    <div className="bg-slate-50 p-3 rounded border-l-4 border-blue-400">
                        <p className="text-slate-900 font-bold italic">comemos a las dos.</p>
                        <p className="text-xs text-slate-400">우리는 2시에 밥을 먹는다.</p>
                    </div>
                </div>
                <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm md:col-span-2">
                    <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2"><User size={18} className="text-blue-500"/> 개인적 a (a personal)</h4>
                    <p className="text-sm text-slate-500 mb-3">사람이나 의인화된 동물이 '직접목적어'일 때 반드시 씁니다.</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="bg-slate-50 p-3 rounded border-l-4 border-green-400 flex-1">
                            <p className="text-slate-900 font-bold italic">veo <span className="text-blue-600">a</span> maría.</p>
                            <p className="text-xs text-slate-400">마리아를 본다. (사람 O)</p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded border-l-4 border-slate-300 flex-1 opacity-70">
                            <p className="text-slate-900 font-bold italic">veo el edificio.</p>
                            <p className="text-xs text-slate-400">건물을 본다. (사람 X → a 없음)</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <span className="text-xs font-black text-blue-500 uppercase tracking-widest block mb-2">관용 표현</span>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-blue-900 font-medium">
                    <span>a pie (걸어서)</span>
                    <span>a veces (가끔)</span>
                    <span>a menudo (종종)</span>
                    <span>a tiempo (제시간에)</span>
                </div>
            </div>
          </section>

          {/* 2. de */}
          <section id="sec-2" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 전치사 de (기원과 소유)
            </h2>
            <p className="text-[15px] text-slate-600 mb-6 font-medium">'~의', '~로부터'를 뜻하며 영어의 of, from과 비슷합니다.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                    <h4 className="font-bold text-slate-800 mb-2">소유 및 관계</h4>
                    <p className="text-sm text-slate-500 mb-3">'s (소유격) 대신 사용</p>
                    <div className="bg-slate-50 p-3 rounded border-l-4 border-indigo-400">
                        <p className="text-slate-900 font-bold italic">el coche de juan.</p>
                        <p className="text-xs text-slate-400">후안의 차.</p>
                    </div>
                </div>
                <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                    <h4 className="font-bold text-slate-800 mb-2">출처 및 기원</h4>
                    <p className="text-sm text-slate-500 mb-3">~ 출신이다, ~에서 왔다</p>
                    <div className="bg-slate-50 p-3 rounded border-l-4 border-indigo-400">
                        <p className="text-slate-900 font-bold italic">soy de corea.</p>
                        <p className="text-xs text-slate-400">나는 한국 출신이다.</p>
                    </div>
                </div>
                <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                    <h4 className="font-bold text-slate-800 mb-2">재료</h4>
                    <p className="text-sm text-slate-500 mb-3">~로 만들어진</p>
                    <div className="bg-slate-50 p-3 rounded border-l-4 border-indigo-400">
                        <p className="text-slate-900 font-bold italic">mesa de madera.</p>
                        <p className="text-xs text-slate-400">나무 탁자.</p>
                    </div>
                </div>
                <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                    <h4 className="font-bold text-slate-800 mb-2">주제/내용</h4>
                    <p className="text-sm text-slate-500 mb-3">~에 대한, ~가 든</p>
                    <div className="bg-slate-50 p-3 rounded border-l-4 border-indigo-400">
                        <p className="text-slate-900 font-bold italic">clase de español.</p>
                        <p className="text-xs text-slate-400">스페인어 수업.</p>
                    </div>
                </div>
            </div>

            <div className="mt-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                <span className="text-xs font-black text-indigo-500 uppercase tracking-widest block mb-2">관용 표현</span>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-indigo-900 font-medium">
                    <span>de nada (천만에요)</span>
                    <span>de nuevo (다시)</span>
                    <span>de pie (서서)</span>
                    <span>de vacaciones (휴가 중)</span>
                </div>
            </div>
          </section>

          {/* 3. en */}
          <section id="sec-3" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 전치사 en (위치와 수단)
            </h2>
            <p className="text-[15px] text-slate-600 mb-6 font-medium">'~에(in/on)'를 뜻하며 장소와 교통수단에 주로 쓰입니다.</p>
            
            <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600"><MapPin size={20}/></div>
                    <div>
                        <h4 className="font-bold text-slate-900 text-base">장소 (위치)</h4>
                        <p className="text-sm text-slate-500 mb-2">안(in)과 위(on)를 모두 포함합니다.</p>
                        <div className="flex gap-4 text-sm">
                            <span className="text-slate-800 italic font-bold">en la caja (상자 안에)</span>
                            <span className="text-slate-800 italic font-bold">en la mesa (탁자 위에)</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600"><Settings size={20}/></div>
                    <div>
                        <h4 className="font-bold text-slate-900 text-base">교통수단</h4>
                        <p className="text-sm text-slate-500 mb-2">'~을 타고' (관사 없이 사용)</p>
                        <div className="flex gap-4 text-sm">
                            <span className="text-slate-800 italic font-bold">en autobús</span>
                            <span className="text-slate-800 italic font-bold">en coche</span>
                            <span className="text-slate-800 italic font-bold">en avión</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600"><Clock size={20}/></div>
                    <div>
                        <h4 className="font-bold text-slate-900 text-base">시간 (월, 계절, 연도)</h4>
                        <p className="text-sm text-slate-500 mb-2">긴 시간 단위에 사용합니다.</p>
                        <div className="flex gap-4 text-sm">
                            <span className="text-slate-800 italic font-bold">en verano (여름에)</span>
                            <span className="text-slate-800 italic font-bold">en 2024</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <span className="text-xs font-black text-emerald-600 uppercase tracking-widest block mb-2">관용 표현</span>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-emerald-900 font-medium">
                    <span>en serio (진짜로)</span>
                    <span>en broma (농담으로)</span>
                    <span>en casa (집에)</span>
                    <span>en punto (정각에)</span>
                </div>
            </div>
          </section>

          {/* 4. con */}
          <section id="sec-4" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">4.</span> 전치사 con (동반과 도구)
            </h2>
            <p className="text-[15px] text-slate-600 mb-6 font-medium">'~와 함께(with)'를 기본으로 도구, 태도를 나타냅니다.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm text-center">
                    <h4 className="font-bold text-slate-800 mb-2">동반</h4>
                    <p className="text-slate-900 italic font-bold mb-1">con mis amigos</p>
                    <p className="text-xs text-slate-400">내 친구들과 함께</p>
                </div>
                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm text-center">
                    <h4 className="font-bold text-slate-800 mb-2">도구</h4>
                    <p className="text-slate-900 italic font-bold mb-1">con un cuchillo</p>
                    <p className="text-xs text-slate-400">칼을 가지고(칼로)</p>
                </div>
                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm text-center">
                    <h4 className="font-bold text-slate-800 mb-2">태도/양태</h4>
                    <p className="text-slate-900 italic font-bold mb-1">con cuidado</p>
                    <p className="text-xs text-slate-400">조심스럽게</p>
                </div>
            </div>

            <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-center gap-4">
                <AlertTriangle className="text-amber-500 shrink-0"/>
                <div>
                    <h5 className="font-bold text-amber-900 text-sm mb-1">인칭대명사 결합 특수형</h5>
                    <p className="text-sm text-amber-800">
                        con + mí = <span className="font-black">conmigo</span> (나와 함께) / 
                        con + ti = <span className="font-black">contigo</span> (너와 함께)
                    </p>
                </div>
            </div>
          </section>

          {/* 5. 그 외 필수 전치사 */}
          <section id="sec-5" className="mb-16 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">5.</span> 그 외 필수 전치사
            </h2>
            <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
                <table className="w-full text-[15px] text-center border-collapse min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm">
                        <tr>
                            <th className="px-5 py-4 w-1/4">전치사</th>
                            <th className="px-5 py-4 w-1/4">의미</th>
                            <th className="px-5 py-4 w-1/2">예시</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {OTHER_PREPS.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                <td className="px-5 py-3 font-black text-slate-900">{row.p}</td>
                                <td className="px-5 py-3 text-slate-600 font-medium">{row.m}</td>
                                <td className="px-5 py-3 text-left pl-10 italic text-slate-500">{row.ex}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 연습 문제 */}
          <section id="sec-6" className="scroll-mt-24 pt-8 border-t border-slate-200">
             <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Lightbulb className="text-yellow-500 fill-yellow-500" size={20} />
                기초 다지기 (práctica)
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
                {['a (방향/목적)', 'de (소유/출처)', 'en (위치/수단)', 'con (동반/도구)', '그 외 전치사', '연습 문제'].map((item, i) => (
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