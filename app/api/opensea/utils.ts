import { fetchApi } from "@/utils/utils";

import { BASE_URL } from "../../../utils/consts";
import { Collection, Collections } from "@/types/collection";
import {
  Nfts,
  NftExtended,
  NftResponse,
  Listing,
  Listings,
  Offer,
  Offers,
  NftListings,
} from "@/types/nft";
import { CollectionStats, AssetEvent } from "@/types/stats";

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

export const getCollections = async (
  limit?: string,
  chain?: string,
  next?: string
): Promise<Collection[]> => {
  const params = [
    limit ? `limit=${limit}` : "",
    chain ? `chain=${chain}` : "",
    next ? `next=${next}` : "",
  ]
    .filter(Boolean)
    .join("&");

  const url = `${BASE_URL}/collections${params ? `?${params}` : ""}`;

  const { collections } = await fetchApi<Collections>(url);
  return collections;
};

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

export const getMultipleCollectionsOpensea = async (
  collectionNames: string[]
): Promise<Collection[]> => {
  const collectionPromises = collectionNames.map((collectionName) =>
    getCollection(collectionName)
  );
  const collections = await Promise.all(collectionPromises);
  return collections;
};
