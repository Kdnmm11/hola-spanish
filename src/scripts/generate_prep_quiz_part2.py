
import csv

# Manual Preposition Quiz Data 31-60
quiz_data = [
    {
        "문장": "No hables ( ) la clase.",
        "정답": "durante",
        "오답": "por,para,entre,hacia",
        "번역": "수업 *중에* (동안) 말하지 마라.",
        "유형": "time_duration",
        "해설": "특정 기간이나 행사 도중(~동안)을 나타낼 때는 'durante'를 사용합니다."
    },
    {
        "문장": "( ) mi opinión, eso no es correcto.",
        "정답": "según",
        "오답": "por,para,con,de",
        "번역": "내 의견*에 따르면*, 그것은 옳지 않다.",
        "유형": "topic",
        "해설": "출처나 의견(~에 따르면, ~에 의하면)을 나타낼 때는 'según'을 사용합니다. (Para mí와 유사하지만 구조가 다름)"
    },
    {
        "문장": "El ladrón entró ( ) la ventana.",
        "정답": "por",
        "오답": "para,a,de,en",
        "번역": "도둑은 창문*을 통해* 들어왔다.",
        "유형": "loc_path",
        "해설": "통과하거나 경유하는 경로(~를 통해)는 'por'를 사용합니다."
    },
    {
        "문장": "Estoy muy cansado ( ) tanto trabajar.",
        "정답": "de",
        "오답": "a,en,con,sin",
        "번역": "나는 너무 많이 일*해서* (일한 것 때문에) 매우 피곤하다.",
        "유형": "cause",
        "해설": "'estar cansado de'는 '~해서 피곤하다, 지치다'라는 숙어적 표현으로 원인을 나타내는 'de'를 씁니다."
    },
    {
        "문장": "El libro trata ( ) la historia de España.",
        "정답": "sobre",
        "오답": "en,con,por,para",
        "번역": "그 책은 스페인 역사*에 대해* 다룬다.",
        "유형": "topic",
        "해설": "주제(~에 대하여)를 나타낼 때는 'sobre' 또는 'de'를 씁니다. (tratar de / tratar sobre)"
    },
    {
        "문장": "Vamos a la playa ( ) coche.",
        "정답": "en",
        "오답": "a,por,con,de",
        "번역": "우리는 차*를 타고* 해변에 간다.",
        "유형": "method",
        "해설": "교통수단(~을 타고)은 전치사 'en'을 사용합니다."
    },
    {
        "문장": "Este regalo es ( ) mi novia.",
        "정답": "para",
        "오답": "por,a,de,con",
        "번역": "이 선물은 내 여자친구*를 위한* 것이다.",
        "유형": "company",
        "해설": "수혜자(받는 사람)는 'para'를 사용합니다."
    },
    {
        "문장": "( ) fin ha dejado de llover.",
        "정답": "por",
        "오답": "para,a,de,en",
        "번역": "*마침내* 비가 그쳤다.",
        "유형": "manner",
        "해설": "'Por fin'(마침내, 드디어)은 굳어진 관용구입니다."
    },
    {
        "문장": "Vivo ( ) mis padres.",
        "정답": "con",
        "오답": "sin,por,para,de",
        "번역": "나는 부모님*과 함께* 산다.",
        "유형": "company",
        "해설": "동반(~와 함께)을 나타낼 때는 'con'을 사용합니다."
    },
    {
        "문장": "No salgas ( ) abrigo.",
        "정답": "sin",
        "오답": "con,por,para,de",
        "번역": "코트 *없이* 나가지 마라.",
        "유형": "company",
        "해설": "부재나 결핍(~없이)은 'sin'을 사용합니다."
    },
    {
        "문장": "El avión vuela ( ) las nubes.",
        "정답": "sobre",
        "오답": "bajo,entre,hacia,desde",
        "번역": "비행기가 구름 *위로* 날고 있다.",
        "유형": "loc_position",
        "해설": "위쪽 위치(~위에)를 나타낼 때는 'sobre' 또는 'por encima de'를 씁니다."
    },
    {
        "문장": "Caminamos ( ) la playa al atardecer.",
        "정답": "por",
        "오답": "para,a,de,en",
        "번역": "우리는 해질 무렵 해변*을 거닐었다* (해변을 따라 걸었다).",
        "유형": "loc_path",
        "해설": "장소 내부를 이리저리 이동하거나 통과할 때는 'por'를 씁니다."
    },
    {
        "문장": "La clase termina ( ) las dos.",
        "정답": "a",
        "오답": "en,de,por,para",
        "번역": "수업은 2시*에* 끝난다.",
        "유형": "time_point",
        "해설": "구체적인 시각 앞에는 전치사 'a'를 씁니다."
    },
    {
        "문장": "Estoy ( ) vacaciones.",
        "정답": "de",
        "오답": "en,a,por,para",
        "번역": "나는 휴가 *중*이다.",
        "유형": "manner",
        "해설": "'Estar de vacaciones', 'de viaje' 등은 관용적으로 'de'를 씁니다."
    },
    {
        "문장": "Lo hice ( ) error.",
        "정답": "por",
        "오답": "para,a,de,en",
        "번역": "나는 그것을 실수*로* 했다.",
        "유형": "cause",
        "해설": "원인이나 이유(~때문에, ~로 인해)는 'por'를 씁니다."
    },
    {
        "문장": "Este tren va ( ) París.",
        "정답": "hacia",
        "오답": "por,de,en,con",
        "번역": "이 기차는 파리 *쪽으로* 간다.",
        "유형": "loc_direction",
        "해설": "방향(~쪽으로)을 나타낼 때는 'hacia'를, 목적지(~행)를 강조할 때는 'para'를 쓸 수 있습니다. 여기선 보기 중 'hacia'가 적절합니다."
    },
    {
        "문장": "Trabajo ( ) ocho a cinco.",
        "정답": "de",
        "오답": "a,en,por,para",
        "번역": "나는 8시*부터* 5시까지 일한다.",
        "유형": "time_duration",
        "해설": "'de... a...'는 시간의 시작과 끝을 나타냅니다."
    },
    {
        "문장": "El gato está ( ) la mesa.",
        "정답": "debajo de",
        "오답": "encima de,al lado de,cerca de,lejos de",
        "번역": "고양이는 탁자 *아래에* 있다.",
        "유형": "loc_position",
        "해설": "아래 위치는 'debajo de' 또는 'bajo'를 씁니다."
    },
    {
        "문장": "Mi casa está ( ) la escuela.",
        "정답": "cerca de",
        "오답": "lejos de,entre,sobre,bajo",
        "번역": "우리 집은 학교 *근처에* 있다.",
        "유형": "loc_position",
        "해설": "근접한 위치(~근처에)는 'cerca de'를 씁니다."
    },
    {
        "문장": "( ) pesar de la lluvia, salimos.",
        "정답": "A",
        "오답": "De,En,Por,Con",
        "번역": "비*에도* 불구하고 우리는 나갔다.",
        "유형": "cause",
        "해설": "'A pesar de'(~에도 불구하고)는 양보를 나타내는 전치사구입니다."
    },
    {
        "문장": "Llámame ( ) de llegar.",
        "정답": "antes",
        "오답": "después,durante,mientras,hasta",
        "번역": "도착하기 *전에* 전화해라.",
        "유형": "time_point",
        "해설": "시점의 선행(~전에)은 'antes de'를 씁니다."
    },
    {
        "문장": "El vaso es ( ) cristal.",
        "정답": "de",
        "오답": "en,con,por,para",
        "번역": "그 컵은 유리*로* (만들어졌다).",
        "유형": "material",
        "해설": "재료(~로 만든)를 나타낼 때는 'de'를 사용합니다."
    },
    {
        "문장": "Voy a estar aquí ( ) el lunes.",
        "정답": "hasta",
        "오답": "desde,de,a,en",
        "번역": "나는 월요일*까지* 여기에 있을 것이다.",
        "유형": "time_deadline",
        "해설": "계속되다가 끝나는 시점(~까지)은 'hasta'를 사용합니다."
    },
    {
        "문장": "Estudio español ( ) viajar a México.",
        "정답": "para",
        "오답": "por,a,de,en",
        "번역": "나는 멕시코를 여행하기 *위해* 스페인어를 공부한다.",
        "유형": "purpose",
        "해설": "목적(~하기 위해)은 'para' + 동사원형을 씁니다."
    },
    {
        "문장": "La carta fue escrita ( ) María.",
        "정답": "por",
        "오답": "para,de,a,con",
        "번역": "그 편지는 마리아*에 의해* 쓰여졌다.",
        "유형": "method",
        "해설": "수동태의 행위자(~에 의해)는 'por'를 씁니다."
    },
    {
        "문장": "Estamos ( ) contra de la guerra.",
        "정답": "en",
        "오답": "a,de,por,para",
        "번역": "우리는 전쟁에 *반대*한다.",
        "유형": "topic",
        "해설": "'estar en contra de'(~에 반대하다)는 숙어적 표현입니다."
    },
    {
        "문장": "Salgo ( ) casa a las ocho.",
        "정답": "de",
        "오답": "a,en,por,para",
        "번역": "나는 8시에 집*에서* 나온다.",
        "유형": "loc_origin",
        "해설": "출발지(~에서)는 'de'를 사용합니다."
    },
    {
        "문장": "Hay un parque ( ) mi casa.",
        "정답": "frente a",
        "오답": "junto a,lejos de,dentro de,sobre",
        "번역": "우리 집 *맞은편에* 공원이 있다.",
        "유형": "loc_position",
        "해설": "맞은편(~앞에 마주보고) 위치는 'frente a'를 씁니다."
    },
    {
        "문장": "Te cambio mi libro ( ) el tuyo.",
        "정답": "por",
        "오답": "para,a,de,con",
        "번역": "내 책을 네 것*과* 바꿀게 (교환).",
        "유형": "exchange",
        "해설": "교환(~을 대가로)은 'por'를 사용합니다."
    },
    {
        "문장": "Nos vemos ( ) la tarde.",
        "정답": "por",
        "오답": "a,de,en,para",
        "번역": "오후*에* 보자.",
        "유형": "time_duration",
        "해설": "하루 중 대략적인 시간대(오전, 오후, 밤)는 'por'를 씁니다 (por la mañana/tarde/noche)."
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
