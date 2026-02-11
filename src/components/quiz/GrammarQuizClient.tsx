'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import { GRAMMAR_DATA, QuizQuestion } from '@/data/grammarData';
import QuizRunner from '@/components/quiz/QuizRunner';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function GrammarQuizClient({ id }: { id: string }) {
  let questions: QuizQuestion[] = [];
  let title = "";
  let studyLink = "";

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
    studyLink = `/grammar/${id}`;
  }

  if (questions.length === 0) {
      return (
          <div className="text-center py-20">
              <h2 className="text-xl font-bold text-gray-700">준비된 문제가 없습니다.</h2>
              <p className="text-gray-500">나중에 다시 시도해주세요.</p>
              {studyLink && (
                  <Link href={studyLink} className="inline-flex items-center gap-2 mt-4 text-blue-600 hover:underline">
                      <BookOpen size={18} />
                      {title.replace(" Quiz", "")} 개념 공부하러 가기
                  </Link>
              )}
          </div>
      );
  }

  return (
    <div className="py-10">
      {studyLink && (
          <div className="max-w-2xl mx-auto mb-6 flex justify-end">
              <Link 
                href={studyLink} 
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-bold hover:bg-blue-100 transition-colors"
              >
                  <BookOpen size={16} />
                  이 챕터 개념 복습하기
              </Link>
          </div>
      )}
      <QuizRunner 
        title={title}
        questions={questions}
      />
    </div>
  );
}
