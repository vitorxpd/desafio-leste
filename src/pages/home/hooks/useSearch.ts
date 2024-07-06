import { useCallback, useMemo, useState } from 'react'

import { IContact } from '@/contexts/contacts-context'

export function useSearch(contacts: IContact[]) {
  const [searchTerm, setSearchTerm] = useState('')

  const searchContacts = useMemo(
    () =>
      contacts.filter((contact) => {
        const name = `${contact.first_name} ${contact.last_name}`
        return name.toLowerCase().includes(searchTerm.toLowerCase())
      }),
    [contacts, searchTerm],
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
