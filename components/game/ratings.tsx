'use client'

import * as React from 'react'
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  Label,
  Tooltip,
  YAxis,
  CartesianGrid,
} from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Progress } from '@/components/ui/progress'
import { useState, useEffect } from 'react'

type MetricKey =
  | 'playToEarnRate'
  | 'freeToPlayRate'
  | 'tokenomicsStability'
  | 'rewardStreams'

type Props = {
  metrics: Record<MetricKey, number>
  tokenDistribution: {
    name: string
    value: number
  }[]
  totalRating: number
  totalRatingsCount: number
}

function generateRandomColor(): string {
  return (
    '#' +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')
  )
}

type MetricsSectionProps = {
  metrics: Record<MetricKey, number>
}

export function MetricsSection({ metrics }: MetricsSectionProps) {
  return (
    <div>
      <CardHeader className="px-0">
        <h3 className="text-sm font-medium">Rating Summary</h3>
      </CardHeader>
      <CardContent className="px-0 space-y-4">
        {Object.entries(metrics).map(([key, value]) => (
          <div
            key={key}
            className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
              <span>{value}/5</span>
            </div>
            <Progress
              value={value * 20}
              className="h-1"
            />
          </div>
        ))}
      </CardContent>
    </div>
  )
}

type TokenDistributionProps = {
  tokenDistribution: {
    name: string
    value: number
  }[]
}

export function TokenDistributionSection({
  tokenDistribution,
}: TokenDistributionProps) {
  const [colors, setColors] = useState<Record<string, string>>({})
  const [chartConfig, setChartConfig] = useState<ChartConfig>({})

  useEffect(() => {
    const newColors: Record<string, string> = {}
    tokenDistribution.forEach(item => {
      newColors[item.name] = generateRandomColor()
    })
    setColors(newColors)

    const newChartConfig: Record<string, { label: string; color: string }> = {}
    tokenDistribution.forEach(item => {
      newChartConfig[item.name] = {
        label: item.name,
        color: newColors[item.name],
      }
    })
    setChartConfig(newChartConfig)
  }, [tokenDistribution])

  const totalTokens = tokenDistribution.reduce(
    (acc, curr) => acc + curr.value,
    0
  )

  const formattedData = tokenDistribution.map(item => ({
    name: item.name,
    value: Number(item.value),
  }))
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Token Distribution</CardTitle>
        <CardDescription>Token allocation breakdown</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px] flex items-center justify-center">
        <div className="w-full h-full">
          <ChartContainer config={chartConfig}>
            <PieChart
              width={500}
              height={300}>
              <Tooltip />
              <Pie
                data={formattedData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                label>
                {tokenDistribution.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[entry.name]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tokenDistribution.map(item => (
            <div
              key={item.name}
              className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: colors[item.name] }}
              />
              <span>
                {item.name} ({item.value}%)
              </span>
            </div>
          ))}
        </div>
        <div className="text-sm text-muted-foreground">
          Total Distribution: {totalTokens}%
        </div>
      </CardFooter>
    </Card>
  )
}

export function Ratings({ metrics, tokenDistribution }: Props) {
  return (
    <Card className="p-6 bg-gray-900 text-white">
      <div className="grid grid-cols-3 gap-8">
        <MetricsSection metrics={metrics} />
        <TokenDistributionSection tokenDistribution={tokenDistribution} />
      </div>
    </Card>
  )
}

export default Ratings
