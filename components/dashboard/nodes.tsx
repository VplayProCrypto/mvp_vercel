import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Nodes: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-black flex flex-col justify-center items-center p-4">
      <div className="flex flex-col items-center mb-8 w-full max-w-4xl">
        <div className="flex items-center mb-8">
          <Image
            src="/images/logo.png"
            width={50}
            height={50}
            alt="V Logo"
          />
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold font-['Be Vietnam Pro'] ml-2">
            Nodes
          </h1>
        </div>
        <p className="text-center text-white/60 text-lg sm:text-xl md:text-2xl font-semibold font-['Be Vietnam Pro'] leading-7 tracking-wide mb-8">
          Support VPlay
          <br />
          And its Path In Decentralization
          <br />
          Get VPlay Rewards Now
        </p>
        <button className="w-full sm:w-48 h-14 py-2 rounded-full border-2 border-white text-white text-base font-semibold font-['Be Vietnam Pro'] capitalize">
          <Link href="/accessvplay">PRE-REGISTER</Link>
        </button>
      </div>
      <div className="w-full  mt-8">
        <Image
          src="/images/deepmind.png"
          width={16}
          height={9}
          layout="responsive"
          alt="Network"
          priority
        />
      </div>
    </div>
  )
}

export default Nodes
