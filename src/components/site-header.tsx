"use client"
import React, { useState } from "react"
import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu"

interface MenuItem {
  label: string
  href: string
  subItems?: { label: string; href: string }[]
}

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const menuItems: MenuItem[] = [
    {
      label: "Shop",
      href: "/shop",
      subItems: [
        { label: "New", href: "/shop?categories=category:New" },
        { label: "All", href: "/shop" },
        { label: "Shorts", href: "/shop?categories=category:Shorts" },
        { label: "Tees", href: "/shop?categories=category:Tees" },
        { label: "Accessories", href: "/shop?categories=category:accessories" },
        { label: "Books", href: "/shop?categories=category:books" },
        { label: "Bottoms", href: "/shop?categories=category:bottoms" },
        { label: "Denim", href: "/shop?categories=category:denim" },
        { label: "Headwear", href: "/shop?categories=category:headwear" },
        { label: "Outerwear", href: "/shop?categories=category:outerwear" },
        { label: "Sweats", href: "/shop?categories=category:sweats" },
        { label: "Tops", href: "/shop?categories=category:tops" },
      ],
    },
    { label: "About", href: "/about" },
  ]

  return (
    <header className="py-0.5 w-full fixed top-0 left-0 z-20 text-base md:p-4">
      <div className="relative flex justify-center items-center border-solid border-2 border-white bg-black py-0.5 px-2 text-white">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col justify-center space-y-1 mr-auto"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="block w-4 h-0.5 bg-white"></span>
          <span className="block w-4 h-0.5 bg-white"></span>
        </button>

        {/* Logo */}
        <Link href="/">
          STT
          {/* <Image
            src="/logo.svg"
            alt="STT"
            width={60}
            height={30}
            priority
            className="h-auto invert"
          /> */}
        </Link>

        {/* Main Navigation */}
        <NavigationMenu className="hidden md:flex flex-grow">
          <NavigationMenuList className="flex items-center space-x-6">
            {menuItems.map((item) => (
              <NavigationMenuItem key={item.label} className="relative group">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 text-sm font-bold"
                >
                  {item.label}
                  {item.subItems && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="8"
                      height="4"
                      viewBox="0 0 10 5"
                      className="transition-transform group-hover:rotate-180"
                    >
                      <path
                        d="M1 1L5.12903 4L9 1"
                        stroke="white"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  )}
                </Link>

                {item.subItems && (
                  <div className="submenu absolute hidden group-hover:flex flex-wrap gap-3 bg-black/90 border-2 border-white p-3 min-w-[180px] top-full left-0">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className="text-gray-300 hover:text-white hover:underline block text-sm font-bold"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Side Items */}
        <div className="flex items-center ml-auto">
          {/* Currency Selector */}
          <button className="hidden md:flex items-center gap-1 text-sm font-bold">
            <span>US/$</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="4"
              viewBox="0 0 10 5"
            >
              <path
                d="M1 1L5.12903 4L9 1"
                stroke="white"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </button>

          {/* Cart */}
          <div className="ml-4">
            <button className="text-sm font-bold hover:underline">Cart</button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/90 z-30 md:hidden pt-8">
          <nav className="p-4">
            {menuItems.map((item) => (
              <div key={item.label} className="py-2">
                <Link
                  href={item.href}
                  className="text-base font-bold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
