import {
  getListingsByCollections,
  getCollection,
  getNftsByCollection,
  getListingsByCollectionsMetadata
} from '../../app/opensea';

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import {
  Collection,
  CurrentListingPrice,
  Nft,
  NftExtended
} from '../../app/types';

export const getServerSideProps: GetServerSideProps = async ({
  query: { name }
}) => {
  const collection = await getCollection(name as string);
  const listings = await getListingsByCollectionsMetadata(name as string, '10');
  return { props: { collection, listings } };
};

import Image from 'next/image';
import { NftCard } from '../../app/components/nftcard';

function convertWeiToEth(
  currency: string,
  decimals: number,
  value: string
): string {
  if (currency !== 'ETH' || decimals !== 18) {
    throw new Error('Unsupported currency or decimals');
  }

  const valueWei = BigInt(value);
  const divisor = BigInt(`1${'0'.repeat(decimals)}`);

  const quotient = (valueWei / divisor).toString();
  const remainder = (valueWei % divisor).toString().padStart(decimals, '0');

  // Combine quotient and remainder, then remove trailing zeros
  const result = `${quotient}.${remainder}`.replace(/\.?0+$/, '');

  return result;
}

// Testing the function

const parsePrice = (currentPrice: CurrentListingPrice) => {
  console.log(currentPrice);
  return currentPrice.currency === 'ETH'
    ? convertWeiToEth('ETH', 18, currentPrice.value) +
        ' ' +
        currentPrice.currency
    : currentPrice.value + ' ' + currentPrice.currency;
};

const Hero: React.FC<{ game: Collection }> = ({ game }) => {
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

interface SocialsProps {
  game: Collection;
}

const Socials: React.FC<SocialsProps> = ({ game }) => {
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

export default function Page({
  collection,
  listings
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className="h-full bg-gray-50">
      <Hero game={collection} />
      <Socials game={collection} />

      <p className="text-2xl font-bold mb-2 mt-4">NFTS</p>
      <div className="grid grid-cols-6 gap-4 mt-4">
        {listings ? (
          listings.map((nftextended: NftExtended) => (
            <div key={nftextended.identifier}>
              <NftCard
                nft={nftextended}
                price={
                  nftextended.current_price
                    ? parsePrice(nftextended.current_price)
                    : 'No price'
                }
              />
            </div>
          ))
        ) : (
          <h1>No NFTs</h1>
        )}
      </div>
    </main>
  );
}
