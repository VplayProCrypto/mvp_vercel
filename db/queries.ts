import { eq } from 'drizzle-orm'
import { collectionDynamic, pool } from '.'
import { drizzle } from 'drizzle-orm/node-postgres'

export async function getCollectionMetadataByName(collectionSlug: string) {
  try {
    const db = await drizzle(pool)
    const result = await db
      .select()
      .from(collectionDynamic)
      .where(eq(collectionDynamic.collection_slug, collectionSlug))
      .limit(1)

    if (result.length === 0) {
      return null
    }

    return result[0]
  } catch (error) {
    console.error('Error fetching collection metadata:', error)
    throw error
  }
}
