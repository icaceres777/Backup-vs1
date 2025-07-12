export interface Producto {
  id: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  imagenUrl?: string;
  stock: number;
  categoria: string;
  creadoEn: Date;
  actualizadoEn?: Date;
}

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  passwordHash: string;
  rol: 'cliente' | 'vendedor' | 'admin';
  creadoEn: Date;
}

export interface Pedido {
  id: string;
  usuarioId: string;
  productos: { productoId: string; cantidad: number }[];
  total: number;
  estado: 'pendiente' | 'procesando' | 'enviado' | 'entregado' | 'cancelado';
  creadoEn: Date;
  actualizadoEn?: Date;
}

export interface Vendedor {
  id: string;
  nombre: string;
  email: string;
  tienda: string;
  creadoEn: Date;
}

