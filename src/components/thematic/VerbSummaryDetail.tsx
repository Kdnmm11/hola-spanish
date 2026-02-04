'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ChevronRight, Search, Settings, X, GripHorizontal } from 'lucide-react';
import { BY_VERB_DATA } from '@/data/thematic/verbs/byVerb';

const PRONOUNS = ['yo', 'tú', 'él/ella', 'nos.', 'vos.', 'ellos/as'];

export default function VerbSummaryDetail() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [settings, setSettings] = useState({
    tableXOffset: 295,
    tableHeight: 65,
    tableWidth: 61,
    asideWidth: 246,
    baseFontSize: 17,
    tablePadding: 6.5,
    tableBottomPadding: 0,
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 400, y: 100 });
  const dragRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setDragPosition({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
    };
    const handleMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (dragRef.current) {
      const rect = dragRef.current.getBoundingClientRect();
      setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setIsDragging(true);
    }
  };

  const sortedVerbs = useMemo(() => [...BY_VERB_DATA].sort((a, b) => a.v.localeCompare(b.v)), []);
  const verb = sortedVerbs[currentIndex];
  const filteredVerbs = useMemo(() => {
      return sortedVerbs.map((v, displayIdx) => ({ ...v, displayIdx }))
          .filter(v => v.v.toLowerCase().includes(searchTerm.toLowerCase()) || v.mean.includes(searchTerm));
  }, [sortedVerbs, searchTerm]);

  const groupedVerbs = useMemo(() => {
      const groups: { [key: string]: typeof filteredVerbs } = {};
      filteredVerbs.forEach(v => {
          const char = v.v[0].toUpperCase();
          if (!groups[char]) groups[char] = [];
          groups[char].push(v);
      });
      return Object.keys(groups).sort().map(char => ({ char, verbs: groups[char] }));
  }, [filteredVerbs]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') setCurrentIndex(p => (p + 1) % sortedVerbs.length);
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') setCurrentIndex(p => (p - 1 + sortedVerbs.length) % sortedVerbs.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sortedVerbs.length]);

  const renderForm = (form: string[], isRegular: boolean, tenseId?: string) => {
      if (!form || form[0] === '-') return <span className="text-slate-300 font-bold">-</span>;

      // 접속법 과거(subj_imp) 전용: 가로 배치로 높이 일치
      if (tenseId === 'subj_imp' && form.length >= 2 && !form[0].includes(' ')) {
          return (
              <div style={{ fontSize: `${settings.baseFontSize}px` }} className="flex items-center justify-center leading-none font-bold gap-2 whitespace-nowrap">
                {isRegular ? (
                    <>
                        <span><span className="text-slate-900">{form[0]}</span><span className="text-red-500">{form[1]}</span></span>
                        {form[2] && <span><span className="text-slate-900">{form[2]}</span><span className="text-red-500">{form[3]}</span></span>}
                    </>
                ) : (
                    <>
                        <span className="text-violet-600">{form[0]}</span>
                        <span className="text-violet-600">{form[1]}</span>
                    </>
                )}
              </div>
          );
      }

      // 복합 시제 (현재완료 등)
      if (form[0].endsWith(' ')) {
          return (
              <div style={{ fontSize: `${settings.baseFontSize}px` }} className="flex flex-col items-center justify-center leading-none py-1 font-bold">
                <span className="text-slate-900 mb-0.5">{form[0].trim()}</span>
                <span className="text-slate-900">{form[1]}</span>
              </div>
          );
      }

      // 일반 시제
      if (isRegular) {
          return (
              <div style={{ fontSize: `${settings.baseFontSize}px` }} className="flex items-center justify-center leading-tight font-bold">
                <span className="text-slate-900">{form[0]}</span>
                <span className="text-red-500">{form[1]}</span>
              </div>
          );
      }
      return <span style={{ fontSize: `${settings.baseFontSize}px` }} className={`font-bold ${form[1] ? 'text-violet-600' : 'text-slate-900'}`}>{form[0]}{form[1]}</span>;
  };

  return (
    <div className="flex flex-col lg:flex-row lg:gap-12 max-w-7xl mx-auto py-2 font-sans text-slate-800 bg-white h-[calc(100vh-7rem)] overflow-visible select-none relative">
      <button onClick={() => setIsSettingsOpen(!isSettingsOpen)} className="fixed bottom-6 right-6 z-[110] p-3 bg-slate-900 text-white rounded-full shadow-xl hover:bg-slate-700 transition-colors">
        <Settings size={20} />
      </button>

      {isSettingsOpen && (
        <div ref={dragRef} style={{ left: dragPosition.x, top: dragPosition.y, position: 'fixed' }} className="z-[120] w-72 bg-white/90 backdrop-blur shadow-2xl rounded-2xl border border-slate-200 overflow-hidden">
          <div onMouseDown={handleMouseDown} className="bg-slate-100 p-3 flex justify-between items-center cursor-move select-none border-b border-slate-200">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase"><GripHorizontal size={14} />디자인 설정</div>
            <button onClick={() => setIsSettingsOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={16} /></button>
          </div>
          <div className="p-5 space-y-5 text-xs font-medium text-slate-600">
            <div className="space-y-2">
              <div className="flex justify-between"><span>표 위치 (좌우)</span><span className="text-blue-600 font-bold">{settings.tableXOffset}px</span></div>
              <input type="range" min="0" max="1000" step="0.5" value={settings.tableXOffset} onChange={e => setSettings({...settings, tableXOffset: Number(e.target.value)})} className="w-full accent-blue-600" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between"><span>표 높이 (전체)</span><span className="text-blue-600 font-bold">{settings.tableHeight}%</span></div>
              <input type="range" min="10" max="300" step="0.5" value={settings.tableHeight} onChange={e => setSettings({...settings, tableHeight: Number(e.target.value)})} className="w-full accent-blue-600" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between"><span>표 너비 (전체)</span><span className="text-blue-600 font-bold">{settings.tableWidth}%</span></div>
              <input type="range" min="30" max="150" step="0.5" value={settings.tableWidth} onChange={e => setSettings({...settings, tableWidth: Number(e.target.value)})} className="w-full accent-blue-600" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between"><span>우측 목록 너비</span><span className="text-blue-600 font-bold">{settings.asideWidth}px</span></div>
              <input type="range" min="100" max="500" step="1" value={settings.asideWidth} onChange={e => setSettings({...settings, asideWidth: Number(e.target.value)})} className="w-full accent-blue-600" />
            </div>
            <div className="pt-2 border-t border-slate-100 space-y-4">
                <div className="space-y-2">
                    <div className="flex justify-between"><span>글자 크기</span><span className="text-slate-400 font-bold">{settings.baseFontSize}px</span></div>
                    <input type="range" min="12" max="24" step="1" value={settings.baseFontSize} onChange={e => setSettings({...settings, baseFontSize: Number(e.target.value)})} className="w-full accent-slate-400" />
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between"><span>표 하단 여백</span><span className="text-slate-400 font-bold">{settings.tableBottomPadding}px</span></div>
                    <input type="range" min="0" max="100" step="1" value={settings.tableBottomPadding} onChange={e => setSettings({...settings, tableBottomPadding: Number(e.target.value)})} className="w-full accent-slate-400" />
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between"><span>표 행 간격</span><span className="text-slate-400 font-bold">{settings.tablePadding}px</span></div>
                    <input type="range" min="1" max="20" step="0.5" value={settings.tablePadding} onChange={e => setSettings({...settings, tablePadding: Number(e.target.value)})} className="w-full accent-slate-400" />
                </div>
            </div>
          </div>
        </div>
      )}

      <article className="flex-1 min-w-0 pr-4 flex flex-col overflow-visible z-10">
          <header className="mb-6 border-b border-slate-200 pb-4 shrink-0">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 tracking-widest mb-2 uppercase">
                <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-[9px]">focus study</span>
                <ChevronRight size={10} /><span>verb summary</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">필수 동사별 시제 총정리</h1>
            <p className="text-[16px] text-slate-600 font-medium leading-relaxed max-w-3xl">필수 동사의 주요 시제 변화를 한눈에 확인하고 학습하세요.</p>
          </header>

          <div className="flex-1 flex flex-col items-start w-full overflow-visible">
            <div key={verb.v} className="border border-slate-200 shadow-xl bg-white overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-400 flex flex-col transition-all fixed z-[60]"
                style={{ borderRadius: `20px`, top: `180px`, left: `${settings.tableXOffset}px`, width: `${settings.tableWidth}%`, height: `${settings.tableHeight}%`, maxHeight: 'none' }}>
                <div className="px-10 pt-10 pb-4 flex justify-between items-center bg-white shrink-0">
                    <div className="flex items-baseline gap-3">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tighter">{verb.v}</h2>
                        <p className="text-base text-slate-400 font-bold">{verb.mean}</p>
                    </div>
                    <span className={`text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border ${verb.isRegular ? 'text-emerald-500 bg-emerald-50 border-emerald-100' : 'text-amber-500 bg-amber-50 border-amber-100'}`}>
                        {verb.isRegular ? 'regular' : 'irregular'}
                    </span>
                </div>
                <div className="px-5 pt-2 pb-4 flex-1 overflow-hidden flex flex-col">
                    <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm bg-slate-50/20 relative flex flex-col min-h-0">
                        <div className="overflow-y-auto no-scrollbar">
                            <table className="w-full text-center border-collapse table-fixed" style={{ marginBottom: `${settings.tableBottomPadding}px` }}>
                                <thead className="bg-slate-50/80 text-slate-600 font-bold text-[13px] uppercase tracking-widest border-b border-slate-100 sticky top-0 z-10 backdrop-blur-sm">
                                    <tr>
                                        <th className="w-[12%] py-4 border-r border-slate-100 bg-slate-50/80">시제</th>
                                        {PRONOUNS.map(p => <th key={p} className="py-4 font-bold lowercase bg-slate-50/80">{p}</th>)}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white/50">
                                    {verb.tenses.map((tense) => (
                                        <tr key={tense.id} className="hover:bg-blue-50/30 transition-colors">
                                            <td style={{ paddingTop: `${settings.tablePadding * 2.5}px`, paddingBottom: `${settings.tablePadding * 2.5}px` }} className="font-bold text-slate-900 border-r border-slate-100 text-[14px] uppercase tracking-tighter leading-tight text-center">{tense.name}</td>
                                            {tense.forms.map((form, fIdx) => (
                                                <td key={fIdx} className="text-center">{renderForm(form, verb.isRegular, tense.id)}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
          </div>
      </article>

      <aside style={{ width: `${settings.asideWidth}px` }} className="hidden lg:flex flex-col shrink-0 h-full select-text pb-4 z-10">
          <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input type="text" placeholder="동사 검색..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm" />
          </div>
          <div className="flex-1 overflow-y-auto pr-1 no-scrollbar border-l border-slate-100 pl-4">
              <div className="space-y-4">
                  {groupedVerbs.map(group => (
                      <div key={group.char} className="flex gap-2">
                          <div className="w-6 shrink-0 text-center"><span className="text-[10px] font-black text-blue-500/40 sticky top-0 py-2 inline-block bg-white">{group.char}</span></div>
                          <ul className="flex-1 space-y-0.5 border-l border-slate-50 pl-2">
                              {group.verbs.map(v => (
                                  <li key={v.v}>
                                      <button onClick={() => setCurrentIndex(v.displayIdx)} className={`w-full text-left px-2 py-1 rounded-md text-[11.5px] transition-all flex justify-between items-center group ${currentIndex === v.displayIdx ? 'bg-blue-600 text-white font-bold shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                                          <span className="truncate max-w-[70px]">{v.v}</span>
                                          <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                              <span className={`text-[9px] font-medium ${currentIndex === v.displayIdx ? 'text-blue-100' : 'text-slate-400'}`}>{v.mean}</span>
                                              <span className={`text-[8px] font-bold px-1 rounded ${v.isRegular ? (currentIndex === v.displayIdx ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-600') : (currentIndex === v.displayIdx ? 'bg-white/20 text-white' : 'bg-amber-50 text-amber-600')}`}>{v.isRegular ? '규' : '불'}</span>
                                          </div>
                                      </button>
                                  </li>
                              ))}
                          </ul>
                      </div>
                  ))}
              </div>
          </div>
      </aside>
    </div>
  );
}