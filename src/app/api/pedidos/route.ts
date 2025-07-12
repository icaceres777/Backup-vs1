// src/app/api/pedidos/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { nombre, email, direccion, productos, total } = await request.json()

    if (!nombre || !email || !direccion || !productos || !total) {
      return NextResponse.json({ mensaje: 'Datos incompletos' }, { status: 400 })
    }

    const pedido = await prisma.pedido.create({
      data: {
        nombre,
        email,
        direccion,
        total,
        productos: {
          create: productos.map((p: any) => ({
            productoId: p.id,
            nombre: p.nombre,
            precio: p.precio,
            cantidad: p.cantidad,
          })),
        },
      },
      include: { productos: true },
    })

    return NextResponse.json({ mensaje: 'Pedido creado', pedido }, { status: 201 })
  } catch (error) {
    console.error('Error en API pedidos:', error)
    return NextResponse.json({ mensaje: 'Error interno del servidor' }, { status: 500 })
  }
}
