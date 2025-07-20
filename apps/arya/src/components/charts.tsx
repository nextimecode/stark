import { RadarChart } from './radar-chart'

export function Charts() {
  return (
    <section id="charts">
      <div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl dark:text-white">
            Visualize Suas Conexões
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Gráficos detalhados para compreender como você se relaciona em
            diferentes áreas.
          </p>
        </div>
        <div className="grid grid-cols-1 place-items-center gap-12 sm:grid-cols-2 lg:grid-cols-3">
          <RadarChart
            series={[{ data: [20, 15, 10, 25, 30], name: 'Amizade' }]}
            title="Compatibilidade"
            categories={[
              'Personalidade',
              'Valores e Objetivos',
              'Estilo de Vida',
              'Interesses e Hobbies',
              'Linguagem do Amor'
            ]}
            colors={['#64D2FF', '#BF5AF2']}
          />
          <RadarChart
            series={[{ data: [25, 20, 30, 15, 10], name: 'Parceria' }]}
            title="Amizade"
            categories={[
              'Interesses e Hobbies',
              'Personalidade e Estilo Social ',
              'Valores e Ética',
              'Estilo de Vida',
              'Conexão'
            ]}
            colors={['#FF9F0A', '#30D158']}
          />
          <RadarChart
            series={[{ data: [30, 25, 20, 15, 10], name: 'Equipe' }]}
            title="Trabalho"
            categories={[
              'Habilidades Técnicas',
              'Estilo de Trabalho',
              'Valores',
              'Horários',
              'Objetivos de Carreira'
            ]}
            colors={['#FF375F', '#0A84FF']}
          />
        </div>
      </div>
    </section>
  )
}
