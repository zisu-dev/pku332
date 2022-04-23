export const API_BASE = <string>import.meta.env.VITE_API_BASE

export class HTTPError extends Error {
  constructor(public status: number, public message: string) {
    super(message)
  }
}

export async function call(token: string, method: string, path: string, data?: any) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(data)
  })
  if (!res.ok) {
    throw new HTTPError(res.status, `${res.status} ${res.statusText}`)
  }
  return res.json()
}
