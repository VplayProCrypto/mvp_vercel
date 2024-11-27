import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import Loading from '@/components/loading'
import GameItems from '@/components/game/items'
import { fetchGameData } from '@/utils/fetchGameData'
import { fetchEthPrice } from '@/utils/fetchETHPrice'
import HeroCarousel from '@/components/herocarousel'
import GameRatings from '@/components/game/intro'
import RatingSummary from '@/components/game/ratingSummary'
import SocialIcon from '@/components/socialicon'
import UserScore from '@/components/game/userscore'
import { ReviewList } from '@/components/game/reviewCard'
import BusinessIntelligence from '@/components/game/businessintelligence'
import GamesList from '@/components/gamesList'

//This is temporary
const mappy = new Map<string, Array<string>>()
mappy.set('pixels-farm', [
  '/images/pixels0.avif',
  '/images/pixels1.avif',
  '/images/pixels3.png',
])
mappy.set('mavia-land', [
  '/images/mavia0.jpg',
  '/images/mavia1.jpg',
  '/images/mavia2.png',
])

type Params = Promise<{
  name: any
  slug: string
}>

export default async function Page(props: { params: Params }) {
  const params = await props.params

  const gameName = params.name

  const {
    metadata,
    collection,
    listings,
    collectionStats,
    collectionSaleEvents,
    vplaymetrics,
    tokenDistribution,
    ratingSummary,
    ratingDistribution,
    ratings,
  } = await fetchGameData(gameName)
  const ethPrice = await fetchEthPrice()

  if (!collection || !collectionStats || !metadata) {
    return <Loading />
  }

  const otherGameNames = ['mavia-land', 'pixels-farm']

  const otherGamesData = (
    await Promise.allSettled(otherGameNames.map(name => fetchGameData(name)))
  )
    .filter(result => result.status === 'fulfilled')
    .map(result => {
      try {
        const { metadata, collection, collectionStats, vplaymetrics } = (
          result as PromiseFulfilledResult<any>
        ).value

        return {
          link: `/game/${collection.collection}`,
          banner: collection.image_url as string,
          name: collection.name as string,
          rewardRate: metadata.rr_val as string,
          rewardRateSymbol: metadata.rr_symbol as string,
          categories: vplaymetrics.esrb_description.split(',') as string[],
          inGamePrice: `${Number(parseFloat(collectionStats.intervals[2].average_price)).toFixed(2)} ETH`,
          entryCost: `${Number(parseFloat(collectionStats.total.floor_price)).toFixed(2)} ETH`,
          riskRate: {
            text: vplaymetrics.risk_level as string,
            percentage: Number(vplaymetrics.risk_rate),
          },
        }
      } catch (error: any) {
        console.error(error)
        return {
          link: '',
          banner: 'https://via.placeholder.com/226x282',
          name: 'Unknown Game',
          rewardRate: '0',
          rewardRateSymbol: 'ETH',
          categories: ['UNKNOWN'],
          inGamePrice: '0.00 ETH',
          entryCost: '0.00 ETH',
          riskRate: {
            text: 'Unknown',
            percentage: 0,
          },
        }
      }
    })
    .filter((data): data is NonNullable<typeof data> => data !== undefined)
  otherGamesData.push({
    link: `/game/${collection.collection}`,
    banner: collection.image_url,
    name: collection.name,
    rewardRate: metadata.rr_val,
    rewardRateSymbol: metadata.rr_symbol,
    categories: vplaymetrics.esrb_description.split(','),
    inGamePrice: `${Number(parseFloat(collectionStats.intervals[2].average_price)).toFixed(2)} ETH`,
    entryCost: `${Number(parseFloat(collectionStats.total.floor_price)).toFixed(2)} ETH`,
    riskRate: {
      text: vplaymetrics.risk_level,
      percentage: vplaymetrics.risk_rate,
    },
  })

  const ratingData = {
    metrics: {
      playToEarnRate: Number(vplaymetrics.play_to_earn_rate),
      freeToPlayRate: Number(vplaymetrics.free_to_play_rate),
      tokenomicsStability: Number(vplaymetrics.tokenomics_stability),
      rewardStreams: Number(vplaymetrics.reward_streams),
    },

    tokenDistribution:
      tokenDistribution?.map(item => ({
        name: String(item.name),
        value: Number(item.value),
      })) || [],
    totalRating: Number(vplaymetrics.total_rating),
    totalRatingsCount: Number(vplaymetrics.total_ratings_count),
  }
  const statCardsData = [
    {
      title: 'TOTAL OWNERS',
      value: collectionStats.total.num_owners.toString(),
      change: '',
      isPositive: true,
      bgColor: 'bg-[#e3f5ff]',
    },
    {
      title: 'MARKET CAPITALIZATION',
      value: collectionStats.total.market_cap,
      change: 'ETH',
      isPositive: false,
    },
    {
      title: 'AVG RR',
      value: Math.floor(metadata.rr_val).toString(),
      change: metadata.rr_symbol,
      isPositive: true,
      bgColor: 'bg-[#e3f5ff]',
    },
    {
      title: 'FLOOR ITEM PRICE',
      value: Number(parseFloat(collectionStats.total.floor_price))
        .toFixed(2)
        .toString(),
      change: collectionStats.total.floor_price_symbol,
      isPositive: false,
    },
    {
      title: 'TOTAL VOLUME',
      value: Number(parseFloat(collectionStats.total.volume))
        .toFixed(2)
        .toString(),
      change: `${Number(parseFloat(collectionStats.intervals[2].volume_change)).toFixed(2).toString()}% month`,
    },
    {
      title: 'TOTAL SALES',
      value: collectionStats.total.sales.toFixed(2).toString(),
      bgColor: 'bg-[#e3f5ff]',
      change: `${collectionStats.intervals[2].sales_diff.toFixed(2).toString()}% month`,
    },
    {
      title: 'AVERAGE PRICE LAST 30 DAYS',
      value: Number(parseFloat(collectionStats.intervals[2].average_price))
        .toFixed(2)
        .toString(),
      change: 'ETH',
    },
  ]

  return (
    <main className="mt-5 bg-black">
      <title>{collection.name}</title>
      <Navbar />
      <div className="mr-5 ml-5">
        <HeroCarousel
          images={['1', '2', '3']}
          starRating={vplaymetrics.rating}
          categories={vplaymetrics.esrb_description.split(',')}
          gameTitle={collection.name}
          gameLogoUrl={collection.image_url}
          tagline={collection.name}
          description={collection.description}
          gameDetails={{
            costOfEntry:
              Number(parseFloat(collectionStats.total.floor_price))
                .toFixed(2)
                .toString()
                .toString() + '  ETH',
            rewardRate: {
              rr: Number(parseFloat(metadata.rr_val)).toFixed(2).toString(),
              rr_symbol: metadata.rr_symbol,
            },
            inGamePrice:
              Number(parseFloat(collectionStats.intervals[2].average_price))
                .toFixed(2)
                .toString() + '  ETH',
            riskRate: { text: 'LOW RISK', percentage: vplaymetrics.risk_rate },
          }}
          games={mappy.get(collection.collection) || []}
          buttonURL={collection.project_url}
          buttonText="Play Now"
        />
      </div>
      <div className="max-w-7xl w-full mx-auto">
        <GameRatings
          vplayScore={vplaymetrics.vplay_score}
          socialScore={vplaymetrics.social_score}
          riskRate={vplaymetrics.risk_rate}
          riskLevel={vplaymetrics.risk_level}
          userScore={vplaymetrics.user_score}
          userRatingsCount={vplaymetrics.user_ratings_count}
          esrbRating={vplaymetrics.esrb_rating}
          esrbDescription={vplaymetrics.esrb_description}
          hasControllerSupport={vplaymetrics.has_controller_support}
          hasGlobalServers={vplaymetrics.has_global_servers}
          multiplayerEnabled={vplaymetrics.is_multiplayer}
          singlePlayerEnabled={vplaymetrics.is_single_player}
          genres={vplaymetrics.esrb_description.split(',')}
          gameplayImageSrc={
            mappy.get(collection.collection)?.[2] ?? '/images/logo.png'
          }
          socialMediaIcons={[
            {
              platform: 'discord',
              icon: (
                <SocialIcon
                  href={collection.discord_url}
                  src="/images/discordnegative.png"
                />
              ),
            },
            {
              platform: 'twitter',
              icon: (
                <SocialIcon
                  href={`https://twitter.com/${collection.twitter_username}`}
                  src="/images/twitternegative.png"
                />
              ),
            },
            {
              platform: 'telegram',
              icon: (
                <SocialIcon
                  href={`https://t.me/${collection.telegram_url}`}
                  src="/images/telegramnegative.png"
                />
              ),
            },
          ]}
        />
        <RatingSummary
          collectionSaleEvents={collectionSaleEvents}
          ethPrice={ethPrice}
          easeOfPlay={ratingSummary.ease_of_play}
          funRating={ratingSummary.fun_rating}
          nftRarity={ratingSummary.nft_rarity}
          transparencyRating={ratingSummary.transparency_rating}
          sessionLength={ratingSummary.session_length}
          rewardRate={ratingSummary.reward_rate}
        />
        <UserScore
          score={vplaymetrics.user_score}
          ratings={vplaymetrics.user_ratings_count}
          barData={ratingDistribution ?? []}
        />
        <ReviewList reviews={ratings ?? []} />
        <BusinessIntelligence
          statCards={statCardsData}
          collectionStats={collectionStats}
          ratingData={ratingData}
          collectionSaleEvents={collectionSaleEvents}
          ethPrice={ethPrice}
        />
        <GameItems
          listings={listings}
          currentPage={1}
        />

        <div className="flex flex-row min-w-screen">
          <GamesList games={otherGamesData} />
        </div>
      </div>

      <Footer />
    </main>
  )
}
