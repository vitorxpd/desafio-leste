import { Input } from '@/components/ui/input'

interface ISearchProps {
  searchTerm: string
  searchCount: number
  onChangeSearchTerm: (value: string) => void
}

export function Search({
  searchTerm,
  searchCount,
  onChangeSearchTerm,
}: ISearchProps) {
  return (
    <div className="flex flex-col items-center gap-2 md:items-end">
      <Input
        type="search"
        placeholder="Search Contacts"
        value={searchTerm}
        className="w-[320px] sm:w-full md:w-[220px]"
        onChange={(event) => onChangeSearchTerm(event.target.value)}
      />

      {searchTerm.length > 0 && (
        <p className="text-muted-foreground">Contacts Found: {searchCount}</p>
      )}
    </div>
  )
}
