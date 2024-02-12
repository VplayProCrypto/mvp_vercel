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

const nftCard = (nft: Nft) => {
  return (
    <div>
      {Object.keys(nft).map((key) => {
        if (key !== 'image_url') {
          return <h3>{nft[key as keyof Nft] as string}</h3>;
        } else {
          if (nft.image_url) {
            return (
              <Image src={nft.image_url} width="100" height="100" alt=":(" />
            );
          } else {
            return <h3>No image</h3>;
          }
        }
      })}
    </div>
  );
};

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const results = await db.selectFrom('users').selectAll().execute();

  const usersResults = results as Users[];
  const collection: Collection = await getCollectionOpenSeaSDK('cryptokitties');
  const collection2 = await getCollection('cryptokitties');
  const nfts: Nft[] = await getNftsByCollection('cryptokitties', '100');
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
        return nftCard(nft);
      })}
    </main>
  );
}
