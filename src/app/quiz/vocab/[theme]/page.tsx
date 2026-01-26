'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter, notFound } from 'next/navigation';
import { vocabData } from '@/data/vocabulary';
import { ArrowLeft, CheckCircle2, XCircle, Trophy, RefreshCcw } from 'lucide-react';
import QuizRunner, { QuizQuestion } from '@/components/quiz/QuizRunner'; // Assuming this exists

export default function VocabQuizPage() {
  const params = useParams();
  const theme = decodeURIComponent(params?.theme as string);

  // Generate Questions Logic
  const questions: QuizQuestion[] = useMemo(() => {
    let targetWords = [];
    
    if (theme === 'random') {
        targetWords = [...vocabData];
    } else {
        targetWords = vocabData.filter(v => v.category === theme);
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
            .filter(v => v.id !== word.id) // Exclude current word
            .map(value => ({ value, sort: Math.random() })) // Shuffle
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value.meanings[0].text) // Get meanings
            .slice(0, 3); // Take 3

        const options = [...distractors, word.meanings[0].text];
        
        // Shuffle options
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }

        const correctIndex = options.indexOf(word.meanings[0].text);

        return {
            id: `v-${index}`,
            question: `다음 단어의 뜻은 무엇인가요?\n"${word.es}"`, 
            options: options,
            correctAnswer: correctIndex,
            explanation: `${word.es} = ${word.meanings[0].text}. 예문: ${word.detail.examples[0].es} (${word.detail.examples[0].kr})`
        };
    });
  }, [theme]);


  if (questions.length === 0) {
      if (theme !== 'random' && !vocabData.some(v => v.category === theme)) {
          // No data found for this theme
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
        title={`${theme === 'random' ? 'Random' : theme} Vocabulary Quiz`}
        questions={questions}
      />
    </div>
  );
}