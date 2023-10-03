import { getUserInitials } from '@utils/getters/getUserInitials'

it('gets user initials', () => {
  const username = 'Kristin Scott Thomas'
  const userInitials = getUserInitials(username)
  expect(userInitials).toBe('KS')
})
