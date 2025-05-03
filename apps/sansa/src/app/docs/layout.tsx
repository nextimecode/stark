import type { ReactNode } from 'react'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex-1 p-6">{children}</main>
  )
}
