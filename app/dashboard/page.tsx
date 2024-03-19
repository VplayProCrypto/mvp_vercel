// app/dashboard/page.tsx
import DashboardHeroCarousel from "@/components/dashboard/dashboardHeroCarousel";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Collection, CollectionMetadata } from "@/types/collection";
import { getCollections } from "../api/opensea/utils";
import { insertCollectionWithMetadata } from "@/db/inserts";
import { getMultipleCollections } from "@/db/selects";
import { DashBoardCard } from "@/components/dashboard/dashboardCard";
import DashboardGameScrollArea from "@/components/dashboard/dashboardGameScrollArea";

interface DashboardPageProps {
  images: string[];
}

const collectionNames = [
  "decentraland",
  "mavia-land",
  "pixels-farm",
  "sandbox",
  "the-sandbox",
  "axie",
  "cryptokitties",
  "spider-tanks",
  "mirandus",
];

const DashboardPage = async () => {
  const collections: Collection[] = await getMultipleCollections(
    collectionNames
  );

  const images = collections.map((collection: Collection) => {
    return collection.banner_image_url;
  });

  return (
    <main>
      <title>VPLAY</title>
      <Navbar user={undefined} gasFee={""} />
      <DashboardHeroCarousel images={images} />
      <DashboardGameScrollArea collections={collections} />
      <Footer />
    </main>
  );
};

export default DashboardPage;
