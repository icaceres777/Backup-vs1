import Banner from '@/components/Banner/Banner'
import CallToAction from '@/components/Banner/CallToAction'
import TrustedSection from '@/components/Trusted/TrustedSection'
import ServiceHighlights from '@/components/Highlights/ServiceHighlights'
import MiniFooter from '@/components/Footer/MiniFooter'
import SupportButton from '@/components/Floating/SupportButton' // ← Nuevo import

export default function Home() {
  return (
    <main>
      <Banner />
      <CallToAction />
      <TrustedSection />
      <ServiceHighlights />
      <MiniFooter />
      <SupportButton /> {/* ← Botón de soporte siempre visible */}
    </main>
  )
}
