import { OpenseaCollectionStats } from '@/types'
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
  isPositive?: boolean
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

  ratingData: {
    metrics: {
      playToEarnRate: number
      freeToPlayRate: number
      tokenomicsStability: number
      rewardStreams: number
    }
    tokenDistribution: {
      name: string
      value: number
    }[]

    totalRating: number
    totalRatingsCount: number
  }
}

const BusinessIntelligence: React.FC<BiComponentProps> = ({
  statCards,
  collectionStats,

  ratingData,
}) => {
  return (
    <div className="w-full flex flex-col gap-10 mt-10 mb-10">
      <h2 className="text-xl font-medium mb-4 text-white">
        Business Intelligence
      </h2>

      <div className="grid grid-cols-4 gap-4">
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
      </div>

      <div className="flex justify-start items-start">
        <Ratings {...ratingData} />
      </div>
    </div>
  )
}

export default BusinessIntelligence
