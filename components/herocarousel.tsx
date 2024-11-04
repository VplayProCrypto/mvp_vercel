'use client'
import React from 'react'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from './ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import HeroCard from './herocard'

interface GameDetails {
  costOfEntry: string
  rewardRate: { days: number; estimated: boolean }
  inGamePrice: string
  riskRate: { text: string; percentage: number }
}

interface HeroCarouselProps {
  images: string[]
  gameTitle: string
  gameLogoUrl: string
  tagline: string
  starRating: number
  categories: string[]
  description: string
  gameDetails: GameDetails
  games: string[]

  buttonURL: string
  buttonText: string
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({
  images,
  gameTitle,
  gameLogoUrl,
  tagline,
  starRating,
  categories,
  description,
  gameDetails,
  games,

  buttonURL,
  buttonText,
}) => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  )
  const [api, setApi] = React.useState<CarouselApi>()
  const onGameClick = React.useCallback(
    (index: number) => {
      console.log(`Clicked index: ${index}`)
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
              gameTitle={gameTitle}
              gameLogoUrl={gameLogoUrl}
              tagline={tagline}
              starRating={starRating}
              categories={categories}
              description={description}
              gameDetails={gameDetails}
              games={games}
              onGameClick={onGameClick}
              highlightedGameIndex={index}
              backgroundImage={games[index]}
              buttonURL={buttonURL}
              buttonText={buttonText}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default HeroCarousel
