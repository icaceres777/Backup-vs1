'use client'

import { FaHeadset } from 'react-icons/fa'
import Link from 'next/link'

export default function SupportButton() {
  return (
    <Link href="#contacto">
      <div className="fixed bottom-6 right-6 z-50 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-3 rounded-full shadow-lg flex items-center gap-2 animate-bounce hover:animate-none transition">
        <FaHeadset className="text-lg" />
        <span className="font-medium text-sm hidden sm:inline">Atención al cliente</span>
      </div>
    </Link>
  )
}
