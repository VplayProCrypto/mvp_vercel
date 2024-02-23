import {
  Collections,
  Collection,
  Nft,
  Nfts,
  Listing,
  Listings,
  NftExtended,
  NftResponse,
  Offers,
  Offer,
  Trait,
  CollectionStats,
  AssetEvent,
  Events,
  ApiResponse
} from '../../../utils/types';
import { NextRequest, NextResponse } from 'next/server';
import {
  getBestOfferForNft,
  getCollection,
  getCollectionSaleEvents,
  getCollectionStats,
  getCollectionsByChain,
  getListingsByCollections,
  getListingsByCollectionsMetadata,
  getNft,
  getNftsByCollection
} from './utils';

export async function GET(nextRequest: NextRequest): Promise<NextResponse> {
  const url = new URL(nextRequest.url);
  const action = url.searchParams.get('action');
  const params: { [key: string]: string | null } = Object.fromEntries(
    url.searchParams
  );

  try {
    switch (action) {
      case 'getCollection':
        const collection: Collection = await getCollection(
          params.collectionName as string
        );
        return NextResponse.json(collection);

      case 'getNftsByCollection':
        const nfts: Nft[] = await getNftsByCollection(
          params.collectionName as string,
          params.limit as string
        );
        return NextResponse.json({ nfts });

      case 'getNft':
        const nft: Nft = await getNft(
          params.address as string,
          params.id as string,
          params.chain as string
        );
        return NextResponse.json(nft);

      case 'getCollectionsByChain':
        const collections: Collection[] = await getCollectionsByChain(
          params.chain as string,
          params.limit as string
        );
        return NextResponse.json({ collections });

      case 'getListingsByCollections':
        const listings: Listing[] = await getListingsByCollections(
          params.collection_slug as string,
          params.limit as string
        );
        return NextResponse.json({ listings });

      case 'getBestOfferForNft':
        const offer: Offer = await getBestOfferForNft(
          params.id as string,
          params.collectionSlug as string
        );
        return NextResponse.json(offer);

      case 'getListingsByCollectionsMetadata':
        const nftListings: NftExtended[] =
          await getListingsByCollectionsMetadata(
            params.collection_slug as string,
            params.limit as string
          );
        return NextResponse.json({ nftListings });

      case 'getCollectionStats':
        const stats: CollectionStats = await getCollectionStats(
          params.collectionSlug as string
        );
        return NextResponse.json(stats);

      case 'getCollectionSaleEvents':
        const events: AssetEvent[] = await getCollectionSaleEvents(
          params.collectionSlug as string,
          params.limit as string
        );
        return NextResponse.json({ events });

      default:
        return new NextResponse(
          JSON.stringify({ message: 'Invalid action specified' }),
          { status: 400 }
        );
    }
  } catch (error: any) {
    console.error('API error:', error);
    return new NextResponse(
      JSON.stringify({ message: 'Server error', error: error.toString() }),
      { status: 500 }
    );
  }
}
