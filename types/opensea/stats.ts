import { Payment } from "./blockchain";
import { Asset, Criteria } from "./nft";
import {
  pgTable,
  serial,
  varchar,
  integer,
  numeric,
  jsonb,
  boolean,
  primaryKey,
  timestamp,
} from "drizzle-orm/pg-core";
export interface CollectionStats {
  total: Total;
  intervals: Interval[];
}

export interface Interval {
  interval: string;
  collection: string;
  volume: string;
  volume_diff: string;
  volume_change: string;
  sales: number;
  sales_diff: number;
  average_price: string;
  timestamp: Date;
}

export interface Total {
  volume: string;
  collection: string;
  sales: number;
  average_price: string;
  num_owners: number;
  market_cap: string;
  floor_price: string;
  floor_price_symbol: string;
  timestamp: Date;
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
