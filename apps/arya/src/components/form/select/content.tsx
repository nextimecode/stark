'use client'

import * as ScrollArea from '@radix-ui/react-scroll-area'
import * as Select from '@radix-ui/react-select'
import { ComponentProps } from 'react'

export function Content({
  children,
  ...props
}: ComponentProps<typeof Select.Content>) {
  return (
    <Select.Portal>
      <Select.Content
        {...props}
        className="group animate-slideUpAndFade z-10 w-[var(--radix-select-trigger-width)] overflow-hidden rounded-lg border border-zinc-200 bg-white will-change-[opacity,transform] dark:border-zinc-700 dark:bg-zinc-800"
        side="bottom"
        sideOffset={8}
        position="popper"
      >
        <ScrollArea.Root className="h-full w-full" type="auto">
          <Select.Viewport asChild className="max-h-[300px]">
            <ScrollArea.Viewport className="h-full w-full overflow-y-scroll">
              {children}
            </ScrollArea.Viewport>
          </Select.Viewport>

          <ScrollArea.Scrollbar
            className="invisible flex w-2.5 touch-none bg-zinc-100 p-0.5 select-none group-hover:visible dark:bg-zinc-700"
            orientation="vertical"
          >
            <ScrollArea.Thumb className="relative flex-1 rounded-lg bg-zinc-300 before:absolute before:top-1/2 before:left-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] dark:bg-zinc-500" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </Select.Content>
    </Select.Portal>
  )
}
