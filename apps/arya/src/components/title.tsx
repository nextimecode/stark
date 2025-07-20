import { ReactNode } from 'react'
import clsx from 'clsx'

type TitleProps = {
  children: ReactNode
  color?:
    | 'blue'
    | 'cyan'
    | 'foreground'
    | 'green'
    | 'pink'
    | 'violet'
    | 'yellow'
  fullWidth?: boolean
  size?: string
}

export const Title = ({
  children,
  color = 'violet',
  fullWidth = false,
  size = 'text-6xl'
}: TitleProps) => {
  const colors = {
    blue: 'bg-linear-to-b from-[#5EA2EF] to-[#0072F5]',
    cyan: 'bg-linear-to-b from-[#00b7fa] to-[#01cfea]',
    foreground: 'bg-linear-to-b from-[#FFFFFF] to-[#4B4B4B]',
    green: 'bg-linear-to-b from-[#6FEE8D] to-[#17c964]',
    pink: 'bg-linear-to-b from-[#FF72E1] to-[#F54C7A]',
    violet: 'bg-linear-to-b from-[#FF1CF7] to-[#5b4cff]',
    yellow: 'bg-linear-to-b from-[#FF705B] to-[#FFB457]'
  }

  return (
    <span
      className={clsx(
        colors[color],
        'bg-clip-text font-semibold text-transparent',
        size,
        fullWidth ? 'w-full' : 'w-auto'
      )}
    >
      {children}
    </span>
  )
}
