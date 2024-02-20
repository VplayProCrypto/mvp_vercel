// pages/access.js in your Next.js project

import Head from 'next/head';
import React, { useState } from 'react';
import Navbar from '../../app/navbar';
import Footer from '../../app/components/footer';
export default function AccessPage() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        alert(
          'Thank you for joining VPLAY! Check your inbox for confirmation.'
        );
      } else {
        alert('There was an issue with your sign-up. Please try again.');
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
      <div
        className="flex flex-col items-center justify-center min-h-screen py-2"
        style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}
      >
        <h1 className="text-2xl font-bold" style={{ marginBottom: '1rem' }}>
          Join the VPLAY Community and Beta Testing
        </h1>
        <p style={{ maxWidth: '600px', marginBottom: '2rem' }}>
          VPLAY is rolling out activities for gamers and NFT enthusiasts like
          you. Join our community, get updates and early access to the VPLAY
          platform, contribute by letting us know what you think and help shape
          the future of online and offline gaming.
        </p>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out rounded"
            style={{ marginBottom: '1rem' }}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Join Us
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
