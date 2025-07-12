'use client'

import { useParams } from 'next/navigation'
import EstadoPedidoTimeline from '@/components/Pedidos/EstadoPedidoTimeline'
import Link from 'next/link'

export default function Page() {
  const params = useParams()
  const id = params?.id

  const pedido = {
    id,
    producto: 'Smartwatch Galaxy Fit',
    fecha: '05/07/2025',
    estado: 'En tránsito',
    direccion: 'Av. Winston Churchill, Torre Titanium, Santo Domingo',
    productos: [
      { nombre: 'Smartwatch Galaxy Fit', cantidad: 1, precio: 129.99 },
      { nombre: 'Protector de pantalla', cantidad: 2, precio: 9.99 },
    ],
  }

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">🛍️ Pedido #{pedido.id}</h1>

      <section>
        <p className="text-sm text-blue-700 font-semibold">Estado actual: {pedido.estado}</p>
        <EstadoPedidoTimeline estado={pedido.estado} />
      </section>

      <section>
        <h2 className="text-lg font-semibold">📋 Productos</h2>
        <ul className="space-y-2">
          {pedido.productos.map((item) => (
            <li key={item.nombre} className="text-sm text-gray-700">
              {item.cantidad} × {item.nombre} — ${item.precio.toFixed(2)}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold">📍 Envío</h2>
        <p className="text-sm text-gray-700">{pedido.direccion}</p>
      </section>

      <section className="flex gap-4 pt-4">
        <button className="bg-yellow-400 text-black text-sm font-medium px-4 py-2 rounded hover:bg-yellow-500 transition">
          Iniciar devolución
        </button>
        <Link
          href="/soporte"
          className="text-sm text-blue-600 underline hover:text-blue-800 font-medium"
        >
          Contactar soporte
        </Link>
      </section>
    </main>
  )
}
