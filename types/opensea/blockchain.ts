import {
  pgTable,
  serial,
  varchar,
  numeric,
  boolean,
  integer,
  doublePrecision,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core";

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

export enum TokenStandard {
  Erc721 = "erc721",
}

export interface Chain {}

export interface Price {
  currency: string;
  decimals: number;
  value: string;
}

export interface Payment {
  quantity: string;
  token_address: string;
  decimals: number;
  symbol: string;
}
