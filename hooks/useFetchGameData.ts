import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import type {
  Collection,
  NftExtended,
  CollectionStats,
  AssetEvent,
  NftListings,
} from "../utils/apiTypes";

const useFetchGameData = () => {
  const pathName = usePathname();
  const [collection, setCollection] = useState<Collection | null>(null);
  const [listings, setListings] = useState<NftListings>({ nfts: [], next: "" });
  const [collectionStats, setCollectionStats] =
    useState<CollectionStats | null>(null);
  const [collectionSaleEvents, setCollectionSaleEvents] = useState<
    AssetEvent[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastFetchTime, setLastFetchTime] = useState<number>(0);
  const [rateLimitDelay] = useState<number>(1000); // 1 second delay between fetches

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

  const fetchMoreListings = async () => {
    const currentTime = Date.now();
    if (
      listings.next &&
      !loading &&
      currentTime - lastFetchTime >= rateLimitDelay
    ) {
      setLoading(true);
      setLastFetchTime(currentTime);
      try {
        const apiUrl = "/api/opensea";
        const fetchOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(
          `${apiUrl}?action=getListingsByCollectionsMetadata&next=${listings.next}`,
          fetchOptions
        );
        const data = await response.json();
        return data.nftListings;
      } catch (error) {
        console.error("Error fetching more listings:", error);
      } finally {
        setLoading(false);
      }
    }
    return null;
  };

  return {
    loading,
    collection,
    listings,
    collectionStats,
    collectionSaleEvents,
    fetchMoreListings,
  };
};

export default useFetchGameData;
