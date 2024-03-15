import { Payment, payments } from "./blockchain";
import { Asset, Criteria, nfts } from "./nft";
import {
  pgTable,
  serial,
  varchar,
  integer,
  numeric,
  jsonb,
  boolean,
} from "drizzle-orm/pg-core";
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

export interface OrderType {}

export type ApiResponse = {
  message?: string;
  [key: string]: any;
};

export const intervals = pgTable("intervals", {
  id: serial("id").primaryKey(),
  interval: varchar("interval", { length: 255 }).notNull(),
  volume: numeric("volume", { precision: 10, scale: 2 }).notNull(),
  volume_diff: numeric("volume_diff", { precision: 10, scale: 2 }).notNull(),
  volume_change: numeric("volume_change", {
    precision: 10,
    scale: 2,
  }).notNull(),
  sales: integer("sales").notNull(),
  sales_diff: integer("sales_diff").notNull(),
  average_price: numeric("average_price", {
    precision: 10,
    scale: 2,
  }).notNull(),
});

export const totals = pgTable("totals", {
  id: serial("id").primaryKey(),
  volume: numeric("volume", { precision: 10, scale: 2 }).notNull(),
  sales: integer("sales").notNull(),
  average_price: numeric("average_price", {
    precision: 10,
    scale: 2,
  }).notNull(),
  num_owners: integer("num_owners").notNull(),
  market_cap: numeric("market_cap", { precision: 10, scale: 2 }).notNull(),
  floor_price: numeric("floor_price", { precision: 10, scale: 2 }).notNull(),
  floor_price_symbol: varchar("floor_price_symbol", { length: 255 }).notNull(),
});

export const assetEvents = pgTable("asset_events", {
  id: serial("id").primaryKey(),
  event_type: varchar("event_type", { length: 255 }).notNull(),
  order_hash: varchar("order_hash", { length: 255 }),
  maker: varchar("maker", { length: 255 }),
  event_timestamp: integer("event_timestamp").notNull(),
  nft_id: integer("nft_id").references(() => nfts.id),
  order_type: jsonb("order_type"),
  protocol_address: varchar("protocol_address", { length: 255 }),
  start_date: integer("start_date"),
  expiration_date: integer("expiration_date"),
  asset_id: integer("asset_id").references(() => nfts.id),
  quantity: integer("quantity"),
  taker: varchar("taker", { length: 255 }),
  payment_id: integer("payment_id").references(() => payments.id),
  criteria: jsonb("criteria"),
  is_private_listing: boolean("is_private_listing"),
  closing_date: integer("closing_date"),
  seller: varchar("seller", { length: 255 }),
  buyer: varchar("buyer", { length: 255 }),
  transaction: varchar("transaction", { length: 255 }),
  from_address: varchar("from_address", { length: 255 }),
  to_address: varchar("to_address", { length: 255 }),
});
