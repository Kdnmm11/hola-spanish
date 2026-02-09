
import csv

# Helper to generate ALL conjugations for distractors
def get_all_conjugations(verb):
    stem = verb[:-2]
    ending = verb[-2:]
    
    forms = []
    
    # Simple Regular Patterns (Just for generating distractors pool)
    patterns = {
        'ar': {
            'pres': ['o', 'as', 'a', 'amos', 'áis', 'an'],
            'imp': ['aba', 'abas', 'aba', 'ábamos', 'abais', 'aban'],
            'pret': ['é', 'aste', 'ó', 'amos', 'asteis', 'aron'],
            'fut': ['aré', 'arás', 'ará', 'aremos', 'aréis', 'arán'],
            'cond': ['aría', 'arías', 'aría', 'aríamos', 'aríais', 'arían'],
            'sub_pres': ['e', 'es', 'e', 'emos', 'éis', 'en']
        },
        'er': {
            'pres': ['o', 'es', 'e', 'emos', 'éis', 'en'],
            'imp': ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'],
            'pret': ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'],
            'fut': ['eré', 'erás', 'erá', 'eremos', 'eréis', 'erán'],
            'cond': ['ería', 'erías', 'ería', 'eríamos', 'eríais', 'erían'],
            'sub_pres': ['a', 'as', 'a', 'amos', 'áis', 'an']
        },
        'ir': {
            'pres': ['o', 'es', 'e', 'imos', 'ís', 'en'],
            'imp': ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'],
            'pret': ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'],
            'fut': ['iré', 'irás', 'irá', 'iremos', 'iréis', 'irán'],
            'cond': ['iría', 'irías', 'iría', 'iríamos', 'iríais', 'irían'],
            'sub_pres': ['a', 'as', 'a', 'amos', 'áis', 'an']
        }
    }
    
    if ending not in patterns: return []
    
    for tense, suffixes in patterns[ending].items():
        for s in suffixes:
            forms.append(stem + s)
            
    return list(set(forms)) # Unique only

# High-quality Manual Data (30 items)
manual_data = [
    {
        "문장": "Aunque llueva mañana, nosotros ( ) al partido de fútbol.",
        "단어원형": "ir, 가다",
        "정답": "iremos",
        "번역": "내일 비가 오더라도, 우리는 축구 경기를 보러 [갈 것이다].",
        "시제및단서": "[미래] 'Mañana'(내일)라는 명확한 미래 시점 부사가 있고, 양보절(Aunque) 뒤 주절이므로 미래 시제를 사용합니다."
    },
    {
        "문장": "Cuando era pequeño, mi abuela siempre me ( ) cuentos antes de dormir.",
        "단어원형": "contar, 이야기하다",
        "정답": "contaba",
        "번역": "내가 어렸을 때, 할머니는 항상 자기 전에 내게 동화를 [들려주곤 하셨다].",
        "시제및단서": "[불완전과거] 'Cuando era pequeño'(어렸을 때)와 'siempre'(항상)가 결합되어 과거의 반복적인 습관을 나타냅니다."
    },
    {
        "문장": "Espero que tú ( ) pronto de tu enfermedad.",
        "단어원형": "recuperarse, 회복하다",
        "정답": "te recuperes",
        "번역": "나는 네가 병에서 빨리 [회복하기를] 바란다.",
        "시제및단서": "[접속법 현재] 'Espero que'(~하기를 바란다) 구문 뒤에는 소망을 나타내는 접속법이 옵니다."
    },
    {
        "문장": "Anoche, mis amigos y yo ( ) en un restaurante italiano.",
        "단어원형": "cenar, 저녁식사하다",
        "정답": "cenamos",
        "번역": "어젯밤, 내 친구들과 나는 이탈리아 식당에서 [저녁을 먹었다].",
        "시제및단서": "[점과거] 'Anoche'(어젯밤)이라는 특정 과거 시점에 완료된 행위이므로 점과거(단순과거)를 사용합니다."
    },
    {
        "문장": "Si tuviera mucho dinero, me ( ) una casa en la playa.",
        "단어원형": "comprar, 사다",
        "정답": "compraría",
        "번역": "만약 돈이 많다면, 나는 해변가에 집을 [살 텐데].",
        "시제및단서": "[조건법] 'Si tuviera...'(가정법 과거) 조건절에 대응하는 주절에는 조건법(가능법)을 사용합니다."
    },
    {
        "문장": "Normalmente, yo ( ) el autobús para ir al trabajo a las 8.",
        "단어원형": "tomar, 타다/집다",
        "정답": "tomo",
        "번역": "보통 나는 8시에 출근하기 위해 버스를 [탄다].",
        "시제및단서": "[현재] 'Normalmente'(보통)는 현재의 반복적인 습관이나 일상을 나타내므로 직설법 현재를 씁니다."
    },
    {
        "문장": "¡( ) cuidado! El suelo está mojado.",
        "단어원형": "tener, 가지다",
        "정답": "Ten",
        "번역": "조심[해]! 바닥이 젖어 있어.",
        "시제및단서": "[명령법] 상대방(tú)에게 주의를 주는 직접적인 명령 상황이므로 긍정 명령형을 사용합니다."
    },
    {
        "문장": "Esta mañana no ( ) el desayuno porque me levanté tarde.",
        "단어원형": "hacer, 하다/만들다",
        "정답": "he hecho",
        "번역": "오늘 아침에는 늦게 일어나서 아침 식사를 [하지 못했다] (준비하지 않았다).",
        "시제및단서": "[현재완료] 'Esta mañana'(오늘 아침)는 아직 현재와 연결된 과거이므로 스페인 본토에서는 주로 현재완료를 씁니다."
    },
    {
        "문장": "Mientras estudiaba, de repente ( ) el teléfono.",
        "단어원형": "sonar, 울리다",
        "정답": "sonó",
        "번역": "공부하는 동안, 갑자기 전화벨이 [울렸다].",
        "시제및단서": "[점과거] 'Mientras estudiaba'(진행 중이던 배경) 중에 'de repente'(갑자기) 발생한 일회성 사건은 점과거로 표현합니다."
    },
    {
        "문장": "No creo que Juan ( ) la verdad sobre lo ocurrido.",
        "단어원형": "saber, 알다",
        "정답": "sepa",
        "번역": "나는 후안이 일어난 일에 대한 진실을 [안다고] 생각하지 않는다.",
        "시제및단서": "[접속법 현재] 'No creo que'(~라고 생각하지 않는다)는 의심이나 부정을 나타내므로 종속절에 접속법을 씁니다."
    },
    {
        "문장": "El año que viene, mi hermana ( ) medicina en la universidad.",
        "단어원형": "estudiar, 공부하다",
        "정답": "estudiará",
        "번역": "내년에 내 여동생은 대학에서 의학을 [공부할 것이다].",
        "시제및단서": "[미래] 'El año que viene'(내년)이라는 명확한 미래 시점이 주어졌으므로 미래 시제를 사용합니다."
    },
    {
        "문장": "Antes, esta ciudad ( ) mucho más tranquila que ahora.",
        "단어원형": "ser, 이다",
        "정답": "era",
        "번역": "예전에 이 도시는 지금보다 훨씬 더 조용[했었다].",
        "시제및단서": "[불완전과거] 'Antes'(예전에는)와 함께 과거의 상태나 특성을 묘사(descripción)하고 있으므로 불완전과거를 씁니다."
    },
    {
        "문장": "Por favor, ( ) la puerta al salir.",
        "단어원형": "cerrar, 닫다",
        "정답": "cierra",
        "번역": "나갈 때 문을 [닫아] 주세요.",
        "시제및단서": "[명령법] 'Por favor'와 함께 상대방에게 구체적인 행동을 요청하므로 명령형(tú)을 사용합니다."
    },
    {
        "문장": "Ayer por la tarde, nosotros ( ) por el parque durante una hora.",
        "단어원형": "caminar, 걷다",
        "정답": "caminamos",
        "번역": "어제 오후에 우리는 한 시간 동안 공원을 [걸었다].",
        "시제및단서": "[점과거] 'Ayer por la tarde'(어제 오후)에 'durante una hora'(한 시간 동안) 지속되고 완료된 행위입니다."
    },
    {
        "문장": "Si hace buen tiempo mañana, ( ) a la playa.",
        "단어원형": "ir, 가다",
        "정답": "iremos",
        "번역": "내일 날씨가 좋다면, 우리는 해변에 [갈 것이다].",
        "시제및단서": "[미래] 'Si hace...'(현재 조건) 뒤에 오는 주절은 실현 가능한 미래의 결과를 나타내므로 미래 시제를 씁니다."
    },
    {
        "문장": "Me molesta que tú siempre ( ) tarde.",
        "단어원형": "llegar, 도착하다",
        "정답": "llegues",
        "번역": "네가 항상 늦게 [도착하는] 것이 나는 짜증난다.",
        "시제및단서": "[접속법 현재] 'Me molesta que'(감정 유발 동사) 구문 뒤에는 원인이 되는 사실을 접속법으로 표현합니다."
    },
    {
        "문장": "En 2010, yo ( ) mi primer coche.",
        "단어원형": "comprar, 사다",
        "정답": "compré",
        "번역": "2010년에 나는 내 첫 차를 [샀다].",
        "시제및단서": "[점과거] 'En 2010'이라는 과거의 특정 연도에 발생한 일회성 완료 사건입니다."
    },
    {
        "문장": "Cuando llegué a casa, mi madre ya ( ) la cena.",
        "단어원형": "preparar, 준비하다",
        "정답": "había preparado",
        "번역": "내가 집에 도착했을 때, 어머니는 이미 저녁 식사를 [준비하셨었다].",
        "시제및단서": "[과거완료] 과거의 특정 시점(llegué)보다 더 이전에 완료된 일(대과거)을 나타내므로 과거완료(había p.p.)를 씁니다."
    },
    {
        "문장": "Dudo que ellos ( ) la solución al problema.",
        "단어원형": "tener, 가지다",
        "정답": "tengan",
        "번역": "그들이 문제의 해결책을 [가지고 있는지] 의심스럽다.",
        "시제및단서": "[접속법 현재] 'Dudo que'(~인지 의심하다)는 불확실성을 나타내므로 종속절에 접속법을 사용합니다."
    },
    {
        "문장": "Mañana a estas horas, yo ( ) viajando a París.",
        "단어원형": "estar, 있다",
        "정답": "estaré",
        "번역": "내일 이맘때쯤이면 나는 파리로 여행하고 [있을 것이다].",
        "시제및단서": "[미래] 'Mañana a estas horas'는 미래의 특정 시점에 진행 중일 상태를 예측하므로 미래(진행) 시제를 씁니다."
    },
    {
        "문장": "Anoche ( ) mucho viento y no pude dormir.",
        "단어원형": "hacer, 하다",
        "정답": "hacía",
        "번역": "어젯밤에는 바람이 많이 [불어서] 잠을 잘 수 없었다.",
        "시제및단서": "[불완전과거] 과거의 날씨 묘사(descripción)는 배경적 상황이므로 불완전과거를 사용합니다."
    },
    {
        "문장": "Ojalá ( ) ganar la lotería algún día.",
        "단어원형": "poder, 할수있다",
        "정답": "pueda",
        "번역": "언젠가 복권에 당첨될 수 [있기를] 바란다.",
        "시제및단서": "[접속법 현재] 'Ojalá'(~라면 좋을 텐데) 뒤에는 소망을 나타내는 접속법이 옵니다. (실현 가능성 있음 -> 현재)"
    },
    {
        "문장": "El profesor nos pidió que ( ) silencio.",
        "단어원형": "hacer, 하다",
        "정답": "hiciéramos",
        "번역": "선생님은 우리에게 조용히 [하라고] 요청하셨다.",
        "시제및단서": "[접속법 과거] 주절 동사 'pidió'(과거)가 과거 시점이므로, 종속절의 명령/요청 내용도 접속법 과거로 일치시킵니다."
    },
    {
        "문장": "Nunca ( ) esa película, ¿es buena?",
        "단어원형": "ver, 보다",
        "정답": "he visto",
        "번역": "나는 그 영화를 한 번도 [본 적이 없다]. 재미있니?",
        "시제및단서": "[현재완료] 'Nunca'(결코 ~않다)와 함께 현재까지의 경험 유무를 말할 때는 현재완료를 사용합니다."
    },
    {
        "문장": "Si ( ) tiempo, ayúdame con esto, por favor.",
        "단어원형": "tener, 가지다",
        "정답": "tienes",
        "번역": "시간이 [있다면], 이것 좀 도와줘.",
        "시제및단서": "[현재] 'Si' 조건절에서 실현 가능한 현재/미래의 조건을 나타낼 때는 직설법 현재를 사용합니다."
    },
    {
        "문장": "Ayer ( ) un día muy soleado y agradable.",
        "단어원형": "ser, 이다",
        "정답": "fue",
        "번역": "어제는 매우 화창하고 즐거운 날[이었다].",
        "시제및단서": "[점과거] 'Ayer'(어제)라는 하루 전체를 하나의 완료된 사건으로 요약하여 평가할 때는 점과거를 사용할 수 있습니다."
    },
    {
        "문장": "Te llamaré cuando ( ) de trabajar.",
        "단어원형": "salir, 나가다/퇴근하다",
        "정답": "salga",
        "번역": "퇴근[하면] 너에게 전화할게.",
        "시제및단서": "[접속법 현재] 'Cuando'(~할 때)가 아직 일어나지 않은 미래의 일을 나타낼 때는 접속법을 사용합니다."
    },
    {
        "문장": "Ellos no ( ) venir a la fiesta porque estaban enfermos.",
        "단어원형": "poder, 할수있다",
        "정답": "pudieron",
        "번역": "그들은 아파서 파티에 올 수 [없었다].",
        "시제및단서": "[점과거] 파티에 오지 못한 것은 과거의 완료된 사실이므로 점과거를 사용합니다. (이유는 불완료과거)"
    },
    {
        "문장": "Es necesario que nosotros ( ) más agua.",
        "단어원형": "beber, 마시다",
        "정답": "bebamos",
        "번역": "우리는 물을 더 많이 [마실] 필요가 있다.",
        "시제및단서": "[접속법 현재] 'Es necesario que'(~이 필요하다)는 비인칭 주어 구문으로, 뒤에 오는 절에 접속법을 요구합니다."
    },
    {
        "문장": "A las 10 de la noche, yo ya ( ) durmiendo.",
        "단어원형": "estar, 있다",
        "정답": "estaba",
        "번역": "밤 10시에 나는 이미 자고 [있었다].",
        "시제및단서": "[불완전과거] 과거의 특정 시점(10시)에 진행 중이던 상태를 묘사하므로 불완전과거를 씁니다."
    }
]

# Process and Write
rows = []
for item in manual_data:
    verb = item['단어원형'].split(',')[0].strip()
    distractors = get_all_conjugations(verb)
    # Remove correct answer from distractors if present
    if item['정답'] in distractors:
        distractors.remove(item['정답'])
    
    rows.append({
        '문장 (빈칸 포함)': item['문장'],
        '동사 기본형': item['단어원형'],
        '정답': item['정답'],
        '번역': item['번역'],
        '오답보기': ','.join(distractors),
        '설명': item['시제및단서'],
        '시제': item['시제및단서'].split(']')[0].replace('[', '')
    })

# CSV Write
output_path = 'src/data/conjugation_dataset_v2.csv'
headers = ['시제', '문장 (빈칸 포함)', '동사 기본형', '정답', '번역', '설명', '오답보기']

with open(output_path, 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=headers)
    writer.writeheader()
    writer.writerows(rows)

print(f"Generated 30 high-quality manual items to {output_path}")
