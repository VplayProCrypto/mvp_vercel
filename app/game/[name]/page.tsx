"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import {
  NftExtended,
  Collection,
  CollectionStats,
  AssetEvent,
} from "../../../utils/apiTypes";

import { parsePrice } from "../../../utils/utils";
import Stats from "../components/Stats";
import ScatterChartHero from "../components/EventScatterPlot";

import { NextPage } from "next";

import { gameDescription } from "../../../utils/consts";
import Footer from "@/components/footer";
import NftCard from "@/components/nftcard";
import Navbar from "@/components/navbar";
import Loading from "@/components/loading";
import useFetchGameData from "@/hooks/useFetchGameData";
import GameHero from "@/components/gameComponents/gameHero";

const Page: NextPage = () => {
  const router = useRouter();
  const pathName = usePathname();
  // States for storing fetched data

  const {
    loading,
    collection,
    listings,
    collectionStats,
    collectionSaleEvents,
  } = useFetchGameData();

  // console.log(collection, listings, collectionStats, collectionSaleEvents);
  if (loading || !collection || !collectionStats) {
    return <Loading />;
  }

  return (
    <main className=" mt-5">
      <Navbar user={undefined} gasFee={""} />
      <div className="mr-5 ml-5">
        <GameHero
          game={collection}
          gameDescription={gameDescription[collection.name]}
        />
      </div>

      <Footer />
    </main>
  );
};

export default Page;
