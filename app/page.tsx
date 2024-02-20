'use client';
import React, { useState, useEffect } from 'react';
import { Title, Text } from '@tremor/react';
import Search from './search';
import { ImageTextCard } from './components/imageTextCard';
import { StageComponent } from './components/stagesCards';

export default function IndexPage() {
  return (
    <section className="bg-[#000] text-[#fff]">
      <div>
        <img src={'/images/vpl.png'} alt="image" className={'w-full'} />
      </div>
      <div>
        <img src={'/images/text.svg'} alt="image" className={'w-full'} />
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
    </section>
  )
}

