'use client'

type Props = {
  estado: string
}

export default function EstimacionEntrega({ estado }: Props) {
  const estimacion: Record<string, string> = {
    'En fábrica': 'Entrega estimada: 5–7 días',
    'En tránsito': 'Entrega estimada: 1–3 días',
    'Entregado': 'Pedido ya entregado',
  }

  return (
    <p className="text-green-700 text-sm font-medium">
      {estado in estimacion ? estimacion[estado] : 'Estado desconocido'}
    </p>
  )
}
