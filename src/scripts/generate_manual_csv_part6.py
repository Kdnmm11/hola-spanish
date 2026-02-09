
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

# Manual Data 151-180
manual_data = [
    {
        "문장": "Todos los días, yo me ( ) a las siete.",
        "단어원형": "levantarse, 일어나다",
        "정답": "levanto",
        "번역": "매일 나는 7시에 [일어난다].",
        "시제및단서": "[현재] 'Todos los días'(매일) 반복되는 일상이므로 재귀동사 현재형(me levanto)을 씁니다."
    },
    {
        "문장": "Ayer, mi hermana se ( ) muy temprano.",
        "단어원형": "despertar, 깨다/일어나다",
        "정답": "despertó",
        "번역": "어제 내 여동생은 매우 일찍 [잠에서 깼다].",
        "시제및단서": "[점과거] 'Ayer' 완료된 행위입니다. (e->ie 변화는 점과거 3인칭 단수에서 일어나지 않음 -> despertó)",
    },
    {
        "문장": "Si te duele la cabeza, ( ) una aspirina.",
        "단어원형": "tomar, 먹다/복용하다",
        "정답": "toma",
        "번역": "머리가 아프면, 아스피린을 [먹어라].",
        "시제및단서": "[명령법] 조건(아프면)에 따른 조언/지시이므로 긍정 명령형(tú)을 씁니다."
    },
    {
        "문장": "Me parece que esta película ( ) aburrida.",
        "단어원형": "ser, 이다",
        "정답": "es",
        "번역": "내 생각에 이 영화는 지루한 것 [같다] (지루하다).",
        "시제및단서": "[현재] 'Me parece que'(~인 것 같다) 뒤에 긍정문이 오면 직설법을 씁니다."
    },
    {
        "문장": "Antes de comer, ¡( ) las manos!",
        "단어원형": "lavarse, 씻다",
        "정답": "lávate",
        "번역": "밥 먹기 전에 손을 [씻어라]!",
        "시제및단서": "[명령법] 재귀동사(lavarse)의 긍정 명령형은 동사 뒤에 대명사를 붙입니다(lava + te -> lávate)."
    },
    {
        "문장": "El mes pasado, nosotros nos ( ) a una casa nueva.",
        "단어원형": "mudar, 이사하다",
        "정답": "mudamos",
        "번역": "지난달에 우리는 새 집으로 [이사했다].",
        "시제및단서": "[점과거] 지난달 완료된 사건입니다."
    },
    {
        "문장": "No creo que Juan ( ) venir hoy.",
        "단어원형": "poder, 할수있다",
        "정답": "pueda",
        "번역": "나는 후안이 오늘 올 수 [있다고] 생각하지 않는다.",
        "시제및단서": "[접속법 현재] 'No creo que'(부정) 뒤에는 접속법을 씁니다."
    },
    {
        "문장": "Cuando ( ) 18 años, sacaré el carné de conducir.",
        "단어원형": "tener, 가지다(나이)",
        "정답": "tenga",
        "번역": "18살이 [되면], 나는 운전면허를 딸 것이다.",
        "시제및단서": "[접속법 현재] 미래의 시점(Cuando...)을 나타내는 부사절입니다."
    },
    {
        "문장": "Ayer nos ( ) mucho en la fiesta.",
        "단어원형": "divertirse, 즐기다",
        "정답": "divertimos",
        "번역": "어제 우리는 파티에서 매우 [즐거웠다] (즐겼다).",
        "시제및단서": "[점과거] 어제 있었던 완료된 경험입니다."
    },
    {
        "문장": "Es posible que mañana ( ) nieve.",
        "단어원형": "caer, 떨어지다/내리다",
        "정답": "caiga",
        "번역": "내일 눈이 [내릴] 가능성이 있다.",
        "시제및단서": "[접속법 현재] 가능성(Es posible que)을 나타냅니다."
    },
    {
        "문장": "Siempre me ( ) los zapatos antes de entrar.",
        "단어원형": "quitar, 벗다",
        "정답": "quito",
        "번역": "나는 들어가기 전에 항상 신발을 [벗는다].",
        "시제및단서": "[현재] 반복적인 습관입니다. (me quito)",
    },
    {
        "문장": "Si yo ( ) tú, estudiaría más.",
        "단어원형": "ser, 이다",
        "정답": "fuera",
        "번역": "내가 너[라면], 공부를 더 할 텐데.",
        "시제및단서": "[접속법 과거] 가정법 과거의 조건절입니다."
    },
    {
        "문장": "Anoche, ellos se ( ) muy tarde.",
        "단어원형": "acostar, 잠자리에들다",
        "정답": "acostaron",
        "번역": "어젯밤 그들은 매우 늦게 [잠자리에 들었다].",
        "시제및단서": "[점과거] 어젯밤 완료된 행위입니다."
    },
    {
        "문장": "Quiero que vosotros me ( ) la verdad.",
        "단어원형": "decir, 말하다",
        "정답": "digáis",
        "번역": "나는 너희들이 내게 진실을 [말하기를] 원한다.",
        "시제및단서": "[접속법 현재] 원함(Quiero que)의 대상입니다."
    },
    {
        "문장": "En 2020, yo ( ) mi propia empresa.",
        "단어원형": "crear, 창조하다/설립하다",
        "정답": "creé",
        "번역": "2020년에 나는 내 회사를 [설립했다].",
        "시제및단서": "[점과거] 특정 연도에 완료된 사건입니다."
    },
    {
        "문장": "¡( ) aquí! No te vayas.",
        "단어원형": "quedarse, 머물다/남다",
        "정답": "Quédate",
        "번역": "여기 [머물러]! 가지 마.",
        "시제및단서": "[명령법] 재귀동사 긍정 명령형(tú)입니다. (quoda + te -> quédate)",
    },
    {
        "문장": "Mientras cocinaba, se me ( ) la leche.",
        "단어원형": "caer, 떨어지다/쏟다",
        "정답": "cayó",
        "번역": "요리하다가 우유를 [쏟았다] (우유가 떨어졌다).",
        "시제및단서": "[점과거] 우발적 사건(se me cayó)입니다."
    },
    {
        "문장": "Dudo que ellos ( ) a tiempo.",
        "단어원형": "llegar, 도착하다",
        "정답": "lleguen",
        "번역": "그들이 제시간에 [도착할지] 의심스럽다.",
        "시제및단서": "[접속법 현재] 의심(Dudo que) 표현입니다."
    },
    {
        "문장": "Ayer ( ) un buen día.",
        "단어원형": "hacer, 하다(날씨)",
        "정답": "hizo",
        "번역": "어제는 날씨가 [좋았다] (좋은 날씨를 했다).",
        "시제및단서": "[점과거] 어제 하루의 날씨를 완료된 사실로 요약할 때 점과거를 쓸 수 있습니다."
    },
    {
        "문장": "Si ( ) dinero, te lo prestaría.",
        "단어원형": "tener, 가지다",
        "정답": "tuviera",
        "번역": "돈이 [있다면], 네게 빌려줄 텐데.",
        "시제및단서": "[접속법 과거] 현재 돈이 없는 상황을 가정합니다."
    },
    {
        "문장": "Me ( ) la cabeza.",
        "단어원형": "doler, 아프다",
        "정답": "duele",
        "번역": "나는 머리가 [아프다].",
        "시제및단서": "[현재] 현재의 신체 상태를 나타냅니다. (역구조 동사: la cabeza가 주어)",
    },
    {
        "문장": "Es importante que ( ) ejercicio regularmente.",
        "단어원형": "hacer, 하다",
        "정답": "hagas",
        "번역": "규칙적으로 운동을 [하는] 것은 중요하다.",
        "시제및단서": "[접속법 현재] 가치 판단(Es importante que)입니다."
    },
    {
        "문장": "El año pasado, nosotros nos ( ) en París.",
        "단어원형": "conocer, 알다/만나다",
        "정답": "conocimos",
        "번역": "작년에 우리는 파리에서 서로 [알게 되었다] (만났다).",
        "시제및단서": "[점과거] 작년에 발생한 상호적 행위(nos conocimos)입니다."
    },
    {
        "문장": "Ojalá no ( ) mañana.",
        "단어원형": "llover, 비오다",
        "정답": "llueva",
        "번역": "내일 비가 [오지 않기를] 바란다.",
        "시제및단서": "[접속법 현재] Ojalá 소망 표현입니다."
    },
    {
        "문장": "Ayer por la tarde, yo ( ) con mi madre.",
        "단어원형": "hablar, 말하다",
        "정답": "hablé",
        "번역": "어제 오후에 나는 어머니와 [통화했다] (말했다).",
        "시제및단서": "[점과거] 어제 오후 완료된 행위입니다."
    },
    {
        "문장": "Si estudias, ( ) buenas notas.",
        "단어원형": "sacar, 꺼내다/받다(점수)",
        "정답": "sacarás",
        "번역": "공부하면, 좋은 점수를 [받을 것이다].",
        "시제및단서": "[미래] 실현 가능한 조건의 결과입니다."
    },
    {
        "문장": "No me ( ) lo que dices.",
        "단어원형": "importar, 중요하다/상관있다",
        "정답": "importa",
        "번역": "네가 말하는 것은 내게 [상관없다] (중요하지 않다).",
        "시제및단서": "[현재] 현재의 상태/감정입니다. (역구조 동사)",
    },
    {
        "문장": "Cuando ( ) a casa, llámame.",
        "단어원형": "volver, 돌아오다",
        "정답": "vuelvas",
        "번역": "집에 [돌아오면], 전화해 줘.",
        "시제및단서": "[접속법 현재] 미래 시점의 시간 부사절입니다."
    },
    {
        "문장": "Ayer se ( ) el coche.",
        "단어원형": "estropear, 고장나다",
        "정답": "estropeó",
        "번역": "어제 차가 [고장 났다].",
        "시제및단서": "[점과거] 어제 발생한 우발적 사건입니다."
    },
    {
        "문장": "Quiero que tú me ( ) un favor.",
        "단어원형": "hacer, 하다",
        "정답": "hagas",
        "번역": "네가 내게 부탁을 하나 [들어주기를] 원한다.",
        "시제및단서": "[접속법 현재] 원함(Quiero que)의 대상입니다."
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
