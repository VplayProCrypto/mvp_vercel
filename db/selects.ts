import {
  Collection,
  CollectionMetadata,
  collectionMetadata,
  collections,
} from "@/types/collection";
import { eq, sql } from "drizzle-orm";
import { db } from "./database";
import { getMultipleCollectionsOpensea } from "@/app/api/opensea/utils";

export async function getCollectionByName(
  collectionName: string
): Promise<Collection | null> {
  const database = await db();
  const result = await database
    .select()
    .from(collections)
    .where(eq(collections.collection, collectionName))
    .limit(1);

  if (result.length === 0) {
    return null;
  }

  const collection: Collection = {
    collection: result[0].collection,
    name: result[0].name ?? "",
    description: result[0].description ?? "",
    image_url: result[0].image_url ?? "",
    banner_image_url: result[0].banner_image_url ?? "",
    owner: result[0].owner,
    safelist_status: result[0].safelist_status
      ? JSON.parse(result[0].safelist_status as string)
      : {},
    category: result[0].category ?? "",
    is_disabled: result[0].is_disabled ?? false,
    is_nsfw: result[0].is_nsfw ?? false,
    trait_offers_enabled: result[0].trait_offers_enabled ?? false,
    collection_offers_enabled: result[0].collection_offers_enabled ?? false,
    opensea_url: result[0].opensea_url ?? "",
    project_url: result[0].project_url ?? "",
    wiki_url: result[0].wiki_url ?? "",
    discord_url: result[0].discord_url ?? "",
    telegram_url: result[0].telegram_url ?? "",
    twitter_username: result[0].twitter_username ?? "",
    instagram_username: result[0].instagram_username ?? "",
    contracts: [],
    editors: [],
    fees: [],
    rarity: {
      strategy_version: "",
      calculated_at: "",
      max_rank: 0,
      total_supply: 0,
    },
    payment_tokens: [],
    total_supply: result[0].total_supply ?? 0,
    created_date: result[0].created_date ?? new Date(),
  };

  return collection;
}
export async function getMultipleCollections(
  collectionNames: string[]
): Promise<Collection[]> {
  const collections = await Promise.all(
    collectionNames.map((collectionName) => getCollectionByName(collectionName))
  );

  const validCollections = collections.filter(
    (collection) => collection !== null
  ) as Collection[];

  const nullCollectionNames = collectionNames.filter(
    (_, index) => collections[index] === null
  );

  if (nullCollectionNames.length > 0) {
    const openseaCollections = await getMultipleCollectionsOpensea(
      nullCollectionNames
    );
    validCollections.push(...openseaCollections);
  }

  return validCollections;
}
export async function getCollectionMetadataByName(
  collectionName: string
): Promise<CollectionMetadata | null> {
  const database = await db();
  const result = await database
    .select()
    .from(collectionMetadata) // Replace with the actual table name for collection metadata
    .where(eq(collectionMetadata.collection, collectionName))
    .limit(1);

  if (result.length === 0) {
    return null;
  }

  const metadata: CollectionMetadata = {
    collection: result[0].collection ?? "",
    genre: result[0].genre ?? "",
    twitterSentiment: result[0].twitterSentiment ?? 0,
    facebookSentiment: result[0].facebookSentiment ?? 0,
    instagramSentiment: result[0].instagramSentiment ?? 0,
    redditSentiment: result[0].redditSentiment ?? 0,
    discordSentiment: result[0].discordSentiment ?? 0,
    playNowButtonText: result[0].playNowButtonText ?? "",
    itemsText: result[0].itemsText ?? "",
    communityScore: result[0].communityScore ?? "",
    playerCount: result[0].playerCount ?? "",
    rewardsText: result[0].rewardsText ?? "",
    stars: result[0].stars ?? "",
    rr: result[0].rr ?? "",
    friendly: result[0].friendly ?? "",
    videoUrl: result[0].videoUrl ?? "",
    image: result[0].image ?? "",
  };

  return metadata;
}
