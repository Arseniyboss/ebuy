import './globals.css'
import { ReactNode } from 'react'
import StyledComponentsRegistry from '@lib/registry'
import Header from '@components/header/Header'
import Footer from '@components/footer/Footer'
import { Container, SkipLink } from '@styles/globals'

type Props = {
  children: ReactNode
}

export const metadata = {
  title: 'Ebuy',
  description: 'Buy high quality products by cheapest prices',
}

const RootLayout = ({ children }: Props) => {
  return (
    <html lang='en'>
      <body>
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
