import Link from 'next/link'
import { decodeToken } from '@auth/token/decode/cookies'
import { HeaderContainer } from './styles'
import Navigation from '@components/navigation/Navigation'

const Header = async () => {
  const user = await decodeToken()
  return (
    <HeaderContainer>
      <h1>
        <Link href='/' data-testid='home-nav-link'>
          Ebuy
        </Link>
      </h1>
      <Navigation user={user} />
    </HeaderContainer>
  )
}

export default Header
