import { ContactContext, ContactProvider } from './contexts/contact-context'
import './globals.css'

export function App() {
  return (
    <ContactProvider>
      <ContactContext.Consumer>
        {({ contacts }) => (
          <div>
            <h1 className="text-3xl font-bold underline">Hello world!</h1>

            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <img src={contact.avatar} alt="" />

                  <div>{contact.email}</div>
                  <div>{contact.birthday}</div>
                  <div>
                    {contact.first_name} - {contact.last_name}
                  </div>
                  <div>{contact.gender}</div>
                  <div>{contact.language}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </ContactContext.Consumer>
    </ContactProvider>
  )
}
