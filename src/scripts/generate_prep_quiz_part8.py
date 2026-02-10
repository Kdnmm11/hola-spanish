
import csv

# Manual Preposition Quiz Data 211-240
quiz_data = [
    {
        "문장": "Me encargo ( ) la limpieza.",
        "정답": "de",
        "오답": "a,en,por,con",
        "번역": "나는 청소*를* 담당한다.",
        "유형": "method",
        "해설": "'Encargarse de'는 '~을 담당하다, 맡다'는 뜻입니다."
    },
    {
        "문장": "Se despidió ( ) nosotros.",
        "정답": "de",
        "오답": "a,en,por,con",
        "번역": "그는 우리*와* 작별 인사를 했다.",
        "유형": "company",
        "해설": "'Despedirse de'는 '~와 작별하다'는 뜻입니다."
    },
    {
        "문장": "Disfruta ( ) la vida.",
        "정답": "de",
        "오답": "a,en,por,con",
        "번역": "인생*을* 즐겨라.",
        "유형": "topic",
        "해설": "'Disfrutar de'는 '~을 즐기다'는 뜻입니다."
    },
    {
        "문장": "Me acuerdo ( ) ti.",
        "정답": "de",
        "오답": "a,en,por,con",
        "번역": "나는 너*를* 기억한다.",
        "유형": "topic",
        "해설": "'Acordarse de'는 '~을 기억하다'는 뜻입니다."
    },
    {
        "문장": "Duda ( ) todo.",
        "정답": "de",
        "오답": "a,en,por,con",
        "번역": "그는 모든 것*을* 의심한다.",
        "유형": "topic",
        "해설": "'Dudar de'는 '~을 의심하다'는 뜻입니다."
    },
    {
        "문장": "Se trata ( ) un error.",
        "정답": "de",
        "오답": "a,en,por,con",
        "번역": "그것은 실수*에 관한* 것이다 (실수이다).",
        "유형": "topic",
        "해설": "'Tratarse de'는 '~에 관한 것이다, ~이다'라는 뜻입니다."
    },
    {
        "문장": "Me fié ( ) él.",
        "정답": "de",
        "오답": "a,en,por,con",
        "번역": "나는 그*를* 신뢰했다.",
        "유형": "topic",
        "해설": "'Fiarse de'는 '~를 믿다, 신뢰하다'는 뜻입니다."
    },
    {
        "문장": "Se burlaron ( ) su ropa.",
        "정답": "de",
        "오답": "a,en,por,con",
        "번역": "그들은 그의 옷*을* 놀렸다.",
        "유형": "cause",
        "해설": "'Burlarse de'는 '~을 조롱하다, 놀리다'는 뜻입니다."
    },
    {
        "문장": "Me cansé ( ) esperar.",
        "정답": "de",
        "오답": "a,en,por,con",
        "번역": "나는 기다리는 것*에* 지쳤다.",
        "유형": "cause",
        "해설": "'Cansarse de'는 '~에 지치다, 싫증나다'는 뜻입니다."
    },
    {
        "문장": "Se alejó ( ) la ciudad.",
        "정답": "de",
        "오답": "a,en,por,con",
        "번역": "그는 도시*에서* 멀어졌다.",
        "유형": "loc_origin",
        "해설": "'Alejarse de'는 '~에서 멀어지다'는 뜻입니다."
    },
    {
        "문장": "Me acerqué ( ) la ventana.",
        "정답": "a",
        "오답": "de,en,por,con",
        "번역": "나는 창문*에* 다가갔다.",
        "유형": "loc_direction",
        "해설": "'Acercarse a'는 '~에 다가가다, 접근하다'는 뜻입니다."
    },
    {
        "문장": "Se enfrentó ( ) los problemas.",
        "정답": "a",
        "오답": "de,en,por,con",
        "번역": "그는 문제*에* 맞섰다 (직면했다).",
        "유형": "topic",
        "해설": "'Enfrentarse a'는 '~에 맞서다, 직면하다'는 뜻입니다."
    },
    {
        "문장": "Se acostumbró ( ) la comida picante.",
        "정답": "a",
        "오답": "de,en,por,con",
        "번역": "그는 매운 음식*에* 익숙해졌다.",
        "유형": "manner",
        "해설": "'Acostumbrarse a'는 '~에 익숙해지다'는 뜻입니다."
    },
    {
        "문장": "Renunció ( ) su trabajo.",
        "정답": "a",
        "오답": "de,en,por,con",
        "번역": "그는 직장*을* 그만두었다 (포기했다).",
        "유형": "topic",
        "해설": "'Renunciar a'는 '~을 포기하다, 그만두다'는 뜻입니다."
    },
    {
        "문장": "Me obligaron ( ) hacerlo.",
        "정답": "a",
        "오답": "de,en,por,con",
        "번역": "그들은 내가 그것을 하도*록* 강요했다.",
        "유형": "cause",
        "해설": "'Obligar a'는 '~하도록 강요하다'는 뜻입니다."
    },
    {
        "문장": "Ayudé ( ) mi hermano.",
        "정답": "a",
        "오답": "de,en,por,con",
        "번역": "나는 내 동생*을* 도왔다.",
        "유형": "company",
        "해설": "'Ayudar a' + 사람/동사원형은 '~를 돕다'는 뜻입니다."
    },
    {
        "문장": "Comenzó ( ) gritar.",
        "정답": "a",
        "오답": "de,en,por,con",
        "번역": "그는 소리 지르기 *시작했다*.",
        "유형": "time_point",
        "해설": "'Comenzar a'는 '~하기 시작하다'는 뜻입니다."
    },
    {
        "문장": "Me enseñó ( ) nadar.",
        "정답": "a",
        "오답": "de,en,por,con",
        "번역": "그는 나에게 수영하는 법*을* 가르쳤다.",
        "유형": "purpose",
        "해설": "'Enseñar a'는 '~하는 법을 가르치다'는 뜻입니다."
    },
    {
        "문장": "Aprendí ( ) conducir.",
        "정답": "a",
        "오답": "de,en,por,con",
        "번역": "나는 운전하는 법*을* 배웠다.",
        "유형": "purpose",
        "해설": "'Aprender a'는 '~하는 법을 배우다'는 뜻입니다."
    },
    {
        "문장": "Me invitaron ( ) cenar.",
        "정답": "a",
        "오답": "de,en,por,con",
        "번역": "그들은 나를 저녁 식사*에* 초대했다.",
        "유형": "purpose",
        "해설": "'Invitar a'는 '~에 초대하다'는 뜻입니다."
    },
    {
        "문장": "Se atrevió ( ) saltar.",
        "정답": "a",
        "오답": "de,en,por,con",
        "번역": "그는 감히 뛰어내*렸다* (뛰어내릴 용기를 냈다).",
        "유형": "manner",
        "해설": "'Atreverse a'는 '감히 ~하다, 용기 내어 ~하다'는 뜻입니다."
    },
    {
        "문장": "Me decidí ( ) comprarlo.",
        "정답": "a",
        "오답": "de,en,por,con",
        "번역": "나는 그것을 사기*로* 결심했다.",
        "유형": "manner",
        "해설": "'Decidirse a'는 '~하기로 결심하다'는 뜻입니다."
    },
    {
        "문장": "Se puso ( ) llorar.",
        "정답": "a",
        "오답": "de,en,por,con",
        "번역": "그는 울기 *시작했다*.",
        "유형": "time_point",
        "해설": "'Ponerse a'는 '~하기 시작하다'는 뜻입니다."
    },
    {
        "문장": "Huele ( ) café.",
        "정답": "a",
        "오답": "de,en,por,con",
        "번역": "커피 *향이* 난다.",
        "유형": "manner",
        "해설": "'Oler a'는 '~냄새가 나다'는 뜻입니다."
    },
    {
        "문장": "Sabe ( ) chocolate.",
        "정답": "a",
        "오답": "de,en,por,con",
        "번역": "초콜릿 *맛이* 난다.",
        "유형": "manner",
        "해설": "'Saber a'는 '~맛이 나다'는 뜻입니다."
    },
    {
        "문장": "Suena ( ) música clásica.",
        "정답": "a",
        "오답": "de,en,por,con",
        "번역": "클래식 음악*처럼* 들린다.",
        "유형": "manner",
        "해설": "'Sonar a'는 '~처럼 들리다, ~소리가 나다'는 뜻입니다."
    },
    {
        "문장": "Juegan ( ) las cartas.",
        "정답": "a",
        "오답": "de,en,por,con",
        "번역": "그들은 카드 놀이*를* 한다.",
        "유형": "method",
        "해설": "'Jugar a' + 게임/스포츠는 '~을 하다'는 뜻입니다."
    },
    {
        "문장": "Llamé ( ) la puerta.",
        "정답": "a",
        "오답": "de,en,por,con",
        "번역": "나는 문*을* 두드렸다 (노크했다).",
        "유형": "method",
        "해설": "'Llamar a la puerta'는 '문을 두드리다, 노크하다'는 뜻입니다."
    },
    {
        "문장": "Voy ( ) caballo.",
        "정답": "a",
        "오답": "en,de,por,con",
        "번역": "나는 말*을 타고* 간다.",
        "유형": "method",
        "해설": "말을 타다는 예외적으로 'a caballo'를 씁니다. (en caballo 아님)"
    },
    {
        "문장": "Estoy ( ) tu lado.",
        "정답": "a",
        "오답": "en,de,por,con",
        "번역": "나는 네 *편*이다 (네 옆에 있다).",
        "유형": "loc_position",
        "해설": "'Estar a tu lado'는 '네 곁에 있다, 네 편이다'는 뜻입니다."
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
