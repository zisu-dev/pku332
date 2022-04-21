import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'

const BASE = <string>import.meta.env.VITE_API_BASE

export async function call(
  token: string,
  method: string,
  path: string,
  data?: any
) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(data)
  })
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`)
  }
  return res.json()
}

const adminToken = useLocalStorage('adminToken', '')
export const isAdmin = computed(() => !!adminToken.value)

async function adminCall(method: string, path: string, data?: any) {
  if (!adminToken.value) throw new Error('Not logged in')
  return call(adminToken.value, method, path, data)
}

export function adminLogin(token: string) {
  adminToken.value = token
}

export function adminAction(
  action: string,
  node: string,
  args: Record<string, any>
) {
  return adminCall('POST', `/admin/${action}`, { node, ...args })
}

export async function generateToken(comment: string) {
  const res = await adminCall('POST', '/admin/token', { comment })
  return res
}

export async function removeToken(id: number) {
  const res = await adminCall('DELETE', '/admin/token', { id })
  return res
}

export async function getTokens() {
  const res = await adminCall('GET', '/admin/token')
  return res
}

const userToken = useLocalStorage('userToken', '')
export const isLoggedIn = computed(() => !!userToken.value)

async function userCall(method: string, path: string, data?: any) {
  if (!userToken.value) throw new Error('Not logged in')
  return call(userToken.value, method, path, data)
}

export function userLogin(token: string) {
  userToken.value = token
}

export function userAction(
  action: string,
  node: string,
  args: Record<string, any>
) {
  return userCall('POST', `/private/${action}`, { node, ...args })
}
