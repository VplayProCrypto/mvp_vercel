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
  platformRatings: {
    platform: string
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
  publicSale: {
    label: 'Public Sale',
    color: '#FF5733',
  },
  team: {
    label: 'Team',
    color: '#33FF57',
  },
  advisors: {
    label: 'Advisors',
    color: '#3357FF',
  },
  playToEarn: {
    label: 'Play to Earn',
    color: '#FF33F5',
  },
  stakingRewards: {
    label: 'Staking Rewards',
    color: '#33FFF5',
  },
  ecosystemFund: {
    label: 'Ecosystem Fund',
    color: '#F5FF33',
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

type PlatformRatingsSectionProps = {
  platformRatings: {
    platform: string
    value: number
  }[]
  totalRating: number
  totalRatingsCount: number
}

export function PlatformRatingsSection({
  platformRatings,
  totalRating,
  totalRatingsCount,
}: PlatformRatingsSectionProps) {
  const formattedData = platformRatings.map(item => ({
    ...item,
    color:
      platformChartConfig[
        item.platform.toLowerCase() as keyof typeof platformChartConfig
      ].color,
    label:
      platformChartConfig[
        item.platform.toLowerCase() as keyof typeof platformChartConfig
      ].label,
  }))

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium">Rating Summary</h3>
          <span>★ {totalRating}</span>
          <span className="text-muted-foreground">
            — {totalRatingsCount} Ratings
          </span>
        </div>
      </CardHeader>
      <CardContent className="h-[300px] flex items-center justify-center">
        <ChartContainer config={platformChartConfig}>
          <BarChart
            width={400}
            height={250}
            data={formattedData}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              type="number"
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
              cursor={{ fill: 'transparent' }}
            />
            <Bar
              dataKey="value"
              radius={[4, 4, 0, 0]}
              barSize={20}>
              {formattedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
// Main Ratings component
export function Ratings({
  metrics,
  tokenDistribution,
  platformRatings,
  totalRating,
  totalRatingsCount,
}: Props) {
  return (
    <Card className="p-6 bg-gray-900 text-white">
      <div className="grid grid-cols-3 gap-8">
        <MetricsSection metrics={metrics} />
        <TokenDistributionSection tokenDistribution={tokenDistribution} />
        <PlatformRatingsSection
          platformRatings={platformRatings}
          totalRating={totalRating}
          totalRatingsCount={totalRatingsCount}
        />
      </div>
    </Card>
  )
}

export default Ratings
