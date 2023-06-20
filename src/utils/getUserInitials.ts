export const getUserInitials = (username: string) => {
  return username
    .split(' ')
    .map((i) => i.at(0))
    .join('')
    .toUpperCase()
}
