import './App.css'
import { getUser } from './common/GLOBAL'
import { UserContext } from './contexts/UsuarioContext'
import { Router } from './router/Router'
import { useEffect, useState } from 'react'

function App() {

  const [user, setUser] = useState(()=>{
    return getUser() || {}
  })

  return (
    <div className="App">
      <UserContext.Provider 
        value={{
          user, 
          setUser
        }}>
          <Router />
      </UserContext.Provider>
    </div>
  )
}

export default App
