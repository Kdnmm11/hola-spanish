import React from 'react';
import { GRAMMAR_DATA } from '@/data/grammarData';
import GrammarQuizClient from '@/components/quiz/GrammarQuizClient';

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { id: 'comprehensive' },
    ...GRAMMAR_DATA.map(item => ({ id: item.id }))
  ];
}

export default async function GrammarQuizPage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const resolved = await Promise.resolve(params);
  return <GrammarQuizClient id={resolved.id} />;
}
