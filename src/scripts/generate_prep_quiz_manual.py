
import csv

# Manual Preposition Quiz Data (30 items)
quiz_data = [
    {
        "문장": "El tren sale ( ) Madrid a las ocho.",
        "정답": "para",
        "오답": "por,de,en,hacia",
        "번역": "기차는 8시에 마드리드*행*이다 (마드리드를 향해 출발한다).",
        "유형": "loc_direction",
        "해설": "'salir para'는 목적지를 강조하여 '~행이다', '~로 향하다'라는 의미를 가집니다. 'hacia'도 방향을 나타내지만, 'para'가 목적지 도달의 뉘앙스가 더 강합니다."
    },
    {
        "문장": "Hemos caminado ( ) el bosque durante dos horas.",
        "정답": "por",
        "오답": "para,a,de,en",
        "번역": "우리는 2시간 동안 숲*을 지나* 걸었다.",
        "유형": "loc_path",
        "해설": "장소를 통과하거나 경유해서 지나가는 이동은 'por'를 사용합니다. 'en'은 정지된 위치, 'a'는 목적지를 나타냅니다."
    },
    {
        "문장": "La reunión está programada ( ) el próximo lunes.",
        "정답": "para",
        "오답": "por,a,de,en",
        "번역": "회의는 다음 주 월요일*로* 예정되어 있다 (기한/예정).",
        "유형": "time_deadline",
        "해설": "예정된 기한이나 날짜를 나타낼 때는 'para'를 사용합니다. 'por'는 대략적인 기간을 나타낼 때 씁니다."
    },
    {
        "문장": "El regalo es ( ) mi madre.",
        "정답": "para",
        "오답": "por,a,de,con",
        "번역": "이 선물은 나의 어머니*를 위한* 것이다.",
        "유형": "company",
        "해설": "수혜자(받는 사람)를 나타낼 때는 'para'를 사용합니다. 'por'는 원인(~때문에)을 나타냅니다."
    },
    {
        "문장": "No puedo dormir ( ) el ruido de la calle.",
        "정답": "por",
        "오답": "para,de,a,sin",
        "번역": "거리의 소음 *때문에* 잠을 잘 수가 없다.",
        "유형": "cause",
        "해설": "원인이나 이유(~때문에)를 나타낼 때는 'por'를 사용합니다."
    },
    {
        "문장": "El libro está ( ) la mesa.",
        "정답": "sobre",
        "오답": "bajo,entre,hacia,desde",
        "번역": "책은 탁자 *위에* 있다.",
        "유형": "loc_position",
        "해설": "표면 위에 놓여 있는 위치를 나타낼 때는 'sobre' 또는 'encima de'를 사용합니다."
    },
    {
        "문장": "Llegaremos ( ) las cinco de la tarde.",
        "정답": "hacia",
        "오답": "hasta,desde,de,entre",
        "번역": "우리는 오후 5시 *무렵에* 도착할 것이다.",
        "유형": "time_point",
        "해설": "대략적인 시간(~경에, ~쯤에)을 나타낼 때는 'hacia' 또는 'sobre'를 사용합니다."
    },
    {
        "문장": "Voy a viajar ( ) avión.",
        "정답": "en",
        "오답": "por,a,con,de",
        "번역": "나는 비행기*를 타고* (비행기로) 여행할 것이다.",
        "유형": "method",
        "해설": "교통 수단을 나타낼 때는 전치사 'en'을 사용합니다 (en coche, en tren). 단, 'a pie'(걸어서)와 'a caballo'(말을 타고)는 예외적으로 'a'를 씁니다."
    },
    {
        "문장": "Este cuadro fue pintado ( ) Picasso.",
        "정답": "por",
        "오답": "para,de,a,con",
        "번역": "이 그림은 피카소*에 의해* 그려졌다.",
        "유형": "method",
        "해설": "수동태 문장에서 행위자(~에 의해)를 나타낼 때는 'por'를 사용합니다."
    },
    {
        "문장": "Salimos ( ) casa muy temprano.",
        "정답": "de",
        "오답": "a,en,por,para",
        "번역": "우리는 집*에서* 매우 일찍 나왔다.",
        "유형": "loc_origin",
        "해설": "출발지나 기원(~에서부터)을 나타낼 때는 'de'를 사용합니다. 'salir de'는 '~에서 나가다'라는 숙어적 표현입니다."
    },
    {
        "문장": "La farmacia está ( ) el banco y el supermercado.",
        "정답": "entre",
        "오답": "sobre,bajo,ante,tras",
        "번역": "약국은 은행과 슈퍼마켓 *사이에* 있다.",
        "유형": "loc_position",
        "해설": "두 대상 사이의 위치를 나타낼 때는 'entre'를 사용합니다."
    },
    {
        "문장": "Estudio español ( ) mejorar mi trabajo.",
        "정답": "para",
        "오답": "por,a,de,en",
        "번역": "나는 내 업무 능력을 향상시키기 *위해* 스페인어를 공부한다.",
        "유형": "purpose",
        "해설": "목적(~하기 위해)을 나타낼 때는 'para' + 동사원형을 사용합니다."
    },
    {
        "문장": "Hablamos ( ) la situación económica.",
        "정답": "sobre",
        "오답": "en,con,por,para",
        "번역": "우리는 경제 상황*에 대해* 이야기했다.",
        "유형": "topic",
        "해설": "주제(~에 관하여)를 나타낼 때는 'sobre' 또는 'de'를 사용합니다."
    },
    {
        "문장": "El gato se escondió ( ) la cama.",
        "정답": "bajo",
        "오답": "sobre,en,a,de",
        "번역": "고양이는 침대 *밑에* 숨었다.",
        "유형": "loc_position",
        "해설": "아래 위치를 나타낼 때는 'bajo' 또는 'debajo de'를 사용합니다."
    },
    {
        "문장": "Te llamaré ( ) las diez y las once.",
        "정답": "entre",
        "오답": "a,de,por,hacia",
        "번역": "10시와 11시 *사이에* 전화할게.",
        "유형": "time_duration",
        "해설": "두 시점 사이의 기간을 나타낼 때는 'entre'를 사용합니다."
    },
    {
        "문장": "No puedo vivir ( ) ti.",
        "정답": "sin",
        "오답": "con,por,para,de",
        "번역": "나는 너 *없이* 살 수 없다.",
        "유형": "company",
        "해설": "부재나 결핍(~없이)을 나타낼 때는 'sin'을 사용합니다."
    },
    {
        "문장": "Prefiero pagar ( ) tarjeta.",
        "정답": "con",
        "오답": "por,a,en,de",
        "번역": "나는 카드*로* (카드를 가지고) 결제하는 것을 선호한다.",
        "유형": "method",
        "해설": "도구나 수단(~을 가지고)을 나타낼 때는 'con'을 사용합니다. (pagar con tarjeta / pagar en efectivo)"
    },
    {
        "문장": "Estuvimos en la fiesta ( ) el amanecer.",
        "정답": "hasta",
        "오답": "hacia,desde,por,para",
        "번역": "우리는 새벽*까지* 파티에 있었다.",
        "유형": "time_deadline",
        "해설": "동작의 종료 시점(~까지 계속)을 나타낼 때는 'hasta'를 사용합니다."
    },
    {
        "문장": "Vivo en España ( ) 2015.",
        "정답": "desde",
        "오답": "de,en,a,hasta",
        "번역": "나는 2015년*부터* 스페인에 살고 있다.",
        "유형": "time_point",
        "해설": "과거의 특정 시점부터 현재까지 계속됨을 나타낼 때는 'desde'를 사용합니다."
    },
    {
        "문장": "El niño se escondió ( ) la puerta.",
        "정답": "tras",
        "오답": "ante,bajo,sobre,entre",
        "번역": "아이는 문 *뒤에* 숨었다.",
        "유형": "loc_position",
        "해설": "위치상 뒤쪽을 나타낼 때는 'tras' 또는 'detrás de'를 사용합니다."
    },
    {
        "문장": "Luchamos ( ) la injusticia.",
        "정답": "contra",
        "오답": "por,para,con,de",
        "번역": "우리는 불의*에 맞서* (반대하여) 싸운다.",
        "유형": "topic",
        "해설": "대립이나 반대(~에 맞서)를 나타낼 때는 'contra'를 사용합니다."
    },
    {
        "문장": "Lo hice ( ) ayudar, no por interés.",
        "정답": "para",
        "오답": "por,a,de,en",
        "번역": "나는 돕기 *위해* 그것을 했지, 이익 때문이 아니다.",
        "유형": "purpose",
        "해설": "목적(~하기 위해)을 나타낼 때는 'para'를, 원인(~때문에)을 나타낼 때는 'por'를 씁니다."
    },
    {
        "문장": "Cambié mi coche viejo ( ) uno nuevo.",
        "정답": "por",
        "오답": "para,a,con,de",
        "번역": "나는 내 헌 차를 새 차*와* 바꿨다 (교환했다).",
        "유형": "exchange",
        "해설": "교환(~을 대가로, ~와 맞바꿔)을 나타낼 때는 'por'를 사용합니다."
    },
    {
        "문장": "El tren pasa ( ) un túnel muy largo.",
        "정답": "por",
        "오답": "para,a,de,en",
        "번역": "기차는 매우 긴 터널*을 통과해* 지나간다.",
        "유형": "loc_path",
        "해설": "관통하거나 경유하는 경로(~를 통해)는 'por' 또는 'a través de'를 사용합니다."
    },
    {
        "문장": "Estoy ( ) vacaciones.",
        "정답": "de",
        "오답": "en,a,por,para",
        "번역": "나는 휴가 *중*이다.",
        "유형": "manner",
        "해설": "'Estar de vacaciones', 'estar de viaje' 등은 관용적으로 'de'를 사용하여 상태를 나타냅니다."
    },
    {
        "문장": "Vengo ( ) trabajar.",
        "정답": "de",
        "오답": "a,en,por,para",
        "번역": "나는 일하*고 나서* (일터에서) 오는 길이다.",
        "유형": "loc_origin",
        "해설": "출발지나 기원(~에서부터)을 나타낼 때는 'de'를 사용합니다."
    },
    {
        "문장": "El museo está ( ) la derecha.",
        "정답": "a",
        "오답": "en,de,por,para",
        "번역": "박물관은 오른쪽*에* 있다.",
        "유형": "loc_position",
        "해설": "방향성 있는 위치(오른쪽에, 왼쪽에)를 나타낼 때는 'a'를 사용합니다 (a la derecha, a la izquierda)."
    },
    {
        "문장": "Trabajo ( ) lunes a viernes.",
        "정답": "de",
        "오답": "a,en,por,para",
        "번역": "나는 월요일*부터* 금요일까지 일한다.",
        "유형": "time_duration",
        "해설": "'de... a...' 구문은 시간이나 장소의 시작과 끝을 나타냅니다 (desde... hasta... 와 유사). 여기서는 시작점 'de'가 정답입니다."
    },
    {
        "문장": "Voy a casa ( ) pie.",
        "정답": "a",
        "오답": "en,por,con,de",
        "번역": "나는 *걸어서* (도보로) 집에 간다.",
        "유형": "method",
        "해설": "교통수단은 보통 'en'을 쓰지만, '걸어서'는 관용적으로 'a pie'라고 합니다."
    },
    {
        "문장": "Gracias ( ) todo.",
        "정답": "por",
        "오답": "para,a,de,con",
        "번역": "모든 것에 *대해* 고마워.",
        "유형": "cause",
        "해설": "감사의 원인이나 이유를 나타낼 때는 'por'를 사용합니다 (Gracias por...)."
    }
]

# Write to CSV
output_path = 'src/data/preposition_quiz.csv'
headers = ['문장', '뜻', '정답', '오답', '유형', '해설']

with open(output_path, 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=headers)
    writer.writeheader()
    for item in quiz_data:
        writer.writerow({
            '문장': item['문장'],
            '뜻': item['번역'],
            '정답': item['정답'],
            '오답': item['오답'],
            '유형': item['유형'],
            '해설': item['해설']
        })

print(f"Created {len(quiz_data)} manual items in {output_path}")
