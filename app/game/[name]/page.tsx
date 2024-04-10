import { NextPage } from "next";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Loading from "@/components/loading";
import GameHero from "@/components/game/gameHero";
import GameTabs from "@/components/game/gameTabs";
import { GameDescription, Tab } from "@/types/vplay/localTypes";
import Overview from "@/components/game/gameOverview";
import GameItems from "@/components/game/gameItems";

import { fetchGameData } from "@/utils/fetchGameData";
import { fetchEthPrice } from "@/utils/fetchETHPrice";

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
  } = await fetchGameData(gameName);
  const ethPrice = await fetchEthPrice();

  if (!collection || !collectionStats || !metadata) {
    return <Loading />;
  }
  //const result = await fetchMetadataOne();
  //console.log(result);
  const tabs: Tab[] = [
    {
      name: "Overview",
      value: (
        <Overview
          game={collection}
          stats={collectionStats}
          ethPrice={ethPrice}
          collectionSaleEvents={collectionSaleEvents}
        />
      ),
    },
    {
      name: "In Game Items",
      value: <GameItems currentPage={1} listings={listings} />,
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
