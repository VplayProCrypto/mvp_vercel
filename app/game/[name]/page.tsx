"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import { NextPage } from "next";

import { gameDescription } from "../../../utils/consts";
import Footer from "@/components/footer";
import NftCard from "@/components/nftcard";
import Navbar from "@/components/navbar";
import Loading from "@/components/loading";
import useFetchGameData from "@/hooks/useFetchGameData";
import GameHero from "@/components/gameComponents/gameHero";
import GameTabs from "@/components/gameComponents/gameTabs";
import { Tab } from "@/utils/localTypes";
import Stats from "../components/Stats";
import Socials from "../components/Socials";
import Overview from "@/components/gameComponents/gameOverview";
import useFetchEthPrice from "@/hooks/useFetchETHPrice";
const Page: NextPage = () => {
  const {
    loading,
    collection,
    listings,
    collectionStats,
    collectionSaleEvents,
  } = useFetchGameData();

  const { loading: ethPriceLoading, ethPrice } = useFetchEthPrice();

  if (loading || !collection || !collectionStats) {
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
    { name: "In Game Items", value: <div>In Game Items</div> },
    {
      name: "Stats",
      value: <Stats game={collection} stats={collectionStats} />,
    },
    {
      name: "Project Team",
      value: <div>Project Team</div>,
    },
    {
      name: "Socials",
      value: <h1>Socials</h1>,
    },
    {
      name: "Reviews",
      value: <h1>Reviews</h1>,
    },
  ];
  return (
    <main className=" mt-5">
      <Navbar user={undefined} gasFee={""} />
      <div className="mr-5 ml-5">
        <GameHero
          game={collection}
          gameDescription={gameDescription[collection.name]}
        />
      </div>
      <GameTabs tabs={tabs} />
      <Footer />
    </main>
  );
};

export default Page;
