import {
  Collections,
  Collection,
  Nft,
  Nfts,
  Listing,
  Listings,
  NftExtended,
  NftResponse
} from './types';
// This example provider won't let you make transactions, only read-only calls:

export const getCollectionOpenSeaSDK = async (collectionName: string) => {
  const sdk = require('api')('@opensea/v2.0#hbu2zlsaz6n88');

  sdk.auth(process.env.OPENSEA);
  sdk.server('https://api.opensea.io');
  const response = await sdk
    .get_collection({ collection_slug: collectionName })
    .catch((err: any) => console.error(err));
  return response.data;
};

export const getCollection = async (
  collectionName: string
): Promise<Collection> => {
  const headers: Headers = new Headers();
  const key: string = process.env.OPENSEA ? process.env.OPENSEA : 'no_api_key';
  headers.set('accept', 'application/json');
  headers.set('x-api-key', key);
  let url = 'https://api.opensea.io/api/v2/collections' + '/' + collectionName;

  console.log(url);
  const request: RequestInfo = new Request(url, {
    method: 'GET',
    headers: headers
  });

  const res = await fetch(request);
  const data = await res.json();
  return data as Collection;
};

export const getNftsByCollection = async (
  collectionName: string,
  limit: string
): Promise<Nft[]> => {
  const headers: Headers = new Headers();
  const key: string = process.env.OPENSEA ? process.env.OPENSEA : 'no_api_key';
  headers.set('accept', 'application/json');
  headers.set('x-api-key', key);
  let url =
    'https://api.opensea.io/api/v2/collection' +
    '/' +
    collectionName +
    '/nfts' +
    '?limit=' +
    limit;

  console.log(url);
  const request: RequestInfo = new Request(url, {
    method: 'GET',
    headers: headers
  });

  let response = await fetch(request);
  let responseJson = await response.json();
  let nfts = responseJson as Nfts;
  return nfts.nfts;
};

export const getNft = async (
  address: string,
  id: string,
  chain: string = 'ethereum'
): Promise<NftExtended> => {
  const headers: Headers = new Headers();
  const key: string = process.env.OPENSEA ? process.env.OPENSEA : 'no_api_key';
  headers.set('accept', 'application/json');
  headers.set('x-api-key', key);
  let url = `https://api.opensea.io/api/v2/chain/${chain}/contract/${address}/nfts/${id}`;

  console.log(url);
  const request: RequestInfo = new Request(url, {
    method: 'GET',
    headers: headers
  });

  let response = await fetch(request);
  let responseJson = await response.json();
  let nft = responseJson as NftResponse;
  return nft.nft;
};

export const getCollectionsByChain = async (
  chain: string,
  limit: string
): Promise<Collection[]> => {
  const headers: Headers = new Headers();
  const key: string = process.env.OPENSEA ? process.env.OPENSEA : 'no_api_key';
  headers.set('accept', 'application/json');
  headers.set('x-api-key', key);
  let url =
    'https://api.opensea.io/api/v2/collections' +
    '?chain=' +
    chain +
    '&limit=' +
    limit;

  console.log(url);
  const request: RequestInfo = new Request(url, {
    method: 'GET',
    headers: headers
  });

  let response = await fetch(request);
  let responseJson = await response.json();
  let collections = responseJson as Collections;
  return collections.collections;
};

export const getListingsByCollections = async (
  collection_slug: string,
  limit: string
  //next_page: string
): Promise<Collection[]> => {
  const headers: Headers = new Headers();
  const key: string = process.env.OPENSEA ? process.env.OPENSEA : 'no_api_key';
  headers.set('accept', 'application/json');
  headers.set('x-api-key', key);
  let url = `https://api.opensea.io/api/v2/listings/collection/${collection_slug}/all?limit=${limit}`;

  console.log(url);
  const request: RequestInfo = new Request(url, {
    method: 'GET',
    headers: headers
  });

  let response = await fetch(request);
  let responseJson = await response.json();
  let collections = responseJson as Collections;
  return collections.collections;
  //return responseJson
};

export const getListingsByCollectionsMetadata = async (
  collection_slug: string,
  limit: string,
  next_page: string
): Promise<NftExtended[]> => {
  const headers: Headers = new Headers();
  const key: string = process.env.OPENSEA ? process.env.OPENSEA : 'no_api_key';
  headers.set('accept', 'application/json');
  headers.set('x-api-key', key);
  let listingsUrl = `https://api.opensea.io/api/v2/listings/collection/${collection_slug}/best?limit=${limit}&next=${next_page}`;

  console.log(listingsUrl);
  const request: RequestInfo = new Request(listingsUrl, {
    method: 'GET',
    headers: headers
  });

  let response = await fetch(request);
  let responseJson = await response.json();
  let l = responseJson as Listings;
  let listings = l.listings;
  let nfts = listings.map((l) =>
    getNft(
      l.protocol_data.parameters.offer[0].token,
      l.protocol_data.parameters.offer[0].identifierOrCriteria
    )
  ) as unknown as NftExtended[];
  return nfts;
};
