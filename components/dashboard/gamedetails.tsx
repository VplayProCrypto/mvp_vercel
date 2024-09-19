import React from 'react'

interface GameDetailsProps {
  gameDetails: {
    costOfEntry: string
    rewardRate: {
      days: number
      estimated: boolean
    }
    inGamePrice: string
    riskRate: {
      text: string
      percentage: number
    }
  }
}

const GameDetails: React.FC<GameDetailsProps> = ({ gameDetails }) => {
  return (
    <div className="Title w-[30%] grid grid-cols-2 gap-x-8 gap-y-4">
      <div className="Price flex flex-col justify-start items-start">
        <div className="text-lg font-normal font-['Be Vietnam Pro'] capitalize leading-tight">
          Cost of entry
        </div>
        <div className="text-white/80 text-lg font-normal font-['Satoshi Variable'] leading-relaxed">
          {gameDetails.costOfEntry}
        </div>
      </div>
      <div className="Reward flex flex-col justify-start items-start">
        <div className="text-lg font-normal font-['Be Vietnam Pro'] capitalize leading-tight">
          Reward Rate
        </div>
        <div className="flex items-center gap-1">
          <span className="text-white/80 text-xl font-normal font-['Satoshi Variable'] leading-7">
            {gameDetails.rewardRate.days}
          </span>
          <span className="text-white/80 text-xs font-medium font-['Satoshi Variable'] uppercase leading-3">
            DAYS
            <br />
            {gameDetails.rewardRate.estimated ? 'ESTIMATED' : ''}
          </span>
        </div>
      </div>
      <div className="HighestBid flex flex-col justify-start items-start">
        <div className="text-lg font-normal font-['Be Vietnam Pro'] capitalize leading-tight">
          In-game Price
        </div>
        <div className="text-white/80 text-lg font-normal font-['Satoshi Variable'] leading-relaxed">
          {gameDetails.inGamePrice}
        </div>
      </div>
      <div className="flex justify-start items-center gap-2">
        <div className="Price flex flex-col justify-start items-start">
          <div className="text-lg font-normal font-['Be Vietnam Pro'] capitalize leading-tight">
            Risk Rate
          </div>
          <div className="text-white/80 text-base font-normal font-['Satoshi Variable'] leading-snug">
            {gameDetails.riskRate.text}
          </div>
        </div>
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 bg-white rounded-full"></div>
          <div className="absolute inset-0 bg-[#0093ff] rounded-full"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-bold font-['Satoshi Variable']">
            {gameDetails.riskRate.percentage}%
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameDetails
