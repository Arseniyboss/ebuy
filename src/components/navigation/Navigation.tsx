'use client'

import { usePathname } from 'next/navigation'
import { UserPayload } from 'types/jwtPayload'
import { getUserInitials } from '@utils/getters/getUserInitials'
import { NavLinks, NavLink } from './styles'
import { FaShoppingCart, FaEnvelope, FaUserCircle } from 'react-icons/fa'
import Avatar from '@components/navigation/avatar/Avatar'

type Props = {
  user?: UserPayload
}

const Navigation = ({ user }: Props) => {
  const pathname = usePathname()
  return (
    <nav aria-label='primary navigation'>
      <NavLinks>
        <li>
          <NavLink
            href='/cart'
            data-testid='cart-nav-link'
            aria-label='cart link'
            pathname={pathname}
          >
            <FaShoppingCart />
          </NavLink>
        </li>
        {user ? (
          <li>
            <Avatar
              isAdmin={user.isAdmin}
              initials={getUserInitials(user.name)}
            />
          </li>
        ) : (
          <li>
            <NavLink
              href='/login'
              data-testid='login-nav-link'
              aria-label='login link'
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
            aria-label='contact link'
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
