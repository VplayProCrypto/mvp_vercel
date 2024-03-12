// GameItems.tsx
import useGameStore from "@/store/gameStore";
import NftCard from "../nftcard";
import useFetchGameData from "@/hooks/useFetchGameData";
import { useState } from "react";

const GameItems: React.FC = () => {
  const { listings } = useGameStore();
  const { fetchMoreListings, loading } = useFetchGameData();
  const nfts = listings.nfts;
  const [loadMoreCount, setLoadMoreCount] = useState<number>(0);
  const [maxLoadMoreCount] = useState<number>(3);

  const handleLoadMore = async () => {
    if (loadMoreCount < maxLoadMoreCount && listings.next && !loading) {
      await fetchMoreListings();
      setLoadMoreCount((prevCount) => prevCount + 1);
    }
    console.log(listings.nfts.length);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {nfts.map((nft) => (
          <NftCard key={nft.identifier} nft={nft} />
        ))}
      </div>
      {listings.next && loadMoreCount < maxLoadMoreCount && (
        <button onClick={handleLoadMore} disabled={loading}>
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default GameItems;
