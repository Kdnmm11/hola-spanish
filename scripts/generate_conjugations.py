
import csv

verbs_to_add = [
    ("gustar", "좋아하다", "ar", "reg"),
    ("parecer", "보이다", "er", "zc"), # yo parezco
    ("sentir", "느끼다", "ir", "ie_i"), # e->ie, e->i
    ("jugar", "놀다", "ar", "ue_gu"), # u->ue, gar->gu
    ("volver", "돌아가다", "er", "ue_pp"), # o->ue, pp vuelto
    ("pensar", "생각하다", "ar", "ie"), # e->ie
    ("mirar", "바라보다", "ar", "reg"),
    ("buscar", "찾다", "ar", "qu"), # car->qu
    ("abrir", "열다", "ir", "pp"), # pp abierto
    ("tocar", "만지다", "ar", "qu"), # car->qu
    ("llevar", "가져가다", "ar", "reg"),
    ("dejar", "놓아두다", "ar", "reg"),
    ("quedar", "남다", "ar", "reg"),
    ("llamar", "부르다", "ar", "reg"),
    ("trabajar", "일하다", "ar", "reg"),
    ("entrar", "들어가다", "ar", "reg"),
    ("recordar", "기억하다", "ar", "ue"), # o->ue
    ("pagar", "지불하다", "ar", "gu"), # gar->gu
    ("escuchar", "듣다", "ar", "reg"),
    ("caminar", "걷다", "ar", "reg"),
    ("viajar", "여행하다", "ar", "reg"),
    ("usar", "사용하다", "ar", "reg"),
    ("cambiar", "바꾸다", "ar", "reg"),
    ("amar", "사랑하다", "ar", "reg"),
    ("cocinar", "요리하다", "ar", "reg"),
    ("bailar", "춤추다", "ar", "reg"),
    ("correr", "달리다", "er", "reg"),
    ("romper", "부수다", "er", "pp"), # pp roto
    ("nacer", "태어나다", "er", "zc"), # yo nazco
    ("ganar", "이기다", "ar", "reg"),
]

def get_endings(type, tense):
    if tense == 'pres':
        if type == 'ar': return ['o', 'as', 'a', 'amos', 'áis', 'an']
        if type == 'er': return ['o', 'es', 'e', 'emos', 'éis', 'en']
        if type == 'ir': return ['o', 'es', 'e', 'imos', 'ís', 'en']
    elif tense == 'indef':
        if type == 'ar': return ['é', 'aste', 'ó', 'amos', 'asteis', 'aron']
        if type == 'er': return ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron']
        if type == 'ir': return ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron']
    elif tense == 'imperf':
        if type == 'ar': return ['aba', 'abas', 'aba', 'ábamos', 'abais', 'aban']
        return ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían']
    elif tense == 'fut':
        return ['é', 'ás', 'á', 'emos', 'éis', 'án'] # Add to infinitive
    elif tense == 'cond':
        return ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'] # Add to infinitive
    elif tense == 'subj_pres':
        if type == 'ar': return ['e', 'es', 'e', 'emos', 'éis', 'en']
        return ['a', 'as', 'a', 'amos', 'áis', 'an']
    elif tense == 'subj_imp':
        # ra form
        if type == 'ar': return ['ara', 'aras', 'ara', 'áramos', 'arais', 'aran']
        return ['iera', 'ieras', 'iera', 'iéramos', 'ierais', 'ieran']
    return []

def split_stem_ending(full_word, ending_suffix):
    # Simple heuristic: remove ending_suffix from end
    # But ending_suffix might not match exactly if there were spelling changes
    # e.g. busqué (stem busc -> busqu, ending é)
    # The CSV expects: stem part, ending part.
    # We will try to match the known ending.
    if full_word.endswith(ending_suffix):
        return full_word[:-len(ending_suffix)], ending_suffix
    
    # Fallback for accents or spelling changes
    # If standard ending is 'é' and word is 'busqué', split 'busqu', 'é'
    # If standard is 'es' and word is 'pagues', split 'pagu', 'es'
    # If standard is 'a' and word is 'pueda', split 'pued', 'a'
    
    return full_word[:-len(ending_suffix)], ending_suffix

def conjugate(verb, meaning, vtype, category):
    stem = verb[:-2]
    rows = []
    
    # Helper to create row
    def make_row(tense_id, forms):
        # forms is list of tuples (stem, ending)
        row = [verb, meaning, "true" if category == "reg" else "true", tense_id] # Temporarily all true for simplicity unless strictly irregular
        # category logic for isRegular column? 
        # Existing CSV marks "ir" (go) as false, "tener" as false.
        # "hablar" is true.
        # "pensar" (stem change) is marked true? Let's check existing...
        # existing "volver" not there. "pedir" (e->i) is marked "false".
        # "empezar" (ie) is marked "false".
        # So stem changers are "false".
        is_reg = "true"
        if category != "reg" and category != "pp" and category != "qu" and category != "gu": 
             is_reg = "false" # Stem changers, zc, etc are irregular
        
        # Exception: simple spelling changes (qu, gu) usually considered regular in some contexts, 
        # but strictly they change orthography. 
        # Let's check existing "pagar" or similar. "llegar" (g->gu) is marked "true". "buscar"? not there.
        # "empezar" (z->c) is "false".
        # Let's stick to: if it has stem change (ie, ue) or yo-irregular (zc, go), it is false.
        # If just spelling (qu, gu, z->c for spelling), maybe true? 
        # Actually "llegar" (llegué) is "true". So spelling change = true.
        # "empezar" (empiezo) is false because of stem change.
        
        if category in ["reg", "pp", "qu", "gu"]:
            is_reg = "true"
        else:
            is_reg = "false"

        row[2] = is_reg

        for s, e in forms:
            row.append(s)
            row.append(e)
        return row

    # 1. Present
    endings = get_endings(vtype, 'pres')
    forms = []
    for i, suffix in enumerate(endings):
        curr_stem = stem
        # Stem Changes
        if category in ["ie", "ie_i"] and i in [0, 1, 2, 5]: curr_stem = stem.replace('e', 'ie') if 'e' in stem else stem
        if category == "ue_gu" and i in [0, 1, 2, 5]: curr_stem = stem.replace('u', 'ue')
        if category in ["ue", "ue_pp"] and i in [0, 1, 2, 5]: curr_stem = stem[:-1] + 'ue' if stem[-1] == 'o' else stem.replace('o', 'ue') # Volver -> Vuelv
        
        # Irregular Yo
        if i == 0:
            if category == "zc": curr_stem = stem + 'z' # parezco -> parezc, o
            # Special case for 'parecer' -> stem 'parec' -> 'parezc'
            # stem of parecer is 'parec'. 'parezc' + 'o'
            # nacer -> nac -> nazc
            if verb == "parecer": curr_stem = "parezc"
            if verb == "nacer": curr_stem = "nazc"
        
        forms.append((curr_stem, suffix))
    rows.append(make_row('pres', forms))

    # 2. Perfect (Haber + PP)
    pp = stem + ('ado' if vtype == 'ar' else 'ido')
    if category == "pp" or category == "ue_pp" or category == "pp_roto":
        if verb == "volver": pp = "vuelto"
        if verb == "abierto": pp = "abierto" # Wait verb is abrir
        if verb == "abrir": pp = "abierto"
        if verb == "romper": pp = "roto"
    
    haber_forms = [("he ", pp), ("has ", pp), ("ha ", pp), ("hemos ", pp), ("habéis ", pp), ("han ", pp)]
    rows.append(make_row('perf', haber_forms))

    # 3. Indefinite
    endings = get_endings(vtype, 'indef')
    forms = []
    for i, suffix in enumerate(endings):
        curr_stem = stem
        curr_suffix = suffix
        
        # Spelling Changes in Yo (i==0)
        if i == 0:
            if category == "qu" or category == "ue_gu": # tocar->toqué, jugar->jugué
                 # car -> qu, gar -> gu
                 if verb.endswith("car"): curr_stem = stem[:-1] + "qu"
                 if verb.endswith("gar"): curr_stem = stem[:-1] + "gu"
            if category == "gu": # pagar -> pagué
                 if verb.endswith("gar"): curr_stem = stem[:-1] + "gu"
            if category == "zc": # nacer -> nací (regular in indef)
                pass 
            if verb == "empezar": # z -> c (empecé)
                if stem.endswith("z"): curr_stem = stem[:-1] + "c"

        # IR Stem change (sandal) - el (2) / ellos (5)
        if category == "ie_i" and i in [2, 5]: # sentir -> sintió
            if 'e' in curr_stem: curr_stem = curr_stem.replace('e', 'i') # basic logic, safe for sentir
        
        forms.append((curr_stem, curr_suffix))
    rows.append(make_row('indef', forms))

    # 4. Imperfect (Regular for most)
    endings = get_endings(vtype, 'imperf')
    forms = []
    for suffix in endings:
        forms.append((stem, suffix))
    rows.append(make_row('imperf', forms))

    # 5. Future (Infinitive + ending)
    endings = get_endings(vtype, 'fut')
    forms = []
    for suffix in endings:
        forms.append((verb, suffix)) # Stem is full verb
    rows.append(make_row('fut', forms))

    # 6. Conditional (Infinitive + ending)
    endings = get_endings(vtype, 'cond')
    forms = []
    for suffix in endings:
        forms.append((verb, suffix))
    rows.append(make_row('cond', forms))

    # 7. Subj Present
    endings = get_endings(vtype, 'subj_pres')
    forms = []
    for i, suffix in enumerate(endings):
        curr_stem = stem
        
        # Yo form based usually (except star/ir/ser...)
        # Irregular Yo influence
        if category == "zc": # parezca
             if verb == "parecer": curr_stem = "parezc"
             if verb == "nacer": curr_stem = "nazc"
        
        # Stem Changes
        # AR/ER: Boot change (1,2,3,6). Nos/Vos regular.
        # IR: Boot change (1,2,3,6). Nos/Vos special (e->i, o->u) if boot is ie/ue.
        
        is_boot = i in [0, 1, 2, 5]
        
        if category == "ie": # pensar -> piense
            if is_boot: curr_stem = stem.replace('e', 'ie')
            
        if category == "ue" or category == "ue_pp": # volver -> vuelva, recordar -> recuerde
            if is_boot: curr_stem = stem[:-1] + 'ue' if stem[-1] == 'o' else stem.replace('o', 'ue')

        if category == "ue_gu": # jugar -> juegue
            # u -> ue
            if is_boot: curr_stem = stem.replace('u', 'ue')
            # AND spelling change gar -> gu for ALL forms in subj pres (AR)
            # jugar -> juegue, juegues, juegue, juguemos, juguéis, jueguen
            # so apply gu to all, then ue to boot
            base_stem_gu = stem[:-1] + "gu" if stem.endswith("g") else stem
            if is_boot:
                 curr_stem = base_stem_gu.replace('u', 'ue', 1) # replace first u? jugar-> jug-> jugu. wait.
                 # jugar stem jug. 
                 # boot: jueg. + e -> juegue.
                 # nos: jug + emos -> juguemos.
                 # The 'u' in 'juegue' is part of suffix? No, 'gue' is orthographic for /ge/.
                 # Ending is 'e'. Stem needs to end in 'gu'.
                 # jug -> jueg (stem chg) -> juegu (ortho)
                 curr_stem = base_stem_gu.replace('u', 'ue', 1) 
            else:
                 curr_stem = base_stem_gu
        
        if category == "qu" or category == "tocar": # buscar -> busque
             # car -> qu for ALL
             curr_stem = stem[:-1] + "qu" if stem.endswith("c") else stem
        
        if category == "gu": # pagar -> pague
             # gar -> gu for ALL
             curr_stem = stem[:-1] + "gu" if stem.endswith("g") else stem
             
        if category == "ie_i": # sentir -> sienta
             # boot: e->ie (sienta)
             # nos/vos: e->i (sintamos)
             if is_boot:
                 curr_stem = stem.replace('e', 'ie')
             else:
                 curr_stem = stem.replace('e', 'i')

        forms.append((curr_stem, suffix))
    rows.append(make_row('subj_pres', forms))

    # 8. Subj Imperfect
    # Based on Indef 3rd plural (ellos) -> ron -> ra
    # Regulars: hablaron -> hablara.
    # Irregulars: sintieron -> sintiera.
    endings = get_endings(vtype, 'subj_imp')
    forms = []
    
    # Determine the stem from Indef 3rd pl
    # Indef 3rd pl:
    indef_row = [r for r in rows if r[3] == 'indef'][0]
    # ellos_s is index 14, ellos_e is 15.
    ellos_s = indef_row[14]
    ellos_e = indef_row[15]
    
    # ellos form: ellos_s + ellos_e (e.g. hablar + on? No, habl + aron)
    # sentir: sint + ieron.
    # 3rd pl full:
    ellos_full = ellos_s + ellos_e
    # Remove 'ron'
    base_stem = ellos_full[:-3] # sintie, habla, comie...
    # Actually wait.
    # hablaron -> habla + ra.
    # comieron -> comie + ra.
    # sintieron -> sintie + ra.
    # The suffix in 'get_endings' for subj_imp is 'ara' or 'iera'.
    # If we use base_stem from 3rd pl minus 'ron', we get 'habla' or 'comie'.
    # If vtype AR: ending is 'ara'. 'habla' + 'ara' = 'hablaara' (Wrong).
    # AR: hablaron. Stem 'habl'. Ending 'aron'.
    # Subj Imp: 'habl' + 'ara'.
    # ER/IR: comieron. Stem 'com'. Ending 'ieron'.
    # Subj Imp: 'com' + 'iera'.
    # BUT irregulars: sintieron (stem sint).
    # Indef row has: sint, ieron.
    # Subj Imp: sint, iera.
    
    # So if we take the STEM from Indef 3rd Plural, and add standard Subj Imp endings?
    # Regulars: yes.
    # Irregulars (Sandals): yes. sintieron (sint) -> sintiera.
    # Strong Irregulars (tuv, hic, pus...): tuvieron (tuv). tuv + iera. Yes.
    
    # So reuse the STEM from Indef Ellos form.
    # EXCEPT for 'jiron' types (dijeron, trajeron, condujeron).
    # dijeron -> dij + eron (not ieron).
    # subj imp -> dij + era (not iera).
    # This happens when stem ends in j.
    
    indef_stem = ellos_s
    
    for suffix in endings:
        curr_suffix = suffix
        if indef_stem.endswith('j') and curr_suffix.startswith('ie'):
            curr_suffix = curr_suffix[1:] # iera -> era
        
        forms.append((indef_stem, curr_suffix))
        
    rows.append(make_row('subj_imp', forms))
    
    return rows

# Generate
all_rows = []
for v, mean, type, cat in verbs_to_add:
    all_rows.extend(conjugate(v, mean, type, cat))

# Append to file
with open('src/data/thematic/verbs/conjugations.csv', 'a', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerows(all_rows)

print(f"Successfully added {len(verbs_to_add)} verbs.")
