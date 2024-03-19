import * as React from "react";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Collection } from "@/types/collection";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

interface DashboardGameScrollAreaProps {
  collections: Collection[];
}

export default function DashboardGameScrollArea({
  collections,
}: DashboardGameScrollAreaProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {collections.map((collection) => (
          <Button variant="ghost" key={collection.collection}>
            <figure key={collection.collection} className="shrink-0 mt-5 mb-5">
              <Link href={`/game/${collection.collection}`}>
                <div className="overflow-hidden rounded-md">
                  <Image
                    src={collection.banner_image_url}
                    alt={`Banner image for ${collection.collection}`}
                    className="aspect-[3/4] h-fit w-fit object-cover"
                    width={300}
                    height={400}
                  />
                </div>
                <figcaption className="pt-2 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    {collection.collection}
                  </span>
                </figcaption>
              </Link>
            </figure>
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
