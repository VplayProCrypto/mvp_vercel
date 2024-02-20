import React, { useState, useEffect } from 'react';
import { Card, Title, Text } from '@tremor/react';
import Search from './search';
import UsersTable from './table';
import { db } from './database';
import 'dotenv/config';
import { UserUpdate, Users, NewUser, Collection, Nft, Nfts } from './types';
import {
  // getCollectionOpenSeaSDK,
  getCollection,
  getNftsByCollection,
  getCollectionsByChain
} from './opensea';

import Image from 'next/image';

import { NftCard } from './components/nftcard';
import { GameCard } from './components/gamecard';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const games = [
    {
      name: "Crypto Kitties",
      background: 'https://i.seadn.io/gcs/static/banners/cryptokitties-banner2.png?auto=format&dpr=1&w=1920', // Adjust path as necessary
    },
    {
      name: "Mavia Land",
      background: "https://i.seadn.io/gcs/files/51d38eb7fbb6c62187b580aeaf108748.jpg?auto=format&dpr=1&w=1920",
    },
  ];

  const collection = await getCollection('cryptokitties');
  const nfts: Nft[] = await getNftsByCollection('cryptokitties', '1');

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Feature Games</Title>
      <Text>A list of users retrieved from a Postgres database.</Text>
      <Search />
      <div className='grid grid-cols-6 gap-4 mt-4'>
        {games.map((game, index) => (
          <GameCard key={index} name={game.name} banner={game.background} />
        ))}
        {nfts.map((nft) => {
          return <NftCard nft={nft} price={''} />;
        })}
      </div>
    </main>
  );
}

