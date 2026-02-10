
import csv

path = 'src/data/preposition_quiz.csv'
temp_data = []

with open(path, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        # Fix Row 144 issue
        if row['문장'] == "Son las tres ( ) la tarde." and "*" not in row['뜻']:
            row['뜻'] = "오후 3시*이다*." # Or emphasize the time context
        
        temp_data.append(row)

with open(path, 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=['문장', '뜻', '정답', '오답', '유형', '해설'], quoting=csv.QUOTE_ALL)
    writer.writeheader()
    writer.writerows(temp_data)

print("Fixed specific translation issues.")
