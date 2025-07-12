'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Devoluciones() {
  const devoluciones = [
    {
      id: 'DEV-9876',
      producto: {
        nombre: 'Altavoz Bluetooth X200',
        imagen: 'https://m.media-amazon.com/images/I/71GVZa0cFUL._AC_SL1500_.jpg'
      },
      fecha: '07/07/2025',
      motivo: 'Producto defectuoso',
      estado: 'Pendiente'
    },
    {
      id: 'DEV-9877',
      producto: {
        nombre: 'Camiseta Oversize Negra',
        imagen: 'https://dynamobrand.co/cdn/shop/files/oversize-negra.jpg?v=1689355406'
      },
      fecha: '06/07/2025',
      motivo: 'Talla incorrecta',
      estado: 'Reembolsada'
    }
  ]

  const estadoClase: Record<string, string> = {
    'Pendiente': 'bg-yellow-100 text-yellow-800',
    'Evaluación': 'bg-blue-100 text-blue-800',
    'Aprobada': 'bg-green-100 text-green-800',
    'Reembolsada': 'bg-teal-100 text-teal-800',
    'Rechazada': 'bg-red-100 text-red-800'
  }

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">↩️ Mis devoluciones</h1>
      <p className="text-gray-500 mb-4">
        Aquí puedes consultar el estado de tus devoluciones y revisar cada detalle.
      </p>

      {devoluciones.map((d) => (
        <div key={d.id} className="border rounded shadow-sm p-4 bg-white flex items-center gap-4">
          <Image
            src={d.producto.imagen}
            alt={d.producto.nombre}
            width={80}
            height={80}
            className="rounded object-cover"
          />
          <div className="flex-1">
            <p className="font-semibold text-gray-800">{d.producto.nombre}</p>
            <p className="text-sm text-gray-600">Solicitud #{d.id}</p>
            <p className="text-sm text-gray-500">Motivo: {d.motivo}</p>
            <p className="text-sm text-gray-500">Fecha: {d.fecha}</p>
            <span className={`inline-block mt-1 px-2 py-1 text-xs font-semibold rounded ${estadoClase[d.estado]}`}>
              {d.estado}
            </span>
          </div>
          <Link
            href={`/devoluciones/${d.id}`}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Ver detalles
          </Link>
        </div>
      ))}
    </main>
  )
}
