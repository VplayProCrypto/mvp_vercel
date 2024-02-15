import {
  getCollection,
  getListingsByCollectionsMetadata
} from '../../app/opensea';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { NftExtended } from '../../app/types';
import { NftCard } from '../../app/components/nftcard';
import { parsePrice } from '../../app/utils';
import { Hero } from './components/Hero';
import { Socials } from './components/Socials';
import { Stats } from './components/Stats';
export const getServerSideProps: GetServerSideProps = async ({
  query: { name }
}) => {
  const collection = await getCollection(name as string);
  const listings = await getListingsByCollectionsMetadata(name as string, '10');
  return { props: { collection, listings } };
};

export default function Page({
  collection,
  listings
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className="h-full bg-gray-50">
      <Hero game={collection} />
      <Socials game={collection} />
      <Stats game={collection} />

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
