import './globals.css'
import { Inter } from 'next/font/google'
import MainHeader from '@/components/Header/MainHeader'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mercalive – Tu tienda moderna',
  description: 'Marketplace con confianza, diseño y tecnología',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <MainHeader />
        {children}
      </body>
    </html>
  )
}
