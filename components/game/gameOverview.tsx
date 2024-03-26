"use client";

import React from "react";
import {
  Users,
  DollarSign,
  ShoppingBag,
  CreditCard,
  CandlestickChart,
  BadgeDollarSign,
  Activity,
  BookOpen,
} from "lucide-react";
import { convertEthToUsd } from "@/utils/utils";
import { StatsCardData, StatsCard } from "./gameDescriptionStatsCard";
import DescriptionCard from "./gameDescriptionCard";
import useGameStore from "@/store/gameStore";
import useEthPriceStore from "@/store/ethPriceStore";
import NftSaleGraph from "./nftSaleGraph";
import { CollectionStats } from "@/types/stats";
import { Collection } from "@/types/collection";

interface OverviewProps {
  game: Collection;
  stats: CollectionStats;
  ethPrice: number;
}

const Overview: React.FC<OverviewProps> = ({ game, stats, ethPrice }) => {
  if (!game || !stats) {
    return null;
  }

  const cardsData: StatsCardData[] = [
    {
      title: "Total Items",
      Icon: <ShoppingBag />,
      value: `${game.total_supply} items`,
      change: "",
    },
    {
      title: "Owners",
      Icon: <Users />,
      value: `${stats.total.num_owners}`,
      change: "",
    },
    {
      title: "Market Capitalization",
      Icon: <DollarSign />,
      value: `$${convertEthToUsd(stats.total.market_cap, ethPrice)}`,
      change: "",
    },
    {
      title: "Floor Price",
      Icon: <BadgeDollarSign />,
      value: `$${convertEthToUsd(stats.total.floor_price, ethPrice)}`,
      change: "",
    },
    {
      title: "Total Volume",
      Icon: <Activity />,
      value: `$${convertEthToUsd(stats.total.volume, ethPrice)}`,
      change: `${stats.intervals[2].volume_change}% from last month`,
    },
    {
      title: "Total Sales",
      Icon: <CreditCard />,
      value: `$${convertEthToUsd(stats.total.sales, ethPrice)}`,
      change: `${stats.intervals[2].sales_diff} difference from last month`,
    },
    {
      title: "Average Price Last 30 Days",
      Icon: <BadgeDollarSign />,
      value: `$${convertEthToUsd(stats.intervals[2].average_price, ethPrice)}`,
      change: `All time average: $${convertEthToUsd(
        stats.total.average_price,
        ethPrice
      )}`,
    },
  ];

  return (
    <div className="flex flex-col mx-5 my-5 gap-5">
      <div className="w-full">
        <DescriptionCard collection={game} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cardsData.map((card, index) => (
          <StatsCard
            key={index}
            title={card.title}
            Icon={card.Icon}
            value={card.value}
            change={card.change}
          />
        ))}
      </div>
      <NftSaleGraph />
    </div>
  );
};

export default Overview;
