import { Nft } from '../types';
import Image from 'next/image';

interface NftCardProps {
  nft: Nft;
}

export const NftCard: React.FC<NftCardProps> = ({ nft }) => {
  return (
    <div className="border border-gray-300 rounded-md p-4">
      <h3 className="text-sm overflow-hidden">{nft.name}</h3>
      {nft.image_url ? (
        <Image src={nft.image_url} width="100" height="100" alt=":(" />
      ) : (
        <h3 className="text-sm overflow-hidden">No image</h3>
      )}
    </div>
  );
};
