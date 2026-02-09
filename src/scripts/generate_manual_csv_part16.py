
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

# Manual Data 451-480
manual_data = [
    {
        "문장": "Antes no ( ) dinero.",
        "단어원형": "tener, 가지다",
        "정답": "tenía",
        "번역": "예전에는 돈이 [없었다] (가지지 않았다).",
        "시제및단서": "[불완전과거] 과거의 지속적인 결핍 상태입니다."
    },
    {
        "문장": "¡( ) la mesa, por favor!",
        "단어원형": "poner, 놓다/차리다",
        "정답": "Pon",
        "번역": "상 좀 [차려] 줘!",
        "시제및단서": "[명령법] 긍정 명령형(tú)입니다."
    },
    {
        "문장": "¿A qué hora ( ) el tren?",
        "단어원형": "salir, 나가다/출발하다",
        "정답": "sale",
        "번역": "기차는 몇 시에 [출발하니]?",
        "시제및단서": "[현재] 정해진 스케줄(시간표)은 현재 시제로 표현합니다."
    },
    {
        "문장": "Nunca ( ) la verdad.",
        "단어원형": "saber, 알다",
        "정답": "supe",
        "번역": "나는 결코 진실을 [알지 못했다].",
        "시제및단서": "[점과거] 과거 특정 시점에 알지 못했던 사실(완료)을 나타냅니다. (맥락에 따라 'nunca lo he sabido'도 가능하지만 여기선 점과거 예시)",
    },
    {
        "문장": "Si ( ) más alto, jugaría al baloncesto.",
        "단어원형": "ser, 이다",
        "정답": "fuera",
        "번역": "내가 키가 더 크[다면], 농구를 할 텐데.",
        "시제및단서": "[접속법 과거] 현재 키가 작다는 사실의 반대 가정입니다."
    },
    {
        "문장": "Mañana ( ) a mi hermana.",
        "단어원형": "ver, 보다/만나다",
        "정답": "veré",
        "번역": "내일 나는 내 여동생을 [볼 것이다].",
        "시제및단서": "[미래] 내일의 계획입니다."
    },
    {
        "문장": "Cuando ( ) a casa, llámame.",
        "단어원형": "llegar, 도착하다",
        "정답": "llegues",
        "번역": "집에 [도착하면], 전화해.",
        "시제및단서": "[접속법 현재] 미래 시점입니다."
    },
    {
        "문장": "Ayer ( ) mucho.",
        "단어원형": "correr, 달리다",
        "정답": "corrí",
        "번역": "어제 나는 많이 [달렸다].",
        "시제및단서": "[점과거] 어제 완료된 운동입니다."
    },
    {
        "문장": "Es probable que ( ) tarde.",
        "단어원형": "llegar, 도착하다",
        "정답": "llegue",
        "번역": "그가 늦게 [도착할] 것 같다.",
        "시제및단서": "[접속법 현재] 가능성 표현입니다."
    },
    {
        "문장": "El mes pasado, ( ) un coche.",
        "단어원형": "alquilar, 빌리다",
        "정답": "alquilé",
        "번역": "지난달에 나는 차를 [빌렸다].",
        "시제및단서": "[점과거] 지난달 완료된 행위입니다."
    },
    {
        "문장": "Si ( ) tiempo, iría.",
        "단어원형": "tener, 가지다",
        "정답": "tuviera",
        "번역": "시간이 [있다면], 갈 텐데.",
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
        "문장": "Anoche ( ) muy mal.",
        "단어원형": "dormir, 자다",
        "정답": "dormí",
        "번역": "어젯밤 나는 잠을 아주 못 [잤다].",
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
        "문장": "Ayer se ( ) la luz.",
        "단어원형": "ir, 가다/나가다",
        "정답": "fue",
        "번역": "어제 전기가 [나갔다].",
        "시제및단서": "[점과거] 어제 발생한 사건입니다."
    },
    {
        "문장": "Es importante que ( ) las manos.",
        "단어원형": "lavarse, 씻다",
        "정답": "te laves",
        "번역": "네가 손을 [씻는] 것이 중요하다.",
        "시제및단서": "[접속법 현재] 중요성 표현입니다."
    },
    {
        "문장": "El año pasado, ( ) mucho.",
        "단어원형": "trabajar, 일하다",
        "정답": "trabajé",
        "번역": "작년에 나는 일을 많이 [했다].",
        "시제및단서": "[점과거] 작년에 완료된 행위입니다."
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
        "단어원형": "leer, 읽다",
        "정답": "leí",
        "번역": "지난달에 나는 책을 한 권 [읽었다].",
        "시제및단서": "[점과거] 지난달 완료된 행위입니다."
    },
    {
        "문장": "Si ( ) rico, viajaría.",
        "단어원형": "ser, 이다",
        "정답": "fuera",
        "번역": "내가 부자[라면], 여행할 텐데.",
        "시제및단서": "[접속법 과거] 가정법 과거입니다."
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
        "단어원형": "aprender, 배우다",
        "정답": "aprenderé",
        "번역": "내년에 나는 스페인어를 [배울 것이다].",
        "시제및단서": "[미래] 내년의 계획입니다."
    },
    {
        "문장": "Anoche ( ) muy bien.",
        "단어원형": "cenar, 저녁식사하다",
        "정답": "cené",
        "번역": "어젯밤 나는 저녁을 아주 잘 [먹었다].",
        "시제및단서": "[점과거] 어젯밤 완료된 식사입니다."
    },
    {
        "문장": "Cuando ( ) a casa, avísame.",
        "단어원형": "llegar, 도착하다",
        "정답": "llegues",
        "번역": "집에 [도착하면], 내게 알려줘.",
        "시제및단서": "[접속법 현재] 미래 시점입니다."
    },
    {
        "문장": "Ayer se ( ) el coche.",
        "단어원형": "estropear, 고장나다",
        "정답": "estropeó",
        "번역": "어제 차가 [고장 났다].",
        "시제및단서": "[점과거] 어제 발생한 사건입니다."
    },
    {
        "문장": "Es probable que ( ) tarde.",
        "단어원형": "venir, 오다",
        "정답": "vengan",
        "번역": "그들이 늦게 [올] 것 같다.",
        "시제및단서": "[접속법 현재] 가능성 표현입니다."
    },
    {
        "문장": "El mes pasado, ( ) un viaje.",
        "단어원형": "hacer, 하다",
        "정답": "hice",
        "번역": "지난달에 나는 여행을 [했다].",
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
