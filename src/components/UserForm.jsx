import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function UserForm({ user = {}, onDone, onCancel }) {
  const [username, setUsername] = useState(user.username || '')
  const [name, setName] = useState(user.name || '')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const isEdit = !!user.id

  useEffect(() => {
    setUsername(user.username || '')
    setName(user.name || '')
    setPassword('')
  }, [user])

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      if (isEdit) {
        const updates = { username, name }
        if (password) updates.password = password
        const { error } = await supabase.from('users').update(updates).eq('id', user.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('users').insert([{ username, name, password }])
        if (error) throw error
      }
      onDone()
    } catch (err) {
      alert('Error: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal">
      <form className="form" onSubmit={handleSubmit}>
        <h3>{isEdit ? 'Editar usuario' : 'Crear usuario'}</h3>
        <div>
          <label>Usuario</label>
          <input value={username} onChange={e => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Nombre</label>
          <input value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <label>Contraseña {isEdit ? '(dejar vacía para no cambiar)' : ''}</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required={!isEdit} />
        </div>
        <div className="actions">
          <button type="button" onClick={onCancel} disabled={loading}>Cancelar</button>
          <button type="submit" disabled={loading}>{loading ? 'Guardando...' : 'Guardar'}</button>
        </div>
      </form>
    </div>
  )
}
