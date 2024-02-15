import Image from 'next/image';
import { Collection } from '../../../app/types';
export const Hero: React.FC<{ game: Collection }> = ({ game }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 m-4">
      <div className="flex flex-row items-center">
        <h3 className="text-6xl font-bold mb-2 mt-4">{game.name}</h3>
        <div className="relative mt-4 mb-4">
          {game.image_url ? (
            <Image
              src={game.image_url}
              height={100}
              width={100}
              alt={game.name}
              className="mt-4"
            />
          ) : (
            <p className="text-sm text-gray-500 mt-4">No image</p>
          )}
        </div>
      </div>

      <div className="relative mt-4 mb-4">
        {game.banner_image_url ? (
          <Image
            src={game.banner_image_url}
            height={500}
            width={1000}
            alt={game.name}
            className="mt-4"
          />
        ) : (
          <p className="text-sm text-gray-500 mt-4">No banner image</p>
        )}
      </div>

      <p className="text-1xl text-gray-600 mb-4">{game.description}</p>
    </div>
  );
};
