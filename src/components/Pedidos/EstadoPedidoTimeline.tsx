'use client'

import { CheckCircle, CircleDot, Truck, Package } from 'lucide-react'

interface EstadoPedidoTimelineProps {
  estado: string
}

export default function EstadoPedidoTimeline({ estado }: EstadoPedidoTimelineProps) {
  const pasos = [
    { nombre: 'En fábrica', icono: <Package size={20} /> },
    { nombre: 'En tránsito', icono: <Truck size={20} /> },
    { nombre: 'Entregado', icono: <CheckCircle size={20} /> },
  ]

  return (
    <div className="flex items-center gap-4 py-2">
      {pasos.map((paso, index) => {
        const activo = pasos.findIndex(p => p.nombre === estado) >= index

        return (
          <div key={paso.nombre} className="flex items-center gap-2">
            <div className={`text-sm ${activo ? 'text-yellow-400' : 'text-gray-500'}`}>
              {paso.icono}
            </div>
            <span className={`text-xs ${activo ? 'font-bold text-white' : 'text-gray-400'}`}>
              {paso.nombre}
            </span>
            {index < pasos.length - 1 && (
              <span className="text-gray-400 mx-2">→</span>
            )}
          </div>
        )
      })}
    </div>
  )
}
