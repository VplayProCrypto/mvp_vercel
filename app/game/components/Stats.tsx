import React from 'react';
import {
  Collection,
  CollectionStats,
  Interval,
  Total
} from '../../../utils/apiTypes';

interface StatsProps {
  game: Collection;
  stats: CollectionStats;
}

interface IntervalProps {
  interval: Interval;
}

const IntervalCard: React.FC<IntervalProps> = ({ interval }) => {
  return (
    <div className="bg-stone-900 rounded-lg p-4 text-white">
      <h4 className="text-xl font-bold mb-2">Interval: {interval.interval}</h4>
      <p className="text-lg font-medium">
        Volume: <span className="font-semibold">{interval.volume}</span>
      </p>
      <p className="text-lg font-medium">
        Volume Change:
        <span
          className={`ml-2 ${interval.volume_change > 0 ? 'text-green-400' : 'text-red-400'}`}
        >
          {interval.volume_change > 0
            ? `↑ ${interval.volume_change}`
            : `↓ ${Math.abs(interval.volume_change)}`}
        </span>
      </p>
      <p className="text-lg font-medium">
        Sales: <span className="font-semibold">{interval.sales}</span>
      </p>
      <p className="text-lg font-medium">
        Sales Diff:
        <span
          className={`ml-2 ${interval.sales_diff > 0 ? 'text-green-400' : 'text-red-400'}`}
        >
          {interval.sales_diff > 0
            ? `↑ ${interval.sales_diff}`
            : `↓ ${Math.abs(interval.sales_diff)}`}
        </span>
      </p>
      <p className="text-lg font-medium">
        Avg Price:{' '}
        <span className="font-semibold">{interval.average_price}</span>
      </p>
    </div>
  );
};

const TotalStatsCard: React.FC<{ supply: number; total: Total }> = ({
  supply,
  total
}) => {
  return (
    <div className="bg-stone-900 rounded-lg p-4 text-white">
      <h3 className="text-xl font-bold mb-4">Overall Stats</h3>
      <p className="text-lg font-medium">
        Total Supply: <span className="font-semibold">{supply}</span>
      </p>
      <p className="text-lg font-medium">
        Total Volume: <span className="font-semibold">{total.volume}</span>
      </p>
      <p className="text-lg font-medium">
        Total Sales: <span className="font-semibold">{total.sales}</span>
      </p>
      <p className="text-lg font-medium">
        Average Price:{' '}
        <span className="font-semibold">{total.average_price}</span>
      </p>
      <p className="text-lg font-medium">
        Number of Owners:{' '}
        <span className="font-semibold">{total.num_owners}</span>
      </p>
      <p className="text-lg font-medium">
        Market Cap: <span className="font-semibold">{total.market_cap}</span>
      </p>
      <p className="text-lg font-medium">
        Floor Price:{' '}
        <span className="font-semibold">
          {total.floor_price} {total.floor_price_symbol}
        </span>
      </p>
    </div>
  );
};

const Stats: React.FC<StatsProps> = ({ game, stats }) => {
  return (
    <div className="bg-stone-800 p-6 m-4 rounded-lg shadow-lg text-white">
      <h3 className="text-2xl font-semibold mb-4">Stats for {game.name}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <TotalStatsCard supply={game.total_supply} total={stats.total} />
        {stats.intervals.map((interval, index) => (
          <IntervalCard key={index} interval={interval} />
        ))}
      </div>
    </div>
  );
};

export default Stats;
