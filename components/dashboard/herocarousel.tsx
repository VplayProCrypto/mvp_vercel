'use client'

import React, { useCallback } from 'react'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselJump,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { Card, CardContent } from '../ui/card'
import HeroCard from './herocard'

interface HeroCarouselProps {
  images: string[]
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ images }) => {
  console.log(images)
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  )
  const [api, setApi] = React.useState<CarouselApi>()
  const onGameClick = React.useCallback(
    (index: number) => {
      console.log(`Clicked index: ${index}`) // Add this line for debugging
      api?.scrollTo(index)
    },
    [api]
  )

  return (
    <Carousel
      setApi={setApi}
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <HeroCard
              gameTitle="Awesome Game"
              gameLogoUrl="https://example.com/game-logo.png"
              tagline="Join the fight for ETH"
              starRating={4}
              categories={['STRATEGY', 'FREE TO PLAY', '#7']}
              description="Leveraging the power of Blockchain Technology, this game gives you complete ownership over your in-game assets."
              gameDetails={{
                costOfEntry: 'FREE',
                rewardRate: { days: 16, estimated: true },
                inGamePrice: '$ 190 USD',
                riskRate: { text: 'LOW RISK', percentage: 9 },
              }}
              games={[
                'https://via.placeholder.com/162x96',
                'https://via.placeholder.com/162x96',
                'https://via.placeholder.com/162x96',
                'https://via.placeholder.com/162x96',
                'https://via.placeholder.com/162x96',
                'https://via.placeholder.com/162x96',
                'https://via.placeholder.com/162x96',
                'https://via.placeholder.com/162x96',
              ]}
              onGameClick={onGameClick}
              highlightedGameIndex={index}
              backgroundImage="https://example.com/main-background-image.jpg"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default HeroCarousel
