'use client';

import React, { useState } from 'react';
import { ChevronRight, Zap } from 'lucide-react';
import { TENSE_MASTER_DATA } from '@/data/thematicData';

const PRONOUNS = ['yo', 'tú', 'él/ella/ud.', 'nosotros/as', 'vosotros/as', 'ellos/as/uds.'];

type CompanionGroup = {
  cat: string;
  words: string[];
  tip: string;
  ex?: string;
  ko?: string;
};

const USAGE_COMPANION_DATA: Record<string, CompanionGroup[]> = {
  presente: [
    {
      cat: '빈도 부사',
      words: ['siempre', 'normalmente', 'a menudo', 'a veces', 'nunca'],
      tip: '현재시제 습관 표현과 가장 자주 결합합니다.',
      ex: 'Siempre estudio por la noche.',
      ko: '나는 항상 밤에 공부한다.'
    },
    {
      cat: '반복 시간 표현',
      words: ['cada día', 'todos los lunes', 'por la mañana', 'los fines de semana'],
      tip: '반복 주기를 명확하게 해 주는 표현입니다.',
      ex: 'Trabajo todos los lunes.',
      ko: '나는 매주 월요일마다 일한다.'
    },
    {
      cat: '가까운 미래 표지',
      words: ['mañana', 'esta noche', 'en un rato'],
      tip: '확정된 계획을 현재시제로 말할 때 자주 사용합니다.',
      ex: 'Mañana te llamo.',
      ko: '내일 네게 전화할게.'
    }
  ],
  perfecto: [
    {
      cat: '현재와 연결된 시간 표현',
      words: ['hoy', 'esta semana', 'este mes', 'últimamente', 'todavía no', 'ya'],
      tip: '시간 구간이 현재와 이어질 때 현재완료를 쓰는 경향이 큽니다.',
      ex: 'Esta semana he trabajado mucho.',
      ko: '이번 주에 나는 많이 일했다.'
    },
    {
      cat: '경험 트리거 표현',
      words: ['alguna vez', 'nunca', 'varias veces'],
      tip: '경험 유무를 묻고 답할 때 현재완료가 매우 빈번합니다.',
      ex: '¿Has probado alguna vez la paella?',
      ko: '파에야를 먹어본 적 있어?'
    },
    {
      cat: '자주 결합하는 동사',
      words: ['haber + participio', 'he / has / ha', 'hemos / habéis / han'],
      tip: '현재완료는 조동사 haber 활용형과 과거분사의 결합입니다.',
      ex: 'Ya han llegado.',
      ko: '그들은 이미 도착했다.'
    }
  ],
  indefinido: [
    {
      cat: '완료된 과거 시점 표현',
      words: ['ayer', 'anoche', 'anteayer', 'el año pasado', 'en 2019'],
      tip: '끝난 시점이 분명할수록 점과거와 잘 어울립니다.',
      ex: 'Ayer comí con mi familia.',
      ko: '어제 가족과 식사했다.'
    },
    {
      cat: '사건 순서 연결어',
      words: ['primero', 'luego', 'después', 'finalmente'],
      tip: '일회성 사건을 시간 순서대로 말할 때 자주 씁니다.',
      ex: 'Primero llegué, luego llamé a Marta.',
      ko: '먼저 도착했고, 그다음 마르타에게 전화했다.'
    },
    {
      cat: '단발 사건 강조 표현',
      words: ['de repente', 'una vez', 'entonces'],
      tip: '한 번 일어나고 끝난 동작을 또렷하게 표현합니다.',
      ex: 'De repente empezó a llover.',
      ko: '갑자기 비가 오기 시작했다.'
    }
  ],
  imperfecto: [
    {
      cat: '과거 배경/상황 표현',
      words: ['cuando era niño', 'en aquella época', 'antes'],
      tip: '상황, 배경, 당시 상태를 묘사할 때 선과거를 사용합니다.',
      ex: 'En aquella época vivíamos en Busan.',
      ko: '그 시절 우리는 부산에 살고 있었다.'
    },
    {
      cat: '동시 진행 연결어',
      words: ['mientras', 'cuando', 'siempre que'],
      tip: '진행 중이던 두 동작을 배경처럼 연결할 때 자연스럽습니다.',
      ex: 'Yo estudiaba mientras él cocinaba.',
      ko: '그가 요리하는 동안 나는 공부하고 있었다.'
    },
    {
      cat: '반복 습관 표현',
      words: ['a menudo', 'todos los días', 'cada verano'],
      tip: '과거의 반복 습관을 말할 때 선과거 신호로 자주 쓰입니다.',
      ex: 'Cada verano íbamos al mar.',
      ko: '매 여름마다 우리는 바다에 가곤 했다.'
    }
  ],
  futuro: [
    {
      cat: '미래 시점 표현',
      words: ['mañana', 'pasado mañana', 'la semana que viene', 'en el futuro'],
      tip: '미래 계획/예고와 함께 기본적으로 결합합니다.',
      ex: 'La semana que viene viajaré a Madrid.',
      ko: '다음 주에 마드리드로 여행 갈 것이다.'
    },
    {
      cat: '의지/약속 표현',
      words: ['te prometo', 'seguro', 'algún día'],
      tip: '화자의 강한 의지나 약속을 강조할 때 자주 등장합니다.',
      ex: 'Te prometo que lo haré.',
      ko: '그걸 하겠다고 약속해.'
    },
    {
      cat: '현재 추측 표현',
      words: ['¿dónde estará...?', 'será...', 'tendrá...'],
      tip: '미래형이지만 현재 상황에 대한 추측으로도 많이 사용됩니다.',
      ex: '¿Qué hora será ahora?',
      ko: '지금 몇 시쯤일까?'
    }
  ],
  condicional: [
    {
      cat: '정중 표현',
      words: ['podría', 'querría', 'me gustaría', '¿le importaría...?'],
      tip: '부탁/요청을 부드럽고 정중하게 만드는 핵심 표현입니다.',
      ex: 'Me gustaría reservar una mesa.',
      ko: '테이블을 예약하고 싶습니다.'
    },
    {
      cat: '가정문 트리거',
      words: ['si + 접속법 과거', 'en tu lugar', 'yo que tú'],
      tip: '비현실적 가정의 결과절에서 조건법이 자주 쓰입니다.',
      ex: 'Si tuviera tiempo, descansaría más.',
      ko: '시간이 있다면 더 쉴 텐데.'
    },
    {
      cat: '과거 추측 표현',
      words: ['serían las...', 'estaría en...', 'tendría unos...'],
      tip: '과거 시점/상황에 대한 추측을 완곡하게 말할 때 유용합니다.',
      ex: 'Serían las diez cuando llegó.',
      ko: '그가 왔을 때 10시쯤이었을 것이다.'
    }
  ],
  subj_presente: [
    {
      cat: '바람/요구 트리거',
      words: ['esperar que', 'querer que', 'recomendar que', 'pedir que'],
      tip: '주절 동사가 바람/요구이면 que절에 접속법 현재가 자주 옵니다.',
      ex: 'Quiero que vengas temprano.',
      ko: '네가 일찍 오길 원해.'
    },
    {
      cat: '감정/판단/의심 표현',
      words: ['me alegra que', 'es importante que', 'dudar que', 'no creer que'],
      tip: '주관적 판단, 감정, 불확실성 표현 뒤에서 많이 쓰입니다.',
      ex: 'Es importante que estudies hoy.',
      ko: '오늘 네가 공부하는 것이 중요하다.'
    },
    {
      cat: '미래 관련 접속사',
      words: ['cuando', 'hasta que', 'antes de que', 'en cuanto'],
      tip: '아직 일어나지 않은 미래 사건이면 접속사 뒤에 접속법을 씁니다.',
      ex: 'Te llamo cuando llegue.',
      ko: '도착하면 내가 전화할게.'
    }
  ],
  subj_imperfecto: [
    {
      cat: '비현실 가정',
      words: ['si tuviera', 'si pudiera', 'si fuera'],
      tip: 'if절(가정절)에서 비현실 상황을 만들 때 핵심 패턴입니다.',
      ex: 'Si pudiera, viajaría más.',
      ko: '할 수 있다면 더 많이 여행할 텐데.'
    },
    {
      cat: '과거 시점의 요구/감정',
      words: ['quería que', 'me pidió que', 'era mejor que'],
      tip: '과거의 바람/요구/평가를 말할 때 que절에서 자주 사용됩니다.',
      ex: 'Ella quería que yo estudiara medicina.',
      ko: '그녀는 내가 의학을 공부하길 바랐다.'
    },
    {
      cat: '정중한 완곡 표현',
      words: ['quisiera', 'pudiera', 'debiera'],
      tip: '공손하고 부드러운 어조를 만들 때도 접속법 과거형이 쓰입니다.',
      ex: 'Quisiera hablar con usted.',
      ko: '당신과 이야기하고 싶습니다.'
    }
  ],
  imperativo: [
    {
      cat: '정중/완화 표현',
      words: ['por favor', 'un momento', 'con calma'],
      tip: '명령형도 완화 표현을 붙이면 훨씬 부드럽게 들립니다.',
      ex: 'Habla más despacio, por favor.',
      ko: '천천히 말해 주세요.'
    },
    {
      cat: '순서 지시 표현',
      words: ['primero', 'luego', 'después', 'finalmente'],
      tip: '절차 안내나 요리 레시피에서 명령형과 자주 함께 나옵니다.',
      ex: 'Primero corta la cebolla, luego fríela.',
      ko: '먼저 양파를 자르고, 그다음 볶아라.'
    },
    {
      cat: '금지형 패턴',
      words: ['no + 접속법 현재', 'no hables', 'no comas', 'no vivas'],
      tip: '부정 명령은 직설법이 아니라 접속법 현재를 사용합니다.',
      ex: 'No llegues tarde.',
      ko: '늦지 마.'
    }
  ]
};

const EXPRESSION_MEANINGS: Record<string, string> = {
  'siempre': '항상',
  'normalmente': '보통',
  'a menudo': '자주',
  'a veces': '가끔',
  'nunca': '결코/한 번도 ~않다',
  'cada día': '매일',
  'todos los lunes': '매주 월요일마다',
  'por la mañana': '아침에',
  'los fines de semana': '주말마다',
  'mañana': '내일',
  'esta noche': '오늘 밤',
  'en un rato': '잠시 후',
  'hoy': '오늘',
  'esta semana': '이번 주',
  'este mes': '이번 달',
  'últimamente': '최근에',
  'todavía no': '아직 ~않다',
  'ya': '이미',
  'alguna vez': '언젠가/한 번이라도',
  'varias veces': '여러 번',
  'haber + participio': '현재완료 기본 구조',
  'he / has / ha': '현재완료 조동사 단수형',
  'hemos / habéis / han': '현재완료 조동사 복수형',
  'ayer': '어제',
  'anoche': '어젯밤',
  'anteayer': '그저께',
  'el año pasado': '작년',
  'en 2019': '2019년에',
  'primero': '먼저',
  'luego': '그다음',
  'después': '그 후에',
  'finalmente': '마침내/마지막으로',
  'de repente': '갑자기',
  'una vez': '한 번',
  'entonces': '그때/그러면',
  'cuando era niño': '어렸을 때',
  'en aquella época': '그 시절에',
  'antes': '전에',
  'mientras': '~하는 동안',
  'cuando': '~할 때',
  'siempre que': '~할 때마다',
  'todos los días': '매일',
  'cada verano': '매 여름',
  'pasado mañana': '모레',
  'la semana que viene': '다음 주',
  'en el futuro': '미래에',
  'te prometo': '약속할게',
  'seguro': '분명히/확실히',
  'algún día': '언젠가',
  '¿dónde estará...?': '~는 어디에 있을까?',
  'será...': '~일 것이다 (추측)',
  'tendrá...': '~를 가졌을 것이다 (추측)',
  'podría': '~할 수 있을 텐데요 (정중)',
  'querría': '~하고 싶습니다 (정중)',
  'me gustaría': '~하고 싶습니다',
  '¿le importaría...?': '~해 주시겠어요?',
  'si + 접속법 과거': '비현실 가정 if절',
  'en tu lugar': '네 입장이라면',
  'yo que tú': '내가 너라면',
  'serían las...': '~시쯤이었을 것이다',
  'estaría en...': '~에 있었을 것이다',
  'tendría unos...': '~쯤 되었을 것이다',
  'esperar que': '~하기를 바라다',
  'querer que': '~하기를 원하다',
  'recomendar que': '~하라고 권하다',
  'pedir que': '~해 달라고 요청하다',
  'me alegra que': '~해서 기쁘다',
  'es importante que': '~하는 것이 중요하다',
  'dudar que': '~를 의심하다',
  'no creer que': '~라고 믿지 않다',
  'hasta que': '~할 때까지',
  'antes de que': '~하기 전에',
  'en cuanto': '~하자마자',
  'si tuviera': '내게 ~가 있다면',
  'si pudiera': '내가 할 수 있다면',
  'si fuera': '내가 ~라면',
  'quería que': '~하길 원했었다',
  'me pidió que': '~해 달라고 부탁했다',
  'era mejor que': '~하는 것이 더 나았다',
  'quisiera': '~하고 싶습니다 (공손)',
  'pudiera': '~할 수 있다면',
  'debiera': '~해야 한다면/해야 할 텐데',
  'por favor': '부탁합니다',
  'un momento': '잠깐만',
  'con calma': '침착하게',
  'no + 접속법 현재': '부정 명령 기본 패턴',
  'no hables': '말하지 마',
  'no comas': '먹지 마',
  'no vivas': '살지 마'
};

export default function VerbMasterDetail() {
  const [activeTense, setActiveTense] = useState(TENSE_MASTER_DATA[0]);
  const activeCompanions = USAGE_COMPANION_DATA[activeTense.id] || [];

  const scrollTo = (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderForm = (form: string[], isLong: boolean) => {
      if (form[0] === '-') return <span className="text-slate-300 font-bold">-</span>;
      const fontSize = isLong ? 'text-[15px]' : 'text-[17px]';
      
      if (!form[1]) return <span className={`text-slate-900 font-bold ${fontSize}`}>{form[0]}</span>;
      return (
          <div className={`${fontSize} flex items-center justify-center`}>
            <span className="text-violet-600 font-bold">{form[0]}</span>
            <span className="text-slate-900 font-bold">{form[1]}</span>
          </div>
      );
  };

  const renderRegular = (val: string, base: string) => {
      const isLong = base.length >= 8;
      const fontSize = isLong ? 'text-[15px]' : 'text-[17px]';

      if (activeTense.isCompound) {
          const parts = val.split(' ');
          return (
              <div className={`${fontSize} flex items-center justify-center`}>
                <span className="text-violet-600 font-bold">{parts[0]}</span>
                <span className="text-slate-900 font-bold ml-1.5">{base}{parts[1].replace('-', '')}</span>
              </div>
          );
      }
      return (
          <div className={`${fontSize} flex items-center justify-center`}>
            <span className="text-slate-900 font-bold">{base}</span>
            <span className="text-red-500 font-bold">{val}</span>
          </div>
      );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto px-6 lg:px-8 py-8 font-sans text-slate-800 bg-white">
      
      <article className="flex-1 min-w-0">
          <header className="mb-6 border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 tracking-widest mb-2 uppercase">
                <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-[9px]">focus study</span>
                <ChevronRight size={10} />
                <span>verb master</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">
              스페인어 시제별 동사 변화
            </h1>
            <p className="text-[16px] text-slate-600 font-medium leading-relaxed max-w-3xl">
               원하시는 시제를 선택하여 용법부터 세부 변화까지 한눈에 확인하세요.
            </p>
          </header>

          {/* 상단 시제 선택 탭 (Favorited Style - Single Line Centered) */}
          <div className="flex justify-center mb-12">
            <div className="flex flex-nowrap overflow-x-auto no-scrollbar gap-1 p-1 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
                {TENSE_MASTER_DATA.map((tense) => (
                    <button
                        key={tense.id}
                        onClick={() => setActiveTense(tense)}
                        className={`px-5 py-2 rounded-xl text-[11px] font-bold transition-all whitespace-nowrap flex-shrink-0
                            ${activeTense.id === tense.id 
                                ? 'bg-white text-blue-600 shadow-md ring-1 ring-slate-200 scale-105' 
                                : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'}`}
                    >
                        {tense.name.split(' (')[0]}
                    </button>
                ))}
            </div>
          </div>

          <div key={activeTense.id} className="animate-in fade-in slide-in-from-bottom-2 duration-400">
            {/* 시제 제목 */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900">{activeTense.name}</h2>
            </div>

            {/* 1. 용법 및 예문 */}
            <div id="sec-1" className="mb-16 scroll-mt-24">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="text-blue-600 font-bold">1.</span> 용법 및 예문
                </h3>
                <div className="space-y-8">
                    <div>
                        <h4 className="text-[14px] font-bold text-slate-500 mb-3 tracking-wide pl-3 border-l-4 border-blue-400">
                            1-1. 상황별 용법 + 예문
                        </h4>
                        <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
                            <table className="w-full text-[17px] text-center border-collapse">
                                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-[14px]">
                                    <tr>
                                        <th className="px-6 py-4 w-2/5 border-r border-slate-100 whitespace-nowrap">상황</th>
                                        <th className="px-6 py-4">예문 및 해석</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {activeTense.usage.map((row, i) => (
                                        <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-3 font-bold text-slate-700 bg-slate-50/30 border-r border-slate-100 whitespace-nowrap text-sm">{row.situ}</td>
                                            <td className="px-6 py-3">
                                                <div className="flex flex-col items-center">
                                                    <span className="text-slate-900 font-bold italic">&quot;{row.ex}&quot;</span>
                                                    <span className="text-[13px] text-slate-400 mt-1.5 font-medium">{row.ko}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-[14px] font-bold text-emerald-700 mb-3 tracking-wide pl-3 border-l-4 border-emerald-400">
                            1-2. 함께 쓰는 단어 / 표현
                        </h4>
                        <p className="text-xs text-slate-400 mb-2 pl-1">시제와 자주 결합하는 단어/표현을 뜻과 함께 정리했습니다.</p>
                        <div className="grid md:grid-cols-2 gap-4">
                            {activeCompanions.map((group) => (
                                <div key={group.cat} className="border border-slate-200 rounded-xl shadow-sm overflow-hidden bg-white">
                                    <table className="w-full border-collapse text-left">
                                        <thead className="bg-emerald-50/40 border-b border-emerald-100">
                                            <tr>
                                                <th colSpan={2} className="px-4 py-3 text-[15px] font-bold text-emerald-700 text-center">
                                                    {group.cat}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            <tr className="align-top">
                                                <th className="px-4 py-3 w-20 border-r border-slate-100 text-[12px] font-bold text-slate-400 text-center">표현</th>
                                                <td className="px-4 py-3 text-center">
                                                    <div className="grid grid-cols-1 gap-2">
                                                        {group.words.map((word) => (
                                                            <div
                                                                key={word}
                                                                className="rounded-lg border border-emerald-100 bg-emerald-50/30 px-3 py-2 text-center"
                                                            >
                                                                <p className="text-[17px] font-bold text-emerald-700 leading-snug">{word}</p>
                                                                <p className="text-[13px] text-emerald-700/70 mt-0.5">
                                                                    {EXPRESSION_MEANINGS[word] || '표현 의미'}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="align-top">
                                                <th className="px-4 py-3 border-r border-slate-100 text-[12px] font-bold text-slate-400">핵심</th>
                                                <td className="px-4 py-3 text-sm text-slate-600 leading-relaxed">{group.tip}</td>
                                            </tr>
                                            {group.ex && (
                                                <tr className="align-top">
                                                    <th className="px-4 py-3 border-r border-slate-100 text-[12px] font-bold text-slate-400">예문</th>
                                                    <td className="px-4 py-3 text-[15px] text-slate-900 font-semibold">&quot;{group.ex}&quot;</td>
                                                </tr>
                                            )}
                                            {group.ko && (
                                                <tr className="align-top">
                                                    <th className="px-4 py-3 border-r border-slate-100 text-[12px] font-bold text-slate-400">해석</th>
                                                    <td className="px-4 py-3 text-sm text-slate-500 leading-relaxed">{group.ko}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. 규칙 변화 */}
            <div id="sec-2" className="mb-16 scroll-mt-24">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="text-blue-600 font-bold">2.</span> 규칙 변화 (conjugation)
                </h3>
                <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
                    <table className="w-full text-[17px] text-center border-collapse">
                        <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-[14px]">
                            <tr>
                                <th className="px-6 py-4 w-1/4 border-r border-slate-100">주어</th>
                                <th className="px-6 py-4 w-1/4 text-blue-600 font-bold">hablar (-ar)</th>
                                <th className="px-6 py-4 w-1/4 text-emerald-600 font-bold">comer (-er)</th>
                                <th className="px-6 py-4 w-1/4 text-slate-900 font-bold">vivir (-ir)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {PRONOUNS.map((pronoun, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-3 font-bold text-slate-400 bg-slate-50/30 border-r border-slate-100 whitespace-nowrap">{pronoun}</td>
                                    <td className="px-6 py-3 font-bold text-slate-900 whitespace-nowrap">
                                        {renderRegular(activeTense.regular.ar[i], 'habl')}
                                    </td>
                                    <td className="px-6 py-3 font-bold text-slate-900 whitespace-nowrap">
                                        {renderRegular(activeTense.regular.er[i], 'com')}
                                    </td>
                                    <td className="px-6 py-3 font-bold text-slate-900 whitespace-nowrap">
                                        {renderRegular(activeTense.regular.ir[i], 'viv')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 3. 주요 불규칙 */}
            {(activeTense.irregularGroups || activeTense.simpleIrregulars) && (
                <div id="sec-3" className="scroll-mt-24">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <span className="text-blue-600 font-bold">3.</span> 주요 불규칙
                    </h3>
                    
                    {/* 현재완료 전용 요약 표 (Participio) */}
                    {activeTense.simpleIrregulars ? (
                        <div className="border border-slate-200 rounded-xl shadow-sm overflow-hidden max-w-2xl mx-auto">
                            <table className="w-full text-center border-collapse">
                                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-[13px]">
                                    <tr>
                                        <th className="py-3 border-r border-slate-100">동사 (원형)</th>
                                        <th className="py-3 border-r border-slate-100">뜻</th>
                                        <th className="py-3">과거분사 (p.p.)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {activeTense.simpleIrregulars.map((row, i) => {
                                        const isLong = row.v.length >= 8;
                                        return (
                                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                                <td className={`py-4 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100 ${isLong ? 'text-[15px]' : 'text-[16px]'}`}>{row.v}</td>
                                                <td className="py-4 text-slate-500 text-[14px] border-r border-slate-100 font-medium">{row.mean}</td>
                                                <td className={`py-4 font-bold text-violet-600 ${isLong ? 'text-[15px]' : 'text-[17px]'}`}>{row.pp}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="space-y-12">
                            {activeTense.irregularGroups?.map((group, idx) => (
                                <div key={idx} id={`irreg-${idx}`} className="scroll-mt-24">
                                    <h4 className="text-[14px] font-bold text-slate-500 mb-3 tracking-wide pl-3 border-l-4 border-amber-400 flex items-center gap-2">
                                        <Zap size={14} className="text-amber-500 fill-amber-500" /> {group.cat}
                                    </h4>
                                    <div className="border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                                        <table className="w-full text-center border-collapse table-fixed">
                                            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-[11px]">
                                                <tr>
                                                    <th className="w-[12%] py-3 border-r border-slate-100">동사</th>
                                                    <th className="w-[12%] py-3 border-r border-slate-100">뜻</th>
                                                    <th className="w-[12.6%] py-3">yo</th>
                                                    <th className="w-[12.6%] py-3">tú</th>
                                                    <th className="w-[12.6%] py-3">él/ella</th>
                                                    <th className="w-[12.6%] py-3">nos.</th>
                                                    <th className="w-[12.6%] py-3">vos.</th>
                                                    <th className="w-[12.6%] py-3">ellos/as</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 bg-white">
                                                {group.verbs.map((v, vi) => {
                                                    const isLong = v.v.length >= 8;
                                                    return (
                                                        <tr key={vi} className="hover:bg-slate-50/50 transition-colors">
                                                            <td className={`py-4 font-bold text-slate-900 bg-slate-50/30 border-r border-slate-100 px-1 break-all ${isLong ? 'text-[14px]' : 'text-[15px]'}`}>{v.v}</td>
                                                            <td className="py-4 text-slate-500 text-[11px] border-r border-slate-100 font-medium px-1 leading-tight">{v.mean}</td>
                                                            <td className="py-4 px-0.5">{renderForm(v.forms.yo, isLong)}</td>
                                                            <td className="py-4 px-0.5">{renderForm(v.forms.tu, isLong)}</td>
                                                            <td className="py-4 px-0.5">{renderForm(v.forms.el, isLong)}</td>
                                                            <td className="py-4 px-0.5">{renderForm(v.forms.nos, isLong)}</td>
                                                            <td className="py-4 px-0.5">{renderForm(v.forms.vos, isLong)}</td>
                                                            <td className="py-4 px-0.5">{renderForm(v.forms.ellos, isLong)}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
          </div>
      </article>

      {/* Sidebar 목차 */}
      <aside className="hidden lg:block w-56 shrink-0">
        <div className="sticky top-8 border-l border-slate-100 pl-6">
            <h4 className="text-[10px] font-bold text-slate-400 tracking-widest mb-4 uppercase">contents</h4>
            <ul className="space-y-3 text-[13px]">
                {[
                    { id: 'sec-1', label: '용법 및 예문' },
                    { id: 'sec-2', label: '규칙 변화' },
                    { id: 'sec-3', label: '주요 불규칙' }
                ].map((item) => (
                    <React.Fragment key={item.id}>
                        <li>
                            <button onClick={() => scrollTo(item.id)} className="text-slate-500 hover:text-blue-600 transition-colors text-left flex items-center gap-2 group font-medium">
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-blue-600 transition-colors shadow-sm"></div>
                                {item.label}
                            </button>
                        </li>
                        {item.id === 'sec-3' && activeTense.irregularGroups?.map((group, gIdx) => (
                            <li key={gIdx} className="pl-4">
                                <button onClick={() => scrollTo(`irreg-${gIdx}`)} className="text-slate-400 hover:text-amber-600 transition-colors text-left flex items-center gap-2 group text-[11px] font-medium">
                                    <div className="w-1 h-1 rounded-full bg-slate-200 group-hover:bg-amber-400 transition-colors"></div>
                                    {group.cat}
                                </button>
                            </li>
                        ))}
                    </React.Fragment>
                ))}
            </ul>
        </div>
      </aside>
    </div>
  );
}
