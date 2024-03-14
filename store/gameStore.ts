// gameStore.ts
import { create } from "zustand";
import {
  Collection,
  CollectionStats,
  AssetEvent,
  NftExtended,
  NftListings,
} from "@/types/apiTypes";

interface GameStore {
  collection: Collection | null;
  listings: NftListings;
  collectionStats: CollectionStats | null;
  collectionSaleEvents: AssetEvent[];
  setGameData: (data: {
    collection: Collection | null;
    listings: NftListings;
    collectionStats: CollectionStats | null;
    collectionSaleEvents: AssetEvent[];
  }) => void;
  updateListings: (newListings: NftListings) => void;
}

const useGameStore = create<GameStore>((set, get) => ({
  collection: null,
  listings: { nfts: [], next: "" },
  collectionStats: null,
  collectionSaleEvents: [],
  setGameData: (data) =>
    set({
      collection: data.collection,
      listings: data.listings,
      collectionStats: data.collectionStats,
      collectionSaleEvents: data.collectionSaleEvents,
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
