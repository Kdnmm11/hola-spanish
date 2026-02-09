import { TenseDetail } from '../../thematicData';

export const imperativoData: TenseDetail = {
    id: 'imperativo',
    name: '명령형 (imperativo)',
    usage: [
        { situ: '명령 / 지시', ex: '¡habla más despacio, por favor!', ko: '더 천천히 말해줘!' },
        { situ: '초대 / 제안', ex: 'pasa y siéntate.', ko: '들어와서 앉으렴.' },
        { situ: '조언 / 권고', ex: 'estudia mucho para el examen.', ko: '시험을 위해 열심히 공부하렴.' }
    ],
    regular: {
        ar: ['-', 'a', 'e', 'emos', 'ad', 'en'],
        er: ['-', 'e', 'a', 'amos', 'ed', 'an'],
        ir: ['-', 'e', 'a', 'amos', 'id', 'an']
    },
    irregularGroups: [
        {
            cat: 'tú 긍정 명령 (8대 불규칙)',
            verbs: [
                { v: 'hacer', mean: '하다', forms: { yo: ['-', ''], tu: ['haz', ''], el: ['hag', 'a'], nos: ['hag', 'amos'], vos: ['hac', 'ed'], ellos: ['hag', 'an'] } },
                { v: 'decir', mean: '말하다', forms: { yo: ['-', ''], tu: ['di', ''], el: ['dig', 'a'], nos: ['dig', 'amos'], vos: ['dec', 'id'], ellos: ['dig', 'an'] } },
                { v: 'ir', mean: '가다', forms: { yo: ['-', ''], tu: ['ve', ''], el: ['vay', 'a'], nos: ['vay', 'amos'], vos: ['i', 'd'], ellos: ['vay', 'an'] } },
                { v: 'poner', mean: '놓다/두다', forms: { yo: ['pon', ''], tu: ['pon', ''], el: ['pong', 'a'], nos: ['pong', 'amos'], vos: ['pon', 'ed'], ellos: ['pong', 'an'] } },
                { v: 'salir', mean: '나가다', forms: { yo: ['-', ''], tu: ['sal', ''], el: ['salg', 'a'], nos: ['salg', 'amos'], vos: ['sal', 'id'], ellos: ['salg', 'an'] } },
                { v: 'ser', mean: '이다', forms: { yo: ['-', ''], tu: ['sé', ''], el: ['se', 'a'], nos: ['se', 'amos'], vos: ['se', 'd'], ellos: ['se', 'an'] } },
                { v: 'tener', mean: '가지다', forms: { yo: ['-', ''], tu: ['ten', ''], el: ['teng', 'a'], nos: ['teng', 'amos'], vos: ['ten', 'ed'], ellos: ['teng', 'an'] } },
                { v: 'venir', mean: '오다', forms: { yo: ['-', ''], tu: ['ven', ''], el: ['vien', 'a'], nos: ['veng', 'amos'], vos: ['ven', 'id'], ellos: ['veng', 'an'] } }
            ]
        }
    ]
};