'use client'

import { User } from 'lucide-react'
import Image from 'next/image'
import { HTMLAttributes, useMemo } from 'react'
import { useFileInput } from './root'

export function ImagePreview(props: HTMLAttributes<HTMLDivElement>) {
  const { files, multiple } = useFileInput()

  if (multiple) {
    throw new Error(
      'Cannot use <ImagePreview /> component alongside multiple file upload input.'
    )
  }

  const previewURL = useMemo(() => {
    if (files.length === 0) {
      return null
    }

    return URL.createObjectURL(files[0])
  }, [files])

  return previewURL === null ? (
    <div
      {...props}
      className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-50 dark:bg-zinc-800"
    >
      <User className="h-8 w-8 text-violet-500 dark:text-violet-300" />
    </div>
  ) : (
    <Image
      className="h-16 w-16 rounded-full bg-violet-50 object-cover dark:bg-zinc-800"
      width={32}
      height={32}
      alt=""
      src={previewURL}
    />
  )
}
