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

const Game: React.FC<{ game: Collection }> = ({ game }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 m-4">
      <h3 className="text-6xl font-bold mb-2 mt-4">{game.name}</h3>
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
          <p className="text-sm text-gray-500 mt-4">No image</p>
        )}
      </div>

      <p className="text-1xl text-gray-600 mb-4">{game.description}</p>
    </div>
  );
};

export default function Page({
  collection,
  listings
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className="h-full bg-gray-50">
      <Game game={collection} />
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
