import { NextPage } from "next";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Loading from "@/components/loading";
import GameHero from "@/components/game/gameHero";
import GameTabs from "@/components/game/gameTabs";
import { GameDescription, Tab } from "@/types/localTypes";
import Overview from "@/components/game/gameOverview";
import GameItems from "@/components/game/gameItems";

import { getCollectionMetadataByName } from "@/db/selects";
import { fetchGameData } from "@/utils/fetchGameData";
import { fetchEthPrice } from "@/utils/fetchETHPrice";
import useGameStore from "@/store/gameStore";

async function fetchData(gameName: string) {
  try {
    const metadata = await getCollectionMetadataByName(gameName);
    const gameData = await fetchGameData(gameName);
    const ethPrice = await fetchEthPrice();

    return {
      metadata,
      ...gameData,
      ethPrice,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      metadata: null,
      collection: null,
      listings: { nfts: [], next: "" },
      collectionStats: null,
      collectionSaleEvents: [],
      ethPrice: null,
    };
  }
}

const Page: NextPage<{
  params: { name: string };
}> = async ({ params }) => {
  const gameName = params.name;
  const {
    metadata,
    collection,
    listings,
    collectionStats,
    collectionSaleEvents,
    ethPrice,
  } = await fetchData(gameName);

  if (!collection || !collectionStats || !metadata) {
    return <Loading />;
  }

  const tabs: Tab[] = [
    {
      name: "Overview",
      value: (
        <Overview
          game={collection}
          stats={collectionStats}
          ethPrice={ethPrice}
        />
      ),
    },
    {
      name: "In Game Items",
      value: <GameItems currentPage={0} />,
    },
    {
      name: "Stats",
      value: <h1>Stats</h1>,
    },
    {
      name: "Project Team",
      value: <div>Project Team</div>,
    },
    {
      name: "Reviews",
      value: <h1>Reviews</h1>,
    },
  ];

  return (
    <main className="mt-5">
      <title>{collection.name}</title>
      <Navbar user={undefined} gasFee={""} />
      <div className="mr-5 ml-5">
        <GameHero collection={collection} description={metadata} />
      </div>
      <GameTabs tabs={tabs} />
      <Footer />
    </main>
  );
};

export default Page;
