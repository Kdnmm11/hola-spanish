import csv
import random
import re

def conjugate(verb, tense, person_idx):
    stem = verb[:-2]
    ending = verb[-2:]
    endings = {
        'ar': {'present': ['o','as','a','amos','áis','an'], 'future': ['aré','arás','ará','aremos','aréis','arán'], 'past': ['é','aste','ó','amos','asteis','aron'], 'imp': ['aba','abas','aba','ábamos','abais','aban']},
        'er': {'present': ['o','es','e','emos','éis','en'], 'future': ['eré','erás','erá','eremos','eréis','erán'], 'past': ['í','iste','ió','imos','isteis','ieron'], 'imp': ['ía','ías','ía','íamos','íais','ían']},
        'ir': {'present': ['o','es','e','imos','ís','en'], 'future': ['iré','irás','irá','iremos','iréis','irán'], 'past': ['í','iste','ió','imos','isteis','ieron'], 'imp': ['ía','ías','ía','íamos','íais','ían']}
    }
    if ending not in endings: return verb
    forms = endings[ending].get(tense)
    if not forms: return verb
    return stem + forms[person_idx]

def clean_translation(text, verb_meaning):
    text = re.sub(r'\([^)]*\)', '', text).strip()
    if not verb_meaning: return text
    # Smart root extraction
    root = verb_meaning[:-2] if verb_meaning.endswith('하다') else verb_meaning[:2]
    if len(root) < 1: root = verb_meaning
    
    if root in text:
        words = text.split(' ')
        for i, w in enumerate(words):
            if root in w:
                words[i] = f'[{w}]'
                break
        return ' '.join(words)
    return text

# Dictionary updated for 1-120
verb_meanings = {
    'hablar': '말하다', 'comer': '먹다', 'vivir': '살다', 'estudiar': '공부하다', 'trabajar': '일하다', 'escuchar': '듣다', 
    'comprar': '사다', 'leer': '읽다', 'escribir': '쓰다', 'aprender': '배우다', 'abrir': '열다', 'caminar': '걷다', 'beber': '마시다', 
    'correr': '달리다', 'bailar': '춤추다', 'estar': '있다', 'ser': '이다', 'ir': '가다', 'tener': '가지다', 'hacer': '하다', 'ver': '보다', 
    'dar': '주다', 'decir': '말하다', 'poner': '놓다', 'salir': '나가다', 'querer': '원하다', 'poder': '할수있다', 'saber': '알다', 
    'venir': '오다', 'llegar': '도착하다', 'volver': '돌아오다', 'empezar': '시작하다', 'jugar': '놀다', 'dormir': '자다', 'viajar': '여행하다', 
    'conocer': '알다', 'pedir': '요청하다', 'traer': '가져오다', 'conducir': '운전하다', 'sentir': '느끼다', 'pensar': '생각하다', 
    'entender': '이해하다', 'recordar': '기억하다', 'olvidar': '잊다', 'perder': '잃다', 'ganar': '이기다', 'buscar': '찾다', 
    'encontrar': '발견하다', 'pagar': '지불하다', 'vender': '팔다', 'ayudar': '돕다', 'esperar': '기다리다', 'necesitar': '필요하다', 
    'usar': '사용하다', 'llevar': '가져가다', 'dejar': '남기다', 'creer': '믿다', 'parecer': '보이다', 'quedar': '남다',
    # Added for 91-120
    'gustar': '좋아하다', 'encantar': '매우좋아하다', 'interesar': '관심있다', 'importar': '중요하다', 'doler': '아프다', 
    'molestar': '귀찮게하다', 'faltar': '부족하다', 'pasar': '일어나다', 'ocurrir': '발생하다', 'explicar': '설명하다', 
    'enseñar': '가르치다', 'repetir': '반복하다', 'servir': '봉사하다', 'cuidar': '돌보다', 'limpiar': '청소하다'
}

input_path = 'src/data/conjugation_dataset.csv'
output_path = 'src/data/conjugation_dataset_v2.csv'

with open(input_path, 'r', encoding='utf-8', errors='ignore') as f:
    reader = csv.DictReader(f)
    rows = list(reader)

new_rows = []
for i, row in enumerate(rows):
    if i >= 120: break 
    
    verb = row['동사 기본형']
    answer = row['정답']
    meaning = verb_meanings.get(verb, '')
    new_trans = clean_translation(row['번역'], meaning)
    
    options = set()
    tenses = ['present', 'future', 'past', 'imp']
    attempts = 0
    while len(options) < 3 and attempts < 30:
        t = random.choice(tenses)
        p = random.randint(0, 5)
        distractor = conjugate(verb, t, p)
        if distractor != answer and distractor != verb:
            options.add(distractor)
        attempts += 1
    while len(options) < 3:
        options.add(f"{verb}{random.randint(10,99)}")

    new_rows.append({
        '시제': row['시제'],
        '문장': row['문장 (빈칸 포함)'],
        '동사': verb,
        '정답': answer,
        '번역': new_trans,
        '설명': row['설명'],
        '오답보기': ','.join(list(options))
    })

headers = ['시제', '문장', '동사', '정답', '번역', '설명', '오답보기']
with open(output_path, 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=headers)
    writer.writeheader()
    writer.writerows(new_rows)

print(f"Total {len(new_rows)} rows processed in {output_path}")