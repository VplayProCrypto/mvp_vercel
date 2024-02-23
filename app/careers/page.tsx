import Head from 'next/head';
import React from 'react';
import Image from 'next/image';
import logo from './small.png'; // Adjust the import path to your logo's location
import Navbar from '../commonComponents/navbar';
import Footer from '../commonComponents/footer';

const CareersPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Careers at VPLAY</title>
      </Head>
      <Navbar user={undefined} gasFee={''} />
      <div
        className="min-h-screen flex flex-col items-center text-white justify-center px-4 space-y-12"
        style={{
          background: 'linear-gradient(to right, #0D13C0, #000, #0D13C0)'
        }}
      >
        <div className="text-center my-8 space-y-4">
          <Image
            src={'/images/logo.png'}
            alt="VPLAY Logo"
            width={150}
            height={150}
            className="mx-auto"
          />
          <h1
            className="text-5xl font-bold"
            style={{
              fontFamily: 'Poppins, sans-serif',
              letterSpacing: '1.5px'
            }}
          >
            Join VPLAY!
          </h1>
          <p
            className="max-w-4xl mx-auto text-xl"
            style={{
              fontFamily: 'Poppins, sans-serif',
              letterSpacing: '0.5px'
            }}
          >
            At VPLAY, our goal is to overhaul the gaming sector, creating a
            dynamic environment where innovative ideas meet gaming passion.
          </p>
        </div>

        <div className="w-full max-w-4xl mx-auto mb-8">
          <iframe
            src="https://airtable.com/embed/appb30pDqbguNgmbd/shrQM6oiMinYxQOLz?backgroundColor=cyan&layout=card&viewControls=on"
            frameBorder="0"
            className="w-full h-[533px] bg-transparent border-0 shadow-lg rounded-lg"
          ></iframe>
        </div>

        <div
          className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto p-4"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          <div className="flex flex-col space-y-4">
            <h2 className="text-4xl font-bold">Why VPLAY?</h2>
            <p className="text-lg">
              Dive into a world where your tech expertise meets endless
              possibilities. We stand out with our commitment to innovation,
              data integrity, and a thriving gaming community.
            </p>
          </div>

          <div className="flex flex-col space-y-4">
            <h2 className="text-4xl font-bold">How We Achieve Together</h2>
            <ul className="list-disc pl-5 space-y-2 text-lg">
              <li>
                An Innovation Playground where new technologies and ideas come
                to life.
              </li>
              <li>
                Impactful Work where every contribution makes a difference in
                our ecosystem.
              </li>
              <li>
                Collaborative Environment with brilliant minds passionate about
                driving success.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CareersPage;
