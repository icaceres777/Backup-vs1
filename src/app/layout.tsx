import Header from '@/components/Header/Header'
import SecondaryNav from '@/components/Header/SecondaryNav'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-white text-black">
        <Header />
        <SecondaryNav />
        <main className="min-h-screen bg-white">{children}</main>
      </body>
    </html>
  )
}
