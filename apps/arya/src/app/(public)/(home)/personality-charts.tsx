import Link from 'next/link'
import { RadarChart } from '@/components/radar-chart'
import {
  MBTI_CATEGORIES,
  MBTI_PERSONALITY_TYPES
} from '@/data/mbti-personality-types'

export function PersonalityCharts() {
  return (
    <section id="personality-charts">
      <div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Seu Perfil de Personalidade MBTI
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Descubra como suas características de personalidade influenciam suas
            conexões e interações.
          </p>
          <Link
            href="/register"
            className="text-md hover:bg-primary-500 mt-6 inline-block animate-[button-glow_2.5s_ease-in-out_infinite] rounded-md px-6 py-3 font-medium text-white transition-all duration-300 hover:animate-none"
          >
            Faça o Teste MBTI
          </Link>
        </div>

        {/* Scroll horizontal para os gráficos */}
        <div className="overflow-x-auto">
          <div className="flex space-x-6">
            {MBTI_PERSONALITY_TYPES.Analistas.types.map(profile => (
              <div key={profile.type} className="w-[420px] flex-shrink-0">
                <RadarChart
                  series={profile.series}
                  title={profile.type}
                  categories={MBTI_CATEGORIES}
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
