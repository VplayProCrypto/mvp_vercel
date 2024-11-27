import React from 'react'
import { Card, CardContent } from './ui/card'
import Image from 'next/image'
import GameDetails from './dashboard/gamedetails'
import Link from 'next/link'
interface GameDetails {
  costOfEntry: string
  rewardRate: { rr: string; rr_symbol: string }
  inGamePrice: string
  riskRate: { text: string; percentage: number }
}

interface HeroCardProps {
  gameTitle: string
  gameLogoUrl: string
  tagline: string
  starRating: number
  categories: string[]
  description: string
  gameDetails: GameDetails
  games: string[]
  highlightedGameIndex?: number
  backgroundImage: string
  buttonText: string
  buttonURL: string
  onGameClick: (index: number) => void
}

const HeroCard: React.FC<HeroCardProps> = ({
  gameTitle,
  gameLogoUrl,
  tagline,
  starRating,
  categories,
  description,
  gameDetails,
  games,
  highlightedGameIndex = -1,
  backgroundImage,
  buttonText,
  buttonURL,
  onGameClick,
}) => {
  return (
    <Card className="w-full">
      <CardContent className="p-0">
        <div className="Featured w-full h-[36rem] flex flex-col justify-between items-center text-white relative">
          <Image
            src={backgroundImage}
            alt="Background"
            fill
            sizes="100vw" // Since it's a full-width background image
            className="object-cover"
            quality={100}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />{' '}
          {/* Overlay for better text readability */}
          <div className="Title w-full flex-grow px-[10%] py-8% flex justify-between items-end relative z-10">
            <div className="Gametitle flex-grow flex flex-col justify-start items-start gap-4">
              <Image
                className="Image50 w-64 h-16 object-contain"
                src={gameLogoUrl}
                width={64}
                height={16}
                sizes="256px" // Since it has a fixed width of w-64 (256px)
                alt={gameTitle}
              />
              <div className="JoinTheFightForEth w-full max-w-3xl text-2xl md:text-4xl font-medium font-['Be Vietnam Pro'] capitalize leading-loose">
                {gameTitle}
              </div>
              <div className="Stars w-72 flex justify-start items-start gap-0.5">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-5 h-5 ${index < starRating ? 'text-yellow-400' : 'text-gray-400'} fill-current`}
                    viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
          <div className="Details w-full px-[10%] py-4% backdrop-blur-lg flex justify-between items-end relative z-10">
            <div className="AdditionalInfo w-[30%] flex flex-col justify-end items-start gap-4">
              <div className="Categories w-full flex flex-wrap justify-start items-start gap-1.5 mb-2">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="px-3 py-1.5 bg-white rounded">
                    <div className="text-black text-sm font-medium font-['Satoshi Variable'] leading-none">
                      {category}
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-full text-justify text-sm font-medium font-['Be Vietnam Pro'] leading-snug">
                {description}
              </div>
            </div>
            <GameDetails gameDetails={gameDetails} />
            <div className="w-[30%] flex justify-end items-end">
              <Link href={buttonURL}>
                <button className="w-64 h-14 py-2 bg-white rounded-full border border-white text-center text-[#242424] text-base font-semibold font-['Be Vietnam Pro'] capitalize leading-snug">
                  {buttonText}
                </button>
              </Link>
            </div>
          </div>
          <div className="w-full px-[10%] py-4 bg-opacity-70 relative z-10">
            <div className="w-full flex justify-start items-center gap-2">
              {games.map((game, index) => (
                <button
                  key={index}
                  onClick={() => {
                    onGameClick(index)
                  }}
                  className={`w-24 h-16 relative overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-white ${
                    index === highlightedGameIndex ?
                      'border-2 border-white'
                    : ''
                  }`}
                  aria-label={`Navigate to game ${index + 1}`}>
                  <Image
                    src={game}
                    alt={`Game ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 96px, 128px" // Since these are fixed-width thumbnails
                    className={`rounded-lg object-cover ${
                      index === highlightedGameIndex ? 'z-10' : 'z-0'
                    }`}
                  />
                  {index === highlightedGameIndex && (
                    <div className="absolute inset-1 bg-white opacity-20 rounded-lg z-20"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default HeroCard
