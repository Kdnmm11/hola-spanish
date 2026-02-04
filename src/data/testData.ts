export interface GrammarQuizItem {
    id: number;
    q: string;
    options: string[];
    answer: number;
    chapter: string;
    explain: string;
}

export interface ConjugationQuizItem {
    id: number;
    sentence: string;
    verb: string;
    answer: string;
    hint?: string;
    translation?: string;
    explanation?: string;
    level?: string;
}

export interface ErrorCorrectionItem {
    id: number;
    sentence: string[];
    wrongIndex: number;
    correct: string;
    explain: string;
    correct_alt?: string;
}

export const GRAMMAR_QUIZ_POOL: GrammarQuizItem[] = [
    { id: 1, q: "다음 중 강세 위치가 다른 하나는?", options: ['casa', 'lunes', 'papel', 'mesa'], answer: 2, chapter: 'Ch 1. 발음과 강세', explain: "'papel'은 자음(l)으로 끝나므로 마지막 음절에 강세가 옵니다. 나머지는 모음으로 끝나 뒤에서 두 번째입니다." },
    { id: 2, q: "Juan (     ) (     ) las flores.", options: ['le gusta', 'le gustan', 'me gustan', 'les gusta'], answer: 1, explain: "주어가 las flores(복수)이므로 gustan, Juan에게(3인칭)이므로 le를 씁니다.", chapter: 'Ch 30. Gustar 동사' },
    { id: 3, q: "어제 나는 학교에 갔다.", options: ['Ayer voy a la escuela.', 'Ayer fui a la escuela.', 'Ayer iba a la escuela.', 'Ayer iré a la escuela.'], answer: 1, explain: "완료된 과거 사건(어제)은 점과거(fui)를 사용합니다.", chapter: 'Ch 20. 점과거' },
    { id: 4, q: "이것은 무엇입니까? (이름을 모를 때)", options: ['¿Qué es este?', '¿Qué es esta?', '¿Qué es esto?', '¿Qué es aquello?'], answer: 2, explain: "이름을 모르는 물건을 물을 때는 중성 지시대명사 esto를 씁니다.", chapter: 'Ch 11. 지시사' },
    { id: 5, q: "나는 씻는다. (Lavarse)", options: ['Lavo.', 'Me lavo.', 'Se lavo.', 'Te lavas.'], answer: 1, explain: "주어(yo)에 맞춰 재귀대명사 me를 동사 앞에 씁니다.", chapter: 'Ch 29. 재귀동사' },
    { id: 6, q: "나를 위해 (Para + ?)", options: ['para yo', 'para me', 'para mí', 'para conmigo'], answer: 2, explain: "전치사 para 뒤에는 전치격 대명사 mí를 씁니다.", chapter: 'Ch 6. 인칭대명사' },
    { id: 7, q: "우리는 한국인이다.", options: ['Estamos coreanos.', 'Somos coreanos.', 'Hay coreanos.', 'Son coreanos.'], answer: 1, explain: "국적이나 본질적인 속성은 Ser 동사를 사용합니다. (nosotros somos)", chapter: 'Ch 16. Ser vs Estar' },
    { id: 8, q: "책상 위에 책이 한 권 있다.", options: ['Está un libro.', 'Es un libro.', 'Hay un libro.', 'Tiene un libro.'], answer: 2, explain: "막연한 사물의 존재 유무를 나타낼 때는 Hay를 씁니다.", chapter: 'Ch 17. Haber(Hay)' },
    { id: 9, q: "너는 그것을 먹어라.", options: ['¡No lo comas!', '¡Cómelo!', '¡Comeslo!', '¡Lo come!'], answer: 1, explain: "긍정 명령형에서 대명사는 동사 뒤에 붙여 씁니다. (come + lo = cómelo)", chapter: 'Ch 24. 명령형' },
    { id: 10, q: "비가 올지라도 나는 갈 것이다.", options: ['Aunque llueve, iré.', 'Aunque llovía, iré.', 'Aunque llueva, iré.', 'A pesar de lluvia, iré.'], answer: 2, explain: "미래의 불확실한 상황을 가정할 때는 Aunque + 접속법(llueva)을 씁니다.", chapter: 'Ch 38. 양보절' },
    { id: 11, q: "그녀는 (과거에) 예뻤다.", options: ['Ella fue guapa.', 'Ella era guapa.', 'Ella está guapa.', 'Ella sería guapa.'], answer: 1, explain: "과거의 지속적인 상태나 묘사는 선과거(era)를 사용합니다.", chapter: 'Ch 21. 선과거' },
    { id: 12, q: "내가 너라면, 그것을 샀을 텐데.", options: ['Si soy tú, lo compro.', 'Si fuera tú, lo compraría.', 'Si fui tú, lo compraré.', 'Si era tú, lo compraba.'], answer: 1, explain: "현재 사실의 반대를 가정할 때는 'Si + 접속법 과거(fuera)'를 씁니다.", chapter: 'Ch 33. Si 조건문' },
    { id: 13, q: "우리는 스페인어를 할 수 있다.", options: ['Podemos hablar', 'Pudimos hablar', 'Podríamos hablar', 'Podremos hablar'], answer: 0, explain: "현재 시제 능력 표현은 Podemos를 씁니다.", chapter: 'Ch 13. 불규칙 현재' },
    { id: 14, q: "너에게 그 선물을 준다.", options: ['Te lo doy.', 'Me lo das.', 'Lo te doy.', 'Se lo doy.'], answer: 0, explain: "목적대명사 어순은 간접(Te) + 직접(lo) + 동사 순서입니다.", chapter: 'Ch 19. 목적 대명사' },
    { id: 15, q: "내일 비가 올 것이다.", options: ['Llovió', 'Llueve', 'Lloverá', 'Llovería'], answer: 2, explain: "단순 미래 시제는 원형 + á 형태인 lloverá입니다.", chapter: 'Ch 23. 미래/조건' },
    { id: 16, q: "그는 의사다.", options: ['Es un médico.', 'Es el médico.', 'Es médico.', 'Está médico.'], answer: 2, explain: "직업을 나타낼 때 수식어 없이 ser 동사와 쓰이면 관사를 생략합니다.", chapter: 'Ch 5. 관사' },
    { id: 17, q: "내가 원하는 것은 평화다.", options: ['Que quiero es la paz.', 'Lo que quiero es la paz.', 'El que quiero es la paz.', 'Cuyo quiero es la paz.'], answer: 1, explain: "선행사가 없는 '...하는 것'은 중성 관계사 Lo que를 씁니다.", chapter: 'Ch 37. 관계사' },
    { id: 18, q: "나는 문을 열어 놓았다.", options: ['He abierto la puerta.', 'Tengo abierto la puerta.', 'Tengo abierta la puerta.', 'He abierta la puerta.'], answer: 2, explain: "Tener + p.p. 구문에서 분사는 목적어(la puerta)와 성수 일치를 하여 abierta가 됩니다.", chapter: 'Ch 35. 분사 구문' },
    { id: 19, q: "이것은 너를 위한 것이다.", options: ['por ti', 'para ti', 'de ti', 'a ti'], answer: 1, explain: "수혜자(~를 위해)를 나타낼 때는 Para를 씁니다.", chapter: 'Ch 27. Por vs Para' },
    { id: 20, q: "그녀가 오기를 바란다.", options: ['Espero que viene.', 'Espero que venga.', 'Espero que venir.', 'Espero que venía.'], answer: 1, explain: "주절의 소망(Espero) 동사는 종속절에 접속법(venga)을 유발합니다.", chapter: 'Ch 25. 접속법 기초' },
    { id: 21, q: "우리는 매일 7시에 일어난다.", options: ['Nos levantamos', 'Se levantan', 'Me levanto', 'Os levantáis'], answer: 0, explain: "Nosotros 주어에 맞는 재귀형은 Nos levantamos입니다.", chapter: 'Ch 29. 재귀동사' },
    { id: 22, q: "그(El)는 키가 크다.", options: ['Es alta.', 'Es alto.', 'Está alto.', 'Están altos.'], answer: 1, explain: "주어(El)가 남성 단수이므로 형용사도 alto를 씁니다.", chapter: 'Ch 7. 형용사' },
    { id: 23, q: "나는 커피를 좋아해.", options: ['Me gusto el café.', 'Yo gusto el café.', 'Me gusta el café.', 'Me gustan los cafés.'], answer: 2, explain: "주어는 el café(단수)이므로 gusta를 쓰고, 나에게(me)를 붙입니다.", chapter: 'Ch 30. Gustar 동사' },
    { id: 24, q: "100명의 사람들", options: ['Cien personas', 'Ciento personas', 'Cien de personas', 'Un ciento personas'], answer: 0, explain: "정확히 100을 나타내거나 명사 바로 앞에서는 Cien을 씁니다.", chapter: 'Ch 8. 숫자' },
    { id: 25, q: "그는 내 형제가 아니라 사촌이다.", options: ['pero', 'sino', 'y', 'o'], answer: 1, explain: "앞 문장이 부정문(No es...)이고 뒤에서 정정할 때는 sino를 씁니다.", chapter: 'Ch 36. 연결어' }
];

export const CONJUGATION_QUIZ_DATA: ConjugationQuizItem[] = [
    { id: 1, sentence: "Yo ______ español todos los días.", verb: "estudiar", answer: "estudio", translation: "나는 매일 스페인어를 공부한다.", explanation: "주어 'Yo'에 대한 현재 시제 규칙 변화 (-ar -> -o)", level: "A1" },
    { id: 2, sentence: "Nosotros ______ en Madrid.", verb: "vivir", answer: "vivimos", translation: "우리는 마드리드에 산다.", explanation: "주어 'Nosotros'에 대한 현재 시제 규칙 변화 (-ir -> -imos)", level: "A1" },
    { id: 3, sentence: "Ella ______ un libro interesante.", verb: "leer", answer: "lee", translation: "그녀는 재미있는 책을 읽는다.", explanation: "주어 'Ella'에 대한 현재 시제 규칙 변화 (-er -> -e)", level: "A1" },
    { id: 4, sentence: "¿Tú ______ hablar inglés?", verb: "poder", answer: "puedes", translation: "너는 영어를 할 수 있니?", explanation: "불규칙 동사 poder (o->ue)의 2인칭 단수 현재형", level: "A1" },
    { id: 5, sentence: "Ellos ______ cansados hoy.", verb: "estar", answer: "están", translation: "그들은 오늘 피곤하다.", explanation: "상태를 나타내는 estar 동사의 3인칭 복수 현재형", level: "A1" },
    { id: 6, sentence: "Yo ______ médico.", verb: "ser", answer: "soy", translation: "나는 의사이다.", explanation: "직업을 나타내는 ser 동사의 1인칭 단수 현재형", level: "A1" },
    { id: 7, sentence: "Vosotros ______ mucha pizza.", verb: "comer", answer: "coméis", translation: "너희들은 피자를 많이 먹는다.", explanation: "주어 'Vosotros'에 대한 현재 시제 규칙 변화 (-er -> -éis)", level: "A1" },
    { id: 8, sentence: "Juan ______ la ventana.", verb: "abrir", answer: "abre", translation: "후안은 창문을 연다.", explanation: "주어 'Juan'(3인칭 단수)에 대한 현재 시제 규칙 변화 (-ir -> -e)", level: "A1" },
    { id: 9, sentence: "Nosotros ______ al cine los viernes.", verb: "ir", answer: "vamos", translation: "우리는 금요일마다 영화관에 간다.", explanation: "불규칙 동사 ir의 1인칭 복수 현재형", level: "A1" },
    { id: 10, sentence: "Yo ______ la tarea ahora.", verb: "hacer", answer: "hago", translation: "나는 지금 숙제를 한다.", explanation: "불규칙 동사 hacer의 1인칭 단수 현재형 (go 불규칙)", level: "A1" },
    { id: 11, sentence: "Ayer yo ______ una manzana.", verb: "comer", answer: "comí", translation: "어제 나는 사과 한 개를 먹었다.", explanation: "어제(Ayer) 있었던 완료된 행동이므로 단순 과거(Indefinido) 1인칭 단수 사용", level: "A2" },
    { id: 12, sentence: "El año pasado nosotros ______ a México.", verb: "viajar", answer: "viajamos", translation: "작년에 우리는 멕시코로 여행했다.", explanation: "작년(El año pasado)의 완료된 사건이므로 단순 과거 사용 (-ar -> -amos)", level: "A2" },
    { id: 13, sentence: "\"Cuando era niño, ______ mucho la televisión.\"", verb: "ver", answer: "veía", translation: "\"어렸을 때, 나는 텔레비전을 많이 봤다.\"", explanation: "어릴 때의 습관(Cuando era niño)을 나타내므로 불완료 과거(Imperfecto) 사용", level: "A2" },
    { id: 14, sentence: "Anoche tú ______ tarde.", verb: "llegar", answer: "llegaste", translation: "어젯밤 너는 늦게 도착했다.", explanation: "어젯밤(Anoche)의 일회성 사건이므로 단순 과거 2인칭 단수 사용", level: "A2" },
    { id: 15, sentence: "Ella ______ cuando sonó el teléfono.", verb: "dormir", answer: "dormía", translation: "전화가 울렸을 때 그녀는 자고 있었다.", explanation: "전화가 울렸을 때 진행 중이던 배경 상황이므로 불완료 과거 사용", level: "A2" },
    { id: 16, sentence: "Ayer ellos ______ un coche nuevo.", verb: "comprar", answer: "compraron", translation: "어제 그들은 새 차를 샀다.", explanation: "어제(Ayer) 구매한 완료된 사실이므로 단순 과거 3인칭 복수 사용", level: "A2" },
    { id: 17, sentence: "Nosotros ______ en esa casa por 10 años.", verb: "vivir", answer: "vivimos", translation: "우리는 그 집에서 10년 동안 살았다.", explanation: "10년 동안(por 10 años)이라는 구체적 기간이 완료되었으므로 단순 과거 사용", level: "A2" },
    { id: 18, sentence: "Antes yo ______ mucho deporte.", verb: "hacer", answer: "hacía", translation: "예전에 나는 운동을 많이 했다.", explanation: "과거의 습관(Antes)을 나타내므로 불완료 과거 사용", level: "A2" },
    { id: 19, sentence: "Mañana ______ sol.", verb: "hacer", answer: "hará", translation: "내일은 맑을 것이다. (해가 날 것이다)", explanation: "내일(Mañana)의 날씨 예측이므로 미래 시제 사용 (hacer는 har- 어간 불규칙)", level: "B1" },
    { id: 20, sentence: "El próximo mes nosotros ______ el proyecto.", verb: "terminar", answer: "terminaremos", translation: "다음 달에 우리는 프로젝트를 끝낼 것이다.", explanation: "다음 달(El próximo mes)의 계획이므로 미래 시제 사용", level: "B1" },
    { id: 21, sentence: "\"Si tuviera dinero, ______ un barco.\"", verb: "comprar", answer: "compraría", translation: "내가 돈이 있다면 배를 살 텐데.", explanation: "가정문 주절에서 조건법(Condicional) 사용 (~할 텐데)", level: "B1" },
    { id: 22, sentence: "Creo que ellos ______ tarde.", verb: "llegar", answer: "llegarán", translation: "내 생각에 그들은 늦게 도착할 것이다.", explanation: "미래에 대한 추측(Creo que)이므로 미래 시제 사용", level: "B1" },
    { id: 23, sentence: "¿______ ayudarme (tú)?", verb: "poder", answer: "Podrías", translation: "나를 도와줄 수 있니?", explanation: "정중한 요청을 위해 조건법(Condicional) 사용", level: "B1" },
    { id: 24, sentence: "Espero que tú ______ bien.", verb: "estar", answer: "estés", translation: "네가 잘 지내길 바란다.", explanation: "주절의 동사(Espero)가 희망을 나타내므로 종속절에 접속법 현재 사용", level: "B2" },
    { id: 25, sentence: "Dudo que ella ______ la verdad.", verb: "saber", answer: "sepa", translation: "그녀가 진실을 알지 의심스럽다.", explanation: "의심(Dudo)을 나타내는 표현 뒤에는 접속법 현재 사용 (saber -> sepa)", level: "B2" },
    { id: 26, sentence: "Me alegró que ustedes ______ a la fiesta.", verb: "venir", answer: "vinieran", translation: "너희가 파티에 와서 기뻤다.", explanation: "과거의 감정(Me alegró)에 대한 원인이므로 접속법 과거(Imperfecto Subjuntivo) 사용", level: "B2" },
    { id: 27, sentence: "Quiero que nosotros ______ juntos.", verb: "ir", answer: "vayamos", translation: "나는 우리가 함께 가기를 원한다.", explanation: "의지/요구(Quiero)를 나타내며 주어가 다르므로 접속법 현재 사용 (ir -> vayamos)", level: "B2" },
    { id: 28, sentence: "Es importante que tú ______ ejercicio.", verb: "hacer", answer: "hagas", translation: "네가 운동을 하는 것은 중요하다.", explanation: "비인칭 구문(Es importante que) 뒤에는 접속법 현재 사용", level: "B2" },
    { id: 29, sentence: "Buscamos una casa que ______ grande.", verb: "ser", answer: "sea", translation: "우리는 큰 집을 찾고 있다.", explanation: "존재가 불확실한 대상을 찾을 때(Buscamos...) 관계절에 접속법 사용", level: "B2" },
    { id: 30, sentence: "\"Cuando ______ mayor, seré piloto.\"", verb: "ser", answer: "sea", translation: "나는 어른이 되면 조종사가 될 것이다.", explanation: "미래의 시점을 나타내는 시간 부사절(Cuando...)에서는 접속법 현재 사용", level: "B2" }
];

export const ERROR_CORRECTION_DATA: ErrorCorrectionItem[] = [
    { 
        id: 1, 
        sentence: ["La", "niña", "son", "bonita."], 
        wrongIndex: 2, 
        correct: "es", 
        explain: "주어(La niña)는 3인칭 단수이므로 son(복수)이 아니라 es를 써야 합니다." 
    },
    { 
        id: 2, 
        sentence: ["Yo", "tengo", "hambre", "y", "soy", "cansado."], 
        wrongIndex: 4, 
        correct: "estoy", 
        explain: "피곤한 상태(일시적)는 Ser가 아니라 Estar 동사를 써야 합니다." 
    },
    { 
        id: 3, 
        sentence: ["Ayer", "voy", "a", "la", "escuela."], 
        wrongIndex: 1, 
        correct: "fui", 
        explain: "Ayer(어제)는 과거 시점이므로 현재형 voy 대신 점과거 fui를 써야 합니다." 
    },
    { 
        id: 4, 
        sentence: ["Me", "gusta", "las", "manzanas."], 
        wrongIndex: 1, 
        correct: "gustan", 
        explain: "Gustar 동사는 뒤에 오는 주어(las manzanas, 복수)에 수를 맞춰야 하므로 gustan이 맞습니다." 
    },
    { 
        id: 5, 
        sentence: ["Quiero", "que", "tú", "vienes", "a", "mi", "casa."], 
        wrongIndex: 3, 
        correct: "vengas", 
        explain: "주절의 'Quiero'(소망) 뒤 종속절에는 직설법(vienes)이 아닌 접속법(vengas)을 써야 합니다." 
    },
    { 
        id: 6, 
        sentence: ["Este", "libro", "es", "para", "mí", "madre."], 
        wrongIndex: 4, 
        correct: "mi", 
        explain: "명사(madre) 앞에서는 소유형용사 mi를 씁니다. mí는 전치사 뒤에 홀로 쓰이는 대명사입니다." 
    },
    {
        id: 7,
        sentence: ["Yo", "sabo", "la", "verdad."],
        wrongIndex: 1,
        correct: "sé",
        explain: "saber(알다)의 1인칭 단수 형태는 sabo가 아니라 sé입니다."
    },
    { 
        id: 8, 
        sentence: ["Ella", "es", "más", "alta", "de", "yo."], 
        wrongIndex: 4, 
        correct: "que", 
        explain: "비교급에서 '~보다'는 que를 사용합니다. (más ... que)" 
    },
    { 
        id: 9, 
        sentence: ["No", "hables", "con", "el."], 
        wrongIndex: 3, 
        correct: "él", 
        explain: "사람(그)을 지칭하는 대명사에는 강세(tilde)가 필요합니다. el은 정관사입니다." 
    },
    { 
        id: 10, 
        sentence: ["Tengo", "mucha", "calor."], 
        wrongIndex: 1, 
        correct: "mucho", 
        explain: "calor(더위)는 남성 명사이므로 형용사도 남성형 mucho를 써야 합니다." 
    }
];