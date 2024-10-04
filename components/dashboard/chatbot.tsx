import React from 'react'
import Image from 'next/image'

const Chatbot: React.FC = () => {
  return (
    <div className="relative w-full">
      <div className="h-[10vh] bg-gradient-to-b from-black to-transparent"></div>
      <div className="relative h-[80vh]">
        <Image
          src="/images/chatbot.png"
          layout="fill"
          objectFit="cover"
          alt="Background"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-end p-8">
          <div className="max-w-2xl text-right">
            <h1 className="text-white text-5xl font-semibold leading-tight mb-6">
              Message VPlay AI
              <br />
              or Search for Queries
            </h1>
            <p className="text-gray-300 text-xl font-normal mb-8">
              Ask any GameFi Question, VPLAY Game Intelligence
              <br />
              is Your AI-powered Assistant.
            </p>
            <button className="bg-transparent text-white text-sm font-semibold py-2 px-4 underline">
              MAKE A POWERED SEARCH
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chatbot
