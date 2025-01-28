'use client'

import { ApexOptions } from 'apexcharts'

import { ApexChart } from './ApexChart'

export const RadarChart = () => {
  const options: ApexOptions = {
    chart: {
      type: 'radar',
      width: '100%',
      toolbar: {
        show: false // Remove o menu hambúrguer
      },
      offsetX: 0, // Ajusta o deslocamento horizontal
      offsetY: 0 // Ajusta o deslocamento vertical
    },
    grid: {
      padding: {
        top: -50, // Ajusta o espaço superior
        bottom: -50, // Ajusta o espaço inferior
        left: 0, // Ajusta o espaço à esquerda
        right: 0 // Ajusta o espaço à direita
      }
    },
    xaxis: {
      categories: ['Personalidade', 'Valores', 'Estilo', 'Hobbies', 'Amor']
    },
    stroke: {
      width: 2
    },
    markers: {
      size: 4
    },
    fill: {
      opacity: 0.4
    }
  }

  const series = [
    {
      name: 'Compatibilidade',
      data: [30, 25, 20, 15, 10]
    },
    {
      name: 'Amizade',
      data: [20, 15, 10, 25, 30]
    },
    {
      name: 'Trabalho',
      data: [10, 20, 30, 25, 15]
    }
  ]

  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      <h2 className="mb-5 text-2xl font-bold text-center">Compatibilidade</h2>
      <ApexChart options={options} series={series} type="radar" height={350} />
    </div>
  )
}
