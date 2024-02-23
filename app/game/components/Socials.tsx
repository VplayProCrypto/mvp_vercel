import React from 'react';
import { Collection } from '../../../utils/types';
import {
  LinkIcon,
  ChatBubbleLeftIcon,
  BookOpenIcon,
  GlobeAltIcon,
  PaperAirplaneIcon,
  AtSymbolIcon,
  CameraIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface SocialsProps {
  game: Collection;
}

const Socials: React.FC<SocialsProps> = ({ game }) => {
  return (
    <div className="bg-stone-800 text-white rounded-lg shadow-lg p-4 m-4 max-w-xs">
      <h3 className="text-3xl font-bold mb-2 mt-4">Socials</h3>
      <div className="flex flex-col items-start gap-2">
        <a
          href={game.opensea_url}
          className="flex items-center text-blue-500 hover:text-blue-700"
        >
          <GlobeAltIcon className="h-5 w-5 mr-2" aria-hidden="true" />
          OpenSea
        </a>
        <a
          href={game.project_url}
          className="flex items-center text-green-500 hover:text-green-700"
        >
          <LinkIcon className="h-5 w-5 mr-2" aria-hidden="true" />
          Project
        </a>
        <a
          href={game.wiki_url}
          className="flex items-center text-yellow-500 hover:text-yellow-700"
        >
          <BookOpenIcon className="h-5 w-5 mr-2" aria-hidden="true" />
          Wiki
        </a>
        <a
          href={game.discord_url}
          className="flex items-center text-indigo-500 hover:text-indigo-700"
        >
          <ChatBubbleLeftIcon className="h-5 w-5 mr-2" aria-hidden="true" />
          Discord
        </a>
        <a
          href={game.telegram_url}
          className="flex items-center text-purple-500 hover:text-purple-700"
        >
          <PaperAirplaneIcon className="h-5 w-5 mr-2" aria-hidden="true" />
          Telegram
        </a>

        {game.twitter_username && (
          <a
            href={`https://twitter.com/${game.twitter_username}`}
            className="flex items-center text-blue-400 hover:text-blue-600"
          >
            <XMarkIcon className="h-5 w-5 mr-2" aria-hidden="true" />@
            {game.twitter_username}
          </a>
        )}
        {game.instagram_username && (
          <a
            href={`https://instagram.com/${game.instagram_username}`}
            className="flex items-center text-pink-600 hover:text-pink-800"
          >
            <CameraIcon className="h-5 w-5 mr-2" aria-hidden="true" />
            {game.instagram_username}
          </a>
        )}
      </div>
    </div>
  );
};

export default Socials;
