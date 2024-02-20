import {
  getCollection,
  getCollectionSaleEvents,
  getCollectionStats,
  getListingsByCollectionsMetadata
} from '../../app/opensea';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { NftExtended } from '../../app/types';
import { NftCard } from '../../app/components/nftcard';
import { parsePrice } from '../../app/utils';
import { Hero } from './components/Hero';
import { Socials } from './components/Socials';
import { Stats } from './components/Stats';
import { ScatterChartHero } from './components/EventScatterPlot';
import React, { useEffect, useState } from 'react';
import { Card, AreaChart, Title, Text } from '@tremor/react';
import Search from '../../app/search';
import Navbar from '../dashboard/components/hero_bar';
import { TableHero } from '../dashboard/components/games_table';
import { SparkAreaUsageExample } from '../dashboard/components/game_stat_charts';
import { Collection, CollectionStats } from '../../app/types';

const games = [
  "cryptokitties",
  "mavia-land",
  "axie",
  "delysium"
]

export const getServerSideProps: GetServerSideProps = async ({
  query: { name }
}) => {
  const collection = await getCollection(name as string);
  const listings = await getListingsByCollectionsMetadata(name as string, '5');
  const collectionStats = await getCollectionStats(name as string);
  const collectionSaleEvents = await getCollectionSaleEvents(
    name as string,
    '5'
  );
  return {
    props: { collection, listings, collectionStats, collectionSaleEvents }
  };
};

export default function Page({
  collection,
  listings,
  collectionStats,
  collectionSaleEvents
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className="h-full bg-gray-50">
      <Search />
      <Hero game={collection} />
      <SparkAreaUsageExample />
      <TableHero key={collection} game={collection} stats={collectionStats}/>
      <Socials game={collection} />
      <Stats game={collection} stats={collectionStats} />
      <ScatterChartHero assetEvents={collectionSaleEvents} />
      <p className="text-2xl font-bold mb-2 mt-4">NFTS</p>
      <div className="grid grid-cols-6 gap-4 mt-4">
        {listings ? (
          listings.map((nftextended: NftExtended) => (
            <div key={nftextended.identifier}>
              <NftCard
                nft={nftextended}
                price={
                  nftextended.current_price
                    ? parsePrice(nftextended.current_price)
                    : 'No price'
                }
              />
            </div>
          ))
        ) : (
          <h1>No NFTs</h1>
        )}
      </div>
    </main>
  );
}


