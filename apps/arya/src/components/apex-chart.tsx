'use client'

import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

type ApexChartProps = {
  height: number
  options: ApexOptions
  series: Array<{
    data: number[]
    name: string
  }>
  type: 'area' | 'bar' | 'line' | 'pie' | 'radar'
}

export const ApexChart = ({
  height,
  options,
  series,
  type
}: ApexChartProps) => {
  return <Chart height={height} series={series} type={type} options={options} />
}
