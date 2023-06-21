'use client'

import { usePathname } from 'next/navigation'
import { JwtPayload } from 'types/jwtPayload'
import { getUserInitials } from '@utils/getUserInitials'
import { NavLinks, NavLink } from './styles'
import { FaShoppingCart, FaEnvelope, FaUserCircle } from 'react-icons/fa'
import Avatar from '@components/avatar/Avatar'

type Props = {
  user?: JwtPayload
}

const Navigation = ({ user }: Props) => {
  const pathname = usePathname()
  return (
    <nav>
      <NavLinks>
        <li>
          <NavLink href='/cart' data-testid='cart-nav-link' pathname={pathname}>
            <FaShoppingCart aria-label='shopping cart' />
          </NavLink>
        </li>
        {user ? (
          <li>
            <Avatar initials={getUserInitials(user.name)} />
          </li>
        ) : (
          <li>
            <NavLink
              href='/login'
              data-testid='login-nav-link'
              pathname={pathname}
            >
              <FaUserCircle aria-label='user' />
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            href='/contact'
            data-testid='contact-nav-link'
            pathname={pathname}
          >
            <FaEnvelope aria-label='envelope' />
          </NavLink>
        </li>
      </NavLinks>
    </nav>
  )
}

export default Navigation
