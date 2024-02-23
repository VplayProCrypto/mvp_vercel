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
import thor from '../public/images/2.png';
import stages from '../public/images/5.jpg';
import three from '../public/images/3.png';
import eight from '../public/images/8.svg';
export default function IndexPage() {
  return (
    <section className="bg-[#000] text-[#fff]">
      <Navbar user={undefined} gasFee={''} />

      <Image
        src={vpl}
        alt="image"
        width={1920}
        height={1240}
        className={'w-full'}
      />

      <Image
        src={text}
        alt="image"
        width={1920}
        height={1240}
        className={'w-full'}
      />

      <Image
        src={thor}
        alt="image"
        width={1920}
        height={1240}
        className={'w-full'}
      />

      <Image
        src={three}
        alt="image"
        width={1920}
        height={1240}
        className={'w-full'}
      />

      <Image
        src={stages}
        alt="image"
        width={1920}
        height={1240}
        className={'w-full'}
      />

      <Image
        src={eight}
        alt="image"
        width={1920}
        height={1240}
        className={'w-full'}
      />

      <CallToAction />
      <Footer />
    </section>
  );
}
