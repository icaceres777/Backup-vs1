'use client'

import Image from 'next/image'
import { notFound } from 'next/navigation'

type Producto = {
  nombre: string
  imagen: string
}

type Devolucion = {
  producto: Producto
  fecha: string // formato DD/MM/YYYY
  motivo: string
  estado: string
  progreso: string[]
}

// 🗃️ Datos simulados de ejemplo
const devoluciones: Record<string, Devolucion> = {
  'DEV-9876': {
    producto: {
      nombre: 'Altavoz Bluetooth X200',
      imagen: 'https://m.media-amazon.com/images/I/71GVZa0cFUL._AC_SL1500_.jpg',
    },
    fecha: '07/07/2025',
    motivo: 'Producto defectuoso',
    estado: 'Evaluación',
    progreso: ['Pendiente', 'Evaluación'],
  },
  'DEV-9877': {
    producto: {
      nombre: 'Camiseta Oversize Negra',
      imagen: 'https://dynamobrand.co/cdn/shop/files/oversize-negra.jpg?v=1689355406',
    },
    fecha: '06/07/2025',
    motivo: 'Talla incorrecta',
    estado: 'Reembolsada',
    progreso: ['Pendiente', 'Evaluación', 'Aprobada', 'Reembolsada'],
  },
}

// 📆 Calcula una fecha estimada sumando días
function calcularFechaEntrega(fechaInicio: string, dias: number) {
  const [dia, mes, año] = fechaInicio.split('/')
  const fecha = new Date(Number(año), Number(mes) - 1, Number(dia))
  fecha.setDate(fecha.getDate() + dias)
  return fecha.toLocaleDateString()
}

// 📦 Componente principal
export default function Page({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const devolucion = devoluciones[id]

  if (!devolucion) return notFound()

  const pasos = ['Pendiente', 'Evaluación', 'Aprobada', 'Reembolsada']
  const icono: Record<string, string> = {
    Pendiente: '🟡',
    Evaluación: '🔍',
    Aprobada: '🟢',
    Reembolsada: '💳',
  }

  // 🧮 Días estimados por estado
  const diasEstimados: Record<string, number> = {
    Pendiente: 10,
    Evaluación: 7,
    Aprobada: 4,
    Reembolsada: 0,
  }

  const dias = diasEstimados[devolucion.estado] ?? 5
  const fechaEstimada = calcularFechaEntrega(devolucion.fecha, dias)

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">↩️ Detalle de devolución</h1>

      <div className="flex items-center gap-4 border p-4 rounded shadow bg-white">
        <Image
          src={devolucion.producto.imagen}
          alt={devolucion.producto.nombre}
          width={100}
          height={100}
          className="rounded object-cover"
        />
        <div>
          <p className="font-semibold">{devolucion.producto.nombre}</p>
          <p className="text-sm text-gray-600">ID: {id}</p>
          <p className="text-sm text-gray-600">Motivo: {devolucion.motivo}</p>
          <p className="text-sm text-gray-500">Fecha de solicitud: {devolucion.fecha}</p>
          <p className="text-sm text-blue-600 font-semibold">Estado actual: {devolucion.estado}</p>
          <p className="text-sm text-green-700">Estimado reembolso: {fechaEstimada}</p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">🔄 Progreso de devolución</h2>
        <ul className="space-y-2">
          {pasos.map((paso) => {
            const activo = devolucion.progreso.includes(paso)
            return (
              <li
                key={paso}
                className={`px-3 py-2 rounded text-sm font-medium flex items-center gap-2 ${
                  activo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'
                }`}
              >
                <span>{icono[paso]}</span>
                {paso}
              </li>
            )
          })}
        </ul>
      </div>
    </main>
  )
}
