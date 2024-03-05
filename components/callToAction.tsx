import Image from "next/image";
import Link from "next/link";
import background from "../public/images/rewards.png"; // Adjust the import path to where your image is located

const CallToAction = () => {
  return (
    <div className="relative h-screen w-full">
      <Image
        src={background}
        layout="fill"
        objectFit="cover"
        alt="Background"
      />
      <div className="absolute inset-0 z-0"></div>

      {/* Call to Action Component */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center">
          <h1 className="mb-5 text-4xl font-bold text-white">
            Join Our Community
          </h1>
          <p className="mb-5 text-lg text-gray-300">
            Be an early member and contribute to our journey!
          </p>
          <Link href="/accessvplay" passHref>
            <button className="px-6 py-3 text-lg text-blue-700 bg-white rounded-md shadow-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Join Us
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
