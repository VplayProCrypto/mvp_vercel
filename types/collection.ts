import {
  pgTable,
  serial,
  text,
  varchar,
  boolean,
  integer,
  jsonb,
  timestamp,
  PgTable,
} from "drizzle-orm/pg-core";

import {
  Contract,
  Fee,
  PaymentToken,
  contracts,
  fees,
  paymentTokens,
} from "./blockchain";

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

export const collections = pgTable("collections", {
  collection: varchar("collection", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  image_url: varchar("image_url", { length: 255 }),
  banner_image_url: varchar("banner_image_url", { length: 255 }),
  owner: varchar("owner", { length: 255 }).notNull(),
  safelist_status: varchar("safelist_status", { length: 255 }),
  category: varchar("category", { length: 255 }),
  is_disabled: boolean("is_disabled").default(false),
  is_nsfw: boolean("is_nsfw").default(false),
  trait_offers_enabled: boolean("trait_offers_enabled").default(false),
  collection_offers_enabled: boolean("collection_offers_enabled").default(
    false
  ),
  opensea_url: varchar("opensea_url", { length: 255 }),
  project_url: varchar("project_url", { length: 255 }),
  wiki_url: varchar("wiki_url", { length: 255 }),
  discord_url: varchar("discord_url", { length: 255 }),
  telegram_url: varchar("telegram_url", { length: 255 }),
  twitter_username: varchar("twitter_username", { length: 255 }),
  instagram_username: varchar("instagram_username", { length: 255 }),
  total_supply: integer("total_supply"),
  created_date: timestamp("created_date").defaultNow(),
});

export type CollectionsTable = typeof collections;

export const collectionContracts = pgTable("collection_contracts", {
  id: serial("id").primaryKey(),
  collection: varchar("collection", { length: 255 }).references(
    () => collections.collection
  ),
  contract_id: integer("contract_id").references(() => contracts.id),
});

export const collectionFees = pgTable("collection_fees", {
  id: serial("id").primaryKey(),
  collection: varchar("collection", { length: 255 }).references(
    () => collections.collection
  ),
  fee_id: integer("fee_id").references(() => fees.id),
});

export const collectionPaymentTokens = pgTable("collection_payment_tokens", {
  id: serial("id").primaryKey(),
  collection: varchar("collection", { length: 255 }).references(
    () => collections.collection
  ),
  payment_token_id: integer("payment_token_id").references(
    () => paymentTokens.id
  ),
});
