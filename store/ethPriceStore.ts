// ethPriceStore.ts
import { create } from "zustand";

interface EthPriceStore {
  ethPrice: number | null;
  loading: boolean;
  fetchEthPrice: () => Promise<void>;
}

const useEthPriceStore = create<EthPriceStore>((set) => ({
  ethPrice: null,
  loading: true,
  fetchEthPrice: async () => {
    set({ loading: true });
    try {
      const response = await fetch(
        "https://api.coinbase.com/v2/prices/ETH-USD/buy"
      );
      const data = await response.json();
      set({ ethPrice: parseFloat(data?.data?.amount) });
    } catch (error) {
      console.error("Failed to fetch ETH price:", error);
      set({ ethPrice: null });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useEthPriceStore;
