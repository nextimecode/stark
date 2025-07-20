import { InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export function Control(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={twMerge(
        'flex-1 border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600 outline-hidden focus:ring-0 dark:text-zinc-100 dark:placeholder-zinc-400',
        props.className
      )}
    />
  )
}
