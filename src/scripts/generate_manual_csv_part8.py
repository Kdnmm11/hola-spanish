
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

# Manual Data 211-240
manual_data = [
    {
        "문장": "No me parece que eso ( ) justo.",
        "단어원형": "ser, 이다",
        "정답": "sea",
        "번역": "나는 그것이 공평하[다고] 생각하지 않는다.",
        "시제및단서": "[접속법 현재] 'No me parece que'(부정적 의견) 뒤에는 접속법을 씁니다."
    },
    {
        "문장": "Ayer, él me ( ) perdón.",
        "단어원형": "pedir, 요청하다/구하다",
        "정답": "pidió",
        "번역": "어제 그는 나에게 용서를 [구했다] (빌었다).",
        "시제및단서": "[점과거] 어제 발생한 구체적인 행위입니다."
    },
    {
        "문장": "Nosotros ( ) estudiando español.",
        "단어원형": "seguir, 계속하다",
        "정답": "seguimos",
        "번역": "우리는 스페인어 공부를 [계속한다].",
        "시제및단서": "[현재] 현재 지속되고 있는 상태입니다. (seguir + gerundio)"
    },
    {
        "문장": "Si ( ) tiempo, iré a verte.",
        "단어원형": "tener, 가지다",
        "정답": "tengo",
        "번역": "시간이 [있으면], 너를 보러 갈게.",
        "시제및단서": "[현재] 실현 가능한 미래 조건(Si tengo...)입니다."
    },
    {
        "문장": "Ojalá ( ) ganar el partido.",
        "단어원형": "poder, 할수있다",
        "정답": "pudiéramos",
        "번역": "우리가 경기에서 이길 수 [있다면] 좋겠는데.",
        "시제및단서": "[접속법 과거] 'Ojalá' 뒤에 접속법 과거를 쓰면 실현 가능성이 낮은 소망을 나타냅니다."
    },
    {
        "문장": "El año que viene, ( ) un coche.",
        "단어원형": "comprar, 사다",
        "정답": "compraré",
        "번역": "내년에 나는 차를 [살 것이다].",
        "시제및단서": "[미래] 내년의 계획입니다."
    },
    {
        "문장": "Antes de ayer, no ( ) a clase.",
        "단어원형": "ir, 가다",
        "정답": "fui",
        "번역": "그저께 나는 수업에 [가지 않았다].",
        "시제및단서": "[점과거] 그저께 발생한(부재한) 사건입니다."
    },
    {
        "문장": "Es posible que ( ) mañana.",
        "단어원형": "llover, 비오다",
        "정답": "llueva",
        "번역": "내일 비가 [올] 가능성이 있다.",
        "시제및단서": "[접속법 현재] 가능성(Es posible que) 표현입니다."
    },
    {
        "문장": "Cuando era pequeño, ( ) mucho chocolate.",
        "단어원형": "comer, 먹다",
        "정답": "comía",
        "번역": "어렸을 때, 나는 초콜릿을 많이 [먹곤 했다].",
        "시제및단서": "[불완전과거] 과거의 습관입니다."
    },
    {
        "문장": "¡( ) la luz!",
        "단어원형": "encender, 켜다",
        "정답": "Enciende",
        "번역": "불 [켜]!",
        "시제및단서": "[명령법] 긍정 명령형(tú)입니다. (e->ie)"
    },
    {
        "문장": "Si yo ( ) tú, no iría.",
        "단어원형": "ser, 이다",
        "정답": "fuera",
        "번역": "내가 너[라면], 가지 않을 거야.",
        "시제및단서": "[접속법 과거] 가정법 과거 조건절입니다."
    },
    {
        "문장": "Ayer ( ) a mis amigos.",
        "단어원형": "ver, 보다/만나다",
        "정답": "vi",
        "번역": "어제 나는 친구들을 [만났다] (보았다).",
        "시제및단서": "[점과거] 어제 완료된 만남입니다."
    },
    {
        "문장": "Espero que ( ) bien.",
        "단어원형": "estar, 있다",
        "정답": "estés",
        "번역": "네가 잘 지내고(잘 [있기를]) 바란다.",
        "시제및단서": "[접속법 현재] 안부 인사에 쓰이는 소망 표현입니다."
    },
    {
        "문장": "El mes pasado, ( ) un viaje.",
        "단어원형": "hacer, 하다",
        "정답": "hicimos",
        "번역": "지난달에 우리는 여행을 [했다].",
        "시제및단서": "[점과거] 지난달 완료된 행위입니다."
    },
    {
        "문장": "No creo que él ( ) la verdad.",
        "단어원형": "decir, 말하다",
        "정답": "diga",
        "번역": "나는 그가 진실을 [말한다고] 생각하지 않는다.",
        "시제및단서": "[접속법 현재] 의심/부정 표현입니다."
    },
    {
        "문장": "Mañana ( ) a estudiar.",
        "단어원형": "empezar, 시작하다",
        "정답": "empezaré",
        "번역": "내일 나는 공부를 [시작할 것이다].",
        "시제및단서": "[미래] 내일의 계획입니다."
    },
    {
        "문장": "Si tuviera tiempo, ( ) más.",
        "단어원형": "leer, 읽다",
        "정답": "leería",
        "번역": "시간이 있다면, 더 많이 [읽을 텐데].",
        "시제및단서": "[조건법] 가정법 과거의 귀결절입니다."
    },
    {
        "문장": "Ayer se ( ) el vaso.",
        "단어원형": "romper, 깨다/깨지다",
        "정답": "rompió",
        "번역": "어제 컵이 [깨졌다].",
        "시제및단서": "[점과거] 어제 발생한 우발적 사건입니다."
    },
    {
        "문장": "Quiero que tú ( ) feliz.",
        "단어원형": "ser, 이다",
        "정답": "seas",
        "번역": "나는 네가 행복[하기를] 원한다.",
        "시제및단서": "[접속법 현재] 원함의 대상입니다."
    },
    {
        "문장": "Antes, ( ) mucho frío en invierno.",
        "단어원형": "hacer, 하다(날씨)",
        "정답": "hacía",
        "번역": "예전에는 겨울에 매우 [추웠다].",
        "시제및단서": "[불완전과거] 과거의 일반적인 날씨 상태입니다."
    },
    {
        "문장": "Es importante que ( ) a tiempo.",
        "단어원형": "llegar, 도착하다",
        "정답": "llegues",
        "번역": "네가 제시간에 [도착하는] 것이 중요하다.",
        "시제및단서": "[접속법 현재] 중요성 표현입니다."
    },
    {
        "문장": "Anoche ( ) muy bien.",
        "단어원형": "dormir, 자다",
        "정답": "dormí",
        "번역": "어젯밤 나는 아주 잘 [잤다].",
        "시제및단서": "[점과거] 어젯밤 완료된 수면입니다."
    },
    {
        "문장": "Si ( ) dinero, te lo daría.",
        "단어원형": "tener, 가지다",
        "정답": "tuviera",
        "번역": "돈이 [있다면], 너에게 줄 텐데.",
        "시제및단서": "[접속법 과거] 현재 없는 것을 가정합니다."
    },
    {
        "문장": "¡( ) aquí!",
        "단어원형": "venir, 오다",
        "정답": "Ven",
        "번역": "이리 [와]!",
        "시제및단서": "[명령법] 긍정 명령형입니다."
    },
    {
        "문장": "Me molesta que ( ) tanto ruido.",
        "단어원형": "hacer, 하다",
        "정답": "hagan",
        "번역": "그들이 그렇게 시끄럽게 [하는] (떠드는) 것이 짜증난다.",
        "시제및단서": "[접속법 현재] 감정 유발 원인입니다."
    },
    {
        "문장": "El año pasado, ( ) un coche.",
        "단어원형": "comprar, 사다",
        "정답": "compré",
        "번역": "작년에 나는 차를 [샀다].",
        "시제및단서": "[점과거] 작년의 구매 행위입니다."
    },
    {
        "문장": "Dudo que ( ) verdad.",
        "단어원형": "ser, 이다",
        "정답": "sea",
        "번역": "그것이 사실[일지] 의심스럽다.",
        "시제및단서": "[접속법 현재] 의심 표현입니다."
    },
    {
        "문장": "Mañana ( ) a Madrid.",
        "단어원형": "ir, 가다",
        "정답": "iré",
        "번역": "내일 나는 마드리드에 [갈 것이다].",
        "시제및단서": "[미래] 내일의 이동 계획입니다."
    },
    {
        "문장": "Cuando era joven, ( ) mucho.",
        "단어원형": "viajar, 여행하다",
        "정답": "viajaba",
        "번역": "젊었을 때, 나는 여행을 많이 [하곤 했다].",
        "시제및단서": "[불완전과거] 과거의 습관입니다."
    },
    {
        "문장": "Es necesario que ( ) ahora.",
        "단어원형": "salir, 나가다/떠나다",
        "정답": "salgamos",
        "번역": "우리가 지금 [떠나는] 것이 필요하다.",
        "시제및단서": "[접속법 현재] 필요성 표현입니다."
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
