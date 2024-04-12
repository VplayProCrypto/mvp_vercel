import {
  OpenseaContract,
  OpenseaPrice,
  OpenseaTokenStandard,
  OpenseaChain,
} from './blockchain'
import { OpenseaCollection } from './collection'

export interface OpenseaNfts {
  nfts: OpenseaNft[]
  next: string
}

export interface OpenseaNft {
  identifier: string
  collection: string
  contract: OpenseaContract
  token_standard: OpenseaTokenStandard
  name: null | string
  description: null | string
  image_url: null | string
  metadata_url: null | string
  opensea_url: string
  updated_at: Date
  is_disabled: boolean
  is_nsfw: boolean
}

export interface OpenseaTrait {
  trait_type: string
  display_type: null | string
  max_value: null | string
  value: string
}

export interface OpenseaNftExtended extends OpenseaNft, OpenseaListing {
  current_price: OpenseaCurrentListingPrice | null
  owner: string | null
  animation_url: null | string
  is_suspicious: boolean
  creator: string
  traits: OpenseaTrait[]
}

export interface OpenseaNftResponse {
  nft: OpenseaNftExtended
}

export interface OpenseaNftListings {
  nfts: OpenseaNftExtended[]
  next: string
}

export interface OpenseaCurrentListingPrice {
  currency: string
  decimals: number
  value: string
}

export interface OpenseaListingPrice {
  current: OpenseaCurrentListingPrice
}

export interface OpenseaProtocolParameters {
  offerer: string
  offer: OpenseaOffer[]
  consideration: OpenseaConsiderationItem[]
  startTime: string
  endTime: string
  orderType: 0
  zone: string
  zoneHash: string
  salt: string
  conduitKey: string
  totalOriginalConsiderationItems: 0
  counter: 0
}

export interface OpenseaProtocolData {
  parameters: OpenseaProtocolParameters
  signature: string
}

export interface OpenseaListing {
  order_hash: string
  type: string
  price: OpenseaListingPrice
  protocol_data: OpenseaProtocolData
  protocol_address: string
}

export interface OpenseaListings {
  listings: OpenseaListing[]
  next: string
}

export interface OpenseaOffers {
  offers: OpenseaOffer[]
  next: string
}

export interface OpenseaOffer {
  order_hash: string
  chain: OpenseaChain
  price: OpenseaPrice
  criteria: OpenseaCriteria
  protocol_data: OpenseaProtocolData
  protocol_address: string
}

export interface OpenseaCriteria {
  collection: OpenseaCollection
  contract: OpenseaContract
  trait: OpenseaTrait
  encoded_token_ids: string
}

export interface OpenseaTrait {
  type: string
  value: string
}

export interface OpenseaOffer {
  itemType: number
  token: string // contract_address
  identifierOrCriteria: string // token_id
  startAmount: string
  endAmount: string
}

export interface OpenseaConsiderationItem {
  itemType: number
  token: string
  identifierOrCriteria: string
  startAmount: string
  endAmount: string
  recipient: string
}

export interface OpenseaParameters {
  offerer: string
  offer: OpenseaConsideration[]
  consideration: OpenseaConsideration[]
  startTime: string
  endTime: string
  orderType: number
  zone: string
  zoneHash: string
  salt: string
  conduitKey: string
  totalOriginalConsiderationItems: number
  counter: number
}

export interface OpenseaConsideration {
  itemType: number
  token: string
  identifierOrCriteria: string
  startAmount: string
  endAmount: string
  recipient?: string
}

export interface OpenseaAsset {
  identifier: string
  collection: string
  contract: string
  token_standard: string
  name: string
  description: string
  image_url: string
  metadata_url: string
  opensea_url: string
  updated_at: string
  is_disabled: boolean
  is_nsfw: boolean
}

export interface OpenseaTrait {
  type: string
  value: string
}

export interface OpenseaAttribute {
  trait_type: string
  value: number | string
  display_type?: string
}
