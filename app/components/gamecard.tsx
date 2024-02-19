import { Collection } from '../types';
import Image from 'next/image';

interface GameCardProps {
    collection: Collection;
  }

  export const GameCard: React.FC<GameCardProps> = ({ collection }) => {
    return (
    <div className="collection-card">
    {collection.image_url && (
        <img src={collection.image_url} alt={collection.name} className="collection-image" />
    )}
    <h2>{collection.name}</h2>
    <p>{collection.description}</p>
    {/* Display more data as needed */}
    </div>
);
}