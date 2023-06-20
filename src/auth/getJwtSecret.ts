export const getJwtSecret = () => {
  return new TextEncoder().encode(process.env.JWT_SECRET)
}
