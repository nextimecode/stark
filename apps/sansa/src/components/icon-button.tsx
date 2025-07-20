import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export function IconButton({ className, ...props }: ComponentProps<'button'>) {
  return (
    <button
      className={twMerge(
        'text-secondary hover:text-primary cursor-pointer rounded-md bg-gray-900 p-1.5 transition-colors duration-300 hover:bg-gray-900',
        className
      )}
      {...props}
    />
  )
}
