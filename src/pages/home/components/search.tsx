import { Input } from '@/components/ui/input'

interface ISearchProps {
  searchTerm: string

  onChangeSearchTerm: (value: string) => void
}

export function Search({
  searchTerm,

  onChangeSearchTerm,
}: ISearchProps) {
  return (
    <div className="flex justify-center md:justify-end">
      <Input
        type="search"
        placeholder="Search Contacts"
        value={searchTerm}
        className="w-[320px] sm:w-full md:w-[220px]"
        onChange={(event) => onChangeSearchTerm(event.target.value)}
      />
    </div>
  )
}
