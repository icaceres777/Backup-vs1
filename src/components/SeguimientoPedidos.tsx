'use client'

import { useEffect, useState } from 'react'

type EstadoPedido = 'En fábrica' | 'En tránsito' | 'Entregado'

type Pedido = {
  id: number
  nombre: string
  imagen: string
  precio: number
  estado: EstadoPedido
}

const diasEntrega: Record<EstadoPedido, [number, number]> = {
  'En fábrica': [5, 7],
  'En tránsito': [1, 3],
  'Entregado': [0, 0],
}

const iconos: Record<EstadoPedido, string> = {
  'En fábrica': '🏭',
  'En tránsito': '🚚',
  'Entregado': '✅',
}

function calcularFechas([min, max]: [number, number]) {
  const hoy = new Date()
  const desde = new Date(hoy)
  const hasta = new Date(hoy)
  desde.setDate(hoy.getDate() + min)
  hasta.setDate(hoy.getDate() + max)
  const formato: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short' }
  return `${desde.toLocaleDateString('es-ES', formato)} – ${hasta.toLocaleDateString('es-ES', formato)}`
}

export default function SeguimientoPedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchPedidos() {
      try {
        const res = await fetch('/api/pedidos')
        if (!res.ok) throw new Error('Error al obtener pedidos')
        const data = await res.json()
        setPedidos(data)
      } catch (err) {
        console.error(err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchPedidos()

    // 🔁 Escucha el evento 'pedidosActualizados' y recarga datos
    function actualizar() {
      setLoading(true)
      fetchPedidos()
    }

    window.addEventListener('pedidosActualizados', actualizar)
    return () => window.removeEventListener('pedidosActualizados', actualizar)
  }, [])

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">📦 Seguimiento de tus pedidos</h2>

      {loading ? (
        <p className="text-sm text-gray-500">Cargando pedidos...</p>
      ) : error ? (
        <p className="text-sm text-red-500">Hubo un problema al cargar tus pedidos.</p>
      ) : pedidos.length === 0 ? (
        <p className="text-sm text-gray-500">No tienes pedidos activos por el momento.</p>
      ) : (
        <table className="w-full text-sm border">
          <thead className="bg-gray-100 text-gray-700 text-left">
            <tr>
              <th className="p-2">Producto</th>
              <th className="p-2">Estado</th>
              <th className="p-2">Entrega estimada</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id} className="border-t">
                <td className="p-2 flex items-center gap-3">
                  <img
                    src={pedido.imagen}
                    alt={pedido.nombre}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{pedido.nombre}</p>
<p className="text-xs text-gray-500">${pedido.precio?.toFixed(2) ?? '0.00'}</p>
                  </div>
                </td>
                <td className="p-2">{iconos[pedido.estado]} {pedido.estado}</td>
                <td className="p-2 text-blue-600 font-medium">
                  {pedido.estado === 'Entregado'
                    ? '📬 Pedido entregado'
                    : calcularFechas(diasEntrega[pedido.estado])}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
