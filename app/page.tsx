'use client';
import React, { useState, useEffect } from 'react';
import { Title, Text } from '@tremor/react';
import Search from './search';

export default function IndexPage() {
  return (
    <section className="bg-[#000] text-[#fff]">
      <div>
        <img src={'/images/vpl.png'} alt="image" className={'w-full'} />
      </div>
      <div>
        <img src={'/images/text.svg'} alt="image" className={'w-full'} />
      </div>
    </section>
  )
}
