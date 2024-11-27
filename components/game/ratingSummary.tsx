import { OpenseaAssetEvent } from '@/types'
import React from 'react'
import NftSaleGraph from './nftSaleGraph'
import RatingCircle from './ratingCircle'

interface RatingSummaryProps {
  easeOfPlay: number
  funRating: number
  nftRarity: number
  transparencyRating: number
  sessionLength: number
  rewardRate: number
  collectionSaleEvents: OpenseaAssetEvent[]
  ethPrice: number
}

const RatingSummary: React.FC<RatingSummaryProps> = ({
  easeOfPlay,
  funRating,
  nftRarity,
  transparencyRating,
  sessionLength,
  rewardRate,
  collectionSaleEvents,
  ethPrice,
}) => {
  const RatingBars = ({ value }: { value: number }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <div
          key={i}
          className={`w-6 h-2 rounded-sm ${
            i <= value ? 'bg-white' : 'bg-gray-700'
          }`}></div>
      ))}
    </div>
  )

  return (
    <div className="mt-8 bg-black rounded-xl p-6">
      <h2 className="text-xl font-medium mb-4 text-white">Rating Summary</h2>
      <div className="flex flex-row items-center justify-between">
        <RatingCircle
          value={easeOfPlay}
          label="EASE OF PLAY"
          color="#4ADE80"
        />
        <div>
          {[
            { label: 'Fun Rating', value: funRating },
            { label: 'NFT Rarity', value: nftRarity },
            { label: 'Transparency Rating', value: transparencyRating },
            { label: 'Session Length', value: sessionLength },
          ].map((item, index) => (
            <div
              key={index}
              className="mb-3 flex items-center">
              <span className="text-white text-sm mr-4 w-40">{item.label}</span>
              <RatingBars value={item.value} />
              <span className="text-gray-400 text-sm ml-4">{item.value}/5</span>
            </div>
          ))}
        </div>
        <RatingCircle
          value={rewardRate}
          label="REWARD RATE"
          color="#3B82F6"
        />
      </div>
    </div>
  )
}

export default RatingSummary
