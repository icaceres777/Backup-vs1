'use client'

import { useEffect, useState } from 'react'
import { Menu, Search, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const categorias = ['Electrónica', 'Moda', 'Hogar', 'Juguetes']

export default function Header() {
  const [showMenu, setShowMenu] = useState(false)
  const [cantidad, setCantidad] = useState(0)
  const [pendientes, setPendientes] = useState(0)
  const router = useRouter()

  function handleCategoriaClick(categoria: string) {
    const slug = categoria.toLowerCase()
    setShowMenu(false)
    router.push(`/categoria/${slug}`)
  }

  function actualizarCantidad() {
    if (typeof window === 'undefined') return
    const stored = localStorage.getItem('carrito')
    const carrito = stored ? JSON.parse(stored) : []
    const total = carrito.reduce(
      (sum: number, item: any) => sum + (item?.cantidad || 0),
      0
    )
    setCantidad(total)
  }

  function obtenerPedidosPendientes(): number {
    if (typeof window === 'undefined') return 0
    const stored = localStorage.getItem('pedidos')
    const pedidos = stored ? JSON.parse(stored) : []
    const activos = pedidos.filter((p: any) => p.estado !== 'Entregado')
    return activos.length
  }

  useEffect(() => {
    actualizarCantidad()
    setPendientes(obtenerPedidosPendientes())

    window.addEventListener('carritoActualizado', actualizarCantidad)
    window.addEventListener('pedidosActualizados', () =>
      setPendientes(obtenerPedidosPendientes())
    )
    window.addEventListener('storage', () => {
      actualizarCantidad()
      setPendientes(obtenerPedidosPendientes())
    })

    return () => {
      window.removeEventListener('carritoActualizado', actualizarCantidad)
      window.removeEventListener('pedidosActualizados', () =>
        setPendientes(obtenerPedidosPendientes())
      )
      window.removeEventListener('storage', () => {
        actualizarCantidad()
        setPendientes(obtenerPedidosPendientes())
      })
    }
  }, [])

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

        {/* Menú desplegable */}
        <div className="relative">
          <button
            onClick={() => setShowMenu((prev) => !prev)}
            className="flex items-center gap-1 bg-amazon_blue-light px-3 py-2 rounded border border-gray-700 hover:bg-yellow-500 hover:text-black transition-all"
          >
            <Menu size={18} />
            <span className="text-sm">Todo</span>
          </button>

          <div
            className={`absolute top-full left-0 mt-2 bg-white text-black w-48 shadow-lg rounded transition-all duration-200 ease-out transform origin-top z-50 ${
              showMenu
                ? 'scale-100 opacity-100'
                : 'scale-95 opacity-0 pointer-events-none'
            }`}
          >
            <ul>
              {categorias.map((item) => (
                <li
                  key={item}
                  onClick={() => handleCategoriaClick(item)}
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

        {/* 🔁 Pedidos & Devoluciones con notificación */}
        <Link
          href="/mis-compras"
          className="relative hidden md:flex flex-col text-sm leading-tight hover:text-yellow-400 transition-colors font-bold"
        >
          <span className="flex items-center gap-1">
            📦 Pedidos
            {pendientes > 0 && (
              <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 font-semibold">
                {pendientes}
              </span>
            )}
          </span>
          <span className="text-gray-300 font-normal text-xs">y devoluciones</span>
        </Link>

        {/* 🟢 Seguimiento Prime */}
        <Link
          href="/test-pedidos"
          className="hidden md:flex flex-col text-sm leading-tight hover:text-yellow-300 transition-colors font-bold"
        >
          <span className="flex items-center gap-1">
            📦 Seguimiento Prime
            {pendientes > 0 && (
              <span className="ml-1 bg-green-500 text-white text-xs rounded-full px-2 py-0.5 font-semibold">
                {pendientes}
              </span>
            )}
          </span>
          <span className="text-gray-300 font-normal text-xs">entregas activas</span>
        </Link>

        {/* Carrito */}
        <Link
          href="/cart"
          className="relative flex items-center hover:text-yellow-400 transition-colors"
        >
          <ShoppingCart size={24} />
          {cantidad > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full px-1">
              {cantidad}
            </span>
          )}
        </Link>
      </div>
    </header>
  )
}
