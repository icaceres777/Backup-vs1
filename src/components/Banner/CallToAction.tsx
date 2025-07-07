'use client'

import Link from 'next/link'
import { FaShoppingBag } from 'react-icons/fa'
import { useEffect, useState } from 'react'

export default function CallToAction() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 100)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <section
      className={`bg-black text-white py-20 px-6 flex flex-col items-center text-center space-y-6 transition-all duration-1000 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
        Encuentra lo que amas
      </h2>
      <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
        Desde productos únicos hasta marcas destacadas. En Mercalive, la confianza y el diseño se encuentran.
      </p>

      <Link href="/productos">
        <button className="group bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-lg py-4 px-8 rounded-full shadow-xl flex items-center gap-3 transform transition-all duration-300 animate-pulse hover:scale-105 hover:animate-none">
          <FaShoppingBag className="text-2xl" />
          ¡Es hora de comprar!
        </button>
      </Link>
    </section>
  )
}
