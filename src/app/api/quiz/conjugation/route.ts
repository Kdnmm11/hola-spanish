import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { parseCSV } from '@/lib/csvParser';

export async function GET() {
    try {
        // 1. Path to the CSV file
        const csvFilePath = path.join(process.cwd(), 'src', 'data', 'conjugation_dataset.csv');
        
        // 2. Read the file
        const fileContent = fs.readFileSync(csvFilePath, 'utf8');

        // 3. Parse CSV
        const rawData = parseCSV(fileContent);

        // 4. Map Korean headers to English keys
        const formattedData = rawData.map((row: any, index: number) => ({
            id: index + 1,
            sentence: row['문장 (빈칸 포함)'] || row['sentence'],
            verb: row['동사 기본형'] || row['verb'],
            answer: row['정답'] || row['answer'],
            translation: row['번역'] || row['translation'],
            explanation: row['설명'] || row['explanation'],
            level: row['레벨'] || row['level'],
            hint: row['규칙/불규칙'] // Optional: Add hint if needed
        })).filter(item => item.sentence && item.answer); // Filter out empty rows

        // 5. Random Selection Logic (Pick 20)
        // Fisher-Yates shuffle for randomness
        const shuffled = [...formattedData];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        const selectedQuestions = shuffled.slice(0, 20);

        return NextResponse.json(selectedQuestions);

    } catch (error) {
        console.error('Error reading quiz data:', error);
        return NextResponse.json({ error: 'Failed to load quiz data' }, { status: 500 });
    }
}