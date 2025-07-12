'use client'

import { useState, useEffect } from 'react'

type Producto = {
  nombre: string
  descripcion: string
  precio: number
  imagenUrl: string
  stock: number
  categoria: string
}

type Props = {
  initialData?: Producto
  onSubmit: (data: Producto) => void
}

export default function ProductoForm({ initialData, onSubmit }: Props) {
  const [form, setForm] = useState<Producto>({
    nombre: '',
    descripcion: '',
    precio: 0,
    imagenUrl: '',
    stock: 0,
    categoria: '',
  })

  useEffect(() => {
    if (initialData) {
      setForm(initialData)
    }
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: name === 'precio' || name === 'stock' ? Number(value) : value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-4 bg-white rounded-xl shadow">
      <input className="w-full border px-4 py-2" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required />
      <textarea className="w-full border px-4 py-2" name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción" />
      <input className="w-full border px-4 py-2" type="number" name="precio" value={form.precio} onChange={handleChange} placeholder="Precio" />
      <input className="w-full border px-4 py-2" name="imagenUrl" value={form.imagenUrl} onChange={handleChange} placeholder="URL de imagen" />
      <input className="w-full border px-4 py-2" type="number" name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" />
      <input className="w-full border px-4 py-2" name="categoria" value={form.categoria} onChange={handleChange} placeholder="Categoría" />
      <button className="bg-black text-white px-4 py-2 rounded" type="submit">Guardar</button>
    </form>
  )
}

