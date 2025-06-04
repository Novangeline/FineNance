'use client';

import Link from 'next/link';
import { Menu } from '@headlessui/react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-blue-600">
        FineNance 💸
      </Link>

      <div className="flex items-center space-x-6 text-blue-500 font-medium">
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="hover:text-blue-700 transition">
            Spending ▾
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
            <div className="p-1">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/add"
                    className={`block px-4 py-2 text-sm ${active ? 'bg-blue-100' : ''}`}
                  >
                    Add Spending
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/view"
                    className={`block px-4 py-2 text-sm ${active ? 'bg-blue-100' : ''}`}
                  >
                    View Spendings
                  </Link>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
      </div>
    </nav>
  );
}