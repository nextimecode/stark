import type { ComponentProps } from 'react'

import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ComponentProps<'button'> {}

export function IconButton({ className, ...props }: ButtonProps) {
  return (
    <button
      className={twMerge(
        'p-1.5 bg-gray-900 text-secondary rounded-md cursor-pointer transition-colors duration-300 hover:bg-gray-900 hover:text-primary',
        className
      )}
      {...props}
    />
  )
}
