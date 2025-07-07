'use client'

import { useState } from 'react'
import ProductCard from '@/components/Productos/ProductCard'

const productosMock = [
  {
    title: 'Audífonos Bluetooth',
    image: 'https://m.media-amazon.com/images/I/61NIsUGl+FL._AC_SL1500_.jpg',
    price: 39.99,
    category: 'Electrónica',
  },
  {
    title: 'Camiseta Oversize',
    image: 'https://dynamobrand.co/cdn/shop/files/oversize-negra.jpg?v=1689355406',
    price: 21.5,
    category: 'Moda',
  },
  {
    title: 'Cafetera de acero',
    image: 'https://m.media-amazon.com/images/I/71U4JZz9KDL._AC_SL1500_.jpg',
    price: 49.95,
    category: 'Hogar',
  },
  {
    title: 'Pelota de fútbol',
    image: 'https://m.media-amazon.com/images/I/81vZ9Zz6v-L._AC_SL1500_.jpg',
    price: 19.99,
    category: 'Deportes',
  },
  {
    title: 'Set de maquillaje',
    image: 'https://m.media-amazon.com/images/I/71W9z0n0JZL._AC_SL1500_.jpg',
    price: 28.0,
    category: 'Belleza',
  },
  {
    title: 'Rompecabezas 3D',
    image: 'https://m.media-amazon.com/images/I/81Z1Yz1z5XL._AC_SL1500_.jpg',
    price: 17.5,
    category: 'Juguetes',
  },
  {
    title: 'Libro de cocina',
    image: 'https://m.media-amazon.com/images/I/61kUGc3lTXL._AC_SL1000_.jpg',
    price: 12.75,
    category: 'Libros',
  },
  {
    title: 'Cama para gatos',
    image: 'https://m.media-amazon.com/images/I/71GVZa0cFUL._AC_SL1500_.jpg',
    price: 34.2,
    category: 'Mascotas',
  },
  {
    title: 'Camiseta personalizada',
    image: 'https://m.media-amazon.com/images/I/61jovjd+OmL._AC_SL1500_.jpg',
    price: 29.0,
    category: 'Print on Demand',
  },
]

const categorias = [
  'Todo',
  'Electrónica',
  'Moda',
  'Hogar',
  'Juguetes',
  'Libros',
  'Deportes',
  'Belleza',
  'Mascotas',
  'Print on Demand',
]

export default function ProductosPage() {
  const [categoriaActiva, setCategoriaActiva] = useState('Todo')

  const productosFiltrados =
    categoriaActiva === 'Todo'
      ? productosMock
      : productosMock.filter((p) => p.category === categoriaActiva)

  return (
    <main className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Todos los productos</h1>
        <p className="text-gray-600 mt-2">Explora nuestro catálogo completo.</p>
      </div>

      <div className="flex gap-2 flex-wrap justify-center mt-10 mb-10">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaActiva(cat)}
            className={`px-4 py-2 rounded-full border text-sm ${
              categoriaActiva === cat
                ? 'bg-yellow-400 text-black border-yellow-400'
                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
            } transition`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {productosFiltrados.map((item, index) => (
          <ProductCard
            key={index}
            title={item.title}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </main>
  )
}
