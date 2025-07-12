'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Producto {
  id: string
  nombre: string
  precio: number
  imagenUrl?: string
}

export default function ListaProductos() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProductos() {
      try {
        const res = await fetch('/api/productos')
        if (!res.ok) throw new Error('Error cargando productos')
        const data = await res.json()
        setProductos(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProductos()
  }, [])

  if (loading) return <p>Cargando productos...</p>
  if (error) return <p className="text-red-600">{error}</p>

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {productos.map(producto => (
        <Link key={producto.id} href={`/productos/${producto.id}`} className="border rounded p-4 hover:shadow-lg">
          <img src={producto.imagenUrl || '/placeholder.png'} alt={producto.nombre} className="w-full h-48 object-contain mb-2"/>
          <h3 className="font-bold">{producto.nombre}</h3>
          <p className="text-yellow-600">${producto.precio.toFixed(2)}</p>
        </Link>
      ))}
    </div>
  )
}

