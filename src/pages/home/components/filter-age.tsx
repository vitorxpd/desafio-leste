import { useEffect, useState } from 'react'

import { Slider } from '@/components/ui/slider'

interface IFilterAge {
  params: URLSearchParams
  onCommit: (type: string, value: string) => void
}

export function FilterAge({ params, onCommit }: IFilterAge) {
  const [currentValue, setCurrentValue] = useState<number[]>([0, 100])

  const ageParam = params.get('age') ?? undefined

  const ageParamSplit = ageParam?.split('-')

  const defaultValue = ageParamSplit
    ? [Number(ageParamSplit[0]), Number(ageParamSplit[1])]
    : [0, 100]

  function handleValueCommit(value: number[]) {
    setCurrentValue(value)
  }

  useEffect(() => {
    onCommit('age', `${currentValue[0]}-${currentValue[1]}`)
  }, [currentValue, onCommit])

  return (
    <div className="flex items-center gap-2">
      <span>Age</span>

      <Slider
        className="w-full md:w-[120px]"
        defaultValue={defaultValue}
        min={0}
        max={100}
        onValueCommit={handleValueCommit}
      />

      <span>
        {currentValue[0]}-{currentValue[1]}
      </span>
    </div>
  )
}
