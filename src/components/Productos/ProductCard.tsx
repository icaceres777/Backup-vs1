'use client'

import Link from 'next/link'

type Props = {
  title: string
  image: string
  price: number
}

const slugify = (text: string) =>
  text.toLowerCase()
      .normalize('NFD')                   // quita acentos
      .replace(/[\u0300-\u036f]/g, '')   // quita marcas diacríticas
      .replace(/\s+/g, '-')              // reemplaza espacios por guiones

export default function ProductCard({ title, image, price }: Props) {
  const slug = slugify(title)

  return (
    <Link href={`/producto/${slug}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-yellow-600 font-bold mt-2">${price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  )
}
