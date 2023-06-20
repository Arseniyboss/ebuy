import Link from 'next/link'
import { decodeToken } from '@auth/decodeToken/cookies'
import { getUserInitials } from '@utils/getUserInitials'
import { FaShoppingCart, FaEnvelope, FaUserCircle } from 'react-icons/fa'
import { HeaderContainer, NavLinks, NavLink } from './styles'
import Avatar from '@components/avatar/Avatar'

const Header = async () => {
  const user = await decodeToken()
  return (
    <HeaderContainer>
      <h1>
        <Link href='/' data-testid='home-nav-link'>
          Ebuy
        </Link>
      </h1>
      <nav>
        <NavLinks>
          <li>
            <NavLink href='/cart' data-testid='cart-nav-link'>
              <FaShoppingCart aria-label='shopping cart' />
            </NavLink>
          </li>
          {user ? (
            <li>
              <Avatar initials={getUserInitials(user.name)} />
            </li>
          ) : (
            <li>
              <NavLink href='/login' data-testid='login-nav-link'>
                <FaUserCircle aria-label='user' />
              </NavLink>
            </li>
          )}
          <li>
            <NavLink href='/contact' data-testid='contact-nav-link'>
              <FaEnvelope aria-label='envelope' />
            </NavLink>
          </li>
        </NavLinks>
      </nav>
    </HeaderContainer>
  )
}

export default Header
