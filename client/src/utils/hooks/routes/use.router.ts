"use client"

import { useMemo } from "react"
import {
  useRouter as useNextRouter,
  usePathname,
  useSearchParams,
} from "next/navigation"

export function useRouter() {
  const router = useNextRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return useMemo(
    () => ({
      back: () => router.back(),
      forward: () => router.forward(),
      refresh: () => router.refresh(),

      push: (href: string) => router.push(href),
      replace: (href: string) => router.replace(href),

      pathname,
      searchParams,
    }),
    [router, pathname, searchParams]
  )
}
