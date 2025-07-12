'use client'

import { useState } from 'react'

const categorias = [
  'Electrónica',
  'Moda',
  'Hogar',
  'Juguetes',
  'Libros',
  'Deportes',
  'Belleza',
  'Mascotas',
  'Print on Demand',
]

export default function NuevoProductoPage() {
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    imagenUrl: '',
    stock: '',
    categoria: ''
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!form.nombre || !form.precio || !form.stock || !form.categoria) {
      setError('Llena todos los campos obligatorios')
      return
    }
    if (isNaN(Number(form.precio)) || Number(form.precio) <= 0) {
      setError('Precio debe ser un número positivo')
      return
    }
    if (isNaN(Number(form.stock)) || Number(form.stock) < 0) {
      setError('Stock debe ser un número entero no negativo')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.nombre,
          descripcion: form.descripcion,
          precio: Number(form.precio),
          imagenUrl: form.imagenUrl,
          stock: Number(form.stock),
          categoria: form.categoria,
        }),
      })

      if (!res.ok) throw new Error('Error creando producto')

      setSuccess(true)
      setForm({
        nombre: '',
        descripcion: '',
        precio: '',
        imagenUrl: '',
        stock: '',
        categoria: ''
      })
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Crear Nuevo Producto</h1>

      {error && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-3 mb-4 rounded">Producto creado con éxito</div>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="nombre"
          placeholder="Nombre *"
          value={form.nombre}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="precio"
          placeholder="Precio *"
          value={form.precio}
          onChange={handleChange}
          type="number"
          step="0.01"
          className="border p-2 rounded"
        />
        <input
          name="imagenUrl"
          placeholder="URL Imagen"
          value={form.imagenUrl}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="stock"
          placeholder="Stock *"
          value={form.stock}
          onChange={handleChange}
          type="number"
          className="border p-2 rounded"
        />
        <select
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Selecciona categoría *</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-400 text-black py-2 rounded font-semibold hover:bg-yellow-500 transition"
        >
          {loading ? 'Guardando...' : 'Crear Producto'}
        </button>
      </form>
    </main>
  )
}

