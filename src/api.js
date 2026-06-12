const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

async function request(path, method = 'GET', body, token) {
  const opts = { method, headers: {} }
  if (body) {
    opts.headers['Content-Type'] = 'application/json'
    opts.body = JSON.stringify(body)
  }
  if (token) opts.headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(`${API_BASE}${path}`, opts)
  if (!res.ok) {
    const err = await res.text()
    throw new Error(err || res.statusText)
  }
  return res.status === 204 ? null : res.json()
}

export function login(username, password) {
  return request('/auth/login', 'POST', { username, password })
}

export function getUsers(token) {
  return request('/users', 'GET', null, token)
}

export function createUser(data, token) {
  return request('/users', 'POST', data, token)
}

export function updateUser(id, data, token) {
  return request(`/users/${id}`, 'PUT', data, token)
}

export function deleteUser(id, token) {
  return request(`/users/${id}`, 'DELETE', null, token)
}
