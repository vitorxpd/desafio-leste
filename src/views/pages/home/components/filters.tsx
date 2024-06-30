import { languages, months } from '@/lib/utils'
import { Button } from '@/views/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/views/components/ui/select'

import { FilterGroup } from './filter-group'

interface IFiltersProps {
  params: URLSearchParams
  disabled: boolean
  onSelect: (type: string, value: string) => void
  onClear: () => void
}

export function Filters({
  params,
  disabled,
  onSelect,
  onClear,
}: IFiltersProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end">
      <FilterGroup>
        <Select
          value={params.get('gender') ?? undefined}
          disabled={disabled}
          onValueChange={(value) => onSelect('gender', value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="M">Male</SelectItem>
            <SelectItem value="F">Female</SelectItem>
          </SelectContent>
        </Select>
      </FilterGroup>

      <FilterGroup>
        <Select
          value={params.get('language') ?? undefined}
          disabled={disabled}
          onValueChange={(value) => onSelect('language', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((language) => (
              <SelectItem key={language} value={language}>
                {language}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterGroup>

      <FilterGroup>
        <Select
          value={params.get('age') ?? undefined}
          disabled={disabled}
          onValueChange={(value) => onSelect('age', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Age" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-10">0 to 10 years old</SelectItem>
            <SelectItem value="11-20">11 to 20 years old</SelectItem>
            <SelectItem value="21-30">21 to 30 years old</SelectItem>
            <SelectItem value="31-40">31 to 40 years old</SelectItem>
            <SelectItem value="41-50">41 to 50 years old</SelectItem>
            <SelectItem value="51-60">51 to 60 years old</SelectItem>
            <SelectItem value="61-70">61 to 70 years old</SelectItem>
            <SelectItem value="71-999">71 years and above</SelectItem>
          </SelectContent>
        </Select>
      </FilterGroup>

      <FilterGroup>
        <Select
          value={params.get('birthday') ?? undefined}
          disabled={disabled}
          onValueChange={(value) => onSelect('birthday', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((month) => (
              <SelectItem key={month} value={month}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterGroup>

      <FilterGroup>
        <Button onClick={onClear} className="w-full" disabled={disabled}>
          Clear Filters
        </Button>
      </FilterGroup>
    </div>
  )
}
