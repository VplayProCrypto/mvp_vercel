'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

import {
  NftExtended,
  Collection,
  CollectionStats,
  AssetEvent,
  GameDescription
} from '../../../utils/types';
import NftCard from '../../commonComponents/nftcard';
import { parsePrice } from '../../../utils/utils';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import ScatterChartHero from '../components/EventScatterPlot';
import Navbar from '../../commonComponents/navbar';
import Footer from '../../commonComponents/footer';
import { NextPage } from 'next';
import { gameDescription } from '../../../utils/utils';
import Loading from '../../commonComponents/loading';
const Page: NextPage = () => {
  const router = useRouter();
  const pathName = usePathname();
  // States for storing fetched data
  const [collection, setCollection] = useState<Collection | null>(null);
  const [listings, setListings] = useState<NftExtended[]>([]);
  const [collectionStats, setCollectionStats] =
    useState<CollectionStats | null>(null);
  const [collectionSaleEvents, setCollectionSaleEvents] = useState<
    AssetEvent[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!pathName) return;
    // Extract game name from the URL
    const gameName = pathName.split('/game/').pop();
    if (!gameName) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        // Define the base URL for your API calls
        const apiUrl = '/api/opensea';
        const fetchOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        };

        // Fetch requests for various data
        const collectionPromise = fetch(
          `${apiUrl}?action=getCollection&collectionName=${gameName}`,
          fetchOptions
        );
        const nftListingsPromise = fetch(
          `${apiUrl}?action=getListingsByCollectionsMetadata&collection_slug=${gameName}&limit=20`,
          fetchOptions
        );
        const statsPromise = fetch(
          `${apiUrl}?action=getCollectionStats&collectionSlug=${gameName}`,
          fetchOptions
        );
        const eventsPromise = fetch(
          `${apiUrl}?action=getCollectionSaleEvents&collectionSlug=${gameName}&limit=50`,
          fetchOptions
        );

        // Await all fetch promises and process responses
        const responses = await Promise.all([
          collectionPromise,
          nftListingsPromise,
          statsPromise,
          eventsPromise
        ]);
        const [
          collectionResponse,
          nftListingsResponse,
          statsResponse,
          eventsResponse
        ] = await Promise.all(responses.map((res) => res.json()));

        // Update state with fetched data
        setCollection(collectionResponse);
        setListings(nftListingsResponse.nftListings);
        setCollectionStats(statsResponse);
        setCollectionSaleEvents(eventsResponse.events);

        // setGameDescription(gamedescription[gameName as string]); // Assuming gameDescriptionData is a map of game descriptions
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
        console.log('fetched data');
      }
    };

    fetchData();
  }, [pathName]); // Depend on `router.asPath` to re-fetch data when the path changes
  // console.log(collection, listings, collectionStats, collectionSaleEvents);
  if (loading || !collection || !collectionStats) {
    return <Loading />;
  }
  console.log(collection.name);
  console.log(gameDescription['cryptokitties']);
  return (
    <main className="h-full bg-stone-800 text-white p-4 lg:p-8">
      <Navbar user={undefined} gasFee={''} />
      <Hero
        game={collection}
        gameDescription={gameDescription[collection.name]}
      />
      <p className="text-2xl font-bold mb-2 mt-4">NFTs</p>
      <div className="grid grid-cols-6 gap-4 mt-4">
        {(listings as NftExtended[]).map((nft: NftExtended) => (
          <NftCard
            key={nft.identifier}
            nft={nft}
            price={
              nft.current_price ? parsePrice(nft.current_price) : 'No price'
            }
          />
        ))}
      </div>
      <Stats game={collection} stats={collectionStats} />
      <ScatterChartHero assetEvents={collectionSaleEvents} />
      <Footer />
    </main>
  );
};

export default Page;
