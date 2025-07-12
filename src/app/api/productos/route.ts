import { NextRequest, NextResponse } from 'next/server'
import { listarProductos, crearProducto } from '@/lib/productos'
import { z } from 'zod'

// Esquema de validación para el producto
const productoSchema = z.object({
  nombre: z.string().min(1, 'Nombre es requerido'),
  descripcion: z.string().optional(),
  precio: z.number().positive('Precio debe ser positivo'),
  imagenUrl: z.string().url('URL inválida').optional(),
  stock: z.number().int().nonnegative('Stock no puede ser negativo'),
  categoria: z.string().min(1, 'Categoría es requerida'),
})

export async function GET() {
  try {
    const productos = await listarProductos()
    return NextResponse.json(productos)
  } catch (error) {
    return NextResponse.json({ error: 'Error al listar productos' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const datos = productoSchema.parse(body)

    const nuevoProducto = await crearProducto(datos)

    return NextResponse.json(nuevoProducto, { status: 201 })
  } catch (error: any) {
    // Si es error de validación de Zod, envía detalles
    if (error.errors) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    // Otros errores
    return NextResponse.json({ error: error.message || 'Error al crear producto' }, { status: 500 })
  }
}

