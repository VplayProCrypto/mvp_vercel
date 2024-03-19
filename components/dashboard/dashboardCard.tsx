import { Collection } from "@/types/collection";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import Image from "next/image";

interface DashBoardCardProps {
  collection: Collection;
}

export const DashBoardCard = ({ collection }: DashBoardCardProps) => {
  return (
    <Card className="w-fit">
      <CardHeader>
        <CardTitle>
          <Image
            alt="image"
            src={collection.banner_image_url}
            height={400}
            width={400}
            className="rounded-md"
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{collection.name}</CardDescription>
      </CardContent>
    </Card>
  );
};
