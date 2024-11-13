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

const platformChartConfig = {
  linux: {
    label: 'Linux',
    color: '#FF5733',
  },
  mac: {
    label: 'Mac',
    color: '#33FF57',
  },
  ios: {
    label: 'iOS',
    color: '#3357FF',
  },
  windows: {
    label: 'Windows',
    color: '#FF33F5',
  },
  android: {
    label: 'Android',
    color: '#33FFF5',
  },
  other: {
    label: 'Other',
    color: '#F5FF33',
  },
} satisfies ChartConfig

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

const distributionChartConfig = {
  ecosystemFund: {
    label: 'Ecosystem Fund',
    color: '#FF5733',
  },
  treasury: {
    label: 'Treasury',
    color: '#33FF57',
  },
  investors: {
    label: 'Investors',
    color: '#3357FF',
  },
  team: {
    label: 'Team',
    color: '#FF33F5',
  },
  advisors: {
    label: 'Advisors',
    color: '#33FFF5',
  },
  binanceLaunchpool: {
    label: 'Binance Launchpool',
    color: '#F5FF33',
  },
  alphaRewards: {
    label: 'Alpha Rewards',
    color: '#FF9933',
  },
  liquidity: {
    label: 'Liquidity',
    color: '#9933FF',
  },
} satisfies ChartConfig
// MetricsSection.tsx

type TokenDistributionProps = {
  tokenDistribution: {
    name: string
    value: number
  }[]
}

export function TokenDistributionSection({
  tokenDistribution,
}: TokenDistributionProps) {
  const totalTokens = tokenDistribution.reduce(
    (acc, curr) => acc + curr.value,
    0
  )

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Token Distribution</CardTitle>
        <CardDescription>Token allocation breakdown</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px] flex items-center justify-center">
        <ChartContainer config={distributionChartConfig}>
          <PieChart
            width={500}
            height={300}>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie
              data={tokenDistribution}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}>
              {tokenDistribution.map(entry => (
                <Cell
                  key={`cell-${entry.name}`}
                  fill={
                    distributionChartConfig[
                      entry.name as keyof typeof distributionChartConfig
                    ].color
                  }
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tokenDistribution.map(item => {
            const config =
              distributionChartConfig[
                item.name as keyof typeof distributionChartConfig
              ]
            return (
              <div
                key={item.name}
                className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: config.color }}
                />
                <span>
                  {config.label} ({item.value}%)
                </span>
              </div>
            )
          })}
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
