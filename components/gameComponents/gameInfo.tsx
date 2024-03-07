import { Gamepad2, Users, Star } from "lucide-react";
import Image from "next/image";
import { GameDescription } from "@/utils/localTypes";
import { Collection } from "@/utils/apiTypes";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface GameInfoProps {
  game: Collection;
  gameDescription: GameDescription;
  renderStars: (stars: string) => JSX.Element[];
}

const GameInfo: React.FC<GameInfoProps> = ({
  game,
  gameDescription,
  renderStars,
}) => {
  return (
    <div className="flex flex-row items-center mt-5">
      <div className="flex-shrink-0">
        <Image src={game.image_url} alt={game.name} width={100} height={100} />
      </div>
      <div className="flex flex-col ml-5">
        <div className="flex flex-row items-center mb-2">
          <Badge variant="secondary" className="mr-4">
            {gameDescription.genre}
          </Badge>
          <Badge variant="secondary" className="mr-4">
            {gameDescription.rewardsText}
          </Badge>
          <Badge variant="secondary">{gameDescription.friendly}</Badge>
        </div>
        <div className="flex flex-row items-center">
          <h2 className="text-3xl font-semibold tracking-tight transition-colors mr-5">
            {game.name}
          </h2>
          <Button variant="outline">
            {gameDescription.communityScore}
            <Users />
          </Button>
        </div>
        <div className="flex ml-2">{renderStars(gameDescription.stars)}</div>
      </div>
      <div className="flex-grow"></div>
      <div className="flex flex-col items-center">
        <Button variant="default" className="mb-2">
          <Gamepad2 />
          Play Now
        </Button>
        <span className="text-sm">
          {gameDescription.playerCount.toLocaleString()} players
        </span>
      </div>
    </div>
  );
};

export default GameInfo;
