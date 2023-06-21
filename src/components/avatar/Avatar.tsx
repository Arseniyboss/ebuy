'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { logout } from '@api/users/logout'
import { AvatarContainer, UserInitials, Dropdown, DropdownText } from './styles'
import Link from 'next/link'

type Props = {
  initials: string
}

const Avatar = ({ initials }: Props) => {
  const [dropdown, setDropdown] = useState(false)

  const router = useRouter()
  const pathname = usePathname()

  const isActive = pathname === '/profile'

  const toggleDropdown = () => {
    setDropdown(!dropdown)
  }

  const handleLogout = async () => {
    await logout()
    router.push('/')
    router.refresh()
  }
  return (
    <AvatarContainer>
      <UserInitials onClick={toggleDropdown} $isActive={isActive}>
        {initials}
      </UserInitials>
      {dropdown && (
        <Dropdown onClick={toggleDropdown}>
          <li>
            <Link href='/profile'>
              <DropdownText>Profile</DropdownText>
            </Link>
          </li>
          <li>
            <DropdownText onClick={handleLogout}>Logout</DropdownText>
          </li>
        </Dropdown>
      )}
    </AvatarContainer>
  )
}

export default Avatar
