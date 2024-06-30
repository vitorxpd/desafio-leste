import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useContact } from '@/contexts/contact-context'
import { calculateAge, isMobile, months } from '@/lib/utils'

export function useFilters() {
  const [filterParams, setFilterParams] = useSearchParams()
  const [filtersIsVisible, setFiltersIsVisible] = useState(!isMobile)

  const { contacts } = useContact()

  const handleToggleFilters = useCallback(() => {
    setFiltersIsVisible((state) => !state)
  }, [])

  const handleSelectFilter = useCallback(
    (type: string, value: string) => {
      let prevFilters: { [key: string]: string } = {}

      filterParams.forEach((prevValue, prevKey) => {
        prevFilters = {
          ...prevFilters,
          [prevKey]: prevValue,
        }
      })

      setFilterParams({ ...prevFilters, [type]: value })
    },
    [filterParams, setFilterParams],
  )

  const handleClearFilters = useCallback(() => {
    setFilterParams(undefined)
  }, [setFilterParams])

  const filteredContacts = useMemo(() => {
    const gender = filterParams.get('gender')
    const language = filterParams.get('language')
    const age = filterParams.get('age')
    const birthday = filterParams.get('birthday')

    let newContacts = contacts

    if (gender) {
      newContacts = newContacts.filter((contact) => contact.gender === gender)
    }

    if (language) {
      newContacts = newContacts.filter(
        (contact) => contact.language === language,
      )
    }

    if (age) {
      const minRange = Number(age.split('-')[0])
      const maxRange = Number(age.split('-')[1])

      newContacts = newContacts.filter((contact) => {
        const age = calculateAge(contact.birthday)
        const isInRange = age >= minRange && age <= maxRange

        if (isInRange) {
          return contact
        }
      })
    }

    if (birthday) {
      newContacts = newContacts.filter((contact) => {
        const monthIndex = new Date(contact.birthday).getMonth()
        const monthName = months[monthIndex]

        if (monthName === birthday) {
          return contact
        }
      })
    }

    return newContacts
  }, [contacts, filterParams])

  useEffect(() => {
    if (contacts.length === 0) {
      handleClearFilters()
    }
  }, [contacts, handleClearFilters])

  return {
    filterParams,
    filtersIsVisible,
    filteredContacts,
    handleToggleFilters,
    handleSelectFilter,
    handleClearFilters,
  }
}
