import { TenseDetail } from '../../thematicData';

export const presenteData: TenseDetail = {
    id: 'presente',
    name: '현재 (presente)',
    usage: [
        { situ: '현재의 습관 / 반복되는 일', ex: 'estudio español cada mañana.', ko: '나는 매일 아침 스페인어를 공부한다.' },
        { situ: '불변의 진리 / 사실', ex: 'la tierra es redonda.', ko: '지구는 둥글다.' },
        { situ: '가까운 미래의 확정된 계획', ex: 'mañana te llamo sin falta.', ko: '내일 너에게 꼭 전화할게.' },
        { situ: '일반적인 상태 묘사', ex: 'tengo mucha hambre.', ko: '나는 배가 많이 고프다.' }
    ],
    regular: {
        ar: ['o', 'as', 'a', 'amos', 'áis', 'an'],
        er: ['o', 'es', 'e', 'emos', 'éis', 'en'],
        ir: ['o', 'es', 'e', 'imos', 'ís', 'en']
    },
    irregularGroups: [
        {
            cat: '어간 변화 (e → ie)',
            verbs: [
                { v: 'empezar', mean: '시작하다', forms: { yo: ['empiez', 'o'], tu: ['empiez', 'as'], el: ['empiez', 'a'], nos: ['empez', 'amos'], vos: ['empez', 'áis'], ellos: ['empiez', 'an'] } },
                { v: 'querer', mean: '원하다/사랑하다', forms: { yo: ['quier', 'o'], tu: ['quier', 'es'], el: ['quier', 'e'], nos: ['quer', 'emos'], vos: ['quer', 'éis'], ellos: ['quier', 'en'] } },
                { v: 'pensar', mean: '생각하다', forms: { yo: ['piens', 'o'], tu: ['piens', 'as'], el: ['piens', 'a'], nos: ['pens', 'amos'], vos: ['pens', 'áis'], ellos: ['piens', 'an'] } },
                { v: 'entender', mean: '이해하다', forms: { yo: ['entiend', 'o'], tu: ['entiend', 'es'], el: ['entiend', 'e'], nos: ['entend', 'emos'], vos: ['entend', 'éis'], ellos: ['entiend', 'en'] } }
            ]
        },
        {
            cat: '어간 변화 (o → ue / u → ue)',
            verbs: [
                { v: 'poder', mean: '할 수 있다', forms: { yo: ['pued', 'o'], tu: ['pued', 'es'], el: ['pued', 'e'], nos: ['pod', 'emos'], vos: ['pod', 'éis'], ellos: ['pued', 'en'] } },
                { v: 'dormir', mean: '자다', forms: { yo: ['duerm', 'o'], tu: ['duerm', 'es'], el: ['duerm', 'e'], nos: ['dorm', 'imos'], vos: ['dorm', 'ís'], ellos: ['duerm', 'en'] } },
                { v: 'volver', mean: '돌아가다', forms: { yo: ['vuelv', 'o'], tu: ['vuelv', 'es'], el: ['vuelv', 'e'], nos: ['volv', 'emos'], vos: ['volv', 'éis'], ellos: ['vuelv', 'en'] } },
                { v: 'jugar', mean: '놀다/경기하다', forms: { yo: ['juegu', 'o'], tu: ['jueg', 'as'], el: ['jueg', 'a'], nos: ['jug', 'amos'], vos: ['jug', 'áis'], ellos: ['jueg', 'an'] } }
            ]
        },
        {
            cat: '어간 변화 (e → i)',
            verbs: [
                { v: 'pedir', mean: '요청하다', forms: { yo: ['pid', 'o'], tu: ['pid', 'es'], el: ['pid', 'e'], nos: ['ped', 'imos'], vos: ['ped', 'ís'], ellos: ['pid', 'en'] } },
                { v: 'servir', mean: '서빙하다', forms: { yo: ['sirv', 'o'], tu: ['sirv', 'es'], el: ['sirv', 'e'], nos: ['serv', 'imos'], vos: ['serv', 'ís'], ellos: ['sirv', 'en'] } },
                { v: 'repetir', mean: '반복하다', forms: { yo: ['repit', 'o'], tu: ['repit', 'es'], el: ['repit', 'e'], nos: ['repet', 'imos'], vos: ['repet', 'ís'], ellos: ['repit', 'en'] } }
            ]
        },
        {
            cat: 'yo 불규칙 기반 (-go / -zco)',
            verbs: [
                { v: 'tener', mean: '가지다', forms: { yo: ['teng', 'o'], tu: ['tien', 'es'], el: ['tien', 'e'], nos: ['ten', 'emos'], vos: ['ten', 'éis'], ellos: ['tien', 'en'] } },
                { v: 'decir', mean: '말하다', forms: { yo: ['dig', 'o'], tu: ['dic', 'es'], el: ['dic', 'e'], nos: ['dec', 'imos'], vos: ['dec', 'ís'], ellos: ['dic', 'en'] } },
                { v: 'hacer', mean: '하다', forms: { yo: ['ha', 'go'], tu: ['hac', 'es'], el: ['hac', 'e'], nos: ['hac', 'emos'], vos: ['hac', 'éis'], ellos: ['hac', 'en'] } },
                { v: 'poner', mean: '놓다/두다', forms: { yo: ['pon', 'go'], tu: ['pon', 'es'], el: ['pon', 'e'], nos: ['pon', 'emos'], vos: ['pon', 'éis'], ellos: ['pon', 'en'] } },
                { v: 'salir', mean: '나가다', forms: { yo: ['sal', 'go'], tu: ['sal', 'es'], el: ['sal', 'e'], nos: ['sal', 'imos'], vos: ['sal', 'ís'], ellos: ['sal', 'en'] } },
                { v: 'conocer', mean: '알다', forms: { yo: ['conoz', 'co'], tu: ['conoc', 'es'], el: ['conoc', 'e'], nos: ['conoc', 'emos'], vos: ['conoc', 'éis'], ellos: ['conoc', 'en'] } }
            ]
        },
        {
            cat: '완전 불규칙',
            verbs: [
                { v: 'ser', mean: '이다', forms: { yo: ['soy', ''], tu: ['eres', ''], el: ['es', ''], nos: ['somos', ''], vos: ['sois', ''], ellos: ['son', ''] } },
                { v: 'ir', mean: '가다', forms: { yo: ['voy', ''], tu: ['vas', ''], el: ['va', ''], nos: ['vamos', ''], vos: ['vais', ''], ellos: ['van', ''] } },
                { v: 'estar', mean: '있다', forms: { yo: ['estoy', ''], tu: ['estás', ''], el: ['está', ''], nos: ['estamos', ''], vos: ['estáis', ''], ellos: ['están', ''] } },
                { v: 'saber', mean: '알다', forms: { yo: ['sé', ''], tu: ['sab', 'es'], el: ['sab', 'e'], nos: ['sab', 'emos'], vos: ['sab', 'éis'], ellos: ['sab', 'en'] } },
                                    { v: 'oír', mean: '듣다', forms: { yo: ['oy', 'o'], tu: ['oy', 'es'], el: ['oy', 'e'], nos: ['', 'oímos'], vos: ['', 'oís'], ellos: ['oy', 'en'] } }            ]
        }
    ]
};