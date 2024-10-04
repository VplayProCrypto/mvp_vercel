import CategoryCarousel from '@/components/dashboard/categorycarousel'
import Chatbot from '@/components/dashboard/chatbot'
import { GameOfDay } from '@/components/dashboard/gameofday'
import HeroCarousel from '@/components/dashboard/herocarousel'
import Nodes from '@/components/dashboard/nodes'
import Footer from '@/components/footer'
import { GameCard, GameCardProps } from '@/components/gamecard'
import Navbar from '@/components/navbar'

interface DashboardPageProps {
  images: string[]
}

const collectionNames = [
  'decentraland',
  'mavia-land',
  'pixels-farm',
  'sandbox',
  'the-sandbox',
  'axie',
  'cryptokitties',
  'spider-tanks',
  'mirandus',
]

const images = [
  'https://via.placeholder.com/162x96',
  'https://via.placeholder.com/162x96',
  'https://via.placeholder.com/162x96',
  'https://via.placeholder.com/162x96',
  'https://via.placeholder.com/162x96',
]

const DashboardPage = async () => {
  const next =
    'LWV2ZW50X3RpbWVzdGFtcD0yMDI0LTAzLTEyKzIyJTNBNTYlM0ExOS4xNjQyNTYmLWV2ZW50X3R5cGU9YmlkX2VudGVyZWQmLXBrPTIwODg0MzA4Njk5'
  const games: GameCardProps[] = [
    {
      banner: 'https://via.placeholder.com/226x282',
      name: 'Gods Unchained',
      rewardRate: '90',
      categories: ['PLAY TO EARN', 'SCI-FI'],
      inGamePrice: '$ 100.00 USD',
      entryCost: 'FREE',
      riskRate: {
        text: 'Low',
        percentage: 30,
      },
    },
    {
      banner: 'https://via.placeholder.com/226x282',
      name: 'Gods Unchained',
      rewardRate: '90',

      categories: ['PLAY TO EARN', 'SCI-FI'],
      inGamePrice: '$ 100.00 USD',
      entryCost: 'FREE',
      riskRate: {
        text: 'Low',
        percentage: 30,
      },
    },
    {
      banner: 'https://via.placeholder.com/226x282',
      name: 'Gods Unchained',
      rewardRate: '90',

      categories: ['PLAY TO EARN', 'SCI-FI'],
      inGamePrice: '$ 100.00 USD',
      entryCost: 'FREE',
      riskRate: {
        text: 'Low',
        percentage: 30,
      },
    },
    {
      banner: 'https://via.placeholder.com/226x282',
      name: 'Gods Unchained',
      rewardRate: '90',

      categories: ['PLAY TO EARN', 'SCI-FI'],
      inGamePrice: '$ 100.00 USD',
      entryCost: 'FREE',
      riskRate: {
        text: 'Low',
        percentage: 30,
      },
    },
    {
      banner: 'https://via.placeholder.com/226x282',
      name: 'Gods Unchained',
      rewardRate: '90',

      categories: ['PLAY TO EARN', 'SCI-FI'],
      inGamePrice: '$ 100.00 USD',
      entryCost: 'FREE',
      riskRate: {
        text: 'Low',
        percentage: 30,
      },
    },
  ]

  function onGameClick(index: number) {
    throw new Error('Function not implemented.')
  }

  return (
    <main className="flex flex-col min-h-screen">
      <title>VPLAY</title>
      <Navbar />
      <HeroCarousel images={['1', '2', '3']} />
      <div className="w-full px-[10%] pt-10 pb-10 py-4 bg-black bg-opacity-70 relative z-10">
        <div className="HighestRewardGames pb-5 text-white text-xl font-bold font-['Be Vietnam Pro'] leading-relaxed tracking-wide">
          HIGHEST REWARD GAMES
        </div>
        <div className="flex flex-row min-w-screen">
          {games.map((game, index) => (
            <div
              key={index}
              className="flex justify-center">
              <GameCard {...game} />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full px-[10%] pt-10 pb-10 py-4 bg-black bg-opacity-70 relative z-10">
        <div className="HighestRewardGames pb-5 text-white text-xl font-bold font-['Be Vietnam Pro'] leading-relaxed tracking-wide">
          TOP GAMEFI
        </div>
        <div className="flex flex-row min-w-screen">
          {games.map((game, index) => (
            <div
              key={index}
              className="flex flex-col items-start">
              <div className="text-[#b3b3b3] text-8xl font-bold font-['Be Vietnam Pro'] leading-none mb-2">
                {index + 1}
              </div>
              <GameCard {...game} />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full px-[10%] pt-10 pb-10 py-4 bg-black bg-opacity-70 relative z-10">
        <div className="w-full flex flex-row min-h-screen">
          <GameOfDay images={images} />
        </div>
      </div>
      <div className="w-full px-[10%] pt-10 pb-10 py-4 bg-black bg-opacity-70 relative z-10">
        <div className="HighestRewardGames pb-10 text-white text-xl font-bold font-['Be Vietnam Pro'] leading-relaxed tracking-wide">
          CATEGORIES
        </div>
        <CategoryCarousel
          categoryTitles={[
            'RACING',
            'ADVENTURE',
            'SPACESHIP BATTLES',
            'STRATEGY',
            'MYSTERY',
            'SIMULATION',
            'CARD TRADING',
            'RPG',
            'MOBA',
          ]}
          images={[
            '/images/logo.png',
            '/images/logo.png',
            '/images/logo.png',
            '/images/logo.png',
            '/images/logo.png',
            '/images/logo.png',
            '/images/logo.png',
            '/images/logo.png',
            '/images/logo.png',
          ]}
        />
      </div>
      <Chatbot />
      <Nodes />
      <Footer />
    </main>
  )
}

export default DashboardPage
