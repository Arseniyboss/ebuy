'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useToggle } from '@hooks/useToggle'
import { logout } from '@api/users/logout'
import { AvatarContainer, UserInitials, Dropdown, DropdownText } from './styles'
import Link from 'next/link'

type Props = {
  isAdmin: boolean
  initials: string
}

const Avatar = ({ isAdmin, initials }: Props) => {
  const [isDropdownOpen, toggleDropdown] = useToggle()

  const router = useRouter()
  const pathname = usePathname()

  const isActive = pathname === '/profile'

  const handleLogout = async () => {
    await logout()
    router.push('/login')
    router.refresh()
  }
  return (
    <AvatarContainer>
      <UserInitials
        onClick={toggleDropdown}
        $isActive={isActive}
        data-testid='user-initials'
      >
        {initials}
      </UserInitials>
      {isDropdownOpen && (
        <Dropdown onClick={toggleDropdown}>
          <li>
            <Link href='/profile' data-testid='profile-link'>
              <DropdownText>Profile</DropdownText>
            </Link>
          </li>
          <li>
            <Link
              href={isAdmin ? '/admin/orders' : '/orders'}
              data-testid='orders-link'
            >
              <DropdownText>Orders</DropdownText>
            </Link>
          </li>
          <li>
            <DropdownText onClick={handleLogout} data-testid='logout-text'>
              Logout
            </DropdownText>
          </li>
        </Dropdown>
      )}
    </AvatarContainer>
  )
}

export default Avatar
