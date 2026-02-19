import React from 'react';
import fs from 'fs';
import path from 'path';
import { parseCSV } from '@/lib/csvParser';
import VerbQuizClient from '@/components/thematic/VerbQuizClient';

interface SearchParams {
    tense?: string | string[];
    word?: string | string[];
}

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

const TENSE_FILTER_KEYWORDS: Record<string, string[]> = {
    presente: ['현재'],
    perfecto: ['현재완료'],
    indefinido: ['점과거'],
    imperfecto: ['불완전과거', '선과거'],
    futuro: ['미래'],
    condicional: ['조건'],
    subj_presente: ['접속법 현재'],
    subj_imperfecto: ['접속법 과거', '접속법 불완료과거'],
    imperativo: ['명령법', '명령형']
};

const TENSE_DISPLAY_LABEL: Record<string, string> = {
    presente: '현재',
    perfecto: '현재완료',
    indefinido: '점과거',
    imperfecto: '불완전과거',
    futuro: '미래',
    condicional: '조건법',
    subj_presente: '접속법 현재',
    subj_imperfecto: '접속법 과거',
    imperativo: '명령법'
};

const normalizeText = (value: string) =>
    value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();

const pickQuery = (value?: string | string[]) => (Array.isArray(value) ? value[0] : value) || '';

async function getQuizData(): Promise<QuizItem[]> {
    // Read the new V2 dataset which has pre-generated distractors and masked translations
    const filePath = path.join(process.cwd(), 'src/data/conjugation_dataset_v2.csv');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    const records = parseCSV(fileContent) as Array<Record<string, string>>;

    return records
    .map((record, index: number) => {
        const answer = record['정답'];
        const wrongOptions = record['오답보기'] ? record['오답보기'].split(',') : [];
        const tenseAndHint = record['시제및단서'] || record['설명'] || '';
        const tenseMatch = typeof tenseAndHint === 'string' ? tenseAndHint.match(/\[([^\]]+)\]/) : null;
        const tense = (record['시제'] || tenseMatch?.[1] || '').trim();
        
        // Pick 3 random wrong options
        const selectedWrong = wrongOptions.sort(() => 0.5 - Math.random()).slice(0, 3);
        
        // Combine answer + 3 distractors and shuffle
        const options = Array.from(new Set([...selectedWrong, answer].filter(Boolean))).sort(() => 0.5 - Math.random());

        return {
            id: `quiz-${index}`,
            type: 1, 
            verb: (record['동사 기본형'] || record['단어원형'] || '').trim(),
            tense,
            sentence: record['문장 (빈칸 포함)'],
            answer: answer,
            hint: (record['설명'] || tenseAndHint || '').trim(),
            options: options,
            translation: record['번역']
        };
    })
    .filter((item) => item.answer && item.sentence && item.options.length > 0);
}

export default async function VerbQuizPage({
    searchParams
}: {
    searchParams?: Promise<SearchParams> | SearchParams;
}) {
    const resolvedSearchParams = await Promise.resolve(searchParams ?? {});
    const quizData = await getQuizData();
    const selectedTenseId = pickQuery(resolvedSearchParams.tense);
    const selectedWord = pickQuery(resolvedSearchParams.word);
    const normalizedWord = normalizeText(selectedWord);

    const tenseKeywords = TENSE_FILTER_KEYWORDS[selectedTenseId] || [];
    const byTense = tenseKeywords.length === 0
        ? quizData
        : quizData.filter((item) => {
            const target = normalizeText(`${item.tense} ${item.hint}`);
            return tenseKeywords.some((keyword) => target.includes(normalizeText(keyword)));
        });

    const byWord = !normalizedWord
        ? byTense
        : byTense.filter((item) => {
            const target = normalizeText(`${item.sentence} ${item.translation} ${item.hint} ${item.verb}`);
            return target.includes(normalizedWord);
        });

    const relaxedWordFilter = Boolean(normalizedWord && byWord.length === 0 && byTense.length > 0);
    const filteredQuizData = byWord.length > 0
        ? byWord
        : byTense.length > 0
            ? byTense
            : quizData;

    const shuffled = [...filteredQuizData].sort((a, b) => a.id.localeCompare(b.id));
    const tenseLabel = selectedTenseId ? TENSE_DISPLAY_LABEL[selectedTenseId] || selectedTenseId : '';
    const totalCount = shuffled.length;

    return (
        <div className="max-w-full py-8 px-4 ml-0">
            <header className="mb-8 ml-2">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">동사 마스터 실전 퀴즈</h1>
                <p className="text-slate-500 font-medium">문장 속 빈칸에 알맞은 동사 변화형을 채워보세요.</p>
                {(tenseLabel || selectedWord) && (
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                        {tenseLabel && (
                            <span className="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-semibold">
                                시제: {tenseLabel}
                            </span>
                        )}
                        {selectedWord && (
                            <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 font-semibold">
                                단어: {selectedWord}
                            </span>
                        )}
                        <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-semibold">
                            문제 {totalCount}개
                        </span>
                        {relaxedWordFilter && (
                            <span className="text-amber-600 font-semibold">
                                (단어 필터 일치 항목이 없어 시제 기준으로 표시)
                            </span>
                        )}
                    </div>
                )}
            </header>
            <VerbQuizClient quizData={shuffled} />
        </div>
    );
}
