import { useState } from 'react'

import { Slider } from '@/components/ui/slider'

interface IFilterAge {
  params: URLSearchParams
  onCommit: (type: string, value: string) => void
}

export function FilterAge({ params, onCommit }: IFilterAge) {
  const [value, setValue] = useState<number[]>(() => {
    const ageParam = params.get('age') ?? undefined

    const ageParamSplit = ageParam?.split('-')

    return ageParamSplit
      ? [Number(ageParamSplit[0]), Number(ageParamSplit[1])]
      : [0, 100]
  })

  function handleValueCommit(commitValue: number[]) {
    onCommit('age', commitValue?.toString().replace(',', '-'))
    setValue(commitValue)
  }

  return (
    <div className="flex items-center gap-2">
      <span>Age</span>

      <Slider
        className="w-full md:w-[120px]"
        defaultValue={value}
        min={0}
        max={100}
        onValueCommit={handleValueCommit}
      />

      <span>
        {value[0]}-{value[1]}
      </span>
    </div>
  )
}
