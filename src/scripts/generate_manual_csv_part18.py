
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

# Manual Data 511-540
manual_data = [
    {
        "문장": "De niño, ( ) tener un gato.",
        "단어원형": "querer, 원하다",
        "정답": "quería",
        "번역": "어렸을 때, 나는 고양이를 키우고(가지고) [싶었다].",
        "시제및단서": "[불완전과거] 과거의 지속적인 소망입니다."
    },
    {
        "문장": "Mañana ( ) las cosas en su sitio.",
        "단어원형": "poner, 놓다/두다",
        "정답": "pondré",
        "번역": "내일 나는 물건들을 제자리에 [둘 것이다].",
        "시제및단서": "[미래] 내일의 계획입니다."
    },
    {
        "문장": "Ayer ( ) con mis amigos.",
        "단어원형": "salir, 나가다/놀다",
        "정답": "salí",
        "번역": "어제 나는 친구들과 [놀았다] (나갔다).",
        "시제및단서": "[점과거] 어제 완료된 행위입니다."
    },
    {
        "문장": "No creo que él ( ) la verdad.",
        "단어원형": "saber, 알다",
        "정답": "sepa",
        "번역": "나는 그가 진실을 [안다고] 생각하지 않는다.",
        "시제및단서": "[접속법 현재] 의심/부정 표현입니다."
    },
    {
        "문장": "El año pasado, ( ) mi coche.",
        "단어원형": "vender, 팔다",
        "정답": "vendí",
        "번역": "작년에 나는 차를 [팔았다].",
        "시제및단서": "[점과거] 작년에 완료된 매매입니다."
    },
    {
        "문장": "Si ( ) tiempo, iría al parque.",
        "단어원형": "tener, 가지다",
        "정답": "tuviera",
        "번역": "시간이 [있다면], 공원에 갈 텐데.",
        "시제및단서": "[접속법 과거] 가정법 과거입니다."
    },
    {
        "문장": "¡( ) la puerta!",
        "단어원형": "abrir, 열다",
        "정답": "Abre",
        "번역": "문 [열어]!",
        "시제및단서": "[명령법] 긍정 명령형입니다."
    },
    {
        "문장": "Cuando ( ) a casa, llámame.",
        "단어원형": "volver, 돌아오다",
        "정답": "vuelvas",
        "번역": "집에 [돌아오면], 내게 전화해.",
        "시제및단서": "[접속법 현재] 미래 시점입니다."
    },
    {
        "문장": "Ayer se ( ) el plato.",
        "단어원형": "romper, 깨다/깨지다",
        "정답": "rompió",
        "번역": "어제 접시가 [깨졌다].",
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
        "문장": "El mes pasado, ( ) un viaje.",
        "단어원형": "hacer, 하다",
        "정답": "hice",
        "번역": "지난달에 나는 여행을 [했다].",
        "시제및단서": "[점과거] 지난달 완료된 행위입니다."
    },
    {
        "문장": "Si ( ) rico, no trabajaría.",
        "단어원형": "ser, 이다",
        "정답": "fuera",
        "번역": "내가 부자[라면], 일하지 않을 텐데.",
        "시제및단서": "[접속법 과거] 불가능한 가정입니다."
    },
    {
        "문장": "Mañana ( ) a cenar.",
        "단어원형": "salir, 나가다/외출하다",
        "정답": "saldremos",
        "번역": "내일 우리는 저녁 먹으러 [나갈 것이다].",
        "시제및단서": "[미래] 내일의 계획입니다."
    },
    {
        "문장": "Me ( ) mucho la música.",
        "단어원형": "gustar, 좋아하다",
        "정답": "gusta",
        "번역": "나는 음악을 매우 [좋아한다].",
        "시제및단서": "[현재] 현재의 기호입니다."
    },
    {
        "문장": "Es necesario que ( ) ahora.",
        "단어원형": "estudiar, 공부하다",
        "정답": "estudies",
        "번역": "네가 지금 [공부하는] 것이 필요하다.",
        "시제및단서": "[접속법 현재] 필요성 표현입니다."
    },
    {
        "문장": "Ayer no ( ) nada.",
        "단어원형": "hacer, 하다",
        "정답": "hice",
        "번역": "어제 나는 아무것도 [하지 않았다].",
        "시제및단서": "[점과거] 어제 완료된 행위입니다."
    },
    {
        "문장": "Si ( ) tiempo, te ayudaría.",
        "단어원형": "tener, 가지다",
        "정답": "tuviera",
        "번역": "시간이 [있다면], 너를 도울 텐데.",
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
        "단어원형": "descansar, 쉬다",
        "정답": "descansé",
        "번역": "어젯밤 나는 아주 잘 [쉬었다].",
        "시제및단서": "[점과거] 어젯밤 완료된 휴식입니다."
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
