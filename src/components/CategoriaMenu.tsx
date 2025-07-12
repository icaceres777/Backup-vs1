'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const categorias = ['Ropa', 'Accesorios', 'Tecnología', 'Hogar', 'Juguetes']

export default function CategoriaMenu() {
  const [abierto, setAbierto] = useState(false)

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setAbierto(!abierto)}
        className="text-sm font-medium px-4 py-2 rounded hover:bg-yellow-100 transition"
      >
        Todo ▾
      </button>

      <AnimatePresence>
        {abierto && (
          <motion.ul
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-10 bg-white shadow rounded mt-2 w-40 border"
          >
            {categorias.map((categoria) => (
              <li
                key={categoria}
                className="px-4 py-2 hover:bg-yellow-50 text-sm cursor-pointer"
              >
                {categoria}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
