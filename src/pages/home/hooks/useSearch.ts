import { useCallback, useDeferredValue, useMemo, useState } from 'react'

import { IContact } from '@/entities/IContact'

export function useSearch(contacts: IContact[]) {
  const [searchTerm, setSearchTerm] = useState('')

  const deferredSearchTerm = useDeferredValue(searchTerm)

  const searchContacts = useMemo(
    () =>
      contacts.filter((contact) => {
        const name = `${contact.first_name} ${contact.last_name}`
        return name.toLowerCase().includes(deferredSearchTerm.toLowerCase())
      }),
    [contacts, deferredSearchTerm],
  )

  const handleChangeSearchTerm = useCallback((value: string) => {
    setSearchTerm(value)
  }, [])

  return {
    searchContacts,
    searchTerm,
    handleChangeSearchTerm,
  }
}
