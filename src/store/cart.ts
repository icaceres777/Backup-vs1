import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ProductoCarrito {
  id: string
  nombre: string
  precio: number
  cantidad: number
  imagenUrl?: string
}

interface CartState {
  productos: ProductoCarrito[]
  addToCart: (producto: ProductoCarrito) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      productos: [],
      addToCart: (nuevoProducto) => {
        const productos = get().productos
        const existente = productos.find(p => p.id === nuevoProducto.id)

        if (existente) {
          set({
            productos: productos.map(p =>
              p.id === nuevoProducto.id
                ? { ...p, cantidad: p.cantidad + nuevoProducto.cantidad }
                : p
            )
          })
        } else {
          set({ productos: [...productos, nuevoProducto] })  
        }  
      },
      removeFromCart: (id) =>
        set({
          productos: get().productos.filter(p => p.id !== id)
        }),
      clearCart: () => set({ productos: [] })
    }),
    {
      name: 'carrito-mercalive', // clave en localStorage
    }
  )
)

