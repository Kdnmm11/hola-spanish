
import csv

# Manual Preposition Quiz Data 91-120
quiz_data = [
    {
        "문장": "Hay un jardín ( ) la casa.",
        "정답": "alrededor de",
        "오답": "dentro de,sobre,bajo,entre",
        "번역": "집 *주위에* 정원이 있다.",
        "유형": "loc_position",
        "해설": "주변 위치(~주위에)는 'alrededor de'를 사용합니다."
    },
    {
        "문장": "Lávate las manos ( ) comer.",
        "정답": "antes de",
        "오답": "después de,durante,mientras,hasta",
        "번역": "밥 먹기 *전에* 손을 씻어라.",
        "유형": "time_point",
        "해설": "시간적 선행(~전에)은 'antes de'를 사용합니다."
    },
    {
        "문장": "Iremos al cine ( ) cenar.",
        "정답": "después de",
        "오답": "antes de,durante,hasta,desde",
        "번역": "저녁 먹은 *후에* 영화관에 갈 것이다.",
        "유형": "time_point",
        "해설": "시간적 후행(~후에)은 'después de'를 사용합니다."
    },
    {
        "문장": "El banco está ( ) la plaza.",
        "정답": "frente a",
        "오답": "dentro de,sobre,bajo,entre",
        "번역": "은행은 광장 *맞은편에* 있다.",
        "유형": "loc_position",
        "해설": "마주 보는 위치(~맞은편에)는 'frente a'를 사용합니다."
    },
    {
        "문장": "( ) este tema, no tengo nada que decir.",
        "정답": "En cuanto a",
        "오답": "A pesar de,Debido a,Gracias a,Junto a",
        "번역": "이 주제*에 관해서는*, 할 말이 없다.",
        "유형": "topic",
        "해설": "주제나 한정(~에 관해서는)은 'en cuanto a'를 사용합니다."
    },
    {
        "문장": "La farmacia está ( ) el supermercado.",
        "정답": "junto a",
        "오답": "lejos de,dentro de,sobre,bajo",
        "번역": "약국은 슈퍼마켓 *바로 옆에* (붙어) 있다.",
        "유형": "loc_position",
        "해설": "매우 가까운 옆(~에 붙어)은 'junto a'를 사용합니다."
    },
    {
        "문장": "No pudimos salir ( ) la nieve.",
        "정답": "debido a",
        "오답": "gracias a,para,con,sin",
        "번역": "눈 *때문에* 나갈 수 없었다.",
        "유형": "cause",
        "해설": "객관적인 원인(~때문에)은 'debido a'를 사용합니다."
    },
    {
        "문장": "( ) ser tan joven, es muy maduro.",
        "정답": "A pesar de",
        "오답": "Debido a,Gracias a,Junto a,Frente a",
        "번역": "그렇게 어린 *것에도 불구하고*, 그는 매우 성숙하다.",
        "유형": "cause",
        "해설": "양보(~에도 불구하고)는 'a pesar de'를 사용합니다."
    },
    {
        "문장": "Te enviaré la información ( ) correo electrónico.",
        "정답": "vía",
        "오답": "en,a,de,con",
        "번역": "이메일 *편으로* (통해) 정보를 보내주겠다.",
        "유형": "method",
        "해설": "전송 수단(~편으로)은 'vía'를 사용합니다."
    },
    {
        "문장": "Todos vinieron ( ) Juan.",
        "정답": "excepto",
        "오답": "con,para,por,de",
        "번역": "후안을 *제외하고* 모두 왔다.",
        "유형": "company",
        "해설": "제외(~빼고)는 'excepto' 또는 'salvo'를 사용합니다."
    },
    {
        "문장": "Se resolvió el problema ( ) el diálogo.",
        "정답": "mediante",
        "오답": "durante,hacia,hasta,desde",
        "번역": "문제는 대화를 *통해* 해결되었다.",
        "유형": "method",
        "해설": "수단이나 방법(~을 통하여)은 격식 있게 'mediante'를 씁니다."
    },
    {
        "문장": "La lluvia continuó ( ) toda la noche.",
        "정답": "durante",
        "오답": "entre,hacia,hasta,desde",
        "번역": "비는 밤새 *내내* (동안) 계속되었다.",
        "유형": "time_duration",
        "해설": "기간 전체(~내내)는 'durante'를 사용합니다."
    },
    {
        "문장": "El precio varía ( ) el tamaño.",
        "정답": "según",
        "오답": "por,para,con,de",
        "번역": "가격은 크기*에 따라* 다르다.",
        "유형": "manner",
        "해설": "의존이나 기준(~에 따라)은 'según'을 사용합니다."
    },
    {
        "문장": "La luz entra ( ) la ventana.",
        "정답": "a través de",
        "오답": "encima de,debajo de,junto a,frente a",
        "번역": "빛이 창문*을 통해* 들어온다.",
        "유형": "loc_path",
        "해설": "관통이나 통과(~를 통해)는 'a través de'를 사용합니다."
    },
    {
        "문장": "Quiero té ( ) café.",
        "정답": "en vez de",
        "오답": "a causa de,gracias a,junto a,frente a",
        "번역": "커피 *대신에* 차를 원한다.",
        "유형": "exchange",
        "해설": "대체(~대신에)는 'en vez de' 또는 'en lugar de'를 사용합니다."
    },
    {
        "문장": "El gato está ( ) la silla.",
        "정답": "bajo",
        "오답": "sobre,entre,hacia,desde",
        "번역": "고양이는 의자 *밑에* 있다.",
        "유형": "loc_position",
        "해설": "아래 위치는 'bajo'를 씁니다."
    },
    {
        "문장": "El libro está ( ) la estantería.",
        "정답": "en",
        "오답": "a,de,por,para",
        "번역": "책은 책장 *에* (안에/위에) 있다.",
        "유형": "loc_position",
        "해설": "일반적인 위치(~에)는 'en'을 사용합니다."
    },
    {
        "문장": "Voy ( ) Madrid mañana.",
        "정답": "a",
        "오답": "de,en,por,con",
        "번역": "나는 내일 마드리드*로* 간다.",
        "유형": "loc_direction",
        "해설": "목적지(~로)는 'a'를 사용합니다."
    },
    {
        "문장": "Este regalo es ( ) ti.",
        "정답": "para",
        "오답": "por,a,de,en",
        "번역": "이 선물은 너*를 위한* 것이다.",
        "유형": "company",
        "해설": "수혜자는 'para'입니다."
    },
    {
        "문장": "Lo hice ( ) ti.",
        "정답": "por",
        "오답": "para,a,de,en",
        "번역": "나는 너 *때문에* (너를 위해 희생해서) 그것을 했다.",
        "유형": "cause",
        "해설": "동기나 원인(~때문에)은 'por'를 씁니다. (Para ti는 너에게 주기 위해, Por ti는 너 때문에/너를 대신해)"
    },
    {
        "문장": "Hablamos ( ) política.",
        "정답": "de",
        "오답": "a,en,por,para",
        "번역": "우리는 정치*에 대해* 이야기했다.",
        "유형": "topic",
        "해설": "주제(~에 대해)는 'de' 또는 'sobre'를 씁니다."
    },
    {
        "문장": "El tren sale ( ) las cinco.",
        "정답": "a",
        "오답": "en,de,por,para",
        "번역": "기차는 5시*에* 출발한다.",
        "유형": "time_point",
        "해설": "시각 앞에는 'a'를 씁니다."
    },
    {
        "문장": "Vivo ( ) Corea.",
        "정답": "en",
        "오답": "a,de,por,para",
        "번역": "나는 한국*에* 산다.",
        "유형": "loc_position",
        "해설": "국가나 도시 내부 위치는 'en'을 씁니다."
    },
    {
        "문장": "Soy ( ) España.",
        "정답": "de",
        "오답": "a,en,por,para",
        "번역": "나는 스페인 *출신*이다.",
        "유형": "loc_origin",
        "해설": "출신(~의, ~에서 온)은 'de'를 씁니다."
    },
    {
        "문장": "Voy ( ) casa.",
        "정답": "a",
        "오답": "en,de,por,para",
        "번역": "나는 집*으로* 간다.",
        "유형": "loc_direction",
        "해설": "목적지는 'a'를 씁니다."
    },
    {
        "문장": "La carta es ( ) Juan.",
        "정답": "para",
        "오답": "por,a,de,en",
        "번역": "편지는 후안*에게* (보내는 것)이다.",
        "유형": "company",
        "해설": "수신인은 'para'를 씁니다."
    },
    {
        "문장": "Gracias ( ) venir.",
        "정답": "por",
        "오답": "para,a,de,en",
        "번역": "와줘서 *고마워*.",
        "유형": "cause",
        "해설": "감사의 이유는 'por'입니다."
    },
    {
        "문장": "Estudio ( ) aprender.",
        "정답": "para",
        "오답": "por,a,de,en",
        "번역": "나는 배우기 *위해* 공부한다.",
        "유형": "purpose",
        "해설": "목적(~하기 위해)은 'para'입니다."
    },
    {
        "문장": "Caminamos ( ) el parque.",
        "정답": "por",
        "오답": "para,a,de,en",
        "번역": "우리는 공원*을* (지나) 걷는다.",
        "유형": "loc_path",
        "해설": "경로는 'por'입니다."
    },
    {
        "문장": "El libro está ( ) la mesa.",
        "정답": "sobre",
        "오답": "bajo,entre,hacia,desde",
        "번역": "책은 탁자 *위에* 있다.",
        "유형": "loc_position",
        "해설": "표면 위는 'sobre'입니다."
    }
]

output_path = 'src/data/preposition_quiz.csv'
headers = ['문장', '뜻', '정답', '오답', '유형', '해설']

with open(output_path, 'a', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=headers)
    for item in quiz_data:
        writer.writerow({
            '문장': item['문장'],
            '뜻': item['번역'],
            '정답': item['정답'],
            '오답': item['오답'],
            '유형': item['유형'],
            '해설': item['해설']
        })

print(f"Appended {len(quiz_data)} manual items to {output_path}")
