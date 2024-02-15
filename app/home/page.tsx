'use client';

import React, { useState, useEffect } from 'react';
import { Title, Text } from '@tremor/react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title as ChartTitle, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ChartTitle, Tooltip, Legend);

const SalesChartPage = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      const options = { method: 'GET', headers: { accept: 'application/json' } };
      try {
        const response = await fetch('https://eth-mainnet.g.alchemy.com/nft/v3//getNFTSales?fromBlock=0&toBlock=latest&order=asc&marketplace=seaport&contractAddress=0x06012c8cf97BEaD5deAe237070F9587f8E7A266d&tokenId=44&limit=50', options);
        const data = await response.json();
        // Process the data to extract block number and ETH amount
        const processedData = data.nftSales.map(sale => ({
          blockNumber: sale.blockNumber,
          // Convert amount from wei to ETH by dividing by 10^decimals
          ethAmount: parseFloat(sale.sellerFee.amount) / (10 ** sale.sellerFee.decimals)
        }));
        setSalesData(processedData);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchSalesData();
  }, []);

  const chartData = {
    labels: salesData.map(sale => `Block ${sale.blockNumber}`),
    datasets: [
      {
        label: 'Seller Fee (ETH)',
        data: salesData.map(sale => sale.ethAmount),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>NFT Sales Chart</Title>
      <Text>Visualizing Seller Fees from NFT Sales</Text>
      <Line data={chartData} />
    </main>
  );
};

export default SalesChartPage;
