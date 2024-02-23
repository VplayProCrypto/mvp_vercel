'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Fragment, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { signIn, signOut } from 'next-auth/react';

const navigation = [
  { name: 'Community', href: '/signup' },
  { name: 'Careers', href: '/careers' }
  // Add more pages as needed
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar({
  user,
  gasFee
}: {
  user: any;
  gasFee: string;
}) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Disclosure
      as="nav"
      className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              {/* Logo */}
              <div className="flex items-center">
                <div className="shrink-0">
                  <Link className="home_button" href="/">
                    <Image
                      src={'/images/vplay.png'}
                      alt="image"
                      width={100}
                      height={100}
                    />
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {/* Navigation Links */}
                  </div>
                </div>
              </div>

              {/* Right-side elements */}
              <div className="ml-4 flex items-center md:ml-6">
                {/* Pages Dropdown */}

                <Link
                  href={'/careers'}
                  className={classNames(
                    pathname === '/careers' ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700'
                  )}
                >
                  Careers
                </Link>

                {/* Action Button */}
                <div className="ml-3 relative">
                  <Link href="/signup">
                    <button className="bg-blue-800 hover:bg-blue-700 text-white f py-2 px-4 rounded">
                      Access VPLAY
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
