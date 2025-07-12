'use client'

import SeguimientoPedidos from '@/components/SeguimientoPedidos'
import FormularioPedido from '@/components/FormularioPedido'

export default function TestPedidosPage() {
  const isDev = process.env.NODE_ENV === 'development'

  function insertarPedidosDemo() {
    const pedidos = [
      {
        id: 101,
        nombre: 'Camiseta gráfica',
        imagen: '/camiseta.png',
        precio: 24.99,
        estado: 'En fábrica',
      },
      {
        id: 102,
        nombre: 'Gorra urbana',
        imagen: '/gorra.png',
        precio: 14.5,
        estado: 'En tránsito',
      },
      {
        id: 103,
        nombre: 'Bolso táctico',
        imagen: '/bolso.png',
        precio: 59,
        estado: 'Entregado',
      }
    ]

    localStorage.setItem('pedidos', JSON.stringify(pedidos))
    window.dispatchEvent(new Event('pedidosActualizados'))
    alert('📦 Pedidos demo insertados correctamente.')
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 space-y-6">
      <FormularioPedido />

      {isDev && (
        <button
          onClick={insertarPedidosDemo}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Insertar pedidos demo 📦
        </button>
      )}

      <SeguimientoPedidos />
    </main>
  )
}
