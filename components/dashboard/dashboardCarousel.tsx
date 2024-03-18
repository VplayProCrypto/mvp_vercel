"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";

interface DashboardCarouselProps {
  images: string[];
}

const DashboardCarousel: React.FC<DashboardCarouselProps> = ({ images }) => {
  console.log(images);
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem
            key={index}
            className="flex justify-center items-center"
          >
            <Image
              key={index}
              src={image}
              alt={`image ${index + 1}`}
              width={800}
              height={400}
              className="rounded-md mt-5"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default DashboardCarousel;
