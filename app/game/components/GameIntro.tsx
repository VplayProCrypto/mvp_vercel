import React from 'react';
import Image from 'next/image';
import DescriptionCards from './DescriptionCards';
import Socials from './Socials'; // Ensure this path is correct
import { Collection, GameDescription } from '../../../utils/types'; // Ensure this path is correct

type GameIntroProps = {
  title: string;
  description: string;
  imageUrl?: string;
  gameDescription: GameDescription;
  game: Collection; // Added to pass to the Socials component
};

const GameIntro: React.FC<GameIntroProps> = ({
  title,
  description,
  imageUrl,
  gameDescription,
  game // This is the new property we're passing down
}) => {
  return (
    <div className="bg-stone-800 text-white p-4">
      <div className="flex flex-col lg:flex-row">
        <div className="flex-grow">
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

          <p className="text-2xl mb-4 mt-4">{description}</p>
          <div className="flex justify-between items-center mb-4">
            <div className="flex flex-col mb-2 mt-2 space-between">
              <a
                href={game.project_url}
                className="flex items-center text-green-500 hover:text-green-700"
              >
                <button className="mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  {gameDescription.playNowButtonText}
                </button>
              </a>
              <button className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                {gameDescription.itemsText}
              </button>
            </div>
          </div>
          <DescriptionCards
            communityScore={gameDescription.communityScore}
            playerCount={gameDescription.playerCount}
            rewardsText={gameDescription.rewardsText}
            stars={gameDescription.stars}
            rr={gameDescription.rr}
            genre={gameDescription.genre}
            friendly={gameDescription.friendly}
          />
        </div>
        <div className="flex-none mt-4 lg:mt-0 lg:ml-4">
          <Socials game={game} />
        </div>
      </div>
    </div>
  );
};

export default GameIntro;
