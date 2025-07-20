'use client'

import { useState } from 'react'
import { TabItem } from '@/components/tab-item'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import * as Tabs from '@radix-ui/react-tabs'

export function SettingsTabs() {
  const [currentTab, setCurrentTab] = useState<string>('tab1')

  return (
    <Tabs.Root value={currentTab} onValueChange={setCurrentTab}>
      <ScrollArea.Root className="w-full" type="hover">
        <ScrollArea.Viewport className="w-full overflow-x-scroll">
          <Tabs.List className="mt-6 flex w-full items-center gap-4 border-b border-zinc-200 dark:border-zinc-800">
            <TabItem
              isSelected={currentTab === 'tab1'}
              title="My details"
              value="tab1"
            />
            <TabItem
              isSelected={currentTab === 'tab2'}
              title="Profile"
              value="tab2"
            />
            <TabItem
              isSelected={currentTab === 'tab3'}
              title="Password"
              value="tab3"
            />
            <TabItem
              isSelected={currentTab === 'tab4'}
              title="Team"
              value="tab4"
            />
            <TabItem
              isSelected={currentTab === 'tab5'}
              title="Plan"
              value="tab5"
            />
            <TabItem
              isSelected={currentTab === 'tab6'}
              title="Billing"
              value="tab6"
            />
            <TabItem
              isSelected={currentTab === 'tab7'}
              title="Email"
              value="tab7"
            />
            <TabItem
              isSelected={currentTab === 'tab8'}
              title="Notifications"
              value="tab8"
            />
            <TabItem
              isSelected={currentTab === 'tab9'}
              title="Integrations"
              value="tab9"
            />
            <TabItem
              isSelected={currentTab === 'tab10'}
              title="API"
              value="tab10"
            />
          </Tabs.List>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="flex h-2.5 touch-none flex-col bg-zinc-100 p-0.5 select-none"
          orientation="horizontal"
        >
          <ScrollArea.Thumb className="relative flex-1 rounded-lg bg-zinc-300 before:absolute before:top-1/2 before:left-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </Tabs.Root>
  )
}
