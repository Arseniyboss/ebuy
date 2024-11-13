import { ReactNode } from 'react'
import { withCartItems } from '@/middleware/layout/withCartItems'

type Props = {
  children: ReactNode
}

const AddressLayout = ({ children }: Props) => {
  return <>{children}</>
}

export default withCartItems(AddressLayout)
