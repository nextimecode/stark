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
        color: SYSTEM_COLORS.SystemIndigo,
        description:
          'Pensadores criativos e estratégicos, com um plano para tudo.',
        name: 'Arquiteto',
        series: [{ data: [68, 65, 54, 38, 0, 0, 0, 0], name: 'INTJ' }],
        type: 'INTJ'
      },
      {
        color: SYSTEM_COLORS.SystemBlue,
        description:
          'Inventores criativos, com uma sede insaciável de conhecimento.',
        name: 'Lógico',
        series: [{ data: [41, 70, 65, 33, 0, 0, 0, 0], name: 'INTP' }],
        type: 'INTP'
      },
      {
        color: SYSTEM_COLORS.SystemRed,
        description:
          'Líderes corajosos, criativos e determinados, sempre dando um jeito para tudo.',
        name: 'Comandante',
        series: [{ data: [82, 87, 33, 62, 0, 0, 0, 0], name: 'ENTJ' }],
        type: 'ENTJ'
      },
      {
        color: SYSTEM_COLORS.SystemOrange,
        description:
          'Pensadores espertos e curiosos, que não resistem a um desafio intelectual.',
        name: 'Inovador',
        series: [{ data: [50, 64, 69, 76, 0, 0, 0, 0], name: 'ENTP' }],
        type: 'ENTP'
      }
    ]
  },
  Diplomatas: {
    color: SYSTEM_COLORS.SystemGreen,
    types: [
      {
        color: SYSTEM_COLORS.SystemPurple,
        description:
          'Idealistas serenos e místicos, porém muito inspiradores e incansáveis.',
        name: 'Apoiador',
        series: [{ data: [50, 26, 67, 43, 0, 0, 0, 0], name: 'INFJ' }],
        type: 'INFJ'
      },
      {
        color: SYSTEM_COLORS.SystemPink,
        description:
          'Pessoas poéticas, bondosas e altruístas, sempre prontas para apoiar uma boa causa.',
        name: 'Mediador',
        series: [{ data: [36, 57, 65, 38, 0, 0, 0, 0], name: 'INFP' }],
        type: 'INFP'
      },
      {
        color: SYSTEM_COLORS.SystemYellow,
        description:
          'Líderes carismáticos e inspiradores, capazes de hipnotizar seus ouvintes.',
        name: 'Protagonista',
        series: [{ data: [45, 48, 62, 60, 0, 0, 0, 0], name: 'ENFJ' }],
        type: 'ENFJ'
      },
      {
        color: SYSTEM_COLORS.SystemTeal,
        description:
          'Espíritos livres animados, criativos e sociáveis, que sempre encontram um motivo para sorrir.',
        name: 'Ativista',
        series: [{ data: [41, 48, 70, 67, 0, 0, 0, 0], name: 'ENFP' }],
        type: 'ENFP'
      }
    ]
  },
  Exploradores: {
    color: SYSTEM_COLORS.SystemYellow,
    types: [
      {
        color: SYSTEM_COLORS.SystemCyan,
        description:
          'Experimentadores ousados e práticos, mestres em todos os tipos de ferramentas.',
        name: 'Virtuoso',
        series: [{ data: [36, 83, 37, 43, 0, 0, 0, 0], name: 'ISTP' }],
        type: 'ISTP'
      },
      {
        color: SYSTEM_COLORS.SystemGray3,
        description:
          'Artistas flexíveis e encantadores, sempre prontos para explorar e experimentar algo novo.',
        name: 'Aventureiro',
        series: [{ data: [41, 54, 50, 48, 0, 0, 0, 0], name: 'ISFP' }],
        type: 'ISFP'
      }
    ]
  },
  Sentinelas: {
    color: SYSTEM_COLORS.SystemMint,
    types: [
      {
        color: SYSTEM_COLORS.SystemGray,
        description:
          'Indivíduos pragmáticos e focados em fatos, com uma confiabilidade indiscutível.',
        name: 'Prático',
        series: [{ data: [86, 83, 19, 21, 0, 0, 0, 0], name: 'ISTJ' }],
        type: 'ISTJ'
      },
      {
        color: SYSTEM_COLORS.SystemBrown,
        description:
          'Protetores muito dedicados e acolhedores, sempre prontos para defender quem amam.',
        name: 'Defensor',
        series: [{ data: [68, 57, 32, 52, 0, 0, 0, 0], name: 'ISFJ' }],
        type: 'ISFJ'
      }
    ]
  }
}
