
import csv

# Manual Preposition Quiz Data 121-150
quiz_data = [
    {
        "문장": "Estoy ( ) contra de la violencia.",
        "정답": "en",
        "오답": "a,de,por,para",
        "번역": "나는 폭력에 *반대*한다 (반대하는 상태에 있다).",
        "유형": "topic",
        "해설": "'Estar en contra de'는 '~에 반대하다'라는 숙어입니다."
    },
    {
        "문장": "Luchamos ( ) el enemigo.",
        "정답": "contra",
        "오답": "por,para,con,de",
        "번역": "우리는 적*과 싸운다* (적에 맞서).",
        "유형": "topic",
        "해설": "대항/반대(~와, ~에 맞서)는 'contra'를 씁니다."
    },
    {
        "문장": "Voy a la escuela ( ) autobús.",
        "정답": "en",
        "오답": "a,por,con,de",
        "번역": "나는 버스*로* (타고) 학교에 간다.",
        "유형": "method",
        "해설": "교통수단은 'en'입니다."
    },
    {
        "문장": "Corta el pan ( ) el cuchillo.",
        "정답": "con",
        "오답": "en,por,a,de",
        "번역": "칼*로* 빵을 잘라라.",
        "유형": "method",
        "해설": "도구는 'con'입니다."
    },
    {
        "문장": "No puedo ver ( ) las gafas.",
        "정답": "sin",
        "오답": "con,por,para,de",
        "번역": "안경 *없이는* 볼 수가 없다.",
        "유형": "company",
        "해설": "결핍(~없이)은 'sin'입니다."
    },
    {
        "문장": "Te esperaré ( ) las seis.",
        "정답": "hasta",
        "오답": "desde,de,a,en",
        "번역": "6시*까지* 기다릴게.",
        "유형": "time_deadline",
        "해설": "계속적인 기다림의 끝(~까지)은 'hasta'입니다."
    },
    {
        "문장": "Estudio ( ) las ocho de la mañana.",
        "정답": "desde",
        "오답": "hasta,de,a,en",
        "번역": "아침 8시*부터* 공부하고 있다.",
        "유형": "time_point",
        "해설": "시작점(~부터 계속)은 'desde'입니다."
    },
    {
        "문장": "El avión sale ( ) Nueva York.",
        "정답": "para",
        "오답": "por,a,de,en",
        "번역": "비행기는 뉴욕*행*이다 (뉴욕으로 떠난다).",
        "유형": "loc_direction",
        "해설": "목적지(~행)는 'para'입니다."
    },
    {
        "문장": "Paseamos ( ) el jardín.",
        "정답": "por",
        "오답": "para,a,de,en",
        "번역": "우리는 정원*을* 산책한다.",
        "유형": "loc_path",
        "해설": "장소 내부 이동/경유는 'por'입니다."
    },
    {
        "문장": "La reunión es ( ) el martes.",
        "정답": "el",
        "오답": "en,a,de,por",
        "번역": "회의는 화요일*에* 있다.",
        "유형": "time_point",
        "해설": "요일 앞에는 전치사 없이 정관사 'el'만 씁니다 (el lunes, el martes). 단, 'Estamos a lunes'(오늘 월요일이다) 같은 날짜 표현 제외."
    },
    {
        "문장": "Nací ( ) mayo.",
        "정답": "en",
        "오답": "a,de,por,para",
        "번역": "나는 5월*에* 태어났다.",
        "유형": "time_point",
        "해설": "월, 계절, 연도 앞에는 'en'을 씁니다."
    },
    {
        "문장": "Vivo ( ) el tercer piso.",
        "정답": "en",
        "오답": "a,de,por,para",
        "번역": "나는 3층*에* 산다.",
        "유형": "loc_position",
        "해설": "층수(piso) 앞에는 'en'을 씁니다."
    },
    {
        "문장": "El gato está ( ) el sofá.",
        "정답": "sobre",
        "오답": "bajo,entre,hacia,desde",
        "번역": "고양이는 소파 *위에* 있다.",
        "유형": "loc_position",
        "해설": "위 위치는 'sobre'입니다."
    },
    {
        "문장": "La farmacia está ( ) la derecha.",
        "정답": "a",
        "오답": "en,de,por,para",
        "번역": "약국은 오른쪽*에* 있다.",
        "유형": "loc_position",
        "해설": "방향 위치는 'a la derecha'입니다."
    },
    {
        "문장": "Trabajo ( ) casa.",
        "정답": "en",
        "오답": "a,de,por,para",
        "번역": "나는 집*에서* 일한다.",
        "유형": "loc_position",
        "해설": "장소(~에서)는 'en'입니다."
    },
    {
        "문장": "Voy ( ) casa.",
        "정답": "a",
        "오답": "en,de,por,para",
        "번역": "나는 집*으*로 간다.",
        "유형": "loc_direction",
        "해설": "목적지(~로)는 'a'입니다."
    },
    {
        "문장": "Vengo ( ) casa.",
        "정답": "de",
        "오답": "a,en,por,para",
        "번역": "나는 집*에서* (부터) 온다.",
        "유형": "loc_origin",
        "해설": "출발지(~에서)는 'de'입니다."
    },
    {
        "문장": "El libro es ( ) papel.",
        "정답": "de",
        "오답": "en,con,por,para",
        "번역": "책은 종이*로* (만들어졌다).",
        "유형": "material",
        "해설": "재료는 'de'입니다."
    },
    {
        "문장": "Hablamos ( ) fútbol.",
        "정답": "de",
        "오답": "a,en,por,para",
        "번역": "우리는 축구*에 대해* 이야기한다.",
        "유형": "topic",
        "해설": "주제는 'de' 또는 'sobre'입니다."
    },
    {
        "문장": "Gracias ( ) tu regalo.",
        "정답": "por",
        "오답": "para,a,de,en",
        "번역": "네 선물 *고마워*.",
        "유형": "cause",
        "해설": "감사의 이유는 'por'입니다."
    },
    {
        "문장": "Estudio ( ) aprender.",
        "정답": "para",
        "오답": "por,a,de,en",
        "번역": "배우기 *위해* 공부한다.",
        "유형": "purpose",
        "해설": "목적은 'para'입니다."
    },
    {
        "문장": "Te cambio mi boli ( ) tu lápiz.",
        "정답": "por",
        "오답": "para,a,de,en",
        "번역": "내 볼펜을 네 연필*과* 바꿀게.",
        "유형": "exchange",
        "해설": "교환은 'por'입니다."
    },
    {
        "문장": "Nos vemos ( ) la mañana.",
        "정답": "por",
        "오답": "a,de,en,para",
        "번역": "아침*에* 보자.",
        "유형": "time_duration",
        "해설": "시간대(오전/오후)는 'por'입니다."
    },
    {
        "문장": "Son las tres ( ) la tarde.",
        "정답": "de",
        "오답": "por,a,en,para",
        "번역": "오후 3시다.",
        "유형": "time_point",
        "해설": "구체적인 시각 뒤의 시간대는 'de'를 씁니다 (las tres de la tarde)."
    },
    {
        "문장": "El regalo es ( ) ti.",
        "정답": "para",
        "오답": "por,a,de,en",
        "번역": "선물은 너*를 위한* 거야.",
        "유형": "company",
        "해설": "수혜자는 'para'입니다."
    },
    {
        "문장": "Lo hago ( ) ti.",
        "정답": "por",
        "오답": "para,a,de,en",
        "번역": "나는 너 *때문에* (너를 봐서) 한다.",
        "유형": "cause",
        "해설": "동기/원인은 'por'입니다."
    },
    {
        "문장": "El tren pasa ( ) el túnel.",
        "정답": "por",
        "오답": "para,a,de,en",
        "번역": "기차는 터널*을* 지나간다.",
        "유형": "loc_path",
        "해설": "통과는 'por'입니다."
    },
    {
        "문장": "La mesa está ( ) la cocina.",
        "정답": "en",
        "오답": "a,de,por,para",
        "번역": "탁자는 부엌*에* 있다.",
        "유형": "loc_position",
        "해설": "내부 위치는 'en'입니다."
    },
    {
        "문장": "Voy a ir ( ) pie.",
        "정답": "a",
        "오답": "en,por,con,de",
        "번역": "*걸어서* 갈 것이다.",
        "유형": "method",
        "해설": "걸어서는 'a pie'입니다."
    },
    {
        "문장": "Estoy ( ) viaje.",
        "정답": "de",
        "오답": "en,a,por,para",
        "번역": "나는 여행 *중*이다.",
        "유형": "manner",
        "해설": "상태(~중)는 'de'입니다."
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
