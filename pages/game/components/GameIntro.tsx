import React from "react";

type GameIntroProps = {
  title: string;
  description: string;
  imageUrl?: string;
  playNowButtonText: string;
  itemsText: string;
  communityScore: string;
  playerCount: string;
  rewardsText: string;
  stars: string;
  rr: string;
  genre: string;
  friendly: string;
};
import Image from "next/image";

interface DescriptionCardsProps {
  communityScore: string;
  playerCount: string;
  rewardsText: string;
  stars: string;
  rr: string;
  genre: string;
  friendly: string;
}

interface DescriptionCardProps {
  item: string;
  description?: string;
}

const DescriptionCard: React.FC<DescriptionCardProps> = ({
  item,
  description,
}) => {
  return (
    <div className="flex flex-col bg-black rounded-full items-center justify-center m-2">
      <span className=" text-white font-bold text-1xl">{item}</span>
      <span className="text-xs mt-1">{description}</span>
    </div>
  );
};

const DescriptionCards: React.FC<DescriptionCardsProps> = ({
  communityScore,
  playerCount,
  rewardsText,
  stars,
  rr,
  genre,
  friendly,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-white p-4 rounded-lg">
      <DescriptionCard
        item={communityScore}
        description="A VPLAY Community Score"
      />
      <DescriptionCard item={playerCount} description="Player Count" />
      <DescriptionCard item={rewardsText} description="Rewards" />{" "}
      {/* Assuming you want a description here */}
      <DescriptionCard item={stars} description="Stars" />
      <DescriptionCard item={rr} description="RR" />{" "}
      {/* Assuming you want a description here */}
      <DescriptionCard item={genre} description="Genre" />{" "}
      {/* Assuming you want a description here */}
      <DescriptionCard item={friendly} />{" "}
      {/* Assuming you want a description here */}
    </div>
  );
};

const GameIntro: React.FC<GameIntroProps> = ({
  title,
  description,
  imageUrl,
  playNowButtonText,
  itemsText,
  communityScore,
  playerCount,
  rewardsText,
  stars,
  rr,
  genre,
  friendly,
}) => {
  return (
    <div className="bg-stone-800 text-white p-4">
      {imageUrl ? (
        <div className="flex flex-row items-center space-between">
          <h3 className="text-6xl font-bold mb-2 mt-4 mr-2">{title}</h3>
          <Image
            src={imageUrl}
            height={100}
            width={100}
            alt={title}
            className="mt-4"
          />
        </div>
      ) : (
        <h3 className="text-6xl font-bold mb-2 mt-4 mr-2">{title}</h3>
      )}

      <p className="text-2xl  mb-4 mt-4">{description}</p>
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col mb-2 mt-2 space-between">
          <button className="mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {playNowButtonText}
          </button>
          <button className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {itemsText}
          </button>
        </div>
      </div>
      <DescriptionCards
        communityScore={communityScore}
        playerCount={playerCount}
        rewardsText={rewardsText}
        stars={stars}
        rr={rr}
        genre={genre}
        friendly={friendly}
      />
    </div>
  );
};

export default GameIntro;
