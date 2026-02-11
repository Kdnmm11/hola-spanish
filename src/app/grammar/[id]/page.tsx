import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, ChevronLeft, Info, Lightbulb, Check, AlignLeft, List, CheckCircle2 } from 'lucide-react';
import { GRAMMAR_DATA, ContentSection } from '@/data/grammarData';
import PronunciationDetail from '@/components/grammar/PronunciationDetail';
import SentenceStructureDetail from '@/components/grammar/SentenceStructureDetail';
import InterrogativesDetail from '@/components/grammar/InterrogativesDetail';
import NounsAndGenderDetail from '@/components/grammar/NounsAndGenderDetail';
import ArticlesDetail from '@/components/grammar/ArticlesDetail';
import PronounsDetail from '@/components/grammar/PronounsDetail';
import AdjectivesDetail from '@/components/grammar/AdjectivesDetail';
import ComparativesDetail from '@/components/grammar/ComparativesDetail';
import NumbersDetail from '@/components/grammar/NumbersDetail';
import QuantifiersDetail from '@/components/grammar/QuantifiersDetail';
import PossessivesDetail from '@/components/grammar/PossessivesDetail';
import DemonstrativesDetail from '@/components/grammar/DemonstrativesDetail';
import VerbsPresentDetail from '@/components/grammar/VerbsPresentDetail';
import VerbsIrregularDetail from '@/components/grammar/VerbsIrregularDetail';
import TimeExpressionsDetail from '@/components/grammar/TimeExpressionsDetail';
import PrepositionsAdverbsDetail from '@/components/grammar/PrepositionsAdverbsDetail';
import SerEstarDetail from '@/components/grammar/SerEstarDetail';
import HaberDetail from '@/components/grammar/HaberDetail';
import TenerIrHacerDetail from '@/components/grammar/TenerIrHacerDetail';
import ObjectPronounsDetail from '@/components/grammar/ObjectPronounsDetail';
import PreteriteIndefiniteDetail from '@/components/grammar/PreteriteIndefiniteDetail';
import PreteriteImperfectDetail from '@/components/grammar/PreteriteImperfectDetail';

import FutureTenseDetail from '@/components/grammar/FutureTenseDetail';
import ConditionalTenseDetail from '@/components/grammar/ConditionalTenseDetail';
import ImperativesDetail from '@/components/grammar/ImperativesDetail';
import SubjunctiveBasicsDetail from '@/components/grammar/SubjunctiveBasicsDetail';
import ClauseConnectionsDetail from '@/components/grammar/ClauseConnectionsDetail';
import PorParaDetail from '@/components/grammar/PorParaDetail';
import PrepositionsPart1 from '@/components/grammar/PrepositionsPart1';
import PrepositionsPart2 from '@/components/grammar/PrepositionsPart2';
import PrepositionsPart3 from '@/components/grammar/PrepositionsPart3';
import PassiveSeDetail from '@/components/grammar/PassiveSeDetail';
import ReflexiveVerbsDetail from '@/components/grammar/ReflexiveVerbsDetail';
import GustarLikeVerbsDetail from '@/components/grammar/GustarLikeVerbsDetail';
import SubjunctiveImperfectDetail from '@/components/grammar/SubjunctiveImperfectDetail';
import SubjunctivePerfectDetail from '@/components/grammar/SubjunctivePerfectDetail';
import SiClausesDetail from '@/components/grammar/SiClausesDetail';
import IndirectSpeechDetail from '@/components/grammar/IndirectSpeechDetail';
import AdvancedParticiplesDetail from '@/components/grammar/AdvancedParticiplesDetail';
import LogicalConnectorsDetail from '@/components/grammar/LogicalConnectorsDetail';
import RelativePronounsAdvancedDetail from '@/components/grammar/RelativePronounsAdvancedDetail';
import ConcessiveClausesDetail from '@/components/grammar/ConcessiveClausesDetail';
import NeuterLoDetail from '@/components/grammar/NeuterLoDetail';
import PresentParticipleDetail from '@/components/grammar/PresentParticipleDetail';
import PastParticipleDetail from '@/components/grammar/PastParticipleDetail';

export const dynamicParams = false;

export function generateStaticParams() {
  return GRAMMAR_DATA.map(item => ({ id: item.id }));
}

export default async function GrammarDetail({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const resolved = await Promise.resolve(params);
  const id = resolved?.id;

  // [Special Layouts]
  if (id === 'pronunciation') {
    return <PronunciationDetail />;
  }
  if (id === 'sentence-structure') {
    return <SentenceStructureDetail />;
  }
  if (id === 'interrogatives') {
    return <InterrogativesDetail />;
  }
  if (id === 'nouns-and-gender') {
    return <NounsAndGenderDetail />;
  }
  if (id === 'articles') {
    return <ArticlesDetail />;
  }
  if (id === 'pronouns') {
    return <PronounsDetail />;
  }
  if (id === 'adjectives') {
    return <AdjectivesDetail />;
  }
  if (id === 'comparatives') {
    return <ComparativesDetail />;
  }
  if (id === 'numbers') {
    return <NumbersDetail />;
  }
  if (id === 'quantifiers') {
    return <QuantifiersDetail />;
  }
  if (id === 'possessives') {
    return <PossessivesDetail />;
  }
  if (id === 'demonstratives') {
    return <DemonstrativesDetail />;
  }
  if (id === 'verbs-present') {
    return <VerbsPresentDetail />;
  }
  if (id === 'verbs-irregular') {
    return <VerbsIrregularDetail />;
  }
  if (id === 'time-expressions') {
    return <TimeExpressionsDetail />;
  }
  if (id === 'prepositions-adverbs') {
    return <PrepositionsAdverbsDetail />;
  }
  if (id === 'ser-estar') {
    return <SerEstarDetail />;
  }
  if (id === 'haber') {
    return <HaberDetail />;
  }
  if (id === 'tener-ir-hacer') {
    return <TenerIrHacerDetail />;
  }
  if (id === 'object-pronouns') {
    return <ObjectPronounsDetail />;
  }
  if (id === 'preterite-indefinite') {
    return <PreteriteIndefiniteDetail />;
  }
  if (id === 'preterite-imperfect') {
    return <PreteriteImperfectDetail />;
  }
  if (id === 'present-participle') {
    return <PresentParticipleDetail />;
  }
  if (id === 'past-participle') {
    return <PastParticipleDetail />;
  }

  if (id === 'future-tense') {
    return <FutureTenseDetail />;
  }
  if (id === 'conditional-tense') {
    return <ConditionalTenseDetail />;
  }
  if (id === 'imperatives') {
    return <ImperativesDetail />;
  }
  if (id === 'subjunctive-basics') {
    return <SubjunctiveBasicsDetail />;
  }
  if (id === 'clause-connections') {
    return <ClauseConnectionsDetail />;
  }
  if (id === 'por-para') {
    return <PorParaDetail />;
  }
  if (id === 'prep-a-de') {
    return <PrepositionsPart1 />;
  }
  if (id === 'prep-en-con') {
    return <PrepositionsPart2 />;
  }
  if (id === 'prep-others') {
    return <PrepositionsPart3 />;
  }
  if (id === 'passive-se') {
    return <PassiveSeDetail />;
  }
  if (id === 'reflexive-verbs') {
    return <ReflexiveVerbsDetail />;
  }
  if (id === 'gustar-like-verbs') {
    return <GustarLikeVerbsDetail />;
  }
  if (id === 'subjunctive-imperfect') {
    return <SubjunctiveImperfectDetail />;
  }
  if (id === 'subjunctive-perfect') {
    return <SubjunctivePerfectDetail />;
  }
  if (id === 'si-clauses') {
    return <SiClausesDetail />;
  }
  if (id === 'indirect-speech') {
    return <IndirectSpeechDetail />;
  }
  if (id === 'advanced-participles') {
    return <AdvancedParticiplesDetail />;
  }
  if (id === 'logical-connectors') {
    return <LogicalConnectorsDetail />;
  }
  if (id === 'relative-pronouns-advanced') {
    return <RelativePronounsAdvancedDetail />;
  }
  if (id === 'concessive-clauses') {
    return <ConcessiveClausesDetail />;
  }
  if (id === 'neuter-lo') {
    return <NeuterLoDetail />;
  }

  // Not found if not in the chapters
  return notFound();
}
