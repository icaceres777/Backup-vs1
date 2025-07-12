'use client'
import { motion } from 'framer-motion'

type Review = {
  user: string
  rating: number
  comment: string
}

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="border rounded p-4 bg-white shadow-sm"
    >
      <p className="font-semibold text-gray-800">{review.user}</p>
      <p className="text-yellow-600 text-sm">{"★".repeat(review.rating)}</p>
      <p className="text-gray-700 text-sm mt-1">{review.comment}</p>
    </motion.li>
  )
}
