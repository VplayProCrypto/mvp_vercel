import { OpenseaPayment } from "./blockchain";
import { OpenseaAsset, OpenseaCriteria } from "./nft";

export interface OpenseaCollectionStats {
  total: OpenseaTotal;
  intervals: OpenseaInterval[];
}

export interface OpenseaInterval {
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

export interface OpenseaTotal {
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

export interface OpenseaEvents {
  asset_events: OpenseaAssetEvent[];
  next: string;
}

export interface OpenseaAssetEvent {
  event_type: string;
  order_hash?: string;
  maker?: string;
  event_timestamp: number;
  nft?: OpenseaAsset;
  order_type?: OpenseaOrderType;
  protocol_address?: string;
  start_date?: number;
  expiration_date?: number;
  asset?: OpenseaAsset;
  quantity?: number;
  taker?: string;
  payment?: OpenseaPayment;
  criteria?: OpenseaCriteria;
  is_private_listing?: boolean;
  closing_date?: number;
  seller?: string;
  buyer?: string;
  transaction?: string;
  from_address?: string;
  to_address?: string;
}

export interface OpenseaOrderType {}
