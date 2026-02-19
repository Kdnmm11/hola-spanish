'use client';

import React, { useState } from 'react';
import { 
  Check, X, ChevronRight, Bookmark, AlertTriangle, Info, Lightbulb
} from 'lucide-react';

const ARTICLE_TABLE = [
    { type: '정관사', gender: '남성', sg: 'el', pl: 'los', mean: "특정한 것 / 이미 아는 것" },
    { type: '정관사', gender: '여성', sg: 'la', pl: 'las', mean: "" },
    { type: '부정관사', gender: '남성', sg: 'un', pl: 'unos', mean: "막연한 것 / 하나" },
    { type: '부정관사', gender: '여성', sg: 'una', pl: 'unas', mean: "복수형은 '약간의'" }
];

const COMPARISON_DATA = [
    { cond: '대상의 인지', def: "너와 내가 아는 '그것'", indef: "막연한 '어떤 것' 하나" },
    { cond: '존재 표현', def: 'Estar + 정관사 (위치)', indef: 'Hay + 부정관사 (존재)' },
    { cond: '신체/소유', def: '항상 정관사 사용', indef: '거의 사용하지 않음' },
    { cond: '직업 수식', def: '특정 인물 지칭 시', indef: '형용사가 수식할 때' }
];

const DEFINITE_ARTICLES = ['el', 'la', 'los', 'las', 'al', 'del'];
const INDEFINITE_ARTICLES = ['un', 'una', 'unos', 'unas'];
const ALL_ARTICLES = [...DEFINITE_ARTICLES, ...INDEFINITE_ARTICLES];

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const highlightWords = (
    text: string,
    words: string[],
    className: string,
    limit = Number.POSITIVE_INFINITY
) => {
    if (words.length === 0) {
        return text;
    }

    const lowerSet = new Set(words.map((word) => word.toLowerCase()));
    const pattern = new RegExp(`\\b(${words.map(escapeRegex).join('|')})\\b`, 'gi');
    let highlightedCount = 0;

    return text.split(pattern).map((part, idx) => {
        if (lowerSet.has(part.toLowerCase()) && highlightedCount < limit) {
            highlightedCount += 1;
            return (
                <span key={`${part}-${idx}`} className={className}>
                    {part}
                </span>
            );
        }

        return part;
    });
};

const DEFINITE_USE_CASES = [
    {
        title: '이미 언급된 대상 재지칭',
        example: 'Compré un libro. El libro es muy bueno.',
        translation: '책 한 권을 샀다. 그 책은 아주 좋다.',
        note: '첫 언급은 부정관사, 재언급은 정관사가 기본입니다.'
    },
    {
        title: '유일하거나 모두가 아는 대상',
        example: 'El sol sale por el este.',
        translation: '태양은 동쪽에서 뜬다.',
        note: '세상에 하나뿐이거나 문맥상 고유한 대상에 씁니다.',
        highlightLimit: 1
    },
    {
        title: '일반적/보편적 개념 전체를 대표',
        example: 'La música es importante.',
        translation: '음악은 중요하다.',
        note: '개별 음악이 아니라 범주 전체를 말할 때 정관사를 씁니다.'
    },
    {
        title: '요일을 습관적으로 말할 때',
        example: 'Trabajo los lunes.',
        translation: '나는 월요일마다 일한다.',
        note: '반복 습관(매주) 의미에서 요일 앞 정관사를 사용합니다.'
    },
    {
        title: '신체 부위/의복 표현',
        example: 'Me duele la cabeza.',
        translation: '머리가 아프다.',
        note: '소유형용사(mi/tu) 대신 정관사가 자주 옵니다.'
    },
    {
        title: '최상급 구조',
        example: 'Es la ciudad más grande del país.',
        translation: '그곳은 그 나라에서 가장 큰 도시다.',
        note: 'lo/la/los/las + más/menos 구조에서 정관사가 필수입니다.'
    }
];

const INDEFINITE_USE_CASES = [
    {
        title: '처음 등장하는 대상 소개',
        example: 'Veo una casa grande.',
        translation: '큰 집 한 채가 보인다.',
        note: '청자에게 새롭게 제시하는 정보에 씁니다.'
    },
    {
        title: '여러 개 중 하나를 선택',
        example: 'Quiero un café.',
        translation: '커피 한 잔 원해요.',
        note: '특정 브랜드/컵이 아닌 막연한 하나입니다.'
    },
    {
        title: '직업/신분 + 수식어',
        example: 'Es un profesor excelente.',
        translation: '그는 훌륭한 선생님이다.',
        note: '직업 앞 관사는 보통 생략하지만, 형용사 수식이 있으면 자주 씁니다.'
    },
    {
        title: '복수형으로 일부/약간',
        example: 'Compré unas manzanas.',
        translation: '사과를 좀 샀다.',
        note: 'unos/unas는 some(일부) 의미를 만들 수 있습니다.'
    },
    {
        title: '대략적 수량 표현',
        example: 'Unos 20 minutos.',
        translation: '약 20분 정도.',
        note: '숫자 앞에서 대략(about) 의미를 줍니다.'
    },
    {
        title: '이야기 도입에서 새 인물 제시',
        example: 'Había una vez un rey.',
        translation: '옛날에 한 왕이 있었다.',
        note: '서사 시작에서 새 대상 도입에 매우 자주 쓰입니다.'
    }
];

const NO_ARTICLE_CASES = [
    {
        title: 'Ser + 직업/신분 (일반 서술)',
        example: 'Mi hermana es ingeniera.',
        translation: '내 여동생은 엔지니어다.',
        rule: '직업/신분을 일반 속성으로 말할 때는 보통 관사를 생략합니다.',
        caution: '수식어가 붙으면 관사 가능: Mi hermana es una ingeniera brillante.'
    },
    {
        title: '언어 이름을 말할 때',
        example: 'Hablo español e inglés.',
        translation: '나는 스페인어와 영어를 말한다.',
        rule: 'hablar / estudiar / aprender 뒤 언어명은 무관사가 기본입니다.',
        caution: '언어 자체를 주제로 강조하면 정관사 가능: El español de Chile.'
    },
    {
        title: '오늘/내일 + 요일',
        example: 'Hoy es martes.',
        translation: '오늘은 화요일이다.',
        rule: '현재 날짜의 요일을 말할 때는 보통 관사를 쓰지 않습니다.',
        caution: '반복 습관은 정관사 사용: Los martes hago ejercicio.'
    },
    {
        title: 'en + 교통수단',
        example: 'Vamos en metro.',
        translation: '우리는 지하철로 간다.',
        rule: '교통수단을 일반적으로 말할 때는 무관사로 쓰는 경우가 많습니다.',
        caution: '특정 노선/수단을 지칭하면 관사 가능: Tomamos el metro de la línea 2.'
    },
    {
        title: 'Hay + 막연한 존재',
        example: 'Hay libros en la mesa.',
        translation: '테이블 위에 책들이 있다.',
        rule: 'hay는 핵심 명사구(여기서는 libros)와 정관사를 직접 결합하지 않습니다.',
        caution: '특정 대상을 말하면 estar + 정관사 사용: Los libros están en la mesa.',
        exampleHighlightWords: [],
        cautionHighlightWords: ['los']
    },
    {
        title: '인명/도시 같은 고유명사',
        example: 'Ana vive en Madrid.',
        translation: '아나는 마드리드에 산다.',
        rule: '인명과 대부분의 도시명 앞에는 관사를 쓰지 않습니다.',
        caution: '강, 산맥, 일부 지명은 정관사 사용: el Amazonas, los Andes.'
    }
];

const ON_THIS_PAGE = [
    { id: 'sec-1', label: '관사의 체계' },
    { id: 'sec-2', label: '상세 용법' },
    { id: 'sec-3', label: '주요 차이점' },
    { id: 'sec-4', label: '주의사항' },
    { id: 'sec-5', label: '무관사 규칙' },
    { id: 'sec-6', label: '연습 문제' }
];

const QUIZ_DATA = [
    { id: 1, q: "차 열쇠를 찾을 때 (특정): ¿Dónde está (     ) llave?", options: ['La', 'Una'], answer: 0, explain: "화자와 청자가 모두 알고 있는 특정한 대상을 물을 때는 정관사 la를 씁니다." },
    { id: 2, q: "Hay 동사 뒤에 올 수 없는 형태는?", options: ['Un libro', 'El libro'], answer: 1, explain: "Hay는 막연한 존재를 처음 밝힐 때 쓰므로 정관사(El)와 함께 쓸 수 없습니다." },
    { id: 3, q: "'a + el'의 올바른 축약형은?", options: ['ael', 'al'], answer: 1, explain: "전치사 a와 남성 정관사 el이 만나면 항상 al로 축약됩니다." },
    { id: 4, q: "부정관사 복수형 'unos / unas'의 주된 의미는?", options: ['그것들', '약간의 / 대략', '모든'], answer: 1, explain: "부정관사의 복수형은 '약간의' 또는 숫자 앞에서 '대략'이라는 의미를 가집니다." }
];

export default function ArticlesDetail() {
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
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">Chapter 5</span>
                <ChevronRight size={10} />
                <span>Basic Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              관사 (Artículos)
            </h1>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
               명사의 성과 수에 따라 형태가 결정되며, 대상의 특정 여부에 따라 정관사와 부정관사로 나뉩니다.
            </p>
          </header>

          <div className="mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm text-slate-700">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bookmark size={18} className="text-slate-400"/> 핵심 요약
              </h3>
              <ul className="space-y-2 text-[15px] list-disc list-inside leading-relaxed font-medium">
                  <li><strong>정관사(el/la)</strong>: 특정한 대상, 이미 언급된 것, 유일한 것에 사용합니다.</li>
                  <li><strong>부정관사(un/una)</strong>: 막연한 하나, 처음 언급하는 것에 사용합니다.</li>
                  <li><strong>축약</strong>: a + el = <strong>al</strong> / de + el = <strong>del</strong> (남성 단수만 해당)</li>
              </ul>
          </div>

          {/* 1. 관사의 체계 */}
          <section id="sec-1" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">1.</span> 관사의 체계 및 분류
            </h2>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm w-full">
                <table className="w-full text-base text-left border-collapse min-w-[500px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm">
                        <tr>
                            <th className="px-5 py-4 w-32 border-r border-slate-100 whitespace-nowrap text-center">구분</th>
                            <th className="px-5 py-4 w-24 whitespace-nowrap text-center">성별</th>
                            <th className="px-5 py-4 w-24 whitespace-nowrap text-center">단수</th>
                            <th className="px-5 py-4 w-24 border-r border-slate-100 whitespace-nowrap text-center">복수</th>
                            <th className="px-5 py-4 whitespace-nowrap text-center">의미 / 특징</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {ARTICLE_TABLE.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 font-black text-slate-900 bg-slate-50/30 border-r border-slate-100 align-middle tracking-tight text-sm whitespace-nowrap text-center">
                                    {row.type}
                                </td>
                                <td className="px-5 py-4 text-slate-600 font-medium whitespace-nowrap text-center">{row.gender}</td>
                                <td className="px-5 py-4 font-bold text-blue-600 whitespace-nowrap text-center">{row.sg}</td>
                                <td className="px-5 py-4 font-bold text-blue-600 border-r border-slate-100 whitespace-nowrap text-center">{row.pl}</td>
                                <td className="px-5 py-4 text-slate-500 text-sm whitespace-nowrap font-medium align-middle text-center">
                                    {row.mean || (row.type === '정관사' ? '"' : row.mean)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 2. 상세 정리 */}
          <section id="sec-2" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">2.</span> 관사별 상세 용법
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
                {/* Definite */}
                <div className="space-y-4">
                    <h3 className="text-base font-bold text-blue-800 tracking-widest pl-3 border-l-4 border-blue-500">
                        정관사 (Definidos)
                    </h3>
                    <div className="space-y-4">
                        {DEFINITE_USE_CASES.map((item, i) => (
                            <div key={i} className="bg-blue-50/60 border border-blue-200 p-6 rounded-xl shadow-sm">
                                <p className="text-sm font-bold text-blue-700 mb-3 tracking-wide">{item.title}</p>
                                <p className="text-lg text-slate-900 mb-1">
                                    {highlightWords(item.example, DEFINITE_ARTICLES, 'text-blue-700 font-bold', item.highlightLimit)}
                                </p>
                                <p className="text-xs text-slate-500">{item.translation}</p>
                                <p className="text-xs text-blue-700/90 mt-3 font-medium">{item.note}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Indefinite */}
                <div className="space-y-4">
                    <h3 className="text-base font-bold text-emerald-800 tracking-widest pl-3 border-l-4 border-emerald-500">
                        부정관사 (Indefinidos)
                    </h3>
                    <div className="space-y-4">
                        {INDEFINITE_USE_CASES.map((item, i) => (
                            <div key={i} className="bg-emerald-50/60 border border-emerald-200 p-6 rounded-xl shadow-sm">
                                <p className="text-sm font-bold text-emerald-700 mb-3 tracking-wide">{item.title}</p>
                                <p className="text-lg text-slate-900 mb-1">
                                    {highlightWords(item.example, INDEFINITE_ARTICLES, 'text-emerald-700 font-bold')}
                                </p>
                                <p className="text-xs text-slate-500">{item.translation}</p>
                                <p className="text-xs text-emerald-700/90 mt-3 font-medium">{item.note}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          </section>

          {/* 3. 비교 */}
          <section id="sec-3" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">3.</span> 주요 차이점 비교
            </h2>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-base border-collapse text-left min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-sm">
                        <tr>
                            <th className="px-5 py-4 w-1/4 border-r border-slate-100 whitespace-nowrap text-left">상황</th>
                            <th className="px-5 py-4 w-1/3 border-r border-slate-100 font-bold text-blue-700 whitespace-nowrap text-left">정관사 (el/la)</th>
                            <th className="px-5 py-4 font-bold text-indigo-700 whitespace-nowrap text-left">부정관사 (un/una)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {COMPARISON_DATA.map((r, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-4 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100 whitespace-nowrap text-left">{r.cond}</td>
                                <td className="px-5 py-4 text-slate-700 border-r border-slate-100 font-medium whitespace-nowrap text-left">{r.def}</td>
                                <td className="px-5 py-4 text-slate-700 font-medium whitespace-nowrap text-left">{r.indef}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          {/* 4. 예외 */}
          <section id="sec-4" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">4.</span> 예외 및 주의사항
            </h2>
            <div className="space-y-4">
                <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-xl shadow-sm text-yellow-900">
                    <h4 className="font-bold text-base mb-3 flex items-center gap-2">
                        <AlertTriangle size={18}/> 여성 명사 앞의 &apos;el&apos;
                    </h4>
                    <p className="text-[15px] leading-relaxed font-medium">
                        강세 있는 <strong>a- / ha-</strong>로 시작하는 여성 단수 명사는 발음상 <strong>el</strong>을 씁니다. <br/>
                        <span className="inline-block mt-3 bg-white px-4 py-2 rounded-lg border border-yellow-100 font-bold text-slate-900 shadow-sm text-left">
                            <span className="text-blue-600">El</span> agua, <span className="text-blue-600">El</span> hambre
                        </span>
                    </p>
                </div>
                
                <div className="p-6 bg-slate-50 border border-slate-100 rounded-xl shadow-sm text-slate-700">
                    <h4 className="font-bold text-base mb-6 flex items-center gap-2 border-b border-slate-200 pb-3">
                        <Info size={18} className="text-slate-400" /> 관사의 축약 및 생략
                    </h4>
                    <div className="space-y-6 px-2">
                        <div className="flex items-center gap-6 text-[15px]">
                            <span className="font-bold text-slate-400 text-xs tracking-wider shrink-0 w-20">축약 규칙</span>
                            <div className="flex gap-10 font-medium text-lg items-baseline">
                                <p>a + el = <span className="font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded ml-1">al</span></p>
                                <p>de + el = <span className="font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded ml-1">del</span></p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 text-[15px] border-t border-slate-100 pt-6">
                            <span className="font-bold text-slate-400 text-xs tracking-wider shrink-0 w-20">생략 원칙</span>
                            <p className="font-medium">
                                직업(Soy médico), 국적, 언어 등에는 관사를 쓰지 않는 것이 원칙입니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
          </section>

          {/* 5. 무관사 */}
          <section id="sec-5" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-rose-600">5.</span> 관사를 쓰지 않는 경우 (무관사)
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
                {NO_ARTICLE_CASES.map((item) => (
                    <div key={item.title} className="h-full bg-rose-50/60 border border-rose-200 p-6 rounded-xl shadow-sm">
                        <p className="text-sm font-bold text-rose-700 mb-3 tracking-wide">{item.title}</p>
                        <p className="text-lg text-slate-900 mb-1">
                            {highlightWords(
                                item.example,
                                item.exampleHighlightWords ?? ALL_ARTICLES,
                                'text-rose-700 font-bold'
                            )}
                        </p>
                        <p className="text-xs text-slate-500">{item.translation}</p>
                        <p className="text-xs text-rose-700/90 mt-3 font-medium">{item.rule}</p>
                        <p className="text-xs text-slate-500 mt-1">
                            {highlightWords(
                                item.caution,
                                item.cautionHighlightWords ?? ALL_ARTICLES,
                                'text-rose-700 font-bold'
                            )}
                        </p>
                    </div>
                ))}
            </div>
          </section>

          {/* 연습 문제 */}
          <section id="sec-6" className="scroll-mt-24 pt-8 border-t border-slate-200">
             <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Lightbulb className="text-yellow-500 fill-yellow-500" size={20} />
                기초 다지기 (Práctica)
             </h2>
             <div className="space-y-4">
                {QUIZ_DATA.map((q, idx) => (
                    <div key={q.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-all">
                        <div className="flex items-start gap-3 mb-4">
                            <span className="bg-indigo-100 text-indigo-600 text-xs font-bold px-2.5 py-1 rounded-full mt-0.5">Q{idx + 1}</span>
                            <p className="font-bold text-slate-800 text-base leading-snug whitespace-pre-wrap">{q.q}</p>
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
                {ON_THIS_PAGE.map((item) => (
                    <li key={item.id}>
                        <button onClick={() => scrollTo(item.id)} className="text-slate-500 hover:text-blue-600 transition-colors text-left flex items-center gap-2 group font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-blue-600 transition-colors shadow-sm"></div>
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
      </aside>
    </div>
  );
}
