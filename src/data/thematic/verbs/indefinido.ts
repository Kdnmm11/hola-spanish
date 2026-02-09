import { TenseDetail } from '../../thematicData';

export const indefinidoData: TenseDetail = {
    id: 'indefinido',
    name: '점과거 (pret. indefinido)',
    usage: [
        { situ: '과거의 완료된 특정 사건', ex: 'ayer hablé con maría.', ko: '어제 나는 마리아와 이야기했다.' },
        { situ: '일회성 동작의 연속', ex: 'llegué, vi y vencí.', ko: '나는 도착했고, 보았고, 이겼다.' },
        { situ: '역사적 사실', ex: 'nací en seúl.', ko: '나는 서울에서 태어났다.' }
    ],
    regular: {
        ar: ['é', 'aste', 'ó', 'amos', 'asteis', 'aron'],
        er: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'],
        ir: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron']
    },
    irregularGroups: [
        {
            cat: '불규칙 어간 (u / i 계열)',
            verbs: [
                { v: 'estar', mean: '있다', forms: { yo: ['estuv', 'e'], tu: ['estuv', 'iste'], el: ['estuv', 'o'], nos: ['estuv', 'imos'], vos: ['estuv', 'isteis'], ellos: ['estuv', 'ieron'] } },
                { v: 'tener', mean: '가지다', forms: { yo: ['tuv', 'e'], tu: ['tuv', 'iste'], el: ['tuv', 'o'], nos: ['tuv', 'imos'], vos: ['tuv', 'isteis'], ellos: ['tuv', 'ieron'] } },
                { v: 'poder', mean: '할 수 있다', forms: { yo: ['pud', 'e'], tu: ['pud', 'iste'], el: ['pud', 'o'], nos: ['pud', 'imos'], vos: ['pud', 'isteis'], ellos: ['pud', 'ieron'] } },
                { v: 'saber', mean: '알다', forms: { yo: ['sup', 'e'], tu: ['sup', 'iste'], el: ['sup', 'o'], nos: ['sup', 'imos'], vos: ['sup', 'isteis'], ellos: ['sup', 'ieron'] } },
                { v: 'venir', mean: '오다', forms: { yo: ['vin', 'e'], tu: ['vin', 'iste'], el: ['vin', 'o'], nos: ['vin', 'imos'], vos: ['vin', 'isteis'], ellos: ['vin', 'ieron'] } },
                { v: 'hacer', mean: '하다', forms: { yo: ['hic', 'e'], tu: ['hic', 'iste'], el: ['hiz', 'o'], nos: ['hic', 'imos'], vos: ['hic', 'isteis'], ellos: ['hic', 'ieron'] } },
                { v: 'querer', mean: '원하다', forms: { yo: ['quis', 'e'], tu: ['quis', 'iste'], el: ['quis', 'o'], nos: ['quis', 'imos'], vos: ['quis', 'isteis'], ellos: ['quis', 'ieron'] } },
                { v: 'poner', mean: '놓다/두다', forms: { yo: ['pus', 'e'], tu: ['pus', 'iste'], el: ['pus', 'o'], nos: ['pus', 'imos'], vos: ['pus', 'isteis'], ellos: ['pus', 'ieron'] } }
            ]
        },
        {
            cat: '불규칙 어간 (j 계열 - 3인칭 복수 -eron)',
            verbs: [
                { v: 'decir', mean: '말하다', forms: { yo: ['dij', 'e'], tu: ['dij', 'iste'], el: ['dij', 'o'], nos: ['dij', 'imos'], vos: ['dij', 'isteis'], ellos: ['dij', 'eron'] } },
                { v: 'traer', mean: '가져오다', forms: { yo: ['traj', 'e'], tu: ['traj', 'iste'], el: ['traj', 'o'], nos: ['traj', 'imos'], vos: ['traj', 'isteis'], ellos: ['traj', 'eron'] } },
                { v: 'conducir', mean: '운전하다', forms: { yo: ['conduj', 'e'], tu: ['conduj', 'iste'], el: ['conduj', 'o'], nos: ['conduj', 'imos'], vos: ['conduj', 'isteis'], ellos: ['conduj', 'eron'] } }
            ]
        },
                    {
                        cat: '3인칭 철자/모음 변화 (y / i 변화)',
                        verbs: [
                            { v: 'leer', mean: '읽다', forms: { yo: ['', 'leí'], tu: ['', 'leiste'], el: ['ley', 'ó'], nos: ['', 'leímos'], vos: ['', 'leísteis'], ellos: ['ley', 'eron'] } },
                            { v: 'pedir', mean: '요청하다', forms: { yo: ['', 'pedí'], tu: ['', 'pediste'], el: ['pid', 'ió'], nos: ['', 'pedimos'], vos: ['', 'pedisteis'], ellos: ['pid', 'ieron'] } },
                            { v: 'dormir', mean: '자다', forms: { yo: ['', 'dormí'], tu: ['', 'dormiste'], el: ['durm', 'ió'], nos: ['', 'dormimos'], vos: ['', 'dormisteis'], ellos: ['durm', 'ieron'] } }
                        ]
                    },
        {
            cat: '완전 불규칙 (과거)',
            verbs: [
                { v: 'ser/ir', mean: '이다/가다', forms: { yo: ['fu', 'i'], tu: ['fu', 'iste'], el: ['fu', 'e'], nos: ['fu', 'imos'], vos: ['fu', 'isteis'], ellos: ['fu', 'eron'] } },
                { v: 'dar', mean: '주다', forms: { yo: ['d', 'i'], tu: ['d', 'iste'], el: ['di', 'o'], nos: ['d', 'imos'], vos: ['d', 'isteis'], ellos: ['di', 'eron'] } }
            ]
        }
    ]
};