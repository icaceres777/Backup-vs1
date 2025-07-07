'use client'
import { useEffect, useState } from 'react'

// Tipos
type Review = {
  user: string
  rating: number
  comment: string
}

type Producto = {
  slug: string
  title: string
  image: string
  price: number
  category: string
  description: string
  stock: number
  sizes: string[]
  reviews: Review[]
}

export default function ProductoCliente({ producto }: { producto: Producto }) {
  const slug = producto.slug

  const [tallaSeleccionada, setTallaSeleccionada] = useState<string | null>(null)
  const [formData, setFormData] = useState({ nombre: '', comentario: '', rating: 5 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const stored = mounted
    ? localStorage.getItem(`resenas-${slug}`)
    : null

  const [nuevasReseñas, setNuevasReseñas] = useState<Review[]>(
    stored ? JSON.parse(stored) : producto.reviews
  )

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const nueva: Review = {
      user: formData.nombre.trim() || 'Anónimo',
      rating: Number(formData.rating),
      comment: formData.comentario.trim(),
    }
    setNuevasReseñas([nueva, ...nuevasReseñas])
    setFormData({ nombre: '', comentario: '', rating: 5 })
  }

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(`resenas-${slug}`, JSON.stringify(nuevasReseñas))
    }
  }, [nuevasReseñas, slug, mounted])

  return (
    <main className="py-16 px-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <img
          src={producto.image}
          alt={producto.title}
          className="w-full h-[400px] object-cover rounded-lg shadow"
        />

        <div>
          <h1 className="text-3xl font-bold text-gray-900">{producto.title}</h1>
          <p className="text-yellow-600 text-2xl mt-2 font-semibold">
            ${producto.price.toFixed(2)}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            {producto.stock > 0
              ? `En stock (${producto.stock} disponibles)`
              : 'Agotado'}
          </p>

          <div className="mt-4">
            <span className="text-sm text-gray-700">Talla:</span>
            <div className="flex gap-2 mt-2">
              {producto.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setTallaSeleccionada(size)}
                  className={`px-4 py-1 border rounded ${
                    tallaSeleccionada === size
                      ? 'border-yellow-500 bg-yellow-100 text-black'
                      : 'border-gray-300 text-gray-600'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <p className="text-gray-700 mt-6 leading-relaxed">{producto.description}</p>

          <button
            disabled
            className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-6 rounded transition disabled:opacity-60"
          >
            Añadir al carrito (pronto)
          </button>
        </div>
      </div>

      {/* Reseñas */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold mb-4">Reseñas</h2>

        {!mounted ? (
          <p className="text-gray-400">Cargando reseñas...</p>
        ) : nuevasReseñas.length > 0 ? (
          <ul className="space-y-4">
            {nuevasReseñas.map((review, i) => (
              <li key={i} className="border rounded p-4 bg-white shadow-sm">
                <p className="font-semibold text-gray-800">{review.user}</p>
                <p className="text-yellow-600 text-sm">{"★".repeat(review.rating)}</p>
                <p className="text-gray-700 text-sm mt-1">{review.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Este producto aún no tiene reseñas.</p>
        )}

        <div className="mt-12">
          <h3 className="text-lg font-semibold mb-4">Dejar una reseña</h3>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <input
              type="text"
              placeholder="Tu nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className="w-full border rounded px-4 py-2"
            />
            <textarea
              placeholder="Tu comentario"
              value={formData.comentario}
              onChange={(e) => setFormData({ ...formData, comentario: e.target.value })}
              className="w-full border rounded px-4 py-2"
              rows={4}
            />
            <div>
              <label className="mr-2 font-medium text-sm text-gray-700">Calificación:</label>
              <select
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                className="border rounded px-2 py-1"
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} ★
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-4 rounded"
            >
              Enviar reseña
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
