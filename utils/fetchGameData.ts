// fetchGameData.ts
import {
  getOpenseaCollection,
  getOpenseaCollectionSaleEvents,
  getOpenseaCollectionStats,
  getOpenseaListingsByCollectionsMetadata,
} from '@/backend/apis/opensea'
import {
  getCollectionMetadataByName,
  getCollectionVplayMetrics,
  getTokenDistribution,
  getRatingSummary,
  getRatingDistribution,
  getRatings,
} from '@/db/queries'

export async function fetchGameData(gameName: string) {
  try {
    const [
      collectionResponse,
      nftListingsResponse,
      statsResponse,
      eventsResponse,
      metadataResponse,
      vplaymetricsResponse,
      tokenDistributionResponse,
      ratingSummaryResponse,
      ratingDistributionResponse,
      ratingsResponse,
    ] = await Promise.all([
      getOpenseaCollection(gameName),
      getOpenseaListingsByCollectionsMetadata(gameName, '50'),
      getOpenseaCollectionStats(gameName),
      getOpenseaCollectionSaleEvents(gameName, '50'),
      getCollectionMetadataByName(gameName),
      getCollectionVplayMetrics(gameName),
      getTokenDistribution(gameName),
      getRatingSummary(gameName),
      getRatingDistribution(gameName),
      getRatings(gameName),
    ])

    const [
      collection,
      nftListings,
      collectionStats,
      collectionSaleEvents,
      metadata,
      vplaymetrics,
      tokenDistribution,
      ratingSummary,
      ratingDistribution,
      ratings,
    ] = await Promise.all([
      collectionResponse,
      nftListingsResponse,
      statsResponse,
      eventsResponse,
      metadataResponse,
      vplaymetricsResponse,
      tokenDistributionResponse,
      ratingSummaryResponse,
      ratingDistributionResponse,
      ratingsResponse,
    ])

    return {
      collection,
      listings: nftListings,
      collectionStats,
      collectionSaleEvents: collectionSaleEvents,
      metadata: metadata,
      vplaymetrics: vplaymetrics,
      tokenDistribution: tokenDistribution,
      ratingSummary: ratingSummary,
      ratingDistribution: ratingDistribution,
      ratings: ratings,
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

export async function fetchDashboardGameData(gameName: string) {
  try {
    const [collection, collectionStats, metadata, vplaymetrics] =
      await Promise.all([
        getOpenseaCollection(gameName),
        getOpenseaCollectionStats(gameName),
        getCollectionMetadataByName(gameName),
        getCollectionVplayMetrics(gameName),
      ])

    return {
      collection,
      collectionStats,
      metadata,
      vplaymetrics,
    }
  } catch (error) {
    console.error('Error fetching game data:', error)
    return null
  }
}
