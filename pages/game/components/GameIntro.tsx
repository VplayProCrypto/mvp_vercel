import React from 'react';

type GameIntroProps = {
  title: string;
  description: string;
  imageUrl?: string;
  playNowButtonText: string;
  itemsText: string;
  communityScore: string;
  playerCount: string;
  rewardsText: string;
  stars: number;
  twentyDayRR: string;
  rpgText: string;
  beginnerFriendly: string;
  engine: string;
};
import Image from 'next/image';
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
  twentyDayRR,
  rpgText,
  beginnerFriendly,
  engine
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

        <div className="space-x-2">
          <span className="text-green-500">{rewardsText}</span>
          <span>{'★'.repeat(stars)}</span>
          <span className="text-green-500">{twentyDayRR}</span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="bg-blue-500 text-white font-bold py-1 px-2 rounded">
          {communityScore}
        </span>
        <span>{playerCount}</span>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-red-500">{rpgText}</span>
        <span className="text-green-500">{beginnerFriendly}</span>
      </div>
      <p className="mt-4">{engine}</p>
    </div>
  );
};

export default GameIntro;
