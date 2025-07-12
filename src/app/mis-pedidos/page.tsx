export default function MisPedidos() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📦 Mis pedidos</h1>
      <p className="text-gray-500 mb-2">Aquí puedes ver el estado de tus pedidos.</p>

      <div className="space-y-4">
        <div className="border p-4 rounded bg-gray-50">
          <p className="font-semibold">Pedido #12345</p>
          <p className="text-sm text-gray-600">Estado: <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">En fábrica</span></p>
          <p className="text-sm text-gray-500">Fecha: 09/07/2025</p>
        </div>
      </div>
    </main>
  )
}
