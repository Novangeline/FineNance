"use client";

import Link from "next/link";
import { Menu } from "@headlessui/react";

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

          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-xl shadow-xl focus:outline-none z-50">
            <div className="p-1">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/add"
                    className={`block px-4 py-2 text-sm rounded-lg transition ${
                      active
                        ? "bg-blue-100 text-blue-700 font-semibold"
                        : "text-gray-700 hover:bg-blue-50"
                    }`}
                  >
                    Add Spending
                  </Link>
                )}
              </Menu.Item>

              <div className="border-t my-1 border-gray-200" />

              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/view"
                    className={`block px-4 py-2 text-sm rounded-lg transition ${
                      active
                        ? "bg-blue-100 text-blue-700 font-semibold"
                        : "text-gray-700 hover:bg-blue-50"
                    }`}
                  >
                    View All
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/view/month"
                    className={`block px-4 py-2 text-sm rounded-lg transition ${
                      active
                        ? "bg-blue-100 text-blue-700 font-semibold"
                        : "text-gray-700 hover:bg-blue-50"
                    }`}
                  >
                    View by Month
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/view/year"
                    className={`block px-4 py-2 text-sm rounded-lg transition ${
                      active
                        ? "bg-blue-100 text-blue-700 font-semibold"
                        : "text-gray-700 hover:bg-blue-50"
                    }`}
                  >
                    View by Year
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
