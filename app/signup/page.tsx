// use client
'use client';
import Head from 'next/head';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import Navbar from '../commonComponents/navbar';
import Footer from '../commonComponents/footer';
import logo from 'public/images/logo.png';
import Image from 'next/image';

interface SubscribeResponse {
  message?: string;
}

export default function SignUpPage() {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      const response = await fetch('/api/airtable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, name })
      });

      const data: SubscribeResponse = await response.json();

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
      <Navbar user={undefined} gasFee={''} />
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
            onChange={handleNameChange}
            className="w-full border-2 border-transparent bg-gray-800 bg-opacity-50 focus:border-blue-500 focus:ring-blue-500 text-base outline-none text-white py-3 px-5 leading-8 transition-colors duration-200 ease-in-out rounded-lg mb-4"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
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
