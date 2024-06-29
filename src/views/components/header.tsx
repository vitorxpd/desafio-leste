import { Link } from 'react-router-dom'

import logo from '@/assets/logo.png'

export function Header() {
  return (
    <header className="mb-8 pt-8">
      <section className="mx-auto flex items-center justify-center px-8">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-[180px]" />
        </Link>
      </section>
    </header>
  )
}
