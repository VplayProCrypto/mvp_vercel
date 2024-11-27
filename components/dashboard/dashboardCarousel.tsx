'use client'
import React from 'react'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '../ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import HeroCard from '../herocard'
export interface GameDetails {
  costOfEntry: string
  rewardRate: { rr: string; rr_symbol: string }
  inGamePrice: string
  riskRate: { text: string; percentage: number }
}

export interface Game {
  id: string
  images: string[]
  name: string
  gameLogoUrl: string
  tagline: string
  starRating: number
  categories: string[]
  description: string
  gameDetails: GameDetails
  buttonURL: string
  buttonText: string
  banner: string
  background: string
}

interface DashboardCarouselProps {
  games: Game[]
}

const DashboardCarousel: React.FC<DashboardCarouselProps> = ({ games }) => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  )
  const [api, setApi] = React.useState<CarouselApi>()

  const onGameClick = React.useCallback(
    (index: number) => {
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
        {games.map((game, index) => (
          <CarouselItem key={game.id}>
            <HeroCard
              gameTitle={game.name}
              onGameClick={onGameClick}
              highlightedGameIndex={index}
              games={games.map(g => g.background)}
              backgroundImage={game.background}
              {...game}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default DashboardCarousel
