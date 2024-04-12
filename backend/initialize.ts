import type {
  Collection,
  CollectionDynamic,
  Contract,
  Fee,
  NFT,
  NFTDynamic,
  NFTListing,
  OpenseaCollection,
  OpenseaCollectionStats,
  OpenseaContract,
  OpenseaFee,
  OpenseaNftExtended,
  OpenseaNftListings,
  OpenseaPaymentToken,
  PaymentToken,
  TokenPrice,
} from '@types'
import {
  getOpenseaCollection,
  getOpenseaCollectionEventsAll,
  getOpenseaCollectionStats,
} from 'apis/opensea'
import {
  collections,
  collectionDynamic,
  contracts,
  fees,
  paymentTokens,
  tokenPrices,
  pool,
} from '@db'
import { drizzle } from 'drizzle-orm/node-postgres'
import { getDappradarCollectionUAWs } from 'apis/dappradar'
import { getSocialSentiments } from 'apis/socials'

async function fetchCollectionData(collectionName: string) {
  try {
    const [
      openseaCollection,
      openseaCollectionStats,
      { daily_uaw, monthly_uaw },
      socialSentiments,
    ] = await Promise.all([
      getOpenseaCollection(collectionName),
      getOpenseaCollectionStats(collectionName),
      getDappradarCollectionUAWs(collectionName),
      getSocialSentiments(collectionName),
    ])

    return {
      openseaCollection,
      openseaCollectionStats,
      daily_uaw,
      monthly_uaw,
      ...socialSentiments,
    }
  } catch (error) {
    console.error(
      `Error fetching data for collection ${collectionName}:`,
      error
    )
    throw error
  }
}

const createCollectionRecord = (
  openseaCollection: OpenseaCollection
): Collection => ({
  opensea_slug: openseaCollection.collection,
  name: openseaCollection.name,
  description: openseaCollection.description,
  owner: openseaCollection.owner,
  category: openseaCollection.category,
  is_nsfw: openseaCollection.is_nsfw,
  opensea_url: openseaCollection.opensea_url,
  wiki_url: openseaCollection.wiki_url,
  discord_url: openseaCollection.discord_url,
  telegram_url: openseaCollection.telegram_url,
  twitter_url: openseaCollection.twitter_username,
  project_url: openseaCollection.project_url,
  instagram_url: openseaCollection.instagram_username,
  created_date: openseaCollection.created_date,
  updated_at: new Date(),
})

const createCollectionDynamicRecord = (
  collectionName: string,
  openseaCollectionStats: OpenseaCollectionStats,
  daily_uaw: number,
  monthly_uaw: number,
  socialSentiments: Record<string, number>
): CollectionDynamic => ({
  collection_slug: collectionName,
  total_average_price: +openseaCollectionStats.total.average_price,
  total_supply: 0,
  total_volume: +openseaCollectionStats.total.volume,
  total_num_owners: +openseaCollectionStats.total.num_owners,
  total_sales: +openseaCollectionStats.total.sales,
  total_market_cap: +openseaCollectionStats.total.market_cap,
  sales: +openseaCollectionStats.intervals[0].sales,
  volume: +openseaCollectionStats.intervals[0].volume,
  floor_price: +openseaCollectionStats.total.floor_price,
  floor_price_currency: openseaCollectionStats.total.floor_price_symbol,
  average_price: +openseaCollectionStats.total.average_price,
  daily_uaw,
  monthly_uaw,
  total_wallets: openseaCollectionStats.total.num_owners,
  ...socialSentiments,
  event_timestamp: new Date(),
})

const createContractRecord = (
  collectionName: string,
  openseaContract: OpenseaContract,
  openseaPaymentToken: OpenseaPaymentToken
): Contract => ({
  collection_slug: collectionName,
  contract_address: openseaContract.address,
  chain: openseaPaymentToken.chain,
})

const createFeeRecord = (
  collectionName: string,
  openseaFee: OpenseaFee
): Fee => ({
  collection_slug: collectionName,
  fee: openseaFee.fee,
  recipient: openseaFee.recipient,
})

const createPaymentTokenRecord = (
  collectionName: string,
  openseaPaymentToken: OpenseaPaymentToken
): PaymentToken => ({
  collection_slug: collectionName,
  symbol: openseaPaymentToken.symbol,
  contract_address: openseaPaymentToken.address,
  decimals: openseaPaymentToken.decimals,
  chain: openseaPaymentToken.chain,
})

const createTokenPriceRecord = (
  openseaPaymentToken: OpenseaPaymentToken
): TokenPrice => ({
  contract_address: openseaPaymentToken.address,
  eth_price: Number(openseaPaymentToken.eth_price),
  usdt_price: Number(openseaPaymentToken.usd_price),
  event_timestamp: new Date(),
})

const createNFTRecords = (
  collectionName: string,
  openseaNftListings: OpenseaNftListings
): NFT[] => {
  const openseaNftsExtended: OpenseaNftExtended[] = openseaNftListings.nfts
  return openseaNftsExtended.map(openseaNftExtended => {
    return {
      collection_slug: collectionName,
      game_id: openseaNftExtended.collection,
      token_id: openseaNftExtended.identifier,
      contract_address: openseaNftExtended.contract.address,
      token_standard: openseaNftExtended.token_standard,
      name: openseaNftExtended.name ? openseaNftExtended.name : '',
      description: openseaNftExtended.description
        ? openseaNftExtended.description
        : '',
      image_url: openseaNftExtended.image_url
        ? openseaNftExtended.image_url
        : '',
      metadata_url: openseaNftExtended.metadata_url
        ? openseaNftExtended.metadata_url
        : '',
      opensea_url: openseaNftExtended.opensea_url
        ? openseaNftExtended.opensea_url
        : '',
      updated_at: openseaNftExtended.updated_at,
      is_nsfw: openseaNftExtended.is_nsfw,
      is_disabled: openseaNftExtended.is_disabled,
      traits: openseaNftExtended.traits,
      event_timestamp: new Date(),
    }
  })
}

const createNFTDynamicRecords = (
  collectionName: string,
  openseaNftListings: OpenseaNftListings
): NFTDynamic[] => {
  const openseaNftsExtended: OpenseaNftExtended[] = openseaNftListings.nfts
  return openseaNftsExtended.map(openseaNftExtended => {
    return {
      order_hash: openseaNftExtended.order_hash,
      token_id: openseaNftExtended.identifier,
      contract_address: openseaNftExtended.contract.address,
      collection_slug: openseaNftExtended.collection,
      game_id: openseaNftExtended.collection,
      event_timestamp: new Date(),
    }
  })
}

const createNFTListingRecords = (
  openseaNftListings: OpenseaNftListings
): NFTListing[] => {
  const openseaNftsExtended: OpenseaNftExtended[] = openseaNftListings.nfts
  return openseaNftsExtended.map(openseaNftExtended => {
    return {
      order_hash: openseaNftExtended.order_hash,
      token_id: openseaNftExtended.identifier,
      contract_address: openseaNftExtended.contract.address,
      collection_slug: openseaNftExtended.collection,
      game_id: openseaNftExtended.collection,
      seller: openseaNftExtended.owner || '',
      price_val: openseaNftExtended.current_price?.value || '0',
      price_currency: openseaNftExtended.current_price?.currency || '',
      price_decimals: openseaNftExtended.current_price?.decimals
        ? String(openseaNftExtended.current_price?.decimals)
        : '0',
      start_date: openseaNftExtended.protocol_data.parameters.startTime
        ? new Date(openseaNftExtended.protocol_data.parameters.startTime)
        : new Date(),
      expiration_date: openseaNftExtended.protocol_data.parameters.endTime
        ? new Date(openseaNftExtended.protocol_data.parameters.endTime)
        : new Date(),
      event_timestamp: new Date(),
    }
  })
}

const createNFTEvenRecords = getOpenseaCollectionEventsAll

export const initializeNewGame = async (collectionName: string) => {
  console.log('Initializing new game' + collectionName)

  const {
    openseaCollection,
    openseaCollectionStats,
    daily_uaw,
    monthly_uaw,
    ...socialSentiments
  } = await fetchCollectionData(collectionName)

  const client = drizzle(pool)

  try {
    await client
      .insert(collections)
      .values(createCollectionRecord(openseaCollection))
    await client
      .insert(collectionDynamic)
      .values(
        createCollectionDynamicRecord(
          collectionName,
          openseaCollectionStats,
          daily_uaw,
          monthly_uaw,
          socialSentiments
        )
      )

    await Promise.all([
      ...openseaCollection.contracts.map(openseaContract =>
        client
          .insert(contracts)
          .values(
            createContractRecord(
              collectionName,
              openseaContract,
              openseaCollection.payment_tokens[0]
            )
          )
      ),
      ...openseaCollection.fees.map(openseaFee =>
        client.insert(fees).values(createFeeRecord(collectionName, openseaFee))
      ),
      ...openseaCollection.payment_tokens.map(async openseaPaymentToken => {
        await client
          .insert(paymentTokens)
          .values(createPaymentTokenRecord(collectionName, openseaPaymentToken))
        await client
          .insert(tokenPrices)
          .values(createTokenPriceRecord(openseaPaymentToken))
      }),
    ])
  } catch (error) {
    console.error('Error inserting data into the database')
    console.error(error)
  }
}
