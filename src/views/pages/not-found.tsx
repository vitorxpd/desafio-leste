import { useNavigate } from 'react-router-dom'

import { Button } from '../components/ui/button'

export function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="mx-auto mt-32 flex w-fit flex-col items-center gap-4 text-center">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        404 - Page Not Found
      </h1>
      <p className="text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button onClick={() => navigate('/')}>Go to Homepage</Button>
    </div>
  )
}
