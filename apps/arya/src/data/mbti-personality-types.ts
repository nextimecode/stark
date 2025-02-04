import { SYSTEM_COLORS } from './system-color'

export const MBTI_CATEGORIES = [
  'Julgamento',
  'Percepção',
  'Pensamento',
  'Sentimento',
  'Intuição',
  'Sensação',
  'Extroversão',
  'Introversão'
]

export const MBTI_PERSONALITY_TYPES = {
  Analistas: {
    color: SYSTEM_COLORS.SystemPurple,
    types: [
      {
        type: 'INTJ',
        name: 'Arquiteto',
        description:
          'Pensadores criativos e estratégicos, com um plano para tudo.',
        color: SYSTEM_COLORS.SystemIndigo,
        series: [{ name: 'INTJ', data: [68, 65, 54, 38, 0, 0, 0, 0] }]
      },
      {
        type: 'INTP',
        name: 'Lógico',
        description:
          'Inventores criativos, com uma sede insaciável de conhecimento.',
        color: SYSTEM_COLORS.SystemBlue,
        series: [{ name: 'INTP', data: [41, 70, 65, 33, 0, 0, 0, 0] }]
      },
      {
        type: 'ENTJ',
        name: 'Comandante',
        description:
          'Líderes corajosos, criativos e determinados, sempre dando um jeito para tudo.',
        color: SYSTEM_COLORS.SystemRed,
        series: [{ name: 'ENTJ', data: [82, 87, 33, 62, 0, 0, 0, 0] }]
      },
      {
        type: 'ENTP',
        name: 'Inovador',
        description:
          'Pensadores espertos e curiosos, que não resistem a um desafio intelectual.',
        color: SYSTEM_COLORS.SystemOrange,
        series: [{ name: 'ENTP', data: [50, 64, 69, 76, 0, 0, 0, 0] }]
      }
    ]
  },
  Diplomatas: {
    color: SYSTEM_COLORS.SystemGreen,
    types: [
      {
        type: 'INFJ',
        name: 'Apoiador',
        description:
          'Idealistas serenos e místicos, porém muito inspiradores e incansáveis.',
        color: SYSTEM_COLORS.SystemPurple,
        series: [{ name: 'INFJ', data: [50, 26, 67, 43, 0, 0, 0, 0] }]
      },
      {
        type: 'INFP',
        name: 'Mediador',
        description:
          'Pessoas poéticas, bondosas e altruístas, sempre prontas para apoiar uma boa causa.',
        color: SYSTEM_COLORS.SystemPink,
        series: [{ name: 'INFP', data: [36, 57, 65, 38, 0, 0, 0, 0] }]
      },
      {
        type: 'ENFJ',
        name: 'Protagonista',
        description:
          'Líderes carismáticos e inspiradores, capazes de hipnotizar seus ouvintes.',
        color: SYSTEM_COLORS.SystemYellow,
        series: [{ name: 'ENFJ', data: [45, 48, 62, 60, 0, 0, 0, 0] }]
      },
      {
        type: 'ENFP',
        name: 'Ativista',
        description:
          'Espíritos livres animados, criativos e sociáveis, que sempre encontram um motivo para sorrir.',
        color: SYSTEM_COLORS.SystemTeal,
        series: [{ name: 'ENFP', data: [41, 48, 70, 67, 0, 0, 0, 0] }]
      }
    ]
  },
  Sentinelas: {
    color: SYSTEM_COLORS.SystemMint,
    types: [
      {
        type: 'ISTJ',
        name: 'Prático',
        description:
          'Indivíduos pragmáticos e focados em fatos, com uma confiabilidade indiscutível.',
        color: SYSTEM_COLORS.SystemGray,
        series: [{ name: 'ISTJ', data: [86, 83, 19, 21, 0, 0, 0, 0] }]
      },
      {
        type: 'ISFJ',
        name: 'Defensor',
        description:
          'Protetores muito dedicados e acolhedores, sempre prontos para defender quem amam.',
        color: SYSTEM_COLORS.SystemBrown,
        series: [{ name: 'ISFJ', data: [68, 57, 32, 52, 0, 0, 0, 0] }]
      }
    ]
  },
  Exploradores: {
    color: SYSTEM_COLORS.SystemYellow,
    types: [
      {
        type: 'ISTP',
        name: 'Virtuoso',
        description:
          'Experimentadores ousados e práticos, mestres em todos os tipos de ferramentas.',
        color: SYSTEM_COLORS.SystemCyan,
        series: [{ name: 'ISTP', data: [36, 83, 37, 43, 0, 0, 0, 0] }]
      },
      {
        type: 'ISFP',
        name: 'Aventureiro',
        description:
          'Artistas flexíveis e encantadores, sempre prontos para explorar e experimentar algo novo.',
        color: SYSTEM_COLORS.SystemGray3,
        series: [{ name: 'ISFP', data: [41, 54, 50, 48, 0, 0, 0, 0] }]
      }
    ]
  }
}
