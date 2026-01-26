'use client';

import React, { useState, useEffect, useRef, Suspense, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { vocabData, Vocabulary, WordCategory, VerbConjugation } from '@/data/vocabulary';
import { 
  Search, Volume2, Star, Book, ChevronRight, Hash, 
  Sparkles, MoreHorizontal, StickyNote, Repeat, ArrowLeft, 
  Layers, Grid, ArrowRight, Dog, User, Home, Coffee, Dumbbell, GraduationCap, CheckCircle2, ChevronDown, ChevronUp, Heart, Type 
} from 'lucide-react';

// --- Helper: Get Korean Choseong (Initial Consonant) ---
const getChoseong = (str: string) => {
  const choseong = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
  const code = str.charCodeAt(0) - 0xac00;
  if (code > -1 && code < 11172) return choseong[Math.floor(code / 588)];
  return str.charAt(0);
};

// --- Helper for Verb Conjugation Styling ---
const renderConjugatedVerb = (verb: string) => {
  if (!verb) return null;
  const len = verb.length;
  let stem = verb;
  let suffix = "";

  if (len > 3) {
     if (['o', 'as', 'es', 'a', 'e', 'an', 'en', 'é', 'ás', 'á', 'emos', 'éis', 'án', 'ando', 'iendo', 'ado', 'ido'].some(s => verb.endsWith(s))) {
        let cut = 1;
        if (verb.endsWith('ando') || verb.endsWith('iendo')) cut = 4;
        else if (verb.endsWith('ado') || verb.endsWith('ido')) cut = 3;
        else if (verb.endsWith('mos') || verb.endsWith('is')) cut = 2;
        else if (verb.endsWith('emos') || verb.endsWith('éis')) cut = 4; 
        stem = verb.slice(0, -cut);
        suffix = verb.slice(-cut);
        if (['as', 'es', 'an', 'en', 'ás', 'án'].some(s => verb.endsWith(s))) {
            stem = verb.slice(0, -2);
            suffix = verb.slice(-2);
        }
     }
  }
  return (
    <span>
      <span className="text-black">{stem}</span>
      <span className="text-red-600 font-bold">{suffix}</span>
    </span>
  );
};

type TenseType = keyof VerbConjugation | 'participles';

function VocabularyContent() {
  const searchParams = useSearchParams();
  const currentTheme = searchParams.get('theme') as WordCategory | null;

  const [selectedWordId, setSelectedWordId] = useState<string | null>(null);
  const [isConjugationOpen, setIsConjugationOpen] = useState(true);
  const [activeTense, setActiveTense] = useState<TenseType>('present');
  const itemRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const titleSize = 3.5; 
  const meaningSize = 2;
  const sectionSize = 3;
  const textSize = 2; 

  const getSizeClass = (level: number, type: 'title' | 'meaning' | 'text' | 'section') => {
      const sizes = ['text-[10px]', 'text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl', 'text-8xl'];
      if (type === 'title') return sizes[Math.min(Math.floor(level + 4), sizes.length - 1)];
      if (type === 'meaning') return sizes[Math.min(level + 2, sizes.length - 1)]; 
      if (type === 'text') return sizes[Math.min(level + 1, sizes.length - 1)]; 
      return sizes[Math.min(level - 1, sizes.length - 1)]; 
  };

  const fonts = {
      title: getSizeClass(titleSize, 'title'),
      meaning: getSizeClass(meaningSize, 'meaning'),
      section: getSizeClass(sectionSize, 'section'),
      text: getSizeClass(textSize, 'text')
  };

  // --- Grouping Logic for Home View ---
  const groupedCategories = useMemo(() => {
      const categories = Array.from(new Set(vocabData.map(v => v.category)));
      categories.sort((a, b) => a.localeCompare(b, 'ko'));
      
      const groups: { [key: string]: WordCategory[] } = {};
      categories.forEach(cat => {
          const char = getChoseong(cat);
          if (!groups[char]) groups[char] = [];
          groups[char].push(cat as WordCategory);
      });
      return groups;
  }, []);

  const filteredWords = currentTheme 
    ? vocabData.filter(word => word.category === currentTheme)
    : [];

  useEffect(() => {
    if (filteredWords.length > 0) {
      setSelectedWordId(filteredWords[0].id);
    } else {
      setSelectedWordId(null);
    }
  }, [currentTheme]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!currentTheme || filteredWords.length === 0) return;
      const currentIndex = filteredWords.findIndex(w => w.id === selectedWordId);
      if (currentIndex === -1) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = Math.min(currentIndex + 1, filteredWords.length - 1);
        const nextWordId = filteredWords[nextIndex].id;
        setSelectedWordId(nextWordId);
        itemRefs.current[nextWordId]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = Math.max(currentIndex - 1, 0);
        const prevWordId = filteredWords[prevIndex].id;
        setSelectedWordId(prevWordId);
        itemRefs.current[prevWordId]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedWordId, currentTheme, filteredWords]);

  const selectedWord = vocabData.find(w => w.id === selectedWordId);

  const getConjugationList = (tense: TenseType) => {
      if (!selectedWord?.detail.conjugation) return [];
      const conj = selectedWord.detail.conjugation;
      if (tense === 'participles') return [];
      if (Array.isArray(conj)) return tense === 'present' ? conj : [];
      const data = conj[tense as keyof VerbConjugation];
      if (Array.isArray(data)) return data;
      return [];
  };

  const hasConjugation = !!selectedWord?.detail.conjugation;

  // --- VIEW 1: Grouped Theme Selection ---
  if (!currentTheme) {
    return (
      <div className="max-w-6xl mx-auto pb-20 pt-4">
         <header className="mb-12 border-b border-gray-100 pb-8 text-center">
            <h1 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">단어장 테마</h1>
            <p className="text-gray-500 text-lg font-medium">총 55개의 챕터를 초성별로 정리했습니다.</p>
         </header>
         
         <div className="space-y-12">
            {Object.keys(groupedCategories).sort().map(choseong => (
                <section key={choseong}>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-black shadow-lg shadow-indigo-100 relative group cursor-default">
                            {choseong}
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white font-bold shadow-sm">
                                {groupedCategories[choseong].length}
                            </div>
                        </div>
                        <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent"></div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                        {groupedCategories[choseong].map((cat) => {
                            const count = vocabData.filter(w => w.category === cat).length;
                            return (
                                <Link key={cat} href={`/vocabulary?theme=${cat}`} className="group block">
                                    <div className="bg-white border border-gray-200 rounded-2xl p-4 hover:border-indigo-400 hover:shadow-md transition-all h-full flex flex-col justify-between">
                                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2">{cat}</h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-medium text-gray-400">{count} 단어</span>
                                            <ChevronRight size={12} className="text-gray-300 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            ))}
         </div>
      </div>
    );
  }

  // --- VIEW 2: Learning View ---
  return (
    <div className="flex flex-col h-[calc(100vh-100px)] overflow-hidden">
      <header className="shrink-0 mb-4 flex items-center gap-4">
         <Link href="/vocabulary" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 text-gray-500 transition-colors">
            <ArrowLeft size={16} />
         </Link>
         <h1 className="text-lg font-bold text-gray-900">{currentTheme}</h1>
      </header>

      <div className="flex-1 overflow-x-auto pb-4 no-scrollbar">
        <div className="flex gap-6 h-full justify-start p-1" style={{ width: `1088px` }}>
          
          <div className="flex-none flex flex-col bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden h-full" style={{ width: '260px' }}>
            <div className="p-3 border-b border-gray-100 bg-white z-10">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="검색..." className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-transparent focus:bg-white focus:border-gray-300 rounded-lg text-xs outline-none transition-all" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1.5 no-scrollbar hover:overflow-y-auto" tabIndex={0}>
              {filteredWords.map((word) => {
                const isActive = selectedWordId === word.id;
                return (
                  <button
                    key={word.id}
                    ref={(el) => { itemRefs.current[word.id] = el; }}
                    onClick={() => setSelectedWordId(word.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all duration-200 group relative border flex flex-col gap-1 outline-none ${isActive ? 'bg-slate-100 border-blue-200 ring-1 ring-blue-200 shadow-sm' : 'bg-white border-transparent hover:bg-indigo-50 text-gray-700'}`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className={`font-bold text-sm ${isActive ? 'text-blue-700' : 'text-gray-900'}`}>{word.es}</span>
                      <Volume2 size={12} className={isActive ? 'text-blue-400' : 'text-gray-300'} />
                    </div>
                    <div className={`text-[10px] line-clamp-1 ${isActive ? 'text-slate-600' : 'text-gray-500'}`}>
                      {word.meanings.map((m, idx) => (<span key={idx}><span className="opacity-70 mr-1 italic">{m.pos}</span>{m.text}</span>))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex-none bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden h-full flex flex-col relative" style={{ width: '520px' }}>
            {selectedWord ? (
              <div className="flex-1 overflow-y-auto no-scrollbar">
                <div className="p-6">
                   <div className="flex justify-between items-start mb-4">
                      <h2 className={`${fonts.title} font-extrabold text-blue-600 tracking-tight leading-tight`}>{selectedWord.es}</h2>
                      <div className="flex gap-2">
                         <button className="p-2 text-indigo-400 hover:text-indigo-600 transition-colors"><Volume2 size={24} /></button>
                         <button className="p-2 text-red-400 hover:text-red-500 transition-colors"><Heart size={24} /></button>
                      </div>
                   </div>
                   <div className="mb-6">
                      <h3 className={`${fonts.section} font-bold text-indigo-900 mb-1 uppercase tracking-wider`}>뜻</h3>
                      {selectedWord.meanings.map((m, i) => (
                         <p key={i} className={`${fonts.meaning} text-slate-800 font-bold`}>
                            <span className="text-slate-400 text-[0.7em] mr-2 italic font-normal align-middle">{m.pos}</span>
                            {m.text}
                         </p>
                      ))}
                   </div>
                   <hr className="border-slate-100 mb-6" />
                   {selectedWord.detail.idioms && selectedWord.detail.idioms.length > 0 && (
                      <div className="mb-6">
                         <h3 className={`${fonts.section} font-bold text-indigo-900 mb-2 uppercase tracking-wider`}>관용구</h3>
                         <div className="space-y-2">
                            {selectedWord.detail.idioms.map((idiom, i) => (
                               <div key={i} className={fonts.text}>
                                  <p className="text-slate-800 font-bold">{idiom.phrase}</p>
                                  <p className="text-slate-500">: {idiom.meaning}</p>
                               </div>
                            ))}
                         </div>
                      </div>
                   )}
                   <div className="mb-6">
                      <h3 className={`${fonts.section} font-bold text-indigo-900 mb-3 uppercase tracking-wider`}>예문</h3>
                      <div className="space-y-4">
                         {selectedWord.detail.examples.map((ex, i) => (
                            <div key={i} className="relative pr-8 group">
                               <p className={`text-slate-800 font-medium mb-1 leading-snug ${fonts.text}`}>
                                  <span className="text-indigo-300 mr-2 font-bold text-[0.8em]">{i + 1}.</span>
                                  {ex.es}
                               </p>
                               <p className={`text-slate-400 pl-6 ${fonts.section}`}>{ex.kr}</p>
                               <button className="absolute right-0 top-0 text-indigo-200 hover:text-indigo-600 transition-colors opacity-0 group-hover:opacity-100">
                                  <Volume2 size={18} />
                                </button>
                            </div>
                         ))}
                      </div>
                   </div>
                   {hasConjugation && (
                      <div className="mt-2 border-t border-slate-100">
                         <div className="flex flex-col gap-2 py-3">
                            <button onClick={() => setIsConjugationOpen(!isConjugationOpen)} className="flex items-center justify-between w-full group">
                                <div className="flex items-center gap-2">
                                   <h3 className={`${fonts.section} font-bold text-indigo-900 group-hover:text-indigo-700 uppercase tracking-wider`}>동사 활용</h3>
                                   {selectedWord.detail.isIrregular && <span className="text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded border border-red-100">불규칙</span>}
                                </div>
                                {isConjugationOpen ? <ChevronUp size={16} className="text-indigo-400" /> : <ChevronDown size={16} className="text-indigo-400" />}
                            </button>
                            {isConjugationOpen && (
                                <div className="flex flex-wrap gap-1 bg-slate-50 p-1 rounded-lg mb-2">
                                    {[{ id: 'present', label: '현재' }, { id: 'past', label: '과거' }, { id: 'future', label: '미래' }, { id: 'subjunctive', label: '접속법' }, { id: 'conditional', label: '가정법' }, { id: 'participles', label: '분사' }].map(t => (
                                        <button key={t.id} onClick={() => setActiveTense(t.id as any)} className={`px-2 py-1 rounded-md text-[10px] font-bold transition-all flex-1 text-center whitespace-nowrap ${activeTense === t.id ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
                                            {t.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                         </div>
                         {isConjugationOpen && (
                            <div className="pb-4 animate-in fade-in slide-in-from-top-1 duration-200">
                               {activeTense === 'participles' ? (
                                   <div className="grid grid-cols-2 gap-6 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                                       <div className="text-center">
                                           <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wider">현재분사 (Gerundio)</p>
                                           <p className={`font-bold text-indigo-800 ${fonts.text}`}>{renderConjugatedVerb(selectedWord.detail.conjugation?.participle_pres || '-')}</p>
                                       </div>
                                       <div className="text-center border-l border-slate-200">
                                           <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wider">과거분사 (Participio)</p>
                                           <p className={`font-bold text-indigo-800 ${fonts.text}`}>{renderConjugatedVerb(selectedWord.detail.conjugation?.participle_past || '-')}</p>
                                       </div>
                                   </div>
                               ) : (
                                   <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                                      {getConjugationList(activeTense).map((conj, i) => (
                                         <div key={i} className="flex justify-between items-baseline border-b border-slate-50 pb-1">
                                            <span className={`font-bold text-slate-300 w-12 lowercase ${fonts.section}`}>{['yo', 'tú', 'él', 'nosotros', 'vosotros', 'ellos'][i]?.toLowerCase()}</span>
                                            <span className={`font-medium text-right ${fonts.text}`}>{renderConjugatedVerb(conj)}</span>
                                         </div>
                                      ))}
                                   </div>
                               )}
                            </div>
                         )}
                      </div>
                   )}
                </div>
              </div>
            ) : ( <div className="flex items-center justify-center h-full text-gray-300"><p className="text-sm font-medium">단어를 선택하세요</p></div> )}
          </div>

          <div className="flex-none space-y-4" style={{ width: '260px' }}>
             <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase mb-3 flex items-center gap-2"><Layers size={14} /> 학습 진행도</h3>
                <div className="mb-2 flex justify-between items-end"><span className="text-xl font-bold text-gray-900">0 / {filteredWords.length}</span><span className="text-[10px] font-medium text-gray-500 mb-1">Words</span></div>
                <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden"><div className="bg-indigo-500 h-full rounded-full" style={{ width: '5%' }}></div></div>
             </div>
             <Link href="/quiz/vocab" className="block group">
                <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 hover:border-indigo-300 transition-all">
                   <div className="flex items-center gap-3 mb-2"><div className="p-2 bg-white rounded-xl text-indigo-600 shadow-sm"><CheckCircle2 size={18} /></div><h4 className="font-bold text-indigo-900 text-sm">쪽지시험</h4></div>
                   <p className="text-[10px] text-indigo-700 opacity-70">오늘 학습한 단어를 테스트해보세요.</p>
                </div>
             </Link>
             <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex-1 overflow-hidden flex flex-col">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase mb-3">다른 테마</h3>
                <div className="space-y-1 overflow-y-auto no-scrollbar">
                   {Array.from(new Set(vocabData.map(v => v.category))).sort((a, b) => a.localeCompare(b, 'ko')).filter(c => c !== currentTheme).map(cat => (
                      <Link key={cat} href={`/vocabulary?theme=${cat}`} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors text-xs text-gray-600 group">
                         <span>{cat}</span>
                         <ChevronRight size={12} className="text-gray-300" />
                      </Link>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VocabularyPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-400">Loading...</div>}>
      <VocabularyContent />
    </Suspense>
  );
}