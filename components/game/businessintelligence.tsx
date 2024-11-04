import { OpenseaCollectionStats } from '@/types'
import React from 'react'
import VolumeSalesChart from './volumesaleschart'
import TrafficByWebsite from './traffic'
import Ratings from './ratings'

interface BaseCardProps {
  children: React.ReactNode
  className?: string
}

const BaseCard: React.FC<BaseCardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`p-8 rounded-2xl shadow flex-col justify-start items-start gap-3 inline-flex ${className}`}>
      {children}
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string
  change: string
  isPositive: boolean
  bgColor?: string
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive,
  bgColor = 'bg-white',
}) => {
  return (
    <BaseCard className={`w-72 ${bgColor}`}>
      <div className="Content w-52 rounded-lg justify-start items-center gap-2 inline-flex">
        <div className="Text grow shrink basis-0 rounded-lg flex-col justify-center items-start inline-flex">
          <div className="self-stretch h-7 text-[#1c1c1c] text-base font-medium  uppercase leading-normal">
            {title}
          </div>
        </div>
      </div>
      <div className="Content self-stretch rounded-xl justify-between items-center inline-flex">
        <div className="text-[#1c1c1c] text-3xl  leading-loose">
          {parseFloat(value) < 1 ?
            parseFloat(value).toFixed(4)
          : Math.floor(parseFloat(value))}
        </div>
        <div className="Icontext h-6 rounded-lg justify-end items-center gap-1 flex">
          <div className="Text rounded-lg flex-col justify-center items-start inline-flex">
            <div className="self-stretch text-[#1c1c1c] text-base font-normal  leading-normal">
              {change}
            </div>
          </div>
          <div className="Iconset rounded-lg justify-center items-center flex">
            <div
              className={`w-4 h-4 relative ${isPositive ? 'Arrowrise' : 'Arrowfall'}`}
            />
          </div>
        </div>
      </div>
    </BaseCard>
  )
}

interface BiComponentProps {
  statCards: StatCardProps[]
  collectionStats: OpenseaCollectionStats
}
const websiteData = [
  { name: 'Google', traffic: 85 },
  { name: 'YouTube', traffic: 75 },
  { name: 'Twitch', traffic: 60 },
  { name: 'Discord', traffic: 45 },
  { name: 'Opensea', traffic: 30 },
  { name: 'Official', traffic: 25 },
]

const data = {
  metrics: {
    playToEarnRate: 4,
    freeToPlayRate: 3.5,
    tokenomicsStability: 4,
    rewardStreams: 3.5,
  },
  tokenDistribution: [
    { name: 'publicSale', value: 11 },
    { name: 'team', value: 21 },
    { name: 'advisors', value: 7 },
    { name: 'playToEarn', value: 20 },
    { name: 'stakingRewards', value: 29 },
    { name: 'ecosystemFund', value: 8 },
  ],
  platformRatings: [
    { platform: 'linux', value: 20 },
    { platform: 'mac', value: 40 },
    { platform: 'ios', value: 30 },
    { platform: 'windows', value: 60 },
    { platform: 'android', value: 25 },
    { platform: 'other', value: 45 },
  ],
  totalRating: 4.1,
  totalRatingsCount: 11542,
}
const BusinessIntelligence: React.FC<BiComponentProps> = ({
  statCards,
  collectionStats,
}) => {
  return (
    <div className="w-full flex flex-col gap-10 mt-10 mb-10">
      <h2 className="text-xl font-medium mb-4 text-white">
        Business Intelligence
      </h2>

      {/* Row 1: Stat Cards */}
      <div className="flex justify-between items-start gap-4">
        {statCards.map((card, index) => (
          <StatCard
            key={index}
            {...card}
          />
        ))}
      </div>

      <div className="flex space-x-10 justify-start items-start">
        <VolumeSalesChart
          key="volume-sales-chart"
          title="Volume and Sales"
          collectionStats={collectionStats}
        />
        <TrafficByWebsite websites={websiteData} />
      </div>

      {/* Row 3: Rating Summary Chart */}
      <div className="flex justify-start items-start">
        <Ratings {...data} />
      </div>
    </div>
  )
}

export default BusinessIntelligence
