import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { saveToken } from '../utils/auth'

export default function Register({ onRegister, onCancel }) {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      // Crear usuario en Auth
      const { data, error: signUpError } = await supabase.auth.signUp({ email, password })
      if (signUpError) throw signUpError

      // Insertar perfil básico en tabla users (opcional)
      const { error: insertError } = await supabase.from('users').insert([{ username, email, name }])
      if (insertError) console.warn('users insert warning', insertError.message)

      // Intentar iniciar sesión para obtener token (puede requerir confirmación por email)
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password })
      if (signInError) {
        // Si requiere confirmación, informar y no forzar login
        setError(signInError.message || 'Registro realizado. Revisa tu email para confirmar.')
      } else {
        const token = signInData?.session?.access_token
        if (token) {
          saveToken(token)
          onRegister(token)
        } else {
          setError('Registro realizado. Revisa tu email para confirmar.')
        }
      }
    } catch (err) {
      setError(err.message || 'Error en registro')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" required />
        </div>
        <div>
          <label>Usuario</label>
          <input value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Nombre</label>
          <input value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <label>Contraseña</label>
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
        </div>
        {error && <div className="error">{error}</div>}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <button type="button" onClick={onCancel} disabled={loading}>Cancelar</button>
          <button type="submit" disabled={loading}>{loading ? 'Creando...' : 'Registrar'}</button>
        </div>
      </form>
    </div>
  )
}
