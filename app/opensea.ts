require('dotenv').config();
import { Http2ServerRequest, Http2ServerResponse } from 'http2'
import { Collections, Collection, Nft, Nfts } from './types';
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

export const getCollection = async (collectionName: string) => {
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

  let collection: Collection | string = 'loading data';
  await fetch(request)
    .then((res) => res.json())
    .then((res) => {
      collection = res as Collection;
    });

  return collection;
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
