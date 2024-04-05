// fetchGameData.ts
import {
  getCollection,
  getCollectionSaleEvents,
  getCollectionStats,
  getListingsByCollectionsMetadata,
} from "@/app/api/opensea/utils";
import { getCollectionMetadataByName } from "@/db/selects";

export async function fetchGameData(gameName: string) {
  try {
    const [
      collectionResponse,
      nftListingsResponse,
      statsResponse,
      eventsResponse,
      metadataResponse,
    ] = await Promise.all([
      getCollection(gameName),
      getListingsByCollectionsMetadata(gameName, "50"),
      getCollectionStats(gameName),
      getCollectionSaleEvents(gameName, "50"),
      getCollectionMetadataByName(gameName),
    ]);

    const [
      collection,
      nftListings,
      collectionStats,
      collectionSaleEvents,
      metadata,
    ] = await Promise.all([
      collectionResponse,
      nftListingsResponse,
      statsResponse,
      eventsResponse,
      metadataResponse,
    ]);

    return {
      collection,
      listings: nftListings,
      collectionStats,
      collectionSaleEvents: collectionSaleEvents,
      metadata: metadata,
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
