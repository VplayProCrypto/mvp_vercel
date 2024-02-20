import {
  getCollection,
  getCollectionSaleEvents,
  getCollectionStats,
  getListingsByCollectionsMetadata
} from '../../app/opensea';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { NftExtended, GameDescriptions } from '../../app/types';
import { NftCard } from '../../app/components/nftcard';
import { parsePrice } from '../../app/utils';
import { Hero } from './components/Hero';
import { Socials } from './components/Socials';
import { Stats } from './components/Stats';
import { ScatterChartHero } from './components/EventScatterPlot';
import React, { useEffect, useState } from 'react';

import Navbar from '../../app/navbar';

import Footer from '../../app/components/footer';
const games = ['cryptokitties', 'mavia-land', 'pixels-farm', 'decentraland'];

// Define an interface for the games' individual entry

// Define the main gameDescription constant with the new interface
export const gameDescription: GameDescriptions = {
  cryptokitties: {
    playNowButtonText: 'Play Now',
    itemsText: 'Items',
    communityScore: 'A',
    playerCount: 'Top 10%',
    rewardsText: 'Average Rewards',
    stars: '5',
    rr: '272',
    genre: 'Pets',
    friendly: 'Beginner Friendly'
  },
  'mavia-land': {
    playNowButtonText: 'Play Now',
    itemsText: 'Items',
    communityScore: 'B',
    playerCount: 'Top 10%',
    rewardsText: 'Above Average Rewards',
    stars: '4',
    rr: '143 days',
    genre: 'MMO',
    friendly: 'Friendly'
  },
  decentraland: {
    playNowButtonText: 'Play Now',
    itemsText: 'Items',
    communityScore: 'C',
    playerCount: 'Top 30%',
    rewardsText: 'Average Rewards',
    stars: '4',
    rr: '',
    genre: 'MMO',
    friendly: 'Friendly'
  },
  'pixels-farm': {
    playNowButtonText: 'Play Now',
    itemsText: 'Items',
    communityScore: 'A',
    playerCount: 'Top 30%',
    rewardsText: 'Average Rewards',
    stars: '5',
    rr: '238 days',
    genre: 'Pixel Art',
    friendly: 'Beginner Frq'
  }
};

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
  const gamedescription = gameDescription[name as keyof GameDescriptions];
  return {
    props: {
      collection,
      listings,
      collectionStats,
      collectionSaleEvents,
      gamedescription
    }
  };
};

export default function Page({
  collection,
  listings,
  collectionStats,
  collectionSaleEvents,
  gamedescription
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className="h-full bg-stone-800 text-white p-4 lg:p-8">
      <Navbar user={undefined} gasFee={''} />
      <Hero game={collection} gameDescription={gamedescription} />
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
