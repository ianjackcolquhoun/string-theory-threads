// pages/index.js
import { useState, useEffect } from 'react'
import Link from 'next/link'
import PsychedelicBackground from '@/components/PsychedelicBackground'
import ProductGrid from '@/components/ProductGrid'

export default function Home() {
  const [categories, setCategories] = useState([
    'T-Shirts',
    'Hoodies',
    'Pants',
    'Accessories'
  ])

  return (
    <div className="relative min-h-screen">
      <PsychedelicBackground />
      <div className="relative z-10">
        <h1 className="text-6xl font-bold text-center text-white my-8">
          String Theory Threads
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/category/${category.toLowerCase()}`}
              className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center text-white hover:bg-white/30 transition-all"
            >
              <h2 className="text-2xl font-semibold">{category}</h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
