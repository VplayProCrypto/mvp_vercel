// pages/access.js in your Next.js project

import Head from 'next/head';
import React, { useState } from 'react';
import Navbar from '../../app/navbar';
export default function AccessPage() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Simulate an action, such as sending an email
      alert(
        `Thank you for joining VPLAY! We've sent a confirmation to ${email}`
      );
      // Redirect to mailto link targeting vplaycrypto@gmail.com
      window.location.href = `mailto:vplaycrypto@gmail.com?subject=VPLAY Community Sign-Up&body=I'm interested in joining the VPLAY community. My email is ${email}.`;
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
    </>
  );
}
