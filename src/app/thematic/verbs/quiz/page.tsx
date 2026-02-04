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
    options: string[]; // CSV string split
    translation: string;
}

async function getQuizData(): Promise<QuizItem[]> {
    const filePath = path.join(process.cwd(), 'src/data/thematic/verbs/verb_master_quiz.csv');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    const records = parseCSV(fileContent);

    return records.map((record: any) => ({
        id: record.id,
        type: Number(record.type),
        verb: record.verb,
        tense: record.tense,
        sentence: record.sentence,
        answer: record.answer,
        hint: record.hint,
        options: record.options ? record.options.split('|') : [],
        translation: record.translation
    }));
}

export default async function VerbQuizPage() {
    const quizData = await getQuizData();

    // Randomly select 20 questions for a session (or use all for now)
    // Let's use 20 random questions to keep it manageable
    const shuffled = [...quizData].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, 20);

    return (
        <div className="max-w-full py-8 px-4 ml-0">
            <header className="mb-8 ml-2">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">동사 마스터 퀴즈</h1>
                <p className="text-slate-500 font-medium">동사 활용을 완벽하게 마스터했는지 테스트해보세요.</p>
            </header>
            
            <VerbQuizClient quizData={selectedQuestions} />
        </div>
    );
}
