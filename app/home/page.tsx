"use client";

import React, { useEffect, useState } from 'react';
import { Card, AreaChart, Title, Text } from '@tremor/react';

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

export default function Dashboard() {
  // Use the type with useState to let TypeScript know what the state will hold
  const [data, setData] = useState<TransformedDataItem[]>([]);

  useEffect(() => {
    fetch('/api/sandbox-stats') // Corrected path
      .then(response => response.json())
      .then((apiData: SandboxStatItem[]) => {
        const transformedData = apiData.map((item: SandboxStatItem) => ({
          Date: item.on_date,
          'Active Users': item.number_of_active_users,
          Volume: item.volume,
        }));
        setData(transformedData);
      })
      .catch(error => console.error("Failed to fetch data", error));
  }, []);
  


  return (
    <Card className="mt-8">
      <Title>The Sandbox Protocol Stats</Title>
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
  );
}
