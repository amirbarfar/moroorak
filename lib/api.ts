export async function api(url: string, options: RequestInit & { body?: BodyInit | null }) {
  const isFormData = options.body instanceof FormData

  return fetch(url, {
    ...options,
    headers: isFormData ? options.headers : {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials : "include"
  }).then(async (res) => {
    const data = await res.json().catch(() => null)
    if (!res.ok) throw new Error(data?.error || 'خطایی رخ داد')
    return data
  })
}
