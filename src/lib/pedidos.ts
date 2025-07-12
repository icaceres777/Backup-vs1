import { v4 as uuidv4 } from "uuid";

// Define tipos primero
export type ProductoPedido = {
  nombre: string;
  precio: number;
  cantidad: number;
};

export type Pedido = {
  id: string;
  nombre: string;
  direccion: string;
  email: string;
  productos: ProductoPedido[];
  total: number;
  fecha: string;
  estado: string;
};

// Después declara la variable de pedidos (array)
const pedidos: Pedido[] = [
  {
    id: uuidv4(),
    nombre: "Isaac",
    direccion: "Calle Falsa 123",
    email: "isaac@email.com",
    productos: [
      { nombre: "Altavoz Bluetooth X200", precio: 50, cantidad: 1 },
      { nombre: "Camiseta Oversize Negra", precio: 20, cantidad: 2 },
    ],
    total: 90,
    fecha: new Date().toISOString(),
    estado: "En fábrica",
  },
];

// Función para crear un nuevo pedido
export function crearPedido(
  data: Omit<Pedido, "id" | "fecha" | "estado">
): Pedido {
  const nuevo: Pedido = {
    ...data,
    id: uuidv4(),
    fecha: new Date().toISOString(),
    estado: "En fábrica",
  };
  pedidos.push(nuevo);
  return nuevo;
}

// Función para obtener un pedido por ID
export function obtenerPedido(id: string): Pedido | undefined {
  return pedidos.find((p) => p.id === id);
}

// Función para obtener todos los pedidos
export function obtenerTodosLosPedidos(): Pedido[] {
  return pedidos;
}
