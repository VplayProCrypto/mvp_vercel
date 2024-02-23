import {
  ColumnType,
  Generated,
  Insertable,
  JSONColumnType,
  Selectable,
  Updateable
} from 'kysely';

export type Collection = {
  collection: string;
  name: string;
  description: string;
  image_url: string;
  banner_image_url: string;
  owner: string;
  safelist_status: SafelistStatus;
  category: string;
  is_disabled: boolean;
  is_nsfw: boolean;
  trait_offers_enabled: boolean;
  collection_offers_enabled: boolean;
  opensea_url: string;
  project_url: string;
  wiki_url: string;
  discord_url: string;
  telegram_url: string;
  twitter_username: string;
  instagram_username: string;
  contracts: Contract[];
  editors: string[];
  fees: Fee[];
  rarity: Rarity;
  payment_tokens: PaymentToken[];
  total_supply: number;
  created_date: Date;
};

export type Collections = {
  collections: Collection[];
  next: string;
};

export interface Contract {
  address: string;
}

export interface Fee {
  fee: number;
  recipient: string;
  required: boolean;
}

export interface PaymentToken {
  symbol: string;
  address: string;
  chain: string;
  image: string;
  name: string;
  decimals: number;
  eth_price: string;
  usd_price: string;
}

export interface Rarity {
  strategy_version: string;
  calculated_at: string;
  max_rank: number;
  total_supply: number;
}

export interface SafelistStatus {}

export enum TokenStandard {
  Erc721 = 'erc721'
}

export interface Nfts {
  nfts: Nft[];
  next: string;
}

export interface Nft {
  identifier: string;
  collection: string;
  contract: Contract;
  token_standard: TokenStandard;
  name: null | string;
  description: null | string;
  image_url: null | string;
  metadata_url: null | string;
  opensea_url: string;
  updated_at: Date;
  is_disabled: boolean;
  is_nsfw: boolean;
}

export interface Trait {
  trait_type: string;
  display_type: null | string;
  max_value: null | string;
  value: string;
}

export interface NftExtended extends Nft {
  current_price: CurrentListingPrice | null;
  owner: string | null;
  animation_url: null | string;
  is_suspicious: boolean;
  creator: string;
  traits: Trait[];
}

export interface NftResponse {
  nft: NftExtended;
}

export interface CurrentListingPrice {
  currency: string;
  decimals: number;
  value: string;
}

export interface ListingPrice {
  current: CurrentListingPrice;
}

export interface Offer {
  itemType: number;
  token: string; // contract_address
  identifierOrCriteria: string; // token_id
  startAmount: string;
  endAmount: string;
}

export interface ConsiderationItem {
  itemType: number;
  token: string;
  identifierOrCriteria: string;
  startAmount: string;
  endAmount: string;
  recipient: string;
}

export interface ProtocolParameters {
  offerer: string;
  offer: Offer[];
  consideration: ConsiderationItem[];
  startTime: string;
  endTime: string;
  orderType: 0;
  zone: string;
  zoneHash: string;
  salt: string;
  conduitKey: string;
  totalOriginalConsiderationItems: 0;
  counter: 0;
}

export interface ProtocolData {
  parameters: ProtocolParameters;
  signature: string;
}

export interface Listing {
  order_hash: string;
  type: string;
  price: ListingPrice;
  protocol_data: ProtocolData;
  protocol_address: string;
}

export interface Listings {
  listings: Listing[];
  next: string;
}

export interface Database {
  users: UserTable;
}

export interface UserTable {
  id: Generated<number>;
  email: string;
  name: string | null;
  username: string | null;
}

export type Users = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;

export interface Offers {
  offers: Offer[];
  next: string;
}

export interface Offer {
  order_hash: string;
  chain: Chain;
  price: Price;
  criteria: Criteria;
  protocol_data: ProtocolData;
  protocol_address: string;
}

export interface Chain {}

export interface Criteria {
  collection: Collection;
  contract: Contract;
  trait: Trait;
  encoded_token_ids: string;
}

export interface Contract {
  address: string;
}

export interface Trait {
  type: string;
  value: string;
}

export interface Price {
  currency: string;
  decimals: number;
  value: string;
}

export interface Parameters {
  offerer: string;
  offer: Consideration[];
  consideration: Consideration[];
  startTime: string;
  endTime: string;
  orderType: number;
  zone: string;
  zoneHash: string;
  salt: string;
  conduitKey: string;
  totalOriginalConsiderationItems: number;
  counter: number;
}

export interface Consideration {
  itemType: number;
  token: string;
  identifierOrCriteria: string;
  startAmount: string;
  endAmount: string;
  recipient?: string;
}

export interface CollectionStats {
  total: Total;
  intervals: Interval[];
}

export interface Interval {
  interval: string;
  volume: number;
  volume_diff: number;
  volume_change: number;
  sales: number;
  sales_diff: number;
  average_price: number;
}

export interface Total {
  volume: number;
  sales: number;
  average_price: number;
  num_owners: number;
  market_cap: number;
  floor_price: number;
  floor_price_symbol: string;
}

export interface Events {
  asset_events: AssetEvent[];
  next: string;
}

export interface AssetEvent {
  event_type: string;
  order_hash?: string;
  maker?: string;
  event_timestamp: number;
  nft?: Asset;
  order_type?: OrderType;
  protocol_address?: string;
  start_date?: number;
  expiration_date?: number;
  asset?: Asset;
  quantity?: number;
  taker?: string;
  payment?: Payment;
  criteria?: Criteria;
  is_private_listing?: boolean;
  closing_date?: number;
  seller?: string;
  buyer?: string;
  transaction?: string;
  from_address?: string;
  to_address?: string;
}

export interface Asset {
  identifier: string;
  collection: string;
  contract: string;
  token_standard: string;
  name: string;
  description: string;
  image_url: string;
  metadata_url: string;
  opensea_url: string;
  updated_at: string;
  is_disabled: boolean;
  is_nsfw: boolean;
}

export interface Trait {
  type: string;
  value: string;
}

export interface OrderType {}

export interface Payment {
  quantity: string;
  token_address: string;
  decimals: number;
  symbol: string;
}

export interface Cryptokitty {
  id: number;
  tokenId: number;
  created_at: Date;
  name: string;
  background_color: string;
  image: string;
  external_url: string;
  genes: string;
  fetched_at: number;
  nickname: string;
  description: string;
  attributes: Attribute[];
  mutable_attributes: Attribute[];
}

export interface Attribute {
  trait_type: string;
  value: number | string;
  display_type?: string;
}

export interface GameDescription {
  playNowButtonText: string;
  itemsText: string;
  communityScore: string;
  playerCount: string;
  rewardsText: string;
  stars: string;
  rr: string;
  genre: string;
  friendly: string;
}

// Define an interface for the container of all game entries
// Adjusted to allow more flexible game names
export interface GameDescriptions {
  [key: string]: GameDescription;
}

export type ApiResponse = {
  message?: string;
  [key: string]: any;
};
