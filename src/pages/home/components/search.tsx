import { Input } from '@/components/ui/input'

interface ISearchProps {
  searchTerm: string
  disabled: boolean
  onChangeSearchTerm: (value: string) => void
}

export function Search({
  searchTerm,
  disabled,
  onChangeSearchTerm,
}: ISearchProps) {
  return (
    <div className="flex justify-center md:justify-end">
      <Input
        type="search"
        placeholder="Search Contacts"
        value={searchTerm}
        disabled={disabled}
        className="w-full"
        onChange={(event) => onChangeSearchTerm(event.target.value)}
      />
    </div>
  )
}
