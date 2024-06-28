import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { DefaultLayout } from './views/layouts/default-layout'
import { Home } from './views/pages/home'

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
