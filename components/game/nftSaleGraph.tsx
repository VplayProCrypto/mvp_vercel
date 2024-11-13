'use client'
import React from 'react'
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'

import { OpenseaAssetEvent } from '@/types'
import { convertEthToUsd, convertWeiToEth } from '@/utils/utils'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart'

interface NftSaleGraphProps {
  collectionSaleEvents: OpenseaAssetEvent[]
  ethPrice: number | null
}

const chartConfig = {
  price: {
    label: 'Price',
    color: '#2563eb',
  },
} satisfies ChartConfig

const NftSaleGraph: React.FC<NftSaleGraphProps> = ({
  collectionSaleEvents,
  ethPrice,
}) => {
  const data = collectionSaleEvents.map(event => ({
    timestamp: new Date(event.event_timestamp * 1000).toLocaleString(),
    price: Math.floor(
      convertEthToUsd(
        parseFloat(convertWeiToEth('ETH', 18, event.payment?.quantity || '0')),
        ethPrice
      )
    ),
  }))

  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        width={400}
        height={200}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 30,
          bottom: 20, // reduced bottom margin since we removed labels
        }}>
        <CartesianGrid
          strokeDasharray="3 3"
          horizontal={true}
          vertical={false}
          stroke="#e5e5e5"
        />
        <XAxis
          dataKey="timestamp"
          hide={true} // hides the x-axis completely
        />
        <YAxis
          dataKey="price"
          tickFormatter={value => `$${value}`}
          tickLine={false}
          axisLine={false}
          stroke="#64748b"
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent />}
        />
        <Line
          type="natural"
          dataKey="price"
          stroke="#2563eb"
          strokeWidth={2}
          dot={false}
          activeDot={{
            r: 4,
            fill: '#2563eb',
            stroke: '#fff',
            strokeWidth: 2,
          }}
        />
      </LineChart>
    </ChartContainer>
  )
}

export default NftSaleGraph
