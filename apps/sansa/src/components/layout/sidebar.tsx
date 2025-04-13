'use client'

import type React from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  BarChart2,
  ClipboardCheck,
  LayoutDashboard,
  UserCircle,
  Users,
} from 'lucide-react'

import { cn } from '@/lib/utils'

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items?: {
    href: string
    title: string
    icon: React.ReactNode
  }[]
}

export function Sidebar({ items }: SidebarNavProps) {
  const pathname = usePathname()

  const defaultItems = [
    {
      href: '/',
      title: 'Dashboard',
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    },
    {
      href: '/test',
      title: 'Take Test',
      icon: <ClipboardCheck className="mr-2 h-4 w-4" />,
    },
    {
      href: '/comparison',
      title: 'Comparisons',
      icon: <BarChart2 className="mr-2 h-4 w-4" />,
    },
    {
      href: '/profile',
      title: 'Profile',
      icon: <UserCircle className="mr-2 h-4 w-4" />,
    },
    {
      href: '/invitations',
      title: 'Invitations',
      icon: <Users className="mr-2 h-4 w-4" />,
    },
  ]

  const navItems = items || defaultItems

  return (
    <nav className="hidden md:block w-64 border-r p-4 space-y-4">
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
