import React, { useState } from 'react';
import Image from 'next/image';
import YouTube from 'react-youtube';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface CarouselProps {
  images: string[];
  hasVideo?: boolean;
  hasImage?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({ images, hasVideo, hasImage }) => {
  const [index, setIndex] = useState(0);

  const prevImage = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? effectiveImages.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setIndex((prevIndex) =>
      prevIndex === effectiveImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Filter images based on hasVideo and hasImage props
  const effectiveImages = images.filter((_, imgIndex) => {
    if (hasVideo && imgIndex === 0) return true; // Always include video if hasVideo is true
    if (!hasImage && imgIndex === 2) return false; // Exclude index 2 if hasImage is false
    return true; // Include other images by default
  });

  // Adjust the getThumbnailSrc function to work with the filtered images
  const getThumbnailSrc = (imgIndex: number) => {
    const imageId = effectiveImages[imgIndex];
    if (hasVideo && imgIndex === 0) {
      return `https://img.youtube.com/vi/${imageId}/0.jpg`; // 0.jpg for the default thumbnail
    }
    return imageId;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <button
          onClick={prevImage}
          className="absolute left-0 z-10 p-2 bg-white rounded-full shadow-md -translate-y-1/2 top-1/2"
        >
          <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
        </button>
        {hasVideo && index === 0 ? (
          <YouTube videoId={effectiveImages[0]} />
        ) : (
          <Image
            src={getThumbnailSrc(index)}
            alt={`image ${index + 1}`}
            width={1000}
            height={300}
            className="rounded-lg"
          />
        )}
        <button
          onClick={nextImage}
          className="absolute right-0 z-10 p-2 bg-white rounded-full shadow-md -translate-y-1/2 top-1/2"
        >
          <ChevronRightIcon className="w-6 h-6 text-gray-800" />
        </button>
      </div>
      <div className="flex mt-4 space-x-1 overflow-x-auto">
        {effectiveImages.map((img, imgIndex) => {
          const thumbnailSrc = getThumbnailSrc(imgIndex);
          return (
            <button
              key={img}
              onClick={() => setIndex(imgIndex)}
              className={`w-16 h-16 border-2 border-transparent rounded-md overflow-hidden ${index === imgIndex ? 'border-blue-500' : 'hover:border-gray-300'}`}
              aria-label={`Go to image ${imgIndex + 1}`}
            >
              <Image
                src={thumbnailSrc}
                alt={`Thumbnail ${imgIndex + 1}`}
                width={64}
                height={64}
                objectFit="cover"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
