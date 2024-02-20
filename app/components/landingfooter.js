// components/Footer.js or a similar file
import Image from 'next/image';
import logo from '../../pages/careers/small.png';
import Link from 'next/link';
export default function LandingFooter() {
  return (
    <footer className="bg-gray-900 text-white p-10">
      <div className="max-w-6xl mx-auto flex justify-between">
        <div className="flex flex-col">
          <Image
            src={'/images/logo.png'}
            alt="VPLAY Logo"
            width={50}
            height={25}
          />
          <span className="font-bold text-xl mt-6 mb-2">EXPLORE</span>
          <Link
            href="/sign_up/page"
            className="text-gray-400 hover:text-gray-300 mb-1"
          >
            Contact Us
          </Link>
          <Link
            href="/careers/page"
            className="text-gray-400 hover:text-gray-300"
          >
            Contribute
          </Link>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-xl mb-2">SOCIAL</span>
          {/* Assuming 'X' is a placeholder for a name, replace with actual name */}
          <Link
            href="https://twitter.com/VPLAY_PRO"
            className="text-gray-400 hover:text-gray-300 mb-1"
          >
            Twitter
          </Link>
          <Link
            href="https://medium.com/@vplaypro"
            className="text-gray-400 hover:text-gray-300 mb-1"
          >
            Medium
          </Link>
          <Link
            href="https://www.linkedin.com/company/vplaypro/"
            className="text-gray-400 hover:text-gray-300 mb-1"
          >
            Linkedin
          </Link>

          <Link
            href="https://t.me/VPLAY_ProPlatform"
            className="text-gray-400 hover:text-gray-300 mb-1"
          >
            Telegram
          </Link>
        </div>
      </div>
      <div className="text-center text-gray-500 text-sm mt-10">
        Copyright © 2024 VPLAY. All rights reserved.
      </div>
    </footer>
  );
}
