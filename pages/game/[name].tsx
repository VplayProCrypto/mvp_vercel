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
import Navbar from '../../app/navbar';
import { TableHero } from '../dashboard/components/games_table';
import { SparkAreaUsageExample } from '../dashboard/components/game_stat_charts';
import { Collection, CollectionStats } from '../../app/types';
import Footer from '../../app/components/footer';
const games = ['cryptokitties', 'mavia-land', 'axie', 'delysium'];

export const getServerSideProps: GetServerSideProps = async ({
  query: { name }
}) => {
  const collection = await getCollection(name as string);
  const listings = await getListingsByCollectionsMetadata(name as string, '20');
  const collectionStats = await getCollectionStats(name as string);
  const collectionSaleEvents = await getCollectionSaleEvents(
    name as string,
    '50'
  );
  return {
    props: { collection, listings, collectionStats, collectionSaleEvents }
  };
};
//https://www.youtube.com/watch?v=3PTstAK-cH8

export default function Page({
  collection,
  listings,
  collectionStats,
  collectionSaleEvents
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className="h-full bg-stone-800 text-white p-4 lg:p-8">
      <Navbar user={undefined} gasFee={''} />
      <Hero game={collection} />
      <p className="text-2xl font-bold mb-2 mt-4">NFTS</p>
      <div className="grid grid-cols-6 gap-4 mt-4">
        {listings ? (
          listings.map((nftextended: NftExtended) => (
            <NftCard
              key={nftextended.identifier}
              nft={nftextended}
              price={
                nftextended.current_price
                  ? parsePrice(nftextended.current_price)
                  : 'No price'
              }
            />
          ))
        ) : (
          <h1 className="col-span-full text-center">No NFTs</h1>
        )}
      </div>
      <Stats game={collection} stats={collectionStats} />
      <ScatterChartHero assetEvents={collectionSaleEvents} />
      <Footer />
    </main>
  );
}
