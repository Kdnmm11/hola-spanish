import React from 'react';
import fs from 'fs';
import path from 'path';
import { parseCSV } from '@/lib/csvParser';
import PrepositionQuizClient from '@/components/thematic/PrepositionQuizClient';

interface QuizItem {
    id: string;
    sentence: string;
    translation: string;
    answer: string;
    options: string[];
    type: string;
    explanation: string;
}

async function getQuizData(): Promise<QuizItem[]> {
    const filePath = path.join(process.cwd(), 'src/data/preposition_quiz.csv');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    const records = parseCSV(fileContent);

    return records.map((record: any, index: number) => {
        const answer = record['정답'];
        const wrongOptions = record['오답'] ? record['오답'].split(',') : [];
        
        // Pick 3 random wrong options
        const selectedWrong = wrongOptions.sort(() => 0.5 - Math.random()).slice(0, 3);
        
        // Combine answer + 3 distractors and shuffle
        const options = [...selectedWrong, answer].sort(() => 0.5 - Math.random());

        return {
            id: `quiz-${index}`,
            sentence: record['문장'].replace('( )', '___'), // Replace ( ) with ___ for clearer display
            translation: record['뜻'],
            answer: answer,
            options: options,
            type: record['유형'],
            explanation: record['해설']
        };
    }).filter((item: QuizItem) => item.sentence && item.answer);
}

export default async function PrepositionQuizPage() {
    const quizData = await getQuizData();

    // Randomly select 20 questions
    const shuffled = [...quizData].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, 20);

    return (
        <div className="max-w-full py-8 px-4 ml-0">
            <header className="mb-8 ml-2">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">전치사 마스터 실전 퀴즈</h1>
                <p className="text-slate-500 font-medium">문맥에 맞는 전치사를 찾아 빈칸을 채워보세요.</p>
            </header>
            
            <PrepositionQuizClient quizData={selectedQuestions} />
        </div>
    );
}
