
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

# Manual Data 241-270
manual_data = [
    {
        "문장": "Si me ( ) mejor, iría contigo.",
        "단어원형": "sentirse, 느끼다",
        "정답": "sintiera",
        "번역": "내가 기분이 더 좋[다면] (느낀다면), 너랑 갈 텐데.",
        "시제및단서": "[접속법 과거] 현재 아파서 못 가는 상황을 가정합니다."
    },
    {
        "문장": "Esa película me ha ( ) muy interesante.",
        "단어원형": "parecer, 보이다/생각되다",
        "정답": "parecido",
        "번역": "그 영화는 내게 매우 흥미롭게 [느껴졌다] (보였다 - 완료).",
        "시제및단서": "[현재완료] 최근에 본 영화에 대한 완료된 인상입니다."
    },
    {
        "문장": "¡No ( ) el cuadro!",
        "단어원형": "tocar, 만지다",
        "정답": "toques",
        "번역": "그림 [만지지 마]!",
        "시제및단서": "[부정 명령법] 금지 명령(tú)입니다."
    },
    {
        "문장": "Ayer ( ) hasta la playa.",
        "단어원형": "conducir, 운전하다",
        "정답": "conduje",
        "번역": "어제 나는 해변까지 [운전했다].",
        "시제및단서": "[점과거] 어제 완료된 운전 행위입니다."
    },
    {
        "문장": "Cuando ( ) a casa, avísame.",
        "단어원형": "volver, 돌아오다",
        "정답": "vuelvas",
        "번역": "집에 [돌아오면], 내게 알려줘.",
        "시제및단서": "[접속법 현재] 미래 시점의 시간 부사절입니다."
    },
    {
        "문장": "Espero que ( ) un buen día.",
        "단어원형": "tener, 가지다",
        "정답": "tengas",
        "번역": "좋은 하루 [보내기를] (가지기를) 바란다.",
        "시제및단서": "[접속법 현재] 소망 표현입니다."
    },
    {
        "문장": "Ayer ( ) mucho trabajo.",
        "단어원형": "tener, 가지다",
        "정답": "tuve",
        "번역": "어제 나는 일이 많[았다] (가졌다).",
        "시제및단서": "[점과거] 어제 완료된 상황입니다."
    },
    {
        "문장": "Si ( ) más tiempo, estudiaría inglés.",
        "단어원형": "tener, 가지다",
        "정답": "tuviera",
        "번역": "시간이 더 [있다면], 영어를 공부할 텐데.",
        "시제및단서": "[접속법 과거] 현재 시간 부족을 가정합니다."
    },
    {
        "문장": "¡( ) la puerta!",
        "단어원형": "cerrar, 닫다",
        "정답": "Cierra",
        "번역": "문 [닫아]!",
        "시제및단서": "[명령법] 긍정 명령형입니다."
    },
    {
        "문장": "No creo que él ( ) la verdad.",
        "단어원형": "saber, 알다",
        "정답": "sepa",
        "번역": "그가 진실을 [안다고] 생각하지 않는다.",
        "시제및단서": "[접속법 현재] 의심 표현입니다."
    },
    {
        "문장": "Mañana ( ) a cenar fuera.",
        "단어원형": "salir, 나가다/외출하다",
        "정답": "saldremos",
        "번역": "내일 우리는 저녁 먹으러 [나갈 것이다].",
        "시제및단서": "[미래] 내일의 계획입니다."
    },
    {
        "문장": "Cuando era niño, ( ) en Madrid.",
        "단어원형": "vivir, 살다",
        "정답": "vivía",
        "번역": "어렸을 때, 나는 마드리드에 [살았다].",
        "시제및단서": "[불완전과거] 과거의 지속적인 거주 상태입니다."
    },
    {
        "문장": "Es importante que ( ) las reglas.",
        "단어원형": "respetar, 존중하다/지키다",
        "정답": "respetes",
        "번역": "네가 규칙을 [지키는] 것이 중요하다.",
        "시제및단서": "[접속법 현재] 중요성 표현입니다."
    },
    {
        "문장": "Ayer ( ) una carta.",
        "단어원형": "escribir, 쓰다",
        "정답": "escribí",
        "번역": "어제 나는 편지를 [썼다].",
        "시제및단서": "[점과거] 어제 완료된 행위입니다."
    },
    {
        "문장": "Si ( ) rico, viajaría mucho.",
        "단어원형": "ser, 이다",
        "정답": "fuera",
        "번역": "내가 부자[라면], 여행을 많이 할 텐데.",
        "시제및단서": "[접속법 과거] 가정법 과거입니다."
    },
    {
        "문장": "Ojalá ( ) venir a la fiesta.",
        "단어원형": "poder, 할수있다",
        "정답": "pudieras",
        "번역": "네가 파티에 올 수 [있다면] 좋을 텐데.",
        "시제및단서": "[접속법 과거] 실현 가능성이 낮은 소망입니다."
    },
    {
        "문장": "El año pasado, ( ) un coche nuevo.",
        "단어원형": "comprar, 사다",
        "정답": "compré",
        "번역": "작년에 나는 새 차를 [샀다].",
        "시제및단서": "[점과거] 작년의 구매 행위입니다."
    },
    {
        "문장": "Antes, ( ) mucho deporte.",
        "단어원형": "hacer, 하다",
        "정답": "hacía",
        "번역": "예전에 나는 운동을 많이 [했었다].",
        "시제및단서": "[불완전과거] 과거의 습관입니다."
    },
    {
        "문장": "Quiero que ( ) conmigo.",
        "단어원형": "bailar, 춤추다",
        "정답": "bailes",
        "번역": "나는 네가 나와 함께 [춤추기를] 원한다.",
        "시제및단서": "[접속법 현재] 원함의 대상입니다."
    },
    {
        "문장": "Ayer ( ) a mi abuela.",
        "단어원형": "visitar, 방문하다",
        "정답": "visité",
        "번역": "어제 나는 할머니를 [방문했다].",
        "시제및단서": "[점과거] 어제 완료된 행위입니다."
    },
    {
        "문장": "Si ( ) sol, iremos a la playa.",
        "단어원형": "hacer, 하다(날씨)",
        "정답": "hace",
        "번역": "해가 [나면] (날씨가 맑으면), 우리는 해변에 갈 것이다.",
        "시제및단서": "[현재] 실현 가능한 조건입니다."
    },
    {
        "문장": "Mañana ( ) el proyecto.",
        "단어원형": "terminar, 끝내다",
        "정답": "terminaré",
        "번역": "내일 나는 프로젝트를 [끝낼 것이다].",
        "시제및단서": "[미래] 내일의 계획입니다."
    },
    {
        "문장": "¡( ) cuidado!",
        "단어원형": "tener, 가지다",
        "정답": "Ten",
        "번역": "조심[해]! (조심을 가져라)",
        "시제및단서": "[명령법] 긍정 명령형입니다."
    },
    {
        "문장": "Dudo que ( ) verdad.",
        "단어원형": "ser, 이다",
        "정답": "sea",
        "번역": "그것이 사실[일지] 의심스럽다.",
        "시제및단서": "[접속법 현재] 의심 표현입니다."
    },
    {
        "문장": "Anoche ( ) muy bien.",
        "단어원형": "cenar, 저녁식사하다",
        "정답": "cenamos",
        "번역": "어젯밤 우리는 아주 잘 [저녁을 먹었다].",
        "시제및단서": "[점과거] 어젯밤 완료된 식사입니다."
    },
    {
        "문장": "Cuando ( ) a casa, descansa.",
        "단어원형": "llegar, 도착하다",
        "정답": "llegues",
        "번역": "집에 [도착하면], 쉬어라.",
        "시제및단서": "[접속법 현재] 미래 시점의 시간 부사절입니다."
    },
    {
        "문장": "Ayer se ( ) la luz.",
        "단어원형": "ir, 가다/나가다",
        "정답": "fue",
        "번역": "어제 전기가 [나갔다].",
        "시제및단서": "[점과거] 어제 발생한 사건입니다."
    },
    {
        "문장": "Es necesario que ( ) más.",
        "단어원형": "leer, 읽다",
        "정답": "leas",
        "번역": "네가 더 많이 [읽는] 것이 필요하다.",
        "시제및단서": "[접속법 현재] 필요성 표현입니다."
    },
    {
        "문장": "El mes pasado, ( ) un viaje.",
        "단어원형": "hacer, 하다",
        "정답": "hice",
        "번역": "지난달에 나는 여행을 [했다].",
        "시제및단서": "[점과거] 지난달 완료된 행위입니다."
    },
    {
        "문장": "Si ( ) tiempo, lo haría.",
        "단어원형": "tener, 가지다",
        "정답": "tuviera",
        "번역": "시간이 [있다면], 그것을 할 텐데.",
        "시제및단서": "[접속법 과거] 가정법 과거입니다."
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
