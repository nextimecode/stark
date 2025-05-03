import type { ReactNode } from 'react'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <main className="bg-white dark:bg-white text-black dark:text-black">{children}</main>
}
