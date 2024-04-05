import {
  Collection,
  CollectionMetadata,
  collectionContracts,
  collectionFees,
  collectionMetadata,
  collectionPaymentTokens,
  collections,
  rarity,
} from "@/types/collection";
import { InferModel, eq, sql } from "drizzle-orm";
import { db, pool } from "./database";
import {
  AssetEvent,
  assetEvents,
  Interval,
  intervals,
  Total,
  totals,
} from "@/types/stats";
import { drizzle } from "drizzle-orm/node-postgres";
import { getMultipleCollectionsOpensea } from "@/app/api/opensea/utils";
import result from "postcss/lib/result";
import { contracts, fees, paymentTokens } from "@/types/blockchain";

const tableMap = {
  Collection: collections,
  CollectionMetadata: collectionMetadata,
  CollectionContracts: collectionContracts,
  Contracts: contracts,
  CollectionFees: collectionFees,
  Fees: fees,
  CollectionPaymentTokens: collectionPaymentTokens,
  PaymentTokens: paymentTokens,
  CollectionRarity: rarity,
  AssetEvent: assetEvents,
  Total: totals,
  Interval: intervals,
};

type TableName = keyof typeof tableMap;

async function executeQuery<T extends TableName>(
  tableName: string,
  operation: "insert" | "update" | "select",
  data?: any,
  condition?: any
): Promise<InferModel<(typeof tableMap)[T]>[]> {
  const client = await pool.connect();
  try {
    const tableKey = tableName as TableName;
    const table = tableMap[tableKey];
    const database = drizzle(client);
    let result;
    if (operation === "insert") {
      result = await database.insert(table).values(data).returning();
    } else if (operation === "update") {
      result = await database.update(table).set(data).where(condition);
    } else if (operation === "select") {
      result = await database.select().from(table).where(condition);
    }
    console.log(`Data ${operation}ed from ${tableName} successfully`);
    return result as InferModel<(typeof tableMap)[T]>[];
  } catch (error) {
    console.error(`Error ${operation}ing data from ${tableName}:`, error);
    throw error;
  } finally {
    client.release();
  }
}

export async function insertData(tableName: string, data: any) {
  return executeQuery(tableName, "insert", data);
}

export async function updateData(
  tableName: string,
  data: Partial<InferModel<(typeof tableMap)[TableName]>>,
  condition: any
) {
  return executeQuery(tableName, "update", data, condition);
}

export async function selectData<T extends TableName>(
  tableName: T,
  condition: any
): Promise<InferModel<(typeof tableMap)[T]>[]> {
  return executeQuery(tableName, "select", undefined, condition);
}
export async function insertAssetEvents(assetEvents: AssetEvent[]) {
  await Promise.all(
    assetEvents.map((assetEvent) => insertData("assetEvents", assetEvent))
  );
}

export async function updateAssetEvent(
  assetEventId: string,
  updates: Partial<AssetEvent>
) {
  await updateData("assetEvents", updates, { id: assetEventId });
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
): Promise<CollectionMetadata> {
  const result = await selectData(
    "CollectionMetadata",
    eq(collectionMetadata.collection, collectionName)
  );
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

export async function getCollectionByName(
  collectionName: string
): Promise<Collection | null> {
  const client = await pool.connect();

  try {
    const result = await client.query(
      `
        SELECT
          c.*,
          json_agg(DISTINCT con) AS contracts,
          json_agg(DISTINCT f) AS fees,
          json_agg(DISTINCT pt) AS payment_tokens,
          json_agg(DISTINCT r) AS rarity
        FROM
          collections c
        LEFT JOIN
          collection_contracts cc ON c.collection = cc.collection
        LEFT JOIN
          contracts con ON cc.contract_id = con.id
        LEFT JOIN
          collection_fees cf ON c.collection = cf.collection
        LEFT JOIN
          fees f ON cf.fee_id = f.id
        LEFT JOIN
          collection_payment_tokens cpt ON c.collection = cpt.collection
        LEFT JOIN
          payment_tokens pt ON cpt.payment_token_id = pt.id
        LEFT JOIN
          rarity r ON c.collection = r.collection
        WHERE
          c.collection = $1
        GROUP BY
          c.collection
      `,
      [collectionName]
    );

    if (result.rows.length === 0) {
      return null;
    }

    const collection = result.rows[0];

    return {
      ...collection,
      contracts: collection.contracts.map((contract: any) => ({
        id: contract.id,
        address: contract.address,
      })),
      fees: collection.fees.map((fee: any) => ({
        id: fee.id,
        fee: fee.fee,
        recipient: fee.recipient,
        required: fee.required,
      })),
      payment_tokens: collection.payment_tokens.map((token: any) => ({
        id: token.id,
        symbol: token.symbol,
        address: token.address,
        chain: token.chain,
        image: token.image,
        name: token.name,
        decimals: token.decimals,
        eth_price: token.eth_price,
        usd_price: token.usd_price,
      })),
      rarity: collection.rarity[0]
        ? {
            strategy_version: collection.rarity[0].strategy_version,
            calculated_at: collection.rarity[0].calculated_at,
            max_rank: collection.rarity[0].max_rank,
            total_supply: collection.rarity[0].total_supply,
          }
        : undefined,
    };
  } catch (error) {
    console.error(`Error retrieving collection data:`, error);
    throw error;
  } finally {
    client.release();
  }
}
export async function insertCollection(collection: Collection): Promise<void> {
  try {
    await insertData("collections", {
      collection,
    });

    for (const contract of collection.contracts) {
      await insertData("contracts", {
        address: contract.address,
      });

      await insertData("collection_contracts", {
        collection: collection.collection,
      });
    }

    for (const fee of collection.fees) {
      await insertData("fees", {
        fee,
      });

      await insertData("collection_fees", {
        collection: collection.collection,
      });
    }

    for (const token of collection.payment_tokens) {
      await insertData("payment_tokens", {
        token,
      });

      await insertData("collection_payment_tokens", {
        collection: collection.collection,
      });
    }

    if (collection.rarity) {
      await insertData("rarity", {
        collection: collection.collection,
        strategy_version: collection.rarity.strategy_version,
        calculated_at: collection.rarity.calculated_at,
        max_rank: collection.rarity.max_rank,
        total_supply: collection.rarity.total_supply,
      });
    }
  } catch (error) {
    console.error(`Error inserting collection data:`, error);
    throw error;
  }
}

export async function insertCollectionMetadata(
  metadata: CollectionMetadata
): Promise<void> {
  try {
    await insertData("collection_metadata", {
      metadata,
    });
  } catch (error) {
    console.error(`Error inserting collection metadata:`, error);
    throw error;
  }
}
