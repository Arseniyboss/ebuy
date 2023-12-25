const getTokenSecret = (secret: string) => {
  return new TextEncoder().encode(secret)
}

export const getAccessTokenSecret = () => {
  return getTokenSecret(process.env.ACCESS_TOKEN_SECRET)
}

export const getRefreshTokenSecret = () => {
  return getTokenSecret(process.env.REFRESH_TOKEN_SECRET)
}
