'use client';
import React, { useState, useEffect } from 'react';
import { Title, Text } from '@tremor/react';
import Search from './search';
import { ImageTextCard } from './components/imageTextCard';
import { StageComponent } from './components/stagesCards';
import LandingFooter from './components/landingfooter';
import CallToAction from './components/callToAction';
import Navbar from './navbar';
import Image from 'next/image';
export default function IndexPage() {
  return (
    <section className="bg-[#000] text-[#fff]">
      <Navbar user={undefined} gasFee={''} />
      <div>
        <Image src={'/images/vpl.png'} alt="image" className={'w-full'} />
      </div>
      <div>
        <Image src={'/images/text.svg'} alt="image" className={'w-full'} />
      </div>
      <div>
        <ImageTextCard
          imageUrl="/images/pyramid.gif"
          altText="via GIPHY"
          text="VPlay Gaming is on track to open up GameFi, deploying a groundbreaking three-phase strategy."
        />
      </div>
      <div>
        <StageComponent />
      </div>
      <CallToAction />
      <LandingFooter />
    </section>
  );
}
