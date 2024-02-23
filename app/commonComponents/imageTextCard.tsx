import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface ImageTextCardProps {
  imageUrl: StaticImageData;
  altText: string;
  text: string;
}

export const ImageTextCard: React.FC<ImageTextCardProps> = ({
  imageUrl,
  altText,
  text
}) => {
  return (
    <div className="flex items-center justify-center bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex-1 p-8">
        <p className="text-black text-lg">{text}</p>
      </div>
      <div className="flex-1">
        {/* The Image component can handle GIFs as well */}
        <Image
          src={imageUrl}
          alt={altText}
          width={500}
          height={300}
          objectFit="cover"
        />
      </div>
    </div>
  );
};
