import Image from 'next/image'
import React from 'react'

interface CategoryCardProps {
  categoryName: string
  imageUrl: string
  altText: string
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  categoryName,
  imageUrl,
  altText,
}) => {
  return (
    <div className="relative w-56 h-72 overflow-hidden rounded-lg shadow-md">
      <Image
        src={imageUrl}
        alt={altText}
        width={224}
        height={283}
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <h3 className="text-white text-xl font-semibold">{categoryName}</h3>
      </div>
    </div>
  )
}

export default CategoryCard
