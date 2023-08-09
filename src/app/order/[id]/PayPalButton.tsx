'use client'

import { useRouter } from 'next/navigation'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { markAsPaid } from '@api/orders/markAsPaid'
import { revalidateTag } from '@api/revalidateTag'

type Props = {
  amount: number
  orderId: string
}

const PayPalButton = ({ amount, orderId }: Props) => {
  const router = useRouter()
  return (
    <PayPalScriptProvider
      options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}
    >
      <PayPalButtons
        style={{ layout: 'horizontal', height: 45, tagline: false }}
        createOrder={(_, { order }) => {
          return order.create({
            purchase_units: [
              {
                amount: {
                  value: amount.toString(),
                },
              },
            ],
          })
        }}
        onApprove={async (_, actions) => {
          await actions.order?.capture()
          await markAsPaid(orderId)
          await revalidateTag('order')
          router.refresh()
        }}
      />
    </PayPalScriptProvider>
  )
}

export default PayPalButton
