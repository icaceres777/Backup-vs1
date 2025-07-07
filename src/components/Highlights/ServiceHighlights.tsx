'use client'

import { FaShippingFast, FaExchangeAlt, FaHeadset } from 'react-icons/fa'

export default function ServiceHighlights() {
  return (
    <section className="bg-gray-100 text-gray-800 py-8 px-4 flex flex-col md:flex-row items-center justify-center gap-8 text-center">
      <div className="flex items-center gap-3">
        <FaShippingFast className="text-yellow-500 text-2xl" />
        <div>
          <h4 className="font-semibold">Envío rápido</h4>
          <p className="text-sm text-gray-600">Entregas seguras y sin complicaciones</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <FaExchangeAlt className="text-yellow-500 text-2xl" />
        <div>
          <h4 className="font-semibold">Cambios sin drama</h4>
          <p className="text-sm text-gray-600">Política flexible de devoluciones</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <FaHeadset className="text-yellow-500 text-2xl" />
        <div>
          <h4 className="font-semibold">Atención directa</h4>
          <p className="text-sm text-gray-600">Soporte rápido y personalizado</p>
        </div>
      </div>
    </section>
  )
}
