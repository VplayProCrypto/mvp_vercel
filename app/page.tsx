'use client';
import React, { useState, useEffect } from 'react';
import { Title, Text } from '@tremor/react';
import Search from './commonComponents/search';
import { ImageTextCard } from './commonComponents/imageTextCard';
import { StageComponent } from './commonComponents/stagesCards';
import Footer from './commonComponents/footer';
import CallToAction from './commonComponents/callToAction';
import Navbar from './commonComponents/navbar';
import Image from 'next/image';
import vpl from '../public/images/vpl.png';
import text from '../public/images/text.svg';
import pyramid from '../public/images/pyramid.gif';
export default function IndexPage() {
  return (
    <section className="bg-[#000] text-[#fff]">
      <Navbar user={undefined} gasFee={''} />
      <div>
        <Image
          src={vpl}
          alt="image"
          width={1920}
          height={1240}
          className={'w-full'}
        />
      </div>
      <div>
        <Image
          src={text}
          alt="image"
          width={100}
          height={100}
          className={'w-full'}
        />
      </div>
      <div>
        <ImageTextCard
          imageUrl={pyramid}
          altText="via GIPHY"
          text="VPlay Gaming is on track to open up GameFi, deploying a groundbreaking three-phase strategy."
        />
      </div>
      <div>
        <StageComponent />
      </div>
      <CallToAction />
      <Footer />
    </section>
  );
}
