import Link from 'next/link'
import { FaShoppingCart, FaEnvelope, FaUserCircle } from 'react-icons/fa'
import { HeaderContainer, NavLinks, NavLink } from './styles'

const Header = () => {
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
          <li>
            <NavLink href='/login' data-testid='login-nav-link'>
              <FaUserCircle aria-label='user' />
            </NavLink>
          </li>
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
