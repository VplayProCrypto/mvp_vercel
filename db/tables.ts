import {
  pgTable,
  varchar,
  text,
  boolean,
  integer,
  timestamp,
  jsonb,
  doublePrecision,
  bigint,
  primaryKey,
  numeric,
} from 'drizzle-orm/pg-core'

export const collections = pgTable('collection', {
  opensea_slug: varchar('opensea_slug').primaryKey(),
  game_name: varchar('game_name'),
  game_id: varchar('game_id'),
  name: varchar('name', { length: 50 }).notNull(),
  description: text('description').notNull(),
  owner: varchar('owner').notNull(),
  category: varchar('category').notNull(),
  is_nsfw: boolean('is_nsfw').default(false),
  opensea_url: varchar('opensea_url'),
  project_url: varchar('project_url'),
  wiki_url: varchar('wiki_url'),
  discord_url: varchar('discord_url'),
  telegram_url: varchar('telegram_url'),
  twitter_url: varchar('twitter_url'),
  instagram_url: varchar('instagram_url'),
  created_date: timestamp('created_date').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
})

export const collectionDynamic = pgTable(
  'collection_dynamic',
  {
    collection_slug: varchar('collection_slug').references(
      () => collections.opensea_slug
    ),
    game_id: varchar('game_id'),
    total_average_price: doublePrecision('total_average_price'),
    total_supply: doublePrecision('total_supply'),
    total_volume: doublePrecision('total_volume'),
    total_num_owners: integer('total_num_owners'),
    total_sales: doublePrecision('total_sales'),
    total_market_cap: doublePrecision('total_market_cap'),
    sales: doublePrecision('sales'),
    volume: doublePrecision('volume'),
    floor_price: doublePrecision('floor_price'),
    floor_price_currency: varchar('floor_price_currency'),
    average_price: doublePrecision('average_price'),
    daily_uaw: bigint('daily_uaw', { mode: 'number' }),
    monthly_uaw: bigint('monthly_uaw', { mode: 'number' }),
    total_wallets: bigint('total_wallets', { mode: 'number' }),
    twitter_sentiment: doublePrecision('twitter_sentiment'),
    facebook_sentiment: doublePrecision('facebook_sentiment'),
    instagram_sentiment: doublePrecision('instagram_sentiment'),
    reddit_sentiment: doublePrecision('reddit_sentiment'),
    discord_sentiment: doublePrecision('discord_sentiment'),
    telegram_sentiment: doublePrecision('telegram_sentiment'),
    event_timestamp: timestamp('event_timestamp').notNull(),
  },
  table => ({
    pk: primaryKey(table.collection_slug, table.event_timestamp),
  })
)

export const contracts = pgTable(
  'contract',
  {
    collection_slug: varchar('collection_slug').references(
      () => collections.opensea_slug
    ),
    contract_address: varchar('contract_address'),
    chain: varchar('chain').notNull(),
  },
  table => ({
    pk: primaryKey(table.contract_address, table.chain),
  })
)

export const erc20Transfers = pgTable(
  'erc20_transfers',
  {
    buyer: varchar('buyer').notNull(),
    seller: varchar('seller').notNull(),
    contract_address: varchar('contract_address').notNull(),
    price: doublePrecision('price').notNull(),
    symbol: varchar('symbol').notNull(),
    decimals: integer('decimals').notNull(),
    transaction_hash: varchar('transaction_hash').notNull(),
    event_timestamp: timestamp('event_timestamp').notNull(),
    collection_slug: text('collection_slug'),
  },
  table => ({
    pk: primaryKey(table.transaction_hash, table.event_timestamp),
  })
)

export const fees = pgTable(
  'fee',
  {
    collection_slug: varchar('collection_slug').references(
      () => collections.opensea_slug
    ),
    fee: doublePrecision('fee').notNull(),
    recipient: varchar('recipient').notNull(),
  },
  table => ({
    pk: primaryKey(table.collection_slug, table.recipient),
  })
)

export const paymentTokens = pgTable(
  'payment_tokens',
  {
    collection_slug: varchar('collection_slug').references(
      () => collections.opensea_slug
    ),
    contract_address: varchar('contract_address'),
    symbol: varchar('symbol'),
    decimals: integer('decimals').notNull(),
    chain: varchar('chain').notNull(),
  },
  table => ({
    pk: primaryKey(table.collection_slug, table.contract_address),
  })
)

export const tokenPrices = pgTable(
  'token_price',
  {
    contract_address: varchar('contract_address'),
    eth_price: doublePrecision('eth_price').notNull(),
    usdt_price: doublePrecision('usdt_price').notNull(),
    usdt_conversion_price: doublePrecision('usdt_conversion_price'),
    eth_conversion_price: doublePrecision('eth_conversion_price'),
    event_timestamp: timestamp('event_timestamp').notNull(),
  },
  table => ({
    pk: primaryKey(table.contract_address, table.event_timestamp),
  })
)

export const nfts = pgTable(
  'nft',
  {
    collection_slug: varchar('collection_slug').references(
      () => collections.opensea_slug
    ),
    game_id: varchar('game_id'),
    token_id: varchar('token_id'),
    contract_address: varchar('contract_address'),
    token_standard: varchar('token_standard').notNull(),
    name: varchar('name'),
    description: text('description'),
    image_url: varchar('image_url'),
    metadata_url: varchar('metadata_url'),
    opensea_url: varchar('opensea_url'),
    updated_at: timestamp('updated_at'),
    is_nsfw: boolean('is_nsfw').default(false),
    is_disabled: boolean('is_disabled').default(false),
    traits: jsonb('traits'),
  },
  table => ({
    pk: primaryKey(table.token_id, table.contract_address),
  })
)
export const nftEvents = pgTable(
  'nft_events',
  {
    transaction_hash: varchar('transaction_hash'),
    marketplace: varchar('marketplace'),
    marketplace_address: varchar('marketplace_address'),
    order_hash: varchar('order_hash'),
    event_type: text('event_type'),
    token_id: varchar('token_id').references(() => nfts.token_id),
    contract_address: varchar('contract_address').references(
      () => nfts.contract_address
    ),
    collection_slug: varchar('collection_slug')
      .references(() => collections.opensea_slug)
      .notNull(),
    game_id: varchar('game_id').notNull(),
    seller: varchar('seller').notNull(),
    buyer: varchar('buyer'),
    quantity: integer('quantity').default(1),
    price_val: varchar('price_val'),
    price_currency: varchar('price_currency'),
    price_decimals: varchar('price_decimals'),
    start_date: timestamp('start_date'),
    expiration_date: timestamp('expiration_date'),
    event_timestamp: timestamp('event_timestamp').notNull(),
  },
  table => ({
    pk: primaryKey(
      table.contract_address,
      table.token_id,
      table.event_timestamp
    ),
  })
)

export const nftOwnership = pgTable(
  'nft_ownership',
  {
    buyer: varchar('buyer'),
    seller: varchar('seller').notNull(),
    token_id: varchar('token_id').references(() => nfts.token_id),
    contract_address: varchar('contract_address').references(
      () => nfts.contract_address
    ),
    transaction_hash: varchar('transaction_hash').notNull(),
    buy_time: timestamp('buy_time').notNull(),
    quantity: integer('quantity').default(1),
    sell_time: timestamp('sell_time'),
    collection_slug: varchar('collection_slug')
      .references(() => collections.opensea_slug)
      .notNull(),
    game_id: varchar('game_id').notNull(),
  },
  table => ({
    pk: primaryKey(table.contract_address, table.token_id, table.buy_time),
  })
)

export const nftDynamic = pgTable(
  'nft_dynamic',
  {
    collection_slug: varchar('collection_slug')
      .references(() => collections.opensea_slug)
      .notNull(),
    token_id: varchar('token_id').references(() => nfts.token_id),
    contract_address: varchar('contract_address').references(
      () => nfts.contract_address
    ),
    rr: numeric('rr'),
    event_timestamp: timestamp('event_timestamp').defaultNow().notNull(),
  },
  table => ({
    pk: primaryKey(
      table.contract_address,
      table.token_id,
      table.event_timestamp
    ),
  })
)

export const nftOffers = pgTable(
  'nft_offers',
  {
    order_hash: varchar('order_hash').notNull(),
    event_type: text('event_type'),
    token_id: varchar('token_id').references(() => nfts.token_id),
    contract_address: varchar('contract_address').references(
      () => nfts.contract_address
    ),
    collection_slug: varchar('collection_slug')
      .references(() => collections.opensea_slug)
      .notNull(),
    game_id: varchar('game_id').notNull(),
    seller: varchar('seller').notNull(),
    quantity: integer('quantity').default(1),
    price_val: varchar('price_val'),
    price_currency: varchar('price_currency'),
    price_decimals: varchar('price_decimals'),
    start_date: timestamp('start_date'),
    expiration_date: timestamp('expiration_date'),
    event_timestamp: timestamp('event_timestamp').notNull(),
  },
  table => ({
    pk: primaryKey(
      table.contract_address,
      table.token_id,
      table.event_timestamp
    ),
  })
)

export const nftListings = pgTable(
  'nft_listings',
  {
    order_hash: varchar('order_hash').notNull(),
    token_id: varchar('token_id').references(() => nfts.token_id),
    contract_address: varchar('contract_address').references(
      () => nfts.contract_address
    ),
    collection_slug: varchar('collection_slug')
      .references(() => collections.opensea_slug)
      .notNull(),
    game_id: varchar('game_id').notNull(),
    seller: varchar('seller').notNull(),
    price_val: varchar('price_val'),
    price_currency: varchar('price_currency'),
    price_decimals: varchar('price_decimals'),
    start_date: timestamp('start_date'),
    expiration_date: timestamp('expiration_date'),
    event_timestamp: timestamp('event_timestamp').notNull(),
  },
  table => ({
    pk: primaryKey(
      table.contract_address,
      table.token_id,
      table.event_timestamp
    ),
  })
)
