import { useMemo } from 'react'
import { Button } from '@/components/button'
import { CheckCircle2, Image as ImageIcon, Trash2 } from 'lucide-react'
import { tv, VariantProps } from 'tailwind-variants'

const fileItem = tv({
  defaultVariants: {
    state: 'progress'
  },
  slots: {
    base: 'group flex items-start gap-4 rounded-lg border border-zinc-200 p-4',
    deleteButton: 'text-zinc-500 hover:text-violet-500',
    icon: 'relative rounded-full border-4 border-violet-100 bg-violet-200 p-2 text-violet-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-500'
  },
  variants: {
    state: {
      complete: {
        base: 'border-violet-500 dark:border-violet-300/20'
      },
      error: {
        base: 'bg-error-25 border-error-300 dark:bg-error-500/5 dark:border-error-500/30',
        deleteButton:
          'text-error-700 hover:text-error-900 dark:text-error-400 dark:hover:text-error-300',
        icon: 'border-error-50 bg-error-100 text-error-600 dark:bg-error-500/5 dark:border-error-500/30 dark:text-error-400'
      },
      progress: {
        base: 'dark:border-zinc-700'
      }
    }
  }
})

export interface FileItemProps extends VariantProps<typeof fileItem> {
  name: string
  size: number
  type: string
}

export function FileItem({ name, size, state }: FileItemProps) {
  const uploadProgress = state === 'complete' ? '100%' : '25%'

  const fileSize = useMemo(() => {
    const fileSizeInKB = size / 1024

    if (fileSizeInKB > 1024) {
      const fileSizeInMB = fileSizeInKB / 1024

      return [...fileSizeInMB.toFixed(1), ' MB']
    }

    return [...fileSizeInKB.toFixed(1), ' KB']
  }, [size])

  const { base, deleteButton, icon } = fileItem({ state })

  return (
    <div className={base()}>
      <span className={icon()}>
        <ImageIcon className="h-4 w-4" />
      </span>

      {state === 'error' ? (
        <div className="flex flex-1 flex-col items-start gap-1">
          <div className="flex flex-col leading-relaxed">
            <span className="text-error-700 dark:text-error-400 text-sm font-medium">
              Upload failed, please try again
            </span>
            <span className="text-error-600 dark:text-error-500 text-sm">
              {name}
            </span>
          </div>

          <button
            className="text-error-700 hover:text-error-900 dark:text-error-400 dark:hover:text-error-300 text-sm font-semibold"
            type="button"
          >
            Try again
          </button>
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-start gap-1">
          <div className="flex flex-col leading-relaxed">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-100">
              {name}
            </span>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              {fileSize}
            </span>
          </div>

          <div className="flex w-full items-center gap-3">
            <div className="h-2 flex-1 rounded-full bg-zinc-100 dark:bg-zinc-600">
              <div
                className="h-2 rounded-full bg-violet-600 dark:bg-violet-400"
                style={{ width: uploadProgress }}
              />
            </div>
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {uploadProgress}
            </span>
          </div>
        </div>
      )}

      {state === 'complete' ? (
        <CheckCircle2 className="h-5 w-5 fill-violet-600 text-white dark:fill-violet-300 dark:text-zinc-900" />
      ) : (
        <Button className={deleteButton()} type="button" variant="ghost">
          <Trash2 className="h-5 w-5" />
        </Button>
      )}
    </div>
  )
}
