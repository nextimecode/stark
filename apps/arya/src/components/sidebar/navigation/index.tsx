import {
  BarChart,
  CheckSquare,
  Flag,
  Home,
  SquareStack,
  Users
} from 'lucide-react'
import { HTMLAttributes } from 'react'
import { NavItem } from './nav-item'

export function Navigation(props: HTMLAttributes<HTMLElement>) {
  return (
    <nav {...props} className="flex flex-col gap-0.5">
      <NavItem title="Home" icon={Home} />
      <NavItem title="Dashboard" icon={BarChart} />
      <NavItem title="Projects" icon={SquareStack} />
      <NavItem title="Tasks" icon={CheckSquare} />
      <NavItem title="Reporting" icon={Flag} />
      <NavItem title="Users" icon={Users} />
    </nav>
  )
}
