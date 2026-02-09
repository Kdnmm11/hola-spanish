import { TenseDetail } from '../../thematicData';

export const imperfectoData: TenseDetail = {
    id: 'imperfecto',
    name: '선과거 (pret. imperfecto)',
    usage: [
        { situ: '과거의 반복적인 습관', ex: 'de niño, jugaba al fútbol cada domingo.', ko: '어렸을 때, 나는 일요일마다 축구를 하곤 했다.' },
        { situ: '과거 진행 중인 상황 (~하고 있었다)', ex: 'yo leía mientras ella coc인aba.', ko: '그녀가 요리하는 동안 나는 책을 읽고 있었다.' },
        { situ: '과거의 배경 / 날씨 / 나이 묘사', ex: 'hacía mucho frío y yo tenía diez años.', ko: '날씨는 매우 추웠고 나는 10살이었다.' }
    ],
    regular: {
        ar: ['aba', 'abas', 'aba', 'ábamos', 'abais', 'aban'],
        er: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'],
        ir: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían']
    },
    irregularGroups: [
        {
            cat: '선과거 불규칙 (단 3개뿐!)',
            verbs: [
                { v: 'ser', mean: '이다', forms: { yo: ['er', 'a'], tu: ['er', 'as'], el: ['er', 'a'], nos: ['ér', 'amos'], vos: ['er', 'ais'], ellos: ['er', 'an'] } },
                { v: 'ir', mean: '가다', forms: { yo: ['ib', 'a'], tu: ['ib', 'as'], el: ['ib', 'a'], nos: ['íb', 'amos'], vos: ['ib', 'ais'], ellos: ['ib', 'an'] } },
                { v: 'ver', mean: '보다', forms: { yo: ['ve', 'ía'], tu: ['ve', 'ías'], el: ['ve', 'ía'], nos: ['ve', 'íamos'], vos: ['ve', 'íais'], ellos: ['ve', 'ían'] } }
            ]
        }
    ]
};