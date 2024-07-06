import { useState } from 'react'

import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'

interface IFilterAgeProps {
  params: URLSearchParams
  disabled: boolean
  onCommit: (type: string, value: string) => void
}

export function FilterAge({ params, disabled, onCommit }: IFilterAgeProps) {
  const [currentValue, setCurrentValue] = useState<number[]>(() => {
    const ageParam = params.get('age') ?? undefined

    const ageParamSplit = ageParam?.split('-')

    return ageParamSplit
      ? [Number(ageParamSplit[0]), Number(ageParamSplit[1])]
      : [0, 100]
  })

  function handleChangeValue(value: number[]) {
    setCurrentValue(value)
  }

  function handleValueCommit(value: number[]) {
    onCommit('age', value.toString().replace(',', '-'))
  }

  return (
    <div
      className={cn(
        'flex items-center gap-2',
        disabled && 'pointer-events-none opacity-50',
      )}
    >
      <span>Age</span>

      <Slider
        defaultValue={currentValue}
        min={0}
        max={100}
        disabled={disabled}
        onValueChange={handleChangeValue}
        onValueCommit={handleValueCommit}
      />

      <span>
        {currentValue[0]}-{currentValue[1]}
      </span>
    </div>
  )
}
