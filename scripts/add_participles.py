
import csv
import shutil
import os

input_csv = 'src/data/thematic/verbs/conjugations.csv'
output_csv = 'src/data/thematic/verbs/conjugations_new.csv'

# Irregular dictionaries
pp_irregulars = {
    'abrir': 'abierto',
    'cubrir': 'cubierto',
    'decir': 'dicho',
    'escribir': 'escrito',
    'hacer': 'hecho',
    'morir': 'muerto',
    'poner': 'puesto',
    'romper': 'roto',
    'ver': 'visto',
    'volver': 'vuelto',
    # Others commonly regular but check
    'ser': 'sido',
    'ir': 'ido'
}

gerund_irregulars = {
    'ir': 'yendo',
    'poder': 'pudiendo',
    'venir': 'viniendo',
    'decir': 'diciendo',
    'pedir': 'pidiendo',
    'sentir': 'sintiendo',
    'dormir': 'durmiendo',
    'morir': 'muriendo',
    'seguir': 'siguiendo',
    'reír': 'riendo',
    'oír': 'oyendo',
    'traer': 'trayendo',
    'leer': 'leyendo',
    'caer': 'cayendo',
    'creer': 'creyendo',
    'huir': 'huyendo',
    'servir': 'sirviendo',
    'vestir': 'vistiendo',
    'repetir': 'repitiendo',
    'mentir': 'mintiendo',
    'preferir': 'prefiriendo'
}

def get_pp(verb):
    if verb in pp_irregulars:
        return pp_irregulars[verb]
    
    stem = verb[:-2]
    ending = verb[-2:]
    
    if ending == 'ar':
        return stem + 'ado'
    else: # er/ir
        return stem + 'ido'

def get_gerund(verb):
    if verb in gerund_irregulars:
        return gerund_irregulars[verb]
    
    stem = verb[:-2]
    ending = verb[-2:]
    
    if ending == 'ar':
        return stem + 'ando'
    else: # er/ir
        return stem + 'iendo'

# Read and Process
rows = []
fieldnames = []

with open(input_csv, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    fieldnames = reader.fieldnames
    # New fieldnames
    new_fieldnames = ['verb', 'meaning', 'isRegular', 'gerund', 'past_participle'] + fieldnames[3:]
    
    for row in reader:
        if not row['verb']: continue
        
        verb = row['verb']
        row['gerund'] = get_gerund(verb)
        row['past_participle'] = get_pp(verb)
        rows.append(row)

# Write New CSV
with open(output_csv, 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=new_fieldnames)
    writer.writeheader()
    writer.writerows(rows)

# Backup old and rename new
shutil.move(input_csv, input_csv + '.bak')
shutil.move(output_csv, input_csv)

print(f"Successfully added participle columns to {input_csv}")
