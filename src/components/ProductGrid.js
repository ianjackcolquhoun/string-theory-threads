// components/ProductGrid.js
import Image from 'next/image'

export default function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <div
          key={product.id}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg transition-all duration-300 hover:scale-105"
        >
          <div className="aspect-square overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={400}
              height={400}
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
            <p className="text-blue-200 mb-4">${product.price.toFixed(2)}</p>
            <button
              onClick={() => handleAddToCart(product)}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 px-4 rounded-xl transition-colors duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}