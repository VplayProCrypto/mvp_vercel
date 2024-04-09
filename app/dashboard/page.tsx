// app/dashboard/page.tsx
import DashboardHeroCarousel from "@/components/dashboard/dashboardHeroCarousel";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Collection, CollectionMetadata } from "@/types/opensea/collection";
import { getCollections } from "../../backend/apis/opensea/utils";
import { insertCollectionWithMetadata } from "@/db/inserts";
import { getMultipleCollections } from "@/db/selects";
import { DashBoardCard } from "@/components/dashboard/dashboardCard";
import DashboardGameScrollArea from "@/components/dashboard/dashboardGameScrollArea";
import { initializeAssetEvents } from "@/db/init";

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
  // const collections: Collection[] = await getMultipleCollections(
  //   collectionNames
  // );

  // const images = collections.map((collection: Collection) => {
  //   return collection.banner_image_url;
  // });

  const next =
    "LWV2ZW50X3RpbWVzdGFtcD0yMDI0LTAzLTEyKzIyJTNBNTYlM0ExOS4xNjQyNTYmLWV2ZW50X3R5cGU9YmlkX2VudGVyZWQmLXBrPTIwODg0MzA4Njk5";

  //initializeAssetEvents("cryptokitties", next);
  return (
    <main>
      <title>VPLAY</title>
      <Navbar user={undefined} gasFee={""} />

      <Footer />
    </main>
  );
};

export default DashboardPage;
