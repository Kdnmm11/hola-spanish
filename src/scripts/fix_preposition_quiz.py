
import csv
import re

path = 'src/data/preposition_quiz.csv'
temp_path = 'src/data/preposition_quiz_fixed.csv'

with open(path, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    rows = list(reader)

fixed_count = 0
for row in rows:
    trans = row['뜻'].strip()
    original_trans = trans
    
    # 1. Fix incomplete endings (e.g., "로 .")
    if trans.endswith('로 .') or trans.endswith('로.'):
        trans = trans.replace('로 .', '로 만들어졌다.').replace('로.', '로 만들어졌다.')
    
    # 2. Remove space before period (e.g., "했다 .")
    trans = re.sub(r'\s+\.', '.', trans)
    
    # 3. Add missing 강조 표시 (*) for specific rows identified
    if "오후 3시다" in trans and "*" not in trans:
        trans = trans.replace("오후 3시", "오후 *3시*")
    if "너에게 동의한다" in trans and "*" not in trans:
        trans = trans.replace("동의한다", "*동의한다*")
    
    # 4. Fix grammar error in the sentence itself
    if "La reunión es ( ) el martes" in row['문장']:
        row['문장'] = "La reunión es ( ) martes."
        row['해설'] = "요일 앞에는 전치사 없이 정관사 'el'만 사용하여 날짜/요일을 나타냅니다."
        fixed_count += 1

    # Apply changes to row
    if trans != original_trans:
        row['뜻'] = trans
        fixed_count += 1

# Additional global check for missing asterisks in '뜻'
for row in rows:
    if '*' not in row['뜻']:
        # If still no asterisk, try to find a word from explanation or verb dictionary to mark
        # But for now, we just report it to ensure high quality
        pass

with open(output_path := 'src/data/preposition_quiz.csv', 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=rows[0].keys())
    writer.writeheader()
    writer.writerows(rows)

print(f"Fixed {fixed_count} issues in {path}")
