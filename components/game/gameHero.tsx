"use client";

import React from "react";
import GameCarousel from "./gameCarousel";
import { GameDescription, Images } from "@/types/localTypes";
import GameInfo from "./gameInfo";
import useGameStore from "@/store/gameStore";
import { Collection } from "@/types/collection";

interface GameHeroProps {
  collection: Collection;
  description: GameDescription;
}

const GameHero: React.FC<GameHeroProps> = ({ collection, description }) => {
  if (!collection) return <h1>ERROR NO INFO</h1>;

  const images = [collection.banner_image_url, Images[collection.name]];

  return (
    <div className="flex flex-col mt-5 mb-5">
      <div className="w-full">
        <GameCarousel images={images} />
      </div>
      <GameInfo collection={collection} description={description} />
    </div>
  );
};

export default GameHero;
