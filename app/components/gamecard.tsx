import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
interface GameCardProps {
  banner: string; // URL to the game banner image
  name: string; // Name of the game
  rewardRate: string; // Expected reward rate
  activeWallets: number; // Number of active wallets
  activeUsers: number; // Number of active users
  // onClick: () => void; // Function to execute on card click, for navigation
}

export const GameCard: React.FC<GameCardProps> = ({
  banner,
  name,
  rewardRate,
  activeWallets,
  activeUsers
}) => {
  return (
    <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md cursor-pointer hover:bg-gray-100">
      <Image
        className="rounded-t-lg w-full h-40 object-cover"
        src={banner}
        alt={name}
      />

      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {name}
        </h5>

        <p className="mb-3 font-normal text-gray-700">
          Expected Reward: {rewardRate}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">
            Active Wallets: {activeWallets}
          </span>
          <span className="text-gray-600 text-sm">
            Active Users: {activeUsers}
          </span>
        </div>
      </div>
    </div>
  );
};
