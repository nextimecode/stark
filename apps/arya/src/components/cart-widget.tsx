'use client'

import { ShoppingBag } from 'lucide-react'

export function CartWidget() {
  return (
    <div className="flex items-center gap-2">
      <ShoppingBag className="h-4 w-4" />
      <span className="text-sm">Cart</span>
    </div>
  )
}
