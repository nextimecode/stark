'use client'

import {
  createContext,
  HTMLAttributes,
  useContext,
  useId,
  useState
} from 'react'
import { twMerge } from 'tailwind-merge'

export interface RootProps extends HTMLAttributes<HTMLDivElement> {
  multiple?: boolean
}

interface FileInputContextType {
  files: File[]
  id: string
  multiple: boolean
  onFilesSelected: (files: File[]) => void
}

const FileInputContext = createContext({} as FileInputContextType)

export function Root({ id, multiple = false, ...props }: RootProps) {
  const customId = useId()
  const [files, setFiles] = useState<File[]>([])

  return (
    <FileInputContext.Provider
      value={{ files, id: id ?? customId, multiple, onFilesSelected: setFiles }}
    >
      <div {...props} className={twMerge('group w-full', props.className)} />
    </FileInputContext.Provider>
  )
}

export const useFileInput = () => useContext(FileInputContext)
