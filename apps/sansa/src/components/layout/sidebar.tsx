'use client'

import type React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BarChart2,
  ClipboardCheck,
  LayoutDashboard,
  UserCircle,
  Users
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items?: {
    href: string
    icon: React.ReactNode
    title: string
  }[]
}

export function Sidebar({ items }: SidebarNavProps) {
  const pathname = usePathname()

  const defaultItems = [
    {
      href: '/',
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
      title: 'Dashboard'
    },
    {
      href: '/test',
      icon: <ClipboardCheck className="mr-2 h-4 w-4" />,
      title: 'Take Test'
    },
    {
      href: '/comparison',
      icon: <BarChart2 className="mr-2 h-4 w-4" />,
      title: 'Comparisons'
    },
    {
      href: '/profile',
      icon: <UserCircle className="mr-2 h-4 w-4" />,
      title: 'Profile'
    },
    {
      href: '/invitations',
      icon: <Users className="mr-2 h-4 w-4" />,
      title: 'Invitations'
    }
  ]

  const navItems = items || defaultItems

  return (
    <nav className="hidden w-64 space-y-4 border-r p-4 md:block">
      <div className="space-y-1">
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center rounded-md px-3 py-2 text-sm font-medium',
              pathname === item.href
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-accent hover:text-accent-foreground'
            )}
          >
            {item.icon}
            {item.title}
          </Link>
        ))}
      </div>
    </nav>
  )
}
