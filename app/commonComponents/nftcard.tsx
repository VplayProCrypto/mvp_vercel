import { Nft } from '../../utils/types';
import Image from 'next/image';

interface NftCardProps {
  nft: Nft;
  price: string;
}

const NftCard: React.FC<NftCardProps> = ({ nft, price }) => {
  return (
    <div className="border border-gray-500 rounded-md p-4 bg-stone-900 text-white">
      {nft.image_url ? (
        <div className="flex justify-center">
          <Image
            src={nft.image_url}
            width="200"
            height="100"
            alt={'No Image :('}
            className="rounded-md"
          />
        </div>
      ) : (
        <h3 className="text-sm overflow-hidden text-center">
          No image available
        </h3>
      )}
      <div className="mt-2">
        <h3 className="text-lg font-semibold overflow-hidden">{nft.name}</h3>
        <h3 className="text-md">{price}</h3>
      </div>
    </div>
  );
};

export default NftCard;
