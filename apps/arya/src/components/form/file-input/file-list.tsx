'use client'

import { HTMLAttributes } from 'react'
import { FileItem } from './file-item'
import { useFileInput } from './root'

export type FileListProps = HTMLAttributes<HTMLDivElement>

export function FileList(props: FileListProps) {
  const { files } = useFileInput()

  if (files.length === 0) {
    return null
  }

  return (
    <div {...props} className="mt-4 flex flex-col gap-3">
      {files.map(file => {
        return (
          <FileItem
            key={file.name}
            name={file.name}
            size={file.size}
            state="error"
            type={file.type}
          />
        )
      })}
    </div>
  )
}
