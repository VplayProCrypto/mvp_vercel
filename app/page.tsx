import { sql } from '@vercel/postgres';
import { Card, Title, Text } from '@tremor/react';
import Search from './search';
import UsersTable from './table';
import { db } from './database';
import 'dotenv/config';
import { UserUpdate, Users, NewUser, Collection, Nft, Nfts } from './types';
import {
  getCollectionOpenSeaSDK,
  getCollection,
  getNftsByCollection,
  getCollectionsByChain
} from './opensea';

import Image from 'next/image';

import { NftCard } from './components/nftcard';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const results = await db.selectFrom('users').selectAll().execute();

  const usersResults = results as Users[];
  const collection: Collection = await getCollectionOpenSeaSDK('cryptokitties');
  const collection2 = await getCollection('cryptokitties');
  const nfts: Nft[] = await getNftsByCollection('cryptokitties', '10');
  const collections: Collection[] = await getCollectionsByChain(
    'ethereum',
    '10'
  );
  //console.log(collection2);
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Users</Title>
      <Text>A list of users retrieved from a Postgres database.</Text>
      <Search />
      {nfts.map((nft) => {
        return <NftCard nft={nft} />;
      })}
    </main>
  );
}
