type SpinnerProps = {
  size?: 'lg' | 'md' | 'sm' | 'xl'
}

const sizeClasses = {
  lg: 'h-8 w-8',
  md: 'h-6 w-6',
  sm: 'h-4 w-4',
  xl: 'h-12 w-12'
}

export const Spinner = ({ size = 'md' }: SpinnerProps) => {
  return (
    <div
      className={`animate-spin rounded-full border-4 border-blue-600 border-t-transparent ${sizeClasses[size]}`}
    />
  )
}
