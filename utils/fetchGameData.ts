// fetchGameData.ts
import {
  getCollection,
  getCollectionSaleEvents,
  getCollectionStats,
  getListingsByCollectionsMetadata,
} from "@/app/api/opensea/utils";
import { Collection } from "@/types/collection";
import { NftListings } from "@/types/nft";
import { CollectionStats, AssetEvent } from "@/types/stats";

export async function fetchGameData(gameName: string) {
  try {
    const [
      collectionResponse,
      nftListingsResponse,
      statsResponse,
      eventsResponse,
    ] = await Promise.all([
      getCollection(gameName),
      getListingsByCollectionsMetadata(gameName, "50"),
      getCollectionStats(gameName),
      getCollectionSaleEvents(gameName, "50"),
    ]);

    const [collection, nftListings, collectionStats, collectionSaleEvents] =
      await Promise.all([
        collectionResponse,
        nftListingsResponse,
        statsResponse,
        eventsResponse,
      ]);

    return {
      collection,
      listings: nftListings,
      collectionStats,
      collectionSaleEvents: collectionSaleEvents,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      collection: null,
      listings: { nfts: [], next: "" },
      collectionStats: null,
      collectionSaleEvents: [],
    };
  }
}
