import React from 'react';
import { vocabData } from '@/data/vocabulary';
import VocabQuizClient from '@/components/quiz/VocabQuizClient';

export const dynamicParams = false;

export function generateStaticParams() {
  const themes = Array.from(new Set(vocabData.map(v => v.category)));
  return [
    { theme: 'random' },
    ...themes.map(theme => ({ theme }))
  ];
}

export default async function VocabQuizPage({
  params,
}: {
  params: Promise<{ theme: string }> | { theme: string };
}) {
  const resolved = await Promise.resolve(params);
  return <VocabQuizClient theme={resolved.theme} />;
}
