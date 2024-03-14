import { Contract, Fee, PaymentToken } from "./blockchain";

export interface SafelistStatus {}

export interface Rarity {
  strategy_version: string;
  calculated_at: string;
  max_rank: number;
  total_supply: number;
}

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
