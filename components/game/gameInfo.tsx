import { Gamepad2, Users, Star } from "lucide-react";
import Image from "next/image";
import { GameDescription } from "@/types/opensea/localTypes";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import useGameStore from "@/store/gameStore";

import Link from "next/link";
import { getCollectionMetadataByName } from "@/db/selects";
import { Collection } from "@/types/opensea/collection";
const renderStars = (stars: string) => {
  const totalStars = parseInt(stars, 10);
  let starElements = [];
  for (let i = 0; i < totalStars; i++) {
    starElements.push(<Star key={i} />);
  }
  return starElements;
};

interface GameInfoProps {
  collection: Collection;
  description: GameDescription;
}

const GameInfo: React.FC<GameInfoProps> = ({ collection, description }) => {
  return (
    <div className="flex flex-row items-center mt-5">
      <div className="flex-shrink-0">
        <Image
          src={collection.image_url}
          alt={collection.name}
          width={100}
          height={100}
        />
      </div>
      <div className="flex flex-col ml-5">
        <div className="flex flex-row items-center mb-2">
          <Badge variant="secondary" className="mr-4">
            {description.genre}
          </Badge>
          <Badge variant="secondary" className="mr-4">
            {description.rewardsText}
          </Badge>
          <Badge variant="secondary">{description.friendly}</Badge>
        </div>
        <div className="flex flex-row items-center">
          <h2 className="text-3xl font-semibold tracking-tight transition-colors mr-5">
            {collection.name}
          </h2>
          <Button variant="outline">
            {description.communityScore}
            <Users />
          </Button>
        </div>
        <div className="flex ml-2">{renderStars(description.stars)}</div>
      </div>
      <div className="flex-grow"></div>
      <div className="flex flex-col items-center">
        <Link href={collection.project_url}>
          <Button variant="default" className="mb-2">
            <Gamepad2 />
            Play Now
          </Button>{" "}
        </Link>
        <span className="text-sm">
          {description.playerCount.toLocaleString()} players
        </span>
      </div>
    </div>
  );
};

export default GameInfo;
