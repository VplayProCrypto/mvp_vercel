import { BASE_URL } from "../../utils/consts";
import { fetchApi } from "../../utils/utils";
import type {
  OpenseaAssetEvent,
  OpenseaCollection,
  OpenseaCollectionStats,
  OpenseaCollections,
  OpenseaEvents,
  OpenseaListing,
  OpenseaListings,
  OpenseaNftExtended,
  OpenseaNftListings,
  OpenseaNftResponse,
  OpenseaNfts,
  OpenseaOffer,
  OpenseaOffers,
} from "@types";
export const getOpenseaCollection = (
  collectionName: string
): Promise<OpenseaCollection> =>
  fetchApi(`${BASE_URL}/collections/${collectionName}`);

export const getOpenseaNftsByCollection = (
  collectionName: string,
  limit: string
): Promise<OpenseaNfts> =>
  fetchApi(`${BASE_URL}/collection/${collectionName}/nfts?limit=${limit}`);

export const getOpenseaNft = async (
  address: string,
  id: string,
  chain: string = "ethereum"
): Promise<OpenseaNftExtended> => {
  const nft = await fetchApi<OpenseaNftResponse>(
    `${BASE_URL}/chain/${chain}/contract/${address}/nfts/${id}`
  );
  return nft.nft;
};

export const getOpenseaCollections = async (
  limit?: string,
  chain?: string,
  next?: string
): Promise<OpenseaCollection[]> => {
  const params = [
    limit ? `limit=${limit}` : "",
    chain ? `chain=${chain}` : "",
    next ? `next=${next}` : "",
  ]
    .filter(Boolean)
    .join("&");

  const url = `${BASE_URL}/collections${params ? `?${params}` : ""}`;

  const { collections } = await fetchApi<OpenseaCollections>(url);
  return collections;
};

export const getOpenseaListingsByCollections = (
  collection_slug: string,
  limit: string,
  next?: string
): Promise<OpenseaListing[]> =>
  fetchApi<OpenseaListings>(
    `${BASE_URL}/listings/collection/${collection_slug}/all?limit=${limit}${
      next ? `&next=${next}` : ""
    }`
  ).then((listings) => listings.listings);

export const getOpenseaBestOfferForNft = (
  id: string,
  collectionSlug: string
): Promise<OpenseaOffer> =>
  fetchApi<OpenseaOffers>(
    `${BASE_URL}/offers/collection/${collectionSlug}/nfts/${id}/best`
  ).then((offers) => offers.offers[0]);

export const getOpenseaListingsByCollectionsMetadata = async (
  collection_slug: string,
  limit: string,
  next?: string
): Promise<OpenseaNftListings> => {
  const responseJson = await fetchApi<OpenseaListings>(
    `${BASE_URL}/listings/collection/${collection_slug}/best?limit=${limit}${
      next ? `&next=${next}` : ""
    }`
  );
  const listings = responseJson.listings;

  if (!listings) return { nfts: [], next: "" };

  const nfts = await Promise.all(
    listings.map(async (listing) => ({
      ...(await getOpenseaNft(
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

export const getOpenseaCollectionStats = (
  collectionSlug: string
): Promise<OpenseaCollectionStats> =>
  fetchApi(`${BASE_URL}/collections/${collectionSlug}/stats`);

export const getOpenseaCollectionSaleEvents = (
  collectionSlug: string,
  limit: string
): Promise<OpenseaAssetEvent[]> =>
  fetchApi<{ asset_events: OpenseaAssetEvent[] }>(
    `${BASE_URL}/events/collection/${collectionSlug}?event_type=sale&limit=${limit}`
  ).then((responseJson) => responseJson.asset_events);

export const getOpenseaMultipleCollectionsOpensea = async (
  collectionNames: string[]
): Promise<OpenseaCollection[]> => {
  const collectionPromises = collectionNames.map((collectionName) =>
    getOpenseaCollection(collectionName)
  );
  const collections = await Promise.all(collectionPromises);
  return collections;
};

export const getOpenseaCollectionEventsAll = async (
  collectionSlug: string,
  before: number,
  after: number,
  next?: string
): Promise<OpenseaEvents> => {
  let url = `${BASE_URL}/events/collection/${collectionSlug}?after=${after}&before=${before}&event_type=all`;
  if (next) {
    url += `&next=${next}`;
  }
  return (await fetchApi(url)) as OpenseaEvents;
};

export const calculateOpenseaUniqueAddresses = async (
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

  const events = await getOpenseaCollectionEventsAll(
    collectionSlug,
    before,
    after
  );
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
