"use client"

import Link from "next/link"

interface ShopDropdownProps {
  onHover: (hovering: boolean) => void
}

export const ShopDropdown = ({ onHover }: ShopDropdownProps) => {
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 w-[600px]"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-1 shadow-xl border border-white/20">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/pages/new-arrivals"
            className="text-white hover:text-blue-300 transition-colors px-4 py-2 rounded-lg hover:bg-white/5 text-center"
          >
            New
          </Link>
          <Link
            href="/pages/shop"
            className="text-white hover:text-blue-300 transition-colors px-4 py-2 rounded-lg hover:bg-white/5 text-center"
          >
            All
          </Link>
          <Link
            href="/pages/tops"
            className="text-white hover:text-blue-300 transition-colors px-4 py-2 rounded-lg hover:bg-white/5 text-center"
          >
            Tops
          </Link>
          <Link
            href="/pages/bottoms"
            className="text-white hover:text-blue-300 transition-colors px-4 py-2 rounded-lg hover:bg-white/5 text-center"
          >
            Bottoms
          </Link>
          <Link
            href="/pages/accessories"
            className="text-white hover:text-blue-300 transition-colors px-4 py-2 rounded-lg hover:bg-white/5 text-center"
          >
            Accessories
          </Link>
        </div>
      </div>
    </div>
  )
}
