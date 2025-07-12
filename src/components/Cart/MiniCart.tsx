'use client'

import { useEffect, useState, ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ItemCarrito } from '@/types/cart'

type Props = {
  children: ReactNode
}

export default function MiniCart({ children }: Props) {
  const [carrito, setCarrito] = useState<ItemCarrito[]>([])
  const [visible, setVisible] = useState(false)

  function cargarCarrito() {
    const stored = localStorage.getItem('carrito')
    const datos = stored ? JSON.parse(stored) : []
    console.log('🛒 Carrito cargado', datos)
    setCarrito(datos)
  }

  useEffect(() => {
    console.log('✅ MiniCart montado')
    cargarCarrito()

    window.addEventListener('carritoActualizado', cargarCarrito)
    window.addEventListener('storage', cargarCarrito)

    return () => {
      window.removeEventListener('carritoActualizado', cargarCarrito)
      window.removeEventListener('storage', cargarCarrito)
    }
  }, [])

  const total = carrito.reduce((acc, item) => acc + item.price * item.cantidad, 0)

  return (
    <div
      className="relative"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {/* Renderiza lo que envuelve, como el ícono del carrito */}
      {children}

      {/* Panel flotante */}
      {visible && (
        <div className="absolute right-0 mt-2 w-80 bg-white text-black rounded shadow-lg border z-50 p-4">
          <h3 className="text-lg font-semibold mb-3">🛍️ Tu carrito</h3>

          {carrito.length === 0 ? (
            <p className="text-gray-500">Tu carrito está vacío.</p>
          ) : (
            <ul className="divide-y divide-gray-200 max-h-64 overflow-y-auto">
              {carrito.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 py-2">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={48}
                    height={48}
                    className="rounded object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium truncate">{item.title}</p>
                    <p className="text-xs text-gray-500">Talla: {item.talla}</p>
                    <p className="text-sm text-gray-700">
                      {item.cantidad} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {carrito.length > 0 && (
            <div className="mt-4 text-sm">
              <p className="font-semibold text-right mb-2">
                Total: <span className="text-green-700">${total.toFixed(2)}</span>
              </p>
              <div className="flex gap-2">
                <Link
                  href="/cart"
                  className="flex-1 text-center bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded font-semibold transition"
                >
                  Ver carrito
                </Link>
                <button className="flex-1 text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold transition">
                  Pagar
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
