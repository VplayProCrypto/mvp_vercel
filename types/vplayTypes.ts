import { ReactNode } from "react";

export interface JobPostingFields {
  Introduction?: string;
  "Required experience"?: string;
  "Position status"?: string;
  Category?: string;
  Overview?: string;
  "Job Description"?: string;
  "Applying for position"?: string[];
  Department?: string;
  Name?: string;
  "Apply Now"?: {
    label: string;
    url: string;
  };
  record_id?: string;
}

export interface JobPosting {
  id: string;
  createdTime: string;
  fields: JobPostingFields;
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
  videoUrl: string;
  image: string;
}

export interface GameDescriptions {
  [key: string]: GameDescription;
}

interface VideoUrlsType {
  [key: string]: string;
}
//https://www.youtube.com/watch?v=M6gD3afBmkc
const VideoUrls: VideoUrlsType = {
  CryptoKitties: "3PTstAK-cH8",
  "Mavia Land": "bYmpEeRG-_o",
  Decentraland: "M6gD3afBmkc",
};

interface ImageUrlsType {
  [key: string]: string;
}
export const Images: ImageUrlsType = {
  CryptoKitties:
    "https://www.cryptokitties.co/images/blog/kitty-cup-2022/kitty-cup-2022.jpg",
  Decentraland:
    "https://places.decentraland.org/places/images/places/genesis_plaza_banner.jpg",
};

export type Tab = {
  name: string;
  value: ReactNode;
};

export interface Collection {
  opensea_slug: string;
  game_name?: string;
  game_id?: string;
  name: string;
  description: string;
  owner: string;
  category: string;
  is_nsfw: boolean;
  opensea_url?: string;
  project_url?: string;
  wiki_url?: string;
  discord_url?: string;
  telegram_url?: string;
  twitter_url?: string;
  instagram_url?: string;
  created_date: Date;
  updated_at: Date;
}

export interface CollectionDynamic {
  collection_slug: string;
  game_id?: string;
  total_average_price?: number;
  total_supply?: number;
  total_volume?: number;
  total_num_owners?: number;
  total_sales?: number;
  total_market_cap?: number;
  sales?: number;
  volume?: number;
  floor_price?: number;
  floor_price_currency?: string;
  average_price?: number;
  daily_uaw?: bigint;
  monthly_uaw?: bigint;
  total_wallets?: bigint;
  twitter_sentiment?: number;
  facebook_sentiment?: number;
  instagram_sentiment?: number;
  reddit_sentiment?: number;
  discord_sentiment?: number;
  telegram_sentiment?: number;
  event_timestamp: Date;
}

export interface Contract {
  collection_slug: string;
  contract_address?: string;
  chain: string;
}

export interface Erc20Transfer {
  buyer: string;
  seller: string;
  contract_address: string;
  price: number;
  symbol: string;
  decimals: number;
  transaction_hash: string;
  event_timestamp: Date;
  collection_slug?: string;
}

export interface Fee {
  collection_slug: string;
  fee: number;
  recipient: string;
}

export interface NFT {
  collection_slug: string;
  game_id?: string;
  token_id?: string;
  contract_address?: string;
  token_standard: string;
  name?: string;
  description?: string;
  image_url?: string;
  metadata_url?: string;
  opensea_url?: string;
  updated_at?: Date;
  is_nsfw: boolean;
  is_disabled: boolean;
  traits?: any;
}

export interface PaymentToken {
  collection_slug: string;
  contract_address?: string;
  symbol?: string;
  decimals: number;
  chain: string;
}

export interface NFTEvent {
  transaction_hash?: string;
  marketplace?: string;
  marketplace_address?: string;
  order_hash?: string;
  event_type?: string;
  token_id: string;
  contract_address: string;
  collection_slug: string;
  game_id: string;
  seller: string;
  buyer?: string;
  quantity: number;
  price_val?: string;
  price_currency?: string;
  price_decimals?: string;
  start_date?: Date;
  expiration_date?: Date;
  event_timestamp: Date;
}

export interface TokenPrice {
  contract_address?: string;
  eth_price: number;
  usdt_price: number;
  usdt_conversion_price?: number;
  eth_conversion_price?: number;
  event_timestamp: Date;
}

export interface NFTOwnership {
  buyer?: string;
  seller: string;
  token_id: string;
  contract_address: string;
  transaction_hash: string;
  buy_time: Date;
  quantity: number;
  sell_time?: Date;
  collection_slug: string;
  game_id: string;
}

export interface NFTDynamic {
  collection_slug: string;
  token_id: string;
  contract_address: string;
  rr?: number;
  event_timestamp: Date;
}

export interface NFTOffer {
  order_hash: string;
  event_type?: string;
  token_id: string;
  contract_address: string;
  collection_slug: string;
  game_id: string;
  seller: string;
  quantity: number;
  price_val?: string;
  price_currency?: string;
  price_decimals?: string;
  start_date?: Date;
  expiration_date?: Date;
  event_timestamp: Date;
}

export interface NFTListing {
  order_hash: string;
  token_id: string;
  contract_address: string;
  collection_slug: string;
  game_id: string;
  seller: string;
  price_val?: string;
  price_currency?: string;
  price_decimals?: string;
  start_date?: Date;
  expiration_date?: Date;
  event_timestamp: Date;
}
