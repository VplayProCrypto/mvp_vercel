// components/Footer.js or a similar file
import Image from 'next/image';
import logo from '../../pages/careers/small.png';
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
          <a
            href="/sign_up/page"
            className="text-gray-400 hover:text-gray-300 mb-1"
          >
            Contact Us
          </a>
          <a href="/careers/page" className="text-gray-400 hover:text-gray-300">
            Contribute
          </a>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-xl mb-2">SOCIAL</span>
          {/* Assuming 'X' is a placeholder for a name, replace with actual name */}
          <a
            href="https://twitter.com/VPLAY_PRO"
            className="text-gray-400 hover:text-gray-300 mb-1"
          >
            Twitter
          </a>
          <a
            href="https://medium.com/@vplaypro"
            className="text-gray-400 hover:text-gray-300 mb-1"
          >
            Medium
          </a>
          <a
            href="https://www.linkedin.com/company/vplaypro/"
            className="text-gray-400 hover:text-gray-300 mb-1"
          >
            Linkedin
          </a>

          <a
            href="https://t.me/VPLAY_ProPlatform"
            className="text-gray-400 hover:text-gray-300 mb-1"
          >
            Telegram
          </a>
        </div>
      </div>
      <div className="text-center text-gray-500 text-sm mt-10">
        Copyright © 2024 VPLAY. All rights reserved.
      </div>
    </footer>
  );
}
