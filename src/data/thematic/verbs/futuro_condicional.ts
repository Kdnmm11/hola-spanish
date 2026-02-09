import { TenseDetail } from '../../thematicData';

export const futuroData: TenseDetail = {
    id: 'futuro',
    name: '미래 (futuro simple)',
    usage: [
        { situ: '의지 / 계획 / 약속', ex: 'mañana viajaré a madrid.', ko: '내일 나는 마드리드로 여행할 것이다.' },
        { situ: '현재 상황에 대한 강한 추측', ex: '¿qué hora será?', ko: '지금 몇 시쯤일까?' },
        { situ: '미래의 불확실한 행동', ex: 'lo haré más tarde.', ko: '나중에 그것을 할게.' }
    ],
    regular: {
        ar: ['aré', 'arás', 'ará', 'aremos', 'aréis', 'arán'],
        er: ['eré', 'erás', 'erá', 'eremos', 'eréis', 'erán'],
        ir: ['iré', 'irás', 'irá', 'iremos', 'iréis', 'irán']
    },
    irregularGroups: [
        {
            cat: '어간 변화 (d 추가 계열)',
            verbs: [
                { v: 'tener', mean: '가지다', forms: { yo: ['tendr', 'é'], tu: ['tendr', 'ás'], el: ['tendr', 'á'], nos: ['tendr', 'emos'], vos: ['tendr', 'éis'], ellos: ['tendr', 'án'] } },
                { v: 'poner', mean: '놓다/두다', forms: { yo: ['pondr', 'é'], tu: ['pondr', 'ás'], el: ['pondr', 'á'], nos: ['pondr', 'emos'], vos: ['pondr', 'éis'], ellos: ['pondr', 'án'] } },
                { v: 'salir', mean: '나가다', forms: { yo: ['saldr', 'é'], tu: ['saldr', 'ás'], el: ['saldr', 'á'], nos: ['saldr', 'emos'], vos: ['saldr', 'éis'], ellos: ['saldr', 'án'] } },
                { v: 'venir', mean: '오다', forms: { yo: ['vendr', 'é'], tu: ['vendr', 'ás'], el: ['vendr', 'á'], nos: ['vendr', 'emos'], vos: ['vendr', 'éis'], ellos: ['vendr', 'án'] } }
            ]
        },
        {
            cat: '어간 변화 (e 탈락 계열)',
            verbs: [
                { v: 'poder', mean: '할 수 있다', forms: { yo: ['podr', 'é'], tu: ['podr', 'ás'], el: ['podr', 'á'], nos: ['podr', 'emos'], vos: ['podr', 'éis'], ellos: ['podr', 'án'] } },
                { v: 'saber', mean: '알다', forms: { yo: ['sabr', 'é'], tu: ['sabr', 'ás'], el: ['sabr', 'á'], nos: ['sabr', 'emos'], vos: ['sabr', 'éis'], ellos: ['sabr', 'án'] } },
                { v: 'querer', mean: '원하다', forms: { yo: ['querr', 'é'], tu: ['querr', 'ás'], el: ['querr', 'á'], nos: ['querr', 'emos'], vos: ['querr', 'éis'], ellos: ['querr', 'án'] } }
            ]
        },
        {
            cat: '어간 변화 (축약 계열)',
            verbs: [
                { v: 'hacer', mean: '하다', forms: { yo: ['har', 'é'], tu: ['har', 'ás'], el: ['har', 'á'], nos: ['har', 'emos'], vos: ['har', 'éis'], ellos: ['har', 'án'] } },
                { v: 'decir', mean: '말하다', forms: { yo: ['dir', 'é'], tu: ['dir', 'ás'], el: ['dir', 'á'], nos: ['dir', 'emos'], vos: ['dir', 'éis'], ellos: ['dir', 'án'] } }
            ]
        }
    ]
};

export const condicionalData: TenseDetail = {
    id: 'condicional',
    name: '조건법 (condicional simple)',
    usage: [
        { situ: '정중한 부탁 / 제안', ex: '¿podría ayudarme, por favor?', ko: '저를 좀 도와주실 수 있나요?' },
        { situ: '과거 시점에서의 미래', ex: 'dijo que vendría a las 5.', ko: '그는 5시에 올 것이라고 말했다.' },
        { situ: '가상 상황의 결과 (~할 텐데)', ex: 'si tuviera tiempo, iría al cine.', ko: '시간이 있다면 영화관에 갈 텐데.' },
        { situ: '과거에 대한 추측', ex: 'serían las diez khi él llegó.', ko: '그가 왔을 때는 아마 10시쯤이었을 것이다.' }
    ],
    regular: {
        ar: ['aría', 'arías', 'aría', 'aríamos', 'aríais', 'arían'],
        er: ['ería', 'erías', 'ería', 'eríamos', 'eríais', 'erían'],
        ir: ['iría', 'irías', 'iría', 'iríamos', 'iríais', 'irían']
    },
    irregularGroups: [
        {
            cat: '어간 변화 (d 추가 계열)',
            verbs: [
                { v: 'tener', mean: '가지다', forms: { yo: ['tendr', 'ía'], tu: ['tendr', 'ías'], el: ['tendr', 'ía'], nos: ['tendr', 'íamos'], vos: ['tendr', 'íais'], ellos: ['tendr', 'ían'] } },
                { v: 'poner', mean: '놓다/두다', forms: { yo: ['pondr', 'ía'], tu: ['pondr', 'ías'], el: ['pondr', 'ía'], nos: ['pondr', 'íamos'], vos: ['pondr', 'íais'], ellos: ['pondr', 'ían'] } },
                { v: 'salir', mean: '나가다', forms: { yo: ['saldr', 'ía'], tu: ['saldr', 'ías'], el: ['saldr', 'ía'], nos: ['saldr', 'íamos'], vos: ['saldr', 'íais'], ellos: ['saldr', 'ían'] } },
                { v: 'venir', mean: '오다', forms: { yo: ['vendr', 'ía'], tu: ['vendr', 'ías'], el: ['vendr', 'ía'], nos: ['vendr', 'íamos'], vos: ['vendr', 'íais'], ellos: ['vendr', 'ían'] } }
            ]
        },
        {
            cat: '어간 변화 (e 탈락 계열)',
            verbs: [
                { v: 'poder', mean: '할 수 있다', forms: { yo: ['podr', 'ía'], tu: ['podr', 'ías'], el: ['podr', 'ía'], nos: ['podr', 'íamos'], vos: ['podr', 'íais'], ellos: ['podr', 'ían'] } },
                { v: 'saber', mean: '알다', forms: { yo: ['sabr', 'ía'], tu: ['sabr', 'ías'], el: ['sabr', 'ía'], nos: ['sabr', 'íamos'], vos: ['sabr', 'íais'], ellos: ['sabr', 'ían'] } },
                { v: 'querer', mean: '원하다', forms: { yo: ['querr', 'ía'], tu: ['querr', 'ías'], el: ['querr', 'ía'], nos: ['querr', 'íamos'], vos: ['querr', 'íais'], ellos: ['querr', 'ían'] } }
            ]
        },
        {
            cat: '어간 변화 (축약 계열)',
            verbs: [
                { v: 'hacer', mean: '하다', forms: { yo: ['har', 'ía'], tu: ['har', 'ías'], el: ['har', 'ía'], nos: ['har', 'íamos'], vos: ['har', 'íais'], ellos: ['har', 'ían'] } },
                { v: 'decir', mean: '말하다', forms: { yo: ['dir', 'ía'], tu: ['dir', 'ías'], el: ['dir', 'ía'], nos: ['dir', 'íamos'], vos: ['dir', 'íais'], ellos: ['dir', 'ían'] } }
            ]
        }
    ]
};