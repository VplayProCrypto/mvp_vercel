// components/LoadingScreen.tsx
import Image from "next/image";
import React from "react";
import logo from "../public/images/logo.png";
const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-stone-800">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500">
        <Image src={logo} alt="logo" width={100} height={100} />
      </div>
    </div>
  );
};

export default Loading;
