'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { motion } from 'framer-motion'

interface TabItemProps {
  isSelected: boolean
  title: string
  value: string
}

export function TabItem({ isSelected, title, value }: TabItemProps) {
  return (
    <Tabs.Trigger
      className="group relative px-1 pb-4 text-sm leading-5 font-medium text-zinc-500 outline-hidden hover:text-violet-700 data-[state=active]:text-violet-700 dark:text-zinc-400 dark:hover:text-zinc-100 dark:data-[state=active]:text-zinc-100"
      value={value}
    >
      <span className="rounded-sm whitespace-nowrap group-focus-visible:ring-2 group-focus-visible:ring-violet-400 group-focus-visible:ring-offset-4">
        {title}
      </span>

      {isSelected && (
        <motion.div
          className="absolute right-0 -bottom-px left-0 h-0.5 bg-violet-700 dark:bg-violet-400"
          layoutId="activeTab"
        />
      )}
    </Tabs.Trigger>
  )
}
