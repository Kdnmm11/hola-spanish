import React from 'react';
import fs from 'fs';
import path from 'path';
import { parseCSV } from '@/lib/csvParser';
import VerbQuizClient from '@/components/thematic/VerbQuizClient';

interface QuizItem {
    id: string;
    type: number;
    verb: string;
    tense: string;
    sentence: string;
    answer: string;
    hint: string;
    options: string[];
    translation: string;
}

async function getQuizData(): Promise<QuizItem[]> {
    // Read the new V2 dataset which has pre-generated distractors and masked translations
    const filePath = path.join(process.cwd(), 'src/data/conjugation_dataset_v2.csv');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    const records = parseCSV(fileContent);

    return records.map((record: any, index: number) => {
        const answer = record['정답'];
        const wrongOptions = record['오답보기'] ? record['오답보기'].split(',') : [];
        
        // Pick 3 random wrong options
        const selectedWrong = wrongOptions.sort(() => 0.5 - Math.random()).slice(0, 3);
        
        // Combine answer + 3 distractors and shuffle
        const options = [...selectedWrong, answer].sort(() => 0.5 - Math.random());

        return {
            id: `quiz-${index}`,
            type: 1, 
            verb: record['동사 기본형'],
            tense: record['시제'],
            sentence: record['문장 (빈칸 포함)'],
            answer: answer,
            hint: record['설명'],
            options: options,
            translation: record['번역']
        };
    });
}

export default async function VerbQuizPage() {
    const quizData = await getQuizData();

    // Randomly select 20 questions
    const shuffled = [...quizData].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, 20);

    return (
        <div className="max-w-full py-8 px-4 ml-0">
            <header className="mb-8 ml-2">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">동사 마스터 실전 퀴즈</h1>
                <p className="text-slate-500 font-medium">문장 속 빈칸에 알맞은 동사 변화형을 채워보세요.</p>
            </header>
            <VerbQuizClient quizData={shuffled} />
        </div>
    );
}
