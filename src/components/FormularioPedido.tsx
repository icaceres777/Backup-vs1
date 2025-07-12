'use client'

import { useState } from 'react'

export default function FormularioPedido() {
  const [pedido, setPedido] = useState({
    nombre: '',
    imagen: '',
    precio: '',
    estado: 'En fábrica',
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const nuevoPedido = {
      id: Date.now(),
      nombre: pedido.nombre,
      imagen: pedido.imagen,
      precio: parseFloat(pedido.precio),
      estado: pedido.estado,
    }

    const res = await fetch('/api/pedidos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoPedido),
    })

    if (res.ok) {
      alert('✅ Pedido creado correctamente')
      window.dispatchEvent(new Event('pedidosActualizados'))
      setPedido({ nombre: '', imagen: '', precio: '', estado: 'En fábrica' })
    } else {
      alert('❌ Error al crear pedido')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-4 rounded shadow space-y-4">
      <h2 className="text-xl font-bold text-gray-800">🆕 Crear pedido</h2>

      <input
        type="text"
        placeholder="Nombre del producto"
        value={pedido.nombre}
        onChange={(e) => setPedido({ ...pedido, nombre: e.target.value })}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        placeholder="URL de imagen"
        value={pedido.imagen}
        onChange={(e) => setPedido({ ...pedido, imagen: e.target.value })}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="number"
        placeholder="Precio"
        value={pedido.precio}
        onChange={(e) => setPedido({ ...pedido, precio: e.target.value })}
        required
        className="w-full p-2 border rounded"
      />

      <select
        value={pedido.estado}
        onChange={(e) => setPedido({ ...pedido, estado: e.target.value })}
        className="w-full p-2 border rounded"
      >
        <option>En fábrica</option>
        <option>En tránsito</option>
        <option>Entregado</option>
      </select>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Crear pedido 📦
      </button>
    </form>
  )
}
