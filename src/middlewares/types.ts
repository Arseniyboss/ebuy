import { ReactNode } from 'react'
import { Session } from '@/auth/verifyTokens'

export type Props = {
  children: ReactNode
}

export type Params = {
  props: Props
  session: Session
}

export type Layout = (props: Props) => JSX.Element
export type LayoutHandler = (params: Params) => JSX.Element
