'use client'

import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

type Props = {
  amount: number
}

const PayPalButton = ({ amount }: Props) => {
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
          alert('Payment Successful!')
        }}
      />
    </PayPalScriptProvider>
  )
}

export default PayPalButton
