import { Frown } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

interface IErrorFallbackProps {
  onTryAgain: () => void
}

export function ErrorFallback({ onTryAgain }: IErrorFallbackProps) {
  return (
    <div className="mx-auto flex w-fit max-w-[320px] flex-col items-center gap-4 sm:max-w-[540px]">
      <div className="flex flex-col items-center gap-2">
        <Frown className="h-16 w-16 text-destructive" />

        <p className="text-center text-muted-foreground">
          An error occurred while loading contacts. If the issue continues,
          please{' '}
          <Link to="/new-contact" className="font-bold underline">
            add contacts
          </Link>{' '}
          manually.
        </p>
      </div>

      <Button className="w-[128px]" onClick={onTryAgain}>
        Try Again
      </Button>
    </div>
  )
}
