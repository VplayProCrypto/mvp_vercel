import React from 'react'
import Image from 'next/image'
import Profile from '../profile'

interface ReviewCardProps {
  name: string
  date: string
  rating: number
  review: string
  helpfulCount: number
  profileImage: string
  stats: {
    nftsOwned: number
    userScore: number
    hoursPlayed: number
    playingAge: string
    usdValue: string
    gamesOwned: number
    rewardRate: number
  }
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  date,
  rating,
  review,
  helpfulCount,
  profileImage,
  stats,
}) => (
  <div className="w-full bg-white bg-opacity-10 rounded-2xl p-6 mb-4">
    <div className="flex space-x-4">
      <Profile imageUrl="https://via.placeholder.com/56x56" />
      <div className="flex-grow">
        <h3 className="font-bold mb-2">{name}</h3>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'} mr-1`}
              fill="currentColor"
              viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-sm text-gray-400 ml-2">{date}</span>
        </div>
        <p className="mb-4">{review}</p>
        <div className="flex items-center text-sm text-gray-400">
          <span className="mr-4">{helpfulCount} people found this helpful</span>
          <span className="mr-4">Do you find this helpful?</span>
          <button className="p-1 rounded hover:bg-gray-700">👍</button>
          <button className="p-1 rounded hover:bg-gray-700 ml-2">👎</button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 ml-4">
        {Object.entries(stats).map(([key, value]) => (
          <div
            key={key}
            className="bg-black rounded-xl p-2 text-center">
            <div className="text-xs uppercase">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </div>
            <div className="text-xl font-bold">{value}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

interface ReviewListProps {
  reviews: ReviewCardProps[]
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => (
  <div className="w-full">
    {reviews.map((review, index) => (
      <ReviewCard
        key={index}
        {...review}
      />
    ))}
    <button className="w-full text-center text-white font-semibold underline mt-4">
      SEE ALL REVIEWS
    </button>
  </div>
)

export { ReviewCard, ReviewList }
