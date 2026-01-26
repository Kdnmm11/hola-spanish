'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
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
import PerfectTensesDetail from '@/components/grammar/PerfectTensesDetail';
import FutureConditionalDetail from '@/components/grammar/FutureConditionalDetail';
import ImperativesDetail from '@/components/grammar/ImperativesDetail';
import SubjunctiveBasicsDetail from '@/components/grammar/SubjunctiveBasicsDetail';
import ClauseConnectionsDetail from '@/components/grammar/ClauseConnectionsDetail';
import PorParaDetail from '@/components/grammar/PorParaDetail';
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

export default function GrammarDetail() {
  const params = useParams();
  const id = params?.id as string;

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
  if (id === 'perfect-tenses') {
    return <PerfectTensesDetail />;
  }
  if (id === 'future-conditional') {
    return <FutureConditionalDetail />;
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