// Page.tsx
"use client";
import { NextPage } from "next";
import { gameDescription } from "../../../utils/consts";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Loading from "@/components/loading";
import GameHero from "@/components/gameComponents/gameHero";
import GameTabs from "@/components/gameComponents/gameTabs";
import { Tab } from "@/utils/localTypes";
import Stats from "../components/Stats";
import Socials from "../components/Socials";
import Overview from "@/components/gameComponents/gameOverview";
import useGameStore from "@/store/gameStore";
import useEthPriceStore from "@/store/ethPriceStore";
import { useEffect } from "react";
import useFetchGameData from "@/hooks/useFetchGameData";
import GameItems from "@/components/gameComponents/gameItems";

const Page: NextPage = () => {
  const {
    collection,
    collectionStats,
    listings,
    collectionSaleEvents,
    setGameData,
  } = useGameStore();
  const {
    ethPrice,
    loading: ethPriceLoading,
    fetchEthPrice,
  } = useEthPriceStore();

  const { loading: gameDataLoading, ...gameData } = useFetchGameData();

  useEffect(() => {
    if (!gameDataLoading) {
      setGameData(gameData);
    }
  }, [gameDataLoading]);

  useEffect(() => {
    fetchEthPrice();
  }, []);

  if (gameDataLoading || ethPriceLoading || !collection || !collectionStats) {
    return <Loading />;
  }

  const tabs: Tab[] = [
    {
      name: "Overview",
      value: <Overview />,
    },
    {
      name: "In Game Items",
      value: <GameItems />,
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
      name: "Socials",
      value: <h1>Socials</h1>,
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
        <GameHero />
      </div>
      <GameTabs tabs={tabs} />
      <Footer />
    </main>
  );
};

export default Page;
