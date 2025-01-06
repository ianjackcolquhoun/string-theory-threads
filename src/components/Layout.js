// components/Layout.js
import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, Menu, X } from 'lucide-react'

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'T-Shirts', href: '/category/t-shirts' },
    { name: 'Hoodies', href: '/category/hoodies' },
    { name: 'Pants', href: '/category/pants' },
    { name: 'Accessories', href: '/category/accessories' }
  ]

  return (
    <div className="min-h-screen relative">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/50 to-transparent backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold text-white">
              STT
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Cart & Mobile Menu Buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-blue-100 hover:text-white transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
              </button>
              
              <button
                onClick={() => setIsMenuOpen(true)}
                className="md:hidden p-2 text-blue-100 hover:text-white transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
          <div className="fixed right-0 top-0 bottom-0 w-64 bg-blue-900/95 backdrop-blur-lg p-6">
            <div className="flex justify-end mb-8">
              <button onClick={() => setIsMenuOpen(false)} className="text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-blue-100 hover:text-white transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Shopping Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="fixed right-0 top-0 bottom-0 w-80 bg-blue-900/95 backdrop-blur-lg p-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-semibold text-white">Your Cart</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              {/* Cart items will go here */}
              <p className="text-blue-100">Your cart is empty</p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 px-4 rounded-xl transition-colors duration-300">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-md mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">About Us</h3>
              <p className="text-blue-200">
                String Theory Threads: Where quantum fashion meets cosmic style.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-blue-200 hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
              <p className="text-blue-200">
                Email: hello@stringtheorythreads.com<br />
                Phone: (555) 123-4567
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-blue-200">
            <p>&copy; {new Date().getFullYear()} String Theory Threads. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout