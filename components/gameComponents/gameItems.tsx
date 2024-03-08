import useGameStore from "@/store/gameStore";
import NftCard from "../nftcard";

const GameItems = () => {
  const { listings } = useGameStore();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {listings.map((nft) => (
        <NftCard key={nft.identifier} nft={nft} />
      ))}
    </div>
  );
};

export default GameItems;
