import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { NftExtended } from "@/types/nft";

interface NftCardProps {
  nft: NftExtended;
}

const NftCard: React.FC<NftCardProps> = ({ nft }) => {
  const price = nft.current_price
    ? `${nft.current_price.value} ${nft.current_price.currency}`
    : null;

  return (
    <Card>
      <CardHeader>
        {nft.image_url ? (
          <div className="flex justify-center">
            <Image
              src={nft.image_url}
              width="200"
              height="100"
              alt={"No Image :("}
              className="rounded-md"
            />
          </div>
        ) : (
          <CardTitle className="text-sm overflow-hidden text-center">
            No image available
          </CardTitle>
        )}
      </CardHeader>
      <CardContent>
        <CardTitle className="text-lg font-semibold overflow-hidden">
          {nft.name}
        </CardTitle>
        <CardDescription className="text-md">{price}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default NftCard;
