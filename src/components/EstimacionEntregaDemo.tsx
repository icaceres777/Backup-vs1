'use client'

import { useState } from 'react'

type EstadoPedido = 'En fábrica' | 'En tránsito' | 'Entregado'

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

function calcularFechasRango([minDias, maxDias]: [number, number]): string {
  const hoy = new Date()
  const min = new Date(hoy)
  const max = new Date(hoy)
  min.setDate(hoy.getDate() + minDias)
  max.setDate(hoy.getDate() + maxDias)

  const formato = { day: '2-digit', month: 'short' } as const

  return `${min.toLocaleDateString('es-ES', formato)} – ${max.toLocaleDateString('es-ES', formato)}`
}

export default function EstimacionEntregaDemo() {
  const [estado, setEstado] = useState<EstadoPedido>('En fábrica')
  const rango = diasEntrega[estado]
  const fechas = calcularFechasRango(rango)

  return (
    <div className="p-6 space-y-4 border rounded max-w-md bg-white shadow">
      <h2 className="text-xl font-bold">🕒 Estado del pedido</h2>

      <select
        value={estado}
        onChange={(e) => setEstado(e.target.value as EstadoPedido)}
        className="border p-2 rounded w-full text-sm"
      >
        <option value="En fábrica">🏭 En fábrica</option>
        <option value="En tránsito">🚚 En tránsito</option>
        <option value="Entregado">✅ Entregado</option>
      </select>

      <div className="text-sm text-green-700 font-medium">
        <p>
          {iconos[estado]} {estado}
        </p>
        <p>
          {estado === 'Entregado'
            ? '📦 Pedido ya entregado'
            : `📅 Entrega estimada: ${fechas}`}
        </p>
      </div>
    </div>
  )
}
