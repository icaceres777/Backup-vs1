'use client'

import Link from 'next/link'

export default function MainHeader() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-900">Mercalive</Link>

        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
          <Link href="/productos" className="hover:text-black transition">Productos</Link>
          <Link href="/contacto" className="hover:text-black transition">Contacto</Link>
          <Link href="/ayuda" className="hover:text-black transition">Ayuda</Link>
          <Link href="/nosotros" className="hover:text-black transition">Nosotros</Link>
        </nav>
      </div>
    </header>
  )
}
