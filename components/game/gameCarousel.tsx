"use client";
import React, { useState } from "react";
import Image from "next/image";
import YouTube from "react-youtube";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface CarouselProps {
  images: string[];
}

const GameCarousel: React.FC<CarouselProps> = ({ images }) => {
  const [index, setIndex] = useState(0);
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
          <CarouselItem key={index}>
            <Image
              key={index}
              src={image}
              alt={`image ${index + 1}`}
              layout="responsive"
              width={500}
              height={300}
              className="rounded-md"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default GameCarousel;
