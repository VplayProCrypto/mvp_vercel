import { Payment } from "./blockchain";
import { Asset, Criteria } from "./nft";

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
