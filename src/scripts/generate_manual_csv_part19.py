
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

# Manual Data 541-570
manual_data = [
    {
        "문장": "Yo ( ) la ropa en el armario.",
        "단어원형": "poner, 놓다/넣다",
        "정답": "pongo",
        "번역": "나는 옷장에 옷을 [넣는다] (놓는다).",
        "시제및단서": "[현재] 현재의 일반적인 행위입니다. (yo pongo - 불규칙)"
    },
    {
        "문장": "Antes ( ) a correr todas las mañanas.",
        "단어원형": "salir, 나가다/나오다",
        "정답": "salía",
        "번역": "예전에는 매일 아침 달리러 [나가곤 했다].",
        "시제및단서": "[불완전과거] 과거의 규칙적인 습관입니다."
    },
    {
        "문장": "¿( ) tú dónde está el baño?",
        "단어원형": "saber, 알다",
        "정답": "Sabes",
        "번역": "화장실이 어디 있는지 [아니]?",
        "시제및단서": "[현재] 현재의 지식 상태를 묻습니다."
    },
    {
        "문장": "Ayer no ( ) venir a la fiesta.",
        "단어원형": "poder, 할수있다",
        "정답": "pude",
        "번역": "어제 나는 파티에 올 수 [없었다].",
        "시제및단서": "[점과거] 어제 발생한(불가능했던) 사건입니다."
    },
    {
        "문장": "Si ( ) tiempo, te ayudaré.",
        "단어원형": "tener, 가지다",
        "정답": "tengo",
        "번역": "시간이 [있으면], 너를 도와줄게.",
        "시제및단서": "[현재] 실현 가능한 조건입니다."
    },
    {
        "문장": "Mañana ( ) a mi perro.",
        "단어원형": "bañar, 목욕시키다",
        "정답": "bañaré",
        "번역": "내일 나는 개를 [목욕시킬 것이다].",
        "시제및단서": "[미래] 내일의 계획입니다."
    },
    {
        "문장": "Cuando ( ) a casa, haz la cama.",
        "단어원형": "llegar, 도착하다",
        "정답": "llegues",
        "번역": "집에 [도착하면], 침대 정리해라.",
        "시제및단서": "[접속법 현재] 미래 시점입니다."
    },
    {
        "문장": "Ayer se ( ) el jarrón.",
        "단어원형": "caer, 떨어지다",
        "정답": "cayó",
        "번역": "어제 꽃병이 [떨어졌다].",
        "시제및단서": "[점과거] 어제 발생한 사건입니다."
    },
    {
        "문장": "Es probable que ( ) tarde.",
        "단어원형": "salir, 나가다/떠나다",
        "정답": "salgan",
        "번역": "그들이 늦게 [떠날] 것 같다.",
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
        "문장": "Si ( ) rico, te compraría una casa.",
        "단어원형": "ser, 이다",
        "정답": "fuera",
        "번역": "내가 부자[라면], 너에게 집을 사줄 텐데.",
        "시제및단서": "[접속법 과거] 불가능한 가정입니다."
    },
    {
        "문장": "Mañana ( ) a cenar.",
        "단어원형": "ir, 가다",
        "정답": "iremos",
        "번역": "내일 우리는 저녁 먹으러 [갈 것이다].",
        "시제및단서": "[미래] 내일의 계획입니다."
    },
    {
        "문장": "Me ( ) mucho la playa.",
        "단어원형": "gustar, 좋아하다",
        "정답": "gusta",
        "번역": "나는 해변을 많이 [좋아한다].",
        "시제및단서": "[현재] 기호입니다."
    },
    {
        "문장": "Es necesario que ( ) ahora.",
        "단어원형": "comer, 먹다",
        "정답": "comas",
        "번역": "네가 지금 [먹는] 것이 필요하다.",
        "시제및단서": "[접속법 현재] 필요성 표현입니다."
    },
    {
        "문장": "Ayer no ( ) nada.",
        "단어원형": "decir, 말하다",
        "정답": "dije",
        "번역": "어제 나는 아무 말도 [하지 않았다].",
        "시제및단서": "[점과거] 어제 완료된 행위입니다."
    },
    {
        "문장": "Si ( ) tiempo, leería.",
        "단어원형": "tener, 가지다",
        "정답": "tuviera",
        "번역": "시간이 [있다면], 읽을 텐데.",
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
        "문장": "Anoche ( ) muy bien.",
        "단어원형": "dormir, 자다",
        "정답": "dormí",
        "번역": "어젯밤 나는 아주 잘 [잤다].",
        "시제및단서": "[점과거] 어젯밤 완료된 수면입니다."
    },
    {
        "문장": "Cuando ( ) a casa, avísame.",
        "단어원형": "llegar, 도착하다",
        "정답": "llegues",
        "번역": "집에 [도착하면], 내게 알려줘.",
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
        "단어원형": "estudiar, 공부하다",
        "정답": "estudiaré",
        "번역": "내년에 나는 스페인어를 [공부할 것이다].",
        "시제및단서": "[미래] 내년의 계획입니다."
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
