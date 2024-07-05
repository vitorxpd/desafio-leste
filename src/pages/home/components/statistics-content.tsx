import { useMemo } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useContacts } from '@/contexts/contacts-context'

export function StatisticsContent() {
  const { contacts } = useContacts()

  const genderStatistics = useMemo(() => {
    const maleCount = contacts.filter(
      (contact) => contact.gender === 'M',
    ).length
    const femaleCount = contacts.filter(
      (contact) => contact.gender === 'F',
    ).length
    const totalCount = contacts.length

    const malePercentage = ((maleCount / totalCount) * 100).toFixed(2) + '%'
    const femalePercentage = ((femaleCount / totalCount) * 100).toFixed(2) + '%'

    return [
      { gender: 'Male', count: maleCount, percentage: malePercentage },
      { gender: 'Female', count: femaleCount, percentage: femalePercentage },
    ]
  }, [contacts])

  const languageStatistics = useMemo(() => {
    const totalContacts = contacts.length
    const languageCount: {
      language: string
      count: number
      percentage: number | string
    }[] = []

    contacts.forEach((contact) => {
      const { language } = contact

      const existingLanguage = languageCount.find(
        (lang) => lang.language === language,
      )

      if (existingLanguage) {
        existingLanguage.count++
      } else {
        languageCount.push({
          language: language,
          count: 1,
          percentage: 1 / totalContacts,
        })
      }
    })

    languageCount.forEach((lang) => {
      lang.percentage = ((lang.count / totalContacts) * 100).toFixed(2) + '%'
    })

    return languageCount
  }, [contacts])

  return (
    <div className="z-50 mt-6 flex flex-col gap-4 overflow-auto p-4 no-scrollbar md:flex-row md:overflow-hidden md:p-0">
      <Card className="sm:w-1/2">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Gender Statistics
          </CardTitle>

          <CardDescription>Breakdown of users by gender.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {genderStatistics
            .sort((a, b) => b.count - a.count)
            .map((gender) => (
              <div
                key={gender.gender}
                className="flex items-center justify-between"
              >
                <div>{gender.gender}</div>

                <div className="font-medium">
                  {gender.count}{' '}
                  <span className="text-muted-foreground">
                    ({gender.percentage})
                  </span>
                </div>
              </div>
            ))}
        </CardContent>
      </Card>

      <Card className="flex flex-col md:w-1/2 md:overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Language Statistics
          </CardTitle>
          <CardDescription>Top languages used on the site.</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 no-scrollbar md:flex-1 md:overflow-scroll">
          {languageStatistics
            .sort((a, b) => b.count - a.count)
            .map((language) => (
              <div
                key={language.language}
                className="flex items-center justify-between"
              >
                <div>{language.language}</div>

                <div className="font-medium">
                  {language.count}{' '}
                  <span className="text-muted-foreground">
                    ({language.percentage})
                  </span>
                </div>
              </div>
            ))}
        </CardContent>
      </Card>
    </div>
  )
}
