import GameCarousel from "./gameCarousel";
import { Images } from "@/types/localTypes";
import GameInfo from "./gameInfo";
import useGameStore from "@/store/gameStore";

const GameHero: React.FC = () => {
  const { collection } = useGameStore();
  if (!collection) return <h1>ERROR NO INFO</h1>;
  const images = [collection.banner_image_url, Images[collection.name]];

  return (
    <div className=" flex flex-col mt-5 mb-5">
      <div className="w-full">
        <GameCarousel images={images} />
      </div>
      <GameInfo />
    </div>
  );
};

export default GameHero;
