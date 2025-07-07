'use client'

import Link from 'next/link'

const categories = [
  'Todo',
  'Oferta Electrónica',
  'Moda',
  'Hogar y Cocina',
  'Libros',
  'Deportes',
  'Belleza',
  'Juguetes',
  'Mascotas',
  'Print on Demand',
  'Compra en Amazon',
]

export default function SecondaryNav() {
  return (
    <nav className="bg-amazon_blue-light text-white text-sm px-4 py-2 shadow-sm">
      <div className="max-w-screen-xl mx-auto flex items-center space-x-6 overflow-x-auto scrollbar-hide">
        {categories.map((category, index) => (
          <Link
            key={index}
            href="#"
            className="whitespace-nowrap hover:underline hover:text-yellow-400 transition-colors"
          >
            {category}
          </Link>
        ))}
      </div>
    </nav>
  )
}
