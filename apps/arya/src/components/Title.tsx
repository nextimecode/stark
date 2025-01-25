import { ReactNode } from 'react'

import clsx from 'clsx'

type TitleProps = {
  color?:
    | 'violet'
    | 'yellow'
    | 'blue'
    | 'cyan'
    | 'green'
    | 'pink'
    | 'foreground'
  size?: string
  fullWidth?: boolean
  children: ReactNode
}

export const Title = ({
  color = 'violet',
  size = 'text-6xl',
  fullWidth = false,
  children
}: TitleProps) => {
  const colors = {
    violet: 'bg-linear-to-b from-[#FF1CF7] to-[#5b4cff]',
    yellow: 'bg-linear-to-b from-[#FF705B] to-[#FFB457]',
    blue: 'bg-linear-to-b from-[#5EA2EF] to-[#0072F5]',
    cyan: 'bg-linear-to-b from-[#00b7fa] to-[#01cfea]',
    green: 'bg-linear-to-b from-[#6FEE8D] to-[#17c964]',
    pink: 'bg-linear-to-b from-[#FF72E1] to-[#F54C7A]',
    foreground: 'bg-linear-to-b from-[#FFFFFF] to-[#4B4B4B]'
  }

  return (
    <span
      className={clsx(
        colors[color],
        'bg-clip-text text-transparent font-semibold',
        size,
        fullWidth ? 'w-full' : 'w-auto'
      )}
    >
      {children}
    </span>
  )
}
