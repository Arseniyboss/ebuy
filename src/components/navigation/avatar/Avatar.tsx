'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useToggle } from '@/hooks/useToggle'
import { logout } from '@/api/users/logout'
import { AvatarContainer, UserInitials, Dropdown } from './styles'
import Link from 'next/link'
import { InvisibleButton } from '@/styles/globals'

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
        aria-label='user dropdown menu'
        data-testid='user-initials'
        aria-expanded={isDropdownOpen}
      >
        {initials}
      </UserInitials>
      {isDropdownOpen && (
        <Dropdown onClick={toggleDropdown}>
          <li>
            <Link href='/profile' data-testid='profile-link'>
              Profile
            </Link>
          </li>
          <li>
            <Link
              href={isAdmin ? '/admin/orders' : '/orders'}
              data-testid='orders-link'
            >
              Orders
            </Link>
          </li>
          <li>
            <InvisibleButton onClick={handleLogout} data-testid='logout-button'>
              Logout
            </InvisibleButton>
          </li>
        </Dropdown>
      )}
    </AvatarContainer>
  )
}

export default Avatar
