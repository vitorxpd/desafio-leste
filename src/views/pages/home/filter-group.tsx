import { ReactNode } from 'react'

export function FilterGroup({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-[320px] sm:max-w-full md:w-[168px] md:max-w-none">
      {children}
    </div>
  )
}
