
import csv

# Manual Preposition Quiz Data 271-300
quiz_data = [
    {
        "문장": "La ventana da ( ) la calle.",
        "정답": "a",
        "오답": "en,de,por,con",
        "번역": "창문은 거리*로* 나 있다 (향해 있다).",
        "유형": "loc_direction",
        "해설": "'Dar a'는 '~로 향하다, 면하다'는 뜻입니다."
    },
    {
        "문장": "El éxito consiste ( ) trabajar duro.",
        "정답": "en",
        "오답": "a,de,por,con",
        "번역": "성공은 열심히 일하는 것*에* 있다.",
        "유형": "topic",
        "해설": "'Consistir en'은 '~에 있다, ~로 이루어지다'는 뜻입니다."
    },
    {
        "문장": "¿Qué piensas ( ) mi idea?",
        "정답": "de",
        "오답": "en,a,por,con",
        "번역": "내 아이디어*에 대해* 어떻게 생각하니?",
        "유형": "topic",
        "해설": "'Pensar de'는 '~에 대해 어떻게 생각하다(의견)'이고, 'Pensar en'은 '~를 생각하다(머릿속에 떠올리다)'입니다. 의견을 물을 땐 'de'가 더 적절합니다."
    },
    {
        "문장": "Me interesé ( ) el arte.",
        "정답": "por",
        "오답": "a,de,en,con",
        "번역": "나는 예술*에* 관심을 가졌다.",
        "유형": "topic",
        "해설": "'Interesarse por'는 '~에 관심을 가지다'는 뜻입니다."
    },
    {
        "문장": "Se preocupan ( ) el futuro.",
        "정답": "por",
        "오답": "a,de,en,con",
        "번역": "그들은 미래*를* 걱정한다.",
        "유형": "cause",
        "해설": "'Preocuparse por'는 '~에 대해 걱정하다'는 뜻입니다."
    },
    {
        "문장": "Me conformo ( ) poco.",
        "정답": "con",
        "오답": "a,de,en,por",
        "번역": "나는 적은 것*으로* 만족한다.",
        "유형": "manner",
        "해설": "'Conformarse con'은 '~에 만족하다, 순응하다'는 뜻입니다."
    },
    {
        "문장": "Sueño ( ) ser médico.",
        "정답": "con",
        "오답": "a,de,en,por",
        "번역": "나는 의사가 되는 *꿈을* 꾼다.",
        "유형": "topic",
        "해설": "'Soñar con'은 '~하는 꿈을 꾸다'는 뜻입니다."
    },
    {
        "문장": "Me encontré ( ) un amigo.",
        "정답": "con",
        "오답": "a,de,en,por",
        "번역": "나는 친구*와* 마주쳤다 (우연히 만났다).",
        "유형": "company",
        "해설": "'Encontrarse con'은 '~와 우연히 만나다'는 뜻입니다."
    },
    {
        "문장": "Se enfadó ( ) mí.",
        "정답": "con",
        "오답": "a,de,en,por",
        "번역": "그는 나*에게* 화를 냈다.",
        "유형": "company",
        "해설": "'Enfadarse con'은 '~에게 화내다'는 뜻입니다."
    },
    {
        "문장": "Habló ( ) voz baja.",
        "정답": "en",
        "오답": "a,de,por,con",
        "번역": "그는 낮은 목소리*로* 말했다.",
        "유형": "manner",
        "해설": "'En voz baja/alta'는 '낮은/높은 목소리로'라는 뜻입니다."
    },
    {
        "문장": "Lo dije ( ) broma.",
        "정답": "en",
        "오답": "a,de,por,con",
        "번역": "나는 그것을 농담*으로* 말했다.",
        "유형": "manner",
        "해설": "'En broma'는 '농담으로'라는 뜻입니다."
    },
    {
        "문장": "Me lo tomé ( ) serio.",
        "정답": "en",
        "오답": "a,de,por,con",
        "번역": "나는 그것을 진지하게 *받아들였다*.",
        "유형": "manner",
        "해설": "'Tomarse en serio'는 '진지하게 받아들이다'는 뜻입니다."
    },
    {
        "문장": "Estoy ( ) paro.",
        "정답": "en",
        "오답": "a,de,por,con",
        "번역": "나는 *실직* 상태다.",
        "유형": "manner",
        "해설": "'Estar en paro'는 '실직 중이다'는 뜻입니다."
    },
    {
        "문장": "Vino ( ) seguida.",
        "정답": "en",
        "오답": "a,de,por,con",
        "번역": "그는 *즉시* 왔다.",
        "유형": "time_point",
        "해설": "'En seguida'는 '즉시, 곧'이라는 뜻입니다."
    },
    {
        "문장": "Lo hizo ( ) secreto.",
        "정답": "en",
        "오답": "a,de,por,con",
        "번역": "그는 그것을 *비밀로* 했다.",
        "유형": "manner",
        "해설": "'En secreto'는 '비밀리에'라는 뜻입니다."
    },
    {
        "문장": "Entró ( ) silencio.",
        "정답": "en",
        "오답": "a,de,por,con",
        "번역": "그는 조용히 (*침묵 속에*) 들어왔다.",
        "유형": "manner",
        "해설": "'En silencio'는 '조용히'라는 뜻입니다."
    },
    {
        "문장": "Cayó ( ) suelo.",
        "정답": "al",
        "오답": "en el,del,por el",
        "번역": "그는 바닥*으로* 떨어졌다.",
        "유형": "loc_direction",
        "해설": "'Caer al suelo'는 '바닥에 넘어지다/떨어지다'는 뜻입니다."
    },
    {
        "문장": "Juega ( ) fútbol.",
        "정답": "al",
        "오답": "en el,del,por el",
        "번역": "그는 축구*를* 한다.",
        "유형": "method",
        "해설": "'Jugar al' + 스포츠는 '~를 하다'는 뜻입니다."
    },
    {
        "문장": "Se dedica ( ) comercio.",
        "정답": "al",
        "오답": "en el,del,por el",
        "번역": "그는 무역*에* 종사한다.",
        "유형": "method",
        "해설": "'Dedicarse al'은 '~에 종사하다'는 뜻입니다."
    },
    {
        "문장": "Me refiero ( ) libro que leíste.",
        "정답": "al",
        "오답": "en el,del,por el",
        "번역": "나는 네가 읽은 그 책*을* 언급하는 거야.",
        "유형": "topic",
        "해설": "'Referirse a'는 '~을 언급하다, 지칭하다'는 뜻입니다."
    },
    {
        "문장": "Se parece ( ) abuelo.",
        "정답": "al",
        "오답": "en el,del,por el",
        "번역": "그는 할아버지*를* 닮았다.",
        "유형": "company",
        "해설": "'Parecerse a'는 '~를 닮다'는 뜻입니다."
    },
    {
        "문장": "Llamé ( ) médico.",
        "정답": "al",
        "오답": "en el,del,por el",
        "번역": "나는 의사*를* 불렀다 (전화했다).",
        "유형": "method",
        "해설": "'Llamar a'는 '~에게 전화하다, 부르다'는 뜻입니다."
    },
    {
        "문장": "Voy ( ) cine.",
        "정답": "al",
        "오답": "en el,del,por el",
        "번역": "나는 영화관*에* 간다.",
        "유형": "loc_direction",
        "해설": "'Ir al cine'는 영화관에 간다는 뜻입니다."
    },
    {
        "문장": "Vengo ( ) trabajo.",
        "정답": "del",
        "오답": "al,en el,por el",
        "번역": "나는 직장*에서* 오는 길이다.",
        "유형": "loc_origin",
        "해설": "'Venir del'은 ~에서 온다는 뜻입니다."
    },
    {
        "문장": "Salgo ( ) colegio.",
        "정답": "del",
        "오답": "al,en el,por el",
        "번역": "나는 학교*에서* 나온다.",
        "유형": "loc_origin",
        "해설": "'Salir del'은 ~에서 나간다는 뜻입니다."
    },
    {
        "문장": "Es el coche ( ) jefe.",
        "정답": "del",
        "오답": "al,en el,por el",
        "번역": "그것은 사장님*의* 차다.",
        "유형": "company",
        "해설": "소유는 'del'입니다."
    },
    {
        "문장": "Está ( ) lado de la ventana.",
        "정답": "al",
        "오답": "en el,del,por el",
        "번역": "그것은 창문 *옆에* 있다.",
        "유형": "loc_position",
        "해설": "'Al lado de'는 '~옆에'입니다."
    },
    {
        "문장": "Está ( ) final de la calle.",
        "정답": "al",
        "오답": "en el,del,por el",
        "번역": "그것은 거리 *끝에* 있다.",
        "유형": "loc_position",
        "해설": "'Al final de'는 '~끝에'입니다."
    },
    {
        "문장": "Vamos ( ) centro.",
        "정답": "al",
        "오답": "en el,del,por el",
        "번역": "우리는 시내*로* 간다.",
        "유형": "loc_direction",
        "해설": "'Ir al centro'는 시내에 간다는 뜻입니다."
    },
    {
        "문장": "Está ( ) principio del libro.",
        "정답": "al",
        "오답": "en el,del,por el",
        "번역": "그것은 책 *앞부분에* 있다.",
        "유형": "loc_position",
        "해설": "'Al principio de'는 '~초반에'입니다."
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
