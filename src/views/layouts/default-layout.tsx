import { Outlet } from 'react-router-dom'

import { Header } from '../components/header'

export function DefaultLayout() {
  return (
    <>
      <Header />

      <main className="mx-auto max-w-[1440px] px-8 pb-8">
        <Outlet />
      </main>
    </>
  )
}
