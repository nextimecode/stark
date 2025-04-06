type SpinnerProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12'
}

export const Spinner = ({ size = 'md' }: SpinnerProps) => {
  return (
    <div
      className={`animate-spin rounded-full border-4 border-blue-600 border-t-transparent ${sizeClasses[size]}`}
    />
  )
}
