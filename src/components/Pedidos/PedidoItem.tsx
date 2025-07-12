'use client'

import Image from 'next/image'
import Link from 'next/link'

type Props = {
  id: string
  producto: {
    nombre: string
    imagen: string
  }
  fecha: string
  estado: string
}

const estadosBadge: Record<string, string> = {
  'En fábrica': 'bg-gray-100 text-gray-800',
  'Preparando': 'bg-blue-100 text-blue-800',
  'En aduana': 'bg-yellow-100 text-yellow-800',
  'En camino': 'bg-orange-100 text-orange-800',
  'Retrasado': 'bg-red-100 text-red-800',
  'Entregado': 'bg-green-100 text-green-800'
}

export default function PedidoItem({ id, producto, fecha, estado }: Props) {
  return (
    <div className="border p-4 rounded bg-white shadow-sm flex items-center gap-4">
      <Image
        src={producto.imagen}
        alt={producto.nombre}
        width={80}
        height={80}
        className="rounded object-cover"
      />
      <div className="flex-1">
        <p className="font-semibold text-gray-800">{producto.nombre}</p>
        <p className="text-sm text-gray-600">Pedido #{id}</p>
        <p className="text-sm text-gray-500">Fecha: {fecha}</p>
        <span
          className={`inline-block px-2 py-1 text-xs font-semibold rounded ${estadosBadge[estado]}`}
        >
          {estado}
        </span>
      </div>
      <Link
        href={`/mis-pedidos/${id}`}
        className="text-sm font-medium text-blue-600 hover:underline"
      >
        Ver detalles
      </Link>
    </div>
  )
}
