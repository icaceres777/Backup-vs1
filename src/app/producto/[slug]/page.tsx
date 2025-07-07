import { notFound } from 'next/navigation'
import ProductoCliente from './components/ProductoCliente'

// Tipos
type Review = {
  user: string
  rating: number
  comment: string
}

type Producto = {
  slug: string
  title: string
  image: string
  price: number
  category: string
  description: string
  stock: number
  sizes: string[]
  reviews: Review[]
}

// Datos mock
const productosMock: Producto[] = [
  {
    slug: 'audifonos-bluetooth',
    title: 'Audífonos Bluetooth',
    image: 'https://m.media-amazon.com/images/I/61NIsUGl+FL._AC_SL1500_.jpg',
    price: 39.99,
    category: 'Electrónica',
    description: 'Audífonos con cancelación de ruido, gran batería y conexión inalámbrica.',
    stock: 18,
    sizes: ['S', 'M', 'L'],
    reviews: [
      { user: 'Sofía', rating: 5, comment: 'La calidad del sonido es brutal 🔊' },
      { user: 'Javi', rating: 4, comment: 'Cómodos y se conectan rápido. Recomendado.' },
    ],
  },
  {
    slug: 'camiseta-oversize',
    title: 'Camiseta Oversize',
    image: 'https://dynamobrand.co/cdn/shop/files/oversize-negra.jpg?v=1689355406',
    price: 21.5,
    category: 'Moda',
    description: 'Camiseta oversize unisex de algodón premium, corte relajado.',
    stock: 12,
    sizes: ['S', 'M', 'L', 'XL'],
    reviews: [
      { user: 'Laura', rating: 5, comment: '¡Me encantó la tela y el fit!' },
      { user: 'Carlos', rating: 4, comment: 'Muy cómoda, aunque pedí una talla menos.' },
    ],
  },
]

export async function generateStaticParams() {
  return productosMock.map((producto) => ({
    slug: producto.slug,
  }))
}

export default function Page({ params }: { params: { slug: string } }) {
  const producto = productosMock.find((p) => p.slug === params.slug)
  if (!producto) return notFound()
  return <ProductoCliente producto={producto} />
}
