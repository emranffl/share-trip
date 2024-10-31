export const getAPIResponse = async ({
  basePath = process.env.NEXT_PUBLIC_API_BASE_URL || "",
  apiPath,
  token = "",
  method = "GET",
  body = undefined,
  contentType = "application/json",
  revalidationTime = 0,
}: {
  basePath?: string
  apiPath: string
  token?: string
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS"
  body?: FormData | string | null | undefined
  contentType?: string
  revalidationTime?: number
}) => {
  const headers: Record<string, string> = {
    Authorization: `${token}`,
    "Access-Control-Allow-Origin": "*",
  }
  headers["Content-Type"] = contentType

  const reqInit: RequestInit = {
    method: `${method}`,
    headers: headers,
    body: body || undefined,
    signal: AbortSignal.timeout(60_000),
    mode: "same-origin",
  }

  if (revalidationTime == 0) {
    reqInit["next"] = { revalidate: false }
  } else {
    reqInit["next"] = { revalidate: revalidationTime }
  }

  console.log("path >>> ", basePath + apiPath)
  console.log("reqInit >>> ", reqInit)

  const response = await fetch(`${basePath + apiPath}`, reqInit)

  if (!response.ok) {
    throw new Error(`Failed to fetch resource at '${basePath + apiPath}'`)
  }

  try {
    return await response.json()
  } catch (error) {
    console.error("Error fetching data:", error)
    return { error: "An error occurred while fetching data" }
  }
}
