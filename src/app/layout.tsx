import Header from '@/components/Header/Header' // ✅ Header que incluye el CartIcon
import SecondaryNav from '@/components/Header/SecondaryNav'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-white scroll-smooth">
        {/* 🧭 Cabecera principal con logo, categorías y carrito */}
        <Header />
        
        {/* 🧩 Navegación secundaria si estás usando filtros o secciones */}
        <SecondaryNav />
        
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
