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

export const contracts = pgTable("contracts", {
  id: serial("id").primaryKey(),
  address: varchar("address", { length: 255 }).notNull(),
});

export const fees = pgTable("fees", {
  id: serial("id").primaryKey(),
  fee: numeric("fee", { precision: 10, scale: 2 }).notNull(),
  recipient: varchar("recipient", { length: 255 }).notNull(),
  required: boolean("required").notNull(),
});

export const paymentTokens = pgTable("payment_tokens", {
  id: serial("id").primaryKey(),
  symbol: varchar("symbol", { length: 255 }).notNull(),
  address: varchar("address", { length: 255 }).notNull(),
  chain: varchar("chain", { length: 255 }).notNull(),
  image: varchar("image", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  decimals: integer("decimals").notNull(),
  eth_price: varchar("eth_price", { length: 255 }).notNull(),
  usd_price: varchar("usd_price", { length: 255 }).notNull(),
});

export const prices = pgTable("prices", {
  id: serial("id").primaryKey(),
  currency: varchar("currency", { length: 255 }).notNull(),
  decimals: integer("decimals").notNull(),
  value: varchar("value", { length: 255 }).notNull(),
});

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  quantity: varchar("quantity", { length: 255 }).notNull(),
  token_address: varchar("token_address", { length: 255 }).notNull(),
  decimals: integer("decimals").notNull(),
  symbol: varchar("symbol", { length: 255 }).notNull(),
});

export const erc20Transfers = pgTable(
  "erc20_transfers",
  {
    buyer: varchar("buyer").notNull(),
    seller: varchar("seller").notNull(),
    contractAddress: varchar("contract_address").notNull(),
    price: doublePrecision("price").notNull(),
    symbol: varchar("symbol").notNull(),
    decimals: integer("decimals").notNull(),
    transactionHash: varchar("transaction_hash").notNull(),
    eventTimestamp: timestamp("event_timestamp").notNull(),
    collectionSlug: varchar("collection_slug"),
  },
  (erc20Transfers) => ({
    pk: primaryKey(
      erc20Transfers.transactionHash,
      erc20Transfers.eventTimestamp
    ),
  })
);

export const tokenPrices = pgTable(
  "token_prices",
  {
    contractAddress: varchar("contract_address").notNull(),
    ethPrice: doublePrecision("eth_price").notNull(),
    usdtPrice: doublePrecision("usdt_price").notNull(),
    usdtConversionPrice: doublePrecision("usdt_conversion_price"),
    ethConversionPrice: doublePrecision("eth_conversion_price"),
    eventTimestamp: timestamp("event_timestamp").notNull(),
  },
  (tokenPrices) => ({
    pk: primaryKey(tokenPrices.contractAddress, tokenPrices.eventTimestamp),
  })
);
