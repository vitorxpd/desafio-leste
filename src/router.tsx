import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { DefaultLayout } from './views/layouts/default-layout'
import { EditContact } from './views/pages/edit-contact'
import { Home } from './views/pages/home'
import { NewContact } from './views/pages/new-contact'
import { NotFound } from './views/pages/not-found'

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/new-contact" element={<NewContact />} />
          <Route path="/edit-contact/:id" element={<EditContact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
