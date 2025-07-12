'use client'

import { useState, useEffect } from 'react'
import ProductCard from '@/components/Productos/ProductCard'

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
  const [productos, setProductos] = useState([])

  useEffect(() => {
    async function fetchProductos() {
      const res = await fetch('/api/productos')
      const data = await res.json()
      setProductos(data)
    }
    fetchProductos()
  }, [])

  const productosFiltrados =
    categoriaActiva === 'Todo'
      ? productos
      : productos.filter((p) => p.categoria === categoriaActiva)

  return (
    <main className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Todos los productos</h1>
        <p className="text-gray-600 mt-2">Explora nuestra selección</p>
      </div>

      <div className="flex gap-2 flex-wrap justify-center my-4">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaActiva(cat)}
            className={`px-4 py-2 rounded-full border transition ${
              categoriaActiva === cat
                ? 'bg-yellow-400 text-black border-yellow-400'
                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {productosFiltrados.map((item, index) => (
          <ProductCard
            key={index}
            title={item.nombre}
            image={item.imagenUrl}
            price={item.precio}
          />
        ))}
      </div>
    </main>
  )
}

