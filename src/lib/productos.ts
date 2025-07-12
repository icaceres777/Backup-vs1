import { PrismaClient, Producto } from '@prisma/client';

const prisma = new PrismaClient();

// Listar todos los productos
export async function listarProductos(): Promise<Producto[]> {
  return await prisma.producto.findMany();
}

// Obtener un producto por ID
export async function obtenerProducto(id: string): Promise<Producto | null> {
  return await prisma.producto.findUnique({
    where: { id },
  });
}

// Crear un nuevo producto
export async function crearProducto(
  data: Omit<Producto, 'id' | 'creadoEn' | 'actualizadoEn'> & { creadoEn?: Date }
): Promise<Producto> {
  return await prisma.producto.create({
    data: {
      ...data,
      creadoEn: new Date(),
    },
  });
}

// Actualizar producto existente
export async function actualizarProducto(
  id: string,
  data: Partial<Omit<Producto, 'id' | 'creadoEn' | 'actualizadoEn'>>
): Promise<Producto | null> {
  try {
    return await prisma.producto.update({
      where: { id },
      data: {
        ...data,
        actualizadoEn: new Date(),
      },
    });
  } catch (error) {
    // No encontró producto o error, retornamos null para control de errores
    return null;
  }
}

// Eliminar producto por ID
export async function eliminarProducto(id: string): Promise<boolean> {
  try {
    await prisma.producto.delete({ where: { id } });
    return true;
  } catch (error) {
    // No encontró producto, devolvemos false para control 404
    return false;
  }
}

