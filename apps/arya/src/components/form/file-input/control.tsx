'use client'

import { ChangeEvent, InputHTMLAttributes } from 'react'

import { useFileInput } from './root'

export interface ControlProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Control(props: ControlProps) {
  const { onFilesSelected, multiple, id } = useFileInput()

  function handleFilesSelected(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files?.length) {
      return
    }

    const files = [...event.target.files]

    onFilesSelected(files)
  }

  return (
    <input
      id={id}
      type="file"
      className="sr-only"
      onChange={handleFilesSelected}
      multiple={multiple}
      {...props}
    />
  )
}
