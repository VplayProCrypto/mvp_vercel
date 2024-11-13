import React from 'react'

interface ProfileProps {
  imageUrl: string
}

const Profile: React.FC<ProfileProps> = ({ imageUrl }) => {
  return (
    <button className="Currency justify-end items-center flex flex-shrink-0 bg-transparent border-none cursor-pointer p-0">
      <img
        className="Ellipse961 w-14 h-14 rounded-full"
        src={imageUrl}
        alt="User profile"
      />
    </button>
  )
}

export default Profile
