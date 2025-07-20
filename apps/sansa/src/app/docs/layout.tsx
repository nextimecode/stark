import type { ReactNode } from 'react'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main className="bg-white text-black dark:bg-white dark:text-black">
      {children}
    </main>
  )
}
