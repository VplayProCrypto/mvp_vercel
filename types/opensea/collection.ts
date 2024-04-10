import { OpenseaContract, OpenseaFee, OpenseaPaymentToken } from "./blockchain";

export interface OpenseaRarity {
  strategy_version: string;
  calculated_at: string;
  max_rank: number;
  total_supply: number;
}

export type OpenseaCollection = {
  collection: string;
  name: string;
  description: string;
  image_url: string;
  banner_image_url: string;
  owner: string;
  safelist_status: object;
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
  contracts: OpenseaContract[];
  editors: string[];
  fees: OpenseaFee[];
  rarity: OpenseaRarity;
  payment_tokens: OpenseaPaymentToken[];
  total_supply: number;
  created_date: Date;
};

export type OpenseaCollections = {
  collections: OpenseaCollection[];
  next: string;
};
