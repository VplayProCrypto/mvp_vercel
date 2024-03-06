import Image from "next/image";
import YouTube from "react-youtube";
import { Collection } from "@/utils/apiTypes";
import GameCarousel from "./gameCarousel";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { GameDescription, Images } from "@/utils/localTypes";
import { Button } from "../ui/button";
import { Gamepad2, Smile, Star } from "lucide-react";
import GameInfo from "./gameInfo";

const renderStars = (stars: string) => {
  const totalStars = parseInt(stars, 10);
  let starElements = [];
  for (let i = 0; i < totalStars; i++) {
    starElements.push(<Star key={i} />);
  }
  return starElements;
};

interface HeroProps {
  game: Collection;
  gameDescription: GameDescription;
}

const GameHero: React.FC<HeroProps> = ({ game, gameDescription }) => {
  const images = [game.banner_image_url, Images[game.name]];

  return (
    <div className=" flex flex-col mt-5 mb-5">
      <div className="w-full">
        <GameCarousel images={images} />
      </div>
      <GameInfo
        game={game}
        gameDescription={gameDescription}
        renderStars={renderStars}
      />
    </div>
  );
};

export default GameHero;
