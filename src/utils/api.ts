import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'

const BASE = <string>import.meta.env.VITE_API_BASE

const adminToken = useLocalStorage('adminToken', '')
export const isAdmin = computed(() => !!adminToken.value)

async function AdminCall(method: string, path: string, data?: any) {
  if (!adminToken.value) throw new Error('Not logged in')
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${adminToken.value}`
    },
    body: JSON.stringify(data)
  })
  return res.json()
}

export function adminLogin(token: string) {
  adminToken.value = token
}

export function adminAction(
  action: string,
  node: string,
  args: Record<string, any>
) {
  return AdminCall('POST', `/admin/${action}`, { node, ...args })
}

export async function generateToken(comment: string) {
  const res = await AdminCall('POST', '/admin/token', { comment })
  return res.token
}

export async function removeToken(token: string) {
  const res = await AdminCall('DELETE', '/admin/token', { token })
  return res.token
}

export async function getTokens() {
  const res = await AdminCall('GET', '/admin/token')
  return res.token
}

const userToken = useLocalStorage('userToken', '')
export const isLoggedIn = computed(() => !!userToken.value)

async function UserCall(method: string, path: string, data?: any) {
  if (!userToken.value) throw new Error('Not logged in')
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${userToken.value}`
    },
    body: JSON.stringify(data)
  })
  return res.json()
}

export function userLogin(token: string) {
  userToken.value = token
}

export function userAction(
  action: string,
  node: string,
  args: Record<string, any>
) {
  return UserCall('POST', `/private/${action}`, { node, ...args })
}
