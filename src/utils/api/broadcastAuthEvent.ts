type AuthEvent = 'login' | 'logout'

export const broadcastAuthEvent = (event: AuthEvent) => {
  const channel = new BroadcastChannel('auth')
  channel.postMessage(event)
  channel.close()
}
