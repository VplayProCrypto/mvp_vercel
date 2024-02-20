import React from 'react';
import Image from 'next/image';

interface GameCardProps {
  gameTitle: string;
  imageUrl: string;
  users: number;
  returnRate: string;
}

const GameCard: React.FC<GameCardProps> = ({ gameTitle, imageUrl, users, returnRate }) => {
  return (
    <div className="game-card bg-white shadow-md rounded-md overflow-hidden m-4">
      <div className="image-container">
        <Image src={imageUrl} alt={`Cover image of ${gameTitle}`} layout="responsive" width={500} height={280} />
      </div>
      <div className="p-4">
        <h3 className="game-title font-bold text-gray-600 text-xl mb-2">{gameTitle}</h3>
        <p className="users text-gray-600">Users: {users.toLocaleString()}</p>
        <p className="return-rate text-gray-600">Return Rate: {returnRate}</p>
      </div>
    </div>
  );
};

interface GameData {
  title: string;
  imageUrl: string;
  users: number;
  returnRate: string;
}

const gamesData: GameData[] = [
  // Populate with actual game data
  {
    title: 'game 1',
    imageUrl: '/images/stage1.png',
    users: 15000,
    returnRate: '7%'
  },
  {
    title: 'game 2',
    imageUrl: '',
    users: 3,
    returnRate: '',
  },
  {
    title: 'game 3',
    imageUrl: '',
    users: 3,
    returnRate: '',
  },
  {
    title: 'game 4',
    imageUrl: '',
    users: 3,
    returnRate: '',
  },
  {
    title: 'game 5',
    imageUrl: '',
    users: 3,
    returnRate: '',
  }
  // Add other game data objects here
];

export const GamesList: React.FC = () => {
  return (
    <div className="games-list flex flex-wrap justify-center">
      {gamesData.map((game, index) => (
        <GameCard
          key={index}
          gameTitle={game.title}
          imageUrl={game.imageUrl}
          users={game.users}
          returnRate={game.returnRate}
        />
      ))}
    </div>
  );
};