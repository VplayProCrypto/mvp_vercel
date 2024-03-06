import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

// Import necessary types
import type {
  Collection,
  NftExtended,
  CollectionStats,
  AssetEvent,
} from "../utils/apiTypes";

// Custom hook for fetching data
const useFetchGameData = () => {
  const router = useRouter();
  const pathName = usePathname();
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
    const gameName = pathName.split("/game/").pop();
    if (!gameName) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const apiUrl = "/api/opensea";
        const fetchOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };

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

        const responses = await Promise.all([
          collectionPromise,
          nftListingsPromise,
          statsPromise,
          eventsPromise,
        ]);
        const [
          collectionResponse,
          nftListingsResponse,
          statsResponse,
          eventsResponse,
        ] = await Promise.all(responses.map((res) => res.json()));

        setCollection(collectionResponse);
        setListings(nftListingsResponse.nftListings);
        setCollectionStats(statsResponse);
        setCollectionSaleEvents(eventsResponse.events);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pathName]);

  return {
    loading,
    collection,
    listings,
    collectionStats,
    collectionSaleEvents,
  };
};

export default useFetchGameData;
