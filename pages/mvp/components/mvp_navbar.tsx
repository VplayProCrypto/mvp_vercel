
import React from 'react';

type NavbarProps = {
    gasFee: string;
};

export const Navbar: React.FC<NavbarProps> = ({ gasFee }) => {
    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <div className="logo">
                <a href="/" className="text-xl font-bold">VPLAY</a>
            </div>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search..."
                    className="p-2 rounded-md text-gray-800"
                />
            </div>
            <div className="info">
                <span className="gas-fee mr-4">Gas Fee: {'coming soon'}</span>
                <button
                    className="connect-wallet bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {console.log()}}
                >
                    Connect Wallet
                </button>
            </div>
        </nav>
    );
};

