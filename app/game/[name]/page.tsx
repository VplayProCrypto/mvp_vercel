import { NextPage } from 'next'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import Loading from '@/components/loading'
import Overview from '@/components/game/gameOverview'
import GameItems from '@/components/game/items'

import { fetchGameData } from '@/utils/fetchGameData'
import { fetchEthPrice } from '@/utils/fetchETHPrice'
import HeroCarousel from '@/components/herocarousel'
import GameRatings from '@/components/game/intro'
import RatingSummary from '@/components/game/ratingSummary'
import SocialIcon from '@/components/socialicon'
import UserScore from '@/components/game/userscore'
import { ReviewList } from '@/components/game/reviewCard'
import Bi from '@/components/game/businessintelligence'
import { OpenseaCollectionStats } from '@/types'
import { GameCard, GameCardProps } from '@/components/gamecard'

const Page: NextPage<{
  params: { name: string }
}> = async ({ params }) => {
  const gameName = params.name
  const {
    metadata,
    collection,
    listings,
    collectionStats,
    collectionSaleEvents,
  } = await fetchGameData(gameName)
  const ethPrice = await fetchEthPrice()

  if (!collection || !collectionStats || !metadata) {
    return <Loading />
  }

  //This is temporary
  const mappy = new Map<string, Array<string>>()
  mappy.set('pixels-farm', [
    collection.banner_image_url,
    '/images/pixels0.avif',
    '/images/pixels1.avif',
    '/images/pixels3.png',
  ])

  const barData = [
    { rating: 5, count: 60 },
    { rating: 4, count: 43 },
    { rating: 3, count: 11 },
    { rating: 2, count: 43 },
    { rating: 1, count: 3 },
  ]

  const reviews = [
    {
      name: 'Erick',
      date: '10/20/2024',
      rating: 4,
      review:
        "I've been playing Axie Infinity for a few months, and it's pretty awesome! ...",
      helpfulCount: 30,
      profileImage: 'https://via.placeholder.com/56x56',
      stats: {
        nftsOwned: 12,
        userScore: 5,
        hoursPlayed: 140,
        playingAge: '4M',
        usdValue: '2K',
        gamesOwned: 3,
        rewardRate: 45,
      },
    },
    // ... more reviews
  ]
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
  const statCardsData = [
    {
      title: 'TOTAL OWNERS',
      value: collectionStats.total.num_owners,
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
  ]

  const chartCardsData: any[] = [
    { title: 'Active Users' },
    { title: 'Traffic by Website' },
    { title: 'Rating Summary' },
  ]

  return (
    <main className="mt-5 bg-black">
      <title>{collection.name}</title>
      <Navbar />
      <div className="mr-5 ml-5">
        <HeroCarousel
          images={['1', '2', '3', '4']}
          gameTitle={collection.name}
          gameLogoUrl={collection.image_url}
          tagline={collection.name}
          starRating={4}
          categories={['STRATEGY', 'FREE TO PLAY', '#7']}
          description={collection.description}
          gameDetails={{
            costOfEntry: 'FREE',
            rewardRate: { days: 16, estimated: true },
            inGamePrice: '$ 190 USD',
            riskRate: { text: 'LOW RISK', percentage: 9 },
          }}
          games={mappy.get(collection.collection)}
          buttonURL={collection.project_url}
          buttonText="PLAY NOW"
        />
      </div>
      <div className="max-w-7xl w-full mx-auto">
        <GameRatings
          vplayScore="H"
          socialScore={78}
          riskRate={9}
          riskLevel="LOW RISK"
          userScore={4.1}
          userRatingsCount={103}
          esrbRating="T"
          esrbDescription="Fantasy Violence, In-Game Transactions."
          gameplayImageSrc={mappy.get(collection.collection)[1]}
          playabilityTags={[
            <span key="1">Multiplayer Enabled</span>,
            <span key="2">Controller Support</span>,
            <span key="3">One Player Experience</span>,
            <span key="4">Global Servers</span>,
          ]}
          genres={['STRATEGY', 'FREE TO PLAY']}
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
                  href={`https://t.me/${collection.telegram_username}`}
                  src="/images/telegramnegative.png"
                />
              ),
            },
          ]}
        />
        <RatingSummary
          easeOfPlay={50}
          funRating={5}
          nftRarity={4}
          transparencyRating={3}
          sessionLength={3}
          rewardRate={70}
          collectionSaleEvents={collectionSaleEvents}
          ethPrice={ethPrice}
        />{' '}
        <UserScore
          score={4.5}
          ratings={103}
          barData={barData}
        />
        <ReviewList reviews={reviews} />
        <Bi
          statCards={statCardsData}
          collectionStats={collectionStats}
        />
        <GameItems
          listings={listings}
          currentPage={1}
        />
        <h2 className="text-xl font-bold mb-4">OTHER GAMES</h2>
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

      <Footer />
    </main>
  )
}

export default Page
/**
 *       <GameItems
        currentPage={1}
        listings={listings}
      />
 */
