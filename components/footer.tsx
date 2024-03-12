// Rename the file to LandingFooter.tsx or a similar name with a .tsx extension

import { Book, Linkedin, Send, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className=" text-white p-10">
      <div className="max-w-6xl mx-auto flex justify-between">
        <div className="flex flex-col">
          <Image
            src={"/images/logo.png"}
            alt="VPLAY Logo"
            width={50}
            height={25}
          />
          <span className="font-bold text-xl mt-6 mb-2">EXPLORE</span>
          <Link
            href="mailto:support@vplay.pro"
            className="text-gray-400 hover:text-gray-300 mb-1"
          >
            Contact Us
          </Link>
          <Link href="/careers" className="text-gray-400 hover:text-gray-300">
            Contribute
          </Link>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-xl mb-2">SOCIAL</span>
          <Link
            href="https://twitter.com/VPLAY_PRO"
            className="text-gray-400 hover:text-gray-300 mb-1"
          >
            <div className="flex items-center space-between">
              <Twitter className="w-4 h-4 mr-2" /> Twitter
            </div>
          </Link>
          <Link
            href="https://medium.com/@vplaypro"
            className="text-gray-400 hover:text-gray-300 mb-1"
          >
            <div className="flex items-center space-between">
              <Book className="w-4 h-4 mr-2" /> Medium
            </div>
          </Link>
          <Link
            href="https://www.linkedin.com/company/vplaypro/"
            className="text-gray-400 hover:text-gray-300 mb-1"
          >
            <div className="flex items-center space-between">
              <Linkedin className="w-4 h-4 mr-2" /> Linkedin
            </div>
          </Link>

          <Link
            href="https://t.me/VPLAY_ProPlatform"
            className="text-gray-400 hover:text-gray-300 mb-1"
          >
            <div className="flex items-center space-between">
              <Send className="w-4 h-4 mr-2" /> Telegram
            </div>
          </Link>
        </div>
      </div>
      <div className="text-center text-gray-500 text-sm mt-10">
        Copyright © 2024 VPLAY. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
