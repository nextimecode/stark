'use client'

import { ApexOptions } from 'apexcharts'
import { ApexChart } from './apex-chart'

interface RadarChartProps {
  categories: string[]
  colors?: string[]
  height?: number
  series: { data: number[]; name: string }[]
  title: string
}

export const RadarChart = ({
  categories,
  colors,
  height = 350,
  series,
  title
}: RadarChartProps) => {
  const options: ApexOptions = {
    chart: {
      toolbar: { show: false },
      type: 'radar'
    },
    colors,
    fill: { opacity: 0.5 },
    grid: {
      padding: { bottom: -30, left: 0, right: 0, top: -30 }
    },
    markers: { size: 4 },
    stroke: { width: 2 },
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
    }
  }

  return (
    <div className="mx-auto w-full max-w-full">
      <h2 className="text-center text-2xl font-bold dark:text-white">
        {title}
      </h2>
      <ApexChart
        height={height}
        series={series}
        type="radar"
        options={options}
      />
    </div>
  )
}
