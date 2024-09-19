'use client'

import React from 'react'

interface SearchBarProps {
  placeholder?: string
  onSearch?: (query: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search for games and tokens',
  onSearch,
}) => {
  const [query, setQuery] = React.useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(query)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl">
      <div className="relative">
        <input
          type="text"
          className="w-full h-14 pl-6 pr-14 rounded-2xl border-2 border-[#c4c4c4] bg-transparent text-[#c4c4c4] text-lg font-medium font-['Satoshi Variable'] leading-relaxed focus:outline-none focus:border-[#a0a0a0]"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-[#c4c4c4] rounded-xl flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </form>
  )
}

export default SearchBar
