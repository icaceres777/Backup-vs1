import type { NextApiRequest, NextApiResponse } from 'next'

const productosDestacados = [
  {
    id: '1',
    nombre: 'Auriculares inalámbricos',
    precio: 59.99,
    imagenUrl: 'https://via.placeholder.com/300x300?text=Auriculares',
  },
  {
    id: '2',
    nombre: 'Reloj inteligente',
    precio: 129.99,
    imagenUrl: 'https://via.placeholder.com/300x300?text=Reloj+Inteligente',
  },
  {
    id: '3',
    nombre: 'Cámara deportiva 4K',
    precio: 249.99,
    imagenUrl: 'https://via.placeholder.com/300x300?text=Cámara+4K',
  },
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(productosDestacados)
}

