import { type NextPage } from "next"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean
  isPortal?: boolean
}