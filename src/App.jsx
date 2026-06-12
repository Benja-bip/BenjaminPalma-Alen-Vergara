import React, { useState, useEffect } from 'react'
import Login from './components/Login'
import UserList from './components/UserList'
import { getToken, clearToken } from './utils/auth'
import { supabase } from './lib/supabaseClient'

export default function App() {
  const [token, setToken] = useState(null)

  useEffect(() => {
    async function init() {
      const { data } = await supabase.auth.getSession()
      const t = data?.session?.access_token || getToken()
      if (t) setToken(t)
    }
    init()
  }, [])

  function handleLogout() {
    supabase.auth.signOut()
    clearToken()
    setToken(null)
  }

  if (!token) {
    return <Login onLogin={t => setToken(t)} />
  }

  return <UserList onLogout={handleLogout} token={token} />
}
