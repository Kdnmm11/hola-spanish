'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ChevronRight, ChevronDown, Home, Book, Layers, GraduationCap, PanelLeftClose, PanelLeft, Zap } from 'lucide-react';
import { GRAMMAR_DATA } from '@/data/grammarData';
import { vocabData } from '@/data/vocabulary';
import { motion, AnimatePresence } from 'framer-motion';

// --- Level Configuration ---
const difficultyOrder = ['Level 1', 'Level 2', 'Level 3', 'Level 4'];
const levelLabels: Record<string, string> = {
    'Level 1': '입문 (Starter)',
    'Level 2': '초급 (Beginner)',
    'Level 3': '중급 (Intermediate)',
    'Level 4': '고급 (Advanced)'
};

// --- Helper: Get Korean Choseong ---
const getChoseong = (str: string) => {
  const choseong = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
  const code = str.charCodeAt(0) - 0xac00;
  if (code > -1 && code < 11172) return choseong[Math.floor(code / 588)];
  return str.charAt(0);
};

const Sidebar = ({ isMobile = false }: { isMobile?: boolean }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTheme = searchParams.get('theme');

  // Sidebar States
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openGrammar, setOpenGrammar] = useState(false);
  const [openVocab, setOpenVocab] = useState(false);
  const [openThematic, setOpenThematic] = useState(false);
  const [openExam, setOpenExam] = useState(false); 
  const [openLevels, setOpenLevels] = useState<string[]>([]); // Default all collapsed
  const [openChoseong, setOpenChoseong] = useState<string[]>([]); 
  const [openComprehensive, setOpenComprehensive] = useState(false);

  const toggleLevel = (level: string) => {
    setOpenLevels(prev => prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]);
  };

  const toggleChoseong = (char: string) => {
    setOpenChoseong(prev => prev.includes(char) ? prev.filter(c => c !== char) : [...prev, char]);
  };

  const isActive = (path: string) => pathname === path;

  // Grammar Grouping
  const groupedGrammar = difficultyOrder.map(diff => ({
    difficulty: diff,
    label: levelLabels[diff],
    items: GRAMMAR_DATA.filter(item => item.difficulty === diff)
  })).filter(group => group.items.length > 0);

  // Vocab Grouping (By Choseong)
  const groupedVocab = useMemo(() => {
      const categories = Array.from(new Set(vocabData.map(v => v.category)));
      categories.sort((a, b) => a.localeCompare(b, 'ko'));
      
      const groups: { [key: string]: { name: string, count: number }[] } = {};
      categories.forEach(cat => {
          const char = getChoseong(cat);
          if (!groups[char]) groups[char] = [];
          groups[char].push({
              name: cat,
              count: vocabData.filter(v => v.category === cat).length
          });
      });
      return groups;
  }, []);

  // Animation Variants
  const menuVariants = {
    closed: { height: 0, opacity: 0, transition: { duration: 0.2, ease: 'easeInOut' } },
    open: { height: 'auto', opacity: 1, transition: { duration: 0.3, ease: 'easeInOut' } }
  };

  const rotateVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 }
  };

  return (
    <aside 
      className={`flex flex-col text-[13px] bg-gray-50/80 border-r border-gray-200 backdrop-blur-md transition-all duration-300 ease-in-out no-scrollbar overflow-y-auto 
        ${isMobile ? 'w-full h-full' : `h-screen fixed left-0 top-0 z-30 ${isCollapsed ? 'w-16' : 'w-72'}`}
      `}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center px-4 mb-2 shrink-0 relative border-b border-gray-100/50">
        <div className={`flex items-center gap-2 transition-opacity duration-200 ${isCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100 delay-100'}`}>
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform"><span className="font-bold text-lg">H</span></div>
            <div className="flex flex-col"><span className="font-extrabold text-gray-900 text-base leading-none tracking-tight group-hover:text-red-600 transition-colors">Hola</span><span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Spanish</span></div>
          </Link>
        </div>
        <button onClick={() => setIsCollapsed(!isCollapsed)} className={`p-2 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300 absolute top-1/2 -translate-y-1/2 ${isCollapsed ? 'left-1/2 -translate-x-1/2' : 'right-4'}`}>{isCollapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}</button>
      </div>

      {/* Navigation Content */}
      <div className={`flex-1 overflow-y-auto px-3 py-4 space-y-6 transition-opacity duration-200 no-scrollbar ${isCollapsed ? 'opacity-0 invisible' : 'opacity-100 visible delay-150'}`}>
        
        {/* Dashboard */}
        <div><Link href="/" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium mb-2 ${isActive('/') ? 'bg-white text-red-600 shadow-sm border border-gray-100' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'}`}><Home size={16} /><span>전체 대시보드</span></Link></div>

        {/* Grammar */}
        <div>
          <button onClick={() => setOpenGrammar(!openGrammar)} className="w-full flex items-center justify-between px-3 py-1.5 mb-1 text-xs font-bold text-gray-400 uppercase tracking-wider hover:text-gray-600">
            <div className="flex items-center gap-2"><Book size={14} /> <span>문법 (Gramática)</span></div>
            <motion.div variants={rotateVariants} animate={openGrammar ? "open" : "closed"} transition={{ duration: 0.2 }}>
                <ChevronDown size={14}/>
            </motion.div>
          </button>
          
          <AnimatePresence>
            {openGrammar && (
                <motion.div variants={menuVariants} initial="closed" animate="open" exit="closed" className="overflow-hidden">
                    <div className="space-y-1 ml-1 pl-2 border-l border-gray-200 py-1">
                    <Link href="/grammar" className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${isActive('/grammar') ? 'bg-red-50 text-red-600 font-medium' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'}`}><Home size={14} /><span>문법 홈</span></Link>
                    {groupedGrammar.map((group) => (
                        <div key={group.difficulty}>
                            <button onClick={() => toggleLevel(group.difficulty)} className="w-full flex items-center gap-1 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 rounded-lg transition-all select-none justify-between">
                                <div className="flex items-center gap-1">
                                    <span className="font-medium text-sm truncate">{group.label}</span>
                                </div>
                                <motion.div variants={rotateVariants} animate={openLevels.includes(group.difficulty) ? "open" : "closed"} transition={{ duration: 0.2 }}>
                                    <ChevronDown size={14} className="text-gray-400" />
                                </motion.div>
                            </button>
                            <AnimatePresence>
                                {openLevels.includes(group.difficulty) && (
                                <motion.div variants={menuVariants} initial="closed" animate="open" exit="closed" className="overflow-hidden">
                                    <div className="ml-2 pl-2 border-l border-gray-100 space-y-0.5 py-1">
                                        {group.items.map((item) => (
                                            <Link key={item.id} href={`/grammar/${item.id}`} className={`block px-3 py-1.5 rounded-lg transition-all truncate text-xs ${pathname === `/grammar/${item.id}` ? 'text-red-600 font-medium bg-red-50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'}`}>
                                                {item.title}
                                            </Link>
                                        ))}
                                    </div>
                                </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        ))}
                    </div>
                </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Vocabulary (NEW Grouped Style) */}
        <div>
          <button onClick={() => setOpenVocab(!openVocab)} className="w-full flex items-center justify-between px-3 py-1.5 mb-1 text-xs font-bold text-gray-400 uppercase tracking-wider hover:text-gray-600">
             <div className="flex items-center gap-2"><Layers size={14} /> <span>단어장 (Vocabulario)</span></div>
             <motion.div variants={rotateVariants} animate={openVocab ? "open" : "closed"} transition={{ duration: 0.2 }}>
                <ChevronDown size={14}/>
            </motion.div>
          </button>
          
          <AnimatePresence>
            {openVocab && (
             <motion.div variants={menuVariants} initial="closed" animate="open" exit="closed" className="overflow-hidden">
                 <div className="ml-1 pl-2 border-l border-gray-200 space-y-0.5 py-1">
                    <Link href="/vocabulary" className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${isActive('/vocabulary') && !currentTheme ? 'bg-yellow-50 text-yellow-600 font-medium' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'}`}><Home size={14} /><span>테마 홈</span></Link>
                    {/* Consonant Groups */}
                    {Object.keys(groupedVocab).sort().map(char => (
                        <div key={char}>
                            <button onClick={() => toggleChoseong(char)} className="w-full flex items-center justify-between px-3 py-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100/50 rounded-lg transition-all select-none group">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-indigo-600">{char}</span>
                                    <span className="text-[9px] font-medium bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded-md group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
                                        {groupedVocab[char].length}
                                    </span>
                                </div>
                                <motion.div variants={rotateVariants} animate={openChoseong.includes(char) ? "open" : "closed"} transition={{ duration: 0.2 }}>
                                    <ChevronDown size={12}/>
                                </motion.div>
                            </button>
                            <AnimatePresence>
                                {openChoseong.includes(char) && (
                                    <motion.div variants={menuVariants} initial="closed" animate="open" exit="closed" className="overflow-hidden">
                                        <div className="ml-2 pl-2 border-l border-gray-100 space-y-0.5 py-1">
                                            {groupedVocab[char].map(theme => (
                                                <Link key={theme.name} href={`/vocabulary?theme=${theme.name}`} className={`flex justify-between items-center px-3 py-1.5 rounded-lg transition-colors text-xs ${currentTheme === theme.name ? 'bg-yellow-50 text-yellow-600 font-medium' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'}`}>
                                                    <span className="truncate pr-2">{theme.name}</span>
                                                    <span className="text-[9px] opacity-50 font-bold">{theme.count}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                 </div>
             </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Focus Study (NEW Thematic Section) */}
        <div>
          <button onClick={() => setOpenThematic(!openThematic)} className="w-full flex items-center justify-between px-3 py-1.5 mb-1 text-xs font-bold text-gray-400 uppercase tracking-wider hover:text-gray-600">
             <div className="flex items-center gap-2"><Zap size={14} className="text-amber-500 fill-amber-500" /> <span>테마 학습 (Focus)</span></div>
             <motion.div variants={rotateVariants} animate={openThematic ? "open" : "closed"} transition={{ duration: 0.2 }}>
                <ChevronDown size={14}/>
            </motion.div>
          </button>
          
          <AnimatePresence>
            {openThematic && (
             <motion.div variants={menuVariants} initial="closed" animate="open" exit="closed" className="overflow-hidden">
                 <div className="ml-1 pl-2 border-l border-gray-200 space-y-0.5 py-1">
                    {/* 동사 마스터 그룹 */}
                    <div className="py-1">
                        <div className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-tighter mb-1">동사 마스터</div>
                        <Link href="/thematic/verbs" className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ml-2 ${isActive('/thematic/verbs') ? 'bg-amber-50 text-amber-600 font-bold' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'}`}>
                            <span>시제별 변화</span>
                        </Link>
                        <Link href="/thematic/verbs-summary" className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ml-2 ${isActive('/thematic/verbs-summary') ? 'bg-amber-50 text-amber-600 font-bold' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'}`}>
                            <span>동사별 변화</span>
                        </Link>
                        <Link href="/thematic/verbs/quiz" className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ml-2 ${isActive('/thematic/verbs/quiz') ? 'bg-amber-50 text-amber-600 font-bold' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'}`}>
                            <span>실전 퀴즈</span>
                        </Link>
                    </div>

                    <div className="mt-2 pt-2 border-t border-gray-100">
                        <Link href="/thematic/prepositions" className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${isActive('/thematic/prepositions') ? 'bg-amber-50 text-amber-600 font-bold' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'}`}>
                            <span>전치사 정복</span>
                        </Link>
                        <Link href="/thematic/conversation" className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${isActive('/thematic/conversation') ? 'bg-amber-50 text-amber-600 font-bold' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'}`}>
                            <span>대화의 기술</span>
                        </Link>
                        <Link href="/thematic/nuances" className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${isActive('/thematic/nuances') ? 'bg-amber-50 text-amber-600 font-bold' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'}`}>
                            <span>어휘의 뉘앙스</span>
                        </Link>
                    </div>
                 </div>
             </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Exams */}
        <div>
          <button onClick={() => setOpenExam(!openExam)} className="w-full flex items-center justify-between px-3 py-1.5 mb-1 text-xs font-bold text-gray-400 uppercase tracking-wider hover:text-gray-600">
             <div className="flex items-center gap-2"><GraduationCap size={14} /> <span>시험 (Examen)</span></div>
             <motion.div variants={rotateVariants} animate={openExam ? "open" : "closed"} transition={{ duration: 0.2 }}>
                <ChevronDown size={14}/>
            </motion.div>
          </button>
          
          <AnimatePresence>
            {openExam && (
             <motion.div variants={menuVariants} initial="closed" animate="open" exit="closed" className="overflow-hidden">
                 <div className="ml-1 pl-2 border-l border-gray-200 space-y-0.5 py-1">
                    <Link href="/quiz" className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${isActive('/quiz') ? 'bg-indigo-50 text-indigo-600 font-medium' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'}`}><Home size={14} /><span>퀴즈 홈</span></Link>
                    
                    {/* Comprehensive Tests Group */}
                    <div className="mt-1 pt-1 border-t border-gray-100">
                        <button onClick={() => setOpenComprehensive(!openComprehensive)} className="w-full flex items-center justify-between px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 rounded-lg transition-all select-none">
                            <span className="font-medium text-xs flex items-center gap-2">종합 테스트</span>
                            <motion.div variants={rotateVariants} animate={openComprehensive ? "open" : "closed"} transition={{ duration: 0.2 }}>
                                <ChevronDown size={12} className="text-gray-400"/>
                            </motion.div>
                        </button>
                        <AnimatePresence>
                            {openComprehensive && (
                                <motion.div variants={menuVariants} initial="closed" animate="open" exit="closed" className="overflow-hidden">
                                    <div className="ml-2 pl-2 border-l border-indigo-100 space-y-0.5 mt-0.5 py-1">
                                        <Link href="/quiz/comprehensive/grammar" className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors text-xs ${isActive('/quiz/comprehensive/grammar') ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'}`}>
                                            <span>랜덤 20제</span>
                                        </Link>
                                        <Link href="/quiz/comprehensive/conjugation" className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors text-xs ${isActive('/quiz/comprehensive/conjugation') ? 'bg-teal-50 text-teal-600 font-bold' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'}`}>
                                            <span>시제 맞추기</span>
                                        </Link>
                                        <Link href="/quiz/comprehensive/correction" className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors text-xs ${isActive('/quiz/comprehensive/correction') ? 'bg-rose-50 text-rose-600 font-bold' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'}`}>
                                            <span>틀린 곳 찾기</span>
                                        </Link>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Link href="/quiz/grammar" className={`block px-3 py-2 rounded-lg transition-colors text-xs ${isActive('/quiz/grammar') ? 'bg-teal-50 text-teal-600 font-medium' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'}`}>챕터별 문법 퀴즈</Link>
                    <Link href="/quiz/vocab" className={`block px-3 py-2 rounded-lg transition-colors text-xs ${isActive('/quiz/vocab') ? 'bg-teal-50 text-teal-600 font-medium' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'}`}>단어장 암기 테스트</Link>
                 </div>
             </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Profile */}
      <div className={`px-4 py-4 border-t border-gray-200 bg-white/50 backdrop-blur-sm transition-opacity duration-200 ${isCollapsed ? 'opacity-0 invisible' : 'opacity-100 visible delay-150'}`}>
        <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-gradient-to-tr from-slate-200 to-slate-100 flex items-center justify-center text-[10px] text-gray-500 font-bold shadow-sm">ME</div><div className="overflow-hidden"><p className="text-xs font-bold text-gray-700 truncate">Estudiante</p><p className="text-[10px] text-gray-400 font-medium">Free Plan</p></div></div>
      </div>
    </aside>
  );
};

export default Sidebar;