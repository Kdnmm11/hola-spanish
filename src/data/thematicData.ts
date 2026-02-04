import { presenteData } from './thematic/verbs/presente';
import { perfectoData } from './thematic/verbs/perfecto';
import { indefinidoData } from './thematic/verbs/indefinido';
import { imperfectoData } from './thematic/verbs/imperfecto';
import { futuroData, condicionalData } from './thematic/verbs/futuro_condicional';
import { subjuntivoPresenteData, subjuntivoImperfectoData } from './thematic/verbs/subjuntivo';
import { imperativoData } from './thematic/verbs/imperativo';

export interface TenseDetail {
    id: string;
    name: string;
    usage: { situ: string; ex: string; ko: string }[];
    isCompound?: boolean;
    regular: {
        ar: string[];
        er: string[];
        ir: string[];
    };
    irregularGroups?: {
        cat: string;
        verbs: { 
            v: string; 
            mean: string;
            forms: { yo: string[]; tu: string[]; el: string[]; nos: string[]; vos: string[]; ellos: string[] } 
        }[];
    }[];
    simpleIrregulars?: { v: string; mean: string; pp: string }[];
}

export const TENSE_MASTER_DATA: TenseDetail[] = [
    presenteData,
    perfectoData,
    indefinidoData,
    imperfectoData,
    futuroData,
    condicionalData,
    subjuntivoPresenteData,
    subjuntivoImperfectoData,
    imperativoData
];

export interface VerbFullConjugation {
    v: string;
    mean: string;
    isRegular: boolean;
    gerund?: string;
    pastParticiple?: string;
    tenses: {
        id: string;
        name: string;
        forms: string[][];
    }[];
}
