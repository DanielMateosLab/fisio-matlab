export async function fetchPostOrPut(
  path: string,
  body: {},
  method: "POST" | "PUT" = "POST"
) {
  const res = await fetch(path, {
    method,
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  })
  return await res.json()
}

export const fetcher = (url: string) => fetch(url).then((r) => r.json())
