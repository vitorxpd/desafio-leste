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
    <div className="mx-auto flex flex-col items-center md:items-end">
      <div className="w-[320px] sm:w-full md:w-[220px]">
        <Input
          type="search"
          placeholder="Search Contacts"
          value={searchTerm}
          className="w-full"
          onChange={(event) => onChangeSearchTerm(event.target.value)}
        />

        {searchTerm.length > 0 && (
          <div className="mt-1 text-right text-muted-foreground">
            <p>Contacts Found: {searchCount}</p>
          </div>
        )}
      </div>
    </div>
  )
}
