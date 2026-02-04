import csv
import json

csv_path = 'src/data/thematic/verbs/conjugations.csv'
ts_path = 'src/data/thematic/verbs/byVerb.ts'

tense_names = {
    'pres': '현재',
    'perf': '현재완료',
    'indef': '점과거',
    'imperf': '선과거',
    'fut': '미래',
    'cond': '조건',
    'subj_pres': '접속법 현재',
    'subj_imp': '접속법 과거'
}

tense_order = ['pres', 'perf', 'indef', 'imperf', 'fut', 'cond', 'subj_pres', 'subj_imp']

verbs = {}

with open(csv_path, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        if not row['verb'] or not row['isRegular']:
            continue
            
        v = row['verb']
        if v not in verbs:
            verbs[v] = {
                'v': v,
                'mean': row['meaning'],
                'isRegular': row['isRegular'].lower() == 'true',
                'gerund': row.get('gerund', ''),
                'past_participle': row.get('past_participle', ''),
                'tenses': {}
            }
        
        tense_id = row['tense_id']
        forms = []
        # yo, tu, el, nos, vos, ellos
        persons = ['yo', 'tu', 'el', 'nos', 'vos', 'ellos']
        for p in persons:
            s = row[f'{p}_s']
            e = row[f'{p}_e']
            forms.append([s, e])
        
        verbs[v]['tenses'][tense_id] = {
            'id': tense_id,
            'name': tense_names.get(tense_id, tense_id),
            'forms': forms
        }

# Generate TS content
ts_content = "import { VerbFullConjugation } from '@/data/thematicData';\n\n"
ts_content += "const RAW_DATA: VerbFullConjugation[] = [\n"

for v_key in verbs:
    v_data = verbs[v_key]
    ts_obj = f"    {{ v: '{v_data['v']}', mean: '{v_data['mean']}', isRegular: {str(v_data['isRegular']).lower()}, gerund: '{v_data['gerund']}', pastParticiple: '{v_data['past_participle']}', tenses: ["
    
    tenses_list = []
    for tid in tense_order:
        if tid in v_data['tenses']:
            t = v_data['tenses'][tid]
            # Manual format to match style somewhat, or just standard JSON
            forms_str = "[" + ", ".join([f"['{f[0]}', '{f[1]}']" for f in t['forms']]) + "]"
            t_str = f"{{ id: '{t['id']}', name: '{t['name']}', forms: {forms_str} }}"
            tenses_list.append(t_str)
            
    ts_obj += ", ".join(tenses_list)
    ts_obj += "] },\n"
    ts_content += ts_obj

ts_content += "];\n\n"
ts_content += "export const BY_VERB_DATA = [...RAW_DATA].sort((a, b) => a.v.localeCompare(b.v));\n"

with open(ts_path, 'w', encoding='utf-8') as f:
    f.write(ts_content)

print(f"Successfully updated {ts_path} with {len(verbs)} verbs from CSV.")
