"use client";

import React, { useEffect, useState } from 'react';
import { Card, AreaChart, Title, Text } from '@tremor/react';

// components
import Navbar from './components/hero_bar';
import { TableHero } from './components/games_table';
import { SparkAreaUsageExample } from './components/game_stat_charts';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
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






export default function Dashboard() {
  const [data, setData] = useState<TransformedDataItem[]>([]);

  useEffect(() => {
    fetch('/api/sandbox-stats')
      .then(response => response.json())
      .then((apiData: SandboxStatItem[]) => {
        const transformedData = apiData.map(item => ({
          Date: item.on_date,
          'Active Users': item.number_of_active_users,
          Volume: item.volume,
        }));
        setData(transformedData);
      })
      .catch(error => console.error("Failed to fetch data", error));
  }, []);

  return (
    <>
      <Navbar /> {/* Here's where you add the Navbar */}
      <Card className="mt-8">
        <Title>VPlay Pro Dashboard</Title>
        <SparkAreaUsageExample />
        <TableHero></TableHero> 
        <Title>Etherum Protocol Stats</Title>
        <Text>Active Users and Volume over time</Text>
        <AreaChart
          className="mt-4 h-80"
          data={data}
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
