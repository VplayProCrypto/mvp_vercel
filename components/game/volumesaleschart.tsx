'use client'

import { OpenseaCollectionStats } from '@/types'
import { XAxis, CartesianGrid, BarChart, Bar } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart'
import { TrendingUp } from 'lucide-react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../ui/card'

interface VolumeSalesChartProps {
  title: string
  collectionStats: OpenseaCollectionStats
}

const chartConfig = {
  volume: {
    label: 'Volume (ETH)',
    color: '#4338ca', // Indigo-700
  },
  sales: {
    label: 'Sales',
    color: '#f59e0b', // Blue-600
  },
} satisfies ChartConfig

export function VolumeSalesChart({
  title,
  collectionStats,
}: VolumeSalesChartProps) {
  const chartData = collectionStats.intervals.map((interval, index) => {
    console.log(interval)
    console.log(index)
    const periods = ['Last 24H', 'Last 7 days', 'Last 30 days']
    const volume = parseFloat(interval.volume)
    return {
      name: periods[index],
      volume: volume,
      sales: interval.sales,
    }
  })
  console.log(chartData)
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Activity Data for this Game</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ChartContainer config={chartConfig}>
          <BarChart
            width={500}
            height={300}
            data={chartData}
            accessibilityLayer>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey="volume"
              fill={chartConfig.volume.color}
              radius={4}
              opacity={0.9}
            />
            <Bar
              dataKey="sales"
              fill={chartConfig.sales.color}
              radius={4}
              opacity={0.9}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          <TrendingUp className="h-4 w-4" />
          Volume and sales metrics
        </div>
        <div className="leading-none text-muted-foreground">
          Showing data for 1 day, 7 days, and 30 days
        </div>
      </CardFooter>
    </Card>
  )
}

export default VolumeSalesChart
