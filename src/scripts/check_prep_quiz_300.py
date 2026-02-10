
import csv
import re

path = 'src/data/preposition_quiz.csv'

with open(path, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    rows = list(reader)

issues = []
for i, row in enumerate(rows):
    # Only check newly added items (approx index 150+)
    # But checking all doesn't hurt.
    
    trans = row['뜻']
    sentence = row['문장']
    
    # 1. Incomplete endings check
    if trans.strip().endswith('로 .') or trans.strip().endswith('에 .') or trans.strip().endswith('으로 .'):
        issues.append(f"Row {i+1}: Incomplete ending -> {trans}")
    
    # 2. Missing asterisk check
    if '*' not in trans:
        # Some sentences might not translate the preposition explicitly (e.g. subject marker), but most should have it.
        issues.append(f"Row {i+1}: Missing asterisk -> {trans}")

    # 3. Space before period check
    if ' .' in trans:
        issues.append(f"Row {i+1}: Space before period -> {trans}")

    # 4. Empty fields check
    if not trans or not sentence:
        issues.append(f"Row {i+1}: Empty field found")

if not issues:
    print("No obvious issues found in 300 items!")
else:
    print(f"Found {len(issues)} potential issues:")
    for issue in issues[:20]: # Show first 20
        print(issue)
