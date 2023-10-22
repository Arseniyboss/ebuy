import { decodeToken } from '@auth/token/decode/cookies'
import { HeaderContainer, HeaderLogo } from './styles'
import Navigation from '@components/navigation/Navigation'

const Header = async () => {
  const user = await decodeToken()
  return (
    <HeaderContainer>
      <HeaderLogo href='/' data-testid='home-nav-link'>
        Ebuy
      </HeaderLogo>
      <Navigation user={user} />
    </HeaderContainer>
  )
}

export default Header
