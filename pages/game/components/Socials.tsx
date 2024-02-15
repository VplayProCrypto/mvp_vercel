import { Collection } from '../../../app/types';

interface SocialsProps {
  game: Collection;
}

export const Socials: React.FC<SocialsProps> = ({ game }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 m-4">
      <h3 className="text-3xl font-bold mb-2 mt-4">Socials</h3>
      <a href={game.opensea_url} className="text-blue-500 hover:text-blue-700">
        <button className="bg-blue-200 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded m-1">
          OpenSea
        </button>
      </a>
      <a
        href={game.project_url}
        className="text-green-500 hover:text-green-700"
      >
        <button className="bg-green-200 hover:bg-green-500 text-white font-bold py-2 px-4 rounded m-1">
          Project
        </button>
      </a>
      <a href={game.wiki_url} className="text-yellow-500 hover:text-yellow-700">
        <button className="bg-yellow-200 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded m-1">
          Wiki
        </button>
      </a>
      <a
        href={game.discord_url}
        className="text-indigo-500 hover:text-indigo-700"
      >
        <button className="bg-indigo-200 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded m-1">
          Discord
        </button>
      </a>
      <a
        href={game.telegram_url}
        className="text-purple-500 hover:text-purple-700"
      >
        <button className="bg-purple-200 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded m-1">
          Telegram
        </button>
      </a>
      {/* Add more buttons for other properties as needed */}
      <h3 className="text-xl font-bold text-gray-700 mt-2">
        @{game.twitter_username}
      </h3>
      <h3 className="text-xl font-bold text-gray-700 mt-2">
        {game.instagram_username}
      </h3>
      {/* Add more h3 tags for other properties as needed */}
    </div>
  );
};
