'use client'

type EstadoPedido = 'En fábrica' | 'En tránsito' | 'Entregado'

const estimacion: Record<EstadoPedido, string> = {
  'En fábrica': 'Entrega estimada: 5–7 días',
  'En tránsito': 'Entrega estimada: 1–3 días',
  'Entregado': 'Pedido ya entregado',
}

export default function EstimacionEntrega({
  estado,
}: {
  estado: EstadoPedido
}) {
  return (
    <p className="text-sm text-green-700">
      {estimacion[estado]}
    </p>
  )
}
