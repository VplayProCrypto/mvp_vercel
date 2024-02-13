"use client";

import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import { Card, Title, Text } from '@tremor/react';
import Search from './search';
import UsersTable from './table';
import { db } from './database';
import { UserUpdate, Users, NewUser, Collection, Nft, Nfts } from './types';
import { getCollection, getNftsByCollection } from './opensea';
import Image from 'next/image';
import { NftCard } from './components/nftcard';
import { GameCard } from './components/gamecard';
// Import Chart.js components
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title as ChartTitle, Tooltip, Legend } from 'chart.js';
import { GetServerSideProps } from 'next';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ChartTitle, Tooltip, Legend);

export const getServerSideProps = (async ({ query: { name } }) => {
  const collectionData = await getCollection(name as string);
  const nftsData: Nft[] = await getNftsByCollection('cryptokitties', '20');
  return { props: { collectionData, nftsData } };
}) satisfies GetServerSideProps<{ collectionsData: Collection; nftsData: Nft[] }>;

function IndexPage({ searchParams: { q } }) {
  const [nfts, setNfts] = useState<Nft[]>([]);
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchNFTs = async () => {
      const collectionData = await getCollection('cryptokitties');
      const nftsData: Nft[] = await getNftsByCollection('cryptokitties', '20');
      setNfts(nftsData);
    };

    const fetchSalesData = async () => {
      // Add your fetch logic here, similar to the previous example
    };

    fetchNFTs();
    fetchSalesData();
  }, []);

  const data = {
    labels: salesData.map(sale => sale.date), // Adjust based on your data structure
    datasets: [
      {
        label: 'NFT Sales',
        data: salesData.map(sale => sale.price), // Adjust this as well
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Dashboard</Title>
      <Text>Dashboard page</Text>
      <Search />
      {nfts.map((nft, index) => (
        <NftCard key={index} nft={nft} />
      ))}
      {/* Render the chart with sales data */}
      <div>
        <h2>Sales Data</h2>
        <Line data={data} />
      </div>
    </main>
  );
}

export default IndexPage;
