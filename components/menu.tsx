import React from 'react'

const Menu: React.FC = () => {
  return (
    <button className="Menu w-10 h-10 relative flex flex-col justify-center items-center mx-4 bg-transparent border-none cursor-pointer">
      <div className="w-6 h-0.5 bg-white mb-1.5"></div>
      <div className="w-6 h-0.5 bg-white mt-1.5"></div>
    </button>
  )
}

export default Menu
