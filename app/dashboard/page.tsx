// app/dashboard/page.tsx
import DashboardCarousel from "@/components/dashboard/dashboardCarousel";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Collection } from "@/types/collection";
import { getCollections, getMultipleCollections } from "../api/opensea/utils";

interface DashboardPageProps {
  images: string[];
}

const collectionNames = [
  "cryptokitties",
  "axie",
  "spider-tanks",
  "championsarena",
  "mirandus",
];

const DashboardPage = async () => {
  const collections: Collection[] = await getMultipleCollections(
    collectionNames
  );
  console.log(collections);

  const images = collections.map((collection: Collection) => {
    return collection.banner_image_url;
  });

  return (
    <main>
      <title>VPLAY</title>
      <Navbar user={undefined} gasFee={""} />
      <DashboardCarousel images={images} />
      <Footer />
    </main>
  );
};

export default DashboardPage;
