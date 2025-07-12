'use client'

import { useCartStore } from '@/store/cart'
import Link from 'next/link'

export default function CarritoPage() {
  const productos = useCartStore(state => state.productos)
  const removeFromCart = useCartStore(state => state.removeFromCart)
  const clearCart = useCartStore(state => state.clearCart)
  const addToCart = useCartStore(state => state.addToCart)

  const total = productos.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

  if (productos.length === 0) {
    return (
      <main className="max-w-4xl mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Tu carrito está vacío</h1>
        <Link href="/" className="text-yellow-500 hover:underline">
          Volver a la tienda
        </Link>
      </main>
    )
  }

  function cambiarCantidad(id: string, nuevaCantidad: number) {
    if (nuevaCantidad <= 0) {
      removeFromCart(id)
    } else {
      const productoExistente = productos.find(p => p.id === id)
      if (productoExistente) {
        addToCart({ ...productoExistente, cantidad: nuevaCantidad })
      }
    }
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Carrito de compras</h1>
      <ul>
        {productos.map(producto => (
          <li key={producto.id} className="flex justify-between items-center border-b py-4">
            <div className="flex items-center gap-4">
              <img
                src={producto.imagenUrl || '/placeholder.png'}
                alt={producto.nombre}
                className="w-20 h-20 object-contain"
                loading="lazy"
              />
              <div>
                <p className="font-semibold">{producto.nombre}</p>
                <p className="text-gray-600">${producto.precio.toFixed(2)}</p>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => cambiarCantidad(producto.id, producto.cantidad - 1)}
                    className="bg-gray-300 px-2 rounded hover:bg-gray-400"
                  >
                    -
                  </button>
                  <span>{producto.cantidad}</span>
                  <button
                    onClick={() => cambiarCantidad(producto.id, producto.cantidad + 1)}
                    className="bg-gray-300 px-2 rounded hover:bg-gray-400"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(producto.id)}
              className="text-red-600 hover:underline"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-between items-center">
        <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
        <button
          onClick={clearCart}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
        >
          Vaciar carrito
        </button>
      </div>
    </main>
  )
}
<Link
  href="/checkout"
  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
>
  Finalizar compra
</Link>
