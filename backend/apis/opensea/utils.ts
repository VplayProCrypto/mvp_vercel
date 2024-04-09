import { fetchApi } from "@/utils/utils";

import { BASE_URL } from "../../../utils/consts";
import { Collection, Collections } from "@/types/opensea/collection";
import {
  Nfts,
  NftExtended,
  NftResponse,
  Listing,
  Listings,
  Offer,
  Offers,
  NftListings,
} from "@/types/opensea/nft";
import { CollectionStats, AssetEvent, Events } from "@/types/opensea/stats";

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

export const getCollectionEventsAll = async (
  collectionSlug: string,
  before: number,
  after: number,
  next?: string
): Promise<Events> => {
  let url = `${BASE_URL}/events/collection/${collectionSlug}?after=${after}&before=${before}&event_type=all`;
  if (next) {
    url += `&next=${next}`;
  }
  return (await fetchApi(url)) as Events;
};

export const calculateUniqueAddresses = async (
  collectionSlug: string,
  type: "daily" | "monthly"
) => {
  let after = 0;
  let before = 0;

  if (type === "daily") {
    after = Math.floor(Date.now() / 1000) - 86400;
    before = Math.floor(Date.now() / 1000);
  } else if (type === "monthly") {
    after = Math.floor(Date.now() / 1000) - 2592000;
    before = Math.floor(Date.now() / 1000);
  }

  const events = await getCollectionEventsAll(collectionSlug, before, after);
  const assetEvents = events.asset_events;
  const uniqueAddresses = new Set<string>();

  assetEvents.forEach((event) => {
    if (event.event_type === "order") {
      if (event.maker) uniqueAddresses.add(event.maker);
      if (event.taker) uniqueAddresses.add(event.taker);
    } else if (event.event_type === "sale") {
      if (event.seller) uniqueAddresses.add(event.seller);
      if (event.buyer) uniqueAddresses.add(event.buyer);
    } else if (
      event.event_type === "transfer" ||
      event.event_type === "redemption"
    ) {
      if (event.from_address) uniqueAddresses.add(event.from_address);
      if (event.to_address) uniqueAddresses.add(event.to_address);
    }
  });
  console.log(assetEvents.length);
  return uniqueAddresses.size;
};
