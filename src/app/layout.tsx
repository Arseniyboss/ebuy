import './globals.css'
import { ReactNode } from 'react'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import StyledComponentsRegistry from '@/lib/registry'
import Header from '@/components/layout/header/Header'
import Footer from '@/components/layout/footer/Footer'
import { Container, SkipLink } from '@/styles/globals'

type Props = {
  children: ReactNode
}

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ebuy',
  description: 'Buy high quality products by cheapest prices',
}

const RootLayout = ({ children }: Props) => {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <SkipLink href='#main-content'>Skip to main content</SkipLink>
          <Header />
          <Container id='main-content'>{children}</Container>
          <Footer />
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}

export default RootLayout
