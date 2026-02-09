
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

# Manual Data 391-420
manual_data = [
    {
        "문장": "( ) saber la hora.",
        "단어원형": "querer, 원하다",
        "정답": "Quisiera",
        "번역": "시간을 알고 [싶습니다] (원합니다).",
        "시제및단서": "[접속법 과거] 정중한 표현입니다."
    },
    {
        "문장": "¿Dónde has ( ) las llaves?",
        "단어원형": "poner, 놓다/두다",
        "정답": "puesto",
        "번역": "열쇠를 어디에 [두었니]?",
        "시제및단서": "[현재완료] 'has' 뒤에 오는 과거분사입니다."
    },
    {
        "문장": "Ayer no ( ) qué hacer.",
        "단어원형": "saber, 알다",
        "정답": "supe",
        "번역": "어제 나는 무엇을 해야 할지 [몰랐다] (알지 못했다 - 순간적).",
        "시제및단서": "[점과거] 어제 특정 순간의 무지/당황을 나타냅니다. (보통 no sabía를 쓰지만 supe는 그 순간 깨달음/모름의 발생)",
    },
    {
        "문장": "Antes ( ) a menudo al cine.",
        "단어원형": "ir, 가다",
        "정답": "iba",
        "번역": "예전에 나는 자주 영화관에 [가곤 했다].",
        "시제및단서": "[불완전과거] 과거의 습관입니다."
    },
    {
        "문장": "Es probable que ( ) mañana.",
        "단어원형": "llover, 비오다",
        "정답": "llueva",
        "번역": "내일 비가 [올] 것 같다.",
        "시제및단서": "[접속법 현재] 가능성 표현입니다."
    },
    {
        "문장": "Si ( ) dinero, viajaría.",
        "단어원형": "tener, 가지다",
        "정답": "tuviera",
        "번역": "돈이 [있다면], 여행할 텐데.",
        "시제및단서": "[접속법 과거] 가정법 과거입니다."
    },
    {
        "문장": "Mañana ( ) a trabajar.",
        "단어원형": "empezar, 시작하다",
        "정답": "empezaré",
        "번역": "내일 나는 일을 [시작할 것이다].",
        "시제및단서": "[미래] 내일의 계획입니다."
    },
    {
        "문장": "Cuando ( ) a casa, descansa.",
        "단어원형": "llegar, 도착하다",
        "정답": "llegues",
        "번역": "집에 [도착하면], 쉬어라.",
        "시제및단서": "[접속법 현재] 미래 시점입니다."
    },
    {
        "문장": "Ayer ( ) un accidente.",
        "단어원형": "haber, 있다(발생하다)",
        "정답": "hubo",
        "번역": "어제 사고가 [있었다].",
        "시제및단서": "[점과거] 어제 발생한 사건입니다."
    },
    {
        "문장": "Es necesario que ( ) la verdad.",
        "단어원형": "decir, 말하다",
        "정답": "digas",
        "번역": "네가 진실을 [말하는] 것이 필요하다.",
        "시제및단서": "[접속법 현재] 필요성 표현입니다."
    },
    {
        "문장": "Anoche, ( ) una pizza.",
        "단어원형": "pedir, 주문하다",
        "정답": "pedí",
        "번역": "어젯밤 나는 피자를 [주문했다].",
        "시제및단서": "[점과거] 어젯밤 완료된 행위입니다."
    },
    {
        "문장": "Si ( ) tiempo, lo haría.",
        "단어원형": "tener, 가지다",
        "정답": "tuviera",
        "번역": "시간이 [있다면], 그것을 할 텐데.",
        "시제및단서": "[접속법 과거] 가정법 과거입니다."
    },
    {
        "문장": "¡( ) cuidado!",
        "단어원형": "tener, 가지다",
        "정답": "Ten",
        "번역": "조심[해]!",
        "시제및단서": "[명령법] 긍정 명령형입니다."
    },
    {
        "문장": "Dudo que ( ) verdad.",
        "단어원형": "ser, 이다",
        "정답": "sea",
        "번역": "그것이 사실[인지] 의심스럽다.",
        "시제및단서": "[접속법 현재] 의심 표현입니다."
    },
    {
        "문장": "El año pasado, ( ) un coche.",
        "단어원형": "comprar, 사다",
        "정답": "compré",
        "번역": "작년에 나는 차를 [샀다].",
        "시제및단서": "[점과거] 작년의 구매 행위입니다."
    },
    {
        "문장": "Cuando era niño, ( ) mucho.",
        "단어원형": "jugar, 놀다",
        "정답": "jugaba",
        "번역": "어렸을 때, 나는 많이 [놀곤 했다].",
        "시제및단서": "[불완전과거] 과거의 습관입니다."
    },
    {
        "문장": "¡( ) aquí!",
        "단어원형": "venir, 오다",
        "정답": "Ven",
        "번역": "이리 [와]!",
        "시제및단서": "[명령법] 긍정 명령형입니다."
    },
    {
        "문장": "Me molesta que ( ) tarde.",
        "단어원형": "llegar, 도착하다",
        "정답": "llegues",
        "번역": "네가 늦게 [도착하는] 것이 짜증난다.",
        "시제및단서": "[접속법 현재] 감정 유발 원인입니다."
    },
    {
        "문장": "El mes pasado, ( ) un libro.",
        "단어원형": "escribir, 쓰다",
        "정답": "escribí",
        "번역": "지난달에 나는 책을 한 권 [썼다].",
        "시제및단서": "[점과거] 지난달 완료된 행위입니다."
    },
    {
        "문장": "Si ( ) sol, iremos a la playa.",
        "단어원형": "hacer, 하다(날씨)",
        "정답": "hace",
        "번역": "해가 [나면], 해변에 갈 것이다.",
        "시제및단서": "[현재] 실현 가능한 조건입니다."
    },
    {
        "문장": "Mañana ( ) a Madrid.",
        "단어원형": "viajar, 여행하다",
        "정답": "viajaré",
        "번역": "내일 나는 마드리드로 [여행할 것이다].",
        "시제및단서": "[미래] 내일의 계획입니다."
    },
    {
        "문장": "Es importante que ( ) las manos.",
        "단어원형": "lavarse, 씻다",
        "정답": "te laves",
        "번역": "네가 손을 [씻는] 것이 중요하다.",
        "시제및단서": "[접속법 현재] 중요성 표현입니다."
    },
    {
        "문장": "Ayer ( ) con Juan.",
        "단어원형": "hablar, 말하다",
        "정답": "hablé",
        "번역": "어제 나는 후안과 [말했다] (통화했다).",
        "시제및단서": "[점과거] 어제 완료된 대화입니다."
    },
    {
        "문장": "Si ( ) rico, no trabajaría.",
        "단어원형": "ser, 이다",
        "정답": "fuera",
        "번역": "내가 부자[라면], 일하지 않을 텐데.",
        "시제및단서": "[접속법 과거] 불가능한 가정입니다."
    },
    {
        "문장": "Ojalá ( ) venir.",
        "단어원형": "poder, 할수있다",
        "정답": "puedas",
        "번역": "네가 올 수 [있기를] 바란다.",
        "시제및단서": "[접속법 현재] 소망 표현입니다."
    },
    {
        "문장": "El año que viene, ( ) español.",
        "단어원형": "estudiar, 공부하다",
        "정답": "estudiaré",
        "번역": "내년에 나는 스페인어를 [공부할 것이다].",
        "시제및단서": "[미래] 내년의 계획입니다."
    },
    {
        "문장": "Anoche ( ) muy bien.",
        "단어원형": "dormir, 자다",
        "정답": "dormí",
        "번역": "어젯밤 나는 아주 잘 [잤다].",
        "시제및단서": "[점과거] 어젯밤 완료된 수면입니다."
    },
    {
        "문장": "Cuando ( ) a casa, avísame.",
        "단어원형": "volver, 돌아오다",
        "정답": "vuelvas",
        "번역": "집에 [돌아오면], 내게 알려줘.",
        "시제및단서": "[접속법 현재] 미래 시점입니다."
    },
    {
        "문장": "Ayer se ( ) el coche.",
        "단어원형": "averiar, 고장나다",
        "정답": "averió",
        "번역": "어제 차가 [고장 났다].",
        "시제및단서": "[점과거] 어제 발생한 사건입니다."
    },
    {
        "문장": "Es probable que ( ) tarde.",
        "단어원형": "llegar, 도착하다",
        "정답": "lleguen",
        "번역": "그들이 늦게 [도착할] 것 같다.",
        "시제및단서": "[접속법 현재] 가능성 표현입니다."
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
