
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

# Manual Data 271-300
manual_data = [
    {
        "문장": "( ) pedirle un favor.",
        "단어원형": "querer, 원하다/하고싶다",
        "정답": "Quisiera",
        "번역": "부탁을 하나 드리고 [싶습니다] (원합니다).",
        "시제및단서": "[접속법 과거] 'Quisiera'는 정중하게 부탁할 때 사용하는 접속법 과거형입니다."
    },
    {
        "문장": "¿( ) ayudarme con esto?",
        "단어원형": "poder, 할수있다",
        "정답": "Puedes",
        "번역": "이것 좀 도와줄 수 [있니]?",
        "시제및단서": "[현재] 상대방(tú)에게 능력을 묻거나 부탁할 때 씁니다."
    },
    {
        "문장": "Nadie lo ( ) jamás.",
        "단어원형": "saber, 알다",
        "정답": "sabrá",
        "번역": "아무도 그것을 결코 [알지 못할 것이다].",
        "시제및단서": "[미래] 미래에 대한 강한 추측이나 예측입니다."
    },
    {
        "문장": "¡( ) a casa ahora mismo!",
        "단어원형": "ir, 가다",
        "정답": "Vete",
        "번역": "지금 당장 집으로 [가] (가버려)!",
        "시제및단서": "[명령법] 'irse'의 긍정 명령형(tú)은 'vete'입니다."
    },
    {
        "문장": "Ayer, mi perro ( ) enfermo.",
        "단어원형": "estar, 있다",
        "정답": "estuvo",
        "번역": "어제 내 개는 아파서 [있었다] (아팠다).",
        "시제및단서": "[점과거] 어제 있었던 상태입니다."
    },
    {
        "문장": "Si ( ) la verdad, dímelo.",
        "단어원형": "saber, 알다",
        "정답": "sabes",
        "번역": "진실을 [안다면], 내게 말해줘.",
        "시제및단서": "[현재] 실현 가능한 조건입니다."
    },
    {
        "문장": "El año pasado, ( ) un premio.",
        "단어원형": "ganar, 이기다/받다(상)",
        "정답": "gané",
        "번역": "작년에 나는 상을 [받았다].",
        "시제및단서": "[점과거] 작년에 완료된 사건입니다."
    },
    {
        "문장": "Espero que no ( ) tarde.",
        "단어원형": "ser, 이다",
        "정답": "sea",
        "번역": "늦지 [않기를] (늦은 것이 아니기를) 바란다.",
        "시제및단서": "[접속법 현재] 소망 표현입니다."
    },
    {
        "문장": "Cuando ( ) tiempo, llámame.",
        "단어원형": "tener, 가지다",
        "정답": "tengas",
        "번역": "시간이 [나면] (가질 때), 전화해.",
        "시제및단서": "[접속법 현재] 미래 시점의 시간 부사절입니다."
    },
    {
        "문장": "Anoche ( ) mucho.",
        "단어원형": "llover, 비오다",
        "정답": "llovió",
        "번역": "어젯밤 비가 많이 [왔다].",
        "시제및단서": "[점과거] 어젯밤 완료된 날씨 사건입니다."
    },
    {
        "문장": "Si yo ( ) presidente, cambiaría muchas cosas.",
        "단어원형": "ser, 이다",
        "정답": "fuera",
        "번역": "내가 대통령이[라면], 많은 것을 바꿀 텐데.",
        "시제및단서": "[접속법 과거] 현재 불가능한 가정입니다."
    },
    {
        "문장": "¡No ( ) ruido!",
        "단어원형": "hacer, 하다",
        "정답": "hagáis",
        "번역": "(너희들) 떠들지 [마] (소음 만들지 마)!",
        "시제및단서": "[부정 명령법] 너희들(vosotros)에 대한 부정 명령은 접속법 현재형(hagáis)을 씁니다."
    },
    {
        "문장": "Mañana ( ) un examen.",
        "단어원형": "tener, 가지다",
        "정답": "tendremos",
        "번역": "내일 우리는 시험이 [있을 것이다].",
        "시제및단서": "[미래] 내일의 예정입니다."
    },
    {
        "문장": "Me ( ) mucho la cabeza.",
        "단어원형": "doler, 아프다",
        "정답": "dolía",
        "번역": "나는 머리가 많이 [아팠다].",
        "시제및단서": "[불완전과거] 과거의 지속적인 통증 상태였습니다."
    },
    {
        "문장": "Es importante que ( ) las manos.",
        "단어원형": "lavarse, 씻다",
        "정답": "os lavéis",
        "번역": "(너희들이) 손을 [씻는] 것이 중요하다.",
        "시제및단서": "[접속법 현재] 중요성 표현입니다."
    },
    {
        "문장": "Ayer ( ) a mi primo.",
        "단어원형": "ver, 보다/만나다",
        "정답": "vi",
        "번역": "어제 나는 사촌을 [만났다].",
        "시제및단서": "[점과거] 어제 완료된 만남입니다."
    },
    {
        "문장": "Si ( ) sol, vamos a la playa.",
        "단어원형": "hacer, 하다(날씨)",
        "정답": "hace",
        "번역": "해가 [나면], 해변에 가자.",
        "시제및단서": "[현재] 실현 가능한 조건입니다."
    },
    {
        "문장": "Dudo que ( ) verdad.",
        "단어원형": "ser, 이다",
        "정답": "sea",
        "번역": "그것이 사실[인지] 의심스럽다.",
        "시제및단서": "[접속법 현재] 의심 표현입니다."
    },
    {
        "문장": "El año pasado, ( ) mucho dinero.",
        "단어원형": "ganar, 벌다/이기다",
        "정답": "gané",
        "번역": "작년에 나는 돈을 많이 [벌었다].",
        "시제및단서": "[점과거] 작년에 완료된 행위입니다."
    },
    {
        "문장": "Cuando era niño, ( ) en bicicleta.",
        "단어원형": "andar, 걷다/타다",
        "정답": "andaba",
        "번역": "어렸을 때, 나는 자전거를 [타곤 했다].",
        "시제및단서": "[불완전과거] 과거의 습관입니다."
    },
    {
        "문장": "¡( ) aquí!",
        "단어원형": "venir, 오다",
        "정답": "Venid",
        "번역": "(너희들) 이리 [와]!",
        "시제및단서": "[명령법] 'vosotros' 긍정 명령형은 동사 원형의 'r'을 'd'로 바꿉니다(Venir -> Venid)."
    },
    {
        "문장": "Es necesario que ( ) ahora.",
        "단어원형": "salir, 나가다/떠나다",
        "정답": "salgas",
        "번역": "네가 지금 [떠나는] 것이 필요하다.",
        "시제및단서": "[접속법 현재] 필요성 표현입니다."
    },
    {
        "문장": "Ayer no ( ) nada.",
        "단어원형": "comer, 먹다",
        "정답": "comí",
        "번역": "어제 나는 아무것도 [먹지 않았다].",
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
        "문장": "Mañana ( ) a cenar.",
        "단어원형": "salir, 나가다/외출하다",
        "정답": "saldré",
        "번역": "내일 나는 저녁 먹으러 [나갈 것이다].",
        "시제및단서": "[미래] 내일의 계획입니다."
    },
    {
        "문장": "Me ( ) mucho este libro.",
        "단어원형": "gustar, 좋아하다",
        "정답": "gusta",
        "번역": "나는 이 책을 많이 [좋아한다].",
        "시제및단서": "[현재] 현재의 기호입니다."
    },
    {
        "문장": "Cuando ( ) a casa, descansa.",
        "단어원형": "llegar, 도착하다",
        "정답": "llegues",
        "번역": "집에 [도착하면], 쉬어라.",
        "시제및단서": "[접속법 현재] 미래 시점입니다."
    },
    {
        "문장": "Ayer se ( ) el coche.",
        "단어원형": "romper, 부수다/고장나다",
        "정답": "rompió",
        "번역": "어제 차가 [고장 났다].",
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
        "문장": "El mes pasado, ( ) un libro.",
        "단어원형": "escribir, 쓰다",
        "정답": "escribí",
        "번역": "지난달에 나는 책을 한 권 [썼다].",
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
