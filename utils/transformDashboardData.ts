import { GameCardProps } from '@/components/gamecard'
import { fetchDashboardGameData } from './fetchGameData'
import { GameOfDayProps } from '@/components/dashboard/gameofday'
import { Game } from '@/components/dashboard/dashboardCarousel'

interface DashboardDataReturn {
  dashboardProps: { games: Game[] }
  gameOfDayProps: GameOfDayProps
  gameCardProps: GameCardProps[]
  highestRewardProps: GameCardProps[]
  topGamefiProps: GameCardProps[]
}

export async function transformDashboardData(
  gameNames: string[],
  imageMap: Map<string, string[]>
): Promise<DashboardDataReturn> {
  const gamesData = await Promise.allSettled(
    gameNames.map(name => fetchDashboardGameData(name))
  )

  const dashboardGames: Game[] = gamesData
    .filter(
      (result): result is PromiseFulfilledResult<any> =>
        result.status === 'fulfilled'
    )
    .map(result => {
      const { collection, collectionStats, metadata, vplaymetrics } =
        result.value

      return {
        id: collection.collection,
        images: imageMap.get(collection.collection) || [],
        name: collection.name,
        gameLogoUrl: collection.image_url,
        tagline: collection.description.split('.')[0],
        starRating: Number(vplaymetrics.star_rating),
        categories: vplaymetrics.esrb_description.split(','),
        description: collection.description,
        banner: collection.image_url,
        background: imageMap.get(collection.collection)?.[0] || '',
        buttonURL: `game/${collection.collection}`,
        buttonText: 'View Game',
        gameDetails: {
          costOfEntry: `${Number(parseFloat(collectionStats.total.floor_price)).toFixed(2)} ETH`,
          rewardRate: {
            rr: metadata.rr_val,
            rr_symbol: metadata.rr_symbol,
          },
          inGamePrice: `${Number(parseFloat(collectionStats.intervals[2].average_price)).toFixed(2)} ETH`,
          riskRate: {
            text: vplaymetrics.risk_level,
            percentage: Number(vplaymetrics.risk_rate),
          },
        },
      }
    })

  const gameCardProps: GameCardProps[] = dashboardGames.map(game => ({
    banner: game.banner,
    name: game.name,
    categories: game.categories,
    inGamePrice: game.gameDetails.inGamePrice,
    entryCost: game.gameDetails.costOfEntry,
    rewardRate: game.gameDetails.rewardRate.rr,
    rewardRateSymbol: game.gameDetails.rewardRate.rr_symbol,
    riskRate: game.gameDetails.riskRate,
    link: game.buttonURL,
  }))

  // Create GameOfDay props
  const gameOfDayProps: GameOfDayProps = {
    images: dashboardGames[0].images,
    gameInfo: {
      title: dashboardGames[0].name,
      titleColor: '#c5ff00',
      heading: 'GAME OF THE DAY',
      description: dashboardGames[0].description,
      rating: 4,
      link: dashboardGames[0].buttonURL,
    },
    gameStats: {
      inGamePrice: {
        label: 'In-game Price',
        value: dashboardGames[0].gameDetails.inGamePrice,
      },
      rewardRate: {
        label: 'Reward Rate',
        value: dashboardGames[0].gameDetails.rewardRate.rr,
      },
      entryFee: {
        label: 'Cost of entry',
        value: dashboardGames[0].gameDetails.costOfEntry,
      },
      riskRate: {
        label: 'Risk Rate',
        value: `${dashboardGames[0].gameDetails.riskRate.percentage}%`,
        backgroundColor: '#0093ff',
      },
    },
  }

  const highestRewardProps = [...gameCardProps].sort(
    (a, b) => parseFloat(b.rewardRate) - parseFloat(a.rewardRate)
  )

  const topGamefiProps = [...gameCardProps]

  return {
    dashboardProps: { games: dashboardGames },
    gameOfDayProps,
    gameCardProps,
    highestRewardProps,
    topGamefiProps,
  }
}
