CREATE TABLE contracts (
  id SERIAL PRIMARY KEY,
  address VARCHAR(255) NOT NULL
);

CREATE TABLE fees (
  id SERIAL PRIMARY KEY,
  fee NUMERIC(10, 2) NOT NULL,
  recipient VARCHAR(255) NOT NULL,
  required BOOLEAN NOT NULL
);

CREATE TABLE payment_tokens (
  id SERIAL PRIMARY KEY,
  symbol VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  chain VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  decimals INTEGER NOT NULL,
  eth_price VARCHAR(255) NOT NULL,
  usd_price VARCHAR(255) NOT NULL
);

CREATE TABLE prices (
  id SERIAL PRIMARY KEY,
  currency VARCHAR(255) NOT NULL,
  decimals INTEGER NOT NULL,
  value VARCHAR(255) NOT NULL
);

CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  quantity VARCHAR(255) NOT NULL,
  token_address VARCHAR(255) NOT NULL,
  decimals INTEGER NOT NULL,
  symbol VARCHAR(255) NOT NULL
);

CREATE TABLE collections (
  collection VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(255),
  banner_image_url VARCHAR(255),
  owner VARCHAR(255) NOT NULL,
  safelist_status VARCHAR(255),
  category VARCHAR(255),
  is_disabled BOOLEAN DEFAULT false,
  is_nsfw BOOLEAN DEFAULT false,
  trait_offers_enabled BOOLEAN DEFAULT false,
  collection_offers_enabled BOOLEAN DEFAULT false,
  opensea_url VARCHAR(255),
  project_url VARCHAR(255),
  wiki_url VARCHAR(255),
  discord_url VARCHAR(255),
  telegram_url VARCHAR(255),
  twitter_username VARCHAR(255),
  instagram_username VARCHAR(255),
  total_supply INTEGER,
  created_date TIMESTAMP DEFAULT now()
);

CREATE TABLE collection_contracts (
  id SERIAL PRIMARY KEY,
  collection VARCHAR(255) REFERENCES collections(collection),
  contract_id INTEGER REFERENCES contracts(id)
);

CREATE TABLE collection_fees (
  id SERIAL PRIMARY KEY,
  collection VARCHAR(255) REFERENCES collections(collection),
  fee_id INTEGER REFERENCES fees(id)
);

CREATE TABLE collection_payment_tokens (
  id SERIAL PRIMARY KEY,
  collection VARCHAR(255) REFERENCES collections(collection),
  payment_token_id INTEGER REFERENCES payment_tokens(id)
);
CREATE TABLE nfts (
  id SERIAL PRIMARY KEY,
  identifier VARCHAR(255) NOT NULL,
  collection VARCHAR(255) REFERENCES collections(collection),
  contract_id INTEGER REFERENCES contracts(id),
  token_standard VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  description TEXT,
  image_url VARCHAR(255),
  metadata_url VARCHAR(255),
  opensea_url VARCHAR(255) NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  is_disabled BOOLEAN NOT NULL,
  is_nsfw BOOLEAN NOT NULL
);

CREATE TABLE traits (
  id SERIAL PRIMARY KEY,
  nft_id INTEGER REFERENCES nfts(id),
  trait_type VARCHAR(255) NOT NULL,
  display_type VARCHAR(255),
  max_value VARCHAR(255),
  value VARCHAR(255) NOT NULL
);

CREATE TABLE listings (
  id SERIAL PRIMARY KEY,
  nft_id INTEGER REFERENCES nfts(id),
  order_hash VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL,
  price_id INTEGER REFERENCES prices(id),
  protocol_data JSONB NOT NULL,
  protocol_address VARCHAR(255) NOT NULL
);

CREATE TABLE offers (
  id SERIAL PRIMARY KEY,
  nft_id INTEGER REFERENCES nfts(id),
  order_hash VARCHAR(255) NOT NULL,
  chain VARCHAR(255) NOT NULL,
  price_id INTEGER REFERENCES prices(id),
  criteria JSONB NOT NULL,
  protocol_data JSONB NOT NULL,
  protocol_address VARCHAR(255) NOT NULL
);

CREATE TABLE attributes (
  id SERIAL PRIMARY KEY,
  nft_id INTEGER REFERENCES nfts(id),
  trait_type VARCHAR(255) NOT NULL,
  value VARCHAR(255) NOT NULL,
  display_type VARCHAR(255)
);


CREATE TABLE intervals (
  id SERIAL PRIMARY KEY,
  interval VARCHAR(255) NOT NULL,
  volume NUMERIC(10, 2) NOT NULL,
  volume_diff NUMERIC(10, 2) NOT NULL,
  volume_change NUMERIC(10, 2) NOT NULL,
  sales INTEGER NOT NULL,
  sales_diff INTEGER NOT NULL,
  average_price NUMERIC(10, 2) NOT NULL
);

CREATE TABLE totals (
  id SERIAL PRIMARY KEY,
  volume NUMERIC(10, 2) NOT NULL,
  sales INTEGER NOT NULL,
  average_price NUMERIC(10, 2) NOT NULL,
  num_owners INTEGER NOT NULL,
  market_cap NUMERIC(10, 2) NOT NULL,
  floor_price NUMERIC(10, 2) NOT NULL,
  floor_price_symbol VARCHAR(255) NOT NULL
);

CREATE TABLE asset_events (
  id SERIAL PRIMARY KEY,
  event_type VARCHAR(255) NOT NULL,
  order_hash VARCHAR(255),
  maker VARCHAR(255),
  event_timestamp INTEGER NOT NULL,
  nft_id INTEGER REFERENCES assets(id),
  order_type JSONB,
  protocol_address VARCHAR(255),
  start_date INTEGER,
  expiration_date INTEGER,
  asset_id INTEGER REFERENCES assets(id),
  quantity INTEGER,
  taker VARCHAR(255),
  payment_id INTEGER REFERENCES payments(id),
  criteria JSONB,
  is_private_listing BOOLEAN,
  closing_date INTEGER,
  seller VARCHAR(255),
  buyer VARCHAR(255),
  transaction VARCHAR(255),
  from_address VARCHAR(255),
  to_address VARCHAR(255)
);