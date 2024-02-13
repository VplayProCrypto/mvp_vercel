import { Nft } from '../types';
import Image from 'next/image';

interface NftCardProps {
  nft: Nft;
}


export const NftCard: React.FC<NftCardProps> = ({ nft }) => {
  return (
    <div className="border border-gray-300 rounded-md p-4 flex flex-col items-center">
      {nft.image_url ? (
        <Image src={nft.image_url} width="150" height="150" alt={nft.name || "NFT Image"} className="mb-4" />
      ) : (
        <div className="text-sm mb-4">No image available</div>
      )}
      <div className="text-center">
        <div className="text-lg font-semibold mb-2">{nft.name}</div>
        <div className="text-md mb-1">Collection: {nft.collection}</div>
        <div className="text-sm">Token Standard: {nft.token_standard}</div>
      </div>
    </div>
  );
};