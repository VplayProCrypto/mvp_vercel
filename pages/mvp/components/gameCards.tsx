import React from 'react';
import Image from 'next/image';

import { gameDescription } from '../../game/[name]';
import { getCollectionStats, getCollection } from '../../../app/opensea';

interface GameCardProps {
  gameTitle: string;
  imageUrl: string;
  items: number;
  returnRate: string;
  opensea: string;
}

const GameCard: React.FC<GameCardProps> = ({ gameTitle, imageUrl, items, returnRate, opensea }) => {
  const url = `/game/${opensea}`
  return (
    <a href ={url}>
    <button> 
    <div className="game-card bg-white shadow-md rounded-md overflow-hidden m-4">
      <div className="image-container">
          <Image src={imageUrl} alt={`Cover image of ${gameTitle}`}  width={500} height={50} />
      
     </div>
      <div className="p-4">
        <h3 className="game-title font-bold text-gray-600 text-xl mb-2">{gameTitle}</h3>
        <p className="users text-gray-600">Items: {items.toLocaleString()}</p>
        <p className="return-rate text-gray-600">Return Rate: {returnRate}</p>
      </div>
    </div>
    </button>
    </a>
  );
};

interface GameData {
  title: string;
  imageUrl: string;
  items: number;
  returnRate: string;
  opensea: string
}


const gamesData: GameData[] = [
  // Populate with actual game data
  {
    title: 'CryptoKitties',
    imageUrl: 'https://www.cryptokitties.co/images/blog/kitty-cup-2022/kitty-cup-2022.jpg',
    items: 2021783,
    returnRate: '272 days',
    opensea : 'cryptokitties'
  },
  {
    title: 'Mavia Land',
    imageUrl: 'https://i.seadn.io/gcs/files/51d38eb7fbb6c62187b580aeaf108748.jpg?auto=format&dpr=1&w=3840',
    items: 10000,
    returnRate: '143 days',
    opensea : 'mavia-land'
  },
  {
    title: 'Decentraland',
    imageUrl:  'https://places.decentraland.org/places/images/places/genesis_plaza_banner.jpg',
    items: 98218,
    returnRate: '4 days',
    opensea : 'decentraland'
  },
  {
    title: 'Pixels-Farm',
    imageUrl: 'https://i.seadn.io/gcs/files/9d16e8bd3da20ce7248b3338622b2041.png?auto=format&dpr=1&w=3840',
    items: 5000,
    returnRate: '238 days',
    opensea : 'pixels-farm'
  }
];



export const GamesList: React.FC = () => {
  return (
    <div className="games-list flex flex-wrap justify-center">
      {gamesData.map((game, index) => (
        <GameCard
          key={index}
          gameTitle={game.title}
          imageUrl={game.imageUrl}
          items={game.items}
          returnRate={game.returnRate} 
          opensea={game.opensea}        />
      ))}
    </div>
  );
};