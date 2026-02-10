
import csv

# Manual Preposition Quiz Data 181-210
quiz_data = [
    {
        "문장": "Bajamos ( ) tren en la próxima estación.",
        "정답": "del",
        "오답": "al,en el,por el,con el",
        "번역": "우리는 다음 역에서 기차*에서* 내린다.",
        "유형": "loc_origin",
        "해설": "'Bajar de'는 '~에서 내리다'라는 뜻입니다. (de + el = del)"
    },
    {
        "문장": "Subimos ( ) autobús.",
        "정답": "al",
        "오답": "del,en el,por el,con el",
        "번역": "우리는 버스*에* 탄다.",
        "유형": "loc_direction",
        "해설": "'Subir a'는 '~에 타다/오르다'라는 뜻입니다. (a + el = al)"
    },
    {
        "문장": "Estoy ( ) punto de salir.",
        "정답": "a",
        "오답": "en,de,por,con",
        "번역": "나는 *막* 나가려던 참이다.",
        "유형": "time_point",
        "해설": "'Estar a punto de' + 동사원형은 '막 ~하려 하다'는 뜻입니다."
    },
    {
        "문장": "Debes dejar ( ) fumar.",
        "정답": "de",
        "오답": "a,en,por,con",
        "번역": "너는 담배를 *끊어야* (그만둬야) 한다.",
        "유형": "topic",
        "해설": "'Dejar de' + 동사원형은 '~하는 것을 그만두다'는 뜻입니다."
    },
    {
        "문장": "Empezó ( ) llover.",
        "정답": "a",
        "오답": "de,en,por,con",
        "번역": "비가 오기 *시작했다*.",
        "유형": "time_point",
        "해설": "'Empezar a' + 동사원형은 '~하기 시작하다'는 뜻입니다."
    },
    {
        "문장": "Volvió ( ) hacerlo.",
        "정답": "a",
        "오답": "de,en,por,con",
        "번역": "그는 그것을 *다시* 했다.",
        "유형": "manner",
        "해설": "'Volver a' + 동사원형은 '다시 ~하다'는 뜻입니다."
    },
    {
        "문장": "Trato ( ) estudiar todos los días.",
        "정답": "de",
        "오답": "a,en,por,con",
        "번역": "나는 매일 공부*하려* (노력)한다.",
        "유형": "purpose",
        "해설": "'Tratar de' + 동사원형은 '~하려고 노력하다, 시도하다'는 뜻입니다."
    },
    {
        "문장": "Me olvidé ( ) comprar leche.",
        "정답": "de",
        "오답": "a,en,por,con",
        "번역": "나는 우유 사는 것을 *잊어버렸다*.",
        "유형": "topic",
        "해설": "'Olvidarse de'는 '~을 잊다'는 뜻입니다."
    },
    {
        "문장": "Se queja ( ) todo.",
        "정답": "de",
        "오답": "a,en,por,con",
        "번역": "그는 모든 것에 *대해* 불평한다.",
        "유형": "topic",
        "해설": "'Quejarse de'는 '~에 대해 불평하다'는 뜻입니다."
    },
    {
        "문장": "Depende ( ) ti.",
        "정답": "de",
        "오답": "a,en,por,con",
        "번역": "그건 너*에게* 달려 있다.",
        "유형": "cause",
        "해설": "'Depender de'는 '~에 달려 있다, 의존하다'는 뜻입니다."
    },
    {
        "문장": "El libro consta ( ) tres partes.",
        "정답": "de",
        "오답": "a,en,por,con",
        "번역": "그 책은 3부분*으로* 구성되어 있다.",
        "유형": "material",
        "해설": "'Constar de'는 '~로 구성되다'는 뜻입니다."
    },
    {
        "문장": "Me enteré ( ) la noticia.",
        "정답": "de",
        "오답": "a,en,por,con",
        "번역": "나는 그 소식을 *알게 되었다*.",
        "유형": "topic",
        "해설": "'Enterarse de'는 '~을 알게 되다, 듣다'는 뜻입니다."
    },
    {
        "문장": "Se parece ( ) su padre.",
        "정답": "a",
        "오답": "de,en,por,con",
        "번역": "그는 그의 아버지*를* 닮았다.",
        "유형": "company",
        "해설": "'Parecerse a'는 '~를 닮다'는 뜻입니다."
    },
    {
        "문장": "Me acostumbré ( ) vivir solo.",
        "정답": "a",
        "오답": "de,en,por,con",
        "번역": "나는 혼자 사는 것*에* 익숙해졌다.",
        "유형": "manner",
        "해설": "'Acostumbrarse a'는 '~에 익숙해지다'는 뜻입니다."
    },
    {
        "문장": "Asistió ( ) la reunión.",
        "정답": "a",
        "오답": "de,en,por,con",
        "번역": "그는 회의*에* 참석했다.",
        "유형": "loc_direction",
        "해설": "'Asistir a'는 '~에 참석하다'는 뜻입니다."
    },
    {
        "문장": "Se casó ( ) ella.",
        "정답": "con",
        "오답": "a,de,por,en",
        "번역": "그는 그녀*와* 결혼했다.",
        "유형": "company",
        "해설": "'Casarse con'은 '~와 결혼하다'는 뜻입니다."
    },
    {
        "문장": "Huele ( ) rosas.",
        "정답": "a",
        "오답": "de,en,por,con",
        "번역": "*장미 향기가* 난다.",
        "유형": "manner",
        "해설": "'Oler a'는 '~냄새가 나다'는 뜻입니다."
    },
    {
        "문장": "Me arrepiento ( ) haberlo dicho.",
        "정답": "de",
        "오답": "a,en,por,con",
        "번역": "나는 그것을 말한 것을 *후회한다*.",
        "유형": "cause",
        "해설": "'Arrepentirse de'는 '~을 후회하다'는 뜻입니다."
    },
    {
        "문장": "Se rieron ( ) mí.",
        "정답": "de",
        "오답": "a,en,por,con",
        "번역": "그들은 나*를* 비웃었다.",
        "유형": "cause",
        "해설": "'Reírse de'는 '~를 비웃다'는 뜻입니다."
    },
    {
        "문장": "Cuento ( ) tu ayuda.",
        "정답": "con",
        "오답": "a,de,por,en",
        "번역": "나는 네 도움*을* 믿는다 (기대한다).",
        "유형": "topic",
        "해설": "'Contar con'은 '~을 믿다, 기대하다, 가지고 있다'는 뜻입니다."
    },
    {
        "문장": "Me preocupo ( ) ti.",
        "정답": "por",
        "오답": "a,de,en,con",
        "번역": "나는 너*를* 걱정한다.",
        "유형": "cause",
        "해설": "'Preocuparse por'는 '~에 대해 걱정하다'는 뜻입니다."
    },
    {
        "문장": "Se dedica ( ) la música.",
        "정답": "a",
        "오답": "de,en,por,con",
        "번역": "그는 음악*에* 종사한다 (전념한다).",
        "유형": "method",
        "해설": "'Dedicarse a'는 '~에 종사하다, 헌신하다'는 뜻입니다."
    },
    {
        "문장": "Me niego ( ) ir.",
        "정답": "a",
        "오답": "de,en,por,con",
        "번역": "나는 가는 것을 *거부한다*.",
        "유형": "manner",
        "해설": "'Negarse a'는 '~하는 것을 거절하다'는 뜻입니다."
    },
    {
        "문장": "Insistió ( ) pagar.",
        "정답": "en",
        "오답": "a,de,por,con",
        "번역": "그는 계산하겠다*고* 고집했다.",
        "유형": "manner",
        "해설": "'Insistir en'은 '~을 고집하다, 주장하다'는 뜻입니다."
    },
    {
        "문장": "Tardó una hora ( ) llegar.",
        "정답": "en",
        "오답": "a,de,por,con",
        "번역": "그는 도착하는 *데* 한 시간이 걸렸다.",
        "유형": "time_duration",
        "해설": "'Tardar en'은 '~하는 데 시간이 걸리다'는 뜻입니다."
    },
    {
        "문장": "Me fijé ( ) ese detalle.",
        "정답": "en",
        "오답": "a,de,por,con",
        "번역": "나는 그 세부사항*에* 주목했다.",
        "유형": "topic",
        "해설": "'Fijarse en'은 '~에 주목하다, 주의를 기울이다'는 뜻입니다."
    },
    {
        "문장": "La botella está llena ( ) agua.",
        "정답": "de",
        "오답": "a,en,por,con",
        "번역": "병은 물*로* 가득 차 있다.",
        "유형": "material",
        "해설": "'Lleno de'는 '~로 가득 찬'이라는 뜻입니다."
    },
    {
        "문장": "Es difícil ( ) entender.",
        "정답": "de",
        "오답": "a,en,por,con",
        "번역": "그것은 이해하기*에* 어렵다.",
        "유형": "manner",
        "해설": "'Difícil de' + 동사원형은 '~하기 어려운'이라는 뜻입니다."
    },
    {
        "문장": "Es fácil ( ) hacer.",
        "정답": "de",
        "오답": "a,en,por,con",
        "번역": "그것은 하기*에* 쉽다.",
        "유형": "manner",
        "해설": "'Fácil de' + 동사원형은 '~하기 쉬운'이라는 뜻입니다."
    },
    {
        "문장": "Está dispuesto ( ) ayudar.",
        "정답": "a",
        "오답": "de,en,por,con",
        "번역": "그는 도울 *준비가* 되어 있다 (의향이 있다).",
        "유형": "manner",
        "해설": "'Estar dispuesto a'는 '~할 용의가 있다'는 뜻입니다."
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
