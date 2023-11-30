import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

export const userContext = createContext({})

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    if (!user) {
      axios.get('auth/profile').then(({ data }) => {
        setUser(data)
        setReady(true)
      })
    }
  }, [])

  return (
    <div>
      <userContext.Provider value={{ user, setUser, ready }}>
        {children}
      </userContext.Provider>
    </div>
  )
}
