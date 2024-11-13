import { eq } from 'drizzle-orm'
import { collectionDynamic, pool } from '.'
import { drizzle } from 'drizzle-orm/node-postgres'
import { CollectionDynamic } from '@/types'

// export async function getCollectionMetadataByName(
//   collectionSlug: string
// ): Promise<CollectionDynamic | null> {
//   try {
//     const db = await drizzle(pool)
//     const result = await db
//       .select()
//       .from(collectionDynamic)
//       .where(eq(collectionDynamic.collection_slug, collectionSlug))
//       .limit(1)

//     if (result.length === 0) {
//       return null
//     }
//     console.log(result)
//     return result[0] as CollectionDynamic
//   } catch (error) {
//     console.error('Error fetching collection metadata:', error)

//     throw error
//   }
// }

export async function getCollectionMetadataByName(
  collectionSlug: string
): Promise<any | null> {
  try {
    const query = `
      SELECT *
      FROM collection_dynamic
      WHERE collection_slug = $1
      LIMIT 1
    `

    const result = await pool.query<any>(query, [collectionSlug])

    if (result.rows.length === 0) {
      return null
    }

    console.log(result.rows)
    return result.rows[0]
  } catch (error) {
    console.error('Error fetching collection metadata:', error)
    throw error
  }
}

export async function getCollectionVplayMetrics(
  collectionSlug: string
): Promise<any | null> {
  try {
    const query = `
    SELECT
    gm.play_to_earn_rate,
    gm.free_to_play_rate,
    gm.tokenomics_stability,
    gm.reward_streams, 
    gm.vplay_score,
    gm.social_score,
    gm.risk_rate,
    gm.risk_level,
    gm.total_rating as user_score,
    gm.total_ratings_count as user_ratings_count,
    gm.esrb_rating,
    gm.esrb_description,
    gm.is_multiplayer,
    gm.has_controller_support,
    gm.is_single_player,
    gm.has_global_servers
FROM game_metrics gm
WHERE gm.collection_slug = $1
`
    const result = await pool.query<any>(query, [collectionSlug])

    if (result.rows.length === 0) {
      return null
    }

    console.log(result.rows)
    return result.rows[0]
  } catch (error) {
    console.error('Error fetching vplay metrics:', error)
    throw error
  }
}

export async function getTokenDistribution(collectionSlug: string) {
  try {
    const query = `SELECT 
    distribution_type as name,
    percentage as value
FROM token_distribution
WHERE collection_slug = $1
ORDER BY percentage DESC;
`
    const result = await pool.query<any>(query, [collectionSlug])

    if (result.rows.length === 0) {
      return null
    }

    return result.rows
  } catch (error) {
    console.error('Error fetching token distribution:', error)
    throw error
  }
}

export async function getRatingSummary(collectionSlug: string) {
  try {
    const query = `
    SELECT 
    ease_of_play,
    fun_rating,
    nft_rarity,
    transparency_rating,
    session_length,
    reward_rate
FROM rating_summary
WHERE collection_slug = $1;`

    const result = await pool.query<any>(query, [collectionSlug])

    if (result.rows.length == 0) {
      return null
    }

    return result.rows[0]
  } catch (error) {
    console.error('Error fetching rating summary:', error)
    throw error
  }
}

export async function getRatingDistribution(collectionSlug: string) {
  try {
    const query = `
    WITH all_ratings AS (
      SELECT generate_series(1,5) as rating
  )
  SELECT 
      ar.rating,
      COALESCE(COUNT(r.rating), 0) as count
  FROM all_ratings ar
  LEFT JOIN reviews r 
      ON r.rating = ar.rating 
      AND r.collection_slug = $1
  GROUP BY ar.rating
  ORDER BY ar.rating DESC;`

    const result = await pool.query<any>(query, [collectionSlug])

    if (result.rows.length == 0) {
      return null
    }

    return result.rows
  } catch (error) {
    console.error('Error fetching rating summary:', error)
    throw error
  }
}

export async function getRatings(collectionSlug: string) {
  try {
    const query = `SELECT 
    reviewer_name as name,
    TO_CHAR(review_date, 'MM/DD/YYYY') as date,
    rating,
    review_text as review,
    helpful_count as "helpfulCount",
    profile_image_url as "profileImage",
    json_build_object(
        'nftsOwned', nfts_owned,
        'userScore', rating,
        'hoursPlayed', hours_played,
        'playingAge', playing_age,
        'usdValue', usd_value,
        'gamesOwned', games_owned,
        'rewardRate', reward_rate
    ) as stats
    FROM reviews
    WHERE collection_slug = $1
    ORDER BY review_date DESC
    OFFSET $2 LIMIT $3; `

    const result = await pool.query<any>(query, [collectionSlug, `0`, `10`])

    if (result.rows.length == 0) {
      return null
    }

    return result.rows
  } catch (error) {
    console.error('Error fetching rating summary:', error)
    throw error
  }
}
