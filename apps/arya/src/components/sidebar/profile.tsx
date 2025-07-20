import Image from 'next/image'
import { LogOut } from 'lucide-react'
import { Button } from '../button'

export function Profile() {
  return (
    <div className="flex items-center gap-3">
      <Image
        className="h-10 w-10 rounded-full"
        width={40}
        height={40}
        alt="alt"
        src="https://github.com/diego3g.png"
      />

      <div className="flex flex-col">
        <span className="block text-sm font-semibold text-zinc-700 dark:text-zinc-100">
          Diego Fernandes
        </span>
        <span className="block text-sm text-zinc-500 dark:text-zinc-400">
          diego.schell.f@gmail.com
        </span>
      </div>
      <Button className="ml-auto" variant="ghost">
        <LogOut className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
      </Button>
    </div>
  )
}
