'use client'

import dynamic from 'next/dynamic'

import { ApexOptions } from 'apexcharts'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

type ApexChartProps = {
  options: ApexOptions
  series: Array<{
    name: string
    data: number[]
  }>
  type: 'line' | 'bar' | 'pie' | 'area' | 'radar'
  height: number
}

export const ApexChart = ({
  options,
  series,
  type,
  height
}: ApexChartProps) => {
  return <Chart options={options} series={series} type={type} height={height} />
}
