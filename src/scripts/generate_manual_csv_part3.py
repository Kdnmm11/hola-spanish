
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

# Manual Data 61-90
manual_data = [
    {
        "문장": "Si me ( ) otra oportunidad, lo haría mejor.",
        "단어원형": "dar, 주다",
        "정답": "dieras",
        "번역": "만약 네가 내게 기회를 한 번 더 [준다면], 더 잘할 텐데.",
        "시제및단서": "[접속법 과거] 'Si' 절에서 현재 실현 불가능한 가정(기회를 안 줌)을 할 때 접속법 과거를 씁니다."
    },
    {
        "문장": "Esta noche ( ) el partido en la televisión.",
        "단어원형": "ver, 보다",
        "정답": "veremos",
        "번역": "오늘 밤 우리는 텔레비전으로 경기를 [볼 것이다].",
        "시제및단서": "[미래] 'Esta noche'(오늘 밤) 예정된 미래의 계획입니다."
    },
    {
        "문장": "Cuando el profesor entró, todos ( ) de hablar.",
        "단어원형": "dejar, 그만두다/멈추다",
        "정답": "dejaron",
        "번역": "선생님이 들어오셨을 때, 모두가 말하는 것을 [멈췄다].",
        "시제및단서": "[점과거] 특정 과거 시점(entró)에 발생하여 완료된 반응 행동입니다."
    },
    {
        "문장": "Te recomiendo que ( ) ese libro.",
        "단어원형": "leer, 읽다",
        "정답": "leas",
        "번역": "나는 네게 그 책을 [읽을] 것을 추천한다.",
        "시제및단서": "[접속법 현재] 'Recomiendo que'(추천) 뒤에는 제안/권고를 나타내는 접속법이 옵니다."
    },
    {
        "문장": "Ayer se me ( ) las llaves en casa.",
        "단어원형": "olvidar, 잊다",
        "정답": "olvidaron",
        "번역": "어제 나는 집에 열쇠 두는 것을 [깜빡했다] (열쇠들이 잊혀졌다).",
        "시제및단서": "[점과거] 'Ayer' 발생한 우발적 사건(se me olvidaron)을 점과거로 표현합니다."
    },
    {
        "문장": "Si ( ) más tiempo, viajaría por todo el mundo.",
        "단어원형": "tener, 가지다",
        "정답": "tuviera",
        "번역": "시간이 더 [있다면], 전 세계를 여행할 텐데.",
        "시제및단서": "[접속법 과거] 현재 사실의 반대(시간 없음)를 가정하는 조건문입니다."
    },
    {
        "문장": "¡( ) la verdad! No mientas.",
        "단어원형": "decir, 말하다",
        "정답": "Di",
        "번역": "진실을 [말해]! 거짓말하지 마.",
        "시제및단서": "[명령법] 상대방(tú)에게 진실을 말하라고 요구하는 긍정 명령형(불규칙)입니다."
    },
    {
        "문장": "Antes de salir, ( ) las luces, por favor.",
        "단어원형": "apagar, 끄다",
        "정답": "apaga",
        "번역": "나가기 전에 불을 [꺼] 주세요.",
        "시제및단서": "[명령법] 구체적인 행동을 지시하는 명령문입니다."
    },
    {
        "문장": "El año pasado, mis padres ( ) sus bodas de plata.",
        "단어원형": "celebrar, 축하하다/기념하다",
        "정답": "celebraron",
        "번역": "작년에 우리 부모님은 은혼식을 [기념했다].",
        "시제및단서": "[점과거] 'El año pasado'(작년)에 있었던 완료된 행사입니다."
    },
    {
        "문장": "No me gusta que tú ( ) con él.",
        "단어원형": "salir, 나가다/사귀다",
        "정답": "salgas",
        "번역": "나는 네가 그와 [사귀는] (나가는) 것이 싫다.",
        "시제및단서": "[접속법 현재] 'No me gusta que'(감정/호불호) 뒤에는 접속법을 사용합니다."
    },
    {
        "문장": "En el futuro, la gente ( ) en Marte.",
        "단어원형": "vivir, 살다",
        "정답": "vivirá",
        "번역": "미래에는 사람들이 화성에 [살 것이다].",
        "시제및단서": "[미래] 막연한 미래(En el futuro)에 대한 예측입니다."
    },
    {
        "문장": "Ayer ( ) un accidente en la autopista.",
        "단어원형": "haber, 있다(발생하다)",
        "정답": "hubo",
        "번역": "어제 고속도로에서 사고가 [있었다].",
        "시제및단서": "[점과거] 'Ayer' 발생한 사건의 존재(hubo)를 나타냅니다."
    },
    {
        "문장": "Mientras yo dormía, mi hermano ( ) mi ordenador.",
        "단어원형": "usar, 사용하다",
        "정답": "usó",
        "번역": "내가 자는 동안, 내 동생이 내 컴퓨터를 [사용했다].",
        "시제및단서": "[점과거] 배경(dormía) 속에서 발생한 구체적인 행위(usó)입니다."
    },
    {
        "문장": "Dudo que mañana ( ) buen tiempo.",
        "단어원형": "hacer, 하다(날씨)",
        "정답": "haga",
        "번역": "내일 날씨가 [좋을지] 의심스럽다.",
        "시제및단서": "[접속법 현재] 'Dudo que'(의심) 뒤에는 불확실한 미래 날씨에 대해 접속법을 씁니다."
    },
    {
        "문장": "Cuando era niño, no me ( ) las verduras.",
        "단어원형": "gustar, 좋아하다",
        "정답": "gustaban",
        "번역": "어렸을 때, 나는 채소를 [좋아하지 않았다].",
        "시제및단서": "[불완전과거] 과거의 지속적인 취향이나 기호는 불완전과거로 표현합니다."
    },
    {
        "문장": "¡( ) aquí y ayúdame!",
        "단어원형": "venir, 오다",
        "정답": "Ven",
        "번역": "여기로 [와서] 나를 도와줘!",
        "시제및단서": "[명령법] 'Venir'의 긍정 명령형(tú)은 불규칙 형태인 'Ven'입니다."
    },
    {
        "문장": "Ayer por la mañana, yo ( ) al médico.",
        "단어원형": "ir, 가다",
        "정답": "fui",
        "번역": "어제 아침에 나는 병원에 [갔다].",
        "시제및단서": "[점과거] 'Ayer por la mañana'에 완료된 이동입니다."
    },
    {
        "문장": "Si estudias mucho, ( ) el examen.",
        "단어원형": "aprobar, 합격하다",
        "정답": "aprobarás",
        "번역": "네가 공부를 많이 한다면, 시험에 [합격할 것이다].",
        "시제및단서": "[미래] 실현 가능한 조건(Si estudias)에 대한 결과는 미래 시제로 씁니다."
    },
    {
        "문장": "Es posible que ellos ( ) tarde.",
        "단어원형": "llegar, 도착하다",
        "정답": "lleguen",
        "번역": "그들이 늦게 [도착할] 가능성이 있다.",
        "시제및단서": "[접속법 현재] 'Es posible que'(가능성) 뒤에는 접속법을 사용합니다."
    },
    {
        "문장": "Anoche, nosotros ( ) una pizza.",
        "단어원형": "pedir, 주문하다",
        "정답": "pedimos",
        "번역": "어젯밤 우리는 피자를 [주문했다].",
        "시제및단서": "[점과거] 어젯밤 완료된 행위입니다."
    },
    {
        "문장": "Cuando tengas tiempo, ( ) este libro.",
        "단어원형": "leer, 읽다",
        "정답": "lee",
        "번역": "시간이 생기면, 이 책을 [읽어라].",
        "시제및단서": "[명령법] 미래의 조건을 전제로 한 지시/권유이므로 명령형을 씁니다."
    },
    {
        "문장": "Antes, aquí ( ) un cine muy famoso.",
        "단어원형": "haber, 있다",
        "정답": "había",
        "번역": "예전에는 여기에 아주 유명한 영화관이 [있었다].",
        "시제및단서": "[불완전과거] 과거의 존재나 상태(descripción)를 나타내는 'había'입니다."
    },
    {
        "문장": "Me extraña que Juan no ( ) venido todavía.",
        "단어원형": "haber, (조동사)",
        "정답": "haya",
        "번역": "후안이 아직 [오지 않은] 것이 이상하다.",
        "시제및단서": "[접속법 현재완료] 'Me extraña que'(감정) 뒤에, 과거부터 현재까지의 완료된 상태(오지 않음)를 접속법 완료로 표현합니다."
    },
    {
        "문장": "El sábado pasado, nosotros ( ) en la playa.",
        "단어원형": "estar, 있다",
        "정답": "estuvimos",
        "번역": "지난주 토요일에 우리는 해변에 [있었다].",
        "시제및단서": "[점과거] 특정 과거 시점(토요일)에 위치했던 사실을 서술합니다."
    },
    {
        "문장": "Quiero que tú ( ) feliz.",
        "단어원형": "ser, 이다",
        "정답": "seas",
        "번역": "나는 네가 행복[하기를] 원한다.",
        "시제및단서": "[접속법 현재] 'Quiero que'(원함) 뒤에는 소망의 대상이 되는 접속법을 씁니다."
    },
    {
        "문장": "Ayer ( ) mucho calor.",
        "단어원형": "hacer, 하다(날씨)",
        "정답": "hacía",
        "번역": "어제는 날씨가 매우 [더웠다].",
        "시제및단서": "[불완전과거] 과거의 날씨 묘사는 배경적이므로 불완전과거가 일반적입니다."
    },
    {
        "문장": "Si yo ( ) tú, no lo haría.",
        "단어원형": "ser, 이다",
        "정답": "fuera",
        "번역": "내가 너[라면], 그렇게 하지 않을 텐데.",
        "시제및단서": "[접속법 과거] '내가 너다'는 불가능한 가정이므로 접속법 과거를 씁니다."
    },
    {
        "문장": "Mañana ( ) a visitar a mis abuelos.",
        "단어원형": "ir, 가다",
        "정답": "iré",
        "번역": "내일 나는 조부모님을 뵈러 [갈 것이다].",
        "시제및단서": "[미래] 내일의 계획입니다."
    },
    {
        "문장": "Hace un mes, yo ( ) a trabajar en esta empresa.",
        "단어원형": "empezar, 시작하다",
        "정답": "empecé",
        "번역": "한 달 전에 나는 이 회사에서 일하기 [시작했다].",
        "시제및단서": "[점과거] 'Hace un mes'(한 달 전)이라는 특정 시점에 시작된 행위입니다."
    },
    {
        "문장": "Espero que ( ) un buen viaje.",
        "단어원형": "tener, 가지다",
        "정답": "tengas",
        "번역": "좋은 여행이 [되기를] (여행을 가지기를) 바란다.",
        "시제및단서": "[접속법 현재] 'Espero que' 소망 표현입니다."
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

# Append to CSV
output_path = 'src/data/conjugation_dataset_v2.csv'
headers = ['시제', '문장 (빈칸 포함)', '동사 기본형', '정답', '번역', '설명', '오답보기']

with open(output_path, 'a', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=headers)
    writer.writerows(rows)

print(f"Appended {len(rows)} rows to {output_path}")
