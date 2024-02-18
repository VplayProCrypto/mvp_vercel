import { Collection, CollectionStats, Interval } from '../../../app/types';

interface StatsProps {
  game: Collection;
  stats: CollectionStats;
}

interface IntervalProps {
  interval: Interval;
}

const IntervalCard: React.FC<IntervalProps> = ({ interval }) => {
  return (
    <div className="bg-blue-100 rounded-lg shadow-lg p-4 m-4 max-w-min">
      <h3 className="text-3xl font-bold mb-2 mt-4">
        Interval : {interval.interval}
      </h3>
      <p className="text-xl font-bold mb-2 mt-4"> Volume: {interval.volume}</p>
      <p className="text-xl font-bold mb-2 mt-4">
        Volume Diff: {interval.volume_diff}
      </p>
      <p className="text-xl font-bold mb-2 mt-4">
        Volume Change: {interval.volume_change}
      </p>
      <p className="text-xl font-bold mb-2 mt-4">Sales: {interval.sales}</p>
      <p className="text-xl font-bold mb-2 mt-4">
        Sales Diff: {interval.sales_diff}
      </p>
      <p className="text-xl font-bold mb-2 mt-4">
        Avg Price: {interval.average_price}
      </p>
    </div>
  );
};

export const Stats: React.FC<StatsProps> = ({ game, stats }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 m-4">
      <h3 className="text-3xl font-bold mb-2 mt-4">Stats</h3>
      <p className="text-2xl font-bold mb-2 mt-4">
        Total supply: {game.total_supply}
      </p>
      <p className="text-2xl font-bold mb-2 mt-4">
        Total volume: {stats.total.volume}
      </p>

      <p className="text-2xl font-bold mb-2 mt-4">
        Average price: {stats.total.average_price}
      </p>
      <p className="text-2xl font-bold mb-2 mt-4">
        Market cap: {stats.total.market_cap}
      </p>
      <p className="text-2xl font-bold mb-2 mt-4">
        Floor price: {stats.total.floor_price}
      </p>
      <p className="text-2xl font-bold mb-2 mt-4">
        Floor price symbol: {stats.total.floor_price_symbol}
      </p>
      <p className="text-2xl font-bold mb-2 mt-4">
        Number of Owners: {stats.total.num_owners}
      </p>
      <div className="flex flex-row">
        {stats.intervals.map((interval: Interval) => (
          <IntervalCard key={interval.interval} interval={interval} />
        ))}
      </div>
    </div>
  );
};
