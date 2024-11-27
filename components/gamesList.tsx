import { GameCard } from './gamecard'

interface GamesListProps {
  games: {
    link: string
    banner: string
    name: string
    rewardRate: string
    rewardRateSymbol: string
    categories: string[]
    inGamePrice: string
    entryCost: string
    riskRate: {
      text: string
      percentage: number
    }
  }[]
  title?: string
}

const GamesList = ({ games, title = 'OTHER GAMES' }: GamesListProps) => (
  <section>
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    <div className="flex flex-row min-w-screen">
      {games.map((game, index) => (
        <div
          key={index}
          className="flex justify-center">
          <GameCard {...game} />
        </div>
      ))}
    </div>
  </section>
)

export default GamesList
