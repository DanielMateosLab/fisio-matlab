export async function fetchPostOrPut(
  path: string,
  body: {},
  method: "POST" | "PUT" = "POST"
) {
  return await fetch(path, {
    method,
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  })
}

export const fetcher = (url: string) => fetch(url).then((r) => r.json())
