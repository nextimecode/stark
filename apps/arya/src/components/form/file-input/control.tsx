'use client'

import { ChangeEvent, InputHTMLAttributes } from 'react'
import { useFileInput } from './root'

export type ControlProps = InputHTMLAttributes<HTMLInputElement>

export function Control(props: ControlProps) {
  const { id, multiple, onFilesSelected } = useFileInput()

  function handleFilesSelected(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files?.length) {
      return
    }

    const files = [...event.target.files]

    onFilesSelected(files)
  }

  return (
    <input
      className="sr-only"
      id={id}
      multiple={multiple}
      type="file"
      onChange={handleFilesSelected}
      {...props}
    />
  )
}
