export const getUserInitials = (username: string) => {
  return username
    .split(' ')
    .slice(0, 2)
    .map((i) => i.at(0))
    .join('')
    .toUpperCase()
}
