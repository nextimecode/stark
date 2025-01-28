'use client'

import { ApexOptions } from 'apexcharts'

import { ApexChart } from './ApexChart'

interface RadarChartProps {
  title: string
  categories: string[]
  series: { name: string; data: number[] }[]
  colors?: string[]
}

export const RadarChart = ({
  title,
  categories,
  series,
  colors
}: RadarChartProps) => {
  const options: ApexOptions = {
    chart: {
      type: 'radar',
      toolbar: { show: false }
    },
    grid: {
      padding: { top: -50, bottom: -50, left: 0, right: 0 }
    },
    xaxis: {
      categories: categories
    },
    stroke: { width: 2 },
    markers: { size: 4 },
    fill: { opacity: 0.4 },
    colors: colors // Adiciona as cores personalizadas
  }

  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      <h2 className="mb-5 text-2xl font-bold text-center">{title}</h2>
      <ApexChart options={options} series={series} type="radar" height={350} />
    </div>
  )
}
