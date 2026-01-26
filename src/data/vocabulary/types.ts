export type WordCategory = '가구' | '가족' | '감각' | '감정' | '건강' | '계절' | '교통' | '교육' | '국가' | '날씨' | '동물' | '사람' | '음식' | '운동' | '직업' | '집' | '자연' | '장소' | '개념' | '경영';

export interface VerbConjugation {
  present: string[]; 
  past: string[];    
  future: string[];  
  subjunctive: string[]; 
  conditional: string[]; 
  imperative?: string[]; 
  participle_pres?: string; 
  participle_past?: string; 
}

export interface Vocabulary {
  id: string;
  category: WordCategory;
  es: string;
  meanings: { pos: string; text: string }[];
  detail: {
    gender?: 'm' | 'f' | 'mf';
    isIrregular?: boolean;
    idioms?: { phrase: string; meaning: string }[];
    examples: { es: string; kr: string }[];
    conjugation?: VerbConjugation; 
    synonyms?: string[];
    antonyms?: string[];
    definition?: string;
  };
}
