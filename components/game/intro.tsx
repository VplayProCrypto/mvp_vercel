import React from 'react'
import Image from 'next/image'

interface SocialMediaIcon {
  platform: string
  icon: React.ReactNode
}

interface IntroProps {
  vplayScore: string
  socialScore: number
  riskRate: number
  riskLevel: string
  userScore: number
  userRatingsCount: number
  esrbRating: string
  esrbDescription: string
  gameplayImageSrc: string
  hasControllerSupport: boolean
  hasGlobalServers: boolean
  multiplayerEnabled: boolean
  singlePlayerEnabled: boolean
  genres: string[]
  socialMediaIcons: SocialMediaIcon[]
}

const Intro: React.FC<IntroProps> = ({
  vplayScore,
  socialScore,
  riskRate,
  riskLevel,
  userScore,
  userRatingsCount,
  esrbRating,
  esrbDescription,
  gameplayImageSrc,
  hasControllerSupport,
  hasGlobalServers,
  multiplayerEnabled,
  singlePlayerEnabled,
  genres,
  socialMediaIcons,
}) => {
  return (
    <div className="bg-black text-white font-sans p-8">
      <div className="flex justify-between">
        <div className="w-1/3 pr-4">
          <h2 className="text-xl font-bold mb-4">RATINGS</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="bg-white text-black w-14 h-14 flex items-center justify-center rounded-lg text-4xl font-bold">
                {vplayScore}
              </div>
              <div>
                <p className="text-sm font-semibold">VPLAY SCORE</p>
                <p className="text-xs text-gray-400">
                  Based on UAW, Social, Transactions, and Market cap.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white text-black w-14 h-14 flex items-center justify-center rounded text-3xl font-bold">
                {socialScore}
              </div>
              <div>
                <p className="text-sm font-semibold">SOCIAL SCORE</p>
                <p className="text-xs text-gray-400">
                  Based on interaction on social platforms.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16">
                <div
                  className="absolute inset-0 bg-blue-500 rounded-full"
                  style={{ clipPath: `inset(0 ${100 - riskRate}% 0 0)` }}></div>
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                  {riskRate}%
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold">VPLAY RISK RATE</p>
                <p className="text-lg font-medium">{riskLevel}</p>
                <p className="text-xs text-gray-400">
                  Based on UAW, Social, Transactions, and Market cap.
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold">USER SCORE</p>
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(star => (
                    <svg
                      key={star}
                      className={`w-4 h-4 ${star <= userScore ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-400">
                  {userScore} — {userRatingsCount} Ratings
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold">ESRB RATING</p>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-14 bg-white text-black flex items-center justify-center text-xs font-bold">
                  {esrbRating}
                </div>
                <p className="text-sm">{esrbDescription}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/3 px-4">
          <h2 className="text-xl font-bold mb-4">GAMEPLAY FOOTAGE</h2>
          <div className="rounded-xl overflow-hidden">
            <Image
              src={gameplayImageSrc}
              alt="Gameplay"
              width={400}
              height={300}
              objectFit="cover"
            />
          </div>
        </div>

        <div className="w-1/3 pl-10">
          <h2 className="text-xl font-bold mb-4">DETAILS</h2>
          <div className="space-y-4">
            <p className="text-sm font-semibold">PLAYABILITY</p>
            <div className="space-y-2">
              <div className="flex flex-col space-y-2">
                {/* Controller Support */}
                <div className="flex items-center space-x-2">
                  {hasControllerSupport ?
                    <svg
                      className="w-6 h-6 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  : <svg
                      className="w-6 h-6 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  }
                  <span>Controller Support</span>
                </div>

                {/* Global Servers */}
                <div className="flex items-center space-x-2">
                  {hasGlobalServers ?
                    <svg
                      className="w-6 h-6 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  : <svg
                      className="w-6 h-6 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  }
                  <span>Global Servers</span>
                </div>

                {/* Multiplayer */}
                <div className="flex items-center space-x-2">
                  {multiplayerEnabled ?
                    <svg
                      className="w-6 h-6 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  : <svg
                      className="w-6 h-6 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  }
                  <span>Multiplayer</span>
                </div>

                {/* Single Player */}
                <div className="flex items-center space-x-2">
                  {singlePlayerEnabled ?
                    <svg
                      className="w-6 h-6 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  : <svg
                      className="w-6 h-6 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  }
                  <span>Single Player</span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold mb-2">GENRES</p>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white text-black text-xs font-medium rounded">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold mb-2">SOCIAL MEDIA</p>
              <div className="flex space-x-4">
                {socialMediaIcons.map((icon, index) => (
                  <div
                    key={index}
                    className="w-7 h-7 bg-gray-700 rounded-full">
                    {icon.icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Intro
