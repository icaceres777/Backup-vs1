'use client'

import EstimacionEntregaDemo from '@/components/EstimacionEntregaDemo'

export default function TestPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">🛒 Seguimiento de pedidos</h1>
          {/* Puedes agregar aquí un botón o logo de Mercalive */}
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700">
            Detalles de entrega
          </h2>
          <p className="text-sm text-gray-500">Aquí puedes ver el estado actual de tu pedido y la fecha estimada de llegada.</p>
        </div>

        <EstimacionEntregaDemo />
      </section>
    </main>
  )
}
