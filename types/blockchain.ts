import {
  pgTable,
  serial,
  varchar,
  numeric,
  boolean,
  integer,
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
