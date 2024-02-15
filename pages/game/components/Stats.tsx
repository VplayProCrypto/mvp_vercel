import { Collection } from '../../../app/types';

interface StatsProps {
  game: Collection;
}

export const Stats: React.FC<StatsProps> = ({ game }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 m-4">
      <h3 className="text-3xl font-bold mb-2 mt-4">Stats</h3>
      <p className="text-2xl font-bold mb-2 mt-4">
        Total supply: {game.total_supply}
      </p>
    </div>
  );
};
