import { getSession } from '@/auth/session/cookies'
import { HeaderContainer, HeaderLogo } from './styles'
import Navigation from '@/components/navigation/Navigation'

const Header = async () => {
  const session = await getSession()
  return (
    <HeaderContainer>
      <HeaderLogo href='/' data-testid='home-nav-link' aria-label='ebuy logo'>
        Ebuy
      </HeaderLogo>
      <Navigation user={session?.user} />
    </HeaderContainer>
  )
}

export default Header
