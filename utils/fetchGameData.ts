// fetchGameData.ts
import {
  getOpenseaCollection,
  getOpenseaCollectionSaleEvents,
  getOpenseaCollectionStats,
  getOpenseaListingsByCollectionsMetadata,
} from '@/backend/apis/opensea'
import { getCollectionMetadataByName } from '@/db/queries'

export async function fetchGameData(gameName: string) {
  try {
    const [
      collectionResponse,
      nftListingsResponse,
      statsResponse,
      eventsResponse,
      metadataResponse,
    ] = await Promise.all([
      getOpenseaCollection(gameName),
      getOpenseaListingsByCollectionsMetadata(gameName, '50'),
      getOpenseaCollectionStats(gameName),
      getOpenseaCollectionSaleEvents(gameName, '50'),
      getCollectionMetadataByName(gameName),
    ])

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
    ])

    return {
      collection,
      listings: nftListings,
      collectionStats,
      collectionSaleEvents: collectionSaleEvents,
      metadata: metadata,
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return {
      collection: null,
      listings: { nfts: [], next: '' },
      collectionStats: null,
      collectionSaleEvents: [],
    }
  }
}
