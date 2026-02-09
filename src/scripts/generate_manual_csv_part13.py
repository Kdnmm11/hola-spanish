
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

# Manual Data 361-390
manual_data = [
    {
        "문장": "Quisiera que me ( ) un consejo.",
        "단어원형": "dar, 주다",
        "정답": "dieras",
        "번역": "네가 내게 조언을 [주었으면] 한다.",
        "시제및단서": "[접속법 과거] 'Quisiera que'(정중한 바람) 뒤에는 접속법 과거를 씁니다."
    },
    {
        "문장": "No ( ) hacerlo sola.",
        "단어원형": "poder, 할수있다",
        "정답": "puedo",
        "번역": "나는 그것을 혼자 할 수 [없다].",
        "시제및단서": "[현재] 현재의 능력(불가능)을 나타냅니다."
    },
    {
        "문장": "Pronto ( ) la respuesta.",
        "단어원형": "saber, 알다",
        "정답": "sabrás",
        "번역": "곧 너는 정답을 [알게 될 것이다].",
        "시제및단서": "[미래] 'Pronto'(곧) 일어날 일에 대한 예측입니다."
    },
    {
        "문장": "¡( ) ya de aquí!",
        "단어원형": "ir, 가다/떠나다",
        "정답": "Vete",
        "번역": "여기서 당장 [가] (떠나)!",
        "시제및단서": "[명령법] 'irse'의 긍정 명령형(tú)입니다."
    },
    {
        "문장": "Ayer, el cielo ( ) nublado.",
        "단어원형": "estar, 있다",
        "정답": "estaba",
        "번역": "어제 하늘은 흐려 [있었다].",
        "시제및단서": "[불완전과거] 과거의 날씨 상태 묘사입니다."
    },
    {
        "문장": "Si ( ) la respuesta, dímela.",
        "단어원형": "saber, 알다",
        "정답": "sabes",
        "번역": "정답을 [안다면], 내게 말해줘.",
        "시제및단서": "[현재] 실현 가능한 조건입니다."
    },
    {
        "문장": "El año pasado, ( ) el primer premio.",
        "단어원형": "ganar, 이기다/받다",
        "정답": "gané",
        "번역": "작년에 나는 1등 상을 [받았다].",
        "시제및단서": "[점과거] 작년에 완료된 사건입니다."
    },
    {
        "문장": "Espero que no ( ) nada grave.",
        "단어원형": "ser, 이다",
        "정답": "sea",
        "번역": "심각한 일이 [아니기를] 바란다.",
        "시제및단서": "[접속법 현재] 소망 표현입니다."
    },
    {
        "문장": "Cuando ( ) dinero, viajaré.",
        "단어원형": "tener, 가지다",
        "정답": "tenga",
        "번역": "돈이 [생기면] (가질 때), 나는 여행할 것이다.",
        "시제및단서": "[접속법 현재] 미래 시점의 시간 부사절입니다."
    },
    {
        "문장": "Anoche ( ) mucho viento.",
        "단어원형": "hacer, 하다(날씨)",
        "정답": "hizo",
        "번역": "어젯밤 바람이 많이 [불었다].",
        "시제및단서": "[점과거] 어젯밤의 날씨를 완료된 사실로 봅니다."
    },
    {
        "문장": "Si yo ( ) médico, curaría a todos.",
        "단어원형": "ser, 이다",
        "정답": "fuera",
        "번역": "내가 의사[라면], 모두를 치료할 텐데.",
        "시제및단서": "[접속법 과거] 현재 불가능한 가정입니다."
    },
    {
        "문장": "¡No ( ) tonterías!",
        "단어원형": "decir, 말하다",
        "정답": "digas",
        "번역": "바보 같은 소리 [하지 마]!",
        "시제및단서": "[부정 명령법] 금지 명령(tú)입니다."
    },
    {
        "문장": "Mañana ( ) una reunión.",
        "단어원형": "tener, 가지다",
        "정답": "tendremos",
        "번역": "내일 우리는 회의가 [있을 것이다].",
        "시제및단서": "[미래] 내일의 예정입니다."
    },
    {
        "문장": "Me ( ) la espalda.",
        "단어원형": "doler, 아프다",
        "정답": "duele",
        "번역": "나는 등이 [아프다].",
        "시제및단서": "[현재] 현재의 신체 통증입니다."
    },
    {
        "문장": "Es importante que ( ) los dientes.",
        "단어원형": "cepillarse, 닦다(이)",
        "정답": "te cepilles",
        "번역": "네가 이를 [닦는] 것이 중요하다.",
        "시제및단서": "[접속법 현재] 중요성 표현입니다."
    },
    {
        "문장": "Ayer ( ) a mi hermana.",
        "단어원형": "ver, 보다/만나다",
        "정답": "vi",
        "번역": "어제 나는 내 여동생을 [보았다].",
        "시제및단서": "[점과거] 어제 완료된 만남입니다."
    },
    {
        "문장": "Si ( ) buen tiempo, saldremos.",
        "단어원형": "hacer, 하다(날씨)",
        "정답": "hace",
        "번역": "날씨가 [좋으면], 우리는 나갈 것이다.",
        "시제및단서": "[현재] 실현 가능한 조건입니다."
    },
    {
        "문장": "Dudo que ( ) cierto.",
        "단어원형": "ser, 이다",
        "정답": "sea",
        "번역": "그것이 확실[한지] 의심스럽다.",
        "시제및단서": "[접속법 현재] 의심 표현입니다."
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
        "단어원형": "correr, 달리다",
        "정답": "corría",
        "번역": "어렸을 때, 나는 많이 [달리곤 했다].",
        "시제및단서": "[불완전과거] 과거의 습관입니다."
    },
    {
        "문장": "¡( ) aquí!",
        "단어원형": "quedarse, 머물다",
        "정답": "Quédate",
        "번역": "여기 [머물러]!",
        "시제및단서": "[명령법] 재귀동사 긍정 명령형입니다."
    },
    {
        "문장": "Es necesario que ( ) la verdad.",
        "단어원형": "decir, 말하다",
        "정답": "digas",
        "번역": "네가 진실을 [말하는] 것이 필요하다.",
        "시제및단서": "[접속법 현재] 필요성 표현입니다."
    },
    {
        "문장": "Ayer no ( ) nada.",
        "단어원형": "comprar, 사다",
        "정답": "compré",
        "번역": "어제 나는 아무것도 [사지 않았다].",
        "시제및단서": "[점과거] 어제 완료된 행위입니다."
    },
    {
        "문장": "Si ( ) dinero, viajaría.",
        "단어원형": "tener, 가지다",
        "정답": "tuviera",
        "번역": "돈이 [있다면], 여행할 텐데.",
        "시제및단서": "[접속법 과거] 가정법 과거입니다."
    },
    {
        "문장": "Mañana ( ) a casa.",
        "단어원형": "volver, 돌아오다",
        "정답": "volveré",
        "번역": "내일 나는 집으로 [돌아올 것이다].",
        "시제및단서": "[미래] 내일의 계획입니다."
    },
    {
        "문장": "Me ( ) la música.",
        "단어원형": "encantar, 매우좋아하다",
        "정답": "encanta",
        "번역": "나는 음악을 매우 [좋아한다].",
        "시제및단서": "[현재] 현재의 기호입니다."
    },
    {
        "문장": "Cuando ( ) a la oficina, empieza.",
        "단어원형": "llegar, 도착하다",
        "정답": "llegues",
        "번역": "사무실에 [도착하면], 시작해라.",
        "시제및단서": "[접속법 현재] 미래 시점입니다."
    },
    {
        "문장": "Ayer se ( ) el teléfono.",
        "단어원형": "romper, 고장나다",
        "정답": "rompió",
        "번역": "어제 전화기가 [고장 났다].",
        "시제및단서": "[점과거] 어제 발생한 사건입니다."
    },
    {
        "문장": "Es probable que ( ) pronto.",
        "단어원형": "llegar, 도착하다",
        "정답": "lleguen",
        "번역": "그들이 곧 [도착할] 것 같다.",
        "시제및단서": "[접속법 현재] 가능성 표현입니다."
    },
    {
        "문장": "El mes pasado, ( ) un coche.",
        "단어원형": "vender, 팔다",
        "정답": "vendí",
        "번역": "지난달에 나는 차를 [팔았다].",
        "시제및단서": "[점과거] 지난달 완료된 매매입니다."
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
