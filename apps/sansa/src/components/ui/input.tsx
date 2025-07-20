import * as React from 'react'
import { cn } from '@/lib/utils'

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'dark:bg-system-gray6 dark:border-system-gray2 block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:placeholder-neutral-500 dark:focus:ring-neutral-600',
          className
        )}
        type={type}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
