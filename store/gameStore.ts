// gameStore.ts
import { Collection } from "@/types/collection";
import { NftListings } from "@/types/nft";
import { CollectionStats, AssetEvent } from "@/types/stats";
import { GameDescription } from "@/types/localTypes";
import { create } from "zustand";

interface GameStore {
  metadata: GameDescription | null;
  collection: Collection | null;
  listings: NftListings;
  collectionStats: CollectionStats | null;
  collectionSaleEvents: AssetEvent[];
  ethPrice: string | null;
  setGameData: (data: {
    metadata: GameDescription | null;
    collection: Collection | null;
    listings: NftListings;
    collectionStats: CollectionStats | null;
    collectionSaleEvents: AssetEvent[];
    ethPrice: string | null;
  }) => void;
  updateListings: (newListings: NftListings) => void;
}

const useGameStore = create<GameStore>((set, get) => ({
  metadata: null,
  collection: null,
  listings: { nfts: [], next: "" },
  collectionStats: null,
  collectionSaleEvents: [],
  ethPrice: null,
  setGameData: (data) =>
    set({
      metadata: data.metadata,
      collection: data.collection,
      listings: data.listings,
      collectionStats: data.collectionStats,
      collectionSaleEvents: data.collectionSaleEvents,
      ethPrice: data.ethPrice,
    }),
  updateListings: (newListings: NftListings) =>
    set((state) => {
      if (
        newListings &&
        typeof newListings === "object" &&
        Array.isArray(newListings.nfts)
      ) {
        return {
          listings: {
            nfts: [...state.listings.nfts, ...newListings.nfts],
            next: newListings.next || "", // Update the next string
          },
        };
      } else {
        console.error("newListings is not of the expected type:", newListings);
        return state;
      }
    }),
}));

export default useGameStore;
