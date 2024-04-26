import {
  getOpenseaBestOfferForNft,
  getOpenseaCollection,
  getOpenseaCollectionEventsAll,
  getOpenseaCollectionStats,
} from 'apis/opensea'
import {
  collections,
  collectionDynamic,
  contracts,
  fees,
  paymentTokens,
  tokenPrices,
  pool,
} from '@db'
import { drizzle } from 'drizzle-orm/node-postgres'
import { getDappradarCollectionUAWs } from 'apis/dappradar'
import { getSocialSentiments } from 'apis/socials'

import {
  createCollectionDynamicRecord,
  createCollectionRecord,
  createContractRecord,
  createFeeRecord,
  createPaymentTokenRecord,
  createTokenPriceRecord,
} from './createRecords'

async function fetchCollectionData(collectionName: string) {
  try {
    const [
      openseaCollection,
      openseaCollectionStats,
      { daily_uaw, monthly_uaw },
      socialSentiments,
    ] = await Promise.all([
      getOpenseaCollection(collectionName),
      getOpenseaCollectionStats(collectionName),
      getDappradarCollectionUAWs(collectionName),
      getSocialSentiments(collectionName),
    ])

    return {
      openseaCollection,
      openseaCollectionStats,
      daily_uaw,
      monthly_uaw,
      ...socialSentiments,
    }
  } catch (error) {
    console.error(
      `Error fetching data for collection ${collectionName}:`,
      error
    )
    throw error
  }
}

export const initializeNewGame = async (collectionName: string) => {
  console.log('Initializing new game' + collectionName)

  const {
    openseaCollection,
    openseaCollectionStats,
    daily_uaw,
    monthly_uaw,
    ...socialSentiments
  } = await fetchCollectionData(collectionName)

  const client = drizzle(pool)

  try {
    await client
      .insert(collections)
      .values(createCollectionRecord(openseaCollection))
    await client
      .insert(collectionDynamic)
      .values(
        createCollectionDynamicRecord(
          collectionName,
          openseaCollectionStats,
          daily_uaw,
          monthly_uaw,
          socialSentiments
        )
      )

    await Promise.all([
      ...openseaCollection.contracts.map(openseaContract =>
        client
          .insert(contracts)
          .values(
            createContractRecord(
              collectionName,
              openseaContract,
              openseaCollection.payment_tokens[0]
            )
          )
      ),
      ...openseaCollection.fees.map(openseaFee =>
        client.insert(fees).values(createFeeRecord(collectionName, openseaFee))
      ),
      ...openseaCollection.payment_tokens.map(async openseaPaymentToken => {
        await client
          .insert(paymentTokens)
          .values(createPaymentTokenRecord(collectionName, openseaPaymentToken))
        await client
          .insert(tokenPrices)
          .values(createTokenPriceRecord(openseaPaymentToken))
      }),
    ])

    return {
      collectionName: collectionName,
      game_id: openseaCollection.project_url,
    }
  } catch (error) {
    console.error('Error inserting data into the database')
    console.error(error)
  }

  return {
    collectionName: collectionName,
    game_id: '',
  }
}
