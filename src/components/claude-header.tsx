"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { ShopDropdown } from "./shop-dropdown"
import { useState } from "react"

export default function NavigationHeader() {
  const [isShopOpen, setIsShopOpen] = useState(false)

  return (
    <header className="w-full pt-8 z-50">
      <nav className="mx-auto flex justify-center relative">
        <div className="bg-white/10 backdrop-blur-md rounded-full px-6 py-3 flex items-center space-x-8 shadow-lg">
          <Link
            href="/"
            className="text-xl font-bold text-white hover:text-blue-300 transition-colors"
          >
            STT
          </Link>

          {/* Shop Button with Hover Handling */}
          <div
            className="relative"
            onMouseEnter={() => setIsShopOpen(true)}
            onMouseLeave={() => setIsShopOpen(false)}
          >
            <button
              type="button"
              className="text-white hover:text-blue-300 transition-colors py-2"
            >
              Shop
            </button>

            {/* Dropdown Container */}
            <div
              className={`absolute top-full left-0 right-0 w-full ${
                isShopOpen
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              } transition-all duration-200 pt-4`}
            >
              <div
                className="absolute inset-x-0 -top-4 h-4 bg-transparent cursor-default"
                onMouseEnter={() => setIsShopOpen(true)}
              />
              <ShopDropdown />
            </div>
          </div>

          <Link
            href="/about"
            className="text-white hover:text-blue-300 transition-colors"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="text-white hover:text-blue-300 transition-colors"
          >
            Contact
          </Link>

          <Link
            href="/pages/checkout"
            className="text-white hover:text-blue-300 transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
          </Link>
        </div>
      </nav>
    </header>
  )
}
