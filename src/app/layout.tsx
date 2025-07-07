import Header from '@/components/Header/Header'
import SecondaryNav from '@/components/Header/SecondaryNav'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-white scroll-smooth">
        <Header />
        <SecondaryNav />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  )
}
