"use client"

import Link from "next/link"
import { useCallback, useRef } from "react"
import { ShoppingCart } from "lucide-react"
import { ShopDropdown } from "./shop-dropdown"

interface NavigationHeaderProps {
  onHover: (hovering: boolean) => void
}

export default function NavigationHeader({ onHover }: NavigationHeaderProps) {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    onHover(true)
  }, [onHover])

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      onHover(false)
    }, 200) // 200ms delay before hiding
  }, [onHover])

  return (
    <header className="w-full pt-8 z-50">
      <nav
        className="mx-auto flex justify-center relative group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="bg-white/10 backdrop-blur-md rounded-full px-6 py-3 flex items-center space-x-8 shadow-lg">
          <Link
            href="/"
            className="text-xl font-bold text-white hover:text-blue-300 transition-colors"
          >
            STT
          </Link>

          <button
            type="button"
            onClick={(e) => e.preventDefault()}
            className="text-white hover:text-blue-300 transition-colors py-2"
          >
            Shop
          </button>

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
        <div className="absolute top-full left-1/2 -translate-x-1/2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300">
          <div className="absolute inset-x-0 -top-3 h-8 bg-transparent cursor-default"></div>
          <div className="relative">
            <ShopDropdown onHover={onHover} />
          </div>
        </div>
      </nav>
    </header>
  )
}
