'use client'

import { useState } from 'react'

type EstadoPedido = 'En fábrica' | 'En tránsito' | 'Entregado'

const estimacion: Record<EstadoPedido, string> = {
  'En fábrica': 'Entrega estimada: 5–7 días',
  'En tránsito': 'Entrega estimada: 1–3 días',
  'Entregado': 'Pedido ya entregado',
}

export default function EstimacionEntregaDemo() {
  const [estado, setEstado] = useState<EstadoPedido>('En fábrica')

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

      <p className="text-green-700 font-medium text-sm">
        {estimacion[estado]}
      </p>
    </div>
  )
}
