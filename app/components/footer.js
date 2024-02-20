import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4">
      <div className="container mx-auto">
        <p className="mb-4">© 2024 Vplay. All rights reserved.</p>
        <a
          href="/careers/page" // Replace with your actual careers page URL
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-600 transition duration-300 ease-in-out"
        >
          Careers
        </a>
      </div>
    </footer>
  );
};

export default Footer;
