'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

interface CartContextType {
  addToCart: (productId: number) => void
  items: CartItem[]
}

interface CartItem {
  productId: number
  quantity: number
}

const CartContext = createContext({} as CartContextType)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  function addToCart(productId: number) {
    setCartItems(state => {
      const productInCart = state.some(item => item.productId === productId)

      return productInCart
        ? state.map(item => {
            return item.productId === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          })
        : [...state, { productId, quantity: 1 }]
    })
  }

  return (
    <CartContext.Provider value={{ addToCart, items: cartItems }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
