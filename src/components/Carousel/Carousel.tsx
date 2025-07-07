// src/components/Header.tsx
'use client';

import { FaSearch, FaShoppingCart } from 'react-icons/fa';

export default function Header() {
  return (
    <header className="bg-[#131921] text-white">
      <div className="flex items-center px-4 py-3 space-x-4">
        {/* Logo */}
        <div className="text-2xl font-bold text-yellow-400">Mercalive</div>

        {/* Barra de búsqueda */}
        <div className="flex-grow hidden sm:flex items-center bg-white rounded-md overflow-hidden">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="flex-grow px-4 py-2 text-black outline-none"
          />
          <button className="bg-yellow-400 px-4 py-2 text-black hover:bg-yellow-500">
            <FaSearch />
          </button>
        </div>

        {/* Iconos */}
        <div className="flex items-center space-x-6 text-sm">
          <div className="cursor-pointer hover:underline">Cuenta & Listas</div>
          <div className="cursor-pointer hover:underline">Pedidos</div>
          <div className="flex items-center cursor-pointer hover:underline">
            <FaShoppingCart className="mr-1" /> Carrito
          </div>
        </div>
      </div>
    </header>
  );
}
