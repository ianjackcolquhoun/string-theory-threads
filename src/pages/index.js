// pages/index.js
import { useState } from 'react'
import Link from 'next/link'
import StringTheoryBackground from '@/components/StringTheoryBackground'
import ProductGrid from '@/components/ProductGrid'

export default function Home() {
  const categories = [
    { name: 'T-Shirts', icon: '👕' },
    { name: 'Hoodies', icon: '🧥' },
    { name: 'Pants', icon: '👖' },
    { name: 'Accessories', icon: '🎒' }
  ]

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-900 to-black">
      <StringTheoryBackground />
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <header className="py-16 text-center">
          <h1 className="text-7xl font-bold text-white mb-4 tracking-tight">
            String Theory Threads
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Where quantum fashion meets cosmic style
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-12">
          {categories.map(({ name, icon }) => (
            <Link
              key={name}
              href={`/category/${name.toLowerCase()}`}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg p-8 transition-all duration-300 hover:scale-105 hover:from-white/15 hover:to-white/10">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-4xl mb-4 block">{icon}</span>
                <h2 className="text-2xl font-semibold text-white mb-2">{name}</h2>
                <p className="text-blue-200 text-sm">Explore Collection →</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
