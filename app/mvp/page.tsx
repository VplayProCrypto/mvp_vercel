'use client';

import { func } from 'prop-types';
import React from 'react';

import GamesList from './components/gameCards';
import Navbar from './components/mvp_navbar';
import LandingFooter from '../commonComponents/footer';

export default function MVP_dashboard() {
  return (
    <section className="bg-[#000] text-[#fff]">
      <div>
        <Navbar gasFee="20 Gwei" />
      </div>
      <div>
        <h1> MVP Dashboard </h1>
      </div>
      <div>
        <GamesList />
      </div>
      <LandingFooter />
    </section>
  );
}
