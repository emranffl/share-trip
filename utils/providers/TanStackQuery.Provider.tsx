"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"

export default function TanStackQueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000 * 2,
            retry: 5,
          },
        },
      }),
  )
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryStreamedHydration> */}
      {children}
      {/* {process.env.NODE_ENV !== "production" ? <ReactQueryDevtools initialIsOpen={false} /> : <></>} */}
      {/* </ReactQueryStreamedHydration> */}
    </QueryClientProvider>
  )
}
