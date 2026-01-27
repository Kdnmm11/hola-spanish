export interface ContentSection {
  title: string;
  desc: string;
}

export interface GrammarItem {
  id: string;
  title: string;
  description: string;
  difficulty: 'Level 1' | 'Level 2' | 'Level 3' | 'Level 4';
  theme: string;
  sections: ContentSection[];
  quiz?: QuizQuestion[];
}

export interface QuizQuestion {
    q: string;
    options: string[];
    answer: number;
    explain: string;
}

export const GRAMMAR_DATA: GrammarItem[] = [
  // --- 🟢 Level 1: 입문 (Starter) ---
  {
    id: 'pronunciation',
    title: 'Chapter 1: 발음과 철자',
    description: '스페인어 알파벳 발음 규칙, 강세 위치(tilde), 특수 자음(c, g, h 등) 정리',
    difficulty: 'Level 1',
    theme: '기초',
    sections: [
      { title: '모음 (Vocales)', desc: 'a, e, i, o, u 5가지 모음의 정확한 소리' },
      { title: '자음 변이 규칙', desc: 'c, g, gu/qu 등 뒤에 오는 모음에 따라 변하는 소리' },
      { title: '강세 규칙', desc: '단어의 끝 글자에 따라 강세 위치가 정해지는 원칙' }
    ],
    quiz: [
        { q: "다음 중 강세 위치가 다른 하나는?", options: ['casa', 'lunes', 'papel', 'mesa'], answer: 2, explain: "'papel'은 자음(l)으로 끝나므로 마지막 음절에 강세가 옵니다. 나머지는 모음으로 끝나 뒤에서 두 번째입니다." }
    ]
  },
  {
    id: 'sentence-structure',
    title: 'Chapter 2: 문장의 기본 구조',
    description: 'S+V+O 어순, 동사 형태에 따른 주어 생략 원리, 어순의 유연성',
    difficulty: 'Level 1',
    theme: '기초',
    sections: [
      { title: '문장의 기본 구조', desc: '주어 + 동사 + 목적어의 기본 어순 이해' },
      { title: '주어와 생략', desc: '동사 변화에 인칭이 포함되어 주어를 생략하는 현상' },
      { title: '어순과 강조', desc: '강조하고 싶은 요소를 문두로 보내는 어순 변화' }
    ]
  },
  {
    id: 'interrogatives',
    title: 'Chapter 3: 의문문과 감탄문',
    description: '의문사(qué, dónde 등) 용법, 앞뒤 문장 부호(¿?, ¡!) 사용법',
    difficulty: 'Level 1',
    theme: '기초',
    sections: [
      { title: '의문문의 형태', desc: '앞뒤 물음표와 억양을 통한 의문문 만들기' },
      { title: '주요 의문사', desc: 'Qué, Dónde, Quién 등 필수 의문사 정리' },
      { title: '전치사 결합', desc: 'De dónde, Con quién 등 전치사와 의문사의 결합' },
      { title: '감탄문', desc: '¡Qué + 형용사! 등을 이용한 감정 표현' }
    ]
  },
  {
    id: 'nouns-and-gender',
    title: 'Chapter 4: 명사의 성과 수',
    description: '남성(-o)/여성(-a) 구분 및 예외, 단수에서 복수형 만드는 규칙',
    difficulty: 'Level 1',
    theme: '명사/형용사',
    sections: [
      { title: '명사의 성', desc: '-o(남성), -a(여성) 어미 규칙과 예외 명사들' },
      { title: '명사의 수', desc: '모음 뒤 -s, 자음 뒤 -es를 붙여 복수형 만들기' },
      { title: '성·수 일치', desc: '명사에 맞춰 관사와 형용사를 일치시키는 원칙' }
    ]
  },
  {
    id: 'articles',
    title: 'Chapter 5: 관사',
    description: '정관사(el/la)와 부정관사(un/una)의 특정성 여부, 축약 규칙(al, del)',
    difficulty: 'Level 1',
    theme: '명사/형용사',
    sections: [
      { title: '관사의 체계', desc: '정관사와 부정관사의 성·수 변화표' },
      { title: '상세 용법', desc: '특정한 것을 가리킬 때와 막연한 것을 가리킬 때의 차이' },
      { title: '예외 및 주의사항', desc: 'el agua (여성 명사 앞 el 사용) 및 전치사 축약' }
    ]
  },
  {
    id: 'pronouns',
    title: 'Chapter 6: 인칭대명사',
    description: '주격(yo, tú...)과 전치격(mí, ti...), 그리고 \'conmigo/contigo\' 예외',
    difficulty: 'Level 1',
    theme: '명사/형용사',
    sections: [
      { title: '주격 인칭대명사', desc: '나, 너, 그, 그녀 등 주어로 쓰이는 대명사' },
      { title: '전치격 인칭대명사', desc: '전치사 뒤에서 변하는 형태 (mí, ti 등)' },
      { title: '당신 (Usted)', desc: '2인칭이지만 3인칭 문법을 따르는 존칭 표현' }
    ]
  },
  {
    id: 'adjectives',
    title: 'Chapter 7: 형용사',
    description: '명사와의 성·수 일치, 전치/후치에 따른 의미 변화, 형용사 단축(Apócope)',
    difficulty: 'Level 1',
    theme: '명사/형용사',
    sections: [
      { title: '성·수 일치 규칙', desc: '수식하는 명사에 맞춰 어미를 변화시키는 법' },
      { title: '위치와 의미', desc: '명사 앞(주관적)과 뒤(객관적) 위치에 따른 뉘앙스 차이' },
      { title: '형용사 단축', desc: 'bueno → buen 등 특정 조건에서의 어미 탈락' }
    ]
  },
  {
    id: 'numbers',
    title: 'Chapter 8: 숫자',
    description: '0~100 이상의 기수 읽기 및 서수 표현법',
    difficulty: 'Level 1',
    theme: '숫자',
    sections: [
      { title: '기수 (0~100+)', desc: '16~29의 결합 방식과 100 이상의 성 일치' },
      { title: '서수 (첫째~)', desc: 'primero, segundo 등 순서를 나타내는 수' }
    ]
  },
  {
    id: 'possessives',
    title: 'Chapter 9: 소유 표현',
    description: '소유형용사(전치/후치)와 소유대명사(~의 것), 중의성 해결법(de él 등)',
    difficulty: 'Level 1',
    theme: '명사/형용사',
    sections: [
      { title: '소유형용사 (전치)', desc: 'mi, tu, su 등 명사 앞에서 소유를 나타냄' },
      { title: '소유형용사 (후치)', desc: 'mío, tuyo 등 명사 뒤에서 강조하거나 보어로 사용' },
      { title: '소유대명사', desc: 'el mío 등 명사를 대신하여 누구의 것을 표현' },
      { title: '중의성 해결', desc: 'su/suyo의 모호함을 de + 인칭대명사로 명확화' }
    ]
  },
  {
    id: 'demonstratives',
    title: 'Chapter 10: 지시 표현',
    description: '거리별 지시어(이/그/저)와 상황을 나타내는 중성형(esto, eso)',
    difficulty: 'Level 1',
    theme: '명사/형용사',
    sections: [
      { title: '3단계 거리 체계', desc: 'este(여기), ese(거기), aquel(저기) 구분' },
      { title: '지시형용사/대명사', desc: '명사를 수식하거나 대신하는 형태' },
      { title: '중성 지시대명사', desc: 'esto, eso 등 이름 모를 사물이나 상황 지칭' }
    ]
  },
  {
    id: 'verbs-present',
    title: 'Chapter 11: 동사 기초와 현재시제',
    description: '-ar, -er, -ir 동사의 규칙 변화표와 현재시제 용법',
    difficulty: 'Level 1',
    theme: '핵심 동사',
    sections: [
      { title: '동사의 기본 그룹', desc: '-ar, -er, -ir 세 가지 동사군의 특징' },
      { title: '규칙 변화', desc: '어간은 유지하고 어미만 인칭별로 바꾸는 규칙' },
      { title: '현재시제 용법', desc: '현재 동작, 습관, 불변의 진리, 가까운 미래 표현' }
    ]
  },
  {
    id: 'ser-estar',
    title: 'Chapter 12: Ser와 Estar',
    description: '본질·정체성(Ser) vs 상태·위치(Estar)의 심화 비교 및 형용사 의미 변화',
    difficulty: 'Level 1',
    theme: '핵심 동사',
    sections: [
      { title: 'Ser의 용법', desc: '국적, 직업, 성격, 시간 등 불변의 본질' },
      { title: 'Estar의 용법', desc: '위치, 감정, 건강 상태 등 가변적인 상태' },
      { title: '의미 변화', desc: '동사에 따라 뜻이 달라지는 형용사 (rico, listo 등)' }
    ]
  },

  // --- 🟡 Level 2: 초급 (Beginner) ---
  {
    id: 'verbs-irregular',
    title: 'Chapter 13: 현재시제의 불규칙 변화',
    description: '어간 변화(장화 동사), Yo 불규칙(-go, -zco), 완전 불규칙 패턴',
    difficulty: 'Level 2',
    theme: '동사 확장',
    sections: [
      { title: '어간 변화 (장화)', desc: 'e→ie, o→ue 등 어간 모음이 변하는 동사들' },
      { title: 'Yo 불규칙', desc: 'hago, pongo 등 1인칭 단수만 불규칙인 경우' },
      { title: '완전 불규칙', desc: 'ser, estar, ir 등 패턴 없이 변하는 필수 동사' }
    ]
  },
  {
    id: 'haber',
    title: 'Chapter 14: Haber (Hay)',
    description: '존재 유무를 나타내는 Hay의 비인칭 규칙과 Estar와의 차이점',
    difficulty: 'Level 2',
    theme: '동사 확장',
    sections: [
      { title: 'Hay의 규칙', desc: '주어 없이 "있다"를 나타내는 비인칭 용법' },
      { title: '결합 명사구', desc: '부정관사, 숫자, 무관사 명사와 결합' },
      { title: 'Hay vs Estar', desc: '존재(뭐가 있니?)와 위치(어디 있니?)의 구분' }
    ]
  },
  {
    id: 'tener-ir-hacer',
    title: 'Chapter 15: Tener, Ir, Hacer',
    description: '소유·나이(Tener), 이동·미래(Ir), 행위·날씨(Hacer) 관용 표현',
    difficulty: 'Level 2',
    theme: '동사 확장',
    sections: [
      { title: 'Tener', desc: '소유, 나이, 신체적 감각(배고픔, 추위 등)' },
      { title: 'Ir', desc: '장소 이동(a)과 근접 미래(a + 동사원형)' },
      { title: 'Hacer', desc: '행위 및 날씨 표현(hace calor 등)' }
    ]
  },
  {
    id: 'quantifiers',
    title: 'Chapter 16: 수량 한정사',
    description: 'Mucho, Poco 등의 형용사(변화) vs 부사(불변) 용법, \'todo\'의 특수 어순',
    difficulty: 'Level 2',
    theme: '디테일',
    sections: [
      { title: '주요 수량 한정사', desc: 'mucho, poco, demasiado 등의 의미' },
      { title: '형용사 vs 부사', desc: '명사 수식(변화)과 동사 수식(불변)의 차이' },
      { title: 'Todo의 특수성', desc: 'todo + 정관사 + 명사 순서의 예외적 구조' }
    ]
  },
  {
    id: 'time-expressions',
    title: 'Chapter 17: 시간 및 부사 표현',
    description: '날짜 기준(ayer, hoy), 단위(지난/이번/다음), 시점/속도 부사',
    difficulty: 'Level 2',
    theme: '디테일',
    sections: [
      { title: '날짜 기준 표현', desc: 'anteayer, ayer, hoy, mañana, pasado mañana' },
      { title: '단위별 표현', desc: 'pasado(지난), este(이번), próximo(다음) 결합' },
      { title: '시점/속도 부사', desc: 'temprano/tarde(시간)와 rápido/despacio(속도) 구분' }
    ]
  },
  {
    id: 'prepositions-adverbs',
    title: 'Chapter 18: 전치사와 부사 기초',
    description: '필수 전치사 7종, -mente를 이용한 형용사의 부사화 규칙',
    difficulty: 'Level 2',
    theme: '디테일',
    sections: [
      { title: '기초 전치사', desc: 'a, de, en, con 등 문장을 연결하는 핵심 전치사' },
      { title: '부사 만들기', desc: '형용사 여성형 + mente 규칙' },
      { title: '정도 부사', desc: 'muy(매우)와 mucho(많이)의 올바른 구분' },
      { title: '개인적 a', desc: '사람 목적어 앞에 전치사 a를 쓰는 규칙' }
    ]
  },
  {
    id: 'object-pronouns',
    title: 'Chapter 19: 목적격 대명사와 중복 구조',
    description: '직접/간접 목적격 대명사, 위치 규칙, Se 변신(La-la rule)',
    difficulty: 'Level 2',
    theme: '필수 장벽',
    sections: [
      { title: '대명사 형태', desc: '직접(~을)과 간접(~에게) 대명사의 형태 비교' },
      { title: '위치 규칙', desc: '동사 앞 분리 혹은 원형 뒤 결합' },
      { title: '순서와 변화', desc: '간접+직접 순서와 le/les가 se로 변하는 규칙' }
    ]
  },
  {
    id: 'reflexive-verbs',
    title: 'Chapter 20: 재귀동사',
    description: '동작이 자신에게 돌아오는 동사와 일상 표현',
    difficulty: 'Level 2',
    theme: '필수 장벽',
    sections: [
      { title: '재귀동사 개념', desc: '타동사(남을~)와 재귀동사(자신을~)의 차이' },
      { title: '일상 표현', desc: '씻다, 입다, 잠들다 등 신체/상태 변화 동사' },
      { title: '위치 규칙', desc: '목적격 대명사와 동일한 위치 규칙 적용' }
    ]
  },
  {
    id: 'gustar-like-verbs',
    title: 'Chapter 21: 역구조 동사',
    description: 'Gustar류 동사의 주어-동사 도치 구조와 용법',
    difficulty: 'Level 2',
    theme: '필수 장벽',
    sections: [
      { title: '문장 구조', desc: '~에게(간접목적어) + 즐거움을 준다(동사) + 대상(주어)' },
      { title: '주요 동사', desc: 'encantar, interesar, doler 등 유사 동사' },
      { title: '주의사항', desc: '간접 목적격 대명사의 필수 사용 원칙' }
    ],
    quiz: [
        { q: "Juan ( ) ( ) las flores. (역구조 Gustar)", options: ['le gusta', 'le gustan', 'me gustan', 'les gusta'], answer: 1, explain: "주어가 las flores(복수)이므로 gustan, Juan에게(3인칭)이므로 le를 씁니다." },
        { q: "나는 커피를 좋아해. (Gustar)", options: ['Me gusto el café.', 'Yo gusto el café.', 'Me gusta el café.', 'Me gustan los cafés.'], answer: 2, explain: "주어는 el café(단수)이므로 gusta를 쓰고, 나에게(me)를 붙입니다." }
    ]
  },

  // --- 🟠 Level 3: 중급 (Intermediate) ---
  {
    id: 'preterite-indefinite',
    title: 'Chapter 22: 직설법 점과거',
    description: '과거의 완료된 사건 표현, 불규칙 어간 그룹(U, I, J-stems)',
    difficulty: 'Level 3',
    theme: '과거 정복',
    sections: [
      { title: '규칙 변화', desc: '-ar(-é)과 -er/-ir(-í)의 어미 변화와 강세' },
      { title: '주요 불규칙', desc: 'ser/ir(fui), dar(di), ver(vi) 등' },
      { title: '어간 변화', desc: 'tener(tuv-), hacer(hic-) 등 어간이 변하는 그룹' },
      { title: '3인칭 변화', desc: 'pedir, dormir 등 3인칭에서만 모음이 변하는 동사' }
    ]
  },
  {
    id: 'preterite-imperfect',
    title: 'Chapter 23: 직설법 선과거',
    description: '과거의 습관, 진행, 배경 묘사. 점과거와의 시각적 차이 비교',
    difficulty: 'Level 3',
    theme: '과거 정복',
    sections: [
      { title: '규칙 변화', desc: '-ar(-aba)와 -er/-ir(-ía)의 단순한 변화' },
      { title: '불규칙 동사', desc: 'ser(era), ir(iba), ver(veía) 3가지뿐인 불규칙' },
      { title: '주요 용법', desc: '과거의 습관, 진행 중인 동작, 배경 묘사' },
      { title: '점과거 vs 선과거', desc: '완료된 점(Dot)과 지속된 선(Line)의 개념 차이' }
    ]
  },
  {
    id: 'perfect-tenses',
    title: 'Chapter 24: 완료형 시제',
    description: '현재완료(He~), 과거완료(Había~)와 불규칙 과거분사 암기',
    difficulty: 'Level 3',
    theme: '과거 정복',
    sections: [
      { title: '과거분사 만들기', desc: '-ado, -ido 규칙과 abirto, hecho 등 불규칙' },
      { title: '현재완료', desc: 'haber 현재(he...) + p.p. (현재 연관/경험)' },
      { title: '과거완료', desc: 'haber 선과거(había...) + p.p. (대과거)' }
    ]
  },
  {
    id: 'future-conditional',
    title: 'Chapter 25: 미래와 조건형',
    description: '계획(ir a), 의지(미래), 가정 및 정중한 요청(조건형) 표현법',
    difficulty: 'Level 3',
    theme: '미래/의지',
    sections: [
      { title: '근접 미래', desc: 'ir a + 원형: 확실한 계획' },
      { title: '직설법 미래', desc: '원형 + é/ás...: 미래 의지 및 현재 추측' },
      { title: '조건형', desc: '원형 + ía...: 가정 및 정중한 요청' },
      { title: '불규칙 어간', desc: 'tendr-, har- 등 미래/조건형 공통 불규칙' }
    ]
  },
  {
    id: 'imperatives',
    title: 'Chapter 26: 명령형',
    description: '긍정/부정 명령의 형태 차이, Tú 불규칙 8종, 대명사 결합 위치',
    difficulty: 'Level 3',
    theme: '미래/의지',
    sections: [
      { title: '긍정 명령', desc: '인칭별로 다른 시제에서 형태를 빌려옴' },
      { title: '부정 명령', desc: '모든 인칭에서 접속법 현재 형태 사용' },
      { title: 'Tú 불규칙', desc: 'di, haz, ve 등 8가지 짧은 불규칙 형태' },
      { title: '대명사 위치', desc: '긍정은 뒤에 붙이고, 부정은 앞에 둠' }
    ]
  },
  {
    id: 'por-para',
    title: 'Chapter 27: Por와 Para의 구분',
    description: '원인·경로(Por) vs 목적·결과(Para)의 4대 핵심 대조',
    difficulty: 'Level 3',
    theme: '고급 전조',
    sections: [
      { title: 'Para 용법', desc: '목적, 수혜자, 마감 기한, 도착지' },
      { title: 'Por 용법', desc: '원인, 수단, 경로, 기간, 교환' },
      { title: '핵심 대조', desc: '장소, 시간, 인과 관계에서의 차이점 요약' }
    ]
  },
  {
    id: 'passive-se',
    title: 'Chapter 28: 수동태와 무인칭 Se',
    description: '격식 수동태(Ser+PP), 일상 수동(Se Pasiva), 무인칭(Se Impersonal)',
    difficulty: 'Level 3',
    theme: '고급 전조',
    sections: [
      { title: '수동태', desc: 'Ser + P.P (격식) vs Se + 동사 (일상)' },
      { title: '무인칭 Se', desc: '주어 없이 일반적인 사실을 말할 때 사용' },
      { title: '구분법', desc: '동사의 수 일치 여부로 수동/무인칭 구분' }
    ]
  },

  // --- 🔴 Level 4: 고급 (Advanced) ---
  {
    id: 'subjunctive-basics',
    title: 'Chapter 29: 접속법 기초',
    description: '소망, 의심 등 주관적 태도 표현(WEIRDO) 입문, 어미 교차 법칙',
    difficulty: 'Level 4',
    theme: '접속법 입문',
    sections: [
      { title: '접속법 형태', desc: '직설법 Yo에서 어미를 교차(-ar↔-er/ir)하여 생성' },
      { title: '완전 불규칙', desc: 'sea, vaya 등 교차 법칙을 따르지 않는 6개 동사' },
      { title: 'WEIRDO 용법', desc: '소망, 감정, 의심 등 접속법을 쓰는 상황' }
    ]
  },
  {
    id: 'clause-connections',
    title: 'Chapter 30: 절의 연결과 관계사',
    description: '관계대명사(que, quien, cuyo), 명사/형용사/부사절 내 법(Mode) 선택',
    difficulty: 'Level 4',
    theme: '접속법 입문',
    sections: [
      { title: '관계대명사', desc: 'que, quien, cuyo 등 문장 연결 도구' },
      { title: '형용사절', desc: '선행사의 특정 여부에 따른 직설법/접속법 선택' },
      { title: '부사절', desc: '목적/조건(항상 접속법) vs 시간(상황에 따라)' }
    ]
  },
  {
    id: 'subjunctive-imperfect',
    title: 'Chapter 31: 접속법 과거',
    description: '과거 시제 일치와 Si 가정문(-ra형) 학습',
    difficulty: 'Level 4',
    theme: '접속법 심화',
    sections: [
      { title: '형태 만들기', desc: '점과거 3인칭 복수에서 -ron을 떼고 -ra 붙이기' },
      { title: '시제 일치', desc: '주절이 과거일 때 종속절도 과거로 일치' },
      { title: 'Si 가정문', desc: '현재 사실과 반대되는 가정 (내가 ~라면)' }
    ]
  },
  {
    id: 'subjunctive-perfect',
    title: 'Chapter 32: 접속법 완료 시제',
    description: '현재/과거완료 접속법의 형태와 대과거 가정법',
    difficulty: 'Level 4',
    theme: '접속법 심화',
    sections: [
      { title: '현재완료 접속법', desc: 'haya + p.p. (이미 완료된 일에 대한 감정)' },
      { title: '과거완료 접속법', desc: 'hubiera + p.p. (과거 사실 반대 가정)' },
      { title: '시제 비교', desc: '직설법/접속법 완료 시제들의 차이점 정리' }
    ]
  },
  {
    id: 'si-clauses',
    title: 'Chapter 33: Si 조건문과 가정법',
    description: '실현 가능성(1유형), 가상(2유형), 후회(3유형) 공식',
    difficulty: 'Level 4',
    theme: '가정법',
    sections: [
      { title: '제1유형 (현실)', desc: 'Si + 직설법 현재 (일어날 수 있는 일)' },
      { title: '제2유형 (가상)', desc: 'Si + 접속법 과거 (현재 사실 반대)' },
      { title: '제3유형 (후회)', desc: 'Si + 접속법 과거완료 (과거 사실 반대)' }
    ]
  },
  {
    id: 'indirect-speech',
    title: 'Chapter 34: 화법 전환과 시제 일치',
    description: '직접화법 → 간접화법 전환 시 시제 후퇴 규칙',
    difficulty: 'Level 4',
    theme: '고급 구문',
    sections: [
      { title: '시제 후퇴', desc: '전달 동사가 과거일 때 시제가 한 단계씩 밀림' },
      { title: '부사 변화', desc: 'hoy → ese día 등 시점/장소 부사의 변화' },
      { title: '문장 유형별', desc: '평서문, 의문문, 명령문의 전환 규칙' }
    ]
  },
  {
    id: 'advanced-participles',
    title: 'Chapter 35: 분사와 동명사의 심화 용법',
    description: "동명사의 부사적 용법, 과거분사 절대 구문, 그리고 진행/완료 양태를 나타내는 필수 동사구 학습",
    difficulty: 'Level 4',
    theme: '고급 구문',
    sections: [
      { title: '동명사 용법', desc: '동시 동작, 수단, 원인을 나타내는 부사적 기능' },
      { title: '절대 구문', desc: '과거분사를 이용한 독립적인 부사절 만들기' },
      { title: '동사구', desc: '진행, 지속, 완료 등을 나타내는 관용적 표현' }
    ]
  },
  {
    id: 'logical-connectors',
    title: 'Chapter 36: 논리적 연결어',
    description: "인과, 대조, 첨가 등의 논리적 흐름을 만드는 연결어의 기능적 분류와 법(Mode) 선택 학습",
    difficulty: 'Level 4',
    theme: '고급 구문',
    sections: [
      { title: '기능적 분류', desc: '원인, 결과, 대조, 첨가에 따른 연결어 종류' },
      { title: '법의 선택', desc: '직설법과 접속법을 유도하는 특정 연결어 규칙' },
      { title: '실전 활용', desc: '문맥에 따른 논리 구조의 문장 적용 비교' }
    ]
  },
  {
    id: 'relative-pronouns-advanced',
    title: 'Chapter 37: 관계대명사 심화',
    description: "문장 전체를 받는 중성 관계사(lo que/lo cual)와 성·수를 일치시키는 복합 관계사(el cual) 학습",
    difficulty: 'Level 4',
    theme: '고급 구문',
    sections: [
      { title: '중성 관계대명사', desc: 'lo que(문두 가능)와 lo cual(콤마 필수)의 차이' },
      { title: '복합 관계사', desc: '선행사의 성·수에 일치시키는 el cual 시리즈' },
      { title: '전치사 결합', desc: '전치사의 길이에 따른 관계사 선택 규칙' }
    ]
  },
  {
    id: 'concessive-clauses',
    title: 'Chapter 38: 양보절 심화',
    description: "aunque 뒤에 오는 직설법과 접속법의 의미 차이 및 다양한 양보 접속사 학습",
    difficulty: 'Level 4',
    theme: '고급 구문',
    sections: [
      { title: 'Aunque의 두 얼굴', desc: '직설법(사실)과 접속법(가설/양보)의 뉘앙스 차이' },
      { title: '기타 양보 접속사', desc: 'a pesar de (que), por más que 등 상황별 접속사' },
      { title: '법의 선택 가이드', desc: '과거 사실, 현재 확신, 미래 가정에 따른 법 선택' }
    ]
  },
  {
    id: 'neuter-lo',
    title: 'Chapter 39: 명사화와 중성 대명사 lo',
    description: "추상적인 개념을 명사화하는 lo + 형용사와 문장 전체를 받는 중성 대명사 용법 학습",
    difficulty: 'Level 4',
    theme: '고급 구문',
    sections: [
      { title: '추상 명사화', desc: 'lo + 형용사/부사: "~한 것/부분"이라는 명사 생성' },
      { title: '상황 지칭 (lo de)', desc: '특정한 사건이나 화제 전체를 모호하게 지칭' },
      { title: '강조 및 대명사', desc: '정도의 강조(얼마나 ~한지)와 아이디어 지칭' }
    ]
  }
];
