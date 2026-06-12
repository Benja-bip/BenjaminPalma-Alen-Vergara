import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { saveToken } from '../utils/auth'
import Register from './Register'

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [showRegister, setShowRegister] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password
      })
      if (error) throw error
      const token = data?.session?.access_token
      if (token) {
        saveToken(token)
        onLogin(token)
      } else {
        setError('No session token returned')
      }
    } catch (err) {
      setError(err.message || 'Login failed')
    }
  }

  if (showRegister) {
    return <Register onRegister={t => { setShowRegister(false); onLogin(t) }} onCancel={() => setShowRegister(false)} />
  }

  return (
    <div className="auth">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input value={username} onChange={e => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Contraseña</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        {error && <div className="error">{error}</div>}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button type="submit">Ingresar</button>
          <button type="button" onClick={() => setShowRegister(true)}>Registrarse</button>
        </div>
      </form>
    </div>
  )
}
