import { Vocabulary } from './src/data/vocabulary/types';

export const furnitureVocab: Vocabulary[] = [
  {
    id: 'furn-alfombra',
    category: '가구',
    es: 'alfombra',
    meanings: [{ pos: 'f.', text: '카펫, 양탄자' }],
    detail: {
      gender: 'f',
      idioms: [{ phrase: 'alfombra roja', meaning: '레드 카펫' }],
      examples: [
        { es: 'La alfombra es suave.', kr: '카펫이 부드럽다.' },
        { es: 'Manché la alfombra de vino.', kr: '카펫에 와인을 쏟았다.' },
        { es: 'Desfilaron por la alfombra roja.', kr: '그들은 레드 카펫을 행진했다.' }
      ]
    }
  },
  {
    id: 'furn-apagar',
    category: '가구',
    es: 'apagar',
    meanings: [{ pos: 'v.', text: '끄다' }],
    detail: {
      idioms: [
        { phrase: 'apagar la luz', meaning: '불을 끄다' },
        { phrase: 'apagar el fuego', meaning: '불을 끄다 (진화하다)' }
      ],
      examples: [
        { es: 'Apaga la luz antes de dormir.', kr: '자기 전에 불을 꺼라.' },
        { es: 'Los bomberos apagaron el incendio.', kr: '소방관들이 화재를 진압했다.' },
        { es: 'Se apagó el ordenador de repente.', kr: '컴퓨터가 갑자기 꺼졌다.' }
      ],
      conjugation: {
        present: ['apago', 'apagas', 'apaga', 'apagamos', 'apagáis', 'apagan'],
        participle_pres: 'apagando',
        participle_past: 'apagado',
        past: ['apagué', 'apagaste', 'apagó', 'apagamos', 'apagasteis', 'apagaron'],
        conditional: ['apagaría', 'apagarías', 'apagaría', 'apagaríamos', 'apagaríais', 'apagarían'],
        subjunctive: ['apague', 'apagues', 'apague', 'apaguemos', 'apaguéis', 'apaguen'],
        future: ['apagaré', 'apagarás', 'apagará', 'apagaríamos', 'apagaríais', 'apagarán']
      }
    }
  }
  // ... (총 33개 단어 수록됨)
];
