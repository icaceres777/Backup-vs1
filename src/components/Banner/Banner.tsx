'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const banners = [
  '/images/banner1.jpg',
  '/images/banner2.jpg',
  '/images/banner3.jpg',
]

export default function Banner() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative w-full h-[260px] sm:h-[300px] md:h-[340px] lg:h-[380px] overflow-hidden">
      <Image
        src={banners[current]}
        alt="Banner Mercalive"
        fill
        priority
        className="object-cover transition-opacity duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-white/20 to-transparent px-4 md:px-10 flex items-end pb-6">
        <div>
          <h1 className="text-xl md:text-3xl font-bold text-gray-900 drop-shadow-sm">
            Bienvenido a Mercalive
          </h1>
          <p className="text-xs md:text-base text-gray-800 mt-1">
            Creatividad y confianza para toda la familia
          </p>
        </div>
      </div>
    </section>
  )
}
