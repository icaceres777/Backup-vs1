'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useCartStore } from '@/store/cart'  // <-- Importa el store aquí

interface Producto {
  id: string
  nombre: string
  descripcion?: string
  precio: number
  imagenUrl?: string
  stock: number
  categoria: string
}

export default function ProductoDetallePage() {
  const params = useParams()
  const id = params?.id
  const router = useRouter()
  const [producto, setProducto] = useState<Producto | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Extraemos la función addToCart del store
  const addToCart = useCartStore(state => state.addToCart)

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
        const data: Producto = await res.json()
        setProducto(data)
      } catch (err: any) {
        setError(err.message || 'Error al cargar el producto')
      } finally {
        setLoading(false)
      }
    }
    fetchProducto()
  }, [id])

  if (loading) return <p className="text-center mt-10">Cargando producto...</p>
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>
  if (!producto) return null

  // Función para agregar al carrito
  function handleAddToCart() {
    addToCart({
      id: producto!.id,
      nombre: producto!.nombre,
      precio: producto!.precio,
      cantidad: 1,
      imagenUrl: producto!.imagenUrl
    })
    alert(`${producto!.nombre} agregado al carrito!`)
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => router.push('/')}
        className="mb-4 text-yellow-500 hover:underline"
      >
        ← Volver a inicio
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={producto!.imagenUrl || '/placeholder.png'}
          alt={producto!.nombre}
          className="w-full md:w-1/2 object-contain rounded shadow"
        />
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{producto!.nombre}</h1>
            <p className="text-gray-600 mb-4">{producto!.descripcion || 'Sin descripción'}</p>
            <p className="text-yellow-500 text-2xl font-semibold mb-2">
              ${typeof producto!.precio === 'number' ? producto!.precio.toFixed(2) : '0.00'}
            </p>
            <p className="text-gray-500 mb-4">Stock disponible: {producto!.stock}</p>
            <p className="text-sm text-gray-400">Categoría: {producto!.categoria}</p>
          </div>

          <button
            className="bg-yellow-400 text-black py-2 rounded font-semibold hover:bg-yellow-500 transition"
            onClick={handleAddToCart}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </main>
  )
}
