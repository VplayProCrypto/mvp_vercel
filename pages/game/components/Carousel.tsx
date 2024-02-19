import React, { useState } from 'react';
import Image from 'next/image';
import YouTube from 'react-youtube';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface CarouselProps {
  images: string[];
  hasVideo?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({ images, hasVideo }) => {
  const [index, setIndex] = useState(0);

  const prevImage = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Use YouTube thumbnail for the video preview if hasVideo is true
  const getThumbnailSrc = (imgIndex: number) => {
    if (hasVideo && imgIndex === 0) {
      return `https://img.youtube.com/vi/${images[0]}/0.jpg`; // 0.jpg for the default thumbnail
    }
    return images[imgIndex];
  };

  // Filter images for preview if hasVideo is true
  const previewImages = hasVideo ? images.slice(1) : images;

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
          <YouTube videoId={images[0]} />
        ) : (
          <Image
            src={images[index]}
            alt={`image ${index + 1}`}
            width={2000}
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
        {[
          hasVideo ? `https://img.youtube.com/vi/${images[0]}/0.jpg` : null,
          ...previewImages
        ].map((img, imgIndex) => {
          if (!img) return null; // Skip null values
          const adjustedIndex = hasVideo ? imgIndex : imgIndex + 1;
          const thumbnailSrc = getThumbnailSrc(adjustedIndex);
          return (
            <button
              key={img}
              onClick={() => setIndex(adjustedIndex)}
              className={`w-16 h-16 border-2 border-transparent rounded-md overflow-hidden ${index === adjustedIndex ? 'border-blue-500' : 'hover:border-gray-300'}`}
              aria-label={`Go to image ${adjustedIndex + 1}`}
            >
              <Image
                src={thumbnailSrc}
                alt={`Thumbnail ${adjustedIndex + 1}`}
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
