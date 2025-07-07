'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { useEffect } from 'react'
import Image from 'next/image'

const images = [
  '/banner1.jpg',
  '/banner2.jpg',
  '/banner3.jpg',
]

export default function Carousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true })

  useEffect(() => {
    const interval = setInterval(() => {
      // @ts-ignore
      emblaRef.current?.scrollNext()
    }, 4000)
    return () => clearInterval(interval)
  }, [emblaRef])

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {images.map((src, index) => (
          <div className="flex-[0_0_100%] relative h-64 md:h-80" key={index}>
            <Image
              src={src}
              alt={`Banner ${index + 1}`}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
