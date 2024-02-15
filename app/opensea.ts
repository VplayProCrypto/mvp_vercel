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
  Trait
} from './types';

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
): Promise<Listing[]> => {
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
  let listings = responseJson as Listings;
  return listings.listings;
  //return responseJson
};

export const getBestOfferForNft = async (
  id: string,
  collectionSlug: string
): Promise<Offer> => {
  const headers: Headers = new Headers();
  const key: string = process.env.OPENSEA ? process.env.OPENSEA : 'no_api_key';
  headers.set('accept', 'application/json');
  headers.set('x-api-key', key);
  const url = `https://api.opensea.io/api/v2/offers/collection/${collectionSlug}/nfts/${id}/best`;
  console.log(url);
  const request: RequestInfo = new Request(url, {
    method: 'GET',
    headers: headers
  });

  let response = await fetch(request);
  let responseJson = await response.json();
  let offers = responseJson as Offers;
  return offers.offers[0];
};

export const getListingsByCollectionsMetadata = async (
  collection_slug: string,
  limit: string
): Promise<NftExtended[]> => {
  const key: string = process.env.OPENSEA || 'no_api_key';
  const headers = {
    accept: 'application/json',
    'x-api-key': key
  };
  const listingsUrl = `https://api.opensea.io/api/v2/listings/collection/${collection_slug}/best?limit=${limit}`;

  const response = await fetch(listingsUrl, {
    method: 'GET',
    headers: headers
  });
  const responseJson = await response.json();
  const listings: Listing[] = responseJson.listings;

  if (listings) {
    const nftsPromises = listings.map(async (listing) => {
      console.log(listing.protocol_data.parameters.offer[0]);
      console.log('Token:', listing.protocol_data.parameters.offer[0].token);
      console.log(
        'Identifier/Criteria:',
        listing.protocol_data.parameters.offer[0].identifierOrCriteria
      );

      const current_price = listing.price.current.value || null;
      const owner = listing.protocol_data.parameters.offerer;
      const animation_url = '';
      const is_suspicious = false;
      const creator = '';
      const traits: Trait[] = [];

      const nft = await getNft(
        listing.protocol_data.parameters.offer[0].token,
        listing.protocol_data.parameters.offer[0].identifierOrCriteria
      );

      return {
        ...nft,
        current_price,
        owner,
        animation_url,
        is_suspicious,
        creator,
        traits
      };
    });

    const nfts = (await Promise.all(nftsPromises)) as NftExtended[];
    return nfts;
  }
  return [];
};
