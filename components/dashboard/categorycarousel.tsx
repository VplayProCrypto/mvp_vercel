'use client'
import React from 'react'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import CategoryCard from './categorycard'
import { Button } from '../ui/button'

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
    <Carousel
      setApi={setApi}
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      className="w-full bg-black">
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
      <Button variant="outline">
        <CarouselPrevious />
      </Button>
      <CarouselNext />
    </Carousel>
  )
}

export default CategoryCarousel
