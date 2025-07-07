'use client'

import { Menu, Search, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <header className="bg-amazon_blue text-white p-3 shadow-md">
      <div className="flex items-center justify-between gap-4 relative max-w-screen-xl mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-wide hover:text-yellow-400 transition-colors"
        >
          Mercalive
        </Link>

        {/* Botón de menú */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-1 bg-amazon_blue-light px-3 py-2 rounded border border-gray-700 hover:bg-yellow-500 hover:text-black transition-all"
          >
            <Menu size={18} />
            <span className="text-sm">Todo</span>
          </button>

          <div
            className={`absolute top-full left-0 mt-2 bg-white text-black w-48 shadow-lg rounded transition-all duration-200 ease-out transform origin-top ${
              showMenu
                ? 'scale-100 opacity-100'
                : 'scale-95 opacity-0 pointer-events-none'
            }`}
          >
            <ul>
              {['Electrónica', 'Moda', 'Hogar', 'Juguetes'].map((item) => (
                <li
                  key={item}
                  className="px-4 py-2 hover:bg-yellow-100 transition-colors cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Barra de búsqueda */}
        <div className="flex flex-grow max-w-xl mx-4">
          <input
            type="text"
            placeholder="Buscar en Mercalive"
            className="flex-grow p-2 bg-white text-black placeholder-gray-500 border border-gray-300 rounded-l outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
          <button className="bg-yellow-400 p-2 rounded-r hover:bg-yellow-500 transition-colors">
            <Search className="text-black" />
          </button>
        </div>

        {/* Info usuario */}
        <div className="hidden md:flex flex-col text-sm leading-tight cursor-pointer hover:text-yellow-400 transition-colors">
          <span className="text-gray-300">Hola, ISAAC</span>
          <span className="font-bold">Cuenta & Listas</span>
        </div>

        <div className="hidden md:flex flex-col text-sm leading-tight cursor-pointer hover:text-yellow-400 transition-colors">
          <span className="text-gray-300">Devoluciones</span>
          <span className="font-bold">& Pedidos</span>
        </div>

        {/* Carrito */}
        <Link
          href="/cart"
          className="relative flex items-center hover:text-yellow-400 transition-colors"
        >
          <ShoppingCart size={24} />
          <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full px-1">
            0
          </span>
        </Link>
      </div>
    </header>
  )
}
