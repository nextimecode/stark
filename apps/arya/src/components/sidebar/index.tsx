'use client'

import * as Collapsible from '@radix-ui/react-collapsible'
import { Cog, LifeBuoy, Menu, Search } from 'lucide-react'
import { Button } from '../button'
import * as Input from '../form/input'
import { Logo } from './logo'
import { Navigation } from './navigation'
import { NavItem } from './navigation/nav-item'
import { Profile } from './profile'
import { UsedSpaceWidget } from './used-space-widget'

export function Sidebar() {
  return (
    <Collapsible.Root className="scrollbar-thin scrollbar-track-zinc-100 scrollbar-thumb-zinc-300 fixed top-0 right-0 left-0 z-20 flex flex-col gap-6 overflow-hidden border-b border-zinc-200 bg-white p-4 data-[state=open]:bottom-0 lg:right-auto lg:bottom-0 lg:h-auto lg:w-80 lg:overflow-auto lg:border-r lg:border-b-0 lg:px-5 lg:py-8 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        <Logo />
        <Collapsible.Trigger asChild className="lg:hidden">
          <Button variant="ghost">
            <Menu className="h-6 w-6 text-zinc-500" />
          </Button>
        </Collapsible.Trigger>
      </div>

      <Collapsible.Content
        asChild
        className="data-[state=closed]:animate-slideUpAndFade data-[state=open]:animate-slideDownAndFade data-[state=closed]:hidden lg:data-[state=closed]:flex"
        forceMount
      >
        <div className="flex flex-1 flex-col gap-6">
          <Input.Root className="mx-1 w-auto">
            <Input.Prefix>
              <Search className="h-5 w-5 text-zinc-500" />
            </Input.Prefix>
            <Input.Control type="text" placeholder="Search" />
          </Input.Root>

          <Navigation />

          <div className="mt-auto flex flex-col gap-6">
            <nav className="flex flex-col gap-1">
              <NavItem title="Support" icon={LifeBuoy} />
              <NavItem title="Settings" icon={Cog} />
            </nav>

            <UsedSpaceWidget />
            <div className="h-px bg-zinc-200 dark:bg-zinc-800" />
            <Profile />
          </div>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
