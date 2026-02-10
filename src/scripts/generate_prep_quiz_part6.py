
import csv

# Manual Preposition Quiz Data 151-180
quiz_data = [
    {
        "문장": "Estoy ( ) favor de la propuesta.",
        "정답": "a",
        "오답": "en,de,por,con",
        "번역": "나는 그 제안에 *찬성*한다.",
        "유형": "topic",
        "해설": "'Estar a favor de'는 '~에 찬성하다'라는 숙어입니다. (반대: en contra de)"
    },
    {
        "문장": "El barco está ( ) medio del mar.",
        "정답": "en",
        "오답": "a,de,por,entre",
        "번역": "배가 바다 *한가운데에* 있다.",
        "유형": "loc_position",
        "해설": "'En medio de'는 '~의 한가운데에'라는 표현입니다."
    },
    {
        "문장": "Lo haré ( ) tal de verte feliz.",
        "정답": "con",
        "오답": "por,para,sin,a",
        "번역": "네가 행복해지는 것을 *볼 수만 있다면* (그 대가로) 그것을 하겠다.",
        "유형": "cause",
        "해설": "'Con tal de'는 '~하기만 한다면, ~할 수 있다면'이라는 조건/목적의 의미를 가집니다."
    },
    {
        "문장": "Caminamos ( ) lo largo del río.",
        "정답": "a",
        "오답": "en,por,de,con",
        "번역": "우리는 강을 *따라* 걸었다.",
        "유형": "loc_path",
        "해설": "'A lo largo de'는 '~을 따라서(길게)'라는 의미입니다."
    },
    {
        "문장": "El niño se escondió ( ) miedo.",
        "정답": "de",
        "오답": "por,con,a,en",
        "번역": "아이는 무서워서 (*공포로 인해*) 숨었다.",
        "유형": "cause",
        "해설": "감정적인 원인(~때문에)은 'de'를 자주 씁니다 (llorar de alegría, morir de hambre). 'por miedo'도 가능하지만, 'de miedo'가 더 관용적입니다."
    },
    {
        "문장": "Vengo ( ) parte de Juan.",
        "정답": "de",
        "오답": "a,en,por,con",
        "번역": "후안이 *보내서* (후안 측에서) 왔습니다.",
        "유형": "loc_origin",
        "해설": "'De parte de'는 '~를 대신하여, ~가 보내서'라는 표현입니다."
    },
    {
        "문장": "El tren llegó ( ) su hora.",
        "정답": "a",
        "오답": "en,de,por,con",
        "번역": "기차는 *제시간에* 도착했다.",
        "유형": "time_point",
        "해설": "'A su hora' 또는 'a tiempo'는 '제시간에'라는 뜻입니다."
    },
    {
        "문장": "Estamos ( ) prueba.",
        "정답": "a",
        "오답": "en,de,por,con",
        "번역": "우리는 *시험 삼아* (수습 기간으로) 해보는 중이다.",
        "유형": "manner",
        "해설": "'Estar a prueba'는 '수습 중이다, 시험 중이다'라는 뜻입니다."
    },
    {
        "문장": "Lo sé ( ) memoria.",
        "정답": "de",
        "오답": "a,en,por,con",
        "번역": "나는 그것을 *외워서* (기억으로) 안다.",
        "유형": "manner",
        "해설": "'De memoria'는 '암기하여'라는 뜻입니다."
    },
    {
        "문장": "El libro está escrito ( ) mano.",
        "정답": "a",
        "오답": "en,de,por,con",
        "번역": "그 책은 *손으로* 쓰여졌다.",
        "유형": "method",
        "해설": "손으로(수작업)는 'a mano'입니다. (Hecho a mano)"
    },
    {
        "문장": "Salió ( ) la tele.",
        "정답": "en",
        "오답": "a,de,por,con",
        "번역": "그는 TV*에* 나왔다.",
        "유형": "loc_position",
        "해설": "매체(TV, 라디오, 신문)에 나오는 것은 'en'을 씁니다 (en la televisión)."
    },
    {
        "문장": "Me voy ( ) fin de semana.",
        "정답": "de",
        "오답": "a,en,por,con",
        "번역": "나는 주말 *여행을* 간다.",
        "유형": "manner",
        "해설": "'Irse de fin de semana'는 주말을 보내러 떠난다는 뜻입니다."
    },
    {
        "문장": "Estoy ( ) huelga.",
        "정답": "en",
        "오답": "a,de,por,con",
        "번역": "나는 *파업* 중이다.",
        "유형": "manner",
        "해설": "'Estar en huelga'는 파업 중이라는 뜻입니다."
    },
    {
        "문장": "Huele ( ) quemado.",
        "정답": "a",
        "오답": "en,de,por,con",
        "번역": "*탄 냄새가* 난다.",
        "유형": "manner",
        "해설": "'Oler a'는 '~냄새가 나다'라는 표현입니다."
    },
    {
        "문장": "Sabe ( ) fresa.",
        "정답": "a",
        "오답": "en,de,por,con",
        "번역": "*딸기 맛이* 난다.",
        "유형": "manner",
        "해설": "'Saber a'는 '~맛이 나다'라는 표현입니다."
    },
    {
        "문장": "Estoy ( ) dieta.",
        "정답": "a",
        "오답": "en,de,por,con",
        "번역": "나는 *다이어트* 중이다.",
        "유형": "manner",
        "해설": "'Estar a dieta'는 다이어트 중이라는 뜻입니다."
    },
    {
        "문장": "El coche va ( ) cien.",
        "정답": "a",
        "오답": "en,de,por,con",
        "번역": "차는 *시속 100km로* 간다.",
        "유형": "method",
        "해설": "속도를 나타낼 때는 'a'를 씁니다 (a 100 km/h)."
    },
    {
        "문장": "Lo vendí ( ) buen precio.",
        "정답": "a",
        "오답": "en,de,por,con",
        "번역": "나는 그것을 좋은 가격*에* 팔았다.",
        "유형": "exchange",
        "해설": "가격을 나타낼 때는 'a' 또는 'por'를 쓰는데, 'a buen precio'가 관용적입니다."
    },
    {
        "문장": "Estamos ( ) salvo.",
        "정답": "a",
        "오답": "en,de,por,con",
        "번역": "우리는 *안전하다* (안전한 곳에 있다).",
        "유형": "loc_position",
        "해설": "'Estar a salvo'는 안전하다는 뜻입니다."
    },
    {
        "문장": "Quedamos ( ) la puerta del cine.",
        "정답": "en",
        "오답": "a,de,por,con",
        "번역": "우리는 영화관 문 *앞에서* (장소에서) 만나기로 했다.",
        "유형": "loc_position",
        "해설": "만남의 장소를 정할 때는 'en'을 주로 씁니다."
    },
    {
        "문장": "Voy ( ) compras.",
        "정답": "de",
        "오답": "a,en,por,con",
        "번역": "나는 *쇼핑하러* 간다.",
        "유형": "manner",
        "해설": "'Ir de compras'는 쇼핑하러 간다는 뜻입니다."
    },
    {
        "문장": "Viste ( ) negro.",
        "정답": "de",
        "오답": "a,en,por,con",
        "번역": "그는 검은색*으로* (검은 옷을) 입었다.",
        "유형": "manner",
        "해설": "'Vestir de' + 색상은 ~색 옷을 입다는 뜻입니다."
    },
    {
        "문장": "Trabaja ( ) profesor.",
        "정답": "de",
        "오답": "a,en,por,con",
        "번역": "그는 선생님*으로* 일한다.",
        "유형": "method",
        "해설": "직업/자격(~로서)은 'de'를 씁니다 (Trabajar de...)."
    },
    {
        "문장": "Me enamoré ( ) ella.",
        "정답": "de",
        "오답": "a,en,por,con",
        "번역": "나는 그녀*에게* 사랑에 빠졌다.",
        "유형": "cause",
        "해설": "'Enamorarse de'는 ~와 사랑에 빠지다는 뜻입니다."
    },
    {
        "문장": "Confío ( ) ti.",
        "정답": "en",
        "오답": "a,de,por,con",
        "번역": "나는 너*를* 믿는다.",
        "유형": "topic",
        "해설": "'Confiar en'은 ~를 신뢰하다는 뜻입니다."
    },
    {
        "문장": "Pienso ( ) ti.",
        "정답": "en",
        "오답": "a,de,por,con",
        "번역": "나는 네 *생각을* 한다.",
        "유형": "topic",
        "해설": "'Pensar en'은 ~를 생각하다는 뜻입니다."
    },
    {
        "문장": "Sueño ( ) viajar.",
        "정답": "con",
        "오답": "a,de,por,en",
        "번역": "나는 여행하는 *꿈을* 꾼다.",
        "유형": "topic",
        "해설": "'Soñar con'은 ~하는 꿈을 꾸다는 뜻입니다."
    },
    {
        "문장": "Me alegro ( ) verte.",
        "정답": "de",
        "오답": "a,en,por,con",
        "번역": "너를 봐서 *기쁘다*.",
        "유형": "cause",
        "해설": "'Alegrarse de'는 ~해서 기쁘다는 뜻입니다."
    },
    {
        "문장": "Se olvidó ( ) las llaves.",
        "정답": "de",
        "오답": "a,en,por,con",
        "번역": "그는 열쇠*를* 잊어버렸다.",
        "유형": "topic",
        "해설": "'Olvidarse de'는 ~를 잊다는 뜻입니다."
    },
    {
        "문장": "Acabo ( ) llegar.",
        "정답": "de",
        "오답": "a,en,por,con",
        "번역": "나는 *막* 도착했다.",
        "유형": "time_point",
        "해설": "'Acabar de' + 동사원형은 '방금 ~했다'는 뜻입니다."
    }
]

output_path = 'src/data/preposition_quiz.csv'
headers = ['문장', '뜻', '정답', '오답', '유형', '해설']

with open(output_path, 'a', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=headers, quoting=csv.QUOTE_ALL)
    # No header writing for append mode
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
