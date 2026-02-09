
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

# Manual Data 421-450
manual_data = [
    {
        "문장": "¡( ) paciencia!",
        "단어원형": "tener, 가지다",
        "정답": "Ten",
        "번역": "인내심을 [가져라]!",
        "시제및단서": "[명령법] 긍정 명령형(tú)입니다."
    },
    {
        "문장": "Ayer ( ) mi cumpleaños.",
        "단어원형": "ser, 이다",
        "정답": "fue",
        "번역": "어제는 내 생일[이었다].",
        "시제및단서": "[점과거] 어제라는 시간 전체를 정의하는 완료된 사실입니다."
    },
    {
        "문장": "Si yo ( ) tú, no lo compraría.",
        "단어원형": "ser, 이다",
        "정답": "fuera",
        "번역": "내가 너[라면], 그걸 사지 않을 텐데.",
        "시제및단서": "[접속법 과거] 불가능한 가정입니다."
    },
    {
        "문장": "Mañana no ( ) ir a trabajar.",
        "단어원형": "poder, 할수있다",
        "정답": "podré",
        "번역": "내일 나는 일하러 갈 수 [없을 것이다].",
        "시제및단서": "[미래] 내일의 불가능 예측입니다."
    },
    {
        "문장": "Espero que ( ) pronto.",
        "단어원형": "volver, 돌아오다",
        "정답": "vuelvas",
        "번역": "네가 빨리 [돌아오기를] 바란다.",
        "시제및단서": "[접속법 현재] 소망 표현입니다."
    },
    {
        "문장": "Ayer ( ) mucho frío.",
        "단어원형": "hacer, 하다(날씨)",
        "정답": "hacía",
        "번역": "어제는 날씨가 매우 [추웠다].",
        "시제및단서": "[불완전과거] 과거 날씨 묘사입니다."
    },
    {
        "문장": "Cuando ( ) tiempo, leeré ese libro.",
        "단어원형": "tener, 가지다",
        "정답": "tenga",
        "번역": "시간이 [생기면] (가질 때), 그 책을 읽을 것이다.",
        "시제및단서": "[접속법 현재] 미래 시점입니다."
    },
    {
        "문장": "El año pasado, ( ) a Londres.",
        "단어원형": "viajar, 여행하다",
        "정답": "viajé",
        "번역": "작년에 나는 런던으로 [여행했다].",
        "시제및단서": "[점과거] 작년에 완료된 행위입니다."
    },
    {
        "문장": "Dudo que ella ( ) la respuesta.",
        "단어원형": "saber, 알다",
        "정답": "sepa",
        "번역": "그녀가 정답을 [안다고] 생각하지 않는다 (의심스럽다).",
        "시제및단서": "[접속법 현재] 의심 표현입니다."
    },
    {
        "문장": "Si ( ) más, aprobaría.",
        "단어원형": "estudiar, 공부하다",
        "정답": "estudiara",
        "번역": "공부를 더 [한다면], 합격할 텐데.",
        "시제및단서": "[접속법 과거] 현재 공부 부족을 가정합니다."
    },
    {
        "문장": "Mañana ( ) a cenar.",
        "단어원형": "salir, 나가다/외출하다",
        "정답": "saldremos",
        "번역": "내일 우리는 저녁 먹으러 [나갈 것이다].",
        "시제및단서": "[미래] 내일의 계획입니다."
    },
    {
        "문장": "Me ( ) mucho este lugar.",
        "단어원형": "gustar, 좋아하다",
        "정답": "gusta",
        "번역": "나는 이 장소를 많이 [좋아한다].",
        "시제및단서": "[현재] 기호입니다."
    },
    {
        "문장": "Cuando era niño, ( ) mucho.",
        "단어원형": "llorar, 울다",
        "정답": "lloraba",
        "번역": "어렸을 때, 나는 많이 [울곤 했다].",
        "시제및단서": "[불완전과거] 과거의 습관입니다."
    },
    {
        "문장": "Es importante que ( ) la verdad.",
        "단어원형": "decir, 말하다",
        "정답": "digas",
        "번역": "네가 진실을 [말하는] 것이 중요하다.",
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
        "시제및단서": "[접속법 현재] 감정 유발입니다."
    },
    {
        "문장": "El mes pasado, ( ) un coche.",
        "단어원형": "vender, 팔다",
        "정답": "vendí",
        "번역": "지난달에 나는 차를 [팔았다].",
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
        "문장": "Ayer se ( ) el coche.",
        "단어원형": "romper, 고장나다",
        "정답": "rompió",
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
        "문장": "El año que viene, ( ) inglés.",
        "단어원형": "estudiar, 공부하다",
        "정답": "estudiaré",
        "번역": "내년에 나는 영어를 [공부할 것이다].",
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
