// pages/careers.tsx
import Head from 'next/head';
import React from 'react';
import Image from 'next/image';
import logo from './small.png'; // Adjust the import path to your logo's location
import Navbar from '../../app/navbar';
import Footer from '../../app/components/footer';
const CareersPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Careers at VPLAY</title>
      </Head>
      <Navbar user={undefined} gasFee={''} />
      <div className="min-h-screen bg-blue-900 text-white flex flex-col items-center justify-center px-4">
        {/* Logo and Join VPLAY! section */}
        <div className="text-center my-8">
          <Image
            src={logo}
            alt="VPLAY Logo"
            width={150}
            height={150}
            className="mx-auto mb-4"
          />
          <h1 className="text-4xl font-bold mb-2">Join VPLAY!</h1>
          <p className="max-w-2xl mx-auto text-lg mb-8">
            At VPLAY, our goal is to overhaul the gaming sector, establishing a
            dynamic environment where pioneering ideas meet the enthusiasm for
            gaming.
          </p>
        </div>

        {/* Iframe section */}
        <div className="w-full max-w-6xl mx-auto mb-8">
          <iframe
            className="airtable-embed w-full h-[533px] bg-transparent border border-gray-300"
            src="https://airtable.com/embed/appb30pDqbguNgmbd/shrQM6oiMinYxQOLz?backgroundColor=cyan&layout=card&viewControls=on"
            frameBorder="0"
            width="100%"
            height="533"
            style={{ background: 'transparent', border: '1px solid #ddd' }}
          ></iframe>
        </div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto p-4">
          {/* Why VPLAY? Column */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">Why VPLAY?</h2>
            <p>
              Joining our team is diving headfirst into a world where your
              tech-savvy brilliance meets boundless possibilities. What sets us
              apart is our commitment to innovation, data integrity, building a
              thriving gaming community, and thoughtfully crafting opportunities
              for the whole ecosystem!
            </p>
          </div>

          {/* Here's how we do it together Column */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">
              Here's how we do it together
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                We are an Innovation Playground! Together, we will explore new
                technologies, experiment with ideas, and watch them come to
                life.
              </li>
              <li>
                We are all going to do Impactful Work! Your contributions matter
                here. Every line of code, design element, or community
                interaction makes a difference in achieving a trustworthy and
                secure ecosystem.
              </li>
              <li>
                We are Collaboration! Work alongside brilliant minds who share
                your enthusiasm and drive.
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

/**
 *           <div className="mt-8">
            <iframe
              src="https://airtable.com/embed/shrQM6oiMinYxQOLz?backgroundColor=cyan&layout=card&viewControls=on"
              frameBorder="0"
              className="w-full h-[533px] bg-transparent border border-gray-300"
              style={{ maxWidth: '800px' }} // Keeping the iframe at a fixed max-width
            ></iframe>
          </div>
 */
