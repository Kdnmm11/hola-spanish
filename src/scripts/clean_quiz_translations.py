
import csv
import re

input_path = 'src/data/preposition_quiz.csv'
output_path = 'src/data/preposition_quiz.csv'

with open(input_path, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    rows = list(reader)

count = 0
for row in rows:
    original = row['뜻']
    # Remove content inside parentheses ( ) but keep * *
    # Regex: find ( ... ) and replace with empty string
    # But be careful not to remove *...* marking if it's somehow inside? No, markings are usually outside or independent.
    
    # Specific fix for "합의 상태이다"
    if '합의 상태이다' in original:
        row['뜻'] = "나는 너에게 *동의한다*."
        count += 1
    
    # General cleanup for other parenthetical explanations in translation
    # Example: "그들은 늦게 [올] 것 같다 (가능성)." -> "그들은 늦게 [올] 것 같다."
    # We should only remove parens if they contain Hangul, to avoid removing Spanish parts if any (though '뜻' column is Korean).
    
    new_trans = re.sub(r'\([^)]*[가-힣]+[^)]*\)', '', row['뜻']).strip()
    # Cleanup double spaces
    new_trans = re.sub(r'\s+', ' ', new_trans)
    
    if new_trans != row['뜻']:
        row['뜻'] = new_trans
        count += 1

with open(output_path, 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=rows[0].keys())
    writer.writeheader()
    writer.writerows(rows)

print(f"Cleaned up {count} translations in {output_path}")
