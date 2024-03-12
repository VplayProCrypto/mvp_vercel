import { fetchApi } from "@/utils/utils";
import {
  Collections,
  Collection,
  Nfts,
  Listings,
  NftExtended,
  NftResponse,
  Offers,
  Offer,
  CollectionStats,
  AssetEvent,
  NftListings,
  Listing,
} from "../../../utils/apiTypes";
import { BASE_URL } from "../../../utils/consts";

export const getCollection = (collectionName: string): Promise<Collection> =>
  fetchApi(`${BASE_URL}/collections/${collectionName}`);

export const getNftsByCollection = (
  collectionName: string,
  limit: string
): Promise<Nfts> =>
  fetchApi(`${BASE_URL}/collection/${collectionName}/nfts?limit=${limit}`);

export const getNft = async (
  address: string,
  id: string,
  chain: string = "ethereum"
): Promise<NftExtended> => {
  const nft = await fetchApi<NftResponse>(
    `${BASE_URL}/chain/${chain}/contract/${address}/nfts/${id}`
  );
  return nft.nft;
};

export const getCollectionsByChain = (
  chain: string,
  limit: string,
  next?: string
): Promise<Collection[]> =>
  fetchApi<Collections>(
    `${BASE_URL}/collections?chain=${chain}&limit=${limit}${
      next ? `&next=${next}` : ""
    }`
  ).then((collections) => collections.collections);

export const getListingsByCollections = (
  collection_slug: string,
  limit: string,
  next?: string
): Promise<Listing[]> =>
  fetchApi<Listings>(
    `${BASE_URL}/listings/collection/${collection_slug}/all?limit=${limit}${
      next ? `&next=${next}` : ""
    }`
  ).then((listings) => listings.listings);

export const getBestOfferForNft = (
  id: string,
  collectionSlug: string
): Promise<Offer> =>
  fetchApi<Offers>(
    `${BASE_URL}/offers/collection/${collectionSlug}/nfts/${id}/best`
  ).then((offers) => offers.offers[0]);

export const getListingsByCollectionsMetadata = async (
  collection_slug: string,
  limit: string,
  next?: string
): Promise<NftListings> => {
  const responseJson = await fetchApi<Listings>(
    `${BASE_URL}/listings/collection/${collection_slug}/best?limit=${limit}${
      next ? `&next=${next}` : ""
    }`
  );
  const listings = responseJson.listings;

  if (!listings) return { nfts: [], next: "" };

  const nfts = await Promise.all(
    listings.map(async (listing) => ({
      ...(await getNft(
        listing.protocol_data.parameters.offer[0].token,
        listing.protocol_data.parameters.offer[0].identifierOrCriteria
      )),
      current_price: listing.price.current || null,
      owner: listing.protocol_data.parameters.offerer,
      animation_url: "",
      is_suspicious: false,
      creator: "",
      traits: [],
    }))
  );

  return { nfts, next: responseJson.next || "" };
};

export const getCollectionStats = (
  collectionSlug: string
): Promise<CollectionStats> =>
  fetchApi(`${BASE_URL}/collections/${collectionSlug}/stats`);

export const getCollectionSaleEvents = (
  collectionSlug: string,
  limit: string
): Promise<AssetEvent[]> =>
  fetchApi<{ asset_events: AssetEvent[] }>(
    `${BASE_URL}/events/collection/${collectionSlug}?event_type=sale&limit=${limit}`
  ).then((responseJson) => responseJson.asset_events);
