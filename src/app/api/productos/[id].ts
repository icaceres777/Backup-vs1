import { NextRequest, NextResponse } from 'next/server';
import { obtenerProducto, actualizarProducto, eliminarProducto } from '@/lib/productos';
import { z } from 'zod';

// Esquema para validar la actualización de producto (todos campos opcionales)
const productoUpdateSchema = z.object({
  nombre: z.string().min(1).optional(),
  descripcion: z.string().optional(),
  precio: z.number().positive().optional(),
  imagenUrl: z.string().url().optional(),
  stock: z.number().int().nonnegative().optional(),
  categoria: z.string().min(1).optional(),
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID de producto requerido' }, { status: 400 });

  const producto = obtenerProducto(id);
  if (!producto) return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });

  return NextResponse.json(producto);
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID de producto requerido' }, { status: 400 });

    const body = await request.json();
    const datos = productoUpdateSchema.parse(body);

    const productoActualizado = actualizarProducto(id, datos);
    if (!productoActualizado) return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });

    return NextResponse.json(productoActualizado);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error al actualizar' }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID de producto requerido' }, { status: 400 });

  const eliminado = eliminarProducto(id);
  if (!eliminado) return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });

  return NextResponse.json({ message: 'Producto eliminado correctamente' });
}

