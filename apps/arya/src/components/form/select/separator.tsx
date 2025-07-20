'use client'

import * as Select from '@radix-ui/react-select'
import { ComponentProps } from 'react'

export function Separator(props: ComponentProps<typeof Select.Separator>) {
  return <Select.Separator {...props} />
}
