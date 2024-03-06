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
    <div className="flex flex-row justify-between mt-5">
      <div className="flex">
        <div className="flex-shrink-0">
          <Image
            src={game.image_url}
            alt={game.name}
            width={100}
            height={100}
          />
        </div>
        <div className="flex flex-col space-between ml-5">
          <div className="flex flex-row mt-5 mb-5 space-between">
            {/* Add mr-4 for margin to the right of each badge except the last one */}
            <Badge variant="secondary" className="mr-4">
              {gameDescription.genre}
            </Badge>
            <Badge variant="secondary" className="mr-4">
              {gameDescription.rewardsText}
            </Badge>
            {/* No margin right for the last badge to avoid unnecessary spacing at the end */}
            <Badge variant="secondary">{gameDescription.friendly}</Badge>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row">
              <h2 className="text-3xl font-semibold tracking-tight transition-colors mr-5 mb-4">
                {game.name}
              </h2>
              <Button variant="outline">
                {gameDescription.communityScore + " "}
                <Users />
              </Button>
            </div>
            <div className="flex ml-2">
              {renderStars(gameDescription.stars)}
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <Button variant="default" className="self-center">
          <Gamepad2 />
          Play Now
        </Button>
      </div>
    </div>
  );
};

export default GameInfo;
