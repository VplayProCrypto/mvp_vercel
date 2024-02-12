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
