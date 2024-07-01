import { useMemo } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useContacts } from '@/contexts/contacts-context'
import { languages } from '@/lib/utils'

interface IStatisticsModalProps {
  open: boolean
  onClose: () => void
}

export function StatisticsModal({ open, onClose }: IStatisticsModalProps) {
  const { contacts } = useContacts()

  const genderCount = useMemo(() => {
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

  const languageCount = useMemo(() => {
    const totals = contacts.length

    const result = languages.reduce(
      (
        acc: { language: string; count: number; percentage: string }[],
        language,
      ) => {
        const count = contacts.filter(
          (contact) => contact.language === language,
        ).length

        if (count > 0) {
          const percentage = ((count / totals) * 100).toFixed(2) + '%'
          acc.push({ language, count, percentage })
        }
        return acc
      },
      [],
    )

    return result
  }, [contacts])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex h-full w-full max-w-full flex-col overflow-scroll pt-10 sm:h-[420px] sm:max-w-[640px] sm:flex-row sm:overflow-hidden">
        <DialogHeader className="hidden">
          <DialogTitle>Statiscs</DialogTitle>
          <DialogDescription>Gender and Language</DialogDescription>
        </DialogHeader>

        <Card className="sm:w-1/2">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Gender Statistics
            </CardTitle>

            <CardDescription>Breakdown of users by gender.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {genderCount
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

        <Card className="flex flex-col overflow-hidden sm:w-1/2">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Language Statistics
            </CardTitle>
            <CardDescription>Top languages used on the site.</CardDescription>
          </CardHeader>

          <CardContent className="flex flex-1 flex-col gap-4 overflow-scroll no-scrollbar">
            {languageCount
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
      </DialogContent>
    </Dialog>
  )
}
