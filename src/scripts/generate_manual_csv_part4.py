
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

# Manual Data 91-120
manual_data = [
    {
        "문장": "Esta semana no ( ) tiempo para nada.",
        "단어원형": "tener, 가지다",
        "정답": "he tenido",
        "번역": "이번 주는 아무것도 할 시간이 [없었다] (가지지 못했다).",
        "시제및단서": "[현재완료] 'Esta semana'(이번 주)는 현재와 연결된 시간이므로 현재완료를 씁니다."
    },
    {
        "문장": "Me gustaría que tú me ( ).",
        "단어원형": "ayudar, 돕다",
        "정답": "ayudaras",
        "번역": "나는 네가 나를 [도와주면] 좋겠다.",
        "시제및단서": "[접속법 과거] 'Me gustaría que'(~하면 좋겠다 - 조건법) 뒤에는 접속법 과거가 옵니다."
    },
    {
        "문장": "Ayer, mientras paseaba, ( ) a un viejo amigo.",
        "단어원형": "ver, 보다/만나다",
        "정답": "vi",
        "번역": "어제 산책하는 동안, 옛 친구를 [보았다] (만났다).",
        "시제및단서": "[점과거] 'Mientras paseaba'(배경) 중에 발생한 일회성 사건(vi)입니다."
    },
    {
        "문장": "Si llueve, no ( ) al parque.",
        "단어원형": "ir, 가다",
        "정답": "iremos",
        "번역": "비가 오면, 우리는 공원에 [가지 않을 것이다].",
        "시제및단서": "[미래] 실현 가능한 미래의 조건(Si llueve)에 대한 결과입니다."
    },
    {
        "문장": "¡( ) la puerta, por favor!",
        "단어원형": "cerrar, 닫다",
        "정답": "Cierra",
        "번역": "문 좀 [닫아] 줘!",
        "시제및단서": "[명령법] 긍정 명령형(tú)입니다. (e->ie 어간 변화)",
    },
    {
        "문장": "Cuando ( ) mayor, quiero ser médico.",
        "단어원형": "ser, 이다",
        "정답": "sea",
        "번역": "어른이 [되면], 나는 의사가 되고 싶다.",
        "시제및단서": "[접속법 현재] 'Cuando'가 미래의 시점을 나타낼 때는 접속법을 씁니다."
    },
    {
        "문장": "El año pasado, nosotros ( ) a Francia.",
        "단어원형": "viajar, 여행하다",
        "정답": "viajamos",
        "번역": "작년에 우리는 프랑스로 [여행했다].",
        "시제및단서": "[점과거] 'El año pasado'(작년)에 완료된 행위입니다."
    },
    {
        "문장": "Yo no sabía que tú ( ) cocinar tan bien.",
        "단어원형": "saber, 알다/할줄알다",
        "정답": "sabías",
        "번역": "나는 네가 요리를 그렇게 잘 [하는지] (할 줄 아는지) 몰랐다.",
        "시제및단서": "[불완전과거] 'Yo no sabía que'(과거의 무지) 뒤에 오는 사실(요리 실력)은 지속적인 능력이므로 불완전과거를 씁니다."
    },
    {
        "문장": "Es probable que ellos ( ) tarde.",
        "단어원형": "venir, 오다",
        "정답": "vengan",
        "번역": "그들이 늦게 [올] 확률이 있다.",
        "시제및단서": "[접속법 현재] 'Es probable que'(확률/가능성) 뒤에는 접속법을 씁니다."
    },
    {
        "문장": "Antes de ayer, yo ( ) un libro interesante.",
        "단어원형": "leer, 읽다",
        "정답": "leí",
        "번역": "그저께 나는 재미있는 책을 한 권 [읽었다].",
        "시제및단서": "[점과거] 'Antes de ayer'(그저께) 완료된 행위입니다."
    },
    {
        "문장": "Si tuviera dinero, ( ) un coche nuevo.",
        "단어원형": "comprar, 사다",
        "정답": "compraría",
        "번역": "돈이 있다면, 새 차를 [살 텐데].",
        "시제및단서": "[조건법] 가정법 과거(Si tuviera...)의 귀결절에는 조건법을 씁니다."
    },
    {
        "문장": "Mañana a las nueve, la tienda ya ( ) abierta.",
        "단어원형": "estar, 있다",
        "정답": "estará",
        "번역": "내일 9시에는 가게가 이미 열려 [있을 것이다].",
        "시제및단서": "[미래] 미래 특정 시점의 상태를 예측합니다."
    },
    {
        "문장": "¡No ( ) eso! Es mío.",
        "단어원형": "tocar, 만지다",
        "정답": "toques",
        "번역": "그거 [만지지 마]! 내 거야.",
        "시제및단서": "[부정 명령법] 금지 명령(tú)은 접속법 현재형을 씁니다."
    },
    {
        "문장": "Me molesta que ella siempre ( ) tarde.",
        "단어원형": "llegar, 도착하다",
        "정답": "llegue",
        "번역": "그녀가 항상 늦게 [도착하는] 것이 짜증난다.",
        "시제및단서": "[접속법 현재] 감정 유발 동사(molestar) 뒤에는 접속법이 옵니다."
    },
    {
        "문장": "Ayer ( ) mucho frío.",
        "단어원형": "hacer, 하다(날씨)",
        "정답": "hacía",
        "번역": "어제는 날씨가 매우 [추웠다].",
        "시제및단서": "[불완전과거] 과거의 날씨 묘사입니다."
    },
    {
        "문장": "Cuando llegué, ellos ya ( ).",
        "단어원형": "salir, 나가다/떠나다",
        "정답": "habían salido",
        "번역": "내가 도착했을 때, 그들은 이미 [떠났었다].",
        "시제및단서": "[과거완료] 도착한 과거 시점(llegué)보다 더 이전에 일어난 일(대과거)입니다."
    },
    {
        "문장": "Espero que ( ) un buen fin de semana.",
        "단어원형": "tener, 가지다",
        "정답": "tengas",
        "번역": "좋은 주말 [보내기를] 바래.",
        "시제및단서": "[접속법 현재] 소망(Espero que)을 나타내는 접속법입니다."
    },
    {
        "문장": "En 1992, se ( ) los Juegos Olímpicos en Barcelona.",
        "단어원형": "celebrar, 개최하다",
        "정답": "celebraron",
        "번역": "1992년에 바르셀로나에서 올림픽이 [개최되었다].",
        "시제및단서": "[점과거] 역사적 사실(특정 연도)입니다."
    },
    {
        "문장": "Yo ( ) que estabas enfermo.",
        "단어원형": "creer, 믿다/생각하다",
        "정답": "creía",
        "번역": "나는 네가 아프다고 [생각했었다].",
        "시제및단서": "[불완전과거] 과거의 지속적인 믿음이나 생각입니다."
    },
    {
        "문장": "Si ( ) a la fiesta, avísame.",
        "단어원형": "venir, 오다",
        "정답": "vienes",
        "번역": "파티에 [온다면], 내게 알려줘.",
        "시제및단서": "[현재] 실현 가능한 조건(Si vienes)입니다."
    },
    {
        "문장": "Dudo que él ( ) la verdad.",
        "단어원형": "decir, 말하다",
        "정답": "diga",
        "번역": "그가 진실을 [말할지] 의심스럽다.",
        "시제및단서": "[접속법 현재] 의심(Dudo que) 뒤에는 접속법을 씁니다."
    },
    {
        "문장": "El año que viene, nosotros ( ) a Italia.",
        "단어원형": "viajar, 여행하다",
        "정답": "viajaremos",
        "번역": "내년에 우리는 이탈리아로 [여행할 것이다].",
        "시제및단서": "[미래] 내년의 계획입니다."
    },
    {
        "문장": "Anoche ( ) una película muy buena.",
        "단어원형": "ver, 보다",
        "정답": "vi",
        "번역": "어젯밤 나는 아주 좋은 영화를 [보았다].",
        "시제및단서": "[점과거] 어젯밤 완료된 행위입니다."
    },
    {
        "문장": "¡( ) cuidado con el perro!",
        "단어원형": "tener, 가지다",
        "정답": "Ten",
        "번역": "개 조심[해]!",
        "시제및단서": "[명령법] 긍정 명령형(tú)입니다."
    },
    {
        "문장": "Cuando era joven, ( ) mucho deporte.",
        "단어원형": "hacer, 하다",
        "정답": "hacía",
        "번역": "젊었을 때, 나는 운동을 많이 [하곤 했다].",
        "시제및단서": "[불완전과거] 과거의 습관입니다."
    },
    {
        "문장": "Es necesario que tú ( ) más.",
        "단어원형": "estudiar, 공부하다",
        "정답": "estudies",
        "번역": "네가 공부를 더 [하는] 것이 필요하다.",
        "시제및단서": "[접속법 현재] 필요성(Es necesario que)을 나타내는 접속법입니다."
    },
    {
        "문장": "Ayer me ( ) muy triste.",
        "단어원형": "sentir, 느끼다",
        "정답": "sentí",
        "번역": "어제 나는 매우 슬프게 [느꼈다] (슬펐다).",
        "시제및단서": "[점과거] 어제 느꼈던 구체적인 감정 상태(완료)입니다."
    },
    {
        "문장": "Si pudiera, ( ) todo el día durmiendo.",
        "단어원형": "estar, 있다",
        "정답": "estaría",
        "번역": "할 수만 있다면, 하루 종일 자면서 [있을 텐데].",
        "시제및단서": "[조건법] 가정법 과거(Si pudiera)의 결과입니다."
    },
    {
        "문장": "Mañana, el museo ( ) cerrado.",
        "단어원형": "estar, 있다",
        "정답": "estará",
        "번역": "내일 박물관은 닫혀 [있을 것이다].",
        "시제및단서": "[미래] 미래의 상태 예측입니다."
    },
    {
        "문장": "Hace dos días, ellos ( ) un coche.",
        "단어원형": "alquilar, 빌리다/렌트하다",
        "정답": "alquilaron",
        "번역": "이틀 전에 그들은 차를 [빌렸다].",
        "시제및단서": "[점과거] 이틀 전 완료된 행위입니다."
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
