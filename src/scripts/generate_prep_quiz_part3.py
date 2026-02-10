
import csv

# Manual Preposition Quiz Data 61-90
quiz_data = [
    {
        "문장": "El coche está aparcado ( ) la casa.",
        "정답": "delante de",
        "오답": "detrás de,dentro de,lejos de,sobre",
        "번역": "차는 집 *앞에* 주차되어 있다.",
        "유형": "loc_position",
        "해설": "건물 등의 정면 앞쪽 위치는 'delante de'를 사용합니다."
    },
    {
        "문장": "Hay un jardín ( ) la escuela.",
        "정답": "detrás de",
        "오답": "delante de,encima de,debajo de,entre",
        "번역": "학교 *뒤에* 정원이 있다.",
        "유형": "loc_position",
        "해설": "건물 등의 뒤쪽 위치는 'detrás de'를 사용합니다."
    },
    {
        "문장": "Las llaves están ( ) el bolso.",
        "정답": "dentro de",
        "오답": "fuera de,encima de,debajo de,junto a",
        "번역": "열쇠는 가방 *안에* 있다.",
        "유형": "loc_position",
        "해설": "내부 위치(~안에)는 'dentro de' 또는 'en'을 사용합니다."
    },
    {
        "문장": "Estamos esperando ( ) la oficina.",
        "정답": "fuera de",
        "오답": "dentro de,sobre,bajo,entre",
        "번역": "우리는 사무실 *밖에서* 기다리고 있다.",
        "유형": "loc_position",
        "해설": "외부 위치(~밖에)는 'fuera de'를 사용합니다."
    },
    {
        "문장": "Aprobé el examen ( ) tu ayuda.",
        "정답": "gracias a",
        "오답": "a causa de,por,para,sin",
        "번역": "네 도움 *덕분에* 시험에 합격했다.",
        "유형": "cause",
        "해설": "긍정적인 원인(~덕분에)은 'gracias a'를 사용합니다."
    },
    {
        "문장": "No fuimos al parque ( ) la lluvia.",
        "정답": "a causa de",
        "오답": "gracias a,para,con,sin",
        "번역": "비 *때문에* 공원에 가지 않았다.",
        "유형": "cause",
        "해설": "부정적이거나 중립적인 원인(~때문에)은 'a causa de' 또는 'por'를 사용합니다."
    },
    {
        "문장": "El gato saltó ( ) la valla.",
        "정답": "sobre",
        "오답": "bajo,entre,hacia,desde",
        "번역": "고양이는 울타리 *위로* 뛰어넘었다.",
        "유형": "loc_direction",
        "해설": "위로 넘어가는 동작은 'sobre' 또는 'por encima de'를 씁니다."
    },
    {
        "문장": "Caminamos ( ) la orilla del río.",
        "정답": "por",
        "오답": "para,a,de,en",
        "번역": "우리는 강변*을 따라* 걸었다.",
        "유형": "loc_path",
        "해설": "경로(~을 따라, ~을 통해)는 'por'를 사용합니다."
    },
    {
        "문장": "La tienda está ( ) la izquierda.",
        "정답": "a",
        "오답": "en,de,por,para",
        "번역": "가게는 왼쪽*에* 있다.",
        "유형": "loc_position",
        "해설": "왼쪽/오른쪽 방향 위치는 'a la izquierda/derecha'를 씁니다."
    },
    {
        "문장": "Trabajo ( ) lunes a viernes.",
        "정답": "de",
        "오답": "a,en,por,para",
        "번역": "월요일*부터* 금요일까지 일한다.",
        "유형": "time_duration",
        "해설": "기간의 시작점은 'de' (de... a...) 또는 'desde' (desde... hasta...)를 씁니다."
    },
    {
        "문장": "Voy ( ) médico.",
        "정답": "al",
        "오답": "del,en el,por el,para el",
        "번역": "나는 병원(의사)*에* 간다.",
        "유형": "loc_direction",
        "해설": "이동의 목적지 'a'와 관사 'el'이 합쳐져 'al'이 됩니다."
    },
    {
        "문장": "Vengo ( ) cine.",
        "정답": "del",
        "오답": "al,en el,por el,para el",
        "번역": "나는 영화관*에서* 오는 길이다.",
        "유형": "loc_origin",
        "해설": "출발지 'de'와 관사 'el'이 합쳐져 'del'이 됩니다."
    },
    {
        "문장": "El libro es ( ) mi hermano.",
        "정답": "de",
        "오답": "a,en,por,para",
        "번역": "그 책은 내 형*의* 것이다.",
        "유형": "company",
        "해설": "소유(~의)를 나타낼 때는 'de'를 사용합니다."
    },
    {
        "문장": "Hablamos ( ) teléfono.",
        "정답": "por",
        "오답": "en,a,de,con",
        "번역": "우리는 전화*로* (통해) 이야기한다.",
        "유형": "method",
        "해설": "통신 수단(~을 통해)은 'por'를 사용합니다 (por teléfono, por internet)."
    },
    {
        "문장": "Escribo ( ) lápiz.",
        "정답": "con",
        "오답": "en,por,a,de",
        "번역": "나는 연필*로* (가지고) 쓴다.",
        "유형": "method",
        "해설": "도구(~을 가지고)는 'con'을 사용합니다."
    },
    {
        "문장": "Voy a estar aquí ( ) una semana.",
        "정답": "por",
        "오답": "para,a,de,en",
        "번역": "나는 일주일 *동안* 여기에 있을 것이다.",
        "유형": "time_duration",
        "해설": "기간(~동안)을 나타낼 때는 'por' 또는 'durante'를 사용합니다."
    },
    {
        "문장": "La tarea es ( ) mañana.",
        "정답": "para",
        "오답": "por,a,de,en",
        "번역": "숙제는 내일*까지*다.",
        "유형": "time_deadline",
        "해설": "마감 기한(~까지)은 'para'를 사용합니다."
    },
    {
        "문장": "El tren pasa ( ) un puente.",
        "정답": "por",
        "오답": "para,a,de,en",
        "번역": "기차는 다리*를 지나* 간다.",
        "유형": "loc_path",
        "해설": "통과/경유는 'por'를 사용합니다."
    },
    {
        "문장": "Estoy ( ) acuerdo contigo.",
        "정답": "de",
        "오답": "en,a,por,para",
        "번역": "나는 너에게 동의한다 (합의 *상태*이다).",
        "유형": "manner",
        "해설": "'Estar de acuerdo'는 '~에 동의하다'라는 관용구입니다."
    },
    {
        "문장": "Lo compré ( ) diez euros.",
        "정답": "por",
        "오답": "para,a,de,en",
        "번역": "나는 그것을 10유로*에* (주고) 샀다.",
        "유형": "exchange",
        "해설": "가격이나 교환(~을 대가로)은 'por'를 사용합니다."
    },
    {
        "문장": "Este autobús es ( ) Madrid.",
        "정답": "para",
        "오답": "por,a,de,en",
        "번역": "이 버스는 마드리드*행*이다.",
        "유형": "loc_direction",
        "해설": "목적지(~행)를 강조할 때는 'para'를 사용합니다."
    },
    {
        "문장": "El niño se escondió ( ) la mesa.",
        "정답": "debajo de",
        "오답": "encima de,sobre,entre,hacia",
        "번역": "아이는 탁자 *밑에* 숨었다.",
        "유형": "loc_position",
        "해설": "아래 위치는 'debajo de'를 사용합니다."
    },
    {
        "문장": "La lámpara está ( ) la mesa.",
        "정답": "encima de",
        "오답": "debajo de,bajo,entre,hacia",
        "번역": "램프는 탁자 *위에* 있다.",
        "유형": "loc_position",
        "해설": "위 위치는 'encima de' 또는 'sobre'를 사용합니다."
    },
    {
        "문장": "Vivo ( ) mis abuelos.",
        "정답": "con",
        "오답": "sin,por,para,de",
        "번역": "나는 조부모님*과 함께* 산다.",
        "유형": "company",
        "해설": "동반은 'con'을 사용합니다."
    },
    {
        "문장": "No puedo hacerlo ( ) ti.",
        "정답": "sin",
        "오답": "con,por,para,de",
        "번역": "너 *없이는* 그것을 할 수 없다.",
        "유형": "company",
        "해설": "부재/결핍은 'sin'을 사용합니다."
    },
    {
        "문장": "Llegaremos ( ) las tres.",
        "정답": "a",
        "오답": "en,de,por,para",
        "번역": "우리는 3시*에* 도착할 것이다.",
        "유형": "time_point",
        "해설": "시각 앞에는 'a'를 씁니다."
    },
    {
        "문장": "Salimos ( ) viaje mañana.",
        "정답": "de",
        "오답": "en,a,por,para",
        "번역": "우리는 내일 여행을 *떠난다* (여행 상태로 나간다).",
        "유형": "manner",
        "해설": "'Salir de viaje', 'irse de viaje'는 관용적으로 'de'를 씁니다."
    },
    {
        "문장": "El cuadro está colgado ( ) la pared.",
        "정답": "en",
        "오답": "a,de,por,para",
        "번역": "그림은 벽*에* 걸려 있다.",
        "유형": "loc_position",
        "해설": "벽, 천장 등의 표면에 붙어 있는 위치는 'en'을 사용합니다."
    },
    {
        "문장": "Voy ( ) pie.",
        "정답": "a",
        "오답": "en,por,con,de",
        "번역": "나는 *걸어서* 간다.",
        "유형": "method",
        "해설": "'걸어서'는 'a pie'입니다."
    },
    {
        "문장": "Lo hice ( ) amor.",
        "정답": "por",
        "오답": "para,a,de,en",
        "번역": "나는 사랑 *때문에* (사랑으로) 그것을 했다.",
        "유형": "cause",
        "해설": "행동의 동기나 원인(~때문에)은 'por'를 사용합니다."
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
