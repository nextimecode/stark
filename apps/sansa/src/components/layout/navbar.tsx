'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { signOut } from 'firebase/auth'
import { User } from 'lucide-react'
import { env } from '@/env'
import { auth } from '@/firebase/client'

export function Navbar() {
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut(auth)
    await fetch(`${env.NEXT_PUBLIC_NED_URL}/api/logout`, {
      credentials: 'include',
      method: 'POST'
    })
    router.push(env.NEXT_PUBLIC_ARYA_URL)
  }

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-14 items-center">
        <Link href="/dashboard" className="flex items-center text-xl font-bold">
          Stark
        </Link>
        <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
          <Link
            href="/"
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/test"
            className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
          >
            Take Test
          </Link>
          <Link
            href="/comparison"
            className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
          >
            Comparisons
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full" size="icon" variant="ghost">
                <User className="h-5 w-5" />
                <Image
                  className="h-6 w-6 rounded-full"
                  width={24}
                  height={24}
                  alt=""
                  src="https://github.com/diego3g.png"
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
