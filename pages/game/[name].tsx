import { getCollection, getNftsByCollection } from '../../app/opensea';

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { Collection, Nft } from '../../app/types';

export const getServerSideProps = (async ({ query: { name } }) => {
  const collection = await getCollection(name as string);
  const nfts = await getNftsByCollection(name as string, '100');
  console.log(nfts);
  return { props: { collection, nfts } };
}) satisfies GetServerSideProps<{ collection: Collection; nfts: Nft[] }>;

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
  nfts
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className="h-full bg-gray-50">
      <Game game={collection} />
      <p className="text-2xl font-bold mb-2 mt-4">NFTS</p>
      <div className="grid grid-cols-6 gap-4 mt-4">
        {nfts.map((nft) => (
          <div key={nft.identifier}>
            <NftCard nft={nft} />
          </div>
        ))}
      </div>
    </main>
  );
}
