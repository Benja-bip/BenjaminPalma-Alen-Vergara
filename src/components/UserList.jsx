import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import UserForm from './UserForm'

export default function UserList({ onLogout }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)

  async function load() {
    setLoading(true)
    try {
      const { data, error } = await supabase.from('users').select('*')
      if (error) throw error
      setUsers(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error(err)
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  async function handleDelete(id) {
    if (!confirm('Eliminar usuario?')) return
    try {
      const { error } = await supabase.from('users').delete().eq('id', id)
      if (error) throw error
      setUsers(users.filter(u => u.id !== id))
    } catch (err) {
      alert('Error eliminando: ' + err.message)
    }
  }

  return (
    <div className="container">
      <header>
        <h2>Mantenedor de Usuarios</h2>
        <div>
          <button onClick={() => setEditing({})}>Crear usuario</button>
          <button onClick={onLogout}>Cerrar sesión</button>
        </div>
      </header>

      {editing && (
        <UserForm user={editing} onDone={() => { setEditing(null); load() }} onCancel={() => setEditing(null)} />
      )}

      {loading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.username}</td>
                <td>{u.name || ''}</td>
                <td>
                  <button onClick={() => setEditing(u)}>Editar</button>
                  <button onClick={() => handleDelete(u.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
