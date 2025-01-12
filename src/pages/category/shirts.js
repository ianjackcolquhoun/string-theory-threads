// pages/category/shirts.js
import { useState, useEffect } from "react"
import Head from "next/head"
import Image from "next/image"
import { motion } from "framer-motion"
import { ShoppingBag } from "lucide-react"

export default function Shirts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/shirts")
      const data = await response.json()
      setProducts(data)
    } catch (err) {
      setError("Failed to load products")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Shirts | String Theory Threads</title>
        <meta
          name="description"
          content="Quantum-inspired shirts for the cosmic minded"
        />
      </Head>

      <div className="container mx-auto px-4 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-white text-center mb-4">
            Shirts
          </h1>
          <p className="text-blue-200 text-center mb-12">
            Quantum-inspired designs for the cosmic minded
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-red-400 text-center py-8">{error}</div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden">
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-white mb-2">
                      {product.name}
                    </h2>
                    <p className="text-blue-200 mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl text-white">
                        ${product.price.toFixed(2)}
                      </span>
                      <button
                        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-colors"
                        onClick={() => {
                          /* Add to cart logic */
                        }}
                      >
                        <ShoppingBag size={20} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </>
  )
}
