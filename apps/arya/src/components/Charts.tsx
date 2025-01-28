import { RadarChart } from './RadarChart'

export function Charts() {
  return (
    <section id="charts">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Visualize Suas Conexões
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Gráficos detalhados para compreender como você se relaciona em
            diferentes áreas.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-12">
          <RadarChart
            title="Compatibilidade"
            categories={[
              'Personalidade',
              'Valores e Objetivos',
              'Estilo de Vida',
              'Interesses e Hobbies',
              'Linguagem do Amor'
            ]}
            series={[{ name: 'Amizade', data: [20, 15, 10, 25, 30] }]}
            colors={['#64D2FF', '#BF5AF2']}
          />
          <RadarChart
            title="Amizade"
            categories={[
              'Interesses e Hobbies',
              'Personalidade e Estilo Social ',
              'Valores e Ética',
              'Estilo de Vida',
              'Conexão'
            ]}
            series={[{ name: 'Parceria', data: [25, 20, 30, 15, 10] }]}
            colors={['#FF9F0A', '#30D158']}
          />
          <RadarChart
            title="Trabalho"
            categories={[
              'Habilidades Técnicas',
              'Estilo de Trabalho',
              'Valores',
              'Horários',
              'Objetivos de Carreira'
            ]}
            series={[{ name: 'Equipe', data: [30, 25, 20, 15, 10] }]}
            colors={['#FF375F', '#0A84FF']}
          />
        </div>
      </div>
    </section>
  )
}
