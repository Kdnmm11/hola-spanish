import csv
import random

# Load conjugations
conjugations = {}
with open('src/data/thematic/verbs/conjugations.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        v = row['verb']
        if v not in conjugations: conjugations[v] = {}
        tense = row['tense_id']
        persons = ['yo', 'tu', 'el', 'nos', 'vos', 'ellos']
        forms = {p: row[f'{p}_s'] + row[f'{p}_e'] for p in persons}
        conjugations[v][tense] = forms

# Batch 1, 2, 3 & 4 Targets (All 82 Verbs)
target_verbs = [
    'ser', 'estar', 'haber', 'tener', 'hacer', 
    'ir', 'venir', 'decir', 'poder', 'dar', 
    'querer', 'saber', 'poner', 'ver', 'salir', 
    'comer', 'vivir', 'hablar', 'tomar', 'llegar',
    'ayudar', 'cantar', 'comprar', 'preguntar', 'esperar',
    'necesitar', 'beber', 'aprender', 'vender', 'comprender',
    'subir', 'permitir', 'escribir', 'responder', 'dormir',
    'pedir', 'empezar', 'leer', 'conducir', 'valer',
    'pagar', 'buscar', 'dejar', 'quedar', 'llamar',
    'trabajar', 'entrar', 'recordar', 'escuchar', 'caminar',
    'viajar', 'usar', 'cambiar', 'amar', 'cocinar',
    'bailar', 'correr', 'romper', 'nacer', 'ganar',
    # Batch 4 (Final)
    'cerrar', 'perder', 'encontrar', 'morir', 'seguir',
    'reír', 'sentir', 'jugar', 'volver', 'pensar',
    'mirar', 'abrir', 'tocar', 'llevar', 'parecer',
    'gustar', 'creer', 'caer', 'oír', 'traer', 'conocer'
]

# Verb-Specific Custom Templates (Better Context & Translation)
# Format: { 'tense': [ (spanish_template, korean_translation_template), ... ] }
# Placeholders: {subject}, {verb_form}
# Korean logic will use explicit words instead of auto-generation where possible
custom_templates = {
    'ser': {
        'pres': [("Ella {verb_form} profesora.", "그녀는 선생님 [이에요]."), ("Nosotros {verb_form} estudiantes.", "우리는 학생 [이에요].")],
        'indef': [("Ayer la fiesta {verb_form} divertida.", "어제 파티는 즐거 [웠어요].")],
        'imperf': [("Cuando era niño, {subject} {verb_form} tímido.", "어렸을 때, {subject_ko} 수줍음이 많은 [모습이었어요].")],
        'fut': [("Mañana {verb_form} un gran día.", "내일은 멋진 날이 [될 거예요].")]
    },
    'estar': {
        'pres': [("{subject} {verb_form} en casa.", "{subject_ko} 집에 [있어요]."), ("Madrid {verb_form} en España.", "마드리드는 스페인에 [있어요].")],
        'indef': [("Ayer {subject} {verb_form} enfermo.", "어제 {subject_ko} 아 [팠어요].")],
        'imperf': [("Antes {subject} {verb_form} siempre aquí.", "예전에 {subject_ko} 항상 여기에 [있곤 했어요].")]
    },
    'ir': {
        'pres': [("{subject} {verb_form} al cine.", "{subject_ko} 영화관에 [가요].")],
        'fut': [("El próximo mes {subject} {verb_form} a España.", "다음 달에 {subject_ko} 스페인에 [갈 거예요].")],
        'indef': [("Anoche {subject} {verb_form} a la fiesta.", "어젯밤에 {subject_ko} 파티에 [갔어요].")]
    },
    'tener': {
        'pres': [("{subject} {verb_form} hambre.", "{subject_ko} 배가 [고파요]."), ("{subject} {verb_form} un coche.", "{subject_ko} 차를 가지고 [있어요].")],
        'indef': [("Ayer {subject} {verb_form} mucho trabajo.", "어제 {subject_ko} 일이 많이 [있었어요].")]
    },
    'hacer': {
        'pres': [("{subject} {verb_form} la tarea.", "{subject_ko} 숙제를 [해요]."), ("Hoy {verb_form} sol.", "오늘 해가 [나요].")],
        'indef': [("Ayer {subject} {verb_form} un pastel.", "어제 {subject_ko} 케이크를 만 [들었어요].")]
    },
    'comer': {
        'pres': [("{subject} {verb_form} pan.", "{subject_ko} 빵을 [먹어요].")],
        'indef': [("Ayer {subject} {verb_form} pizza.", "어제 {subject_ko} 피자를 [먹었어요].")],
        'fut': [("Mañana {subject} {verb_form} paella.", "내일 {subject_ko} 파에야를 [먹을 거예요].")]
    },
    # Batch 2 Templates
    'vivir': {
        'pres': [("{subject} {verb_form} en Seúl.", "{subject_ko} 서울에 [살아요].")],
        'indef': [("El año pasado {subject} {verb_form} en París.", "작년에 {subject_ko} 파리에 [살았어요].")]
    },
    'tomar': {
        'pres': [("{subject} {verb_form} café.", "{subject_ko} 커피를 [마셔요]."), ("{subject} {verb_form} el autobús.", "{subject_ko} 버스를 [타요].")]
    },
    'dormir': {
        'pres': [("{subject} {verb_form} mucho.", "{subject_ko} 많이 [자요].")],
        'indef': [("Anoche {subject} {verb_form} bien.", "어젯밤 {subject_ko} 잘 [잤어요].")]
    },
    'escribir': {
        'pres': [("{subject} {verb_form} una carta.", "{subject_ko} 편지를 [써요].")],
        'perf': [("Ya {subject} {verb_form} el libro.", "이미 {subject_ko} 그 책을 [썼어요].")] # escrito
    },
    'leer': {
        'pres': [("{subject} {verb_form} el periódico.", "{subject_ko} 신문을 [읽어요].")],
        'indef': [("Ayer {subject} {verb_form} un poema.", "어제 {subject_ko} 시를 [읽었어요].")]
    },
    # Batch 3 Templates
    'pagar': {
        'pres': [("{subject} {verb_form} la cuenta.", "{subject_ko} 계산을 [해요].")],
        'indef': [("Ayer {subject} {verb_form} con tarjeta.", "어제 {subject_ko} 카드로 결제 [했어요].")]
    },
    'buscar': {
        'pres': [("{subject} {verb_form} las llaves.", "{subject_ko} 열쇠를 [찾아요].")],
        'indef': [("Ayer {subject} {verb_form} trabajo.", "어제 {subject_ko} 일자리를 구 [했어요].")]
    },
    'trabajar': {
        'pres': [("{subject} {verb_form} en una oficina.", "{subject_ko} 사무실에서 [일해요].")],
        'imperf': [("Antes {subject} {verb_form} mucho.", "예전에 {subject_ko} 일을 많이 [하곤 했어요].")]
    },
    'escuchar': {
        'pres': [("{subject} {verb_form} música.", "{subject_ko} 음악을 [들어요].")],
        'indef': [("Ayer {subject} {verb_form} la noticia.", "어제 {subject_ko} 그 소식을 [들었어요].")]
    },
    'cocinar': {
        'pres': [("{subject} {verb_form} la cena.", "{subject_ko} 저녁을 [요리해요].")],
        'fut': [("Mañana {subject} {verb_form} pasta.", "내일 {subject_ko} 파스타를 [요리할 거예요].")]
    },
    # Batch 4 Templates
    'cerrar': {
        'pres': [("{subject} {verb_form} la puerta.", "{subject_ko} 문을 [닫아요].")],
        'indef': [("Ayer {subject} {verb_form} la tienda.", "어제 {subject_ko} 가게 문을 [닫았어요].")]
    },
    'perder': {
        'pres': [("Siempre {subject} {verb_form} las llaves.", "항상 {subject_ko} 열쇠를 [잃어버려요].")],
        'indef': [("Ayer {subject} {verb_form} el autobús.", "어제 {subject_ko} 버스를 [놓쳤어요].")]
    },
    'encontrar': {
        'pres': [("{subject} {verb_form} dinero.", "{subject_ko} 돈을 [찾아요].")],
        'indef': [("Ayer {subject} {verb_form} un tesoro.", "어제 {subject_ko} 보물을 [발견했어요].")]
    },
    'morir': {
        'indef': [("El año pasado el artista {verb_form}.", "작년에 그 예술가가 [죽었어요/돌아가셨어요].")]
    },
    'jugar': {
        'pres': [("{subject} {verb_form} al fútbol.", "{subject_ko} 축구를 [해요].")],
        'indef': [("Ayer {subject} {verb_form} videojuegos.", "어제 {subject_ko} 비디오 게임을 [했어요].")]
    },
    'volver': {
        'pres': [("{subject} {verb_form} a casa.", "{subject_ko} 집에 [돌아가요].")],
        'fut': [("Pronto {subject} {verb_form}.", "곧 {subject_ko} [돌아올 거예요].")]
    },
    'pensar': {
        'pres': [("{subject} {verb_form} en ti.", "{subject_ko} 네 [생각을 해요].")],
        'imperf': [("Antes {subject} {verb_form} diferente.", "예전에 {subject_ko} 다르게 [생각하곤 했어요].")]
    }
}

# Fallback generic templates
generic_templates = {
    'pres': [("Ahora {subject} {verb_form}.", "지금 {subject_ko} [해요/있어요].")],
    'indef': [("Ayer {subject} {verb_form}.", "어제 {subject_ko} [했어요/있었어요].")],
    'fut': [("Mañana {subject} {verb_form}.", "내일 {subject_ko} [할 거예요].")]
}

subjects = {
    'yo': ('yo', '나는'),
    'tu': ('tú', '너는'),
    'el': ('él', '그는'),
    'nos': ('nosotros', '우리는'),
    'ellos': ('ellos', '그들은')
}

tense_names = {'pres': '현재', 'indef': '단순과거', 'imperf': '불완료과거', 'fut': '미래', 'perf': '현재완료'}

quiz_data = []
quiz_id = 1

for verb in target_verbs:
    if verb not in conjugations: continue
    
    # Check if we have custom templates, otherwise skip or use generic (skipping generic for high quality)
    # Strategy: Use custom if available, otherwise try to generate generic only if safe.
    # To ensure quality for the first batch, let's stick to defined custom templates mostly, 
    # but I defined only few. I should expand custom templates logic dynamically or fallback smartly.
    
    # Let's use generic templates with smarter Korean verb handling if custom is missing.
    templates_to_use = custom_templates.get(verb, generic_templates)
    
    # Flatten templates: { tense: [...] }
    all_tenses = templates_to_use.keys()
    
    for tense in all_tenses:
        if tense not in conjugations[verb]: continue
        
        tpls = templates_to_use[tense]
        
        for tpl_es, tpl_ko in tpls:
            person_key = random.choice(list(subjects.keys()))
            # Special case for "Hoy hace sol" (3rd person singular fixed)
            if "{subject}" not in tpl_es:
                person_key = 'el' # default to 3rd person for impersonal verbs like weather
            
            subj_es, subj_ko = subjects[person_key]
            verb_form = conjugations[verb][tense][person_key]
            
            # Format sentences
            sentence = tpl_es.format(subject=subj_es, verb_form=verb_form)
            trans = tpl_ko.format(subject_ko=subj_ko) 
            
            # Generate 3 Types
            for q_type in [1, 2, 3]:
                q = {
                    'id': f"{quiz_id}_{q_type}",
                    'type': q_type,
                    'verb': verb,
                    'tense': tense,
                    'answer': tense_names.get(tense, tense),
                    'hint': '',
                    'translation': trans
                }
                
                if q_type == 1:
                    # Direct formatting for Type 1
                    q['sentence'] = tpl_es.format(subject=subj_es, verb_form=f"*{verb_form}*")
                    q['answer'] = tense_names.get(tense, tense)
                    q['options'] = '|'.join(list(tense_names.values()))
                elif q_type == 2:
                    # Direct formatting for Type 2
                    q['sentence'] = tpl_es.format(subject=subj_es, verb_form="___")
                    q['answer'] = verb_form
                    q['options'] = ''
                elif q_type == 3:
                    # Direct formatting for Type 3
                    q['sentence'] = tpl_es.format(subject=subj_es, verb_form="___")
                    q['answer'] = verb_form
                    # Distractors
                    distractors = []
                    # ... (rest of distractor logic)
                    available_tenses = [t for t in conjugations[verb] if t != tense]
                    if available_tenses:
                        t2 = random.choice(available_tenses)
                        distractors.append(conjugations[verb][t2][person_key])
                    # 2. Same verb, different person
                    p2 = random.choice([p for p in subjects if p != person_key])
                    distractors.append(conjugations[verb][tense][p2])
                    # 3. Random
                    p3 = random.choice([p for p in subjects if p != person_key])
                    distractors.append(conjugations[verb][tense][p3])
                    
                    options = [verb_form] + distractors
                    random.shuffle(options)
                    q['options'] = '|'.join(options[:4])

                quiz_data.append(q)
            quiz_id += 1

fieldnames = ['id', 'type', 'verb', 'tense', 'sentence', 'answer', 'hint', 'options', 'translation']
with open('src/data/thematic/verbs/verb_master_quiz.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(quiz_data)

print(f"Generated {len(quiz_data)} high-quality questions for 20 verbs.")