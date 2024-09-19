'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SearchBar from './searchbar'
import Menu from './menu'
import Profile from './profile'

const NavBar: React.FC = () => {
  const [searchResults, setSearchResults] = useState<any[]>([])

  const handleSearch = async (query: string) => {
    // Implement your search logic here
    // This could be an API call or local filtering
    // For example:
    // const results = await fetchSearchResults(query);
    // setSearchResults(results);
    console.log('Searching for:', query)
    // Placeholder: set dummy results
    setSearchResults([
      { id: 1, title: 'Result 1' },
      { id: 2, title: 'Result 2' },
    ])
  }

  return (
    <div className="Property1Default h-24 px-4 sm:px-20 py-5 shadow backdrop-blur-lg flex-col justify-start items-start gap-8 inline-flex w-full">
      <div className="Nav self-stretch justify-between items-center gap-4 sm:gap-10 inline-flex flex-wrap w-full">
        {/* Logo */}
        <div className="Logo h-8 justify-start items-start gap-2.5 flex flex-shrink-0">
          <div className="Logo w-9 h-8 relative">
            <Link
              className="home_button"
              href="/">
              <Image
                src={'/images/logonew.png'}
                alt="image"
                width={100}
                height={100}
              />
            </Link>
          </div>
        </div>
        {/* Navigation Links */}
        <div className="Links h-6 justify-start items-center flex flex-wrap flex-shrink-0">
          <button className="NavBtn w-36 h-6 bg-transparent border-none cursor-pointer">
            <span className="Text opacity-90 text-center text-white text-lg font-bold font-['Satoshi Variable'] leading-normal">
              Free to Play
            </span>
          </button>
          <button className="NavBtn w-36 h-6 bg-transparent border-none cursor-pointer">
            <span className="Text opacity-90 text-center text-white text-lg font-bold font-['Satoshi Variable'] leading-normal">
              Paid P2E
            </span>
          </button>
        </div>
        {/* Search Field */}
        <div className="flex-grow mx-4 max-w-xl">
          <SearchBar onSearch={handleSearch} />
        </div>
        {/* Menu */}
        <Menu />
        {/* User Profile */}
        <Profile imageUrl="https://via.placeholder.com/56x56" />
      </div>
      {/* Optionally display search results */}
      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map(result => (
            <div key={result.id}>{result.title}</div>
          ))}
        </div>
      )}
    </div>
  )
}

export default NavBar
