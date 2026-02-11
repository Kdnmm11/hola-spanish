'use client';

import React, { useMemo } from 'react';
import { useRouter, notFound } from 'next/navigation';
import { vocabData } from '@/data/vocabulary';
import QuizRunner, { QuizQuestion } from '@/components/quiz/QuizRunner';

export default function VocabQuizClient({ theme }: { theme: string }) {
  const decodedTheme = decodeURIComponent(theme);

  const questions: QuizQuestion[] = useMemo(() => {
    let targetWords = [];
    
    if (decodedTheme === 'random') {
        targetWords = [...vocabData];
    } else {
        targetWords = vocabData.filter(v => v.category === decodedTheme);
    }

    if (targetWords.length === 0) return [];

    // Shuffle and pick up to 15 words
    targetWords = targetWords
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
        .slice(0, 15);

    return targetWords.map((word, index) => {
        // Create Distractors (Wrong Answers)
        const distractors = vocabData
            .filter(v => v.id !== word.id)
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value.meanings[0].text)
            .slice(0, 3);

        const options = [...distractors, word.meanings[0].text];
        
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }

        const correctIndex = options.indexOf(word.meanings[0].text);

        return {
            id: `v-${index}`,
            question: `다음 단어의 뜻은 무엇인가요?\n\"${word.es}\"`, 
            options: options,
            correctAnswer: correctIndex,
            explanation: `${word.es} = ${word.meanings[0].text}. 예문: ${word.detail.examples[0].es} (${word.detail.examples[0].kr})`
        };
    });
  }, [decodedTheme]);

  if (questions.length === 0) {
      if (decodedTheme !== 'random' && !vocabData.some(v => v.category === decodedTheme)) {
          return (
            <div className="text-center py-20">
                <h2 className="text-xl font-bold text-gray-700">해당 테마를 찾을 수 없습니다.</h2>
                <button onClick={() => window.history.back()} className="mt-4 text-blue-500 hover:underline">돌아가기</button>
            </div>
          )
      }
      return (
          <div className="text-center py-20">
             <h2 className="text-xl font-bold text-gray-700">문제가 부족합니다.</h2>
             <p className="text-gray-500">데이터를 확인해주세요.</p>
          </div>
      );
  }

  return (
    <div className="py-10 max-w-2xl mx-auto px-4">
      <QuizRunner 
        title={`${decodedTheme === 'random' ? 'Random' : decodedTheme} Vocabulary Quiz`}
        questions={questions}
      />
    </div>
  );
}
