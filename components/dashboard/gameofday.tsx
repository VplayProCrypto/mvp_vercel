'use client'

import React, { useCallback, useRef, useState } from 'react'
import Image from 'next/image'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '../ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

import Link from 'next/link'
// Types
export interface BaseStat {
  label: string
  value: string
}

export interface RiskStat extends BaseStat {
  backgroundColor: string
}

export interface GameStats {
  inGamePrice: BaseStat
  rewardRate: BaseStat
  entryFee: BaseStat
  riskRate: RiskStat
}

export interface GameInfo {
  title: string
  titleColor: string
  heading: string
  description: string
  rating: number
  link: string
}

export interface GameOfDayProps {
  images: string[]
  gameInfo: GameInfo
  gameStats: GameStats
}

export const GameOfDay: React.FC<GameOfDayProps> = ({
  images,
  gameInfo,
  gameStats,
}) => {
  const [api, setApi] = useState<CarouselApi>()
  const [currentIndex, setCurrentIndex] = useState(0)

  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }))

  const onGameClick = useCallback(
    (index: number) => {
      api?.scrollTo(index)
      setCurrentIndex(index)
    },
    [api]
  )

  const onSelect = useCallback(() => {
    if (!api) return
    setCurrentIndex(api.selectedScrollSnap())
  }, [api])

  React.useEffect(() => {
    if (!api) return
    onSelect()
    api.on('select', onSelect)
    api.on('reInit', onSelect)
    return () => {
      api.off('select', onSelect)
      api.off('reInit', onSelect)
    }
  }, [api, onSelect])

  return (
    <div className="w-full h-screen bg-black text-white p-8">
      <h1 className="text-xl font-bold mb-6">{gameInfo.heading}</h1>

      <div className="flex mb-8">
        <div className="w-1/2 pr-8">
          <h2
            className="text-6xl font-bold mb-4"
            style={{ color: gameInfo.titleColor }}>
            {gameInfo.title}
          </h2>

          <h3 className="text-xl font-bold mb-2">ABOUT THE GAME</h3>
          <p className="mb-4">{gameInfo.description}</p>

          <div className="flex mb-4">
            {[...Array(gameInfo.rating)].map((_, star) => (
              <svg
                key={star}
                className="w-6 h-6 text-yellow-400 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            {[...Array(5 - gameInfo.rating)].map((_, star) => (
              <svg
                key={`empty-${star}`}
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          <div className="flex justify-between mb-6">
            {(
              Object.entries(gameStats) as [
                keyof GameStats,
                BaseStat | RiskStat,
              ][]
            ).map(([key, stat]) => (
              <div key={key}>
                <p className="text-sm">{stat.label}</p>
                {key === 'riskRate' ?
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: (stat as RiskStat).backgroundColor,
                    }}>
                    <span className="text-sm font-bold">{stat.value}</span>
                  </div>
                : <p className="text-lg">{stat.value}</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="w-1/2 flex flex-col">
          <Carousel
            setApi={setApi}
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            className="mb-4">
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <Image
                    src={image}
                    alt={`Game image ${index + 1}`}
                    width={500}
                    height={300}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <button className="bg-white text-black font-bold py-2 px-8 rounded-full self-end">
            <Link href={gameInfo.link}> EXPLORE </Link>
          </button>
        </div>
      </div>

      <div className="flex space-x-4 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => onGameClick(index)}
            className={`flex-shrink-0 w-48 h-32 rounded-lg overflow-hidden ${
              index === currentIndex ?
                `ring-2 ring-[${gameInfo.titleColor}]`
              : ''
            }`}>
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              width={192}
              height={128}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default GameOfDay
