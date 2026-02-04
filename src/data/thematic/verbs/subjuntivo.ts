import { TenseDetail } from '../../thematicData';

export const subjuntivoPresenteData: TenseDetail = {
    id: 'subj_presente',
    name: '접속법 현재 (subj. presente)',
    usage: [
        { situ: '바람 / 희망 / 요구 (que 절)', ex: 'espero que tengas un buen día.', ko: '네가 좋은 하루를 보내길 바래.' },
        { situ: '감정 / 평가 / 판단', ex: 'me alegra que estés aquí.', ko: '네가 여기 있어서 기뻐.' },
        { situ: '의심 / 부정 / 불확실성', ex: 'no creo que sea verdad.', ko: '그게 사실이라고 믿지 않아.' },
        { situ: '아직 일어나지 않은 미래의 일', ex: 'cuando llegues, llámame.', ko: '네가 도착하면(나중에), 나에게 전화해.' }
    ],
    regular: {
        ar: ['e', 'es', 'e', 'emos', 'éis', 'en'],
        er: ['a', 'as', 'a', 'amos', 'áis', 'an'],
        ir: ['a', 'as', 'a', 'amos', 'áis', 'an']
    },
    irregularGroups: [
        {
            cat: 'yo 불규칙 기반 (-g / -j / -zc)',
            verbs: [
                { v: 'tener', mean: '가지다', forms: { yo: ['teng', 'a'], tu: ['teng', 'as'], el: ['teng', 'a'], nos: ['teng', 'amos'], vos: ['teng', 'áis'], ellos: ['teng', 'an'] } },
                { v: 'decir', mean: '말하다', forms: { yo: ['dig', 'a'], tu: ['dig', 'as'], el: ['dig', 'a'], nos: ['dig', 'amos'], vos: ['dig', 'áis'], ellos: ['dig', 'an'] } },
                { v: 'hacer', mean: '하다', forms: { yo: ['hag', 'a'], tu: ['hag', 'as'], el: ['hag', 'a'], nos: ['hag', 'amos'], vos: ['hag', 'áis'], ellos: ['hag', 'an'] } },
                { v: 'conocer', mean: '알다', forms: { yo: ['conozc', 'a'], tu: ['conozc', 'as'], el: ['conozc', 'a'], nos: ['conozc', 'amos'], vos: ['conozc', 'áis'], ellos: ['conozc', 'an'] } }
            ]
        },
        {
            cat: '완전 불규칙 (sides)',
            verbs: [
                { v: 'ser', mean: '이다', forms: { yo: ['se', 'a'], tu: ['se', 'as'], el: ['se', 'a'], nos: ['se', 'amos'], vos: ['se', 'áis'], ellos: ['se', 'an'] } },
                { v: 'ir', mean: '가다', forms: { yo: ['vay', 'a'], tu: ['vay', 'as'], el: ['vay', 'a'], nos: ['vay', 'amos'], vos: ['vay', 'áis'], ellos: ['vay', 'an'] } },
                { v: 'saber', mean: '알다', forms: { yo: ['sep', 'a'], tu: ['sep', 'as'], el: ['sep', 'a'], nos: ['sep', 'amos'], vos: ['sep', 'áis'], ellos: ['sep', 'an'] } }
            ]
        }
    ]
};

export const subjuntivoImperfectoData: TenseDetail = {
    id: 'subj_imperfecto',
    name: '접속법 과거 (subj. imperfecto)',
    usage: [
        { situ: '비현실적 가정 (~라면)', ex: 'si tuviera dinero, viajaría.', ko: '만약 돈이 있다면 여행할 텐데.' },
        { situ: '정중한 바람 / 부탁', ex: 'quisiera pedir un favor.', ko: '부탁을 하나 드리고 싶습니다.' },
        { situ: '과거 시점에서의 바람/감정', ex: 'quería que vinieras.', ko: '나는 네가 오기를 원했었다.' }
    ],
    regular: {
        ar: ['ara', 'aras', 'ara', 'áramos', 'arais', 'aran'],
        er: ['iera', 'ieras', 'iera', 'iéramos', 'ierais', 'ieran'],
        ir: ['iera', 'ieras', 'iera', 'iéramos', 'ierais', 'ieran']
    },
    irregularGroups: [
        {
            cat: '점과거 3인칭 복수 기반 불규칙',
            verbs: [
                { v: 'tener', mean: '가졌다면', forms: { yo: ['tuvier', 'a'], tu: ['tuvier', 'as'], el: ['tuvier', 'a'], nos: ['tuvier', 'amos'], vos: ['tuvier', 'ais'], ellos: ['tuvier', 'an'] } },
                { v: 'hacer', mean: '했다면', forms: { yo: ['hicier', 'a'], tu: ['hicier', 'as'], el: ['hicier', 'a'], nos: ['hicier', 'amos'], vos: ['hicier', 'ais'], ellos: ['hicier', 'an'] } },
                { v: 'decir', mean: '말했다면', forms: { yo: ['dijer', 'a'], tu: ['dijer', 'as'], el: ['dijer', 'a'], nos: ['dijer', 'amos'], vos: ['dijer', 'ais'], ellos: ['dijer', 'an'] } },
                { v: 'ser/ir', mean: '이었다면/갔다면', forms: { yo: ['fuer', 'a'], tu: ['fuer', 'as'], el: ['fuer', 'a'], nos: ['fuer', 'amos'], vos: ['fuer', 'ais'], ellos: ['fuer', 'an'] } },
                { v: 'poder', mean: '할 수 있었다면', forms: { yo: ['pudier', 'a'], tu: ['pudier', 'as'], el: ['pudier', 'a'], nos: ['pudier', 'amos'], vos: ['pudier', 'ais'], ellos: ['pudier', 'an'] } },
                { v: 'saber', mean: '알았다면', forms: { yo: ['supier', 'a'], tu: ['supier', 'as'], el: ['supier', 'a'], nos: ['supier', 'amos'], vos: ['supier', 'ais'], ellos: ['supier', 'an'] } }
            ]
        }
    ]
};
