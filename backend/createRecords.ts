import { getOpenseaBestOfferForNft } from './apis/opensea'
import { env } from 'process'
import type { OpenseaCollection } from '../types/opensea/collection'
import type {
  OpenseaContract,
  OpenseaPaymentToken,
  OpenseaFee,
} from '../types/opensea/blockchain'
import type {
  OpenseaNftListings,
  OpenseaNftExtended,
} from '../types/opensea/nft'
import type {
  OpenseaCollectionStats,
  OpenseaAssetEvent,
} from '../types/opensea/stats'
import type {
  Collection,
  CollectionDynamic,
  Contract,
  Fee,
  PaymentToken,
  TokenPrice,
  NFT,
  NFTDynamic,
  NFTListing,
  NFTOffer,
  NFTEvent,
} from '../types/vplayTypes'

export const createCollectionRecord = (
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

export const createCollectionDynamicRecord = (
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
  rr_val: 0,
  rr_symbol: '',
})

export const createContractRecord = (
  collectionName: string,
  openseaContract: OpenseaContract,
  openseaPaymentToken: OpenseaPaymentToken
): Contract => ({
  collection_slug: collectionName,
  contract_address: openseaContract.address,
  chain: openseaPaymentToken.chain,
})

export const createFeeRecord = (
  collectionName: string,
  openseaFee: OpenseaFee
): Fee => ({
  collection_slug: collectionName,
  fee: openseaFee.fee,
  recipient: openseaFee.recipient,
})

export const createPaymentTokenRecord = (
  collectionName: string,
  openseaPaymentToken: OpenseaPaymentToken
): PaymentToken => ({
  collection_slug: collectionName,
  symbol: openseaPaymentToken.symbol,
  contract_address: openseaPaymentToken.address,
  decimals: openseaPaymentToken.decimals,
  chain: openseaPaymentToken.chain,
})

export const createTokenPriceRecord = (
  openseaPaymentToken: OpenseaPaymentToken
): TokenPrice => ({
  contract_address: openseaPaymentToken.address,
  eth_price: Number(openseaPaymentToken.eth_price),
  usdt_price: Number(openseaPaymentToken.usd_price),
  event_timestamp: new Date(),
})

export const createNFTRecords = (
  collectionName: string,
  project_url: string,
  openseaNftListings: OpenseaNftListings
): NFT[] => {
  const openseaNftsExtended: OpenseaNftExtended[] = openseaNftListings.nfts
  return openseaNftsExtended.map(openseaNftExtended => {
    return {
      collection_slug: collectionName,
      game_id: project_url,
      token_id: openseaNftExtended.identifier,
      contract_address: openseaNftExtended.contract.address,
      token_standard: openseaNftExtended.token_standard,
      name: openseaNftExtended.name ? openseaNftExtended.name : '',
      description:
        openseaNftExtended.description ? openseaNftExtended.description : '',
      image_url:
        openseaNftExtended.image_url ? openseaNftExtended.image_url : '',
      metadata_url:
        openseaNftExtended.metadata_url ? openseaNftExtended.metadata_url : '',
      opensea_url:
        openseaNftExtended.opensea_url ? openseaNftExtended.opensea_url : '',
      updated_at: openseaNftExtended.updated_at,
      is_nsfw: openseaNftExtended.is_nsfw,
      is_disabled: openseaNftExtended.is_disabled,
      traits: openseaNftExtended.traits,
      event_timestamp: new Date(),
    }
  })
}

export const createNFTDynamicRecords = (
  project_url: string,
  openseaNftListings: OpenseaNftListings
): NFTDynamic[] => {
  const openseaNftsExtended: OpenseaNftExtended[] = openseaNftListings.nfts
  return openseaNftsExtended.map(openseaNftExtended => {
    return {
      order_hash: openseaNftExtended.order_hash,
      token_id: openseaNftExtended.identifier,
      contract_address: openseaNftExtended.contract.address,
      collection_slug: openseaNftExtended.collection,
      game_id: project_url,
      event_timestamp: new Date(),
    }
  })
}

export const createNFTListingRecords = (
  project_url: string,
  openseaNftListings: OpenseaNftListings
): NFTListing[] => {
  const openseaNftsExtended: OpenseaNftExtended[] = openseaNftListings.nfts
  return openseaNftsExtended.map(openseaNftExtended => {
    return {
      order_hash: openseaNftExtended.order_hash,
      token_id: openseaNftExtended.identifier,
      contract_address: openseaNftExtended.contract.address,
      collection_slug: openseaNftExtended.collection,
      game_id: project_url,
      seller: openseaNftExtended.owner || '',
      price_val: openseaNftExtended.current_price?.value || '0',
      price_currency: openseaNftExtended.current_price?.currency || '',
      price_decimals:
        openseaNftExtended.current_price?.decimals ?
          String(openseaNftExtended.current_price?.decimals)
        : '0',
      start_date:
        openseaNftExtended.protocol_data.parameters.startTime ?
          new Date(openseaNftExtended.protocol_data.parameters.startTime)
        : new Date(),
      expiration_date:
        openseaNftExtended.protocol_data.parameters.endTime ?
          new Date(openseaNftExtended.protocol_data.parameters.endTime)
        : new Date(),
      event_timestamp: new Date(),
    }
  })
}

export const createNFTOfferRecords = async (
  collectionName: string,
  project_url: string,
  openseaNftListings: OpenseaNftListings
): Promise<NFTOffer[]> => {
  const openseaNftsExtended: OpenseaNftExtended[] = openseaNftListings.nfts
  const offerPromises = openseaNftsExtended.map(async openseaNftExtended => {
    const offer = await getOpenseaBestOfferForNft(
      openseaNftExtended.identifier,
      collectionName
    )
    return {
      order_hash: offer.order_hash,
      event_type: 'offer',
      token_id: offer.identifierOrCriteria,
      contract_address: openseaNftExtended.contract.address,
      game_id: project_url,
      collection_slug: openseaNftExtended.collection,
      price_val: offer.price.value,
      price_currency: offer.price.currency,
      price_decimals: String(offer.price.decimals),
      event_timestamp: new Date(),
      offerer: offer.protocol_data.parameters.offerer,
      start_date: new Date(offer.protocol_data.parameters.startTime),
      expiration_date: new Date(offer.protocol_data.parameters.endTime),
      quantity: Number(offer.endAmount),
    }
  })

  const nftOffers = await Promise.all(offerPromises)
  return nftOffers
}

export const createNFTEventsRecords = (
  project_url: string,
  collectionName: string,
  openseaAssetEvents: OpenseaAssetEvent[]
): NFTEvent[] => {
  const validEvents = openseaAssetEvents.filter(
    event => event.nft !== undefined
  )

  return validEvents.map(openseaAssetEvent => {
    return {
      transaction_hash: openseaAssetEvent.transaction || '',
      marketplace: env.OPENSEA_MARKETPLACE || '',
      marketplace_address: env.OPENSEA_MARKETPLACE_ADDRESS || '',
      order_hash: openseaAssetEvent.order_hash || '',
      event_type: openseaAssetEvent.event_type,
      token_id: openseaAssetEvent.nft!.identifier,
      contract_address: openseaAssetEvent.nft!.contract || '',
      collection_slug: collectionName,
      game_id: project_url,
      seller: openseaAssetEvent.seller || '',
      buyer: openseaAssetEvent.buyer || '',
      quantity: openseaAssetEvent.quantity || 0,
      price_val: String(openseaAssetEvent.payment?.quantity) || '0',
      price_currency: openseaAssetEvent.payment?.symbol || '',
      price_decimals: String(openseaAssetEvent.payment?.decimals || 0),
      start_date: new Date(openseaAssetEvent.start_date || ''),
      expiration_date: new Date(openseaAssetEvent.expiration_date || ''),
      event_timestamp:
        openseaAssetEvent.event_timestamp ?
          new Date(openseaAssetEvent.event_timestamp)
        : new Date(),
    }
  })
}
