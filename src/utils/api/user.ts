import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'
import { call, HTTPError } from './common'

const userToken = useLocalStorage('userToken', '')
export const isLoggedIn = computed(() => !!userToken.value)

export async function userCall(method: string, path: string, data?: any) {
  if (!userToken.value) throw new Error('Not logged in')
  try {
    return await call(userToken.value, method, '/private' + path, data)
  } catch (e) {
    if (e instanceof HTTPError) {
      if (e.status === 401) {
        userLogin('')
        throw new Error('Not logged in')
      }
    }
  }
}

export function userLogin(token: string) {
  userToken.value = token
}

export function userAction(action: string, node: string, args: Record<string, any>) {
  return userCall('POST', `/${action}`, { node, ...args })
}

export function userData(scope: string, node: string, type: string) {
  return userCall('GET', `/data/${scope}/${node}/${type}`)
}
