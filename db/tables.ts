import { Collection } from "@/types/apiTypes";
import {
  pgTable,
  serial,
  text,
  varchar,
  boolean,
  integer,
  jsonb,
  timestamp,
} from "drizzle-orm/pg-core";

export const rarity = pgTable("rarity", {
  strategy_version: varchar("strategy_version", { length: 255 }).notNull(),
  calculated_at: timestamp("calculated_at").notNull(),
  max_rank: integer("max_rank").notNull(),
  total_supply: integer("total_supply").notNull(),
});

export const paymentToken = pgTable("payment_tokens", {
  symbol: varchar("symbol", { length: 255 }).notNull(),
  address: varchar("address", { length: 255 }).notNull(),
  chain: varchar("chain", { length: 255 }).notNull(),
  image: varchar("image", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  decimals: integer("decimals").notNull(),
  eth_price: varchar("eth_price", { length: 255 }).notNull(),
  usd_price: varchar("usd_price", { length: 255 }).notNull(),
});

export const collections = pgTable("collections", {
  collection: varchar("collection", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  image_url: varchar("image_url", { length: 255 }),
  banner_image_url: varchar("banner_image_url", { length: 255 }),
  owner: varchar("owner", { length: 255 }).notNull(),
  safelist_status: jsonb("safelist_status"),
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
  contracts: jsonb("contracts"),
  editors: jsonb("editors"),
  fees: jsonb("fees"),
  rarity: jsonb("rarity"),
  payment_tokens: jsonb("payment_tokens"),
  total_supply: integer("total_supply"),
  created_date: timestamp("created_date").defaultNow(),
});
