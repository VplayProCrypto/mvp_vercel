import { Nft } from '../types';
import Image from 'next/image';
import { getBestOfferForNft } from '../opensea';
import { useState, useEffect } from 'react';

interface NftCardProps {
  nft: Nft;
  price: string;
}

export const NftCard: React.FC<NftCardProps> = ({ nft, price }) => {
  // const [bestOffer, setBestOffer] = useState<any>(null);

  // useEffect(() => {
  //   const fetchBestOffer = async () => {
  //     const offer = await getBestOfferForNft(nft.identifier, nft.collection);
  //     setBestOffer(offer);
  //   };

  //   fetchBestOffer();
  // }, [nft]);

  return (
    <div className="border border-gray-300 rounded-md p-4">
      <h3 className="text-sm overflow-hidden">{nft.name}</h3>
      <h3>{price}</h3>
      {nft.image_url ? (
        <Image src={nft.image_url} width="100" height="100" alt=":(" />
      ) : (
        <h3 className="text-sm overflow-hidden">No image</h3>
      )}
    </div>
  );
};
