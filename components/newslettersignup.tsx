'use client'
import React, { useState } from 'react'
import Image from 'next/image'

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('')

  //TODO
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitting email:', email)
    setEmail('')
  }

  return (
    <div className="NewsletterColumn flex-col justify-start items-start gap-5 inline-flex">
      <div className="Newsletter text-white text-lg font-normal font-['Satoshi Variable'] uppercase leading-normal tracking-wide">
        NEWSLETTER
      </div>
      <form
        onSubmit={handleSubmit}
        className="SignupBar justify-start items-start gap-3 inline-flex">
        <div className="EmailField w-80 h-14 px-6 bg-white rounded-xl shadow flex items-center">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full text-[#818181] bg-white text-lg font-medium font-['Satoshi Variable'] leading-relaxed focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="SubmitButton w-28 h-14 bg-white rounded-2xl flex justify-center items-center">
          <Image
            src="/images/forwardarrow.png"
            alt="Submit"
            width={100}
            height={100}
          />
        </button>
      </form>
    </div>
  )
}

export default NewsletterSignup
