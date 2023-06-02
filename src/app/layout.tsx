import './globals.css'
import StyledComponentsRegistry from '@lib/registry'
import Header from '@components/header/Header'
import Footer from '@components/footer/Footer'
import { Container } from '@styles/globals'

export const metadata = {
  title: 'Ebuy',
  description: 'Buy high quality products by cheapest prices',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body>
        <StyledComponentsRegistry>
          <Header />
          <Container>{children}</Container>
          <Footer />
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}

export default RootLayout
