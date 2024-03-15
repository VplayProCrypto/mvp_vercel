import {
  Chain,
  Contract,
  Price,
  TokenStandard,
  contracts,
  prices,
} from "./blockchain";
import { Collection, collections } from "./collection";
import {
  pgTable,
  serial,
  varchar,
  boolean,
  integer,
  timestamp,
  text,
  jsonb,
} from "drizzle-orm/pg-core";

export interface Nfts {
  nfts: Nft[];
  next: string;
}

export interface Nft {
  identifier: string;
  collection: string;
  contract: Contract;
  token_standard: TokenStandard;
  name: null | string;
  description: null | string;
  image_url: null | string;
  metadata_url: null | string;
  opensea_url: string;
  updated_at: Date;
  is_disabled: boolean;
  is_nsfw: boolean;
}

export interface Trait {
  trait_type: string;
  display_type: null | string;
  max_value: null | string;
  value: string;
}

export interface NftExtended extends Nft {
  current_price: CurrentListingPrice | null;
  owner: string | null;
  animation_url: null | string;
  is_suspicious: boolean;
  creator: string;
  traits: Trait[];
}

export interface NftResponse {
  nft: NftExtended;
}

export interface NftListings {
  nfts: NftExtended[];
  next: string;
}

export interface CurrentListingPrice {
  currency: string;
  decimals: number;
  value: string;
}

export interface ListingPrice {
  current: CurrentListingPrice;
}

export interface ProtocolParameters {
  offerer: string;
  offer: Offer[];
  consideration: ConsiderationItem[];
  startTime: string;
  endTime: string;
  orderType: 0;
  zone: string;
  zoneHash: string;
  salt: string;
  conduitKey: string;
  totalOriginalConsiderationItems: 0;
  counter: 0;
}

export interface ProtocolData {
  parameters: ProtocolParameters;
  signature: string;
}

export interface Listing {
  order_hash: string;
  type: string;
  price: ListingPrice;
  protocol_data: ProtocolData;
  protocol_address: string;
}

export interface Listings {
  listings: Listing[];
  next: string;
}

export interface Offers {
  offers: Offer[];
  next: string;
}

export interface Offer {
  order_hash: string;
  chain: Chain;
  price: Price;
  criteria: Criteria;
  protocol_data: ProtocolData;
  protocol_address: string;
}

export interface Criteria {
  collection: Collection;
  contract: Contract;
  trait: Trait;
  encoded_token_ids: string;
}

export interface Trait {
  type: string;
  value: string;
}

export interface Offer {
  itemType: number;
  token: string; // contract_address
  identifierOrCriteria: string; // token_id
  startAmount: string;
  endAmount: string;
}

export interface ConsiderationItem {
  itemType: number;
  token: string;
  identifierOrCriteria: string;
  startAmount: string;
  endAmount: string;
  recipient: string;
}

export interface Parameters {
  offerer: string;
  offer: Consideration[];
  consideration: Consideration[];
  startTime: string;
  endTime: string;
  orderType: number;
  zone: string;
  zoneHash: string;
  salt: string;
  conduitKey: string;
  totalOriginalConsiderationItems: number;
  counter: number;
}

export interface Consideration {
  itemType: number;
  token: string;
  identifierOrCriteria: string;
  startAmount: string;
  endAmount: string;
  recipient?: string;
}

export interface Asset {
  identifier: string;
  collection: string;
  contract: string;
  token_standard: string;
  name: string;
  description: string;
  image_url: string;
  metadata_url: string;
  opensea_url: string;
  updated_at: string;
  is_disabled: boolean;
  is_nsfw: boolean;
}

export interface Trait {
  type: string;
  value: string;
}

export interface Attribute {
  trait_type: string;
  value: number | string;
  display_type?: string;
}

export interface Cryptokitty {
  id: number;
  tokenId: number;
  created_at: Date;
  name: string;
  background_color: string;
  image: string;
  external_url: string;
  genes: string;
  fetched_at: number;
  nickname: string;
  description: string;
  attributes: Attribute[];
  mutable_attributes: Attribute[];
}

export const nfts = pgTable("nfts", {
  id: serial("id").primaryKey(),
  identifier: varchar("identifier", { length: 255 }).notNull(),
  collection: varchar("collection", { length: 255 }).references(
    () => collections.collection
  ),
  contract_id: integer("contract_id").references(() => contracts.id),
  token_standard: varchar("token_standard", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }),
  description: text("description"),
  image_url: varchar("image_url", { length: 255 }),
  metadata_url: varchar("metadata_url", { length: 255 }),
  opensea_url: varchar("opensea_url", { length: 255 }).notNull(),
  updated_at: timestamp("updated_at").notNull(),
  is_disabled: boolean("is_disabled").notNull(),
  is_nsfw: boolean("is_nsfw").notNull(),
});

export const traits = pgTable("traits", {
  id: serial("id").primaryKey(),
  nft_id: integer("nft_id").references(() => nfts.id),
  trait_type: varchar("trait_type", { length: 255 }).notNull(),
  display_type: varchar("display_type", { length: 255 }),
  max_value: varchar("max_value", { length: 255 }),
  value: varchar("value", { length: 255 }).notNull(),
});

export const listings = pgTable("listings", {
  id: serial("id").primaryKey(),
  nft_id: integer("nft_id").references(() => nfts.id),
  order_hash: varchar("order_hash", { length: 255 }).notNull(),
  type: varchar("type", { length: 255 }).notNull(),
  price_id: integer("price_id").references(() => prices.id),
  protocol_data: jsonb("protocol_data").notNull(),
  protocol_address: varchar("protocol_address", { length: 255 }).notNull(),
});

export const offers = pgTable("offers", {
  id: serial("id").primaryKey(),
  nft_id: integer("nft_id").references(() => nfts.id),
  order_hash: varchar("order_hash", { length: 255 }).notNull(),
  chain: varchar("chain", { length: 255 }).notNull(),
  price_id: integer("price_id").references(() => prices.id),
  criteria: jsonb("criteria").notNull(),
  protocol_data: jsonb("protocol_data").notNull(),
  protocol_address: varchar("protocol_address", { length: 255 }).notNull(),
});

export const attributes = pgTable("attributes", {
  id: serial("id").primaryKey(),
  nft_id: integer("nft_id").references(() => nfts.id),
  trait_type: varchar("trait_type", { length: 255 }).notNull(),
  value: varchar("value", { length: 255 }).notNull(),
  display_type: varchar("display_type", { length: 255 }),
});
