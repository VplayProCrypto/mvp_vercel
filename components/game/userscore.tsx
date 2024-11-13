interface BarData {
  rating: number
  count: number
}

interface UserScoreProps {
  score: number
  ratings: number
  barData: BarData[]
}

const UserScore: React.FC<UserScoreProps> = ({ score, ratings, barData }) => {
  const roundedScore = Math.round(score * 10) / 10
  const fullStars = Math.floor(score)

  const maxCount = Math.max(...barData.map(data => data.count))

  const getBarWidth = (count: number) => {
    return `${(count / maxCount) * 100}%`
  }

  return (
    <div className="bg-white bg-opacity-10 p-6 rounded-lg w-full mb-6">
      <h2 className="text-gray-400 text-sm mb-2">USER SCORE</h2>
      <div className="flex items-start">
        <div className="mr-8">
          <span className="text-6xl font-bold text-white">{roundedScore}</span>
          <div className="flex mt-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${i < fullStars ? 'text-white' : 'text-gray-600'}`}
                fill="currentColor"
                viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-gray-400 text-xs mt-1">
            {roundedScore} — {ratings} Ratings
          </p>
        </div>
        <div className="flex-grow">
          {barData.map(({ rating, count }) => (
            <div
              key={rating}
              className="flex items-center mb-3">
              <span className="text-gray-400 w-4 mr-3 text-sm">{rating}</span>
              <div className="flex-grow bg-gray-800 h-6">
                <div
                  className="bg-blue-200 h-full"
                  style={{ width: getBarWidth(count) }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserScore
