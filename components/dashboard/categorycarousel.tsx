'use client'

import React from 'react'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '../ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import CategoryCard from './categorycard'
import { Button } from '../ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CategoryCarouselProps {
  categoryTitles: string[]
  images: string[]
}

const CategoryCarousel: React.FC<CategoryCarouselProps> = ({
  categoryTitles,
  images,
}) => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  )
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  // Group images and titles in sets of 3
  const groupedItems = React.useMemo(() => {
    const groups = []
    for (let i = 0; i < images.length; i += 3) {
      groups.push({
        images: images.slice(i, i + 3),
        titles: categoryTitles.slice(i, i + 3),
      })
    }
    return groups
  }, [images, categoryTitles])

  return (
    <div className="relative w-full bg-black">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className="w-full">
        <CarouselContent className="w-full">
          {groupedItems.map((group, groupIndex) => (
            <CarouselItem
              key={groupIndex}
              className="pl-2 basis-full">
              <div className="flex flex-row justify-between gap-2">
                {group.images.map((image, index) => (
                  <CategoryCard
                    key={`${groupIndex}-${index}`}
                    categoryName={group.titles[index]}
                    imageUrl={image}
                    altText={group.titles[index]}
                  />
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute left-0 top-1/2 -translate-y-1/2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white/70 hover:bg-white/90"
          onClick={() => api?.scrollPrev()}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white/70 hover:bg-white/90"
          onClick={() => api?.scrollNext()}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <span className="bg-white/70 rounded-full px-2 py-1 text-sm">
          {current} / {count}
        </span>
      </div>
    </div>
  )
}

export default CategoryCarousel
