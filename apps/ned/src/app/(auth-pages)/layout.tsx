import { ReactNode } from 'react'

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-7xl flex flex-col gap-12 items-start">{children}</div>
  )
}
