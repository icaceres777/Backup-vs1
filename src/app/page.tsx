'use client' // Para usar hooks si se necesitan en futuros ajustes

import Banner from '@/components/Banner/Banner'
import CallToAction from '@/components/Banner/CallToAction'
import TrustedSection from '@/components/Trusted/TrustedSection'
import ServiceHighlights from '@/components/Highlights/ServiceHighlights'
import ProductGrid from '@/components/Productos/ProductGrid' // Grilla de productos lista para producción
import MiniFooter from '@/components/Footer/MiniFooter'
import SupportButton from '@/components/Floating/SupportButton'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Banner />
      <CallToAction />
      <TrustedSection />
      <ServiceHighlights />

      <section className="my-8 px-4 md:px-8">
        <ProductGrid />
      </section>

      <MiniFooter />
      <SupportButton />
    </main>
  )
}

