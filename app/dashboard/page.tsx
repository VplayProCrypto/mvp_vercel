import React from "react";
import { GetServerSideProps } from "next";
import DashboardCarousel from "@/components/dashboardComponents/dashboardCarousel";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

interface DashboardPageProps {
  images: string[];
}

const DashboardPage: React.FC<DashboardPageProps> = ({ images }) => {
  return (
    <main>
      <title>VPLAY</title>
      <Navbar user={undefined} gasFee={""} />
      <DashboardCarousel images={images} />
      <Footer />
    </main>
  );
};

export const getServerSideProps: GetServerSideProps<
  DashboardPageProps
> = async () => {
  const images = await fetchImages();

  return {
    props: {
      images,
    },
  };
};

export default DashboardPage;
