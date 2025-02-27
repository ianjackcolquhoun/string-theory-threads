"use client"
import Link from "next/link"

export const ShopDropdown = () => {
  return (
    <div
      className="w-[600px] left-1/2 -translate-x-1/2 relative"
      onMouseEnter={(e) => e.stopPropagation()}
    >
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-1 shadow-xl border border-white/20">
        <div className="flex items-center justify-center gap-4">
          {" "}
          {/* Changed justify-between to justify-center */}
          <Link
            href="/pages/new-arrivals"
            className="text-white hover:text-blue-300 transition-colors px-4 py-2 rounded-lg hover:bg-white/5 text-center flex-1" /* Added flex-1 */
          >
            New
          </Link>
          <Link
            href="/pages/shop"
            className="text-white hover:text-blue-300 transition-colors px-4 py-2 rounded-lg hover:bg-white/5 text-center flex-1"
          >
            All
          </Link>
          <Link
            href="/pages/tops"
            className="text-white hover:text-blue-300 transition-colors px-4 py-2 rounded-lg hover:bg-white/5 text-center flex-1"
          >
            Tops
          </Link>
          <Link
            href="/pages/bottoms"
            className="text-white hover:text-blue-300 transition-colors px-4 py-2 rounded-lg hover:bg-white/5 text-center flex-1"
          >
            Bottoms
          </Link>
          <Link
            href="/pages/accessories"
            className="text-white hover:text-blue-300 transition-colors px-4 py-2 rounded-lg hover:bg-white/5 text-center flex-1"
          >
            Accessories
          </Link>
        </div>
      </div>
    </div>
  )
}
