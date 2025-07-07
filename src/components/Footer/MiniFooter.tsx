'use client'

export default function MiniFooter() {
  return (
    <footer className="bg-black text-gray-400 text-sm py-6 px-4 flex flex-col md:flex-row justify-between items-center gap-4">
      <p>© {new Date().getFullYear()} Mercalive. Todos los derechos reservados.</p>
      <div className="flex gap-4">
        <a href="#" className="hover:text-white transition">Política de privacidad</a>
        <a href="#" className="hover:text-white transition">Términos de servicio</a>
        <a href="#" className="hover:text-white transition">Contacto</a>
      </div>
    </footer>
  )
}
