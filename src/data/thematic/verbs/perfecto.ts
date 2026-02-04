import { TenseDetail } from '../../thematicData';

export const perfectoData: TenseDetail = {
    id: 'perfecto',
    name: '현재완료 (pret. perfecto)',
    isCompound: true,
    usage: [
        { situ: '가까운 과거의 완료', ex: 'hoy he desayunado mucho.', ko: '오늘 나는 아침을 많이 먹었다.' },
        { situ: '경험 (~한 적이 있다)', ex: '¿has estado en españa?', ko: '스페인에 가본 적이 있니?' }
    ],
    regular: {
        ar: ['he -ado', 'has -ado', 'ha -ado', 'hemos -ado', 'habéis -ado', 'han -ado'],
        er: ['he -ido', 'has -ido', 'ha -ido', 'hemos -ido', 'habéis -ido', 'han -ido'],
        ir: ['he -ido', 'has -ido', 'ha -ido', 'hemos -ido', 'habéis -ido', 'han -ido']
    },
    // 현재완료는 특수 표 구조를 위해 'irregularSimple' 필드를 사용하도록 제안 (컴포넌트에서 대응)
    irregularGroups: [
        {
            cat: '주요 불규칙 과거분사 (participio)',
            verbs: [
                { v: 'hacer', mean: '하다', forms: { yo: ['he', ' hecho'], tu: ['has', ' hecho'], el: ['ha', ' hecho'], nos: ['hemos', ' hecho'], vos: ['habéis', ' hecho'], ellos: ['han', ' hecho'] } }
            ]
        }
    ],
    // 분사 불규칙만 따로 묶어서 표시하기 위한 새로운 데이터 구조
    simpleIrregulars: [
        { v: 'hacer', mean: '하다', pp: 'hecho' },
        { v: 'decir', mean: '말하다', pp: 'dicho' },
        { v: 'ver', mean: '보다', pp: 'visto' },
        { v: 'escribir', mean: '쓰다', pp: 'escrito' },
        { v: 'volver', mean: '돌아오다', pp: 'vuelto' },
        { v: 'poner', mean: '놓다/두다', pp: 'puesto' },
        { v: 'abrir', mean: '열다', pp: 'abierto' },
        { v: 'romper', mean: '깨다/부수다', pp: 'roto' },
        { v: 'morir', mean: '죽다', pp: 'muerto' },
        { v: 'resolver', mean: '해결하다', pp: 'resuelto' },
        { v: 'cubrir', mean: '덮다', pp: 'cubierto' }
    ]
};