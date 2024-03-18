import {
  Collection,
  CollectionMetadata,
  collectionMetadata,
  collections,
} from "@/types/collection";
import { InferModel, sql } from "drizzle-orm";
import { db } from "./database";

async function insertCollection(collection: Collection) {
  const database = await db();
  const result = await database
    .insert(collections)
    .values({
      collection: collection.collection,
      name: collection.name,
      description: collection.description,
      image_url: collection.image_url,
      banner_image_url: collection.banner_image_url,
      owner: collection.owner,
      safelist_status: JSON.stringify(collection.safelist_status),
      category: collection.category,
      is_disabled: collection.is_disabled,
      is_nsfw: collection.is_nsfw,
      trait_offers_enabled: collection.trait_offers_enabled,
      collection_offers_enabled: collection.collection_offers_enabled,
      opensea_url: collection.opensea_url,
      project_url: collection.project_url,
      wiki_url: collection.wiki_url,
      discord_url: collection.discord_url,
      telegram_url: collection.telegram_url,
      twitter_username: collection.twitter_username,
      instagram_username: collection.instagram_username,
      total_supply: collection.total_supply,
    })
    .returning();

  return result;
}

async function insertCollectionMetadata(metadata: CollectionMetadata) {
  const database = await db();
  const result = await database
    .insert(collectionMetadata)
    .values({
      collection: metadata.collection,
      genre: metadata.genre,
      twitterSentiment: metadata.twitterSentiment,
      facebookSentiment: metadata.facebookSentiment,
      instagramSentiment: metadata.instagramSentiment,
      redditSentiment: metadata.redditSentiment,
      discordSentiment: metadata.discordSentiment,
      playNowButtonText: metadata.playNowButtonText,
      itemsText: metadata.itemsText,
      communityScore: metadata.communityScore,
      playerCount: metadata.playerCount,
      rewardsText: metadata.rewardsText,
      stars: metadata.stars,
      rr: metadata.rr,
      friendly: metadata.friendly,
      videoUrl: metadata.videoUrl,
      image: metadata.image,
    })
    .returning();

  return result;
}

export async function insertCollectionWithMetadata(
  collection: Collection,
  metadata: CollectionMetadata
) {
  try {
    console.log(collection, metadata);
    const database = await db();
    await database.transaction(async (tx) => {
      const insertedCollection = await insertCollection(collection);
      metadata.collection = insertedCollection[0].collection;
      await insertCollectionMetadata(metadata);
    });
    console.log("Collection and metadata inserted successfully");
  } catch (error) {
    console.error("Error inserting collection and metadata:", error);
  }
}
