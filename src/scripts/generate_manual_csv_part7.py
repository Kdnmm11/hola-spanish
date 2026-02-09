
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

# Manual Data 181-210
manual_data = [
    {
        "문장": "Siempre que ( ) sol, voy al parque.",
        "단어원형": "hacer, 하다(날씨)",
        "정답": "hace",
        "번역": "해가 [날] 때마다, 나는 공원에 간다.",
        "시제및단서": "[현재] 'Siempre que'와 함께 반복되는 상황을 나타내므로 현재 시제를 씁니다."
    },
    {
        "문장": "Si no ( ) los deberes, no podrás salir.",
        "단어원형": "hacer, 하다",
        "정답": "haces",
        "번역": "숙제를 [하지 않으면], 너는 나갈 수 없을 것이다.",
        "시제및단서": "[현재] 실현 가능한 조건(Si...)에는 직설법 현재를 사용합니다."
    },
    {
        "문장": "El mes que viene, ( ) un coche nuevo.",
        "단어원형": "comprar, 사다",
        "정답": "compraré",
        "번역": "다음 달에 나는 새 차를 [살 것이다].",
        "시제및단서": "[미래] 'El mes que viene'(다음 달)의 계획입니다."
    },
    {
        "문장": "Ayer ( ) que trabajar hasta tarde.",
        "단어원형": "tener, 가지다(해야하다)",
        "정답": "tuve",
        "번역": "어제 나는 늦게까지 일해야 [했다].",
        "시제및단서": "[점과거] 'Ayer' 완료된 의무(tener que)입니다."
    },
    {
        "문장": "¡( ) las gracias a tu abuela!",
        "단어원형": "dar, 주다",
        "정답": "Dale",
        "번역": "할머니께 감사 인사를 [드려라] (감사를 주어라)!",
        "시제및단서": "[명령법] 긍정 명령형(tú)입니다. (le는 간접목적대명사)",
    },
    {
        "문장": "Cuando ( ) niño, vivía en el campo.",
        "단어원형": "ser, 이다",
        "정답": "era",
        "번역": "내가 어렸을(아이[였을]) 때, 나는 시골에 살았다.",
        "시제및단서": "[불완전과거] 과거의 상태/나이(ser niño)를 나타내므로 불완전과거를 씁니다."
    },
    {
        "문장": "No creo que eso ( ) posible.",
        "단어원형": "ser, 이다",
        "정답": "sea",
        "번역": "나는 그것이 가능[하다고] 생각하지 않는다.",
        "시제및단서": "[접속법 현재] 부정적 의견(No creo que)입니다."
    },
    {
        "문장": "Anoche, al final ( ) la verdad.",
        "단어원형": "saber, 알다",
        "정답": "supe",
        "번역": "어젯밤, 마침내 나는 진실을 [알게 되었다].",
        "시제및단서": "[점과거] 'saber'가 점과거로 쓰이면 '알게 되다(발견하다)'의 뜻이 됩니다."
    },
    {
        "문장": "Si yo ( ) pájaro, volaría lejos.",
        "단어원형": "ser, 이다",
        "정답": "fuera",
        "번역": "내가 새[라면], 멀리 날아갈 텐데.",
        "시제및단서": "[접속법 과거] 현재 사실의 반대(새가 아님) 가정입니다."
    },
    {
        "문장": "Mañana no ( ) ir a la fiesta.",
        "단어원형": "poder, 할수있다",
        "정답": "podré",
        "번역": "내일 나는 파티에 갈 수 [없을 것이다].",
        "시제및단서": "[미래] 내일의 불가능을 예측합니다."
    },
    {
        "문장": "Es necesario que ( ) más verduras.",
        "단어원형": "comer, 먹다",
        "정답": "comas",
        "번역": "네가 채소를 더 많이 [먹는] 것이 필요하다.",
        "시제및단서": "[접속법 현재] 필요성(Es necesario que)을 나타냅니다."
    },
    {
        "문장": "Ayer ( ) con mis amigos en el parque.",
        "단어원형": "jugar, 놀다",
        "정답": "jugué",
        "번역": "어제 나는 공원에서 친구들과 [놀았다].",
        "시제및단서": "[점과거] 어제 완료된 행위입니다."
    },
    {
        "문장": "¿Alguna vez ( ) al golf?",
        "단어원형": "jugar, 놀다/치다",
        "정답": "has jugado",
        "번역": "너는 골프를 쳐본 [적이 있니]?",
        "시제및단서": "[현재완료] 경험(Alguna vez)을 묻습니다."
    },
    {
        "문장": "Antes, yo ( ) muy tímido.",
        "단어원형": "ser, 이다",
        "정답": "era",
        "번역": "예전에 나는 매우 수줍음이 많[았었다].",
        "시제및단서": "[불완전과거] 과거의 성격 묘사입니다."
    },
    {
        "문장": "Quiero que ( ) conmigo.",
        "단어원형": "venir, 오다",
        "정답": "vengas",
        "번역": "나는 네가 나와 함께 [오기를] 원한다.",
        "시제및단서": "[접속법 현재] 원함(Quiero que)의 대상입니다."
    },
    {
        "문장": "El año pasado, ellos ( ) su casa.",
        "단어원형": "vender, 팔다",
        "정답": "vendieron",
        "번역": "작년에 그들은 집을 [팔았다].",
        "시제및단서": "[점과거] 작년에 완료된 매매 행위입니다."
    },
    {
        "문장": "Cuando ( ) a casa, haz los deberes.",
        "단어원형": "llegar, 도착하다",
        "정답": "llegues",
        "번역": "집에 [도착하면], 숙제를 해라.",
        "시제및단서": "[접속법 현재] 미래 시점의 시간 부사절입니다."
    },
    {
        "문장": "Ayer se ( ) la luz.",
        "단어원형": "ir, 가다/나가다(전기)",
        "정답": "fue",
        "번역": "어제 전기가 [나갔다].",
        "시제및단서": "[점과거] 어제 발생한 사건입니다."
    },
    {
        "문장": "Si ( ) más, aprobarías.",
        "단어원형": "estudiar, 공부하다",
        "정답": "estudiaras",
        "번역": "네가 공부를 더 [한다면], 합격할 텐데.",
        "시제및단서": "[접속법 과거] 현재 공부를 안 하고 있다는 반대 상황 가정입니다."
    },
    {
        "문장": "Mañana ( ) un examen importante.",
        "단어원형": "tener, 가지다",
        "정답": "tendré",
        "번역": "내일 나는 중요한 시험이 [있을 것이다] (가질 것이다).",
        "시제및단서": "[미래] 내일의 예정입니다."
    },
    {
        "문장": "Es importante que ( ) las manos antes de comer.",
        "단어원형": "lavarse, 씻다",
        "정답": "te laves",
        "번역": "식사 전에 손을 [씻는] 것은 중요하다.",
        "시제및단서": "[접속법 현재] 가치 판단 구문입니다."
    },
    {
        "문장": "Ayer no ( ) nada interesante.",
        "단어원형": "hacer, 하다",
        "정답": "hicimos",
        "번역": "어제 우리는 재미있는 일을 아무것도 [하지 않았다].",
        "시제및단서": "[점과거] 어제 완료된(부재한) 행위입니다."
    },
    {
        "문장": "Me ( ) mucho la música clásica.",
        "단어원형": "gustar, 좋아하다",
        "정답": "gusta",
        "번역": "나는 클래식 음악을 매우 [좋아한다].",
        "시제및단서": "[현재] 현재의 기호/취향입니다."
    },
    {
        "문장": "Cuando era joven, ( ) piano.",
        "단어원형": "tocar, 연주하다/치다",
        "정답": "tocaba",
        "번역": "젊었을 때, 나는 피아노를 [치곤 했다].",
        "시제및단서": "[불완전과거] 과거의 습관입니다."
    },
    {
        "문장": "¡( ) cuidado al bajar las escaleras!",
        "단어원형": "tener, 가지다",
        "정답": "Ten",
        "번역": "계단 내려갈 때 조심[해]!",
        "시제및단서": "[명령법] 긍정 명령형입니다."
    },
    {
        "문장": "Dudo que ellos ( ) la verdad.",
        "단어원형": "saber, 알다",
        "정답": "sepan",
        "번역": "그들이 진실을 [아는지] 의심스럽다.",
        "시제및단서": "[접속법 현재] 의심 표현입니다."
    },
    {
        "문장": "Anoche, ( ) una cena deliciosa.",
        "단어원형": "preparar, 준비하다",
        "정답": "preparé",
        "번역": "어젯밤 나는 맛있는 저녁을 [준비했다].",
        "시제및단서": "[점과거] 어젯밤 완료된 행위입니다."
    },
    {
        "문장": "Si ( ) millonario, compraría una isla.",
        "단어원형": "ser, 이다",
        "정답": "fuera",
        "번역": "내가 백만장자[라면], 섬을 하나 살 텐데.",
        "시제및단서": "[접속법 과거] 불가능한 가정입니다."
    },
    {
        "문장": "Espero que ( ) pronto.",
        "단어원형": "llegar, 도착하다",
        "정답": "llegues",
        "번역": "네가 빨리 [도착하기를] 바란다.",
        "시제및단서": "[접속법 현재] 소망 표현입니다."
    },
    {
        "문장": "El año pasado, ( ) mucho en invierno.",
        "단어원형": "nevar, 눈오다",
        "정답": "nevó",
        "번역": "작년 겨울에는 눈이 많이 [왔다].",
        "시제및단서": "[점과거] 작년 겨울의 날씨를 사실로 진술합니다."
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
