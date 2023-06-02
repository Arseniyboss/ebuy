import Link from 'next/link'
import { FaShoppingCart, FaEnvelope, FaUserCircle } from 'react-icons/fa'
import { HeaderContainer, NavLinks, NavLink } from './styles'

const Header = () => {
  return (
    <HeaderContainer>
      <h1>
        <Link href='/'>Ebuy</Link>
      </h1>
      <nav>
        <NavLinks>
          <li>
            <NavLink href='/cart'>
              <FaShoppingCart aria-label='shopping cart' />
            </NavLink>
          </li>
          <li>
            <NavLink href='/login'>
              <FaUserCircle aria-label='user' />
            </NavLink>
          </li>
          <li>
            <NavLink href='/contact'>
              <FaEnvelope aria-label='envelope' />
            </NavLink>
          </li>
        </NavLinks>
      </nav>
    </HeaderContainer>
  )
}

export default Header
