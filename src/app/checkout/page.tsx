'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cart'

export default function CheckoutPage() {
  const router = useRouter()
  const productos = useCartStore(state => state.productos)
  const clearCart = useCartStore(state => state.clearCart)

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [direccion, setDireccion] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const total = productos.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

  async function finalizarCompra() {
    if (!nombre || !email || !direccion) {
      setError('Por favor completa todos los campos.')
      return
    }

    if (productos.length === 0) {
      setError('Tu carrito está vacío.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cliente: { nombre, email, direccion },
          productos,
          total,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data?.mensaje || 'Error al procesar pedido')
      }

      clearCart()
      setSuccess(true)

      setTimeout(() => {
        router.push('/')
      }, 3000)
    } catch (err: any) {
      setError(err.message || 'Hubo un problema al procesar tu pedido.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <main className="max-w-2xl mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold mb-4 text-green-600">¡Compra realizada con éxito!</h1>
        <p>Gracias por tu pedido, serás redirigido a la tienda en breve.</p>
      </main>
    )
  }

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <input
        placeholder="Nombre"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
        disabled={loading}
      />
      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
        disabled={loading}
      />
      <textarea
        placeholder="Dirección"
        value={direccion}
        onChange={e => setDireccion(e.target.value)}
        className="border p-2 w-full mb-4 rounded resize-none"
        disabled={loading}
        rows={3}
      />

      <div className="bg-gray-100 p-4 rounded mb-4">
        <h2 className="font-semibold mb-2">Resumen</h2>
        {productos.map(item => (
          <div key={item.id} className="flex justify-between">
            <span>{item.nombre} x {item.cantidad}</span>
            <span>${(item.precio * item.cantidad).toFixed(2)}</span>
          </div>
        ))}
        <div className="font-bold mt-2 text-right">Total: ${total.toFixed(2)}</div>
      </div>

      <button
        onClick={finalizarCompra}
        disabled={loading}
        className="bg-yellow-500 text-black py-2 px-4 rounded font-semibold hover:bg-yellow-600 transition disabled:opacity-50"
      >
        {loading ? 'Procesando...' : 'Finalizar Compra'}
      </button>
    </main>
  )
}
