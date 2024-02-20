import Head from 'next/head';
import React, { useState } from 'react';
import Navbar from '../../app/navbar';
import Footer from '../../app/components/footer';
import logo from './v.jpg';
import Image from 'next/image';

export default function AccessPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, name })
      });

      const data = await response.json();

      if (response.ok) {
        alert(
          'Thank you for joining VPLAY! Check your inbox for confirmation.'
        );
      } else {
        alert(
          data.message ||
            'There was an issue with your sign-up. Please try again.'
        );
      }
    } else {
      alert('Please enter your email address.');
    }
  };

  return (
    <>
      <Head>
        <title>Join VPLAY Community</title>
      </Head>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-gray-900 to-stone-800 text-white px-4 lg:px-0">
        <Image
          src={logo}
          alt="VPLAY Logo"
          width={150}
          height={150}
          className="mx-auto mb-8"
        />
        <h1 className="text-4xl font-bold mb-6 text-center">
          Join the VPLAY Community and Beta Testing
        </h1>
        <p className="max-w-lg mb-8 text-lg text-center">
          VPLAY is rolling out activities for gamers and NFT enthusiasts like
          you. Join our community, get updates and early access to the VPLAY
          platform, contribute by letting us know what you think and help shape
          the future of online and offline gaming.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-full max-w-lg px-4"
        >
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)} // Make sure to define `name` and `setName` with useState
            className="w-full border-2 border-transparent bg-gray-800 bg-opacity-50 focus:border-blue-500 focus:ring-blue-500 text-base outline-none text-white py-3 px-5 leading-8 transition-colors duration-200 ease-in-out rounded-lg mb-4"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-2 border-transparent bg-gray-800 bg-opacity-50 focus:border-blue-500 focus:ring-blue-500 text-base outline-none text-white py-3 px-5 leading-8 transition-colors duration-200 ease-in-out rounded-lg mb-6"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg"
          >
            Join Us
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

{
  /* <iframe
className="airtable-embed w-full h-[533px] bg-transparent border border-gray-300" // Updated class to className and used Tailwind CSS classes
src="https://airtable.com/embed/app1XIenbHqdqZsVe/pag5hJ5vnYh3MspiD/form"
frameBorder="0" // Corrected to camelCase for JSX
onMouseWheel="" // Corrected to camelCase for JSX; however, consider removing if not needed or implementing a function
width="100%"
height="533"
style={{ background: 'transparent', border: '1px solid #ccc' }} // Inline styles converted to an object for JSX
></iframe> */
}
