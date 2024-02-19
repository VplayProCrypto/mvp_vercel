import { ScatterChart } from '@tremor/react';
import { AssetEvent } from '../../../app/types';
import React from 'react';

interface ScatterChartHeroProps {
  assetEvents: AssetEvent[];
}

const getScatterPlotPoints = (assetEvents: AssetEvent[]) => {
  return assetEvents.map((assetEvent: AssetEvent) => {
    return {
      timestamp: assetEvent.event_timestamp,
      symbol: assetEvent.payment?.symbol || assetEvent.payment?.symbol || 'ETH',
      price: assetEvent.payment?.quantity
        ? parseFloat(assetEvent.payment.quantity) / Math.pow(10, 18)
        : 0,
      assetId: assetEvent.nft?.identifier,
      assetName: assetEvent.nft?.name
    };
  });
};

export const ScatterChartHero: React.FC<ScatterChartHeroProps> = ({
  assetEvents
}) => {
  if (!assetEvents) {
    return <h2>No Events </h2>;
  }

  const scatterPlotPoints: any = getScatterPlotPoints(assetEvents);
  const symbol = assetEvents[0]?.payment?.symbol || 'ETH';
  const maxX =
    Math.max(...scatterPlotPoints.map((p: any) => p.timestamp)) - 10000;
  const minX =
    Math.min(...scatterPlotPoints.map((p: any) => p.timestamp)) + 10000;
  const minY = Math.min(...scatterPlotPoints.map((p: any) => p.price)) - 1;
  const maxY = Math.max(...scatterPlotPoints.map((p: any) => p.price)) + 1;

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 m-4">
      <p className="text-lg text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
        Price in {symbol} vs Timestamp
      </p>

      <ScatterChart
        className="h-80"
        data={scatterPlotPoints}
        category="assetId"
        x="timestamp"
        y="price"
        showOpacity={true}
        maxXValue={maxX}
        minXValue={minX}
        maxYValue={maxY}
        minYValue={minY}
        valueFormatter={{
          x: (timestamp: number) => {
            const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
            return `Date: ${date.toLocaleDateString()} Time: ${date.toLocaleTimeString()}`;
          },
          y: (price: number) => `${price}  ${symbol}`
        }}
        showLegend={false}
        onValueChange={(v: any) => console.log(v)}
      />
    </div>
  );
};
