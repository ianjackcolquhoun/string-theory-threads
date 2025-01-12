// components/Layout.js
import { useState } from "react"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import SparklyMouseTrail from "./SparklyMouseTrail"

export default function Layout({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false)

  const categories = [
    { name: "T-Shirts", href: "/category/t-shirts", icon: "👕" },
    { name: "Hoodies", href: "/category/hoodies", icon: "🧥" },
    { name: "Pants", href: "/category/pants", icon: "👖" },
    { name: "Accessories", href: "/category/accessories", icon: "🎒" },
  ]

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/stringtheory.jpg")',
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
      </div>

      {/* Mouse Trail */}
      <SparklyMouseTrail />

      {/* Floating Navigation */}
      <div className="fixed top-8 left-0 right-0 z-50 flex justify-center">
        <nav className="bg-white/10 backdrop-blur-md rounded-full px-6 py-3 flex items-center space-x-8 shadow-lg">
          <Link
            href="/"
            className="text-xl font-bold text-white hover:text-blue-300 transition-colors"
          >
            STT
          </Link>

          <div className="relative group">
            <button className="text-white hover:text-blue-300 transition-colors py-2">
              Shop
            </button>

            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300">
              <div className="grid grid-cols-2 gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 w-[400px] shadow-xl">
                {categories.map((category, index) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="transform transition-all duration-300 hover:scale-105"
                  >
                    <div className="bg-white/5 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 text-white">
                      <span className="text-2xl mb-2 block">
                        {category.icon}
                      </span>
                      <h3 className="font-semibold">{category.name}</h3>
                    </div>
                  </Link>
                ))}
              </div>
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

          <button
            onClick={() => setIsCartOpen(true)}
            className="text-white hover:text-blue-300 transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
