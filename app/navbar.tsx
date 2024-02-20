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
  { name: 'Community', href: '/sign_up/page' },
  { name: 'Careers', href: '/careers/page' }
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
                    <img
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
                <Menu as="div" className="relative ml-3">
                  <Menu.Button className="flex items-center text-black hover:text-gray-700 focus:outline-none">
                    Join Us
                    <ChevronDownIcon
                      className="ml-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute left-0 mt-2 w-48 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {navigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <Link
                              href={item.href}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              {item.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>

                {/* Action Button */}
                <div className="ml-3 relative">
                  <Link href="/mvp/page">
                    <button className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
