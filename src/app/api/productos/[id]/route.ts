import { NextRequest, NextResponse } from 'next/server';
import { obtenerProducto, actualizarProducto, eliminarProducto } from '@/lib/productos';
import { z } from 'zod';

const productoUpdateSchema = z.object({
  nombre: z.string().min(1).optional(),
  descripcion: z.string().optional(),
  precio: z.number().positive().optional(),
  imagenUrl: z.string().url().optional(),
  stock: z.number().int().nonnegative().optional(),
  categoria: z.string().min(1).optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const producto = await obtenerProducto(id);
  if (!producto) {
    return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
  }

  return NextResponse.json(producto);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    const datos = productoUpdateSchema.parse(body);

    const productoActualizado = await actualizarProducto(id, datos);
    if (!productoActualizado) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    return NextResponse.json(productoActualizado);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error en actualización' }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const eliminado = await eliminarProducto(id);
  if (!eliminado) {
    return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
  }
  return NextResponse.json({ message: 'Producto eliminado correctamente' });
}

