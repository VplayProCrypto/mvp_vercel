import { Nft } from '../types';
import Image from 'next/image';
import { getBestOfferForNft } from '../opensea';
import { useState, useEffect } from 'react';

interface NftCardProps {
  nft: Nft;
  price: string;
}

export const NftCard: React.FC<NftCardProps> = ({ nft, price }) => {

  return (
    <div className="border border-gray-300 rounded-md p-4">
      {nft.image_url ? (
        <Image src={nft.image_url} width="100" height="100" alt=":(" />
      ) : (
        <h3 className="text-sm overflow-hidden">No image</h3>
      )}
      <h3 className="text-sm overflow-hidden">{nft.name}</h3>
      <h3>{price}</h3>
    </div>
  );
};
