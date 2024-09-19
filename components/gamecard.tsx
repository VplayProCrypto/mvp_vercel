import React from 'react'
import Image from 'next/image'

export interface GameCardProps {
  banner: string
  name: string
  categories: string[]
  inGamePrice: string
  entryCost: string
  rewardRate: string
  riskRate: {
    text: string
    percentage: number
  }
}

export const GameCard: React.FC<GameCardProps> = ({
  banner,
  name,
  categories,
  inGamePrice,
  entryCost,
  rewardRate,
  riskRate,
}) => {
  return (
    <div className="w-60 h-96 px-2 py-7 flex-col justify-center items-center inline-flex">
      <div className="w-56 h-96 rounded-xl shadow flex-col justify-start items-start inline-flex">
        <div className="w-56 h-72 rounded-xl overflow-hidden">
          <Image
            src={banner}
            alt={name}
            width={224}
            height={283}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="self-stretch h-44 px-4 pt-3 pb-3.5 flex-col justify-start items-start gap-3 flex">
          <div className="self-stretch h-14 flex-col justify-start items-start gap-1 flex">
            <div className="justify-start items-start gap-1 inline-flex">
              {categories.map((category, index) => (
                <React.Fragment key={index}>
                  <span className="text-white text-xs font-extralight font-['Be Vietnam Pro'] leading-3">
                    {category.toUpperCase()}
                  </span>
                  {index < categories.length - 1 && (
                    <span className="text-white text-xs font-normal font-['Satoshi Variable'] leading-3">
                      •
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
            <h3 className="self-stretch text-white text-sm font-medium font-['Syne'] capitalize leading-tight">
              {name}
            </h3>
          </div>
          <div className="self-stretch justify-start items-start gap-3 inline-flex">
            <div className="flex-col justify-start items-start gap-1 inline-flex">
              <div className="h-9 flex-col justify-start items-start gap-1 flex">
                <span className="text-white text-xs font-bold font-['Satoshi Variable'] leading-none">
                  In-game Price
                </span>
                <span className="text-white text-xs font-light font-['Be Vietnam Pro'] leading-tight">
                  {inGamePrice}
                </span>
              </div>
              <div className="h-9 flex-col justify-start items-start gap-1 flex">
                <span className="text-white text-xs font-bold font-['Satoshi Variable']">
                  Entry Cost
                </span>
                <span className="text-white text-xs font-light font-['Be Vietnam Pro']">
                  {entryCost}
                </span>
              </div>
            </div>
            <div className="flex-col justify-start items-start gap-1.5 inline-flex">
              <div className="h-11 flex-col justify-start items-start gap-1 flex">
                <span className="w-20 text-white text-xs font-bold font-['Satoshi Variable'] leading-none">
                  Reward Rate
                </span>
                <div className="self-stretch h-7 flex-col justify-center items-start flex">
                  <span className="self-stretch text-white text-xs font-light font-['Be Vietnam Pro']">
                    {rewardRate} DAYS
                  </span>
                  <span className="self-stretch text-white text-xs font-light font-['Be Vietnam Pro']">
                    ESTIMATED
                  </span>
                </div>
              </div>
              <div className="h-8 justify-start items-start gap-2.5 inline-flex">
                <div className="self-stretch flex-col justify-start items-start gap-1 inline-flex">
                  <span className="text-white text-xs font-bold font-['Satoshi Variable'] leading-3">
                    Risk
                    <br />
                    Rate
                  </span>
                </div>
                <div className="w-9 h-9 relative">
                  <div className="w-full h-full bg-white/80 rounded-full absolute" />
                  <div
                    className="w-full h-full bg-[#0093ff] rounded-full absolute"
                    style={{
                      clipPath: `inset(0 ${100 - riskRate.percentage}% 0 0)`,
                    }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-white/80 text-xs font-bold font-['Be Vietnam Pro']">
                    {riskRate.percentage}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
