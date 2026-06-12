export function saveToken(token) {
  localStorage.setItem('sistema_token', token)
}

export function getToken() {
  return localStorage.getItem('sistema_token')
}

export function clearToken() {
  localStorage.removeItem('sistema_token')
}
