import type { ComponentProps } from 'react'

interface InputRootProps extends ComponentProps<'div'> {
  error?: boolean
}

export function InputField({ ...props }: ComponentProps<'input'>) {
  return <input className="flex-1 placeholder-gray-400 outline-0" {...props} />
}

export function InputIcon({ ...props }: ComponentProps<'span'>) {
  return (
    <span
      className="group-data-[error=true]:text-danger text-gray-400 group-focus-within:text-gray-100 group-[&:not(:has(input:placeholder-shown))]:text-gray-100"
      {...props}
    />
  )
}

export function InputRoot({ error = false, ...props }: InputRootProps) {
  return (
    <div
      className="group data-[error=true]:border-danger flex h-12 items-center gap-2 rounded-xl border border-gray-600 bg-gray-800 px-4 text-white focus-within:border-gray-100"
      data-error={error}
      {...props}
    />
  )
}
