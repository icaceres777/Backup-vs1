'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Producto {
  id: string
  nombre: string
  precio: number
  imagenUrl?: string
}

export default function ProductGrid() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProductos() {
      try {
        const res = await fetch('/api/productos')
        if (!res.ok) throw new Error('Error al cargar productos')
        const data = await res.json()
        setProductos(data)
      } catch (err: any) {
        setError(err.message || 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    fetchProductos()
  }, [])

  if (loading) return <p className="text-center mt-10">Cargando productos...</p>
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>
  if (productos.length === 0) return <p className="text-center mt-10">No hay productos disponibles.</p>

  return (
    <section className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Explora nuestros productos</h2>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {productos.map(producto => (
          <Link
            key={producto.id}
            href={`/productos/${producto.id}`}
            className="border rounded-xl p-4 hover:shadow-md transition bg-white"
          >
            <img
              src={producto.imagenUrl || '/placeholder.png'}
              alt={`Imagen de ${producto.nombre}`}
              className="w-full h-48 object-contain mb-4 rounded"
              loading="lazy"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-1">{producto.nombre}</h3>
            <p className="text-yellow-500 text-lg font-bold">${producto.precio.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
