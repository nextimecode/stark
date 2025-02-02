'use client'

import { ApexOptions } from 'apexcharts'

import { ApexChart } from './ApexChart'

interface RadarChartProps {
  title: string
  categories: string[]
  series: { name: string; data: number[] }[]
  colors?: string[]
  height?: number
}

export const RadarChart = ({
  title,
  categories,
  series,
  colors,
  height = 350
}: RadarChartProps) => {
  const options: ApexOptions = {
    chart: {
      type: 'radar',
      toolbar: { show: false }
    },
    grid: {
      padding: { top: -30, bottom: -30, left: 0, right: 0 }
    },
    xaxis: {
      categories,
      labels: {
        show: true,
        style: {
          colors: [
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff'
          ],
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      show: false
    },
    stroke: { width: 2 },
    markers: { size: 4 },
    fill: { opacity: 0.5 },
    colors
  }

  return (
    <div className="w-full max-w-full mx-auto">
      <h2 className="text-2xl font-bold text-center">{title}</h2>
      <ApexChart
        options={options}
        series={series}
        type="radar"
        height={height}
      />
    </div>
  )
}
