'use client'

import { useEffect, useState } from 'react'
import { ItemCarrito } from '@/types/cart'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function CartPage() {
  const [items, setItems] = useState<ItemCarrito[]>([])
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('carrito')
    const carrito = stored ? JSON.parse(stored) : []
    setItems(carrito)
  }, [])

  const notificarCambio = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('carritoActualizado'))
    }
  }

  function eliminarProducto(index: number) {
    const ok = window.confirm('¿Eliminar este producto del carrito?')
    if (!ok) return

    const nuevo = [...items]
    nuevo.splice(index, 1)
    setItems(nuevo)
    localStorage.setItem('carrito', JSON.stringify(nuevo))
    notificarCambio()
  }

  const total = items.reduce((acc, item) => acc + item.price * item.cantidad, 0)

  return (
    <main className="py-10 px-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Tu carrito</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">Tu carrito está vacío.</p>
      ) : (
        <div className="space-y-6">
          {items.map((item, index) => (
            <div
              key={`${item.slug}-${index}`}
              className="flex items-center justify-between border-b pb-4 animate-fade-in"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="rounded object-cover"
                />
                <div>
                  <h2 className="font-medium">{item.title}</h2>
                  <p className="text-sm text-gray-600">Talla: {item.talla}</p>
                  <p className="text-sm text-gray-600">Cantidad: {item.cantidad}</p>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <p className="font-semibold text-yellow-600">
                  ${(item.price * item.cantidad).toFixed(2)}
                </p>
                <button
                  onClick={() => eliminarProducto(index)}
                  className="text-sm text-red-600 hover:underline mt-2"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-8">
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
            <button
              onClick={() => router.push('/checkout')}
              className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-2 rounded transition"
            >
              Proceder al pago 💳
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
