'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import { GRAMMAR_DATA, QuizQuestion } from '@/data/grammarData';
import QuizRunner from '@/components/quiz/QuizRunner';

export default function GrammarQuizPage() {
  const params = useParams();
  const id = params?.id as string;

  let questions: QuizQuestion[] = [];
  let title = "";

  if (id === 'comprehensive') {
    title = "종합 문법 능력 평가";
    // Flatten all quizzes and shuffle, pick 10
    const allQuestions = GRAMMAR_DATA.flatMap(t => t.quiz || []);
    // Simple shuffle
    questions = allQuestions
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
        .slice(0, 10);
  } else {
    const topic = GRAMMAR_DATA.find(t => t.id === id);
    if (!topic) {
        notFound();
    }
    title = `${topic.title} Quiz`;
    questions = topic.quiz || [];
  }

  if (questions.length === 0) {
      return (
          <div className="text-center py-20">
              <h2 className="text-xl font-bold text-gray-700">준비된 문제가 없습니다.</h2>
              <p className="text-gray-500">나중에 다시 시도해주세요.</p>
          </div>
      );
  }

  return (
    <div className="py-10">
      <QuizRunner 
        title={title}
        questions={questions}
      />
    </div>
  );
}