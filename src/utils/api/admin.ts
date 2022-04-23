import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'
import { call, HTTPError } from './common'

const adminToken = useLocalStorage('adminToken', '')
export const isAdmin = computed(() => !!adminToken.value)

export async function adminCall(method: string, path: string, data?: any) {
  if (!adminToken.value) throw new Error('Not logged in')
  try {
    return await call(adminToken.value, method, '/admin' + path, data)
  } catch (e) {
    if (e instanceof HTTPError) {
      if (e.status === 401) {
        adminLogin('')
        throw new Error('Not logged in')
      }
    }
  }
}

export function adminLogin(token: string) {
  adminToken.value = token
}

export function adminAction(action: string, node: string, args: Record<string, any>) {
  return adminCall('POST', `/${action}`, { node, ...args })
}

export async function generateToken(comment: string) {
  const res = await adminCall('POST', '/token', { comment })
  return res
}

export async function removeToken(id: number) {
  const res = await adminCall('DELETE', '/token', { id })
  return res
}

export async function getTokens() {
  const res = await adminCall('GET', '/token')
  return res
}
