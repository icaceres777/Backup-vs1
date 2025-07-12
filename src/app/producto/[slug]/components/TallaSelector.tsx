'use client'
import clsx from 'clsx'

type TallaSelectorProps = {
  talla: string
  seleccionada: string | null
  onSelect: (valor: string) => void
}

export default function TallaSelector({ talla, seleccionada, onSelect }: TallaSelectorProps) {
  return (
    <button
      onClick={() => onSelect(talla)}
      className={clsx(
        'px-4 py-1 border rounded',
        seleccionada === talla
          ? 'border-yellow-500 bg-yellow-100 text-black'
          : 'border-gray-300 text-gray-600'
      )}
    >
      {talla}
    </button>
  )
}
