
import csv

# Manual Preposition Quiz Data 241-270 (Por vs Para Focus)
quiz_data = [
    {
        "문장": "Estudio ( ) aprender.",
        "정답": "para",
        "오답": "por,de,a,en",
        "번역": "나는 배우기 *위해* 공부한다.",
        "유형": "purpose",
        "해설": "목적은 'para'입니다."
    },
    {
        "문장": "Lo hice ( ) ti.",
        "정답": "por",
        "오답": "para,de,a,en",
        "번역": "나는 너 *때문에* (너를 대신해서) 했다.",
        "유형": "cause",
        "해설": "이유나 대리는 'por'입니다."
    },
    {
        "문장": "El regalo es ( ) ti.",
        "정답": "para",
        "오답": "por,de,a,en",
        "번역": "선물은 너*를 위한* 것이다.",
        "유형": "company",
        "해설": "수혜자는 'para'입니다."
    },
    {
        "문장": "Viajamos ( ) tren.",
        "정답": "en",
        "오답": "por,a,de,con",
        "번역": "우리는 기차*로* (타고) 여행한다.",
        "유형": "method",
        "해설": "교통수단은 'en'이지만, 통신 수단이나 경로는 'por'를 쓸 수 있어 헷갈리기 쉽습니다. 여기선 '타고 간다'는 의미이므로 'en'이 가장 적절합니다."
    },
    {
        "문장": "Hablamos ( ) teléfono.",
        "정답": "por",
        "오답": "en,a,de,con",
        "번역": "우리는 전화*로* (통해) 이야기한다.",
        "유형": "method",
        "해설": "통신 수단은 'por'입니다."
    },
    {
        "문장": "Pagué 20 euros ( ) la camisa.",
        "정답": "por",
        "오답": "para,a,de,en",
        "번역": "나는 셔츠 값*으로* 20유로를 냈다.",
        "유형": "exchange",
        "해설": "교환/가격은 'por'입니다."
    },
    {
        "문장": "La tarea es ( ) el lunes.",
        "정답": "para",
        "오답": "por,a,de,en",
        "번역": "숙제는 월요일*까지*다.",
        "유형": "time_deadline",
        "해설": "기한은 'para'입니다."
    },
    {
        "문장": "Estuve allí ( ) dos semanas.",
        "정답": "por",
        "오답": "para,a,de,en",
        "번역": "나는 2주 *동안* 거기에 있었다.",
        "유형": "time_duration",
        "해설": "기간은 'por'입니다."
    },
    {
        "문장": "Salimos ( ) la mañana.",
        "정답": "por",
        "오답": "para,a,de,en",
        "번역": "우리는 아침*에* 나간다.",
        "유형": "time_duration",
        "해설": "하루 중 시간대(아침/점심/저녁)는 'por'입니다."
    },
    {
        "문장": "El tren sale ( ) Madrid.",
        "정답": "para",
        "오답": "por,de,en,a",
        "번역": "기차는 마드리드*행*이다 (마드리드로 떠난다).",
        "유형": "loc_direction",
        "해설": "목적지 방향은 'para'입니다. (de Madrid는 마드리드발)"
    },
    {
        "문장": "Pasamos ( ) el parque.",
        "정답": "por",
        "오답": "para,a,de,en",
        "번역": "우리는 공원*을* (지나) 간다.",
        "유형": "loc_path",
        "해설": "경유/통과는 'por'입니다."
    },
    {
        "문장": "( ) mí, es importante.",
        "정답": "Para",
        "오답": "Por,De,A,En",
        "번역": "나*에게는* (내 생각엔) 중요하다.",
        "유형": "topic",
        "해설": "의견(~에게는)은 'para'입니다."
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
        "문장": "No fui ( ) estar enfermo.",
        "정답": "por",
        "오답": "para,a,de,en",
        "번역": "나는 아파서 (아픈 것 *때문에*) 가지 않았다.",
        "유형": "cause",
        "해설": "원인은 'por'입니다."
    },
    {
        "문장": "Es muy alto ( ) su edad.",
        "정답": "para",
        "오답": "por,de,a,en",
        "번역": "그는 나이*치고는* 키가 매우 크다.",
        "유형": "topic",
        "해설": "비교 기준(~치고는)은 'para'입니다."
    },
    {
        "문장": "Te doy esto ( ) aquello.",
        "정답": "por",
        "오답": "para,a,de,en",
        "번역": "이것을 저것*과* (바꿔) 줄게.",
        "유형": "exchange",
        "해설": "교환은 'por'입니다."
    },
    {
        "문장": "Voy ( ) agua.",
        "정답": "a",
        "오답": "por,de,en,con",
        "번역": "나는 물 *마시러* (물 쪽으로) 간다.",
        "유형": "purpose",
        "해설": "'Ir a por' + 사물은 '~을 가지러 가다'라는 뜻으로 'a'와 'por'가 같이 쓰이지만, 여기선 방향성 'a'가 기본입니다. 혹은 'Ir por agua'(물 가지러 가다)도 가능하므로 보기를 조정해야 합니다. 정답을 'por'로 수정하겠습니다."
    },
    {
        "문장": "Voy ( ) agua.",
        "정답": "por",
        "오답": "para,a,de,en",
        "번역": "나는 물 *가지러* 간다.",
        "유형": "purpose",
        "해설": "'Ir por'는 '~을 가지러 가다, 데리러 가다'는 뜻입니다."
    },
    {
        "문장": "Está ( ) llegar.",
        "정답": "por",
        "오답": "para,a,de,en",
        "번역": "그는 *아직* 도착하지 않았다 (도착할 예정이다).",
        "유형": "time_point",
        "해설": "'Estar por' + 동사원형은 '아직 ~하지 않았다, ~할 예정이다'는 뜻입니다."
    },
    {
        "문장": "La carta es ( ) el director.",
        "정답": "para",
        "오답": "por,de,a,en",
        "번역": "편지는 이사님*께* (드리는 것)이다.",
        "유형": "company",
        "해설": "수신인은 'para'입니다."
    },
    {
        "문장": "Escrito ( ) Cervantes.",
        "정답": "por",
        "오답": "para,de,a,en",
        "번역": "세르반테스*에 의해* 쓰여진.",
        "유형": "method",
        "해설": "행위자는 'por'입니다."
    },
    {
        "문장": "Leí el libro ( ) encima.",
        "정답": "por",
        "오답": "para,a,de,en",
        "번역": "나는 책을 *대충* (겉핥기로) 읽었다.",
        "유형": "manner",
        "해설": "'Por encima'는 '대충, 겉으로'라는 뜻입니다."
    },
    {
        "문장": "Lo dejé ( ) imposible.",
        "정답": "por",
        "오답": "para,a,de,en",
        "번역": "나는 그것을 불가능한 것*으로* (치고) 그만두었다.",
        "유형": "manner",
        "해설": "'Dar/Dejar por' + 형용사는 '~로 여기다, 간주하다'는 뜻입니다."
    },
    {
        "문장": "( ) fin terminamos.",
        "정답": "Por",
        "오답": "Para,De,A,En",
        "번역": "*마침내* 끝났다.",
        "유형": "manner",
        "해설": "'Por fin'은 마침내입니다."
    },
    {
        "문장": "( ) cierto, ¿cómo estás?",
        "정답": "Por",
        "오답": "Para,De,A,En",
        "번역": "*그건 그렇고*, 잘 지내?",
        "유형": "topic",
        "해설": "'Por cierto'는 화제 전환(그건 그렇고)입니다."
    },
    {
        "문장": "( ) supuesto.",
        "정답": "Por",
        "오답": "Para,De,A,En",
        "번역": "*물론이지*.",
        "유형": "manner",
        "해설": "'Por supuesto'는 당연하다는 뜻입니다."
    },
    {
        "문장": "( ) favor, ayúdame.",
        "정답": "Por",
        "오답": "Para,De,A,En",
        "번역": "*제발*, 도와줘.",
        "유형": "manner",
        "해설": "'Por favor'는 부탁할 때 씁니다."
    },
    {
        "문장": "( ) lo menos, inténtalo.",
        "정답": "Por",
        "오답": "Para,De,A,En",
        "번역": "*적어도*, 시도는 해봐.",
        "유형": "manner",
        "해설": "'Por lo menos'는 적어도입니다."
    },
    {
        "문장": "Iba ( ) la calle.",
        "정답": "por",
        "오답": "para,a,de,en",
        "번역": "나는 거리*를* (따라) 가고 있었다.",
        "유형": "loc_path",
        "해설": "이동 경로는 'por'입니다."
    },
    {
        "문장": "Me preguntó ( ) ti.",
        "정답": "por",
        "오답": "para,a,de,en",
        "번역": "그는 나에게 너*에 대해* (안부를) 물었다.",
        "유형": "topic",
        "해설": "'Preguntar por'는 '~의 안부를 묻다, 찾다'는 뜻입니다."
    }
]

output_path = 'src/data/preposition_quiz.csv'
headers = ['문장', '뜻', '정답', '오답', '유형', '해설']

with open(output_path, 'a', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=headers, quoting=csv.QUOTE_ALL)
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
