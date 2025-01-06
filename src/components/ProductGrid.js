// components/ProductGrid.js
import Image from 'next/image'

export default function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all"
        >
          <div className="relative aspect-square mb-4">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <h3 className="text-xl font-semibold text-white">{product.name}</h3>
          <p className="text-white/80">${product.price.toFixed(2)}</p>
          <button
            onClick={() => handleAddToCart(product)}
            className="w-full mt-4 bg-white/20 hover:bg-white/30 text-white py-2 rounded-lg transition-all"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  )
}
