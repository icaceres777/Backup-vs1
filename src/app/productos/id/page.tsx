'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ProductoDetallePage() {
  const router = useRouter()
  const [producto, setProducto] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [id, setId] = useState(null)

  useEffect(() => {
    // Solo correr en cliente
    if (typeof window !== 'undefined') {
      const query = new URLSearchParams(window.location.search)
      const paramId = query.get('id')
      setId(paramId)
    }
  }, [])

  useEffect(() => {
    if (!id) {
      setError('ID de producto no especificado')
      setLoading(false)
      return
    }

    async function fetchProducto() {
      try {
        const res = await fetch(`/api/productos/${id}`)
        if (!res.ok) throw new Error('Producto no encontrado')
        const data = await res.json()
        setProducto(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducto()
  }, [id])

  if (loading) return <p className="text-center mt-10">Cargando producto...</p>
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>
  if (!producto) return null

  return (
    <main className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => router.back()}
        className="mb-4 text-yellow-500 hover:underline"
      >
        ← Volver
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={producto.imagenUrl || '/placeholder.png'}
          alt={producto.nombre}
          className="w-full md:w-1/2 object-contain rounded"
        />
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{producto.nombre}</h1>
            <p className="text-gray-600 mb-4">{producto.descripcion}</p>
            <p className="text-yellow-500 text-2xl font-semibold mb-2">
              ${producto.precio.toFixed(2)}
            </p>
            <p className="text-gray-500 mb-4">Stock disponible: {producto.stock}</p>
            <p className="text-sm text-gray-400">Categoría: {producto.categoria}</p>
          </div>

          <button className="bg-yellow-400 text-black py-2 rounded font-semibold hover:bg-yellow-500 transition mt-6">
            Agregar al carrito
          </button>
        </div>
      </div>
    </main>
  )
}

