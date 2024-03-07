import { create } from "zustand";
import {
  Collection,
  CollectionStats,
  AssetEvent,
  NftExtended,
} from "@/utils/apiTypes";

interface GameStore {
  collection: Collection | null;
  listings: NftExtended[];
  collectionStats: CollectionStats | null;
  collectionSaleEvents: AssetEvent[];
  setGameData: (data: {
    collection: Collection | null;
    listings: NftExtended[];
    collectionStats: CollectionStats | null;
    collectionSaleEvents: AssetEvent[];
  }) => void;
}

const useGameStore = create<GameStore>((set) => ({
  collection: null,
  listings: [],
  collectionStats: null,
  collectionSaleEvents: [],
  setGameData: (data) =>
    set({
      collection: data.collection,
      listings: data.listings,
      collectionStats: data.collectionStats,
      collectionSaleEvents: data.collectionSaleEvents,
    }),
}));

export default useGameStore;
