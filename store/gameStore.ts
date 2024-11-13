// gameStore.ts
import { OpenseaCollection } from '@/types/opensea/collection'
import { OpenseaNftListings } from '@/types/opensea/nft'
import {
  OpenseaCollectionStats,
  OpenseaAssetEvent,
} from '@/types/opensea/stats'
import { GameDescription } from '@/types/vplayTypes'
import { create } from 'zustand'

interface GameStore {
  metadata: GameDescription | null
  collection: OpenseaCollection | null
  listings: OpenseaNftListings
  collectionStats: OpenseaCollectionStats | null
  collectionSaleEvents: OpenseaAssetEvent[]
  ethPrice: string | null
  setGameData: (data: {
    metadata: GameDescription | null
    collection: OpenseaCollection | null
    listings: OpenseaNftListings
    collectionStats: OpenseaCollectionStats | null
    collectionSaleEvents: OpenseaAssetEvent[]
    ethPrice: string | null
  }) => void
  updateListings: (newListings: OpenseaNftListings) => void
}

const useGameStore = create<GameStore>((set, get) => ({
  metadata: null,
  collection: null,
  listings: { nfts: [], next: '' },
  collectionStats: null,
  collectionSaleEvents: [],
  ethPrice: null,
  setGameData: data =>
    set({
      metadata: data.metadata,
      collection: data.collection,
      listings: data.listings,
      collectionStats: data.collectionStats,
      collectionSaleEvents: data.collectionSaleEvents,
      ethPrice: data.ethPrice,
    }),
  updateListings: (newListings: OpenseaNftListings) =>
    set(state => {
      if (
        newListings &&
        typeof newListings === 'object' &&
        Array.isArray(newListings.nfts)
      ) {
        return {
          listings: {
            nfts: [...state.listings.nfts, ...newListings.nfts],
            next: newListings.next || '', // Update the next string
          },
        }
      } else {
        console.error('newListings is not of the expected type:', newListings)
        return state
      }
    }),
}))

export default useGameStore
