import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="flex justify-center pb-8">
      <small className="flex items-center gap-1 text-base font-semibold text-primary-green">
        Feito com <Heart className="inline h-4 w-4" /> by{' '}
        <a
          href="https://www.vitordiniz.dev/"
          target="_blank"
          className="font-bold underline underline-offset-4"
          rel="noreferrer"
        >
          Vitor Diniz
        </a>
      </small>
    </footer>
  )
}
