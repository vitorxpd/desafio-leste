import { ReactNode } from 'react'

interface IFormGroupProps {
  error: string | undefined
  children: ReactNode
}

export function FormGroup({ error, children }: IFormGroupProps) {
  return (
    <div className="flex flex-col gap-2">
      {children}
      {error && <span className="text-sm text-red-400">{error}</span>}
    </div>
  )
}
