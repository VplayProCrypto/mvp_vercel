import {
  getListingsByCollections,
  getCollection,
  getNftsByCollection,
  getListingsByCollectionsMetadata
} from '../../app/opensea';

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { Collection, Nft, NftExtended } from '../../app/types';

export const getServerSideProps: GetServerSideProps = async ({
  query: { name }
}) => {
  const collection = await getCollection(name as string);
  const listings = await getListingsByCollectionsMetadata(name as string, '10');
  return { props: { collection, listings } };
};

import Image from 'next/image';
import { NftCard } from '../../app/components/nftcard';

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
              <NftCard nft={nftextended} />
              <h2>
                {nftextended.current_price
                  ? (nftextended.current_price as unknown as string)
                  : 'No price'}
              </h2>
              <h3>ETH</h3>
            </div>
          ))
        ) : (
          <h1>No NFTs</h1>
        )}
      </div>
    </main>
  );
}
