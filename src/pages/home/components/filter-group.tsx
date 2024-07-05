import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface IFilterGroup {
  className?: string
  children: ReactNode
}

export function FilterGroup({ className, children }: IFilterGroup) {
  return (
    <div
      className={cn(
        'w-full max-w-[320px] sm:max-w-full md:w-[168px] md:max-w-none',
        className,
      )}
    >
      {children}
    </div>
  )
}
