import Link from 'next/link'

import {
  MBTI_PERSONALITY_TYPES,
  MBTI_CATEGORIES
} from '@/data/mbti-personality-types'

import { RadarChart } from './RadarChart'

export function PersonalityCharts() {
  return (
    <section id="personality-charts">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Seu Perfil de Personalidade MBTI
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Descubra como suas características de personalidade influenciam suas
            conexões e interações.
          </p>
          <Link
            href="/register"
            className="mt-6 inline-block px-6 py-3 text-md font-medium text-white hover:bg-primary-500 hover:animate-none rounded-md transition-all duration-300 animate-button-glow"
          >
            Faça o Teste MBTI
          </Link>
        </div>

        {/* Scroll horizontal para os gráficos */}
        <div className="overflow-x-auto">
          <div className="flex space-x-6">
            {MBTI_PERSONALITY_TYPES.Analistas.types.map(profile => (
              <div key={profile.type} className="flex-shrink-0 w-[420px]">
                <RadarChart
                  title={profile.type}
                  categories={MBTI_CATEGORIES}
                  series={profile.series}
                  colors={[profile.color]}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
