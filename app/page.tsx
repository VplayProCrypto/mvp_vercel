import CategoryCarousel from '@/components/dashboard/categorycarousel'
import Chatbot from '@/components/dashboard/chatbot'
import { GameOfDay, GameStats } from '@/components/dashboard/gameofday'
import Nodes from '@/components/dashboard/nodes'
import Footer from '@/components/footer'
import { GameCard, GameCardProps } from '@/components/gamecard'
import Navbar from '@/components/navbar'
import DashboardCarousel from '@/components/dashboard/dashboardCarousel'
import { transformDashboardData } from '@/utils/transformDashboardData'

const DashboardPage = async () => {
  const imageMap = new Map<string, Array<string>>([
    [
      'pixels-farm',
      ['/images/pixels0.avif', '/images/pixels1.avif', '/images/pixels3.png'],
    ],
    [
      'mavia-land',
      ['/images/mavia1.jpg', '/images/mavia0.jpg', '/images/mavia2.png'],
    ],
  ])

  const {
    dashboardProps,
    gameOfDayProps,
    gameCardProps,
    highestRewardProps,
    topGamefiProps,
  } = await transformDashboardData(['mavia-land', 'pixels-farm'], imageMap)

  return (
    <main className="flex flex-col min-h-screen">
      <title>VPLAY</title>
      <Navbar />
      <DashboardCarousel {...dashboardProps} />
      <div className="w-full px-[10%] pt-10 pb-10 py-4 bg-black bg-opacity-70 relative z-10">
        <div className="HighestRewardGames pb-5 text-white text-xl font-bold font-['Be Vietnam Pro'] leading-relaxed tracking-wide">
          HIGHEST REWARD GAMES
        </div>
        <div className="flex flex-row min-w-screen">
          {highestRewardProps.map((props, index) => (
            <div
              key={index}
              className="flex justify-center">
              <GameCard {...props} />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full px-[10%] pt-10 pb-10 py-4 bg-black bg-opacity-70 relative z-10">
        <div className="HighestRewardGames pb-5 text-white text-xl font-bold font-['Be Vietnam Pro'] leading-relaxed tracking-wide">
          TOP GAMEFI
        </div>
        <div className="flex flex-row min-w-screen">
          {topGamefiProps.map((props, index) => (
            <div
              key={index}
              className="flex flex-col items-start">
              <div className="text-[#b3b3b3] text-8xl font-bold font-['Be Vietnam Pro'] leading-none mb-2">
                {index + 1}
              </div>
              <GameCard {...props} />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full px-[10%] pt-10 pb-10 py-4 bg-black bg-opacity-70 relative z-10">
        <div className="w-full flex flex-row min-h-screen">
          <GameOfDay {...gameOfDayProps} />
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
