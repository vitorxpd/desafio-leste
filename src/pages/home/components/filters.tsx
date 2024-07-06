import { ListFilter, X } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { languages } from '@/lib/languages'
import { months } from '@/lib/months'

import { FilterAge } from './filter-age'

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
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover open={isOpen}>
      <PopoverTrigger disabled={disabled} onClick={() => setIsOpen(!isOpen)}>
        <ListFilter />
      </PopoverTrigger>
      <PopoverContent>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg">Filters</h3>

          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          <div>
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
          </div>

          <div>
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
          </div>

          <div>
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
          </div>

          <div>
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
          </div>

          <div>
            <FilterAge
              params={params}
              disabled={disabled}
              onCommit={onSelect}
            />
          </div>

          <div>
            <Button onClick={onClear} className="w-full" disabled={disabled}>
              Clear Filters
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
