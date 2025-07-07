'use client'

import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex, FaLock } from 'react-icons/fa'
import { SiApplepay, SiGooglepay } from 'react-icons/si'

export default function TrustedSection() {
  return (
    <section className="bg-black text-white py-12 px-6 flex flex-col items-center text-center space-y-8">
      <div className="space-y-2">
        <h3 className="text-xl md:text-2xl font-semibold">Pagos 100% seguros</h3>
        <p className="text-sm md:text-base text-gray-400 max-w-2xl">
          Utilizamos encriptación SSL, pasarelas certificadas y opciones de pago globalmente reconocidas para proteger cada transacción.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 text-4xl text-yellow-400">
        <FaCcVisa title="Visa" />
        <FaCcMastercard title="MasterCard" />
        <FaCcPaypal title="PayPal" />
        <SiApplepay title="Apple Pay" />
        <SiGooglepay title="Google Pay" />
        <FaCcAmex title="American Express" />
        <FaLock title="SSL Seguro" className="text-green-400" />
      </div>

      <p className="text-xs text-gray-500 mt-6 max-w-lg">
        Mercalive es una plataforma real en crecimiento. Todos los pagos están protegidos mediante pasarelas verificadas.  
        © {new Date().getFullYear()} Mercalive. Todos los derechos reservados.
      </p>
    </section>
  )
}
