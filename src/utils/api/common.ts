import { ref } from 'vue'

export const API_BASE = <string>import.meta.env.VITE_API_BASE
export const API_FALLBACK = <string>import.meta.env.VITE_API_FALLBACK
export const useFallback = ref(false)

export class HTTPError extends Error {
  constructor(public status: number, public message: string) {
    super(message)
  }
}

export async function call(token: string, method: string, path: string, data?: any) {
  let res: Response
  const dispatch = async (base: string, timeout: number) => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)
    const res = await fetch(`${base}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify(data)
    })
    clearTimeout(timeoutId)
    return res
  }
  if (useFallback.value) {
    res = await dispatch(API_FALLBACK, 5000)
  } else {
    try {
      res = await dispatch(API_BASE, 500)
    } catch (e) {
      console.log(e)
      res = await dispatch(API_FALLBACK, 5000)
      useFallback.value = true
    }
  }
  if (!res.ok) {
    throw new HTTPError(res.status, `${res.status} ${res.statusText}`)
  }
  const contentType = res.headers.get('content-type')
  if (contentType && contentType.includes('application/json')) {
    return res.json()
  }
  return res.text()
}

async function checkAPI() {
  if (useFallback.value) {
    try {
      await fetch(`${API_BASE}/hello`, { method: 'POST' })
      useFallback.value = false
    } catch (e) {
      console.log(e)
    }
  }
  setTimeout(checkAPI, 1000)
}

checkAPI()
