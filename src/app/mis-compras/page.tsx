'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import EstadoPedidoTimeline from '@/components/Pedidos/EstadoPedidoTimeline';
import { Pedido, ProductoPedido, obtenerTodosLosPedidos } from '@/lib/pedidos';

const devoluciones = [
  { id: 'DEV-9876', producto: 'Altavoz Bluetooth X200', estado: 'Evaluación' },
  { id: 'DEV-9877', producto: 'Camiseta Oversize Negra', estado: 'Reembolsada' },
];

export default function MisCompras() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    const pedidosData = obtenerTodosLosPedidos();
    setPedidos(pedidosData);
  }, []);

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">📦 Historial de Compras</h1>

      <section>
        <h2 className="text-lg font-semibold mb-2">🛍️ Tus pedidos</h2>

        {pedidos.length === 0 ? (
          <p className="text-gray-500">No has realizado pedidos todavía.</p>
        ) : (
          <ul className="space-y-3">
            {pedidos.map((pedido) => {
              const totalFormateado =
                typeof pedido.total === 'number' ? pedido.total.toFixed(2) : '0.00';

              return (
                <li key={pedido.id} className="border p-4 rounded shadow space-y-2">
                  <div>
                    <p className="font-medium">Pedido #{pedido.id}</p>
                    <p className="text-sm text-gray-500">
                      Fecha: {new Date(pedido.fecha).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-blue-700">Estado: {pedido.estado}</p>
                    <EstadoPedidoTimeline estado={pedido.estado} />
                    <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
                      {pedido.productos.map((prod: ProductoPedido, i) => (
                        <li key={i}>
                          {prod.nombre} x {prod.cantidad} — ${prod.precio * prod.cantidad}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-1 text-right font-semibold">Total: ${totalFormateado}</p>
                  </div>
                  <div className="text-right">
                    <Link
                      href={`/mis-pedidos/${pedido.id}`}
                      className="text-blue-600 hover:underline text-sm font-semibold"
                    >
                      Ver detalle
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">↩️ Tus devoluciones</h2>
        {devoluciones.length === 0 ? (
          <p className="text-gray-500">No has solicitado devoluciones.</p>
        ) : (
          <ul className="space-y-3">
            {devoluciones.map((d) => (
              <li
                key={d.id}
                className="border p-4 rounded shadow flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{d.producto}</p>
                  <p className="text-sm text-gray-500">Estado: {d.estado}</p>
                </div>
                <Link
                  href={`/devoluciones/${d.id}`}
                  className="text-blue-600 hover:underline text-sm font-semibold"
                >
                  Ver devolución
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
