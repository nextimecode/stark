export interface ButtonProps {
  children: React.ReactNode
}

export const Button = ({ children }: ButtonProps) => {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      {children}
    </button>
  )
}
