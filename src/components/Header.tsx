'use client'

import Link from 'next/link'
import CategoriaMenu from './CategoriaMenu'
import CartIcon from './CartIcon'

export default function Header() {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">Mercalive</h1>
      <nav className="flex items-center gap-6">
        <CategoriaMenu />

        <Link
          href="/mis-compras"
          className="text-sm text-blue-700 hover:underline font-medium"
        >
          Devoluciones & Pedidos
        </Link>

        <Link
          href="/test-pedidos"
          className="text-sm text-green-700 hover:underline font-medium"
        >
          📦 Seguimiento Prime
        </Link>

        <CartIcon />
      </nav>
    </header>
  )
}
