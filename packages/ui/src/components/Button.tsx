import type { ReactNode } from 'react'

export interface ButtonProps {
  children: ReactNode
}

export const Button = ({ children }: ButtonProps) => {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      {children}
    </button>
  )
}
