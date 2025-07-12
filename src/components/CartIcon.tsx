'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function CartIcon() {
  const [cantidad, setCantidad] = useState(0)

  function actualizarCantidad() {
    if (typeof window === 'undefined') return

    const stored = localStorage.getItem('carrito')
    const carrito = stored ? JSON.parse(stored) : []
    const total = carrito.reduce((sum: number, item: any) => sum + (item?.cantidad || 0), 0)
    console.log('🛒 Carrito actualizado:', carrito, 'Total:', total)
    setCantidad(total)
  }

  useEffect(() => {
    actualizarCantidad()

    window.addEventListener('carritoActualizado', actualizarCantidad)
    window.addEventListener('storage', actualizarCantidad)

    return () => {
      window.removeEventListener('carritoActualizado', actualizarCantidad)
      window.removeEventListener('storage', actualizarCantidad)
    }
  }, [])

  return (
    <Link href="/cart" className="relative text-xl">
      🛒
      {cantidad > 0 && (
        <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {cantidad}
        </span>
      )}
    </Link>
  )
}
