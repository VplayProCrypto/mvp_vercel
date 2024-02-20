"use server";
import React, { useEffect, useState } from 'react';
import { Card, AreaChart, Title, Text } from '@tremor/react';

import {
  getCollection,
  getCollectionSaleEvents,
  getCollectionStats,
  getListingsByCollectionsMetadata
} from '../../app/opensea';

// components
import Navbar from './components/hero_bar';
import { TableHero } from './components/games_table';
import { SparkAreaUsageExample } from './components/game_stat_charts';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { Collection, CollectionStats } from '../../app/types';

type SandboxStatItem = {
  on_date: string;
  number_of_active_users: number;
  volume: number;
};

type TransformedDataItem = {
  Date: string;
  'Active Users': number;
  Volume: number;
};


const games = [
  "cryptokitties",
  "mavia-land",
  "axie",
  "delysium"
]


export const  getServerSideProps: GetServerSideProps = async () => {
  const gamesData = await Promise.all(games.map(async (name) => {
    const collection = await getCollection(name);
    const listings = await getListingsByCollectionsMetadata(name, '5');
    const collectionStats = await getCollectionStats(name);
    const collectionSaleEvents = await getCollectionSaleEvents(name, '5');

    return {
      name,
      collection,
      listings,
      collectionStats,
      collectionSaleEvents
    };
  }));

  return {
    props: { gamesData } // gamesData is an array containing data for all games
  };
};


export default async function Dashboard({ gamesData }:InferGetServerSidePropsType<typeof getServerSideProps>) {

  return (
    <>
      <Navbar /> {/* Here's where you add the Navbar */}
      <Card className="mt-8">
        <Title>VPlay Pro Dashboard</Title>
        <SparkAreaUsageExample />
        {gamesData.map((gameData: { name: React.Key | null | undefined; collection: Collection; collectionStats: CollectionStats; }) => (
        <TableHero
          key={gameData.name}
          game={gameData.collection}
          stats={gameData.collectionStats}
          />
      ))}
        <Title>Etherum Protocol Stats</Title>
        <Text>Active Users and Volume over time</Text>
        <AreaChart
          className="mt-4 h-80"
          data={gamesData.collectionStats.total.volume}
          categories={['Active Users', 'Volume']}
          index="Date"
          colors={['blue', 'green']}
          valueFormatter={(number) =>
            number.toLocaleString('us', { style: 'currency', currency: 'USD' })
          }
          yAxisWidth={60}
        />
      </Card>
    </>
  );
}
