'use client';

import React, { useState, useEffect } from 'react';
import { Card, Title, Text } from '@tremor/react';
import Search from '../../app/search';
// import UsersTable from './table'; // Ensure this is used or remove it if unnecessary
// import { db } from './database'; // Ensure this is used or remove it if unnecessary
import { UserUpdate, Users, NewUser, Collection, Nft, Nfts } from '../../app/types';
import {
  getCollection,
  getNftsByCollection,
} from '../../app/opensea';

import { NftCard } from '../../app/components/nftcard';
import { GameCard } from '../../app/components/gamecard';

export default function Mvp_dashboard({ searchParams }: { searchParams: { q: string } }) {
  const [games, setGames] = useState([
    // Initial game data can be moved to state if dynamic updates are needed
    {
      name: "Crypto Kitties",
      background: 'https://i.seadn.io/gcs/static/banners/cryptokitties-banner2.png?auto=format&dpr=1&w=1920',
    },
    {
      name: "Mavia Land",
      background: "https://i.seadn.io/gcs/files/51d38eb7fbb6c62187b580aeaf108748.jpg?auto=format&dpr=1&w=1920",
    },
  ]);
  const [nfts, setNfts] = useState<Nft[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Assuming 'cryptokitties' is a placeholder, replace it with dynamic data if necessary
      const collectionData = await getCollection('cryptokitties');
      const nftsData: Nft[] = await getNftsByCollection('cryptokitties', '1');
      setNfts(nftsData);
      // Handle collectionData if needed
    };

    fetchData().catch(console.error);
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Feature Games</Title>
      <Text>A list of users retrieved from a Postgres database.</Text>
      <Search />
      <div className='grid grid-cols-6 gap-4 mt-4'>
        {games.map((game, index) => (
          <GameCard key={index} name={game.name} banner={game.background} rewardRate='0.1' activeWallets={0} activeUsers={0} />
        ))}
        {nfts.map((nft, index) => (
          <NftCard key={index} nft={nft} price={'0'} />
        ))}
      </div>
    </main>
  );
}
