import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { languages, months } from '@/lib/utils'

import { FilterAge } from './filter-age'
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
          value={params.get('offset') ?? undefined}
          disabled={disabled}
          onValueChange={(value) => onSelect('offset', value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Items Per Page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
          </SelectContent>
        </Select>
      </FilterGroup>

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

      <FilterGroup className="md:w-fit md:max-w-none">
        <FilterAge params={params} disabled={disabled} onCommit={onSelect} />
      </FilterGroup>

      <FilterGroup>
        <Button onClick={onClear} className="w-full" disabled={disabled}>
          Clear Filters
        </Button>
      </FilterGroup>
    </div>
  )
}
