
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

# Manual Data 121-150
manual_data = [
    {
        "문장": "No entiendo por qué ( ) eso.",
        "단어원형": "decir, 말하다",
        "정답": "dices",
        "번역": "나는 네가 왜 그런 말을 [하는지] 이해가 안 된다.",
        "시제및단서": "[현재] 현재 진행되는 대화 상황에서의 사실을 묻고 있으므로 직설법 현재를 씁니다."
    },
    {
        "문장": "Ayer ( ) un día muy largo.",
        "단어원형": "ser, 이다",
        "정답": "fue",
        "번역": "어제는 정말 긴 하루[였다].",
        "시제및단서": "[점과거] 어제라는 시간 전체를 하나의 완료된 사실로 봅니다."
    },
    {
        "문장": "Si ( ) más cuidado, no te habrías caído.",
        "단어원형": "tener, 가지다",
        "정답": "hubieras tenido",
        "번역": "네가 좀 더 주의를 [기울였다면] (가졌다면), 넘어지지 않았을 텐데.",
        "시제및단서": "[접속법 과거완료] 과거 사실의 반대(주의를 안 기울임)를 가정하는 가정법 과거완료(Si hubieras p.p.)입니다."
    },
    {
        "문장": "Mañana, cuando ( ), iremos a cenar.",
        "단어원형": "llegar, 도착하다",
        "정답": "llegues",
        "번역": "내일 네가 [도착하면], 저녁 먹으러 가자.",
        "시제및단서": "[접속법 현재] 미래 시점의 'Cuando' 절에는 접속법을 씁니다."
    },
    {
        "문장": "Anoche no ( ) dormir por el calor.",
        "단어원형": "poder, 할수있다",
        "정답": "pude",
        "번역": "어젯밤 더위 때문에 잠을 잘 수 [없었다].",
        "시제및단서": "[점과거] 특정 밤(Anoche)에 완료된(실패한) 행위입니다."
    },
    {
        "문장": "Yo ( ) que ya lo sabías.",
        "단어원형": "pensar, 생각하다",
        "정답": "pensaba",
        "번역": "나는 네가 이미 그걸 알고 있다고 [생각했었다].",
        "시제및단서": "[불완전과거] 과거의 지속적인 생각입니다."
    },
    {
        "문장": "Es probable que mañana ( ).",
        "단어원형": "llover, 비오다",
        "정답": "llueva",
        "번역": "내일 비가 [올] 확률이 높다.",
        "시제및단서": "[접속법 현재] 'Es probable que'(확률) 뒤에는 접속법을 씁니다."
    },
    {
        "문장": "¡( ) la ventana, que hace calor!",
        "단어원형": "abrir, 열다",
        "정답": "Abre",
        "번역": "더우니까 창문 좀 [열어]!",
        "시제및단서": "[명령법] 긍정 명령형(tú)입니다."
    },
    {
        "문장": "El año pasado, mi hermano ( ) la universidad.",
        "단어원형": "terminar, 끝내다/졸업하다",
        "정답": "terminó",
        "번역": "작년에 내 형은 대학을 [졸업했다] (끝냈다).",
        "시제및단서": "[점과거] 작년에 완료된 사건입니다."
    },
    {
        "문장": "Si yo ( ) rico, viajaría en primera clase.",
        "단어원형": "ser, 이다",
        "정답": "fuera",
        "번역": "내가 부자[라면], 일등석으로 여행할 텐데.",
        "시제및단서": "[접속법 과거] 현재 사실의 반대(부자가 아님)를 가정합니다."
    },
    {
        "문장": "Antes, nosotros ( ) mucho al cine.",
        "단어원형": "ir, 가다",
        "정답": "íbamos",
        "번역": "예전에 우리는 영화관에 자주 [가곤 했다].",
        "시제및단서": "[불완전과거] 과거의 반복적인 습관입니다."
    },
    {
        "문장": "Espero que te ( ) mejor.",
        "단어원형": "sentir, 느끼다",
        "정답": "sientas",
        "번역": "기분이 더 나아[지기를] (느끼기를) 바란다.",
        "시제및단서": "[접속법 현재] 'Espero que' 소망 표현입니다."
    },
    {
        "문장": "Ayer ( ) la cartera en el autobús.",
        "단어원형": "perder, 잃어버리다",
        "정답": "perdí",
        "번역": "어제 버스에서 지갑을 [잃어버렸다].",
        "시제및단서": "[점과거] 어제 발생한 일회성 사건입니다."
    },
    {
        "문장": "Cuando era niño, ( ) ser futbolista.",
        "단어원형": "querer, 원하다",
        "정답": "quería",
        "번역": "어렸을 때, 축구선수가 되고 [싶었다].",
        "시제및단서": "[불완전과거] 과거의 지속적인 소망입니다."
    },
    {
        "문장": "Mañana ( ) a mis padres.",
        "단어원형": "visitar, 방문하다",
        "정답": "visitaré",
        "번역": "내일 부모님을 [방문할 것이다].",
        "시제및단서": "[미래] 내일의 계획입니다."
    },
    {
        "문장": "No creo que eso ( ) verdad.",
        "단어원형": "ser, 이다",
        "정답": "sea",
        "번역": "그것이 사실[이라고] 생각하지 않는다.",
        "시제및단서": "[접속법 현재] 'No creo que' 의심 표현입니다."
    },
    {
        "문장": "Anoche, ellos ( ) muy tarde a casa.",
        "단어원형": "llegar, 도착하다",
        "정답": "llegaron",
        "번역": "어젯밤 그들은 집에 매우 늦게 [도착했다].",
        "시제및단서": "[점과거] 어젯밤 완료된 행위입니다."
    },
    {
        "문장": "Si ( ) frío, ponte el abrigo.",
        "단어원형": "tener, 가지다(춥다)",
        "정답": "tienes",
        "번역": "추우면(추위를 [가진다면]), 코트를 입어라.",
        "시제및단서": "[현재] 실현 가능한 조건문에는 직설법 현재를 씁니다."
    },
    {
        "문장": "Me gusta que tú ( ) así.",
        "단어원형": "ser, 이다",
        "정답": "seas",
        "번역": "네가 그런 사람[인 것이] 나는 좋다.",
        "시제및단서": "[접속법 현재] 감정(Me gusta) 뒤에 오는 접속법입니다."
    },
    {
        "문장": "Ayer ( ) con Juan por teléfono.",
        "단어원형": "hablar, 말하다/통화하다",
        "정답": "hablé",
        "번역": "어제 후안과 전화로 [통화했다].",
        "시제및단서": "[점과거] 어제 완료된 행위입니다."
    },
    {
        "문장": "Cuando ( ) el sol, saldremos.",
        "단어원형": "salir, 나가다/뜨다",
        "정답": "salga",
        "번역": "해가 [뜨면], 우리는 나갈 것이다.",
        "시제및단서": "[접속법 현재] 미래 시점의 'Cuando' 절입니다."
    },
    {
        "문장": "Ellos ( ) estudiando cuando llegué.",
        "단어원형": "estar, 있다",
        "정답": "estaban",
        "번역": "내가 도착했을 때, 그들은 공부하고 [있었다].",
        "시제및단서": "[불완전과거] 과거 진행 중이던 상태입니다."
    },
    {
        "문장": "¡( ) cuidado al cruzar la calle!",
        "단어원형": "tener, 가지다",
        "정답": "Ten",
        "번역": "길 건널 때 조심[해]!",
        "시제및단서": "[명령법] 긍정 명령형입니다."
    },
    {
        "문장": "Hace un año, yo ( ) a tocar la guitarra.",
        "단어원형": "empezar, 시작하다",
        "정답": "empecé",
        "번역": "일 년 전에 나는 기타를 치기 [시작했다].",
        "시제및단서": "[점과거] 일 년 전 시작된 완료 행위입니다."
    },
    {
        "문장": "Es importante que nosotros ( ) unidos.",
        "단어원형": "estar, 있다",
        "정답": "estemos",
        "번역": "우리가 단결해 [있는 것이] 중요하다.",
        "시제및단서": "[접속법 현재] 가치 판단(Es importante que)입니다."
    },
    {
        "문장": "Ayer no ( ) nada en todo el día.",
        "단어원형": "hacer, 하다",
        "정답": "hice",
        "번역": "어제 하루 종일 아무것도 [하지 않았다].",
        "시제및단서": "[점과거] 어제 완료된 부정 행위입니다."
    },
    {
        "문장": "Si pudiera volar, ( ) a la luna.",
        "단어원형": "ir, 가다",
        "정답": "iría",
        "번역": "날 수 있다면, 달에 [갈 텐데].",
        "시제및단서": "[조건법] 가정법 과거의 결과입니다."
    },
    {
        "문장": "Mañana ( ) tu cumpleaños.",
        "단어원형": "celebrar, 축하하다",
        "정답": "celebraremos",
        "번역": "내일 네 생일을 [축하할 것이다].",
        "시제및단서": "[미래] 내일의 계획입니다."
    },
    {
        "문장": "Dudo que ella ( ) venir.",
        "단어원형": "poder, 할수있다",
        "정답": "pueda",
        "번역": "그녀가 올 수 [있을지] 의심스럽다.",
        "시제및단서": "[접속법 현재] 의심 표현입니다."
    },
    {
        "문장": "Antes de ayer, ( ) una carta a mi abuela.",
        "단어원형": "escribir, 쓰다",
        "정답": "escribí",
        "번역": "그저께 할머니께 편지를 [썼다].",
        "시제및단서": "[점과거] 그저께 완료된 행위입니다."
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
