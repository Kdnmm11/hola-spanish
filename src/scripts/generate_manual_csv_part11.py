
import csv

def get_all_conjugations(verb):
    stem = verb[:-2]
    ending = verb[-2:]
    forms = []
    patterns = {
        'ar': {'pres': ['o','as','a','amos','áis','an'], 'imp': ['aba','abas','aba','ábamos','abais','aban'], 'pret': ['é','aste','ó','amos','asteis','aron'], 'fut': ['aré','arás','ará','aremos','aréis','arán'], 'cond': ['aría','arías','aría','aríamos','aríais','arían'], 'sub_pres': ['e','es','e','emos','éis','en']},
        'er': {'pres': ['o','es','e','emos','éis','en'], 'imp': ['ía','ías','ía','íamos','íais','ían'], 'pret': ['í','iste','ió','imos','isteis','ieron'], 'fut': ['eré','erás','erá','eremos','eréis','erán'], 'cond': ['ería','erías','ería','eríamos','eríais','erían'], 'sub_pres': ['a','as','a','amos','áis','an']},
        'ir': {'pres': ['o','es','e','imos','ís','en'], 'imp': ['ía','ías','ía','íamos','íais','ían'], 'pret': ['í','iste','ió','imos','isteis','ieron'], 'fut': ['iré','irás','irá','iremos','iréis','irán'], 'cond': ['iría','irías','iría','iríamos','iríais','irían'], 'sub_pres': ['a','as','a','amos','áis','an']}
    }
    if ending not in patterns: return []
    for tense, suffixes in patterns[ending].items():
        for s in suffixes: forms.append(stem + s)
    return list(set(forms))

# Manual Data 301-330
manual_data = [
    {
        "문장": "Cuando vivía en el campo, ( ) todos los días.",
        "단어원형": "conducir, 운전하다",
        "정답": "conducía",
        "번역": "시골에 살았을 때, 나는 매일 [운전했다].",
        "시제및단서": "[불완전과거] 과거의 반복적인 행동(습관)입니다."
    },
    {
        "문장": "Mañana te ( ) el libro que me pediste.",
        "단어원형": "traer, 가져오다",
        "정답": "traeré",
        "번역": "내일 네가 요청한 책을 [가져올게].",
        "시제및단서": "[미래] 'Mañana'(내일)의 계획입니다."
    },
    {
        "문장": "¿Dónde has ( ) las llaves?",
        "단어원형": "poner, 놓다/두다",
        "정답": "puesto",
        "번역": "열쇠를 어디에 [두었니]?",
        "시제및단서": "[현재완료] 'has'(조동사) 뒤에 오는 과거분사(불규칙)입니다."
    },
    {
        "문장": "¡( ) de mi habitación ahora mismo!",
        "단어원형": "salir, 나가다",
        "정답": "Sal",
        "번역": "지금 당장 내 방에서 [나가]!",
        "시제및단서": "[명령법] 긍정 명령형(tú)입니다."
    },
    {
        "문장": "Es posible que ( ) un error.",
        "단어원형": "haber, 있다",
        "정답": "haya",
        "번역": "오류가 [있을] 가능성이 있다.",
        "시제및단서": "[접속법 현재] 가능성(Es posible que) 표현입니다."
    },
    {
        "문장": "Ayer ( ) la mesa para cenar.",
        "단어원형": "poner, 놓다/차리다(상)",
        "정답": "puse",
        "번역": "어제 나는 저녁 식사를 위해 상을 [차렸다].",
        "시제및단서": "[점과거] 어제 완료된 행위입니다."
    },
    {
        "문장": "Si ( ) más, ganarías el concurso.",
        "단어원형": "entrenar, 훈련하다",
        "정답": "entrenaras",
        "번역": "네가 더 [훈련한다면], 대회에서 우승할 텐데.",
        "시제및단서": "[접속법 과거] 현재 훈련 부족을 가정하는 조건절입니다."
    },
    {
        "문장": "El año pasado, ( ) a mi mejor amigo.",
        "단어원형": "conocer, 알다/만나다",
        "정답": "conocí",
        "번역": "작년에 나는 내 절친을 [만났다] (알게 되었다).",
        "시제및단서": "[점과거] 작년에 발생한 만남입니다."
    },
    {
        "문장": "No creo que ella ( ) venir.",
        "단어원형": "querer, 원하다",
        "정답": "quiera",
        "번역": "그녀가 오고 [싶어 한다고] 생각하지 않는다.",
        "시제및단서": "[접속법 현재] 의심/부정 표현입니다."
    },
    {
        "문장": "Mañana ( ) sol en todo el país.",
        "단어원형": "hacer, 하다(날씨)",
        "정답": "hará",
        "번역": "내일은 전국적으로 해가 [날 것이다].",
        "시제및단서": "[미래] 내일 날씨 예보입니다."
    },
    {
        "문장": "Cuando ( ) mayor, viajaré por el mundo.",
        "단어원형": "ser, 이다",
        "정답": "sea",
        "번역": "어른이 [되면] (미래), 나는 세계 여행을 할 것이다.",
        "시제및단서": "[접속법 현재] 미래 시점의 시간 부사절입니다."
    },
    {
        "문장": "Ayer no ( ) nada en la tele.",
        "단어원형": "ver, 보다",
        "정답": "vi",
        "번역": "어제 나는 TV에서 아무것도 [보지 않았다].",
        "시제및단서": "[점과거] 어제 완료된 행위입니다."
    },
    {
        "문장": "Es importante que ( ) la verdad.",
        "단어원형": "saber, 알다",
        "정답": "sepas",
        "번역": "네가 진실을 [아는] 것이 중요하다.",
        "시제및단서": "[접속법 현재] 중요성 표현입니다."
    },
    {
        "문장": "Anoche, mis padres ( ) muy tarde.",
        "단어원형": "llegar, 도착하다",
        "정답": "llegaron",
        "번역": "어젯밤 부모님은 매우 늦게 [도착하셨다].",
        "시제및단서": "[점과거] 어젯밤 완료된 사건입니다."
    },
    {
        "문장": "Si tuviera tiempo, ( ) aprender francés.",
        "단어원형": "intentar, 시도하다",
        "정답": "intentaría",
        "번역": "시간이 있다면, 프랑스어 배우기를 [시도할 텐데].",
        "시제및단서": "[조건법] 가정법 과거의 결과입니다."
    },
    {
        "문장": "¡( ) cuidado con el coche!",
        "단어원형": "tener, 가지다",
        "정답": "Ten",
        "번역": "차 조심[해]!",
        "시제및단서": "[명령법] 긍정 명령형입니다."
    },
    {
        "문장": "Hace dos años, ( ) mi carrera.",
        "단어원형": "terminar, 끝내다/마치다",
        "정답": "terminé",
        "번역": "2년 전에 나는 학업을 [마쳤다].",
        "시제및단서": "[점과거] 2년 전 완료된 사건입니다."
    },
    {
        "문장": "Dudo que ( ) verdad lo que dices.",
        "단어원형": "ser, 이다",
        "정답": "sea",
        "번역": "네가 말하는 것이 사실[인지] 의심스럽다.",
        "시제및단서": "[접속법 현재] 의심 표현입니다."
    },
    {
        "문장": "Siempre ( ) café por la mañana.",
        "단어원형": "beber, 마시다",
        "정답": "bebo",
        "번역": "나는 아침마다 항상 커피를 [마신다].",
        "시제및단서": "[현재] 반복되는 습관입니다."
    },
    {
        "문장": "Ojalá ( ) venir mañana.",
        "단어원형": "poder, 할수있다",
        "정답": "puedas",
        "번역": "네가 내일 올 수 [있기를] 바란다.",
        "시제및단서": "[접속법 현재] 실현 가능한 소망입니다."
    },
    {
        "문장": "El año pasado, ( ) mucho dinero.",
        "단어원형": "ahorrar, 저축하다",
        "정답": "ahorré",
        "번역": "작년에 나는 돈을 많이 [저축했다].",
        "시제및단서": "[점과거] 작년에 완료된 행위입니다."
    },
    {
        "문장": "Cuando ( ) a casa, avísame.",
        "단어원형": "volver, 돌아오다",
        "정답": "vuelvas",
        "번역": "집에 [돌아오면], 내게 알려줘.",
        "시제및단서": "[접속법 현재] 미래 시점입니다."
    },
    {
        "문장": "Ayer ( ) un regalo para ti.",
        "단어원형": "comprar, 사다",
        "정답": "compré",
        "번역": "어제 나는 너를 위해 선물을 [샀다].",
        "시제및단서": "[점과거] 어제 완료된 구매입니다."
    },
    {
        "문장": "Si ( ) rico, no trabajaría.",
        "단어원형": "ser, 이다",
        "정답": "fuera",
        "번역": "내가 부자[라면], 일하지 않을 텐데.",
        "시제및단서": "[접속법 과거] 현재 불가능한 가정입니다."
    },
    {
        "문장": "Mañana ( ) a cenar con mis amigos.",
        "단어원형": "salir, 나가다/외출하다",
        "정답": "saldré",
        "번역": "내일 나는 친구들과 저녁 먹으러 [나갈 것이다].",
        "시제및단서": "[미래] 내일의 계획입니다."
    },
    {
        "문장": "Me ( ) mucho este lugar.",
        "단어원형": "gustar, 좋아하다",
        "정답": "gusta",
        "번역": "나는 이 장소를 많이 [좋아한다].",
        "시제및단서": "[현재] 현재의 기호입니다."
    },
    {
        "문장": "Es necesario que ( ) ahora mismo.",
        "단어원형": "salir, 나가다/떠나다",
        "정답": "salgamos",
        "번역": "우리가 지금 당장 [떠나는] 것이 필요하다.",
        "시제및단서": "[접속법 현재] 필요성 표현입니다."
    },
    {
        "문장": "Ayer se ( ) el ordenador.",
        "단어원형": "romper, 고장나다/부서지다",
        "정답": "rompió",
        "번역": "어제 컴퓨터가 [고장 났다].",
        "시제및단서": "[점과거] 어제 발생한 사건입니다."
    },
    {
        "문장": "Es probable que ( ) tarde.",
        "단어원형": "llegar, 도착하다",
        "정답": "lleguen",
        "번역": "그들이 늦게 [도착할] 것 같다.",
        "시제및단서": "[접속법 현재] 가능성 표현입니다."
    },
    {
        "문장": "El mes pasado, ( ) una carta.",
        "단어원형": "escribir, 쓰다",
        "정답": "escribí",
        "번역": "지난달에 나는 편지를 한 통 [썼다].",
        "시제및단서": "[점과거] 지난달 완료된 행위입니다."
    }
]

rows = []
for item in manual_data:
    verb = item['단어원형'].split(',')[0].strip()
    distractors = get_all_conjugations(verb)
    if item['정답'] in distractors: distractors.remove(item['정답'])
    
    rows.append({
        '문장 (빈칸 포함)': item['문장'],
        '동사 기본형': item['단어원형'],
        '정답': item['정답'],
        '번역': item['번역'],
        '오답보기': ','.join(distractors),
        '설명': item['시제및단서'],
        '시제': item['시제및단서'].split(']')[0].replace('[', '')
    })

output_path = 'src/data/conjugation_dataset_v2.csv'
headers = ['시제', '문장 (빈칸 포함)', '동사 기본형', '정답', '번역', '설명', '오답보기']

with open(output_path, 'a', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=headers)
    writer.writerows(rows)

print(f"Appended {len(rows)} rows to {output_path}")
